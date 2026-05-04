import * as yup from "yup";

export const onboardingDemographicsSchema = yup.object({
  age: yup.string().optional(),
  identity: yup.string().optional(),
  gender: yup.string().optional(),
  orient: yup.string().optional(),
});

export const likertAssessmentSchema = yup.object({
  answer: yup.number().min(0).max(3).required(),
});
