import React from 'react'

const Deals = () => {
  return (
    <section className='bg-slate-50 py-12'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <div className='rounded-[32px] bg-white p-8 shadow-soft'>
          <div className='mb-6'>
            <p className='text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600'>Deals</p>
            <h1 className='mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl'>Latest offers and limited-time savings.</h1>
          </div>
          <div className='grid gap-6 md:grid-cols-2'>
            <div className='rounded-[28px] border border-slate-200 bg-slate-950 p-6 text-white'>
              <p className='text-sm uppercase tracking-[0.25em] text-cyan-300'>Top deal</p>
              <h2 className='mt-4 text-2xl font-semibold'>Up to 30% off selected laptops</h2>
              <p className='mt-3 text-slate-300'>Shop premium performance laptops at special prices while stock lasts.</p>
            </div>
            <div className='rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm'>
              <p className='text-sm uppercase tracking-[0.25em] text-slate-900'>Special savings</p>
              <ul className='mt-4 space-y-3 text-slate-600'>
                <li>Buy 1 Get 1 on selected accessories</li>
                <li>Free shipping on orders above ₹1,499</li>
                <li>Extra cashback for first-time buyers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Deals
