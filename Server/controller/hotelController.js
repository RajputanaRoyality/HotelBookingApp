import Hotel from "../modals/Hotel.js";
import User from "../modals/User.js";


export const registerHotel = async (req,res) => {
    try{
        const {name,address,contact,city}=req.body;
        const owner = req.user._id

        const hotel = await Hotel.findOne({owner})
        if(hotel){
            return res.json({success:false,message:"Hotel already registered"})
        }
        
        await Hotel.create({name,address,contact,city,owner});

        await User.findByIdandUpdate(owner,{role:"hotelOwner"});

        res.json({success:true,message:"Hotel Added successfully"})
    } catch(error) {
        res.json({success:false,message:error.message})
    }
}