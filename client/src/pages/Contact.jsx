import React from 'react'

const Contact = () => {
  return (
    <section className='bg-slate-50 py-12'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <div className='rounded-[32px] bg-white p-8 shadow-soft'>
          <div className='mb-6'>
            <p className='text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600'>Contact</p>
            <h1 className='mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl'>Get in touch with TechX support.</h1>
          </div>
          <div className='grid gap-8 lg:grid-cols-2'>
            <div className='space-y-6'>
              <div>
                <p className='text-sm text-slate-500'>Email</p>
                <p className='mt-2 font-semibold text-slate-900'>support@techx.com</p>
              </div>
              <div>
                <p className='text-sm text-slate-500'>Phone</p>
                <p className='mt-2 font-semibold text-slate-900'>+91 98765 43210</p>
              </div>
              <div>
                <p className='text-sm text-slate-500'>Address</p>
                <p className='mt-2 font-semibold text-slate-900'>TechX HQ, Bengaluru, India</p>
              </div>
            </div>
            <form className='space-y-4 rounded-[28px] border border-slate-200 bg-slate-50 p-6'>
              <div>
                <label className='mb-2 block text-sm font-medium text-slate-700'>Name</label>
                <input className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-cyan-500' placeholder='Your name' />
              </div>
              <div>
                <label className='mb-2 block text-sm font-medium text-slate-700'>Email</label>
                <input className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-cyan-500' placeholder='you@example.com' />
              </div>
              <div>
                <label className='mb-2 block text-sm font-medium text-slate-700'>Message</label>
                <textarea rows='4' className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-cyan-500' placeholder='How can we help?' />
              </div>
              <button type='button' className='inline-flex rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-400'>Send message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
