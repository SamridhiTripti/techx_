import React from 'react'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { Link } from 'react-router-dom'
import { valideURLConvert } from '../utils/valideURLConvert'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import AddToCartButton from './AddToCartButton'

const CardProduct = ({ data }) => {
    const url = `/product/${valideURLConvert(data.name)}-${data._id}`

    return (
        <Link to={url} className='group min-w-[180px] max-w-[220px] rounded-[24px] border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-soft'>
            <div className='mb-3 overflow-hidden rounded-[20px] bg-slate-100'>
                <img
                    src={data.image?.[0] || data.image}
                    className='h-32 w-full object-cover transition duration-500 group-hover:scale-105'
                    alt={data.name}
                />
            </div>
            <div className='flex flex-wrap items-center gap-2'>
                <div className='rounded-full bg-cyan-50 px-2 py-1 text-[11px] font-semibold text-cyan-700'>
                    Fast delivery
                </div>
                {
                    Boolean(data.discount) && (
                        <p className='rounded-full bg-amber-50 px-2 py-1 text-[11px] font-semibold text-amber-700'>{data.discount}% off</p>
                    )
                }
            </div>
            <div className='mt-3 line-clamp-2 text-sm font-semibold text-slate-800'>
                {data.name}
            </div>
            {
                data.brand && (
                    <p className='mt-1 text-xs uppercase tracking-[0.25em] text-slate-400'>
                        {data.brand}
                    </p>
                )
            }
            <div className='mt-1 text-sm text-slate-500'>
                {data.unit}
            </div>

            <div className='mt-4 flex items-center justify-between gap-2 text-sm'>
                <div className='font-semibold text-slate-900'>
                    {DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
                </div>
                <div className='w-full max-w-[100px]'>
                    {
                        data.stock == 0 ? (
                            <p className='text-center text-xs text-red-500'>Out of stock</p>
                        ) : (
                            <AddToCartButton data={data} />
                        )
                    }
                </div>
            </div>
        </Link>
    )
}

export default CardProduct
