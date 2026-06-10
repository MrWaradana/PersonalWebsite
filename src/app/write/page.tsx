'use client'

import React, { useState, useEffect, useRef } from 'react'
import { 
  FiSave, FiSend, FiCpu, FiEye, FiCode, 
  FiCheckCircle, FiAlertCircle, FiLoader, 
  FiFileText, FiLink, FiCalendar, FiImage 
} from 'react-icons/fi'
import Link from 'next/link'

// Cast react-icons to any to prevent React 19 JSX Type Collision Errors
const Save = FiSave as any
const Send = FiSend as any
const Cpu = FiCpu as any
const Eye = FiEye as any
const CodeIcon = FiCode as any
const CheckCircle = FiCheckCircle as any
const AlertCircle = FiAlertCircle as any
const Loader = FiLoader as any
const FileText = FiFileText as any
const LinkIcon = FiLink as any
const Calendar = FiCalendar as any
const ImageIcon = FiImage as any

// Pre-defined list of selectable tags
const AVAILABLE_TAGS = [
  'Next-Js', 'Typescript', 'Tailwind-CSS', 'Laravel', 
  'Bootstrap', 'Jquery', 'Code-Igniter', 'Alpine-Js'
]

// Simple Markdown Previewer
function MarkdownPreview({ text }: { text: string }) {
  const lines = text.split('\n')
  let inCodeBlock = false
  let codeContent: string[] = []

  return (
    <div className="prose prose-invert max-w-none text-zinc-300 text-sm leading-relaxed space-y-4 font-sans">
      {lines.map((line, idx) => {
        // Code blocks
        if (line.trim().startsWith('```')) {
          if (inCodeBlock) {
            inCodeBlock = false
            const content = codeContent.join('\n')
            codeContent = []
            return (
              <pre key={idx} className="bg-zinc-950 p-4 rounded-lg border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto my-2">
                <code>{content}</code>
              </pre>
            )
          } else {
            inCodeBlock = true
            return null
          }
        }

        if (inCodeBlock) {
          codeContent.push(line)
          return null
        }

        // Headings
        if (line.startsWith('# ')) {
          return <h1 key={idx} className="text-2xl font-extrabold text-zinc-100 font-heading pt-4 border-b border-zinc-800 pb-2">{line.substring(2)}</h1>
        }
        if (line.startsWith('## ')) {
          return <h2 key={idx} className="text-xl font-bold text-zinc-200 font-heading pt-3 border-b border-zinc-850 pb-1">{line.substring(3)}</h2>
        }
        if (line.startsWith('### ')) {
          return <h3 key={idx} className="text-lg font-bold text-zinc-200 font-heading pt-2">{line.substring(4)}</h3>
        }

        // Unordered lists
        if (line.startsWith('- ') || line.startsWith('* ')) {
          return (
            <li key={idx} className="list-disc list-inside ml-4 text-zinc-350">
              {line.substring(2)}
            </li>
          )
        }

        // Blockquotes
        if (line.startsWith('> ')) {
          return (
            <blockquote key={idx} className="border-l-4 border-zinc-750 pl-4 italic text-zinc-400 my-2 bg-zinc-900/10 py-1">
              {line.substring(2)}
            </blockquote>
          )
        }

        // Horizontal rule
        if (line.trim() === '---') {
          return <hr key={idx} className="border-zinc-850 my-6" />
        }

        // Empty line
        if (!line.trim()) {
          return <div key={idx} className="h-2" />
        }

        // Standard paragraph
        return <p key={idx} className="text-justify">{line}</p>
      })}
    </div>
  )
}

