import Booking from "../Models/Booking"

// function to check availability car for a given date
const checkAvailability=async(car,pickupDate,returnDate)=>{
    const bookings=await Booking.find({
        car,
        pickupDate:{$lte:returnDate},
        returnDate:{$gte:pickupDate}
    })
    return bookings.length===0
}

// API to check availabilty of cars for the given Date and location
