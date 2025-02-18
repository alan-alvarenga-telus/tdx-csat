"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChevronLeft, ChevronRight } from "lucide-react";

const formSchema = z.object({
  teamLeader: z.string().min(1, "Please select a Team Leader"),
  teamMembers: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        confirmed: z.boolean(),
      }),
    )
    .min(1, "At least one team member must be selected"),
  surveyTemplate: z.string().min(1, "Please select a survey template"),
});

type FormData = z.infer<typeof formSchema>;

const steps = [
  { title: "Select Team Leader", fields: ["teamLeader"] },
  { title: "Confirm Team Members", fields: ["teamMembers"] },
  { title: "Choose Survey", fields: ["surveyTemplate"] },
  { title: "Review and Submit", fields: [] },
];

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      teamMembers: [],
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    // TODO: Implement API call to submit evaluation data
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating API call
    setIsSubmitting(false);
    // TODO: Handle success/error states
  };

  const nextStep = async () => {
    const fields = steps[currentStep].fields;
    const isStepValid = await trigger(fields as any);
    if (isStepValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const fetchTeamMembers = async (teamLeaderId: string) => {
    // TODO: Implement API call to fetch team members
    // This is a mock implementation
    const mockTeamMembers = [
      { id: "1", name: "John Doe", confirmed: false },
      { id: "2", name: "Jane Smith", confirmed: false },
      { id: "3", name: "Alice Johnson", confirmed: false },
    ];
    setValue("teamMembers", mockTeamMembers);
  };

  return (
    <div className="max-w-2xl mx-auto">
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
                  <Label htmlFor="teamLeader">TELUS Digital Team Leader</Label>
                  <Controller
                    name="teamLeader"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          fetchTeamMembers(value);
                        }}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Team Leader" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="TL1">Sarah Johnson</SelectItem>
                          <SelectItem value="TL2">Michael Chen</SelectItem>
                          <SelectItem value="TL3">Emily Rodriguez</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.teamLeader && (
                    <p className="text-crimson text-sm mt-1">
                      {errors.teamLeader.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Confirm Team Members</h3>
                {watch("teamMembers").map((member, index) => (
                  <div key={member.id} className="flex items-center space-x-2">
                    <Controller
                      name={`teamMembers.${index}.confirmed`}
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id={`member-${member.id}`}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <Label htmlFor={`member-${member.id}`}>{member.name}</Label>
                  </div>
                ))}
                {errors.teamMembers && (
                  <p className="text-crimson text-sm mt-1">
                    {errors.teamMembers.message}
                  </p>
                )}
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="surveyTemplate">Survey Template</Label>
                  <Controller
                    name="surveyTemplate"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Survey Template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ST1">
                            Quarterly Performance Review
                          </SelectItem>
                          <SelectItem value="ST2">
                            Project Feedback Survey
                          </SelectItem>
                          <SelectItem value="ST3">
                            Team Collaboration Assessment
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.surveyTemplate && (
                    <p className="text-crimson text-sm mt-1">
                      {errors.surveyTemplate.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Review Evaluation Details
                </h3>
                <div>
                  <p>
                    <strong>Team Leader:</strong> {watch("teamLeader")}
                  </p>
                  <p>
                    <strong>Confirmed Team Members:</strong>
                  </p>
                  <ul className="list-disc list-inside">
                    {watch("teamMembers")
                      .filter((member) => member.confirmed)
                      .map((member) => (
                        <li key={member.id}>{member.name}</li>
                      ))}
                  </ul>
                  <p>
                    <strong>Selected Survey:</strong> {watch("surveyTemplate")}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-8">
          {currentStep > 0 && (
            <Button
              type="button"
              onClick={prevStep}
              variant="outline"
              size="lg"
              className="min-w-[120px]"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
          )}
          {currentStep < steps.length - 1 ? (
            <Button
              type="button"
              onClick={nextStep}
              size="lg"
              className={`min-w-[120px] ${currentStep === 0 ? "w-full" : "ml-auto"}`}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              size="lg"
              variant="secondary"
              className="min-w-[160px] ml-auto"
            >
              {isSubmitting ? "Submitting..." : "Submit Evaluation"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
