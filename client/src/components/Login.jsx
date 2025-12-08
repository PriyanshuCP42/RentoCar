import React from 'react'

const Login = ({ setShowLogin }) => {
    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const url = state === "login"
            ? "http://localhost:3000/api/user/login"
            : "http://localhost:3000/api/user/signup";

        const body = state === "login"
            ? { email, password }
            : { name, email, password };

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message);
                return;
            }

            // Save token
            localStorage.setItem("token", data.token);

            alert(state === "login" ? "Login Successful" : "Signup Successful");

            // Reload page to update Navbar login/logout
            window.location.reload();

        } catch (err) {
            console.log(err);
            alert("Something went wrong");
        }
    };

    return (
        <div 
            onClick={() => setShowLogin(false)} 
            className='fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center text-sm text-gray-600 bg-black/50'>
            
            <form 
                onSubmit={onSubmitHandler} 
                onClick={(e) => e.stopPropagation()} 
                className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white"
            >

                <p className="text-2xl font-medium m-auto">
                    <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
                </p>

                {state === "register" && (
                    <div className="w-full">
                        <p>Name</p>
                        <input 
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                            placeholder="type here" 
                            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary-500"
                            type="text"
                            required 
                        />
                    </div>
                )}

                <div className="w-full ">
                    <p>Email</p>
                    <input 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="type here" 
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                        type="email"
                        required 
                    />
                </div>

                <div className="w-full ">
                    <p>Password</p>
                    <input 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="type here" 
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                        type="password"
                        required 
                    />
                </div>

                {state === "register" ? (
                    <p>
                        Already have account?{" "}
                        <span 
                            onClick={() => setState("login")} 
                            className="text-primary cursor-pointer">
                            click here
                        </span>
                    </p>
                ) : (
                    <p>
                        Create an account?{" "}
                        <span 
                            onClick={() => setState("register")} 
                            className="text-primary cursor-pointer">
                            click here
                        </span>
                    </p>
                )}

                <button className="bg-primary hover:bg-blue-800 transition-all text-white w-full py-2 rounded-md cursor-pointer">
                    {state === "register" ? "Create Account" : "Login"}
                </button>

            </form>
        </div>
    );
};

export default Login;
