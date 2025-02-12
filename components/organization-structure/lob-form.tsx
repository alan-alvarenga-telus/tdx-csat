"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

export function LOBForm() {
  const [name, setName] = useState("")
  const [organization, setOrganization] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement API call to create/update LOB
    toast({
      title: "Line of Business created",
      description: `LOB "${name}" has been created successfully under "${organization}".`,
    })
    setName("")
    setOrganization("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="lob-name">Line of Business Name</Label>
        <Input id="lob-name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lob-org">Organization</Label>
        <Select value={organization} onValueChange={setOrganization} required>
          <SelectTrigger id="lob-org">
            <SelectValue placeholder="Select an organization" />
          </SelectTrigger>
          <SelectContent>
            {/* TODO: Fetch organizations from API */}
            <SelectItem value="org1">Organization 1</SelectItem>
            <SelectItem value="org2">Organization 2</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Create Line of Business</Button>
    </form>
  )
}

