"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { TeamMemberEvaluationSurvey } from "@/components/team-member-evaluation/team-member-evaluation-survey"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

interface EvaluationData {
  id: string
  title: string
}

export function TeamMemberEvaluationContent() {
  const searchParams = useSearchParams()
  const evaluationId = searchParams.get("id")
  const [evaluationData, setEvaluationData] = useState<EvaluationData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvaluationData = async () => {
      if (!evaluationId) {
        setError("No evaluation ID provided")
        setIsLoading(false)
        return
      }

      try {
        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Validate evaluationId (example: check if it's a number)
        if (isNaN(Number(evaluationId))) {
          throw new Error("Invalid evaluation ID")
        }

        const mockData: EvaluationData = {
          id: evaluationId,
          title: `Quarterly Evaluation ${evaluationId}`,
        }
        setEvaluationData(mockData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch evaluation data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvaluationData()
  }, [evaluationId])

  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (error || !evaluationData) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-crimson">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{error || "Failed to load evaluation data"}</p>
          <Button onClick={() => window.history.back()} variant="outline">
            Go Back
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-telus-purple">{evaluationData.title}</h1>
      <TeamMemberEvaluationSurvey evaluationId={evaluationData.id} />
    </div>
  )
}

