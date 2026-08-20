import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../provider/GlobalProvider'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { FaCaretRight } from "react-icons/fa";
import { BsCartX } from "react-icons/bs";
import { useSelector } from 'react-redux'
import AddToCartButton from './AddToCartButton'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import toast from 'react-hot-toast'

const DisplayCartItem = ({ close }) => {
    const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext()
    const cartItem = useSelector(state => state.cartItem.cart) || []
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    const redirectToCheckoutPage = () => {
        if (user?._id) {
            navigate("/checkout")
            if (close) {
                close()
            }
            return
        }
        toast.error("Please login to proceed to checkout")
        navigate("/login")
        if (close) {
            close()
        }
    }

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget && close) {
            close()
        }
    }

    return (
        <section 
            onClick={handleBackdropClick}
            className='fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300'
        >
            <div 
                onClick={(e) => e.stopPropagation()}
                className='flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300'
            >
                {/* Header */}
                <div className='flex items-center justify-between border-b border-slate-200/80 px-5 py-4'>
                    <div>
                        <h2 className='text-lg font-bold text-slate-900'>Your Shopping Cart</h2>
                        <p className='text-xs text-slate-500 font-medium'>{totalQty} {totalQty === 1 ? 'item' : 'items'} in cart</p>
                    </div>
                    <button 
                        onClick={close} 
                        aria-label='Close cart'
                        className='rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 active:scale-95'
                    >
                        <IoClose size={22} />
                    </button>
                </div>

                {/* Body */}
                <div className='flex-1 overflow-y-auto bg-slate-50/80 p-4 scrollbar-thin scrollbar-thumb-slate-200'>
                    {
                        cartItem.length > 0 ? (
                            <>
                                {
                                    (notDiscountTotalPrice > totalPrice) && (
                                        <div className='mb-4 flex items-center justify-between rounded-2xl border border-cyan-200 bg-cyan-50/80 px-4 py-2.5 text-xs font-semibold text-cyan-800 shadow-sm'>
                                            <span>✨ You are saving</span>
                                            <span className='font-bold text-cyan-700'>{DisplayPriceInRupees(notDiscountTotalPrice - totalPrice)}</span>
                                        </div>
                                    )
                                }

                                <div className='space-y-3'>
                                    {
                                        cartItem.map((item, index) => {
                                            const prod = item?.productId || {}
                                            const img = Array.isArray(prod?.image) ? prod.image[0] : prod?.image
                                            const discountedPrice = pricewithDiscount(prod?.price, prod?.discount)

                                            return (
                                                <div key={item?._id || `cart-${index}`} className='flex w-full items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm transition hover:shadow'>
                                                    <div className='h-16 w-16 min-h-16 min-w-16 overflow-hidden rounded-xl border border-slate-100 bg-slate-50 p-1'>
                                                        {
                                                            img ? (
                                                                <img
                                                                    src={img}
                                                                    className='h-full w-full object-contain'
                                                                    alt={prod?.name || 'Product'}
                                                                />
                                                            ) : (
                                                                <div className='flex h-full w-full items-center justify-center text-xs text-slate-400'>
                                                                    No Image
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                    <div className='flex-1 min-w-0'>
                                                        <p className='truncate text-sm font-semibold text-slate-800'>{prod?.name || 'Item'}</p>
                                                        {prod?.unit && <p className='text-xs text-slate-400'>{prod.unit}</p>}
                                                        <div className='mt-1 flex items-center gap-2'>
                                                            <span className='text-sm font-bold text-slate-900'>{DisplayPriceInRupees(discountedPrice)}</span>
                                                            {Boolean(prod?.discount) && (
                                                                <span className='text-xs text-slate-400 line-through'>{DisplayPriceInRupees(prod?.price)}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className='flex items-center'>
                                                        <AddToCartButton data={prod} />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                {/* Bill Summary */}
                                <div className='mt-5 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm'>
                                    <h3 className='text-sm font-bold text-slate-900 uppercase tracking-wider'>Order Summary</h3>
                                    <div className='mt-3 space-y-2 text-xs text-slate-600'>
                                        <div className='flex items-center justify-between'>
                                            <span>Items Total</span>
                                            <div className='flex items-center gap-2'>
                                                {notDiscountTotalPrice > totalPrice && (
                                                    <span className='text-slate-400 line-through'>{DisplayPriceInRupees(notDiscountTotalPrice)}</span>
                                                )}
                                                <span className='font-semibold text-slate-800'>{DisplayPriceInRupees(totalPrice)}</span>
                                            </div>
                                        </div>
                                        <div className='flex items-center justify-between'>
                                            <span>Total Quantity</span>
                                            <span className='font-semibold text-slate-800'>{totalQty} {totalQty === 1 ? 'item' : 'items'}</span>
                                        </div>
                                        <div className='flex items-center justify-between'>
                                            <span>Delivery Charge</span>
                                            <span className='font-bold text-emerald-600 uppercase text-[11px] tracking-wide'>Free</span>
                                        </div>
                                    </div>
                                    <div className='mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-sm font-bold text-slate-900'>
                                        <span>Grand Total</span>
                                        <span className='text-base text-cyan-600'>{DisplayPriceInRupees(totalPrice)}</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className='flex h-full flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white p-8 text-center'>
                                <div className='flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100 text-slate-400'>
                                    <BsCartX className='text-4xl' />
                                </div>
                                <h3 className='mt-4 text-base font-bold text-slate-800'>Your cart is empty</h3>
                                <p className='mt-1 text-xs text-slate-500 max-w-[220px]'>Looks like you haven't added any tech items or gadgets yet.</p>
                                <Link 
                                    onClick={close} 
                                    to={"/"} 
                                    className='mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-cyan-600 active:scale-95'
                                >
                                    Explore Gadgets
                                </Link>
                            </div>
                        )
                    }
                </div>

                {/* Footer / Checkout Button */}
                {
                    cartItem.length > 0 && (
                        <div className='border-t border-slate-200/80 bg-white p-4'>
                            <div className='flex items-center justify-between rounded-2xl bg-slate-900 p-2 pl-4 text-sm font-semibold text-white shadow-md'>
                                <div>
                                    <p className='text-[10px] uppercase tracking-wider text-slate-400'>Total</p>
                                    <p className='text-base font-bold text-white'>{DisplayPriceInRupees(totalPrice)}</p>
                                </div>
                                <button 
                                    onClick={redirectToCheckoutPage} 
                                    className='flex items-center gap-1.5 rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-bold text-white shadow transition hover:bg-cyan-400 active:scale-95'
                                >
                                    <span>Proceed to Checkout</span>
                                    <FaCaretRight />
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
