import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MultiStepForm } from "@/components/team-management/multi-step-form"
import { TeamRoster } from "@/components/team-management/team-roster"
import { MemberSearch } from "@/components/team-management/member-search"
import { ClaimRequests } from "@/components/team-management/claim-requests"
import { AuditTrail } from "@/components/team-management/audit-trail"

export default function TeamManagementPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-telus-purple">Team Management Dashboard</h1>
      <Tabs defaultValue="add-member" className="w-full">
        <TabsList>
          <TabsTrigger value="add-member">Add Team Member</TabsTrigger>
          <TabsTrigger value="roster">Team Roster</TabsTrigger>
          <TabsTrigger value="search">Member Search</TabsTrigger>
          <TabsTrigger value="claims">Claim Requests</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>
        <TabsContent value="add-member">
          <MultiStepForm />
        </TabsContent>
        <TabsContent value="roster">
          <TeamRoster />
        </TabsContent>
        <TabsContent value="search">
          <MemberSearch />
        </TabsContent>
        <TabsContent value="claims">
          <ClaimRequests />
        </TabsContent>
        <TabsContent value="audit">
          <AuditTrail />
        </TabsContent>
      </Tabs>
    </div>
  )
}

