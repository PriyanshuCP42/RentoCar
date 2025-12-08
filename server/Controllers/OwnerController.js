import fs from "fs";
import imagekit from "../configs/imagekit.js";
import Car from "../Models/Car.js";
import UserModel from "../Models/User.js";

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

        res.status(201).json({ message: "Car Added" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};
// Api to list owner cars
export const getOwnerCars=async(req,res)=>{
    try{
        const { _id } = req.user;
        const cars=await Car.find({owner:_id  })
        return res.json({message:cars})
    }catch(err){
        console.log(err.message)
        return res.status(500).json({message:err.message})
    }
}

// APi to car toggle car availability
export const toggleCarAvailability=async(req,res)=>{
    try{
        const { _id } = req.user;
        const {carId}=req.body
        const car=await Car.find(carId)

        // checking is car belong to the user
        if (car.owner.toString()!==_id.toString()){
            return res.json({message:'Unauthorized'})
        }
        car.isAvaliable=!car.isAvaliable
        await car.save()
        return res.json({message:'Availabilty Toggled'})
    }catch(err){
        console.log(err.message)
        return res.status(500).json({message:err.message})
    }
}

// APi to delete car
export const deleteCar=async(req,res)=>{
    try{
        const { _id } = req.user;
        const {carId}=req.body
        const car=await Car.find(carId)

        // checking is car belong to the user
        if (car.owner.toString()!==_id.toString()){
            return res.json({message:'Unauthorized'})
        }
        car.owner=null
        car.isAvaliable=false
        await car.save()
        return res.json({message:'Car Removed'})
    }catch(err){
        console.log(err.message)
        return res.status(500).json({message:err.message})
    }
}

// Api to get dashboard data
export const getDashboardData=async(req,res)=>{
    try{
        const{id,role}=req.user
        if(role!==owner){
            return res.status(401).json({message:'Unauthorized'})
        }
        const cars=await Car.find({owner:_id})
    }catch(err){
        console.log(err.message)
        return res.json({message:err.message})
    }
}