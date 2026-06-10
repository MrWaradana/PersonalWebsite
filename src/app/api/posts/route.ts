import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: Request) {
  // Security guard: only allow writing files in development mode
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'File saving is only allowed in local development environment.' },
      { status: 403 }
    )
  }

  try {
    const { slug, title, description, tags, site, date, imageDesc, content } = await req.json()

    if (!slug || !title) {
      return NextResponse.json({ error: 'Slug and title are required.' }, { status: 400 })
    }

    const cleanSlug = slug.replace(/[^a-zA-Z0-9-_]/g, '').toLowerCase()
    const targetPath = path.join(process.cwd(), 'src', 'contents', `${cleanSlug}.mdx`)

    // Format tags array to string representation e.g. ["Next-Js", "Typescript"]
    const tagsString = JSON.stringify(tags || [])

    // Generate mdx file content with YAML frontmatter
    const mdxContent = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${(description || '').replace(/"/g, '\\"')}"
tags: ${tagsString}
site: "${site || ''}"
slug: "${cleanSlug}"
imageDesc: "${imageDesc || '/images/default.png'}"
date: "${date || new Date().toISOString().split('T')[0]}"
---

${content}
`

    // Write file to src/contents
    fs.writeFileSync(targetPath, mdxContent, { encoding: 'utf8' })

    return NextResponse.json({ success: true, path: targetPath, slug: cleanSlug })
  } catch (error: any) {
    console.error('Error saving post:', error)
    return NextResponse.json({ error: error.message || 'Failed to save post file.' }, { status: 500 })
  }
}
