import React, { useState } from 'react'
import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from '../hooks/useMobile';
import { BsCart4 } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from './UserMenu';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import { useGlobalContext } from '../provider/GlobalProvider';
import DisplayCartItem from './DisplayCartItem';
import logo from '../assets/logo.svg'

const Header = () => {
    const [isMobile] = useMobile()
    const location = useLocation()
    const isSearchPage = location.pathname === "/search"
    const navigate = useNavigate()
    const user = useSelector((state) => state?.user)
    const [openUserMenu, setOpenUserMenu] = useState(false)
    const cartItem = useSelector(state => state.cartItem.cart)
    const { totalPrice, totalQty } = useGlobalContext()
    const [openCartSection, setOpenCartSection] = useState(false)

    const redirectToLoginPage = () => {
        navigate("/login")
    }

    const handleCloseUserMenu = () => {
        setOpenUserMenu(false)
    }

    const handleMobileUser = () => {
        if (!user._id) {
            navigate("/login")
            return
        }

        navigate("/user")
    }

    return (
        <header className='sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl'>
            {
                !(isSearchPage && isMobile) && (
                    <div className='mx-auto flex h-20 max-w-7xl items-center justify-between px-3 md:px-5 lg:px-6'>
                        <Link to={'/'} className='flex items-center gap-3'>
                            <div className='relative h-10 w-10 overflow-hidden rounded-2xl bg-slate-950 text-white shadow-soft'>
                                <img src={logo} alt='TechX' className='h-full w-full object-contain p-1' />
                            </div>
                            <div>
                                <p className='text-lg font-semibold tracking-[0.24em] text-slate-900'>TechX</p>
                                <p className='text-[11px] uppercase tracking-[0.3em] text-slate-500'>Gadget market</p>
                            </div>
                        </Link>

                        <div className='hidden flex-1 justify-center px-4 lg:flex'>
                            <Search />
                        </div>

                        <div className='flex items-center gap-2'>
                            <button className='rounded-full border border-slate-200 p-2 text-slate-600 transition hover:border-cyan-500 hover:text-cyan-600 lg:hidden' onClick={handleMobileUser}>
                                <FaRegCircleUser size={20} />
                            </button>

                            <div className='hidden items-center gap-3 lg:flex'>
                                {
                                    user?._id ? (
                                        <div className='relative'>
                                            <div onClick={() => setOpenUserMenu(prev => !prev)} className='flex cursor-pointer select-none items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100'>
                                                <span>Account</span>
                                                {
                                                    openUserMenu ? (
                                                        <GoTriangleUp size={18} />
                                                    ) : (
                                                        <GoTriangleDown size={18} />
                                                    )
                                                }
                                            </div>
                                            {
                                                openUserMenu && (
                                                    <div className='absolute right-0 top-12'>
                                                        <div className='min-w-52 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft'>
                                                            <UserMenu close={handleCloseUserMenu} />
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    ) : (
                                        <button onClick={redirectToLoginPage} className='rounded-full px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100'>Login</button>
                                    )
                                }
                                <button onClick={() => setOpenCartSection(true)} className='flex items-center gap-3 rounded-full bg-slate-950 px-3 py-2 text-white transition hover:bg-cyan-600'>
                                    <div className='text-lg'>
                                        <BsCart4 />
                                    </div>
                                    <div className='text-left text-sm'>
                                        {
                                            cartItem[0] ? (
                                                <div>
                                                    <p className='font-semibold'>{totalQty} Items</p>
                                                    <p className='text-xs text-slate-300'>{DisplayPriceInRupees(totalPrice)}</p>
                                                </div>
                                            ) : (
                                                <p className='font-semibold'>My Cart</p>
                                            )
                                        }
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            <div className='mx-auto px-3 pb-3 lg:hidden'>
                <Search />
            </div>

            {
                openCartSection && (
                    <DisplayCartItem close={() => setOpenCartSection(false)} />
                )
            }
        </header>
    )
}

export default Header
