import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { useForm } from "react-hook-form"
import useAxiousSecure from "../hook/useAxiousSecure";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";
const Image_hosting_key = 'f7e60a735ab4c0b0fbfb6d08328c7dbf';
const Image_hosting_api = `https://api.imgbb.com/1/upload?key=${Image_hosting_key}`


const Signup = () => {
    const { createUser, updateUserProfile, userLogout } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const navigate = useNavigate()
    const [error,setError]=useState('')
    const axiousSecure=useAxiousSecure()
    const onSubmit =  (data) => {
        console.log(data)
        createUser(data.email, data.password)
            .then(async (result) => {
                console.log(result.user)
                const photoFile = { image: data.image[0] }
                const sentfileImgbb = await axiousSecure.post(Image_hosting_api, photoFile, {
                    headers: {
                        'content-type':'multipart/form-data'
                    }
                });
                // console.log(sentfileImgbb.data.data.display_url)
                if (sentfileImgbb.data.success) {
                    // console.log(data.display_url)
                    updateUserProfile(data.name, sentfileImgbb.data.data.display_url)
                        .then(async () => {
                            const userInfo = {
                                name: data.name,
                                email: data.email,
                                image: sentfileImgbb.data.data.display_url,
                    
                            }
                            // console.log(userInfo)
                            const userRes = await axios.post('http://localhost:5000/users', userInfo)
                            if (userRes.data.insertedId) {
                                Swal.fire({
                                    title: "Good job!",
                                    text: "Signup success!",
                                    icon: "success"
                                  });
                                userLogout()
                                    .then(() => {
                                        navigate('/login')
                                    })
                                    .catch(error => {
                                        console.error(error)
                                    })
                            }

                        })
                        .catch(error => {
                            console.error(error)
                        })

                }
            })
            .catch(error => {
                console.error(error)
                setError(error)
            })

    }


    return (
        <div>
            <div className="hero-content flex-col lg:flex-row-reverse gap-10">
                {/* <div className="text-center lg:text-left lg:w-1/3 md:mb-8 ">
                    <h1 className="text-5xl font-bold md:ml-10 mb-4">SignUp now!</h1>
                    <img className="w-3/4" src={img} alt="" />
                </div> */}
                <div className="card  lg:w-1/3 shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <h3 className="text-2xl font-bold text-center mb-4">SignUp</h3>
                        {
                            error ? <p className="text-red-500 text-center">Email Already Exists!</p> : ""
                        }
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" {...register("name", { required: true })} placeholder="name" className="input input-bordered" />
                            {errors.name?.type === "required" && <span className="text-red-900">Name field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email"  {...register("email", {
                                required: true,
                                pattern: /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/
                            })} placeholder="email" className="input input-bordered" required />
                            {errors.email?.type === "required" && <span className="text-red-900">Email Field is required</span>}
                            {errors.email?.type === "pattern" && <span className="text-red-900">Enter a valid email address. </span>}
                        </div>
                      
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo</span>
                            </label>
                            <input type="file" {...register("image", { required: true })} placeholder="photo" className="input input-bordered" />
                            {errors.image?.type === "required" && <span className="text-red-900">Photo field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" {...register("password", {
                                required: true,
                                pattern: /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}/
                            })} placeholder="password" className="input input-bordered" />
                            {errors.password?.type === "required" && <span className="text-red-900">Password field is required</span>}
                            {errors.password?.type === "pattern" && <span className="text-red-900">Password must be minimum six characters, at least one letter, one number and one special character.</span>}
                        </div>
                        <p className="font-semibold text-center">Already have any account?<Link className="underline text-[#023b6d] " to={'/login'}>Login here..</Link></p>
                        <div className="form-control mt-6">
                            <button className="btn bg-[#2a92fa] text-[#ffffff]">Signup</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default Signup;