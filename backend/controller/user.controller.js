import User from "../model/user.model.js"
import { z } from "zod"

// User schema validation using Zod
const userSchema = z.object({
    email: z.string().email({message: "invalid email address"}),
    username: z.string().min(3,{message: "Username atleast 3 character long"}).max(20),
    password: z.string().min(4,{message: "Password atlest 4 character long"}).max(20)
})

const register = async (req, res) => {
    try {
        const { email, username, password } = req.body
        const user = await User.findOne({ email })
        if(!email || !password || !username){
            return res.status(400).json({ message: "All fields are required" })
        }
        
        if (user) {
            return res.status(400).json({ message: "User already registered" })
        }
        const validation = userSchema.safeParse({email, username, password})
        if (!validation.success) {
            const errorMessage = validation.error.errors.map(err => err.message)
            return res.status(400).json({ message: errorMessage});
        }
        const newUser = new User({ username, email, password })
        await newUser.save()

        if (newUser) {
            res.status(201).json({ message: "User registered Successfully", newUser })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error in registering User" });
    }

}
const login = (req, res) => {
    console.log("login function called");

}
const logout = (req, res) => {
    console.log("logout function called");

}

export { register, login, logout }