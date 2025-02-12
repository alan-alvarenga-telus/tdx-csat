import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function DynamicHierarchyManager() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>User Accounts</CardTitle>
          <CardDescription>Manage user accounts and roles</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Add, edit, or deactivate user accounts. Assign roles and permissions.</p>
          <Link href="#user-accounts">
            <Button>
              Manage Users
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Organizational Chart</CardTitle>
          <CardDescription>Visualize and manage hierarchy</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">View and update the organizational structure, including LOBs and team assignments.</p>
          <Link href="#org-chart">
            <Button>
              View Chart
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>Configure access levels</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Set and modify permissions for different roles within the organization.</p>
          <Link href="#permissions">
            <Button>
              Set Permissions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>LOB Management</CardTitle>
          <CardDescription>Manage Lines of Business</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Configure LOBs, assign TELUS Digital Team Leads, and manage team capacities.</p>
          <Link href="#lob-management">
            <Button>
              Manage LOBs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

