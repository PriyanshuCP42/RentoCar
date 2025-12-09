import Booking from "../Models/Booking.js"
import Car from "../Models/Car.js"

// function to check availability car for a given date
const checkAvailability = async (car, pickupDate, returnDate) => {
    const bookings = await Booking.find({
        car,
        pickupDate: { $lte: returnDate },
        returnDate: { $gte: pickupDate }
    })
    return bookings.length === 0
}


// API to check availabilty of cars for the given Date and location

export const checkAvailabilityOfCar = async (req, res) => {

    try {
        const { location, pickupDate, returnDate } = req.body
        // fetch all available cars for the given location
        const cars = await Car.find({
            location,
            isAvaliable: true,
        })

        //check car availabilty for the given date ranges using promise
        const availableCarPromises = cars.map(async (car) => {
            const isAvailable = await checkAvailability(car._id, pickupDate, returnDate)
            return { ...car._doc, isAvailable: isAvailable }
        })
        let availableCars = await Promise.all(availableCarPromises)
        availableCars.filter((car) => car.isAvailable === true)
        return res.json({ success: true, availableCars })

    } catch (error) {
        console.log(error.message)
        return res.json({ message: error.message })
    }
}

// API to create booking
export const createBooking = async (req, res) => {
  try {
    const { _id } = req.user;
    const { car, pickupDate, returnDate } = req.body;

    const isAvailable = await checkAvailability(car, pickupDate, returnDate);
    if (!isAvailable) {
      return res.json({ success: false, message: 'Car is not Available' });
    }

    const carData = await Car.findById(car);

    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);
    const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));

    const price = carData.pricePerDay * noOfDays;

    await Booking.create({
      car,
      owner: carData.owner,
      user: _id,
      pickupDate,
      returnDate,
      price,
    });

    return res.json({
      success: true,
      message: 'Booking Created',
    });

  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};


// API to list user Bookings.
export const getUserBookings = async (req, res) => {
  try {
    const { _id } = req.user;
    const bookings = await Booking.find({ user: _id })
      .populate("car")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      bookings
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: error.message
    });
  }
};


// API to get owner bookings
export const getOwnerBookings = async (req, res) => {
    try {

        if (req.user.role !== "owner") {
            return res.status(401).json({
                success: false,
                message: "Not authorised"
            });
        }

        const bookings = await Booking.find({ owner: req.user._id })
            .populate("car user")
            .select("-user.password")
            .sort({ createdAt: -1 });

        return res.json({
            success: true,
            bookings
        });

    } catch (error) {
        console.log(error.message);
        return res.json({
            success: false,
            message: error.message
        });
    }
};


// API to change booking status
export const changeBookingStatus = async (req, res) => {
    try {
        const { _id } = req.user
        const { bookingId, status } = req.body
        const booking = await Booking.findById(bookingId)

        if (booking.owner.toString() !== _id.toString()) {
            return res.status(401).json({ message: 'Not authorised' })
        }
        booking.status = status
        await booking.save()
        return res.json({ message: 'Status Updated' })
    } catch (error) {
        console.log(error.message)
        return res.json({ message: error.message })
    }
}