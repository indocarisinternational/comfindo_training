"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function approveDraft(id: string) {
  const supabase = await createClient()

  // Validate admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const { error } = await supabase
    .from("seo_article_drafts")
    .update({
      status: "approved",
      approved_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq("id", id)

  if (error) return { error: error.message }
  
  revalidatePath(`/admin/seo/article-drafts/${id}`)
  revalidatePath('/admin/seo/article-drafts')
  return { success: true }
}

export async function rejectDraft(id: string, reason: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const { error } = await supabase
    .from("seo_article_drafts")
    .update({
      status: "rejected",
      rejection_reason: reason,
      updated_at: new Date().toISOString()
    })
    .eq("id", id)

  if (error) return { error: error.message }

  revalidatePath(`/admin/seo/article-drafts/${id}`)
  revalidatePath('/admin/seo/article-drafts')
  return { success: true }
}

export async function resetToDraft(id: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const { error } = await supabase
    .from("seo_article_drafts")
    .update({
      status: "draft",
      rejection_reason: null,
      updated_at: new Date().toISOString()
    })
    .eq("id", id)

  if (error) return { error: error.message }

  revalidatePath(`/admin/seo/article-drafts/${id}`)
  revalidatePath('/admin/seo/article-drafts')
  return { success: true }
}

export async function publishDraft(id: string, blogStatus: 'draft' | 'published') {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  // 1. Fetch draft
  const { data: draft, error: fetchError } = await supabase
    .from("seo_article_drafts")
    .select("*")
    .eq("id", id)
    .single()

  if (fetchError || !draft) return { error: "Draft not found" }
  if (draft.status !== "approved") return { error: "Only approved drafts can be published" }

  // Validate required fields for blog
  if (!draft.title || !draft.slug || !draft.content) {
    return { error: "Missing required fields (title, slug, content)" }
  }

  // 2. Check for duplicate slug
  const { count, error: countError } = await supabase
    .from("blog_posts")
    .select("*", { count: 'exact', head: true })
    .eq("slug", draft.slug)

  if (countError) return { error: countError.message }
  if (count && count > 0) return { error: "Slug sudah digunakan di blog. Ubah slug terlebih dahulu." }

  // 3. Prepare payload for blog_posts
  const payload = {
    title: draft.title,
    slug: draft.slug,
    excerpt: draft.excerpt || '',
    content: draft.content,
    focus_keyword: draft.focus_keyword,
    seo_title: draft.seo_title || draft.title,
    seo_description: draft.seo_description || draft.excerpt || '',
    author_name: "Tim comfindo",
    status: blogStatus,
    is_published: blogStatus === 'published',
    published_at: blogStatus === 'published' ? new Date().toISOString() : null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  // 4. Insert into blog_posts
  const { data: insertedPost, error: insertError } = await supabase
    .from("blog_posts")
    .insert([payload])
    .select()
    .single()

  if (insertError) return { error: insertError.message }

  // 5. Update seo_article_drafts status
  const { error: updateError } = await supabase
    .from("seo_article_drafts")
    .update({
      status: "published",
      published_blog_post_id: insertedPost.id,
      updated_at: new Date().toISOString()
    })
    .eq("id", id)

  if (updateError) {
    // Log error but the post was created
    console.error("Failed to update draft status after publishing:", updateError)
  }

  revalidatePath(`/admin/seo/article-drafts/${id}`)
  revalidatePath('/admin/seo/article-drafts')
  return { success: true, blogPostId: insertedPost.id }
}
