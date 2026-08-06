import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'
import { useNavigate } from 'react-router-dom'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
import CardProduct from '../components/CardProduct'
import CardLoading from '../components/CardLoading'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'

const techHeroImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGRZKnN_totby5uv9cVuaY0Tp5dNppp_xXVQEDgcdJ61ycuEya4mIVatLfoGEfrmU3gNaM0y0TFmaY4lHZm3DPGQKu5c-4eB1zCczWUY8vuPlyQsS5oSqGWKCpx7uJK_vwj4REOi5977jee6VfWJ8XrpEI4MFSF3mv7GfoZ_1B8qd45rnFP3ZvpqqNO5ZhBDS1Cuj_hISLB1npsBEYE9QDCBlobxsCuVxKxUhHUSOTtgqeOFl2atD70A'
const techHeroMobileImage = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80'

const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory)
  const categoryData = useSelector(state => state.product.allCategory)
  const displayCategories = categoryData
  const subCategoryData = useSelector(state => state.product.allSubCategory)
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(false)
  const navigate = useNavigate()

  const fetchFeaturedProducts = async () => {
    try {
      setLoadingProducts(true)
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: 1,
          limit: 12
        }
      })
      const { data: responseData } = response
      if (responseData.success) {
        setFeaturedProducts(responseData.data.slice(0, 12))
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingProducts(false)
    }
  }

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const handleRedirectProductListpage = (id, cat) => {
    const subcategory = subCategoryData.find(sub => {
      const categoryIds = sub.cateogry?.map((c) => String(c)) || []
      const filterData = categoryIds.includes(String(id)) || sub.category?.some((c) => String(c._id) === String(id))

      return filterData ? true : null
    })

    if (!subcategory) return

    const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`
    navigate(url)
  }

  return (
   <section className='bg-transparent pb-8'>
      <div className='mx-auto max-w-7xl px-3 py-4 md:px-5 lg:px-6'>
          <div className='relative overflow-hidden rounded-[32px] border border-slate-200/80 bg-slate-950 shadow-soft'>
              <img
                src={techHeroImage}
                className='hidden h-[440px] w-full object-cover lg:block'
                alt='tech hero banner'
              />
              <img
                src={techHeroMobileImage}
                className='h-[280px] w-full object-cover lg:hidden'
                alt='tech hero banner'
              />
              <div className='absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/20' />
              <div className='relative flex min-h-[320px] flex-col justify-center px-6 py-10 md:px-10 lg:max-w-3xl lg:px-14 lg:py-14'>
                <p className='mb-3 inline-flex w-fit rounded-full border border-cyan-400/30 bg-cyan-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-200 backdrop-blur'>New arrivals</p>
                <h2 className='text-3xl font-semibold leading-tight text-white md:text-5xl'>Discover TechX’s premium tech marketplace.</h2>
                <p className='mt-3 max-w-lg text-sm text-slate-200 md:text-base'>Shop the latest smartphones, laptops, and accessories from top brands across India.</p>
                <div className='mt-6 flex flex-wrap gap-3'>
                  <button className='rounded-full bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-400'>Shop now</button>
                  <button className='rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20'>Explore deals</button>
                </div>
              </div>
          </div>
      </div>

      <div className='mx-auto max-w-7xl px-3 md:px-5 lg:px-6'>
        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
          <div>
            <p className='text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600'>Curated essentials</p>
            <h3 className='text-2xl font-semibold text-slate-900'>Browse the latest categories</h3>
          </div>
          <p className='text-sm text-slate-500'>Explore the finest technical gadgets and accessories.</p>
        </div>
        <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
          {
            loadingCategory ? (
              new Array(6).fill(null).map((c, index) => {
                return (
                  <div key={index + "loadingcategory"} className='animate-pulse rounded-[24px] border border-slate-200 bg-white p-3 shadow-sm'>
                    <div className='min-h-24 rounded-[18px] bg-slate-100'></div>
                    <div className='mt-3 h-8 rounded bg-slate-100'></div>
                  </div>
                )
              })
            ) : (
              displayCategories?.map((cat) => {
                return (
                  <div key={cat._id + "displayCategory"} className='cursor-pointer rounded-[24px] border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-soft' onClick={() => handleRedirectProductListpage(cat._id, cat.name)}>
                    <div className='overflow-hidden rounded-[20px] bg-slate-100'>
                        <img
                          src={cat.image}
                          className='h-24 w-full object-cover transition duration-500 hover:scale-105'
                          alt={cat.name}
                        />
                    </div>
                    <div className='mt-3 flex items-center justify-between'>
                      <p className='text-sm font-semibold text-slate-700'>{cat.name}</p>
                      <span className='text-xs font-semibold text-cyan-600'>Shop</span>
                    </div>
                  </div>
                )
              })
            )
          }
        </div>
      </div>

      <div className='mx-auto mt-10 max-w-7xl px-3 md:px-5 lg:px-6'>
        <div className='mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between'>
          <div>
            <p className='text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600'>Featured gadgets</p>
            <h3 className='text-2xl font-semibold text-slate-900'>Shop the best tech picks</h3>
          </div>
          <p className='text-sm text-slate-500'>A curated collection of top-selling tech products.</p>
        </div>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {loadingProducts ? (
            new Array(4).fill(null).map((_, index) => <CardLoading key={index} />)
          ) : (
            featuredProducts.map((product) => (
              <CardProduct key={product._id} data={product} />
            ))
          )}
        </div>
      </div>

      <div className='mx-auto mt-10 max-w-7xl px-3 md:px-5 lg:px-6'>
        <div className='rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm md:p-8'>
          <div className='flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
            <div>
              <p className='text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600'>Trending now</p>
              <h3 className='text-xl font-semibold text-slate-900'>Power-packed picks for modern life</h3>
            </div>
            <button className='rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-500 hover:text-cyan-600'>Explore catalog</button>
          </div>
          <div className='mt-5 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]'>
            <div className='rounded-[24px] bg-slate-950 p-6 text-white'>
              <p className='text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400'>Top pick</p>
              <h4 className='mt-3 text-2xl font-semibold'>Bright, fast, and ready for the next upgrade.</h4>
              <p className='mt-3 max-w-xl text-sm text-slate-300'>A refined selection of premium gadgets designed for creators, travelers, and everyday power users.</p>
            </div>
            <div className='rounded-[24px] border border-slate-200 bg-slate-50 p-6'>
              <p className='text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600'>Why customers love us</p>
              <div className='mt-4 space-y-3 text-sm text-slate-600'>
                <div className='rounded-2xl bg-white p-3 shadow-sm'>Lightning-fast dispatch</div>
                <div className='rounded-2xl bg-white p-3 shadow-sm'>Flexible support and easy returns</div>
                <div className='rounded-2xl bg-white p-3 shadow-sm'>Trusted premium brands</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mx-auto mt-8 max-w-7xl px-3 md:px-5 lg:px-6'>
        <div className='rounded-[32px] bg-slate-950 px-6 py-8 text-white shadow-soft md:px-8'>
          <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
            <div>
              <p className='text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400'>Stay in the loop</p>
              <h3 className='mt-2 text-2xl font-semibold'>Get early access to launches and member-only offers.</h3>
            </div>
            <div className='flex flex-col gap-3 sm:flex-row'>
              <input className='rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400' placeholder='Email address' />
              <button className='rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-400'>Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      {/***display category product */}
      {
        displayCategories?.map((c) => {
          return (
            <CategoryWiseProductDisplay
              key={c?._id + "CategorywiseProduct"}
              id={c?._id}
              name={c?.name}
            />
          )
        })
      }

   </section>
  )
}

export default Home
