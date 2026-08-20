import React, { useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import AddAddress from '../components/AddAddress'
import { useSelector } from 'react-redux'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const CheckoutPage = () => {
  const { notDiscountTotalPrice, totalPrice, totalQty, fetchCartItem, fetchOrder } = useGlobalContext()
  const [openAddress, setOpenAddress] = useState(false)
  const addressList = useSelector(state => state.addresses.addressList)
  const [selectAddress, setSelectAddress] = useState(0)
  const cartItemsList = useSelector(state => state.cartItem.cart)
  const navigate = useNavigate()

  const activeAddresses = addressList.filter(a => a.status !== false)

  const handleCashOnDelivery = async () => {
    if (!activeAddresses.length) {
      toast.error('Please add a delivery address first.')
      return
    }
    if (!cartItemsList.length) {
      toast.error('Your cart is empty.')
      return
    }

    try {
      const response = await Axios({
        ...SummaryApi.CashOnDeliveryOrder,
        data: {
          list_items: cartItemsList,
          addressId: activeAddresses[selectAddress]?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
        }
      })

      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)
        if (fetchCartItem) fetchCartItem()
        if (fetchOrder) fetchOrder()
        navigate('/success', { state: { text: 'Order' } })
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  const handleOnlinePayment = async () => {
    if (!activeAddresses.length) {
      toast.error('Please add a delivery address first.')
      return
    }
    if (!cartItemsList.length) {
      toast.error('Your cart is empty.')
      return
    }

    const loadingToast = toast.loading('Preparing payment...')
    try {
      const response = await Axios({
        ...SummaryApi.payment_url,
        data: {
          list_items: cartItemsList,
          addressId: activeAddresses[selectAddress]?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
        }
      })

      toast.dismiss(loadingToast)
      const { data: responseData } = response

      if (responseData.success) {
        // Redirect to Stripe Checkout
        if (responseData.url) {
          window.location.href = responseData.url
        }
        if (fetchCartItem) fetchCartItem()
        if (fetchOrder) fetchOrder()
      }
    } catch (error) {
      toast.dismiss(loadingToast)
      AxiosToastError(error)
    }
  }

  return (
    <section className='bg-slate-50 min-h-screen'>
      <div className='container mx-auto p-4 flex flex-col lg:flex-row w-full gap-5 justify-between max-w-6xl'>

        {/* Address Section */}
        <div className='w-full'>
          <h3 className='text-lg font-semibold mb-3 text-slate-800'>Choose your address</h3>
          <div className='bg-white rounded-2xl border border-slate-200 p-4 grid gap-3'>
            {activeAddresses.length === 0 && (
              <p className='text-sm text-slate-500 text-center py-4'>No saved addresses. Add one below.</p>
            )}
            {activeAddresses.map((address, index) => (
              <label
                key={address._id || index}
                htmlFor={"address" + index}
                className='cursor-pointer'
              >
                <div className={`border rounded-xl p-3 flex gap-3 transition ${Number(selectAddress) === index ? 'border-cyan-500 bg-cyan-50' : 'hover:bg-slate-50'}`}>
                  <div className='pt-1'>
                    <input
                      id={"address" + index}
                      type='radio'
                      value={index}
                      onChange={(e) => setSelectAddress(Number(e.target.value))}
                      name='address'
                      defaultChecked={index === 0}
                      className='accent-cyan-600'
                    />
                  </div>
                  <div className='text-sm text-slate-700 space-y-0.5'>
                    <p className='font-medium'>{address.address_line}</p>
                    <p>{address.city}, {address.state}</p>
                    <p>{address.country} - {address.pin_code || address.pincode}</p>
                    <p className='text-slate-500'>📞 {address.mobile}</p>
                  </div>
                </div>
              </label>
            ))}

            <button
              onClick={() => setOpenAddress(true)}
              className='h-14 border-2 border-dashed border-cyan-300 rounded-xl flex justify-center items-center gap-2 text-cyan-600 font-medium text-sm hover:bg-cyan-50 transition cursor-pointer'
            >
              + Add New Address
            </button>
          </div>
        </div>

        {/* Summary Section */}
        <div className='w-full max-w-md'>
          <h3 className='text-lg font-semibold mb-3 text-slate-800'>Order Summary</h3>
          <div className='bg-white rounded-2xl border border-slate-200 p-5'>
            <h4 className='font-semibold text-slate-700 mb-3'>Bill Details</h4>
            <div className='space-y-2 text-sm text-slate-600'>
              <div className='flex justify-between'>
                <span>Items total</span>
                <span className='flex items-center gap-2'>
                  <span className='line-through text-slate-400'>{DisplayPriceInRupees(notDiscountTotalPrice)}</span>
                  <span className='font-medium text-slate-800'>{DisplayPriceInRupees(totalPrice)}</span>
                </span>
              </div>
              <div className='flex justify-between'>
                <span>Quantity</span>
                <span>{totalQty} item{totalQty !== 1 ? 's' : ''}</span>
              </div>
              <div className='flex justify-between'>
                <span>Delivery</span>
                <span className='text-green-600 font-medium'>FREE</span>
              </div>
              {notDiscountTotalPrice > totalPrice && (
                <div className='flex justify-between text-green-600 font-medium'>
                  <span>You save</span>
                  <span>{DisplayPriceInRupees(notDiscountTotalPrice - totalPrice)}</span>
                </div>
              )}
              <hr className='my-2' />
              <div className='flex justify-between font-semibold text-slate-800 text-base'>
                <span>Grand Total</span>
                <span>{DisplayPriceInRupees(totalPrice)}</span>
              </div>
            </div>

            <div className='mt-5 flex flex-col gap-3'>
              <button
                className='py-3 px-4 bg-slate-900 hover:bg-cyan-600 rounded-xl text-white font-semibold transition'
                onClick={handleOnlinePayment}
              >
                💳 Pay Online
              </button>
              <button
                className='py-3 px-4 border-2 border-slate-900 font-semibold text-slate-900 hover:bg-slate-900 hover:text-white rounded-xl transition'
                onClick={handleCashOnDelivery}
              >
                📦 Cash on Delivery
              </button>
            </div>
          </div>
        </div>
      </div>

      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
    </section>
  )
}

export default CheckoutPage
