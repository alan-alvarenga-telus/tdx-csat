import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HelpPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-telus-purple">Help & Support</h1>
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <p>FAQs and support resources will be listed here.</p>
        </CardContent>
      </Card>
    </div>
  )
}

