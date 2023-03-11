import User from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export const userSignup = async (req, res, next) => {
    try {
        let userDetails = req.body;
        console.log(userDetails);
        if (!userDetails.name || !userDetails.password || !userDetails.email) {
            return res.status(404).json({ "status": false, "message": "Please enter all fields" });
        } else {
            const user = await User.findOne({ email: userDetails.email });
            if (user) {
                return res.status(404).json({message:"User already exists"})
            }
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);

            const newUser = User({
                name: req.body.name,
                email: req.body.email,
                password: hash,
            })

            await newUser.save();
            res.status(200).json({message:"User has been created"});
        }

    } catch (error) {
        next(error);
    }
}



export const userLogin = async (req, res, next) => {
    try {
        const userDetails = req.body;
        if (!userDetails.email || !userDetails.password) {
            return res.status(404).json({ "status": false, "message": "Please enter all fields" });
        } else {
            const user = await User.findOne({ email: userDetails.email });
            if (!user) return res.status(404).json({ status: false, message: "User not found" });

            const isPasswordCorrect = await bcrypt.compare(userDetails.password, user.password);
            if (!isPasswordCorrect) return res.status(404).json({ status: false, "message": "Invalid email or password" });

            const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT);
            const { password, ...otherDetails } = user._doc;

            //response

            res
                .cookie("access_token", token, {
                    httpOnly: true,
                })
                .status(200)
                .json({ ...otherDetails });
        }
    } catch (error) {
        next(error);
    }
}

export const userPassChange = async (req, res, next) => {
    try {
        const userDetails = req.body;
        if (!userDetails.email || !userDetails.oldPassword || !userDetails.newPassword) {
            return res.status(404).json({ "status": false, "message": "Please enter all fields" });
        } else {
            const user = await User.findOne({ email: userDetails.email });
            if (!user) return res.status(404).json({ status: false, message: "User not found" });

            const isPasswordCorrect = await bcrypt.compare(userDetails.oldPassword, user.password);
            if (!isPasswordCorrect) return res.status(404).json({ status: false, "message": "Invalid email or password" });

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.newPassword, salt);

            const filter = { email: userDetails.email };
            const update = { password: hash };

            let doc = await User.findOneAndUpdate(filter, update, {
                new: true
            })

            //response
            res.status(200).json({ message:"Password updated" });
        }
    } catch (error) {
        next(error);
    }
}