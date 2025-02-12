import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MultiStepForm } from "@/components/organization-structure/multi-step-form"
import { CSVUpload } from "@/components/organization-structure/csv-upload"
import { StructureTree } from "@/components/organization-structure/structure-tree"

export default function OrganizationStructurePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-telus-purple">Organization Structure Management</h1>
      <Tabs defaultValue="create" className="w-full">
        <TabsList>
          <TabsTrigger value="create">Create Organization</TabsTrigger>
          <TabsTrigger value="structure">View Structure</TabsTrigger>
          <TabsTrigger value="upload">Upload Data</TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <MultiStepForm />
        </TabsContent>
        <TabsContent value="structure">
          <StructureTree />
        </TabsContent>
        <TabsContent value="upload">
          <CSVUpload />
        </TabsContent>
      </Tabs>
    </div>
  )
}

