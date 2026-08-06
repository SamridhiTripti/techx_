import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import CardLoading from './CardLoading'
import CardProduct from './CardProduct'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'

const CategoryWiseProductDisplay = ({ id, name }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const containerRef = useRef()
    const subCategoryData = useSelector(state => state.product.allSubCategory)
    const loadingCardNumber = new Array(6).fill(null)

    const fetchCategoryWiseProduct = async () => {
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getProductByCategory,
                data: {
                    id: id
                }
            })

            const { data: responseData } = response

            if (responseData.success) {
                setData(responseData.data)
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategoryWiseProduct()
    }, [])

    const handleScrollRight = () => {
        containerRef.current.scrollLeft += 200
    }

    const handleScrollLeft = () => {
        containerRef.current.scrollLeft -= 200
    }

    const handleRedirectProductListpage = () => {
        const subcategory = subCategoryData.find(sub => {
            const categoryIds = sub.cateogry?.map((c) => String(c)) || []
            const filterData = categoryIds.includes(String(id)) || sub.category?.some((c) => String(c._id) === String(id))

            return filterData ? true : null
        })
        const url = `/${valideURLConvert(name)}-${id}/${valideURLConvert(subcategory?.name)}-${subcategory?._id}`

        return url
    }

    const redirectURL = handleRedirectProductListpage()
    return (
        <div className='mt-8'>
            <div className='mx-auto mb-4 flex max-w-7xl items-center justify-between gap-4 px-3 md:px-5 lg:px-6'>
                <div>
                    <p className='text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600'>Fresh picks</p>
                    <h3 className='text-xl font-semibold text-slate-900'>{name}</h3>
                </div>
                <Link to={redirectURL} className='text-sm font-semibold text-slate-700 transition hover:text-cyan-600'>See all</Link>
            </div>
            <div className='relative flex items-center'>
                <div className='mx-auto flex gap-4 overflow-x-auto scroll-smooth px-3 pb-2 md:gap-6 md:px-5 lg:gap-8 lg:px-6' ref={containerRef}>
                    {loading &&
                        loadingCardNumber.map((_, index) => {
                            return (
                                <CardLoading key={"CategorywiseProductDisplay123" + index} />
                            )
                        })
                    }

                    {
                        data.map((p, index) => {
                            return (
                                <CardProduct
                                    data={p}
                                    key={p._id + "CategorywiseProductDisplay" + index}
                                />
                            )
                        })
                    }
                </div>
                <div className='absolute left-0 right-0 top-1/2 hidden w-full -translate-y-1/2 items-center justify-between px-2 lg:flex'>
                    <button onClick={handleScrollLeft} className='relative z-10 rounded-full border border-slate-200 bg-white p-2 text-lg text-slate-700 shadow-sm transition hover:bg-slate-100'>
                        <FaAngleLeft />
                    </button>
                    <button onClick={handleScrollRight} className='relative z-10 rounded-full border border-slate-200 bg-white p-2 text-lg text-slate-700 shadow-sm transition hover:bg-slate-100'>
                        <FaAngleRight />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CategoryWiseProductDisplay
