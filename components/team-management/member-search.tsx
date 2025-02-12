"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"

interface SearchResult {
  id: string
  workdayId: string
  name: string
  email: string
  currentTeam: string
}

export function MemberSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual search logic
    // This is a mock implementation
    const mockResults: SearchResult[] = [
      {
        id: "3",
        workdayId: "WD003",
        name: "Eve Wilson",
        email: "eve.wilson@telus.com",
        currentTeam: "Unassigned",
      },
      {
        id: "4",
        workdayId: "WD004",
        name: "Charlie Brown",
        email: "charlie.brown@telus.com",
        currentTeam: "DevOps",
      },
    ]
    setSearchResults(mockResults)
  }

  const handleClaim = (memberId: string) => {
    // TODO: Implement claim logic
    toast({
      title: "Claim Request Initiated",
      description: `A claim request has been initiated for member with ID ${memberId}.`,
    })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Search Team Members</h2>
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="text"
          placeholder="Search by email or Workday ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit">Search</Button>
      </form>
      {searchResults.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Workday ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Current Team</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {searchResults.map((result) => (
              <TableRow key={result.id}>
                <TableCell>{result.workdayId}</TableCell>
                <TableCell>{result.name}</TableCell>
                <TableCell>{result.email}</TableCell>
                <TableCell>{result.currentTeam}</TableCell>
                <TableCell>
                  <Button onClick={() => handleClaim(result.id)}>Claim</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

