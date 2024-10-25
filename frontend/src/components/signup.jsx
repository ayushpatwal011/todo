import axios from "axios"
import React, { useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"

function SignUp() {

    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigateTo = useNavigate()
    
    const handleRegister = async (e) => {
        e.preventDefault()
        try{
            const {data} = await axios.post("http://localhost:4001/user/signup",
                {username, email, password },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            console.log(data)
            toast.success(data.message || "User Register Successfully")
            localStorage.setItem("jwt",data.token)
            setEmail("")
            setPassword("")
            setUserName("")
            navigateTo("/login")

        }
        catch (error){
            console.log(error);
            toast.error(error.response.data.message || "User Registration Failed")
            
        }
    }

    return (<>

                <div className="bg-sky-500 min-h-screen flex items-center justify-center  flex-col  ">
                    <div className="bg-gray-200 w-full max-w-md p-6 rounded-lg shadow-lg  ">
                        <h2 className=" text-2xl font-bold mb-4 text-center">SignUp</h2>
                        <form onSubmit={handleRegister}>
                            {/* {username} */}
                            <div className="mb-2 ">
                                <label className="block mb-2 font-semibold" htmlFor="username">Username:</label>
                                <input className=" w-full p-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    type="text"
                                    value={username}
                                    onChange={(e) => { setUserName(e.target.value) }}
                                    placeholder="Type Username" />
                            </div>
                            {/* {email} */}
                            <div className="mb-4 ">
                                <label className="block mb-2 font-semibold" htmlFor="username">Email:</label>
                                <input className=" w-full p-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    type="text"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    placeholder="Type Email" />
                            </div>
                            {/* {password} */}
                            <div className="mb-4 ">
                                <label className="block mb-2 font-semibold" htmlFor="username">Password:</label>
                                <input className=" w-full p-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    type="password"
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    placeholder="Type Password" />
                            </div>
                            <button className="w-full bg-purple-500 text-white rounded-md py-2 hover:bg-blue-600 transition"
                            type="submit" >
                                SignUp
                            </button>
                            <p className=" mt-2 text-center text-gray-600 text-sm">
                                Already have an account?
                                <Link className="text-sky-700 hover:underline"
                                    to={"/login"}>
                                    Login
                                </Link></p>
                        </form>
                    </div>
                </div>

    </>)
}
export default SignUp