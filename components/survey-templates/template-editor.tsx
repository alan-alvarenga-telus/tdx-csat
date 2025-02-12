"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

interface Question {
  id: string
  text: string
  type: "multiple_choice" | "text" | "rating"
  options?: string[]
}

interface SurveyTemplate {
  id: string
  name: string
  description: string
  questions: Question[]
}

export function TemplateEditor() {
  const router = useRouter()
  const [template, setTemplate] = useState<SurveyTemplate>({
    id: "",
    name: "",
    description: "",
    questions: [],
  })
  const [newQuestion, setNewQuestion] = useState<Question>({
    id: "",
    text: "",
    type: "multiple_choice",
    options: [""],
  })

  useEffect(() => {
    // TODO: Fetch template data if editing an existing template
    // For now, we'll just use an empty template
  }, [])

  const handleSave = async () => {
    // TODO: Implement save logic
    toast({
      title: "Template Saved",
      description: "The survey template has been saved successfully.",
    })
    router.push("/survey-templates")
  }

  const handleAddQuestion = () => {
    setTemplate({
      ...template,
      questions: [...template.questions, { ...newQuestion, id: Date.now().toString() }],
    })
    setNewQuestion({
      id: "",
      text: "",
      type: "multiple_choice",
      options: [""],
    })
  }

  const handleRemoveQuestion = (questionId: string) => {
    setTemplate({
      ...template,
      questions: template.questions.filter((q) => q.id !== questionId),
    })
  }

  const handleQuestionChange = (questionId: string, field: keyof Question, value: string) => {
    setTemplate({
      ...template,
      questions: template.questions.map((q) => (q.id === questionId ? { ...q, [field]: value } : q)),
    })
  }

  const handleOptionChange = (questionId: string, index: number, value: string) => {
    setTemplate({
      ...template,
      questions: template.questions.map((q) =>
        q.id === questionId ? { ...q, options: q.options?.map((opt, i) => (i === index ? value : opt)) } : q,
      ),
    })
  }

  const handleAddOption = (questionId: string) => {
    setTemplate({
      ...template,
      questions: template.questions.map((q) =>
        q.id === questionId ? { ...q, options: [...(q.options || []), ""] } : q,
      ),
    })
  }

  const handleRemoveOption = (questionId: string, index: number) => {
    setTemplate({
      ...template,
      questions: template.questions.map((q) =>
        q.id === questionId ? { ...q, options: q.options?.filter((_, i) => i !== index) } : q,
      ),
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="template-name">Template Name</Label>
        <Input
          id="template-name"
          value={template.name}
          onChange={(e) => setTemplate({ ...template, name: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="template-description">Description</Label>
        <Textarea
          id="template-description"
          value={template.description}
          onChange={(e) => setTemplate({ ...template, description: e.target.value })}
        />
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Questions</h3>
        {template.questions.map((question) => (
          <div key={question.id} className="border p-4 rounded-md space-y-2">
            <Input
              value={question.text}
              onChange={(e) => handleQuestionChange(question.id, "text", e.target.value)}
              placeholder="Question text"
            />
            <Select value={question.type} onValueChange={(value) => handleQuestionChange(question.id, "type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Question type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
            {question.type === "multiple_choice" && (
              <div className="space-y-2">
                {question.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={option}
                      onChange={(e) => handleOptionChange(question.id, index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                    />
                    <Button variant="outline" size="sm" onClick={() => handleRemoveOption(question.id, index)}>
                      Remove
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => handleAddOption(question.id)}>
                  Add Option
                </Button>
              </div>
            )}
            <Button variant="destructive" onClick={() => handleRemoveQuestion(question.id)}>
              Remove Question
            </Button>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Add New Question</h3>
        <Input
          value={newQuestion.text}
          onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
          placeholder="New question text"
        />
        <Select
          value={newQuestion.type}
          onValueChange={(value) => setNewQuestion({ ...newQuestion, type: value as Question["type"] })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Question type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleAddQuestion}>Add Question</Button>
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Save Template</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to save this template?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will save the current template and make it available for use in surveys.
              {template.id && "Changes to an existing template may affect ongoing surveys."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSave}>Save</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

