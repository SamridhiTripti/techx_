import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import Loading from './Loading'
import { useSelector } from 'react-redux'
import { FaMinus, FaPlus } from "react-icons/fa6";
import { BsCartPlus } from "react-icons/bs";

const AddToCartButton = ({ data }) => {
    const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext()
    const [loading, setLoading] = useState(false)
    const cartItem = useSelector(state => state.cartItem.cart)
    const user = useSelector(state => state.user)
    const [isAvailableCart, setIsAvailableCart] = useState(false)
    const [qty, setQty] = useState(0)
    const [cartItemDetails, setCartItemsDetails] = useState(null)

    const handleADDTocart = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (!user?._id) {
            toast.error("Please login to add items to cart")
            return
        }

        if (!data?._id) return

        try {
            setLoading(true)

            const response = await Axios({
                ...SummaryApi.addTocart,
                data: {
                    productId: data?._id
                }
            })

            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message || "Added to cart")
                if (fetchCartItem) {
                    fetchCartItem()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    // Checking this item in cart or not
    useEffect(() => {
        const targetId = data?._id
        if (!targetId || !Array.isArray(cartItem)) {
            setIsAvailableCart(false)
            setQty(0)
            setCartItemsDetails(null)
            return
        }

        const product = cartItem.find(item => {
            const prodId = item?.productId?._id || item?.productId
            return prodId === targetId
        })

        if (product) {
            setIsAvailableCart(true)
            setQty(product.quantity || 1)
            setCartItemsDetails(product)
        } else {
            setIsAvailableCart(false)
            setQty(0)
            setCartItemsDetails(null)
        }
    }, [data, cartItem])

    const increaseQty = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (!cartItemDetails?._id) return
    
        const response = await updateCartItem(cartItemDetails._id, qty + 1)
        if (response?.success) {
            toast.success("Cart updated")
        }
    }

    const decreaseQty = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (!cartItemDetails?._id) return

        if (qty <= 1) {
            deleteCartItem(cartItemDetails._id)
        } else {
            const response = await updateCartItem(cartItemDetails._id, qty - 1)
            if (response?.success) {
                toast.success("Cart updated")
            }
        }
    }

    return (
        <div className='w-full max-w-[130px]'>
            {
                isAvailableCart ? (
                    <div className='flex h-8 w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-100 p-0.5 shadow-sm'>
                        <button 
                            onClick={decreaseQty} 
                            aria-label='Decrease quantity'
                            className='flex h-7 w-7 items-center justify-center rounded-lg bg-white text-slate-700 shadow-sm transition hover:bg-rose-50 hover:text-rose-600 active:scale-95'
                        >
                            <FaMinus className='text-[10px]' />
                        </button>

                        <span className='px-1 text-xs font-bold text-slate-900'>{qty}</span>

                        <button 
                            onClick={increaseQty} 
                            aria-label='Increase quantity'
                            className='flex h-7 w-7 items-center justify-center rounded-lg bg-white text-slate-700 shadow-sm transition hover:bg-cyan-50 hover:text-cyan-600 active:scale-95'
                        >
                            <FaPlus className='text-[10px]' />
                        </button>
                    </div>
                ) : (
                    <button 
                        onClick={handleADDTocart} 
                        disabled={loading}
                        className='flex h-8 w-full items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-3 text-xs font-semibold text-white shadow-sm transition duration-200 hover:bg-cyan-600 active:scale-95 disabled:opacity-60'
                    >
                        {loading ? <Loading /> : (
                            <>
                                <BsCartPlus className='text-sm' />
                                <span>Add</span>
                            </>
                        )}
                    </button>
                )
            }
        </div>
    )
}

export default AddToCartButton
