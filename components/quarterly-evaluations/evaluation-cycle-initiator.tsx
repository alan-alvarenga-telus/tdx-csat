"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function EvaluationCycleInitiator() {
  const [isInitiating, setIsInitiating] = useState(false)

  const handleInitiateCycle = async () => {
    setIsInitiating(true)
    try {
      // TODO: Implement API call to initiate evaluation cycle
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulating API call
      toast({
        title: "Evaluation Cycle Initiated",
        description: "The quarterly evaluation cycle has been successfully started.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initiate the evaluation cycle. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsInitiating(false)
    }
  }

  return (
    <Card className="border-mystic">
      <CardHeader className="bg-blue-lightest">
        <CardTitle>Initiate Quarterly Evaluation Cycle</CardTitle>
        <CardDescription>Start the evaluation process for all LOBs and team members.</CardDescription>
      </CardHeader>
      <CardContent className="bg-white">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button disabled={isInitiating} className="focus-visible-ring">
              {isInitiating ? "Initiating..." : "Start Quarterly Evaluations"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will initiate the quarterly evaluation cycle for all LOBs and team members. Evaluation links
                will be sent to all relevant Team Leaders and Customers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button variant="outline" size="lg">
                  Cancel
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button onClick={handleInitiateCycle} variant="secondary" size="lg" disabled={isInitiating}>
                  {isInitiating ? "Initiating..." : "Confirm"}
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}

