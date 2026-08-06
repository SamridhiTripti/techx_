import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import useMobile from '../hooks/useMobile';

const Search = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isSearchPage, setIsSearchPage] = useState(false)
    const [isMobile] = useMobile()
    const params = useLocation()
    const searchText = params.search?.slice(3) || ''

    useEffect(() => {
        const isSearch = location.pathname === "/search"
        setIsSearchPage(isSearch)
    }, [location])

    const redirectToSearchPage = () => {
        navigate("/search")
    }

    const handleOnChange = (e) => {
        const value = e.target.value
        const url = `/search?q=${value}`
        navigate(url)
    }

    return (
        <div className='flex h-12 w-full min-w-0 items-center overflow-hidden rounded-full border border-slate-200 bg-slate-100/80 text-slate-500 shadow-sm transition focus-within:border-cyan-500 focus-within:bg-white lg:min-w-[420px]'>
            <div>
                {
                    (isMobile && isSearchPage) ? (
                        <Link to={"/"} className='m-1 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-600 shadow-md'>
                            <FaArrowLeft size={18} />
                        </Link>
                    ) : (
                        <button className='flex h-12 w-12 items-center justify-center text-slate-500'>
                            <IoSearch size={20} />
                        </button>
                    )
                }
            </div>
            <div className='h-full flex-1'>
                {
                    !isSearchPage ? (
                        <div onClick={redirectToSearchPage} className='flex h-full w-full cursor-text items-center text-sm text-slate-500'>
                            Search phones, laptops, accessories...
                        </div>
                    ) : (
                        <div className='h-full w-full'>
                            <input
                                type='text'
                                placeholder='Search gadgets and more'
                                autoFocus
                                defaultValue={searchText}
                                className='h-full w-full bg-transparent pr-3 outline-none'
                                onChange={handleOnChange}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Search
