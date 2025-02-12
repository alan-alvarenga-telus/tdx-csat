"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, HelpCircle, Star } from "lucide-react";
import { cn } from "@/lib/utils";

// Define the structure for a survey question
interface SurveyQuestion {
  id: string;
  text: string;
  tooltip: string;
}

// Define the structure for a team member
interface TeamMember {
  id: string;
  name: string;
}

// Mock data for survey questions
const surveyQuestions: SurveyQuestion[] = [
  {
    id: "q1",
    text: "How well does the team member communicate with others?",
    tooltip: "Consider verbal and written communication skills",
  },
  {
    id: "q2",
    text: "How would you rate the team member's technical skills?",
    tooltip: "Evaluate proficiency in required technologies and tools",
  },
  {
    id: "q3",
    text: "How effectively does the team member manage their time and meet deadlines?",
    tooltip: "Assess time management and reliability",
  },
  {
    id: "q4",
    text: "How well does the team member collaborate with others on the team?",
    tooltip: "Consider teamwork and interpersonal skills",
  },
  {
    id: "q5",
    text: "How would you rate the overall quality of the team member's work?",
    tooltip: "Evaluate the overall impact and value of their contributions",
  },
];

// Mock data for team members
const teamMembers: TeamMember[] = [
  { id: "tm1", name: "John Doe" },
  { id: "tm2", name: "Jane Smith" },
  { id: "tm3", name: "Alice Johnson" },
];

// Create a dynamic schema based on the number of questions and team members
const createEvaluationSchema = (
  questions: SurveyQuestion[],
  members: TeamMember[],
) => {
  const schema: Record<string, any> = {};

  members.forEach((member) => {
    questions.forEach((question) => {
      schema[`${member.id}_${question.id}_rating`] = z
        .number()
        .min(1, "Rating must be at least 1")
        .max(5, "Rating must be at most 5")
        .multipleOf(0.1, "Rating must have at most one decimal place");
      schema[`${member.id}_${question.id}_feedback`] = z.string().optional();
    });
    schema[`${member.id}_overall_feedback`] = z.string().optional();
  });

  return z.object(schema);
};

const evaluationSchema = createEvaluationSchema(surveyQuestions, teamMembers);

type EvaluationFormData = z.infer<typeof evaluationSchema>;

interface TeamMemberEvaluationSurveyProps {
  evaluationId: string;
}

