"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(phoneRegex, "Invalid phone number"),
  position: z.string().min(2, "Position must be at least 2 characters"),
  department: z.string().min(1, "Please select a department"),
  startDate: z.string().min(1, "Please select a start date"),
  manager: z.string().min(2, "Manager name must be at least 2 characters"),
  skills: z.array(z.string()).min(1, "Please select at least one skill"),
})

type FormData = z.infer<typeof formSchema>

const steps = [
  { title: "Personal Information", fields: ["firstName", "lastName", "email", "phone"] },
  { title: "Job Details", fields: ["position", "department", "startDate", "manager"] },
  { title: "Skills", fields: ["skills"] },
]

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
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
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" {...register("firstName")} placeholder="Enter first name" />
                  {errors.firstName && <p className="text-crimson text-sm mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" {...register("lastName")} placeholder="Enter last name" />
                  {errors.lastName && <p className="text-crimson text-sm mt-1">{errors.lastName.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register("email")} placeholder="Enter email address" />
                  {errors.email && <p className="text-crimson text-sm mt-1">{errors.email.message}</p>}
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
                  {errors.phone && <p className="text-crimson text-sm mt-1">{errors.phone.message}</p>}
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" {...register("position")} placeholder="Enter position" />
                  {errors.position && <p className="text-crimson text-sm mt-1">{errors.position.message}</p>}
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select onValueChange={(value) => setValue("department", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.department && <p className="text-crimson text-sm mt-1">{errors.department.message}</p>}
                </div>
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" {...register("startDate")} />
                  {errors.startDate && <p className="text-crimson text-sm mt-1">{errors.startDate.message}</p>}
                </div>
                <div>
                  <Label htmlFor="manager">Manager</Label>
                  <Input id="manager" {...register("manager")} placeholder="Enter manager's name" />
                  {errors.manager && <p className="text-crimson text-sm mt-1">{errors.manager.message}</p>}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="skills">Skills</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {["JavaScript", "React", "Node.js", "Python", "Java", "C#", "SQL", "DevOps"].map((skill) => (
                      <label key={skill} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          value={skill}
                          {...register("skills")}
                          className="form-checkbox h-5 w-5 text-accessible-green"
                        />
                        <span>{skill}</span>
                      </label>
                    ))}
                  </div>
                  {errors.skills && <p className="text-crimson text-sm mt-1">{errors.skills.message}</p>}
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

