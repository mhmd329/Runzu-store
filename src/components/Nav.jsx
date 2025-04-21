import React from "react";
import Cart from "./cart";

const Nav = () => {
    return (

        <nav className="relative top-0 left-0 right-0 bg-gray-200 shadow-md">
            <div className="flex justify-between items-center px-4 py-4">
                <div>
                    <img className="h-14 w-16 rounded-lg" src="https://images.pexels.com/photos/4041160/pexels-photo-4041160.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" />
                </div>
               
                <div className="flex">
                <span className="text-2xl font-bold text-gray-700">Runzu</span>
                <Cart/>
                </div>
            </div>

        </nav>


    )
};

export default Nav;
