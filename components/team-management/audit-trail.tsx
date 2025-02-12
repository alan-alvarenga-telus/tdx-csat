"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface AuditEntry {
  id: string
  timestamp: string
  action: string
  memberId: string
  memberName: string
  fromTeam: string
  toTeam: string
  initiatedBy: string
}

export function AuditTrail() {
  const [auditEntries, setAuditEntries] = useState<AuditEntry[]>([])

  useEffect(() => {
    // TODO: Fetch audit trail from API
    const fetchAuditTrail = async () => {
      // Simulating API call
      const mockData: AuditEntry[] = [
        {
          id: "AE001",
          timestamp: "2023-05-15T10:30:00Z",
          action: "Member Claimed",
          memberId: "WD007",
          memberName: "Emma Thompson",
          fromTeam: "Unassigned",
          toTeam: "Frontend",
          initiatedBy: "John Doe",
        },
        {
          id: "AE002",
          timestamp: "2023-05-14T14:45:00Z",
          action: "Member Transferred",
          memberId: "WD008",
          memberName: "Michael Brown",
          fromTeam: "Backend",
          toTeam: "DevOps",
          initiatedBy: "Alice Johnson",
        },
      ]
      setAuditEntries(mockData)
    }

    fetchAuditTrail()
  }, [])

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Audit Trail</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Member ID</TableHead>
            <TableHead>Member Name</TableHead>
            <TableHead>From Team</TableHead>
            <TableHead>To Team</TableHead>
            <TableHead>Initiated By</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {auditEntries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{new Date(entry.timestamp).toLocaleString()}</TableCell>
              <TableCell>{entry.action}</TableCell>
              <TableCell>{entry.memberId}</TableCell>
              <TableCell>{entry.memberName}</TableCell>
              <TableCell>{entry.fromTeam}</TableCell>
              <TableCell>{entry.toTeam}</TableCell>
              <TableCell>{entry.initiatedBy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

