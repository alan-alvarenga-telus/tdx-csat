"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { motion } from "framer-motion"

interface LOBStatus {
  id: string
  name: string
  totalEvaluations: number
  completedEvaluations: number
}

export function EvaluationStatus() {
  const [lobStatuses, setLobStatuses] = useState<LOBStatus[]>([])
  const [overallProgress, setOverallProgress] = useState(0)

  useEffect(() => {
    // TODO: Implement API call to fetch evaluation status
    const fetchEvaluationStatus = async () => {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const mockData: LOBStatus[] = [
        { id: "1", name: "Frontend Development", totalEvaluations: 20, completedEvaluations: 15 },
        { id: "2", name: "Backend Development", totalEvaluations: 15, completedEvaluations: 10 },
        { id: "3", name: "DevOps", totalEvaluations: 10, completedEvaluations: 5 },
        { id: "4", name: "UX Design", totalEvaluations: 8, completedEvaluations: 6 },
      ]
      setLobStatuses(mockData)

      const totalEvaluations = mockData.reduce((sum, lob) => sum + lob.totalEvaluations, 0)
      const completedEvaluations = mockData.reduce((sum, lob) => sum + lob.completedEvaluations, 0)
      setOverallProgress(Math.round((completedEvaluations / totalEvaluations) * 100))
    }

    fetchEvaluationStatus()
  }, [])

  return (
    <Card className="border-mystic">
      <CardHeader className="bg-cerise-light">
        <CardTitle>Evaluation Cycle Status</CardTitle>
        <CardDescription>Current progress of the quarterly evaluation cycle across all LOBs.</CardDescription>
      </CardHeader>
      <CardContent className="bg-white">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span>Overall Progress</span>
              <span>{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="bg-mystic h-2" indicatorClassName="bg-accessible-green" />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Line of Business</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Completed / Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lobStatuses.map((lob) => (
                <motion.tr
                  key={lob.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <TableCell>{lob.name}</TableCell>
                  <TableCell>
                    <Progress
                      value={(lob.completedEvaluations / lob.totalEvaluations) * 100}
                      className="bg-mystic h-2"
                      indicatorClassName="bg-blue-eastern"
                    />
                  </TableCell>
                  <TableCell>{`${lob.completedEvaluations} / ${lob.totalEvaluations}`}</TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

