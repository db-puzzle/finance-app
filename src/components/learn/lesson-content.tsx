'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Lightbulb, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronDown,
  ChevronUp,
  Sparkles,
  Target,
  BookOpen,
  Zap
} from 'lucide-react'

type ContentBlock = {
  type: 'text' | 'tip' | 'warning' | 'keypoint' | 'example' | 'stat' | 'checklist' | 'expandable'
  content: string
  title?: string
  items?: string[]
}

type LessonContentProps = {
  content: string
  locale: 'en' | 'pt'
}

export function LessonContent({ content, locale }: LessonContentProps) {
  const blocks = parseContentToBlocks(content)

  return (
    <div className="space-y-6">
      {blocks.map((block, index) => (
        <ContentBlockRenderer key={index} block={block} locale={locale} />
      ))}
    </div>
  )
}

function ContentBlockRenderer({ block, locale }: { block: ContentBlock; locale: 'en' | 'pt' }) {
  const [isExpanded, setIsExpanded] = useState(false)

  switch (block.type) {
    case 'tip':
      return (
        <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/20">
          <CardContent className="pt-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <Lightbulb className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div>
                <p className="font-semibold text-blue-800 dark:text-blue-300 mb-1">
                  {locale === 'en' ? 'Pro Tip' : 'Dica'}
                </p>
                <div className="text-blue-700 dark:text-blue-300/90 text-sm" 
                     dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(block.content) }} />
              </div>
            </div>
          </CardContent>
        </Card>
      )

    case 'warning':
      return (
        <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/20">
          <CardContent className="pt-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900">
                  <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
              <div>
                <p className="font-semibold text-amber-800 dark:text-amber-300 mb-1">
                  {locale === 'en' ? 'Important' : 'Importante'}
                </p>
                <div className="text-amber-700 dark:text-amber-300/90 text-sm"
                     dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(block.content) }} />
              </div>
            </div>
          </CardContent>
        </Card>
      )

    case 'keypoint':
      return (
        <Card className="border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/20">
          <CardContent className="pt-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                  <Target className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div>
                <p className="font-semibold text-green-800 dark:text-green-300 mb-1">
                  {locale === 'en' ? 'Key Point' : 'Ponto Chave'}
                </p>
                <div className="text-green-700 dark:text-green-300/90 text-sm"
                     dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(block.content) }} />
              </div>
            </div>
          </CardContent>
        </Card>
      )

    case 'example':
      return (
        <Card className="border-purple-200 bg-purple-50/50 dark:border-purple-900 dark:bg-purple-950/20">
          <CardContent className="pt-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                  <BookOpen className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-purple-800 dark:text-purple-300 mb-2">
                  {locale === 'en' ? 'Example' : 'Exemplo'}
                </p>
                <div className="text-purple-700 dark:text-purple-300/90 text-sm bg-white/50 dark:bg-black/20 rounded-lg p-3"
                     dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(block.content) }} />
              </div>
            </div>
          </CardContent>
        </Card>
      )

    case 'stat':
      return (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6 pb-6 text-center">
            <Zap className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-3xl font-bold text-primary mb-1"
                 dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(block.title || '') }} />
            <p className="text-sm text-muted-foreground"
               dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(block.content) }} />
          </CardContent>
        </Card>
      )

    case 'checklist':
      return (
        <Card>
          <CardContent className="pt-4">
            <div className="space-y-3">
              {block.items?.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm" dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(item) }} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )

    case 'expandable':
      return (
        <Card className="overflow-hidden">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-medium">{block.title}</span>
            </div>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
          {isExpanded && (
            <CardContent className="pt-0 pb-4 border-t">
              <div className="pt-3 text-sm text-muted-foreground"
                   dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(block.content) }} />
            </CardContent>
          )}
        </Card>
      )

    default:
      return (
        <div 
          className="prose prose-slate dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h1:text-2xl prose-h1:mb-4 prose-h1:flex prose-h1:items-center prose-h1:gap-2
            prose-h2:text-xl prose-h2:mt-6 prose-h2:mb-3 prose-h2:flex prose-h2:items-center prose-h2:gap-2
            prose-h3:text-lg prose-h3:mt-4 prose-h3:mb-2
            prose-p:leading-7 prose-p:mb-3 prose-p:text-muted-foreground
            prose-ul:my-3 prose-ul:list-none prose-ul:pl-0
            prose-ol:my-3 prose-ol:list-none prose-ol:pl-0
            prose-li:my-1.5 prose-li:pl-0
            prose-blockquote:border-l-4 prose-blockquote:border-primary/50 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-4 prose-blockquote:text-muted-foreground
            prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:text-sm
            prose-table:my-4 prose-table:w-full prose-table:text-sm
            prose-th:border prose-th:border-border prose-th:px-3 prose-th:py-2 prose-th:bg-muted prose-th:text-left prose-th:font-semibold
            prose-td:border prose-td:border-border prose-td:px-3 prose-td:py-2
            prose-strong:font-semibold prose-strong:text-foreground
            prose-a:text-primary prose-a:underline
          "
          dangerouslySetInnerHTML={{ __html: parseMarkdownToHtml(block.content) }}
        />
      )
  }
}

