"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { approveDraft, rejectDraft, resetToDraft, publishDraft } from "@/app/admin/seo/article-drafts/actions"
import { toast } from "sonner"
import { Loader2, Check, X, RefreshCcw, Send, ExternalLink } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

interface SeoDraftActionsProps {
  draftId: string
  status: 'draft' | 'approved' | 'rejected' | 'published'
  publishedBlogPostId?: string | null
}

export function SeoDraftActions({ draftId, status, publishedBlogPostId }: SeoDraftActionsProps) {
  const [loading, setLoading] = useState(false)
  
  // Modals state
  const [rejectOpen, setRejectOpen] = useState(false)
  const [publishOpen, setPublishOpen] = useState(false)
  const [rejectReason, setRejectReason] = useState("")
  const [blogStatus, setBlogStatus] = useState<'draft' | 'published'>('draft')

  const handleApprove = async () => {
    setLoading(true)
    const { error } = await approveDraft(draftId)
    setLoading(false)
    if (error) {
      toast.error("Failed to approve", { description: error })
    } else {
      toast.success("Draft approved successfully")
    }
  }

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      toast.error("Please provide a rejection reason")
      return
    }
    setLoading(true)
    const { error } = await rejectDraft(draftId, rejectReason)
    setLoading(false)
    if (error) {
      toast.error("Failed to reject", { description: error })
    } else {
      toast.success("Draft rejected")
      setRejectOpen(false)
      setRejectReason("")
    }
  }

  const handleReset = async () => {
    setLoading(true)
    const { error } = await resetToDraft(draftId)
    setLoading(false)
    if (error) {
      toast.error("Failed to reset", { description: error })
    } else {
      toast.success("Reset to draft successfully")
    }
  }

  const handlePublish = async () => {
    setLoading(true)
    const { error, blogPostId } = await publishDraft(draftId, blogStatus)
    setLoading(false)
    if (error) {
      toast.error("Failed to publish", { description: error })
    } else {
      toast.success("Published to blog successfully")
      setPublishOpen(false)
    }
  }

  if (status === 'published') {
    return (
      <div className="space-y-2">
        {publishedBlogPostId && (
          <Button className="w-full" asChild>
            <Link href={`/admin/cms/blog/edit/${publishedBlogPostId}`} target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" /> Open Blog Post
            </Link>
          </Button>
        )}
        <p className="text-xs text-muted-foreground text-center">
          This draft has been published and can no longer be edited here.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-2">
        {status === 'draft' && (
          <>
            <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleApprove} disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
              Approve
            </Button>
            <Button variant="destructive" className="w-full" onClick={() => setRejectOpen(true)} disabled={loading}>
              <X className="mr-2 h-4 w-4" /> Reject
            </Button>
          </>
        )}

        {status === 'rejected' && (
          <Button variant="outline" className="w-full" onClick={handleReset} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCcw className="mr-2 h-4 w-4" />}
            Reset to Draft
          </Button>
        )}

        {status === 'approved' && (
          <>
            <Button className="w-full bg-comfindo-green hover:bg-comfindo-green-dark" onClick={() => setPublishOpen(true)} disabled={loading}>
              <Send className="mr-2 h-4 w-4" /> Publish to Blog
            </Button>
            <Button variant="destructive" className="w-full" onClick={() => setRejectOpen(true)} disabled={loading}>
              <X className="mr-2 h-4 w-4" /> Reject
            </Button>
            <Button variant="outline" className="w-full" onClick={handleReset} disabled={loading}>
              <RefreshCcw className="mr-2 h-4 w-4" /> Reset to Draft
            </Button>
          </>
        )}
      </div>

      {/* Reject Modal */}
      <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Article Draft</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this draft. This will be visible in the SEO Engine.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Rejection Reason</Label>
              <Textarea 
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="e.g. Needs more focus on keyword density..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectOpen(false)} disabled={loading}>Cancel</Button>
            <Button variant="destructive" onClick={handleReject} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirm Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Publish Modal */}
      <Dialog open={publishOpen} onOpenChange={setPublishOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish to Blog</DialogTitle>
            <DialogDescription>
              Copy this draft to the public blog system. Please select the final visibility status.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Blog Post Status</Label>
              <Select value={blogStatus} onValueChange={(v: 'draft'|'published') => setBlogStatus(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft (Safe)</SelectItem>
                  <SelectItem value="published">Published (Public)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-2">
                Selecting "Draft" is recommended if you still want to review the article inside the Blog CMS before making it public.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPublishOpen(false)} disabled={loading}>Cancel</Button>
            <Button className="bg-comfindo-green hover:bg-comfindo-green-dark" onClick={handlePublish} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Publish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
