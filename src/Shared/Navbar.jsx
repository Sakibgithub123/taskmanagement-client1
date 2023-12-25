import { NavLink } from "react-router-dom";


const Navbar = () => {
    const navBar =
        <>
            <li><NavLink to={'/'}>Home</NavLink></li>
            <li><NavLink to={'/dashboard'}>Dashboard</NavLink></li>
        </>
    return (
        <div className="navbar bg-[#2a92fa] text-[#ffffff] font-semibold">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                       {navBar}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Task Management</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                 {navBar}
                </ul>
            </div>
            <div className="navbar-end gap-3">
                <NavLink to={'/login'} className="btn text-[#2a92fa]">Login</NavLink>
                <NavLink to={'/signup'} className="btn text-[#2a92fa]">Signup</NavLink>
            </div>
        </div>
    );
};

export default Navbar;