function parseContentToBlocks(content: string): ContentBlock[] {
  const blocks: ContentBlock[] = []
  const lines = content.split('\n')
  let currentBlock: ContentBlock | null = null
  let currentContent: string[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Check for special block markers
    if (line.startsWith(':::tip')) {
      if (currentBlock || currentContent.length > 0) {
        blocks.push(currentBlock || { type: 'text', content: currentContent.join('\n') })
        currentContent = []
      }
      currentBlock = { type: 'tip', content: '' }
      continue
    }
    
    if (line.startsWith(':::warning')) {
      if (currentBlock || currentContent.length > 0) {
        blocks.push(currentBlock || { type: 'text', content: currentContent.join('\n') })
        currentContent = []
      }
      currentBlock = { type: 'warning', content: '' }
      continue
    }
    
    if (line.startsWith(':::keypoint')) {
      if (currentBlock || currentContent.length > 0) {
        blocks.push(currentBlock || { type: 'text', content: currentContent.join('\n') })
        currentContent = []
      }
      currentBlock = { type: 'keypoint', content: '' }
      continue
    }
    
    if (line.startsWith(':::example')) {
      if (currentBlock || currentContent.length > 0) {
        blocks.push(currentBlock || { type: 'text', content: currentContent.join('\n') })
        currentContent = []
      }
      currentBlock = { type: 'example', content: '' }
      continue
    }

    if (line.startsWith(':::stat')) {
      if (currentBlock || currentContent.length > 0) {
        blocks.push(currentBlock || { type: 'text', content: currentContent.join('\n') })
        currentContent = []
      }
      const titleMatch = line.match(/:::stat\s*(.*)/)
      currentBlock = { type: 'stat', title: titleMatch?.[1] || '', content: '' }
      continue
    }

    if (line.startsWith(':::expandable')) {
      if (currentBlock || currentContent.length > 0) {
        blocks.push(currentBlock || { type: 'text', content: currentContent.join('\n') })
        currentContent = []
      }
      const titleMatch = line.match(/:::expandable\s*(.*)/)
      currentBlock = { type: 'expandable', title: titleMatch?.[1] || 'Learn More', content: '' }
      continue
    }
    
    if (line.startsWith(':::checklist')) {
      if (currentBlock || currentContent.length > 0) {
        blocks.push(currentBlock || { type: 'text', content: currentContent.join('\n') })
        currentContent = []
      }
      currentBlock = { type: 'checklist', content: '', items: [] }
      continue
    }

    if (line === ':::') {
      if (currentBlock) {
        if (currentBlock.type === 'checklist') {
          currentBlock.items = currentContent.filter(l => l.trim())
        } else {
          currentBlock.content = currentContent.join('\n').trim()
        }
        blocks.push(currentBlock)
        currentBlock = null
        currentContent = []
      }
      continue
    }

    currentContent.push(line)
  }

  // Add remaining content
  if (currentBlock) {
    currentBlock.content = currentContent.join('\n').trim()
    blocks.push(currentBlock)
  } else if (currentContent.length > 0) {
    const content = currentContent.join('\n').trim()
    if (content) {
      blocks.push({ type: 'text', content })
    }
  }

  return blocks
}

