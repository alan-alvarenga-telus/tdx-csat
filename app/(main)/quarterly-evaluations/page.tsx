import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MultiStepForm } from "@/components/quarterly-evaluations/multi-step-form"
import { EvaluationCycleInitiator } from "@/components/quarterly-evaluations/evaluation-cycle-initiator"
import { EvaluationStatus } from "@/components/quarterly-evaluations/evaluation-status"
import { IncompleteDataHandler } from "@/components/quarterly-evaluations/incomplete-data-handler"
import { TeamMemberEvaluationSurvey } from "@/components/team-member-evaluation/team-member-evaluation-survey"

export default function QuarterlyEvaluationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-telus-purple">Quarterly Evaluations</h1>
      <Tabs defaultValue="new-evaluation" className="w-full">
        <TabsList>
          <TabsTrigger value="new-evaluation">New Evaluation</TabsTrigger>
          <TabsTrigger value="cycle-initiator">Cycle Initiator</TabsTrigger>
          <TabsTrigger value="evaluation-status">Evaluation Status</TabsTrigger>
          <TabsTrigger value="incomplete-data">Incomplete Data</TabsTrigger>
          <TabsTrigger value="team-member-survey">Team Member Survey</TabsTrigger>
        </TabsList>
        <TabsContent value="new-evaluation">
          <MultiStepForm />
        </TabsContent>
        <TabsContent value="cycle-initiator">
          <EvaluationCycleInitiator />
        </TabsContent>
        <TabsContent value="evaluation-status">
          <EvaluationStatus />
        </TabsContent>
        <TabsContent value="incomplete-data">
          <IncompleteDataHandler />
        </TabsContent>
        <TabsContent value="team-member-survey">
          <TeamMemberEvaluationSurvey evaluationId="dummy-id" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

