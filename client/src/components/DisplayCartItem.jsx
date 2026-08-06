import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../provider/GlobalProvider'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from 'react-redux'
import AddToCartButton from './AddToCartButton'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import imageEmpty from '../assets/empty_cart.webp'
import toast from 'react-hot-toast'

const DisplayCartItem = ({close}) => {
    const { notDiscountTotalPrice, totalPrice ,totalQty} = useGlobalContext()
    const cartItem  = useSelector(state => state.cartItem.cart)
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    const redirectToCheckoutPage = ()=>{
        if(user?._id){
            navigate("/checkout")
            if(close){
                close()
            }
            return
        }
        toast("Please Login")
    }
  return (
    <section className='fixed inset-0 z-50 bg-slate-950/70'>
        <div className='ml-auto flex h-full w-full max-w-sm flex-col bg-white'>
            <div className='flex items-center justify-between gap-3 border-b border-slate-200 p-4'>
                <div>
                    <h2 className='text-lg font-semibold text-slate-900'>Your cart</h2>
                    <p className='text-sm text-slate-500'>{totalQty} item{totalQty === 1 ? '' : 's'}</p>
                </div>
                <div className='flex items-center gap-2'>
                    <Link to={"/"} className='rounded-full p-2 text-slate-600 lg:hidden'>
                        <IoClose size={22}/>
                    </Link>
                    <button onClick={close} className='hidden rounded-full p-2 text-slate-600 lg:block'>
                        <IoClose size={22}/>
                    </button>
                </div>
            </div>

            <div className='flex-1 overflow-auto bg-slate-50 p-3'>
                {
                    cartItem[0] ? (
                        <>
                            <div className='mb-3 flex items-center justify-between rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm text-cyan-700'>
                                    <p>Your total savings</p>
                                    <p>{DisplayPriceInRupees(notDiscountTotalPrice - totalPrice )}</p>
                            </div>
                            <div className='grid gap-3'>
                                    {
                                        cartItem[0] && (
                                            cartItem.map((item,index)=>{
                                                return(
                                                    <div key={item?._id+"cartItemDisplay"} className='flex w-full gap-3 rounded-[20px] border border-slate-200 bg-white p-3'>
                                                        <div className='h-16 w-16 min-h-16 min-w-16 overflow-hidden rounded-2xl bg-slate-100'>
                                                            <img
                                                                src={item?.productId?.image[0]}
                                                                className='h-full w-full object-contain'
                                                                alt={item?.productId?.name}
                                                            />
                                                        </div>
                                                        <div className='flex-1 text-sm'>
                                                            <p className='line-clamp-2 text-slate-800'>{item?.productId?.name}</p>
                                                            <p className='mt-1 text-slate-400'>{item?.productId?.unit}</p>
                                                            <p className='mt-2 font-semibold text-slate-900'>{DisplayPriceInRupees(pricewithDiscount(item?.productId?.price,item?.productId?.discount))}</p>
                                                        </div>
                                                        <div className='flex items-start'>
                                                            <AddToCartButton data={item?.productId}/>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        )
                                    }
                            </div>
                            <div className='mt-3 rounded-[24px] border border-slate-200 bg-white p-4'>
                                <h3 className='font-semibold text-slate-900'>Bill details</h3>
                                <div className='mt-3 flex items-center justify-between text-sm text-slate-600'>
                                    <p>Items total</p>
                                    <p className='flex items-center gap-2'><span className='text-slate-400 line-through'>{DisplayPriceInRupees(notDiscountTotalPrice)}</span><span className='font-semibold text-slate-900'>{DisplayPriceInRupees(totalPrice)}</span></p>
                                </div>
                                <div className='mt-2 flex items-center justify-between text-sm text-slate-600'>
                                    <p>Quantity total</p>
                                    <p className='font-semibold text-slate-900'>{totalQty} item</p>
                                </div>
                                <div className='mt-2 flex items-center justify-between text-sm text-slate-600'>
                                    <p>Delivery charge</p>
                                    <p className='font-semibold text-slate-900'>Free</p>
                                </div>
                                <div className='mt-3 flex items-center justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-900'>
                                    <p>Grand total</p>
                                    <p>{DisplayPriceInRupees(totalPrice)}</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className='flex h-full flex-col items-center justify-center rounded-[24px] border border-slate-200 bg-white p-5 text-center'>
                            <img
                                src={imageEmpty}
                                className='h-48 w-full object-contain'
                                alt='empty cart'
                            />
                            <Link onClick={close} to={"/"} className='mt-3 block rounded-full bg-slate-950 px-4 py-2 text-white'>Shop Now</Link>
                        </div>
                    )
                }
            </div>

            {
                cartItem[0] && (
                    <div className='border-t border-slate-200 bg-white p-3'>
                        <div className='flex items-center justify-between rounded-full bg-slate-950 px-4 py-3 text-base font-semibold text-white'>
                            <div>
                                {DisplayPriceInRupees(totalPrice)}
                            </div>
                            <button onClick={redirectToCheckoutPage} className='flex items-center gap-1'>
                                Proceed
                                <span><FaCaretRight/></span>
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    </section>
  )
}

export default DisplayCartItem
