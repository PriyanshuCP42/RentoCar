// 

import React from 'react'
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { setShowLogin, axios, setToken, setUser } = useAppContext();
    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const payload =
                state === "signup"
                    ? { name, email, password }
                    : { email, password };

            const { data } = await axios.post(`/api/user/${state}`, payload);

            // SUCCESS CONDITION
            if (data.token) {
                // Save token
                setToken(data.token);
                localStorage.setItem("token", data.token);

                // Fetch user data
                const userRes = await axios.get('/api/user/data', {
                    headers: { Authorization: `Bearer ${data.token}` }
                });

                if (userRes.data.user) {
                    setUser(userRes.data.user);
                }

                setShowLogin(false);
                navigate("/");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div onClick={() => setShowLogin(false)} className='fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center text-sm text-gray-600 bg-black/50'>
            <form onSubmit={onSubmitHandler} onClick={(e) => e.stopPropagation()} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white">
                <p className="text-2xl font-medium m-auto">
                    <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
                </p>

                {state === "signup" && (
                    <div className="w-full">
                        <p>Name</p>
                        <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1" type="text" required />
                    </div>
                )}

                <div className="w-full">
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1" type="email" required />
                </div>

                <div className="w-full">
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1" type="password" required />
                </div>

                {state === "signup" ? (
                    <p>
                        Already have account? <span onClick={() => setState("login")} className="text-primary cursor-pointer">click here</span>
                    </p>
                ) : (
                    <p>
                        Create an account? <span onClick={() => setState("signup")} className="text-primary cursor-pointer">click here</span>
                    </p>
                )}

                <button className="bg-primary hover:bg-blue-800 transition-all text-white w-full py-2 rounded-md">
                    {state === "signup" ? "Create Account" : "Login"}
                </button>
            </form>
        </div>
    )
}

export default Login