export default function WritePage() {
  // Form states
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [site, setSite] = useState('')
  const [imageDesc, setImageDesc] = useState('/images/default.png')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [content, setContent] = useState('## Introduction\n\nWrite your project background here...\n\n## Technical Implementation\n\nHow did you build it?\n\n## Conclusion\n\nWrap up the project details...')

  // Editor configuration
  const [previewMode, setPreviewMode] = useState<boolean>(false)

  // AI chat states
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([
    { role: 'assistant', content: 'Hi Ridho! I am your Gemma AI Writing Partner. Highlight draft text, select a quick prompt pill, or ask me anything to write, rewrite, or organize your blog content.' }
  ])
  const [aiInput, setAiInput] = useState('')
  const [aiLoading, setAiLoading] = useState(false)

  // UI state messages
  const [saveStatus, setSaveStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error', message: string }>({ type: 'idle', message: '' })

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-generate slug from Title
  useEffect(() => {
    if (title) {
      const generated = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
      setSlug(generated)
    }
  }, [title])

  // Pre-fill today's date
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    setDate(today)
  }, [])

  // Auto scroll AI chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  // Handle tag selection
  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  // Handle AI Chat Submit
  const handleAiSubmit = async (e?: React.FormEvent, customPrompt?: string) => {
    if (e) e.preventDefault()
    const promptToSend = customPrompt || aiInput
    if (!promptToSend.trim() || aiLoading) return

    if (!customPrompt) setAiInput('')

    // Append user message
    const updatedMessages = [...chatMessages, { role: 'user' as const, content: promptToSend }]
    setChatMessages(updatedMessages)
    setAiLoading(true)

    try {
      // Create request payload mapping editor context
      const payloadMessages = [
        { 
          role: 'system', 
          content: `You are an expert technical writing assistant for Ridho's portfolio blog. 
          The user is currently editing a post.
          Title: "${title || 'Untitled'}"
          Description: "${description || 'None'}"
          Tags: ${JSON.stringify(selectedTags)}
          
          You help refine markdown content, suggest headlines, draft paragraphs, or clean up grammar. 
          Keep your writing elegant, clear, and highly professional. Return your suggestions formatted in clean markdown.`
        },
        ...updatedMessages.map(m => ({ role: m.role, content: m.content })),
        {
          role: 'system',
          content: `Here is the current content of the markdown draft:\n\n${content}`
        }
      ]

      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: payloadMessages })
      })

      if (!res.ok) throw new Error('API server returned an error')

      const data = await res.json()
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.text }])
    } catch (err) {
      console.error('AI error:', err)
      setChatMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an issue querying the hosted model server. Please verify the API endpoint.' }])
    } finally {
      setAiLoading(false)
    }
  }

  // Trigger quick prompt template
  const handleQuickPrompt = (type: 'refine' | 'intro' | 'tags' | 'outline') => {
    let promptText = ''
    switch (type) {
      case 'refine':
        promptText = 'Can you polish and refine the spelling, grammar, and flow of my draft content?'
        break
      case 'intro':
        promptText = 'Can you draft a captivating, high-impact introductory section of about 150 words based on the title and description?'
        break
      case 'tags':
        promptText = 'Based on my post content, what tags would best match this project? Explain why.'
        break
      case 'outline':
        promptText = 'Can you suggest an elegant, structured outline (with markdown ## headings) for this project description?'
        break
    }
    handleAiSubmit(undefined, promptText)
  }

  // Append AI response to editor
  const applyAiText = (text: string) => {
    setContent(prev => prev + '\n\n' + text)
  }

  // Save draft locally
  const handleSaveDraft = async () => {
    if (!title) {
      setSaveStatus({ type: 'error', message: 'Title is required to save a draft.' })
      return
    }
    if (!slug) {
      setSaveStatus({ type: 'error', message: 'Slug is required to save a draft.' })
      return
    }

    setSaveStatus({ type: 'loading', message: 'Saving draft to disk...' })

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          title,
          description,
          tags: selectedTags,
          site,
          date,
          imageDesc,
          content
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save file.')
      }

      setSaveStatus({ 
        type: 'success', 
        message: `Successfully saved locally! File created at src/contents/${data.slug}.mdx` 
      })

      // Reset state message after 5 seconds
      setTimeout(() => {
        setSaveStatus({ type: 'idle', message: '' })
      }, 5000)

    } catch (err: any) {
      console.error(err)
      setSaveStatus({ 
        type: 'error', 
        message: err.message || 'Error occurred saving draft. Note: saving files is only allowed when running in development mode.' 
      })
    }
  }

  return (
    <main className="min-h-screen py-8 layout font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-zinc-800 pb-4 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gradient font-heading">
              AI Writer Dashboard.
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Create, refine, and write project articles directly to your local `.mdx` database.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handleSaveDraft}
              disabled={saveStatus.type === 'loading'}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md bg-indigo-600 hover:bg-indigo-500 text-white transition duration-200 disabled:opacity-50 shadow-md shadow-indigo-600/10 cursor-pointer"
            >
              {saveStatus.type === 'loading' ? <Loader className="animate-spin text-xs" /> : <Save className="text-xs" />}
              <span>Save Local Draft</span>
            </button>
            <Link href="/projects" className="px-3 py-2 text-xs border border-zinc-800 hover:border-zinc-700 text-zinc-300 rounded-md transition">
              Back to Projects
            </Link>
          </div>
        </div>

        {/* Notifications and messages */}
        {saveStatus.type !== 'idle' && (
          <div className={`p-4 rounded-lg flex items-start gap-3 border text-xs leading-relaxed transition-all ${
            saveStatus.type === 'success' ? 'bg-emerald-950/20 border-emerald-800/60 text-emerald-300' :
            saveStatus.type === 'error' ? 'bg-rose-950/20 border-rose-800/60 text-rose-300' :
            'bg-zinc-900/50 border-zinc-800 text-zinc-300'
          }`}>
            {saveStatus.type === 'success' && <CheckCircle className="text-base shrink-0 mt-0.5" />}
            {saveStatus.type === 'error' && <AlertCircle className="text-base shrink-0 mt-0.5" />}
            {saveStatus.type === 'loading' && <Loader className="animate-spin text-base shrink-0 mt-0.5" />}
            <div>
              {saveStatus.message}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT SECTION: Editor Fields & Text Area (7 Columns) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Metadata Fields Section */}
            <div className="p-6 rounded-xl border border-zinc-800/80 bg-zinc-900/20 backdrop-blur-sm space-y-4">
              <h2 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider">Metadata Frontmatter</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-zinc-400 inline-flex items-center gap-1.5"><FileText className="text-xs" /> Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Brebes Education Fair 2022" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-zinc-950 border border-zinc-850 rounded-md text-zinc-200 focus:outline-none focus:border-zinc-700 transition"
                  />
                </div>

                {/* Slug */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-zinc-400 inline-flex items-center gap-1.5">Slug (Auto-generated)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. bef-2022" 
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-zinc-950 border border-zinc-850 rounded-md text-zinc-400 font-mono focus:outline-none focus:border-zinc-700 transition"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-zinc-400">Short Description</label>
                <input 
                  type="text" 
                  placeholder="Summarize this project in 1 sentence..." 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-zinc-950 border border-zinc-850 rounded-md text-zinc-200 focus:outline-none focus:border-zinc-700 transition"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Date */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-zinc-400 inline-flex items-center gap-1.5"><Calendar className="text-xs" /> Date</label>
                  <input 
                    type="text" 
                    placeholder="YYYY-MM (e.g. 2022-11)" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-zinc-950 border border-zinc-850 rounded-md text-zinc-200 focus:outline-none focus:border-zinc-700 transition font-mono"
                  />
                </div>

                {/* Image Desc */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-zinc-400 inline-flex items-center gap-1.5"><ImageIcon className="text-xs" /> Image Path</label>
                  <input 
                    type="text" 
                    placeholder="/images/project.png" 
                    value={imageDesc}
                    onChange={(e) => setImageDesc(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-zinc-950 border border-zinc-850 rounded-md text-zinc-250 focus:outline-none focus:border-zinc-700 transition font-mono"
                  />
                </div>

                {/* Site URL */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-zinc-400 inline-flex items-center gap-1.5"><LinkIcon className="text-xs" /> Website URL</label>
                  <input 
                    type="text" 
                    placeholder="https://example.com" 
                    value={site}
                    onChange={(e) => setSite(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-zinc-950 border border-zinc-850 rounded-md text-zinc-250 focus:outline-none focus:border-zinc-700 transition font-mono"
                  />
                </div>
              </div>

              {/* Select Tags */}
              <div className="flex flex-col gap-2 pt-2">
                <span className="text-[11px] font-semibold text-zinc-400">Project Tech Stack tags:</span>
                <div className="flex flex-wrap gap-1.5">
                  {AVAILABLE_TAGS.map((tag) => {
                    const isSelected = selectedTags.includes(tag)
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleTagToggle(tag)}
                        className={`px-2.5 py-1 text-xs font-semibold rounded transition cursor-pointer ${
                          isSelected 
                            ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' 
                            : 'bg-zinc-950 border border-zinc-850 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        {tag.replace('-', ' ')}
                      </button>
                    )
                  })}
                </div>
              </div>

            </div>

            {/* Markdown Text Area / Preview Panel */}
            <div className="flex-1 flex flex-col p-6 rounded-xl border border-zinc-800/80 bg-zinc-900/20 backdrop-blur-sm min-h-[450px]">
              <div className="flex items-center justify-between border-b border-zinc-850 pb-3 mb-4">
                <h2 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider">Markdown Editor</h2>
                <div className="flex bg-zinc-950 border border-zinc-850 p-0.5 rounded-md">
                  <button 
                    onClick={() => setPreviewMode(false)}
                    className={`px-2.5 py-1 text-xs font-medium rounded flex items-center gap-1.5 cursor-pointer ${!previewMode ? 'bg-zinc-900 text-zinc-100' : 'text-zinc-450 hover:text-zinc-250'}`}
                  >
                    <CodeIcon className="text-xs" />
                    <span>Edit</span>
                  </button>
                  <button 
                    onClick={() => setPreviewMode(true)}
                    className={`px-2.5 py-1 text-xs font-medium rounded flex items-center gap-1.5 cursor-pointer ${previewMode ? 'bg-zinc-900 text-zinc-100' : 'text-zinc-450 hover:text-zinc-250'}`}
                  >
                    <Eye className="text-xs" />
                    <span>Preview</span>
                  </button>
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                {previewMode ? (
                  <div className="p-2 overflow-y-auto max-h-[500px]">
                    <MarkdownPreview text={content} />
                  </div>
                ) : (
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full flex-1 min-h-[400px] p-4 bg-zinc-950 border border-zinc-850 rounded-lg text-zinc-200 font-mono text-sm focus:outline-none focus:border-zinc-800 leading-relaxed resize-y"
                    placeholder="Write body content in MDX..."
                  />
                )}
              </div>
            </div>

          </div>

          {/* RIGHT SECTION: AI Writing Copilot Sidebar (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col rounded-xl border border-zinc-800/80 bg-zinc-900/20 backdrop-blur-sm overflow-hidden h-[750px]">
            
            {/* AI Copilot Header */}
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/40">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-indigo-600/10 text-indigo-400">
                  <Cpu className="text-base" />
                </div>
                <div>
                  <h2 className="text-xs font-extrabold text-zinc-200 tracking-tight font-heading">AI Writing Partner</h2>
                  <span className="text-[9px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Gemma 26B Ready
                  </span>
                </div>
              </div>
            </div>

            {/* AI Messages Stream container */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-zinc-950/20">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <span className="text-[9px] font-mono text-zinc-500 mb-1">
                    {msg.role === 'user' ? 'You' : 'Gemma Assistant'}
                  </span>
                  
                  <div className={`p-3 rounded-lg text-xs leading-relaxed max-w-[90%] border ${
                    msg.role === 'user'
                      ? 'bg-indigo-950/20 border-indigo-900/50 text-indigo-100'
                      : 'bg-zinc-900/80 border-zinc-800 text-zinc-300'
                  }`}>
                    {/* Render message line by line */}
                    <div className="space-y-1 text-justify whitespace-pre-line">{msg.content}</div>

                    {msg.role === 'assistant' && index > 0 && (
                      <button
                        onClick={() => applyAiText(msg.content)}
                        className="mt-3 inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-semibold font-mono rounded bg-indigo-600 text-white hover:bg-indigo-500 transition cursor-pointer"
                      >
                        + Insert into Draft
                      </button>
                    )}
                  </div>
                </div>
              ))}
              
              {aiLoading && (
                <div className="flex items-start gap-2 text-zinc-400">
                  <Loader className="animate-spin text-xs mt-0.5" />
                  <span className="text-[10px] font-mono">Thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* AI Prompts Helper Pills */}
            <div className="px-4 py-2 border-t border-zinc-850 flex flex-wrap gap-1.5 bg-zinc-950/40">
              <button 
                type="button" 
                onClick={() => handleQuickPrompt('intro')}
                className="px-2 py-0.5 text-[9px] font-semibold rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition cursor-pointer"
              >
                Draft Intro
              </button>
              <button 
                type="button" 
                onClick={() => handleQuickPrompt('refine')}
                className="px-2 py-0.5 text-[9px] font-semibold rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition cursor-pointer"
              >
                Refine Draft
              </button>
              <button 
                type="button" 
                onClick={() => handleQuickPrompt('outline')}
                className="px-2 py-0.5 text-[9px] font-semibold rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition cursor-pointer"
              >
                Generate Outline
              </button>
              <button 
                type="button" 
                onClick={() => handleQuickPrompt('tags')}
                className="px-2 py-0.5 text-[9px] font-semibold rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition cursor-pointer"
              >
                Suggest Tags
              </button>
            </div>

            {/* AI Text Input Form */}
            <form onSubmit={handleAiSubmit} className="p-3 border-t border-zinc-800 bg-zinc-950/60 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask Gemma to rewrite, write sections..."
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                disabled={aiLoading}
                className="flex-1 px-3 py-2 text-xs bg-zinc-950 border border-zinc-850 rounded-md text-zinc-200 focus:outline-none focus:border-zinc-800 transition disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!aiInput.trim() || aiLoading}
                className="p-2 text-xs rounded-md bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40 transition cursor-pointer"
              >
                <Send className="text-xs" />
              </button>
            </form>

          </div>

        </div>

      </div>
    </main>
  )
}
