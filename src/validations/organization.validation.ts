import * as yup from "yup";

export const organizationSettingsSchema = yup.object({
  name: yup.string().required("Organization name is required"),
  type: yup.string().required(),
  contactEmail: yup.string().email().required(),
});
