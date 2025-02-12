"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, HelpCircle } from "lucide-react"

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)

const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(phoneRegex, "Invalid phone number"),
  role: z.enum(["Director of IT", "AGM", "OM", "TDTL", "Team Leader", "Team Member"]),
  lob: z.string().min(1, "Please select a Line of Business"),
  startDate: z.string().min(1, "Please select a start date"),
})

type UserFormData = z.infer<typeof userSchema>

const steps = [
  { title: "Personal Info", fields: ["name", "email", "phone"] },
  { title: "Role & LOB", fields: ["role", "lob"] },
  { title: "Additional Info", fields: ["startDate"] },
]

export function UserAccountForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    trigger,
    watch,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    mode: "onChange",
  })

  const onSubmit = async (data: UserFormData) => {
    setIsSubmitting(true)
    // TODO: Implement API call to create/update user account
    console.log(data)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulating API call
    setIsSubmitting(false)
    toast({
      title: "User Account Updated",
      description: `${data.name}'s account has been successfully updated.`,
    })
    setCurrentStep(0)
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

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/[^\d]/g, "")
    const phoneNumberLength = phoneNumber.length
    if (phoneNumberLength < 4) return phoneNumber
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>User Account Management</CardTitle>
        <CardDescription>Add or edit user accounts and assign roles</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={step.title} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index <= currentStep ? "bg-telus-purple text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 w-full ${index < currentStep ? "bg-telus-purple" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {steps.map((step, index) => (
              <span key={step.title} className="text-sm font-medium">
                {step.title}
              </span>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" {...register("name")} placeholder="Enter full name" />
                    {errors.name && <p className="text-sm text-crimson mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" {...register("email")} placeholder="Enter email address" />
                    {errors.email && <p className="text-sm text-crimson mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      {...register("phone")}
                      placeholder="(123) 456-7890"
                      onChange={(e) => {
                        e.target.value = formatPhoneNumber(e.target.value)
                      }}
                    />
                    {errors.phone && <p className="text-sm text-crimson mt-1">{errors.phone.message}</p>}
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Controller
                      name="role"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Director of IT">Director of IT</SelectItem>
                            <SelectItem value="AGM">AGM</SelectItem>
                            <SelectItem value="OM">OM</SelectItem>
                            <SelectItem value="TDTL">TELUS Digital Team Lead</SelectItem>
                            <SelectItem value="Team Leader">Team Leader</SelectItem>
                            <SelectItem value="Team Member">Team Member</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.role && <p className="text-sm text-crimson mt-1">{errors.role.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="lob">Line of Business</Label>
                    <Controller
                      name="lob"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Line of Business" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="lob1">Frontend Development</SelectItem>
                            <SelectItem value="lob2">Backend Development</SelectItem>
                            <SelectItem value="lob3">DevOps</SelectItem>
                            <SelectItem value="lob4">UX Design</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.lob && <p className="text-sm text-crimson mt-1">{errors.lob.message}</p>}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="relative">
                            <Input id="startDate" type="date" {...register("startDate")} />
                            <HelpCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Select the user's start date in the organization</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    {errors.startDate && <p className="text-sm text-crimson mt-1">{errors.startDate.message}</p>}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            {currentStep > 0 && (
              <Button type="button" onClick={prevStep} variant="outline">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
            )}
            {currentStep < steps.length - 1 ? (
              <Button type="button" onClick={nextStep} className="ml-auto">
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button type="submit" disabled={!isValid || isSubmitting} className="ml-auto">
                {isSubmitting ? "Saving..." : "Save User Account"}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

