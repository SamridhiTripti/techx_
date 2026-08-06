import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import logo from '../assets/logo.svg'

const Footer = () => {
  return (
    <footer className='border-t border-slate-200 bg-slate-950 text-slate-300'>
        <div className='mx-auto flex max-w-7xl flex-col gap-6 px-3 py-8 md:px-5 lg:flex-row lg:items-start lg:justify-between lg:px-6'>
            <div className='max-w-md'>
                <div className='flex items-center gap-3'>
                    <div className='relative h-10 w-10 overflow-hidden rounded-2xl bg-white text-white'>
                        <img src={logo} alt='TechX' className='h-full w-full object-contain p-1' />
                    </div>
                    <div>
                        <p className='text-lg font-semibold tracking-[0.24em] text-white'>TechX</p>
                        <p className='text-[11px] uppercase tracking-[0.3em] text-slate-400'>Gadget market</p>
                    </div>
                </div>
                <p className='mt-4 text-sm text-slate-400'>Premium gadgets, fast delivery, and thoughtful support for modern life.</p>
            </div>

            <div className='flex flex-wrap gap-8 text-sm'>
                <div>
                    <p className='mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-white'>Shop</p>
                    <div className='flex flex-col gap-2 text-slate-400'>
                        <a href='' className='transition hover:text-cyan-400'>Phones</a>
                        <a href='' className='transition hover:text-cyan-400'>Laptops</a>
                        <a href='' className='transition hover:text-cyan-400'>Accessories</a>
                    </div>
                </div>
                <div>
                    <p className='mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-white'>Support</p>
                    <div className='flex flex-col gap-2 text-slate-400'>
                        <a href='' className='transition hover:text-cyan-400'>Contact us</a>
                        <a href='' className='transition hover:text-cyan-400'>Shipping</a>
                        <a href='' className='transition hover:text-cyan-400'>Returns</a>
                    </div>
                </div>
            </div>

            <div className='flex items-center gap-4 text-xl text-slate-400'>
                <a href='' className='transition hover:text-cyan-400'><FaFacebook /></a>
                <a href='' className='transition hover:text-cyan-400'><FaInstagram /></a>
                <a href='' className='transition hover:text-cyan-400'><FaLinkedin /></a>
            </div>
        </div>
        <div className='border-t border-slate-800 px-3 py-4 text-center text-sm text-slate-500'>© 2024 TechX. All rights reserved.</div>
    </footer>
  )
}

export default Footer
