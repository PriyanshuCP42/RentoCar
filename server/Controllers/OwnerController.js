import fs from "fs";
import imagekit from "../configs/imagekit.js";
import Car from "../Models/Car.js";
import UserModel from "../Models/User.js";
import Booking from "../Models/Booking.js";

export const changeRoleToOwner = async (req, res) => {
    try {
        const { _id } = req.user;
        await UserModel.findByIdAndUpdate(_id, { role: "owner" });
        res.status(200).json({ message: "Now you can list your cars" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const addCar = async (req, res) => {
    try {
        const { _id } = req.user;
        const car = JSON.parse(req.body.carData);

        if (!req.file) return res.status(400).json({ message: "Image file required" });

        const imageFile = req.file;
        const fileBuffer = fs.readFileSync(imageFile.path);

        const uploadResponse = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/cars"
        });

        const optimizedImageURL = imagekit.url({
            src: uploadResponse.url,
            transformation: [
                { width: "1280" },
                { quality: "auto" },
                { format: "webp" }
            ]
        });

        await Car.create({
            ...car,
            owner: _id,
            image: optimizedImageURL,
        });

        return res.status(201).json({
            success: true,
            message: "Car Added Successfully!"
        });


    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};
// Api to list owner cars
export const getOwnerCars = async (req, res) => {
    try {
        const { _id } = req.user;
        const cars = await Car.find({ owner: _id })
        return res.json({
            success: true,
            cars
        })

    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: err.message })
    }
}

// APi to car toggle car availability
export const toggleCarAvailability = async (req, res) => {
    try {
        const { _id } = req.user;
        const { carId } = req.body
        const car = await Car.findById(carId)


        // checking is car belong to the user
        if (car.owner.toString() !== _id.toString()) {
            return res.json({ message: 'Unauthorized' })
        }
        car.isAvaliable = !car.isAvaliable
        await car.save()
        return res.json({
            success: true,
            message: 'Availability Toggled'
        })

    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: err.message })
    }
}

// APi to delete car
export const deleteCar = async (req, res) => {
    try {
        const { _id } = req.user;
        const { carId } = req.body
        const car = await Car.findById(carId)


        // checking is car belong to the user
        if (car.owner.toString() !== _id.toString()) {
            return res.json({ message: 'Unauthorized' })
        }
        car.owner = null
        car.isAvaliable = false
        await car.save()
        return res.json({
            success: true,
            message: 'Car Removed'
        })

    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: err.message })
    }
}

// Api to get dashboard data
export const getDashboardData = async (req, res) => {
    try {
        const { _id, role } = req.user;

        if (role !== "owner") {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        // Fetch owner cars
        const cars = await Car.find({ owner: _id });

        // Fetch bookings + populate car ALWAYS
        const bookings = await Booking.find({ owner: _id })
            .populate({
                path: "car",
                select: "brand model image"
            })
            .sort({ createdAt: -1 });

        const pendingBookings = bookings.filter(b => b.status === "pending");
        const completedBookings = bookings.filter(b => b.status === "confirmed");

        // Monthly revenue (only confirmed)
        const monthlyRevenue = bookings
            .filter(b => b.status === "confirmed")
            .reduce((acc, b) => acc + b.price, 0);

        // FIX: remove invalid bookings with missing car
        const safeRecent = bookings
            .filter(b => b.car) // 💥 FIX: prevents crash
            .slice(0, 3);

        return res.json({
            success: true,
            dashboardData: {
                totalCars: cars.length,
                totalBookings: bookings.length,
                pendingBookings: pendingBookings.length,
                completedBookings: completedBookings.length,
                recentBookings: safeRecent,
                monthlyRevenue
            }
        });

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


// API to update user image
export const uppdateUserImage = async (req, res) => {
    try {
        const { _id } = req.user; // CORRECT VARIABLE

        if (!req.file) {
            return res.status(400).json({ success: false, message: "No image file uploaded" });
        }

        const imageFile = req.file;
        const fileBuffer = fs.readFileSync(imageFile.path);

        const uploadResponse = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/users"
        });

        const optimizedImageURL = imagekit.url({
            src: uploadResponse.url,
            transformation: [
                { width: "1280" },
                { quality: "auto" },
                { format: "webp" }
            ]
        });

        await UserModel.findByIdAndUpdate(_id, { image: optimizedImageURL });

        return res.json({
            success: true,                // IMPORTANT FIX
            message: "Image Updated",
            image: optimizedImageURL
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