function parseInlineMarkdown(text: string): string {
  let html = text
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
  html = html.replace(/`([^`]+)`/g, '<code class="bg-black/10 dark:bg-white/10 px-1 rounded">$1</code>')
  html = html.replace(/\n/g, '<br />')
  return html
}

function parseMarkdownToHtml(markdown: string): string {
  let html = markdown

  // Headers with emoji support
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')

  // Italic
  html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>')

  // Blockquotes
  html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')

  // Code blocks
  html = html.replace(/```([^`]+)```/gim, '<pre><code>$1</code></pre>')

  // Inline code
  html = html.replace(/`([^`]+)`/gim, '<code>$1</code>')

  // Tables
  html = parseTable(html)

  // Unordered lists with icons
  html = parseUnorderedLists(html)

  // Ordered lists
  html = parseOrderedLists(html)

  // Horizontal rules
  html = html.replace(/^---$/gim, '<hr class="my-6 border-border" />')

  // Paragraphs
  html = html.split('\n\n').map(paragraph => {
    const trimmed = paragraph.trim()
    if (!trimmed) return ''
    if (trimmed.startsWith('<')) return trimmed
    return `<p>${trimmed}</p>`
  }).join('\n')

  // Clean up line breaks
  html = html.replace(/\n(?!<)/g, '<br />')

  return html
}

function parseTable(html: string): string {
  const tableRegex = /\|(.+)\|\n\|[-| ]+\|\n((?:\|.+\|\n?)+)/g
  
  return html.replace(tableRegex, (match, headerRow, bodyRows) => {
    const headers = headerRow.split('|').filter((h: string) => h.trim())
    const rows = bodyRows.trim().split('\n').map((row: string) => 
      row.split('|').filter((cell: string) => cell.trim())
    )

    const headerHtml = headers.map((h: string) => `<th>${h.trim()}</th>`).join('')
    const bodyHtml = rows.map((row: string[]) => 
      `<tr>${row.map((cell: string) => `<td>${cell.trim()}</td>`).join('')}</tr>`
    ).join('')

    return `<div class="overflow-x-auto rounded-lg border border-border my-4"><table class="w-full"><thead><tr>${headerHtml}</tr></thead><tbody>${bodyHtml}</tbody></table></div>`
  })
}

function parseUnorderedLists(html: string): string {
  const lines = html.split('\n')
  const result: string[] = []
  let inList = false

  for (const line of lines) {
    const match = line.match(/^- (.+)$/)
    if (match) {
      if (!inList) {
        result.push('<ul class="space-y-2 my-4">')
        inList = true
      }
      // Add visual bullet
      result.push(`<li class="flex items-start gap-2"><span class="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2"></span><span>${match[1]}</span></li>`)
    } else {
      if (inList) {
        result.push('</ul>')
        inList = false
      }
      result.push(line)
    }
  }

  if (inList) {
    result.push('</ul>')
  }

  return result.join('\n')
}

function parseOrderedLists(html: string): string {
  const lines = html.split('\n')
  const result: string[] = []
  let inList = false
  let listNumber = 0

  for (const line of lines) {
    const match = line.match(/^\d+\. (.+)$/)
    if (match) {
      if (!inList) {
        result.push('<ol class="space-y-3 my-4">')
        inList = true
        listNumber = 0
      }
      listNumber++
      result.push(`<li class="flex items-start gap-3"><span class="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center">${listNumber}</span><span class="pt-0.5">${match[1]}</span></li>`)
    } else {
      if (inList) {
        result.push('</ol>')
        inList = false
      }
      result.push(line)
    }
  }

  if (inList) {
    result.push('</ol>')
  }

  return result.join('\n')
}
