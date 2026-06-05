"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Code,
  Undo,
  Redo,
  Link as LinkIcon,
  Image as ImageIcon,
  Minus,
} from "lucide-react"

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
  placeholder?: string
}

export function RichTextEditor({ content, onChange, placeholder = "Mulai menulis..." }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Image.configure({ inline: false, allowBase64: true }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-[var(--primary)] underline underline-offset-4" } }),
      Placeholder.configure({ placeholder }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none min-h-[400px] focus:outline-none px-4 py-3 prose-headings:text-[var(--foreground)] prose-p:text-[var(--muted-foreground)] prose-a:text-[var(--primary)]",
      },
    },
  })

  if (!editor) return null

  const addImage = () => {
    const url = window.prompt("Image URL:")
    if (url) editor.chain().focus().setImage({ src: url }).run()
  }

  const addLink = () => {
    const url = window.prompt("Link URL:")
    if (url) editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }

  return (
    <div className="overflow-hidden rounded-[12px] border border-[var(--border)] bg-[var(--card)] shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-[var(--border)] bg-[var(--secondary)] p-2">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} icon={<Bold className="h-4 w-4" />} />
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} icon={<Italic className="h-4 w-4" />} />
        <div className="mx-1 h-6 w-px bg-[var(--border)]" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} icon={<Heading1 className="h-4 w-4" />} />
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} icon={<Heading2 className="h-4 w-4" />} />
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} icon={<Heading3 className="h-4 w-4" />} />
        <div className="mx-1 h-6 w-px bg-[var(--border)]" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} icon={<List className="h-4 w-4" />} />
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} icon={<ListOrdered className="h-4 w-4" />} />
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} icon={<Quote className="h-4 w-4" />} />
        <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")} icon={<Code className="h-4 w-4" />} />
        <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} active={false} icon={<Minus className="h-4 w-4" />} />
        <div className="mx-1 h-6 w-px bg-[var(--border)]" />
        <ToolbarButton onClick={addLink} active={editor.isActive("link")} icon={<LinkIcon className="h-4 w-4" />} />
        <ToolbarButton onClick={addImage} active={false} icon={<ImageIcon className="h-4 w-4" />} />
        <div className="mx-1 h-6 w-px bg-[var(--border)]" />
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} active={false} icon={<Undo className="h-4 w-4" />} />
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} active={false} icon={<Redo className="h-4 w-4" />} />
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  )
}

function ToolbarButton({ onClick, active, icon }: { onClick: () => void; active: boolean; icon: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded-lg transition-colors ${
        active
          ? "bg-[var(--primary)]/10 text-[var(--primary)]"
          : "text-[var(--muted-foreground)] hover:bg-[var(--accent)] hover:text-[var(--foreground)]"
      }`}
    >
      {icon}
    </button>
  )
}
