import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import { FaAngleRight,FaAngleLeft } from "react-icons/fa6";
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import Divider from '../components/Divider'
import image1 from '../assets/minute_delivery.png'
import image2 from '../assets/Best_Prices_Offers.png'
import image3 from '../assets/Wide_Assortment.png'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import AddToCartButton from '../components/AddToCartButton'

const ProductDisplayPage = () => {
  const params = useParams()
  let productId = params?.product?.split("-")?.slice(-1)[0]
  const [data,setData] = useState({
    name : "",
    image : []
  })
  const [image,setImage] = useState(0)
  const [loading,setLoading] = useState(false)
  const imageContainer = useRef()

  const fetchProductDetails = async()=>{
    try {
        const response = await Axios({
          ...SummaryApi.getProductDetails,
          data : {
            productId : productId 
          }
        })

        const { data : responseData } = response

        if(responseData.success){
          setData(responseData.data)
        }
    } catch (error) {
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchProductDetails()
  },[params])
  
  const handleScrollRight = ()=>{
    imageContainer.current.scrollLeft += 100
  }
  const handleScrollLeft = ()=>{
    imageContainer.current.scrollLeft -= 100
  }
  console.log("product data",data)
  return (
    <section className='mx-auto grid max-w-7xl gap-6 p-4 lg:grid-cols-[1.05fr_0.95fr] lg:p-6'>
        <div className='rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm'>
            <div className='flex h-[320px] items-center justify-center rounded-[24px] bg-slate-100 lg:min-h-[480px]'>
                <img
                    src={data.image[image]}
                    className='h-full w-full object-contain p-4'
                    alt={data.name}
                />
            </div>
            <div className='mt-4 flex items-center justify-center gap-3'>
              {
                data.image.map((img,index)=>{
                  return(
                    <div key={img+index+"point"} className={`h-3 w-3 rounded-full ${index === image ? 'bg-cyan-500' : 'bg-slate-200'}`}></div>
                  )
                })
              }
            </div>
            <div className='relative mt-4'>
                <div ref={imageContainer} className='flex gap-4 overflow-x-auto scrollbar-none'>
                      {
                        data.image.map((img,index)=>{
                          return(
                            <div className='h-20 w-20 min-h-20 min-w-20 cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white p-1 shadow-sm' key={img+index}>
                              <img
                                  src={img}
                                  alt='min-product'
                                  onClick={()=>setImage(index)}
                                  className='h-full w-full object-contain'
                              />
                            </div>
                          )
                        })
                      }
                </div>
                <div className='absolute inset-y-0 left-0 right-0 hidden items-center justify-between lg:flex'>
                    <button onClick={handleScrollLeft} className='relative z-10 rounded-full bg-white p-2 shadow-lg'>
                        <FaAngleLeft/>
                    </button>
                    <button onClick={handleScrollRight} className='relative z-10 rounded-full bg-white p-2 shadow-lg'>
                        <FaAngleRight/>
                    </button>
                </div>
            </div>

            <div className='my-6 hidden gap-3 lg:grid'>
                <div>
                    <p className='text-sm font-semibold uppercase tracking-[0.25em] text-cyan-600'>Description</p>
                    <p className='mt-2 text-sm text-slate-600'>{data.description}</p>
                </div>
                <div>
                    <p className='text-sm font-semibold uppercase tracking-[0.25em] text-cyan-600'>Unit</p>
                    <p className='mt-2 text-sm text-slate-600'>{data.unit}</p>
                </div>
                {
                  data?.more_details && Object.keys(data?.more_details).map((element,index)=>{
                    return(
                      <div key={element+index}>
                          <p className='text-sm font-semibold uppercase tracking-[0.25em] text-cyan-600'>{element}</p>
                          <p className='mt-2 text-sm text-slate-600'>{data?.more_details[element]}</p>
                      </div>
                    )
                  })
                }
            </div>
        </div>

        <div className='rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm lg:p-7'>
            <p className='w-fit rounded-full bg-cyan-100 px-3 py-1 text-sm font-semibold text-cyan-700'>Fast delivery</p>
            <h2 className='mt-3 text-2xl font-semibold text-slate-900 lg:text-3xl'>{data.name}</h2>
            {
              data.brand && (
                <p className='mt-2 text-sm uppercase tracking-[0.2em] text-slate-500'>{data.brand}</p>
              )
            }
            <p className='mt-2 text-slate-500'>{data.unit}</p>
            <Divider/>
            <div>
              <p className='text-sm font-semibold uppercase tracking-[0.25em] text-cyan-600'>Price</p>
              <div className='mt-2 flex flex-wrap items-center gap-3'>
                <div className='rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-2'>
                    <p className='text-lg font-semibold text-slate-900'>{DisplayPriceInRupees(pricewithDiscount(data.price,data.discount))}</p>
                </div>
                {
                  data.discount && (
                    <p className='text-sm text-slate-400 line-through'>{DisplayPriceInRupees(data.price)}</p>
                  )
                }
                {
                  data.discount && (
                    <p className='text-lg font-semibold text-cyan-700'>{data.discount}% off</p>
                  )
                }
              </div>
            </div>

            {
              data.stock === 0 ? (
                <p className='my-4 text-lg text-red-500'>Out of Stock</p>
              )
              : (
                <div className='my-4'>
                  <AddToCartButton data={data}/>
                </div>
              )
            }

            <h2 className='mt-5 text-lg font-semibold text-slate-900'>Why shop from TechX?</h2>
            <div>
                  <div className='my-4 flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-3'>
                      <img
                        src={image1}
                        alt='superfast delivery'
                        className='h-16 w-16 rounded-2xl object-contain'
                      />
                      <div className='text-sm'>
                        <div className='font-semibold text-slate-800'>Superfast Delivery</div>
                        <p className='mt-1 text-slate-500'>Get your device delivered quickly from trusted fulfillment centers.</p>
                      </div>
                  </div>
                  <div className='my-4 flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-3'>
                      <img
                        src={image2}
                        alt='Best prices offers'
                        className='h-16 w-16 rounded-2xl object-contain'
                      />
                      <div className='text-sm'>
                        <div className='font-semibold text-slate-800'>Best Prices & Offers</div>
                        <p className='mt-1 text-slate-500'>Competitive pricing and exciting launch offers directly from top brands.</p>
                      </div>
                  </div>
                  <div className='my-4 flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-3'>
                      <img
                        src={image3}
                        alt='Wide Assortment'
                        className='h-16 w-16 rounded-2xl object-contain'
                      />
                      <div className='text-sm'>
                        <div className='font-semibold text-slate-800'>Wide Assortment</div>
                        <p className='mt-1 text-slate-500'>Choose from a curated range of premium laptops, phones, audio, and accessories.</p>
                      </div>
                  </div>
            </div>

            <div className='my-4 grid gap-3 lg:hidden'>
                <div>
                    <p className='text-sm font-semibold uppercase tracking-[0.25em] text-cyan-600'>Description</p>
                    <p className='mt-2 text-sm text-slate-600'>{data.description}</p>
                </div>
                <div>
                    <p className='text-sm font-semibold uppercase tracking-[0.25em] text-cyan-600'>Unit</p>
                    <p className='mt-2 text-sm text-slate-600'>{data.unit}</p>
                </div>
                {
                  data?.more_details && Object.keys(data?.more_details).map((element,index)=>{
                    return(
                      <div key={element+index}>
                          <p className='text-sm font-semibold uppercase tracking-[0.25em] text-cyan-600'>{element}</p>
                          <p className='mt-2 text-sm text-slate-600'>{data?.more_details[element]}</p>
                      </div>
                    )
                  })
                }
            </div>
        </div>
    </section>
  )
}

export default ProductDisplayPage
