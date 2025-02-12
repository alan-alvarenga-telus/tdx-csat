import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserAccountForm } from "@/components/dynamic-hierarchy-manager/user-account-form"
import { OrganizationalChart } from "@/components/dynamic-hierarchy-manager/organizational-chart"
import { RolePermissionMatrix } from "@/components/dynamic-hierarchy-manager/role-permission-matrix"
import { LOBManagement } from "@/components/dynamic-hierarchy-manager/lob-management"

export default function DynamicHierarchyManagerPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-telus-purple">Dynamic Hierarchy Manager</h1>
      <Tabs defaultValue="user-accounts" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="user-accounts">User Accounts</TabsTrigger>
          <TabsTrigger value="org-chart">Organizational Chart</TabsTrigger>
          <TabsTrigger value="permissions">Role Permissions</TabsTrigger>
          <TabsTrigger value="lob-management">LOB Management</TabsTrigger>
        </TabsList>
        <TabsContent value="user-accounts">
          <UserAccountForm />
        </TabsContent>
        <TabsContent value="org-chart">
          <OrganizationalChart />
        </TabsContent>
        <TabsContent value="permissions">
          <RolePermissionMatrix />
        </TabsContent>
        <TabsContent value="lob-management">
          <LOBManagement />
        </TabsContent>
      </Tabs>
    </div>
  )
}

