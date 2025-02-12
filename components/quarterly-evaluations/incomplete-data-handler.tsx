"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface IncompleteData {
  id: string
  lobName: string
  missingInfo: string
  assignedTo: string
}

export function IncompleteDataHandler() {
  const [incompleteData, setIncompleteData] = useState<IncompleteData[]>([])

  useEffect(() => {
    // TODO: Implement API call to fetch incomplete data
    const fetchIncompleteData = async () => {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const mockData: IncompleteData[] = [
        {
          id: "1",
          lobName: "Frontend Development",
          missingInfo: "Team Lead not assigned",
          assignedTo: "System Administrator",
        },
        { id: "2", lobName: "Backend Development", missingInfo: "Customer contact missing", assignedTo: "Team Lead" },
      ]
      setIncompleteData(mockData)
    }

    fetchIncompleteData()
  }, [])

  const handleNotify = async (id: string) => {
    // TODO: Implement API call to send notification
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulating API call
      toast({
        title: "Notification Sent",
        description: "The assigned person has been notified about the incomplete data.",
      })
      setIncompleteData(incompleteData.filter((item) => item.id !== id))
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send notification. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (incompleteData.length === 0) {
    return null
  }

  return (
    <Card className="border-mystic">
      <CardHeader className="bg-raja-lightest">
        <CardTitle>Incomplete User/Role Data</CardTitle>
        <CardDescription>
          The following LOBs have incomplete data that needs to be addressed before initiating the evaluation cycle.
        </CardDescription>
      </CardHeader>
      <CardContent className="bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Line of Business</TableHead>
              <TableHead>Missing Information</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {incompleteData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.lobName}</TableCell>
                <TableCell>{item.missingInfo}</TableCell>
                <TableCell>{item.assignedTo}</TableCell>
                <TableCell>
                  <Button onClick={() => handleNotify(item.id)} variant="secondary" className="focus-visible-ring">
                    Notify
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

