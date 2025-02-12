"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface ClaimRequest {
  id: string
  memberId: string
  memberName: string
  currentTeam: string
  requestingTeam: string
  status: "Pending" | "Approved" | "Rejected"
}

export function ClaimRequests() {
  const [claimRequests, setClaimRequests] = useState<ClaimRequest[]>([])

  useEffect(() => {
    // TODO: Fetch claim requests from API
    const fetchClaimRequests = async () => {
      // Simulating API call
      const mockData: ClaimRequest[] = [
        {
          id: "CR001",
          memberId: "WD005",
          memberName: "David Lee",
          currentTeam: "Frontend",
          requestingTeam: "Backend",
          status: "Pending",
        },
        {
          id: "CR002",
          memberId: "WD006",
          memberName: "Sarah Johnson",
          currentTeam: "DevOps",
          requestingTeam: "Frontend",
          status: "Pending",
        },
      ]
      setClaimRequests(mockData)
    }

    fetchClaimRequests()
  }, [])

  const handleApprove = (requestId: string) => {
    // TODO: Implement approval logic
    toast({
      title: "Claim Request Approved",
      description: `Claim request ${requestId} has been approved.`,
    })
    // Update the status in the local state
    setClaimRequests((prevRequests) =>
      prevRequests.map((request) => (request.id === requestId ? { ...request, status: "Approved" } : request)),
    )
  }

  const handleReject = (requestId: string) => {
    // TODO: Implement rejection logic
    toast({
      title: "Claim Request Rejected",
      description: `Claim request ${requestId} has been rejected.`,
    })
    // Update the status in the local state
    setClaimRequests((prevRequests) =>
      prevRequests.map((request) => (request.id === requestId ? { ...request, status: "Rejected" } : request)),
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Claim Requests</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member ID</TableHead>
            <TableHead>Member Name</TableHead>
            <TableHead>Current Team</TableHead>
            <TableHead>Requesting Team</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {claimRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.memberId}</TableCell>
              <TableCell>{request.memberName}</TableCell>
              <TableCell>{request.currentTeam}</TableCell>
              <TableCell>{request.requestingTeam}</TableCell>
              <TableCell>{request.status}</TableCell>
              <TableCell>
                {request.status === "Pending" && (
                  <div className="space-x-2">
                    <Button onClick={() => handleApprove(request.id)}>Approve</Button>
                    <Button variant="destructive" onClick={() => handleReject(request.id)}>
                      Reject
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

