import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import fetchUserDetails from '../utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

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

        try {
            const response = await Axios({
                ...SummaryApi.login,
                data : data
            })
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                const token = response.data.data?.accessToken || response.data.data?.accesstoken
                const rToken = response.data.data?.refreshToken
                if(token) localStorage.setItem('accesstoken', token)
                if(rToken) localStorage.setItem('refreshToken', rToken)

                // Also set user from login response immediately
                if(response.data.data?.user){
                    dispatch(setUserDetails(response.data.data.user))
                }
                const userDetails = await fetchUserDetails()
                if(userDetails?.data) dispatch(setUserDetails(userDetails.data))

                setData({
                    email : "",
                    password : "",
                })
                navigate("/")
            }

        } catch (error) {
            AxiosToastError(error)
        }



    }
    return (
        <section className='mx-auto flex min-h-[80vh] w-full max-w-7xl items-center justify-center px-3 py-8 md:px-5 lg:px-6'>
            <div className='w-full max-w-lg rounded-[28px] border border-slate-200 bg-white p-7 shadow-soft'>
                <div className='mb-6'>
                    <p className='text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600'>Welcome back</p>
                    <h2 className='mt-2 text-2xl font-semibold text-slate-900'>Sign in to your TechX account</h2>
                </div>

                <form className='grid gap-4' onSubmit={handleSubmit}>
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
                        <Link to={"/forgot-password"} className='ml-auto text-sm text-slate-500 transition hover:text-cyan-600'>Forgot password?</Link>
                    </div>

                    <button disabled={!valideValue} className={`rounded-2xl py-3 font-semibold tracking-wide text-white transition ${valideValue ? 'bg-slate-950 hover:bg-cyan-600' : 'bg-slate-400'}`}>Login</button>

                </form>

                <p className='mt-6 text-sm text-slate-600'>
                    Don't have an account? <Link to={"/register"} className='font-semibold text-cyan-600 hover:text-cyan-700'>Register</Link>
                </p>
            </div>
        </section>
    )
}

export default Login

