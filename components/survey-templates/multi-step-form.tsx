"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useForm, type SubmitHandler, Controller, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CheckCircle, PlusCircle, Trash2, ChevronLeft, ChevronRight } from "lucide-react"

const questionSchema = z.object({
  type: z.enum(["multiple_choice", "text", "rating"]),
  text: z.string().min(1, "Question text is required"),
  options: z.array(z.string()).optional(),
})

const formSchema = z.object({
  name: z.string().min(2, "Template name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  questions: z.array(questionSchema).min(1, "Please add at least one question"),
})

type FormData = z.infer<typeof formSchema>

const steps = [
  { title: "Basic Information", fields: ["name", "description", "category"] },
  { title: "Questions", fields: ["questions"] },
  { title: "Review", fields: [] },
]

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    trigger,
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      questions: [{ type: "multiple_choice", text: "", options: [""] }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true)
    // TODO: Implement API call to submit form data
    console.log(data)
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulating API call
    setIsSubmitting(false)
    // TODO: Handle success/error states
  }

  const nextStep = async () => {
    const fields = steps[currentStep].fields
    const isStepValid = await trigger(fields as any)
    if (isStepValid) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const addQuestion = () => {
    append({ type: "multiple_choice", text: "", options: [""] })
  }

  const addOption = (questionIndex: number) => {
    const questions = watch("questions")
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].options = [...(updatedQuestions[questionIndex].options || []), ""]
    setValue("questions", updatedQuestions)
  }

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const questions = watch("questions")
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].options = updatedQuestions[questionIndex].options?.filter(
      (_, index) => index !== optionIndex,
    )
    setValue("questions", updatedQuestions)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <nav className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
          {steps.map((step, index) => (
            <button
              key={step.title}
              className={`flex flex-col items-center ${
                index <= currentStep ? "text-accessible-green" : "text-gray-400"
              }`}
              onClick={() => index <= currentStep && setCurrentStep(index)}
              disabled={index > currentStep}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  index <= currentStep ? "bg-accessible-green text-white" : "bg-gray-300"
                }`}
              >
                {index < currentStep ? <CheckCircle className="w-5 h-5" /> : index + 1}
              </div>
              <span className="text-sm font-medium">{step.title}</span>
            </button>
          ))}
        </nav>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 0 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Template Name</Label>
                  <Input id="name" {...register("name")} placeholder="Enter template name" />
                  {errors.name && <p className="text-crimson text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" {...register("description")} placeholder="Enter template description" />
                  {errors.description && <p className="text-crimson text-sm mt-1">{errors.description.message}</p>}
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="customer_satisfaction">Customer Satisfaction</SelectItem>
                          <SelectItem value="employee_engagement">Employee Engagement</SelectItem>
                          <SelectItem value="product_feedback">Product Feedback</SelectItem>
                          <SelectItem value="market_research">Market Research</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.category && <p className="text-crimson text-sm mt-1">{errors.category.message}</p>}
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="border p-4 rounded-md space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor={`questions.${index}.text`}>Question {index + 1}</Label>
                      <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <Input
                      id={`questions.${index}.text`}
                      {...register(`questions.${index}.text`)}
                      placeholder="Enter question text"
                    />
                    {errors.questions?.[index]?.text && (
                      <p className="text-crimson text-sm mt-1">{errors.questions[index]?.text?.message}</p>
                    )}
                    <Controller
                      name={`questions.${index}.type`}
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select question type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                            <SelectItem value="text">Text</SelectItem>
                            <SelectItem value="rating">Rating</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {watch(`questions.${index}.type`) === "multiple_choice" && (
                      <div className="space-y-2">
                        {watch(`questions.${index}.options`)?.map((_, optionIndex) => (
                          <div key={optionIndex} className="flex items-center space-x-2">
                            <Input
                              {...register(`questions.${index}.options.${optionIndex}`)}
                              placeholder={`Option ${optionIndex + 1}`}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeOption(index, optionIndex)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addOption(index)}
                          className="mt-2"
                        >
                          <PlusCircle className="w-4 h-4 mr-2" />
                          Add Option
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addQuestion} className="w-full">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Question
                </Button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Review Your Survey Template</h3>
                <div>
                  <h4 className="font-medium">Template Name</h4>
                  <p>{watch("name")}</p>
                </div>
                <div>
                  <h4 className="font-medium">Description</h4>
                  <p>{watch("description")}</p>
                </div>
                <div>
                  <h4 className="font-medium">Category</h4>
                  <p>{watch("category")}</p>
                </div>
                <div>
                  <h4 className="font-medium">Questions</h4>
                  <ol className="list-decimal list-inside">
                    {watch("questions").map((question, index) => (
                      <li key={index} className="mt-2">
                        <span className="font-medium">{question.text}</span>
                        <p className="ml-4">Type: {question.type}</p>
                        {question.type === "multiple_choice" && (
                          <ul className="list-disc list-inside ml-8">
                            {question.options?.map((option, optionIndex) => (
                              <li key={optionIndex}>{option}</li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-8">
          {currentStep > 0 && (
            <Button type="button" onClick={prevStep} variant="outline" size="lg">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
          )}
          {currentStep < steps.length - 1 ? (
            <Button type="button" onClick={nextStep} size="lg" className="ml-auto">
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button type="submit" disabled={!isValid || isSubmitting} size="lg" className="ml-auto">
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}

