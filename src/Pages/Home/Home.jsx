import { FaCheckDouble } from "react-icons/fa";
import banner from "../../assets/images/banner.png"
import 'aos/dist/aos.css';
const Home = () => {
    return (
        <div className="hero min-h-screen bg-base-100">
        <div className="hero-content flex-col lg:flex-row-reverse text-center" data-aos="fade-up">
          <img src={banner} className="max-w-sm" />
          <div>
            <h1 className="text-4xl text-[#2a92fa] font-bold">Unified Task Management</h1>
         <div className="space-y-1 my-4 font-semibold text-justify">
         <p className="flex flex-row items-center justify-center gap-2"><FaCheckDouble />Enhanced communication between teams and stakeholders or supervisors.</p>
            <p className="flex flex-row items-center justify-center gap-2"><FaCheckDouble />Increased collaboration among team members .</p>
            <p className="flex flex-row items-center justify-center gap-2"><FaCheckDouble />Projects staying on task and on time.</p>
            <p className="flex flex-row items-center justify-center gap-2"><FaCheckDouble />More transparency with task flow.</p>
            <p className="flex flex-row items-center justify-center gap-2"><FaCheckDouble />A better understanding of the needs of a project or tasks.</p>
            
         </div>
         <div className="text-center">
         <button className="btn bg-[#2a92fa] text-[#ffffff] text-center">Get Explore</button>
         </div>
            
          </div>
        </div>
      </div>
    );
};

export default Home;