import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Redux/store";
import { logout } from "../Redux/userSlice";



const Navbar: React.FC = () => {
    const isLogged = useSelector((state: RootState) => state.isLoggedIn);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout())
        navigate("/login");
    };

    return (
        <nav className="flex items-center fixed w-full top-0 left-0  justify-between px-10 py-5 bg-[rgb(83,122,240)] border-0 shadow-xl">
            <div className="flex items-center gap-6">
                <h2
                    className="text-2xl font-semibold cursor-pointer text-white-600"
                >
                    Employee Manager
                </h2>
            </div>
            <div className="flex items-center hide gap-4">
                <div className="flex items-center gap-2 text-md text-gray-700">
                    {isLogged && <button
                        onClick={handleLogout}
                        className=" bg-transparent! text-white border-0!"
                    >
                        Logout
                    </button> }

                </div>
            </div>
        </nav>
    );
};

export default React.memo(Navbar);
