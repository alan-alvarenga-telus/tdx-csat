import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-telus-purple">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Overall Satisfaction Score</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">4.2 / 5</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Surveys</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">7</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Responses This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">1,234</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