export function TeamMemberEvaluationSurvey({
  evaluationId,
}: TeamMemberEvaluationSurveyProps) {
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    setValue,
    getValues,
    watch,
  } = useForm<EvaluationFormData>({
    resolver: zodResolver(evaluationSchema),
    mode: "onChange",
  });

  const watchAllFields = watch();

  const autoSave = useCallback(() => {
    const formData = getValues();
    localStorage.setItem("evaluationFormData", JSON.stringify(formData));
    toast({
      title: "Progress Auto-saved",
      description: "Your evaluation progress has been automatically saved.",
    });
  }, [getValues]);

  const handleSessionTimeout = useCallback(() => {
    const formData = getValues();
    localStorage.setItem("evaluationFormData", JSON.stringify(formData));
    toast({
      title: "Session Timed Out",
      description:
        "Your session has timed out due to inactivity. Your progress has been saved.",
      variant: "destructive",
    });
  }, [getValues]);

  useEffect(() => {
    const fetchEvaluationDetails = async () => {
      console.log(`Fetching evaluation details for ID: ${evaluationId}`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    };

    if (evaluationId) {
      fetchEvaluationDetails();
    }
  }, [evaluationId]);

  useEffect(() => {
    const autoSaveInterval = setInterval(autoSave, 5 * 60 * 1000);
    let sessionTimeoutId: NodeJS.Timeout;

    const resetSessionTimeout = () => {
      clearTimeout(sessionTimeoutId);
      sessionTimeoutId = setTimeout(handleSessionTimeout, 30 * 60 * 1000);
    };

    resetSessionTimeout();
    window.addEventListener("mousemove", resetSessionTimeout);
    window.addEventListener("keypress", resetSessionTimeout);

    return () => {
      clearInterval(autoSaveInterval);
      clearTimeout(sessionTimeoutId);
      window.removeEventListener("mousemove", resetSessionTimeout);
      window.removeEventListener("keypress", resetSessionTimeout);
    };
  }, [autoSave, handleSessionTimeout]);

  const onSubmit = async (data: EvaluationFormData) => {
    setIsSubmitting(true);
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    toast({
      title: "Evaluation Submitted",
      description: "Your evaluation has been successfully submitted.",
    });
    localStorage.removeItem("evaluationFormData");
  };

  const nextMember = async () => {
    const currentMember = teamMembers[currentMemberIndex];
    const isCurrentMemberValid = await trigger(
      surveyQuestions.map((q) => `${currentMember.id}_${q.id}_rating`),
    );
    if (isCurrentMemberValid) {
      setCurrentMemberIndex((prev) => prev + 1);
    }
  };

  const prevMember = () => {
    setCurrentMemberIndex((prev) => prev - 1);
  };

  const calculateProgress = () => {
    const totalQuestions = teamMembers.length * surveyQuestions.length;
    const answeredQuestions = Object.values(watchAllFields).filter(
      (value) => value !== undefined && value !== "",
    ).length;
    return (answeredQuestions / totalQuestions) * 100;
  };

  const StarRating = ({
    value,
    onChange,
  }: {
    value: number;
    onChange: (value: number) => void;
  }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "w-6 h-6 cursor-pointer transition-colors",
              star <= value
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300",
            )}
            onClick={() => onChange(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Team Member Evaluation Survey</CardTitle>
        <CardDescription>
          Please provide ratings and feedback for each team member
        </CardDescription>
        <Progress value={calculateProgress()} className="mt-2" />
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="mb-6">
            <div className="flex justify-between items-center">
              {teamMembers.map((member, index) => (
                <div key={member.id} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index <= currentMemberIndex
                        ? "bg-telus-purple text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-sm mt-1">{member.name}</span>
                </div>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentMemberIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-4">
                {teamMembers[currentMemberIndex].name}
              </h3>
              {surveyQuestions.map((question) => (
                <div
                  key={question.id}
                  className="mb-8 p-4 bg-gray-50 rounded-lg"
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label
                          htmlFor={`${teamMembers[currentMemberIndex].id}_${question.id}_rating`}
                          className="flex items-center text-lg font-medium mb-2"
                        >
                          {question.text}
                          <HelpCircle className="ml-2 h-4 w-4 text-gray-400" />
                        </Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{question.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <div className="space-y-4">
                    <Controller
                      name={
                        `${teamMembers[currentMemberIndex].id}_${question.id}_rating` as any
                      }
                      control={control}
                      render={({ field }) => (
                        <StarRating
                          value={field.value || 0}
                          onChange={(value) => field.onChange(value)}
                        />
                      )}
                    />
                    {errors[
                      `${teamMembers[currentMemberIndex].id}_${question.id}_rating` as keyof EvaluationFormData
                    ] && (
                      <p className="text-sm text-crimson mt-1">
                        {
                          errors[
                            `${teamMembers[currentMemberIndex].id}_${question.id}_rating` as keyof EvaluationFormData
                          ]?.message
                        }
                      </p>
                    )}
                    <Controller
                      name={
                        `${teamMembers[currentMemberIndex].id}_${question.id}_feedback` as any
                      }
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          placeholder="Provide feedback for this question (optional)"
                          className="w-full h-24 resize-y"
                        />
                      )}
                    />
                  </div>
                </div>
              ))}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <Label
                  htmlFor={`${teamMembers[currentMemberIndex].id}_overall_feedback`}
                  className="text-lg font-medium mb-2"
                >
                  Overall Feedback
                </Label>
                <Controller
                  name={
                    `${teamMembers[currentMemberIndex].id}_overall_feedback` as any
                  }
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      placeholder="Provide overall feedback for this team member"
                      className="w-full h-32 resize-y"
                    />
                  )}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between mt-8">
        {currentMemberIndex > 0 && (
          <Button type="button" onClick={prevMember} variant="outline">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous Member
          </Button>
        )}
        {currentMemberIndex < teamMembers.length - 1 ? (
          <Button type="button" onClick={nextMember} className="ml-auto">
            Next Member
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid || isSubmitting}
            className="ml-auto"
          >
            {isSubmitting ? "Submitting..." : "Submit Evaluation"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
