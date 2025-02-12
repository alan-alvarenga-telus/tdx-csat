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
import { CheckCircle } from "lucide-react"

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)

const formSchema = z.object({
  organizationName: z.string().min(2, "Organization name must be at least 2 characters"),
  organizationType: z.string().min(1, "Please select an organization type"),
  contactName: z.string().min(2, "Contact name must be at least 2 characters"),
  contactEmail: z.string().email("Invalid email address"),
  contactPhone: z.string().regex(phoneRegex, "Invalid phone number"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  postalCode: z.string().min(5, "Postal code must be at least 5 characters"),
})

type FormData = z.infer<typeof formSchema>

const steps = [
  { title: "Organization Details", fields: ["organizationName", "organizationType"] },
  { title: "Contact Information", fields: ["contactName", "contactEmail", "contactPhone"] },
  { title: "Address", fields: ["address", "city", "country", "postalCode"] },
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
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div key={step.title} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStep ? "bg-accessible-green text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {index < currentStep ? <CheckCircle className="w-5 h-5" /> : index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className={`h-1 w-full ${index < currentStep ? "bg-accessible-green" : "bg-gray-200"}`} />
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
                  <Label htmlFor="organizationName">Organization Name</Label>
                  <Input
                    id="organizationName"
                    {...register("organizationName")}
                    placeholder="Enter organization name"
                  />
                  {errors.organizationName && (
                    <p className="text-crimson text-sm mt-1">{errors.organizationName.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="organizationType">Organization Type</Label>
                  <Select onValueChange={(value) => register("organizationType").onChange({ target: { value } })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select organization type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="corporation">Corporation</SelectItem>
                      <SelectItem value="non-profit">Non-Profit</SelectItem>
                      <SelectItem value="government">Government</SelectItem>
                      <SelectItem value="educational">Educational</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.organizationType && (
                    <p className="text-crimson text-sm mt-1">{errors.organizationType.message}</p>
                  )}
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="contactName">Contact Name</Label>
                  <Input id="contactName" {...register("contactName")} placeholder="Enter contact name" />
                  {errors.contactName && <p className="text-crimson text-sm mt-1">{errors.contactName.message}</p>}
                </div>
                <div>
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    {...register("contactEmail")}
                    placeholder="Enter contact email"
                  />
                  {errors.contactEmail && <p className="text-crimson text-sm mt-1">{errors.contactEmail.message}</p>}
                </div>
                <div>
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    {...register("contactPhone")}
                    placeholder="(123) 456-7890"
                    onChange={(e) => {
                      e.target.value = formatPhoneNumber(e.target.value)
                    }}
                  />
                  {errors.contactPhone && <p className="text-crimson text-sm mt-1">{errors.contactPhone.message}</p>}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" {...register("address")} placeholder="Enter address" />
                  {errors.address && <p className="text-crimson text-sm mt-1">{errors.address.message}</p>}
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" {...register("city")} placeholder="Enter city" />
                  {errors.city && <p className="text-crimson text-sm mt-1">{errors.city.message}</p>}
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" {...register("country")} placeholder="Enter country" />
                  {errors.country && <p className="text-crimson text-sm mt-1">{errors.country.message}</p>}
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input id="postalCode" {...register("postalCode")} placeholder="Enter postal code" />
                  {errors.postalCode && <p className="text-crimson text-sm mt-1">{errors.postalCode.message}</p>}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-8">
          {currentStep > 0 && (
            <Button type="button" onClick={prevStep} variant="outline">
              Previous
            </Button>
          )}
          {currentStep < steps.length - 1 ? (
            <Button type="button" onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}

