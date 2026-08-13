import React, { useEffect, useMemo, useState } from 'react'
import { FaRobot } from 'react-icons/fa6'
import { FaPaperPlane, FaTimes } from 'react-icons/fa'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'

const sampleQuestions = [
  'Show me the best smartphones',
  'Recommend a gaming laptop',
  'What is the return policy?',
  'How fast is delivery?',
]

const AIAssistant = () => {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! I’m TechX Assistant. Ask me about phones, laptops, cameras, shipping or returns.' },
  ])
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    const trimmed = input.trim()
    if (!trimmed) return

    const userMessage = { type: 'user', text: trimmed }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await Axios({
        ...SummaryApi.aiQuery,
        data: { query: trimmed }
      })

      const assistantText = response.data?.data?.assistantText || 'Sorry, I could not find a good answer right now.'
      const botMessage = { type: 'bot', text: assistantText }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      const botMessage = { type: 'bot', text: 'There was a problem connecting to the AI service. Please try again later.' }
      setMessages((prev) => [...prev, botMessage])
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleQuickQuestion = async (question) => {
    setInput(question)
    setTimeout(() => handleSend(), 100)
  }

  useEffect(() => {
    if (!open) return
    const chatBox = document.getElementById('techx-ai-chat-box')
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight
    }
  }, [messages, open])

  const buttonLabel = useMemo(() => (open ? 'Close assistant' : 'Ask TechX'), [open])

  return (
    <div className='fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3'>
      {open && (
        <div className='w-[320px] overflow-hidden rounded-[28px] border border-slate-200/80 bg-slate-950/95 shadow-2xl shadow-slate-950/40 backdrop-blur-xl text-slate-100'>
          <div className='flex items-center justify-between border-b border-slate-800 px-4 py-3'>
            <div className='flex items-center gap-3'>
              <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300'>
                <FaRobot className='h-5 w-5' />
              </div>
              <div>
                <p className='text-sm font-semibold'>TechX Assistant</p>
                <p className='text-xs text-slate-400'>Get help with products and checkout.</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className='rounded-full p-2 text-slate-300 transition hover:bg-white/10 hover:text-white'>
              <FaTimes />
            </button>
          </div>
          <div id='techx-ai-chat-box' className='max-h-72 space-y-3 overflow-y-auto px-4 py-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900'>
            {messages.map((message, index) => (
              <div key={`${message.type}-${index}`} className={`flex ${message.type === 'bot' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[88%] rounded-3xl px-4 py-3 text-sm leading-6 ${message.type === 'bot' ? 'bg-slate-800 text-slate-100' : 'bg-cyan-500/15 text-white'}`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div className='border-t border-slate-800 px-4 py-3'>
            <div className='flex items-center gap-2'>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSend() }}
                className='w-full rounded-full border border-slate-700 bg-slate-900/90 px-4 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20'
                placeholder='Ask about phones, laptops, orders...'
              />
              <button onClick={handleSend} className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 text-white transition hover:bg-cyan-400'>
                <FaPaperPlane />
              </button>
            </div>
            <div className='mt-3 grid grid-cols-2 gap-2'>
              {sampleQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => handleQuickQuestion(question)}
                  className='rounded-2xl border border-slate-700 bg-slate-900 px-3 py-2 text-[11px] text-slate-300 transition hover:border-cyan-400 hover:text-white'
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className='inline-flex items-center gap-2 rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-2xl shadow-cyan-500/30 transition duration-300 hover:bg-cyan-400 focus:outline-none'
        aria-label={buttonLabel}
      >
        <FaRobot className='h-4 w-4' />
        {open ? 'Close AI' : 'Ask AI'}
      </button>
    </div>
  )
}

export default AIAssistant
