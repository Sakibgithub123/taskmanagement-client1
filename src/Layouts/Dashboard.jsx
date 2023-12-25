import { useContext } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import avater from "../assets/images/avater.png"


const Dashboard = () => {
    const { user, userLogout } = useContext(AuthContext)
    const navigate=useNavigate();
    const handleLogOut=()=>{
        userLogout()
        .then(()=>{
            navigate('/')

        })
        .catch()

    }
    const navBar =
        <>
            <li><NavLink to={'/'}>Go Home</NavLink> </li>
            <li><NavLink to={'/dashboard/content'}>Task</NavLink></li>
            <li onClick={handleLogOut}><a>Logout</a></li>
            <li className="dropdown dropdown-bottom">
               
               <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                   <div className="w-10 rounded-full">
                       {
                           user?.photoURL?
                           <img alt="avater" src={user?.photoURL} />
                           :
                           <img alt="avater" src={avater} />

                       }
                       
                   </div>
               </label>
           </li>
           
        </>
    return (
        <div className="max-w-6xl mx-auto" >
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
            </div>
            <div className="divider"></div>
            <div>
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default Dashboard;