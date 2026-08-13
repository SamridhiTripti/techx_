import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <section className='bg-slate-50 py-12'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <div className='rounded-[32px] bg-white p-8 shadow-soft'>
          <div className='mb-6'>
            <p className='text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600'>About TechX</p>
            <h1 className='mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl'>A smarter way to shop premium tech.</h1>
          </div>

          <p className='max-w-3xl text-base leading-7 text-slate-600'>
            TechX brings the best gadgets, accessories, and electronics together in one modern marketplace. We combine curated choices, transparent pricing, and fast delivery to make every purchase feel effortless.
          </p>

          <div className='mt-10 grid gap-6 md:grid-cols-2'>
            <div className='rounded-[28px] border border-slate-200 bg-slate-950 p-6 text-white shadow-sm'>
              <p className='text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300'>Why choose us</p>
              <ul className='mt-4 space-y-3 text-slate-200'>
                <li>Curated collections from trusted brands</li>
                <li>Fast shipping across India</li>
                <li>Secure checkout with easy returns</li>
              </ul>
            </div>
            <div className='rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm'>
              <p className='text-sm font-semibold uppercase tracking-[0.25em] text-slate-900'>Our mission</p>
              <p className='mt-4 text-slate-600'>
                We help people find the right devices and accessories for work, study, gaming, and everyday life. Every product is selected with quality, price, and user experience in mind.
              </p>
              <Link to='/contact' className='mt-6 inline-flex rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-400'>Talk to us</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
