import React from "react";
import Cart from "./layout/cart";
import { Link } from "react-router-dom";
import logo from "../../public/logo.jpg"
import { AiFillHome } from "react-icons/ai"; // أيقونة home

const Nav = () => {
    return (

        <nav className="relative top-0 left-0 right-0 bg-gray-200 shadow-md">
            <div className="flex justify-between items-center px-4 py-4">
                <div className="flex items-center gap-2">
                    <img className="h-10 w-10 rounded-full object-cover" src={logo} alt="Runzu logo" />
                    <span className="text-xl font-bold text-gray-800">Runzu</span>
                </div>



                <div>
                    <Link to="/" className="text-blue-500 hover:underline flex items-center gap-1">
                        <AiFillHome className="text-xl" />
                        home
                    </Link>
                </div>

                <div className="flex">
                    <Cart />
                </div>
            </div>

        </nav>


    )
};

export default Nav;
