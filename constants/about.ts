import * as Yup from "yup";
import { requiredFile, requiredString, requiredUrl } from "./validationSchema";

export const MainSchemaValidation = Yup.object().shape({
  title: requiredString,
  description: requiredString,
  imageUrl: requiredFile,
  videoUrl: requiredFile,
});

export const OurTeamMemberSchemaValidation = Yup.object().shape({
  firstname: requiredString,
  lastname: requiredString,
  designation: requiredString,
  subDesignation: requiredString,
  linkedInUrl: requiredUrl,
  imageUrl: requiredFile,
});
export const OurProcessSchemaValidation = Yup.object().shape({
  title: requiredString,
  subtitle: requiredString,
  description: requiredString,
  imageUrl: requiredFile,
});
