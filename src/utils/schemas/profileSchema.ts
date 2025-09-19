import * as yup from "yup";
import { InferType } from "yup";

const urlRegex =
  /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;

const sectionTypes = [
  "Skills",
  "PersonalDetails",
  "RoleDetails",
  "EducationDetails",
  "WorkExperience",
  "CustomSection",
] as const;

type SectionType = (typeof sectionTypes)[number];

// Helper for date fields to allow ""
const dateField = (isRequired = false) =>
  yup
    .date()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .typeError("Invalid date")
    [isRequired ? "required" : "notRequired"](
      isRequired ? "Start date is required" : undefined
    )
    .nullable();

export const ProfileSchema = yup.object({
  personalDetails: yup.object({
    fullName: yup.string().required("Full name is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    country: yup.string(),
    contactNumber: yup.string(),
    city: yup.string(),
  }),

  roleDetails: yup.object({
    summary: yup.string(),
    linkedInURL: yup
      .string()
      .url("LinkedIn URL must be a valid URL")
      .nullable()
      .notRequired(),
    additionalLinks: yup
      .array()
      .of(
        yup.object({
          label: yup.string(),
          url: yup
            .string()
            .trim()
            .matches(urlRegex, "Must be a valid URL")
            .notRequired(),
        })
      )
      .notRequired(),
  }),

  education: yup.object({
    fieldName: yup.string().required("Education field name is required"),
    lineItem: yup
      .array()
      .of(
        yup.object({
          institute: yup.string().required("Institute name is required"),
          degree: yup.string().required("Degree is required"),
          location: yup.string().required("Location is required"),
          startDate: dateField(true),
          endDate: dateField(false).min(
            yup.ref("startDate"),
            "End date must be after start date"
          ),
          description: yup.string(),
        })
      )
      .min(1, "At least one education item is required"),
  }),

  workExperience: yup
    .object({
      fieldName: yup.string(),
      lineItem: yup.array().of(
        yup.object({
          company: yup.string().required("Company name is required"),
          role: yup.string().required("Role is required"),
          location: yup.string().required("Location is required"),
          startDate: dateField(true),
          endDate: dateField(false).min(
            yup.ref("startDate"),
            "End date must be after start date"
          ),
          description: yup.string(),
        })
      ),
    })
    .notRequired(),

  skills: yup.object({
    fieldName: yup.string().default("Skills"),
    data: yup.string(),
  }),

  customSections: yup
    .array()
    .of(
      yup.object({
        sectionID: yup.string().required(),
        sectionName: yup.string().required("Section name is required"),
        lineItems: yup.array().of(
          yup.object({
            header: yup.string().required("Header is required"),
            subHeader: yup.string(),
            description: yup.string(),
          })
        ),
      })
    )
    .test(
      "unique-section-names",
      "Section names must be unique",
      (sections) => {
        if (!sections) return true;
        const names = sections.map((s) => s.sectionName);
        const uniqueNames = new Set(names);
        return names.length === uniqueNames.size;
      }
    )
    .notRequired(),

  template: yup
    .string()
    .oneOf(["Classic", "Modern"])
    .required("Template is Required"),

  sectionOrder: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().required("Section id is required"),
        type: yup
          .mixed<SectionType>()
          .oneOf([...sectionTypes])
          .required("Section type is required"),
        value: yup.string().required(),
      })
    )
    .required("Section Order is Required"),
});

export type ProfileType = InferType<typeof ProfileSchema>;
