import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const valideValue = Object.values(data).every(el => el)


    const handleSubmit = async(e)=>{
        e.preventDefault()

        if(data.password !== data.confirmPassword){
            toast.error(
                "password and confirm password must be same"
            )
            return
        }

        try {
            const response = await Axios({
                ...SummaryApi.register,
                data : data
            })
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                setData({
                    name : "",
                    email : "",
                    password : "",
                    confirmPassword : ""
                })
                navigate("/login")
            }

        } catch (error) {
            AxiosToastError(error)
        }



    }
    return (
        <section className='mx-auto flex min-h-[80vh] w-full max-w-7xl items-center justify-center px-3 py-8 md:px-5 lg:px-6'>
            <div className='w-full max-w-lg rounded-[28px] border border-slate-200 bg-white p-7 shadow-soft'>
                <div className='mb-6'>
                    <p className='text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600'>Create account</p>
                    <h2 className='mt-2 text-2xl font-semibold text-slate-900'>Join TechX for premium gadget access</h2>
                </div>

                <form className='grid gap-4' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <label htmlFor='name' className='text-sm font-medium text-slate-700'>Name</label>
                        <input
                            type='text'
                            id='name'
                            autoFocus
                            className='rounded-2xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-cyan-500 focus:bg-white'
                            name='name'
                            value={data.name}
                            onChange={handleChange}
                            placeholder='Enter your name'
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='email' className='text-sm font-medium text-slate-700'>Email</label>
                        <input
                            type='email'
                            id='email'
                            className='rounded-2xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-cyan-500 focus:bg-white'
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                            placeholder='Enter your email'
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='password' className='text-sm font-medium text-slate-700'>Password</label>
                        <div className='flex items-center rounded-2xl border border-slate-200 bg-slate-50 p-3 transition focus-within:border-cyan-500 focus-within:bg-white'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='password'
                                className='w-full bg-transparent outline-none'
                                name='password'
                                value={data.password}
                                onChange={handleChange}
                                placeholder='Enter your password'
                            />
                            <div onClick={() => setShowPassword(preve => !preve)} className='cursor-pointer text-slate-500'>
                                {
                                    showPassword ? (
                                        <FaRegEye />
                                    ) : (
                                        <FaRegEyeSlash />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='confirmPassword' className='text-sm font-medium text-slate-700'>Confirm Password</label>
                        <div className='flex items-center rounded-2xl border border-slate-200 bg-slate-50 p-3 transition focus-within:border-cyan-500 focus-within:bg-white'>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id='confirmPassword'
                                className='w-full bg-transparent outline-none'
                                name='confirmPassword'
                                value={data.confirmPassword}
                                onChange={handleChange}
                                placeholder='Enter your confirm password'
                            />
                            <div onClick={() => setShowConfirmPassword(preve => !preve)} className='cursor-pointer text-slate-500'>
                                {
                                    showConfirmPassword ? (
                                        <FaRegEye />
                                    ) : (
                                        <FaRegEyeSlash />
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <button disabled={!valideValue} className={`rounded-2xl py-3 font-semibold tracking-wide text-white transition ${valideValue ? 'bg-slate-950 hover:bg-cyan-600' : 'bg-slate-400'}`}>Register</button>

                </form>

                <p className='mt-6 text-sm text-slate-600'>
                    Already have an account? <Link to={"/login"} className='font-semibold text-cyan-600 hover:text-cyan-700'>Login</Link>
                </p>
            </div>
        </section>
    )
}

export default Register
