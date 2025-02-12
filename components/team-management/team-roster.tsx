"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { Search, CheckCircle, XCircle } from "lucide-react"

interface TeamMember {
  id: string
  workdayId: string
  name: string
  email: string
  teamAssignment: string
  evaluationStatus: string
  evaluator: string
}

export function TeamRoster() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredMembers, setFilteredMembers] = useState<TeamMember[]>([])

  useEffect(() => {
    // TODO: Fetch team members from API
    const fetchTeamMembers = async () => {
      // Simulating API call
      const mockData: TeamMember[] = [
        {
          id: "1",
          workdayId: "WD001",
          name: "John Doe",
          email: "john.doe@telus.com",
          teamAssignment: "Frontend",
          evaluationStatus: "Pending",
          evaluator: "Jane Smith",
        },
        {
          id: "2",
          workdayId: "WD002",
          name: "Alice Johnson",
          email: "alice.johnson@telus.com",
          teamAssignment: "Backend",
          evaluationStatus: "Completed",
          evaluator: "Bob Brown",
        },
      ]
      setTeamMembers(mockData)
      setFilteredMembers(mockData)
    }

    fetchTeamMembers()
  }, [])

  useEffect(() => {
    const filtered = teamMembers.filter((member) =>
      Object.values(member).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
    )
    setFilteredMembers(filtered)
  }, [searchTerm, teamMembers])

  const handleValidate = (memberId: string) => {
    // TODO: Implement validation logic
    toast({
      title: "Member Validated",
      description: `Team member with ID ${memberId} has been validated.`,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search team members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Search className="text-gray-400" />
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Workday ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Team Assignment</TableHead>
              <TableHead>Evaluation Status</TableHead>
              <TableHead>Evaluator</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {filteredMembers.map((member) => (
                <motion.tr
                  key={member.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <TableCell>{member.workdayId}</TableCell>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.teamAssignment}</TableCell>
                  <TableCell>
                    {member.evaluationStatus === "Completed" ? (
                      <span className="flex items-center text-accessible-green">
                        <CheckCircle className="mr-1" size={16} />
                        Completed
                      </span>
                    ) : (
                      <span className="flex items-center text-crimson">
                        <XCircle className="mr-1" size={16} />
                        Pending
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{member.evaluator}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleValidate(member.id)} size="sm">
                      Validate
                    </Button>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

