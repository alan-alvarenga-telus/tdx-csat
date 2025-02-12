import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MultiStepForm } from "@/components/survey-templates/multi-step-form"
import { TemplateList } from "@/components/survey-templates/template-list"

export default function SurveyTemplatesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-telus-purple">Survey Template Management</h1>
      <Tabs defaultValue="create" className="w-full">
        <TabsList>
          <TabsTrigger value="create">Create Template</TabsTrigger>
          <TabsTrigger value="list">Template List</TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <MultiStepForm />
        </TabsContent>
        <TabsContent value="list">
          <TemplateList />
        </TabsContent>
      </Tabs>
    </div>
  )
}

