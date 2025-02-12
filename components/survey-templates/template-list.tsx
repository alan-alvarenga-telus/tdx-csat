"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Edit, Copy, Trash2 } from "lucide-react"
import Link from "next/link"

interface SurveyTemplate {
  id: string
  name: string
  category: string
  lastModified: string
  questions: number
}

export function TemplateList() {
  const [templates, setTemplates] = useState<SurveyTemplate[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // TODO: Fetch templates from API
    const fetchTemplates = async () => {
      // Simulating API call
      const mockData: SurveyTemplate[] = [
        {
          id: "1",
          name: "Customer Satisfaction Survey",
          category: "Customer Satisfaction",
          lastModified: "2023-05-15",
          questions: 10,
        },
        {
          id: "2",
          name: "Employee Engagement Survey",
          category: "Employee Engagement",
          lastModified: "2023-05-10",
          questions: 15,
        },
        {
          id: "3",
          name: "Product Feedback Survey",
          category: "Product Feedback",
          lastModified: "2023-05-05",
          questions: 12,
        },
      ]
      setTemplates(mockData)
    }

    fetchTemplates()
  }, [])

  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleClone = (templateId: string) => {
    // TODO: Implement clone logic
    toast({
      title: "Template Cloned",
      description: `Template with ID ${templateId} has been cloned.`,
    })
  }

  const handleDelete = (templateId: string) => {
    // TODO: Implement delete logic
    toast({
      title: "Template Deleted",
      description: `Template with ID ${templateId} has been deleted.`,
    })
    setTemplates(templates.filter((template) => template.id !== templateId))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search templates..."
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
              <TableHead>Template Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Last Modified</TableHead>
              <TableHead>Questions</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {filteredTemplates.map((template) => (
                <motion.tr
                  key={template.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <TableCell>{template.name}</TableCell>
                  <TableCell>{template.category}</TableCell>
                  <TableCell>{template.lastModified}</TableCell>
                  <TableCell>{template.questions}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Link href={`/survey-templates/edit/${template.id}`}>
                        <Button variant="outline" size="sm" className="min-w-[80px]">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleClone(template.id)}
                        className="min-w-[80px]"
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Clone
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(template.id)}
                        className="min-w-[80px]"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
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

