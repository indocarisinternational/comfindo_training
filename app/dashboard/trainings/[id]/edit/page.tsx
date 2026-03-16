import { TrainingForm } from "@/dashboard/trainings/TrainingForm"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

export default async function EditTrainingPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = await createClient()

  const { data: training } = await supabase
    .from("trainings")
    .select("*")
    .eq("id", params.id)
    .single()

  if (!training) {
    notFound()
  }

  return (
    <div>
      <TrainingForm initialData={training} />
    </div>
  )
}
