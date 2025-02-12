"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

export function TeamForm() {
  const [name, setName] = useState("")
  const [organization, setOrganization] = useState("")
  const [lob, setLOB] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement API call to create/update team
    toast({
      title: "Team created",
      description: `Team "${name}" has been created successfully under "${organization}" and "${lob}".`,
    })
    setName("")
    setOrganization("")
    setLOB("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="team-name">Team Name</Label>
        <Input id="team-name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="team-org">Organization</Label>
        <Select value={organization} onValueChange={setOrganization} required>
          <SelectTrigger id="team-org">
            <SelectValue placeholder="Select an organization" />
          </SelectTrigger>
          <SelectContent>
            {/* TODO: Fetch organizations from API */}
            <SelectItem value="org1">Organization 1</SelectItem>
            <SelectItem value="org2">Organization 2</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="team-lob">Line of Business</Label>
        <Select value={lob} onValueChange={setLOB} required>
          <SelectTrigger id="team-lob">
            <SelectValue placeholder="Select a Line of Business" />
          </SelectTrigger>
          <SelectContent>
            {/* TODO: Fetch LOBs from API based on selected organization */}
            <SelectItem value="lob1">LOB 1</SelectItem>
            <SelectItem value="lob2">LOB 2</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Create Team</Button>
    </form>
  )
}

