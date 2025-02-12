"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { motion } from "framer-motion"
import { Upload, CheckCircle } from "lucide-react"
import type React from "react" // Added import for React

export function CSVUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadComplete, setUploadComplete] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
      setError(null)
      setUploadComplete(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setUploading(true)
    setError(null)

    // TODO: Implement actual file upload and processing
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulating upload delay

    // Simulating successful upload
    toast({
      title: "CSV Uploaded Successfully",
      description: "The team member data has been processed and added to the system.",
    })

    setUploading(false)
    setFile(null)
    setUploadComplete(true)

    // Simulating error (uncomment to test error handling)
    // setError("Invalid CSV format. Please check your file and try again.")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div className="space-y-2">
        <Label htmlFor="csv-file">Upload Team Member CSV</Label>
        <div className="flex items-center space-x-2">
          <Input
            id="csv-file"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-telus-purple file:text-white hover:file:bg-telus-purple-light"
            required
          />
          <Button type="submit" disabled={!file || uploading} variant="secondary" size="lg">
            {uploading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Upload className="h-5 w-5" />
              </motion.div>
            ) : uploadComplete ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <Upload className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {file && !uploading && !uploadComplete && <p className="text-sm text-shuttle">Selected file: {file.name}</p>}
      {uploadComplete && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Upload Complete</AlertTitle>
          <AlertDescription>Your CSV file has been successfully uploaded and processed.</AlertDescription>
        </Alert>
      )}
    </form>
  )
}

