import User from "../models/user.model.js";

export const getUsersForSidebar = async (req,res) => {
    try {
        
        const loggedInUserId = req.user._id;
        //all users except who is logged in
        const allUsers = await User.find({_id:{ $ne:loggedInUserId }}).select("-password"); //Find users excluding the current user

        res.status(200).json(allUsers);

    } catch (error) {
        console.log("Error in getUsers: ",error);
        res.status(500).json({error:"Internal Server error"});
    }
}