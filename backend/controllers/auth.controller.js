import User from "../models/user.model.js";
import bycrpt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req,res) => {
    try{
        const {fullName,username,password,confirmPassword,gender} = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({error:"Passwords don't match"});
        }
        const user = await User.findOne({username});

        if(user){
            return res.status(400).json({error:"Username already exists"});
        }

        const salt = await bycrpt.genSalt(10);
        const hashedPassword = await bycrpt.hash(password,salt);
        
        //https://avatar.iran.liara.run/public/boy
        const profilePic = `https://avatar.iran.liara.run/public/${gender=="male"?"boy":"girl"}?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilePic
        });

        if(!newUser){
            res.status(400).json({error:"Invalid user data"})
        }

        generateTokenAndSetCookie(newUser._id,res);
        await newUser.save();

        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            username:newUser.username,
            profilePic:newUser.profilePic,
        });
    }
    catch(error){
        console.log("Error in SignUp : ", error);
        res.status(500).json({error: 'Internal Server Error'})
    }
};


export const login = async (req,res) => {
    try{
        const {username,password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bycrpt.compare(password,user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({error:'Incorrect username or password!'});
        }

        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            profilePic:user.profilePic,
        });
    }
    catch(error){
        console.log("Error in Login : ", error);
        res.status(500).json({error: 'Internal Server Error'})
    }
};


export const logout = (req,res) => {
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully!"})
    }
    catch(error){
        console.log("Error in Logout : ", error);
        res.status(500).json({error: 'Internal Server Error'})
    }
};

