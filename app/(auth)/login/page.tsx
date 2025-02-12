import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-telus-purple text-center">TELUS Login</h1>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="Enter your password" />
        </div>
      </div>
      <Button className="w-full bg-telus-green hover:bg-telus-green/90">Log In</Button>
    </div>
  )
}

