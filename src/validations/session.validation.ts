import * as yup from "yup";

export const bookSessionSchema = yup.object({
  coachId: yup.number().required(),
  slot: yup.string().required("Select a time"),
});

export const sessionNoteSchema = yup.object({
  clientId: yup.string().required(),
  sessionType: yup.string().required(),
  notes: yup.string().min(1, "Add session notes").required(),
  nextGoal: yup.string().optional(),
});
