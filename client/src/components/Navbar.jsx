
// // import React, { useState } from 'react'
// // import { assets, menuLinks } from "../assets/asset"
// // import { Link, useLocation } from 'react-router-dom'

// // const Navbar = () => {
// //     const location = useLocation()
// //     const [open, setOpen] = useState(false)

// //     return (
// //         <div className={`flex items-center justify-between px-8 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 
// //             border-b border-borderColor relative transition-all duration-300
// //             ${location.pathname === "/" ? "bg-light" : ""}`}>

// //             <Link to="/">
// //                 <img src={assets.logo} alt="logo" className='h-8' />
// //             </Link>

// //             {/* MOBILE MENU */}
// //             <div
// //                 className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t 
// //                 border-borderColor right-0 flex-col sm:flex-row items-start sm:items-center 
// //                 gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50
// //                 ${location.pathname === "/" ? "bg-light" : "bg-white"}
// //                 ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}
// //                 `}
// //             >
// //                 {menuLinks.map((link, idx) => (
// //                     <Link key={idx} to={link.path}>
// //                         {link.name}
// //                     </Link>
// //                 ))}
// //             </div>
// //         </div>
// //     )
// // }

// // export default Navbar

// import React, { useState } from 'react'
// import { assets, menuLinks } from "../assets/asset"
// import { Link, useLocation, useNavigate } from 'react-router-dom'

// const Navbar = ({ setShowLogin }) => {
//     const location = useLocation()
//     const [open, setOpen] = useState(false)
//     const navigate = useNavigate()

//     return (
//         <div className={`flex items-center justify-between 
//             px-8 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 
//             border-b border-borderColor 
//             ${location.pathname === "/" ? "bg-light" : "bg-white"}
//         `}>

//             {/* Logo */}
//             <Link to="/">
//                 <img src={assets.logo} alt="logo" className="h-8" />
//             </Link>

//             {/* Desktop menu - hide on mobile */}
//             {/* MOBILE MENU */}
//             <div
//                 className={`
//                             max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 
//                             max-sm:border-t border-borderColor right-0 
//                             flex flex-col sm:flex-row items-start sm:items-center 
//                             gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50
//                             ${location.pathname === "/" ? "bg-light" : "bg-white"}
//                             ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}
//             >
//                 {menuLinks.map((link, idx) => (
//                     <Link
//                         key={idx}
//                         to={link.path}
//                         className="py-2"
//                         onClick={() => setOpen(false)}
//                     >
//                         {link.name}
//                     </Link>
//                 ))}

//                 <div className='hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full max-w-56'>
//                     <input type="text" className='py-1.5 w-full bg-transparent outline-none placeholder-gray-500'
//                         placeholder='Search products' />
//                     <img src={assets.search_icon} alt="search" />

//                 </div>

//                 <div className='flex max-sm:flex-col items-start sm:items center gap-6 '>
//                     <button onClick={() => navigate('/owner')} className='cursor-pointer py-1.5'>Dashboard</button>
//                     <button onClick={() => setShowLogin(true)} className='cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg'>
//                         Login
//                     </button>
//                 </div>
//             </div>

//             <button className='sm:hidden cursor-pointer' aria-label='Menu' onClick={() => setOpen(!open)}>
//                 <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
//             </button>

//         </div>
//     )
// }

// export default Navbar

import React, { useState, useEffect } from 'react'
import { assets, menuLinks } from "../assets/asset"
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = ({ setShowLogin }) => {
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    // Track login state
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) setLoggedIn(true);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setLoggedIn(false);
    };

    return (
        <div className={`flex items-center justify-between 
            px-8 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 
            border-b border-borderColor 
            ${location.pathname === "/" ? "bg-light" : "bg-white"}
        `}>

            {/* Logo */}
            <Link to="/">
                <img src={assets.logo} alt="logo" className="h-8" />
            </Link>

            {/* MENU */}
            <div
                className={`
                    max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 
                    max-sm:border-t border-borderColor right-0 
                    flex flex-col sm:flex-row items-start sm:items-center 
                    gap-4 sm:gap-8 max-sm:p-4 
                    transition-all duration-300 z-50
                    ${location.pathname === "/" ? "bg-light" : "bg-white"}
                    ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}
                `}
            >

                {/* Menu Links */}
                {menuLinks.map((link, idx) => (
                    <Link
                        key={idx}
                        to={link.path}
                        className="py-2"
                        onClick={() => setOpen(false)}
                    >
                        {link.name}
                    </Link>
                ))}

                {/* Search Bar */}
                <div className='hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full max-w-56'>
                    <input 
                        type="text" 
                        className='py-1.5 w-full bg-transparent outline-none placeholder-gray-500'
                        placeholder='Search products' 
                    />
                    <img src={assets.search_icon} alt="search" />
                </div>

                {/* Dashboard + Login / Logout buttons */}
                <div className='flex max-sm:flex-col items-start sm:items-center gap-6'>

                    <button 
                        onClick={() => navigate('/owner')} 
                        className='cursor-pointer py-1.5'
                    >
                        Dashboard
                    </button>

                    {/* LOGIN / LOGOUT Button */}
                    {!loggedIn ? (
                        <button 
                            onClick={() => setShowLogin(true)}
                            className='cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg'
                        >
                            Login
                        </button>
                    ) : (
                        <button 
                            onClick={handleLogout}
                            className='cursor-pointer px-8 py-2 bg-red-600 hover:bg-red-700 transition-all text-white rounded-lg'
                        >
                            Logout
                        </button>
                    )}

                </div>
            </div>

            {/* Mobile menu toggle */}
            <button 
                className='sm:hidden cursor-pointer' 
                aria-label='Menu' 
                onClick={() => setOpen(!open)}
            >
                <img 
                    src={open ? assets.close_icon : assets.menu_icon} 
                    alt="menu" 
                />
            </button>
        </div>
    );
}

export default Navbar;
