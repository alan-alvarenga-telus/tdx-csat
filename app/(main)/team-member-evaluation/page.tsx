import { Suspense } from "react"
import { TeamMemberEvaluationContent } from "@/components/team-member-evaluation/team-member-evaluation-content"
import { Skeleton } from "@/components/ui/skeleton"

export default function TeamMemberEvaluationPage() {
  return (
    <Suspense fallback={<Skeleton className="h-screen w-full" />}>
      <TeamMemberEvaluationContent />
    </Suspense>
  )
}

