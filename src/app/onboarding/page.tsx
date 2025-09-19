"use client";
import React, {
  useState,
} from "react";
import axios from "axios";
import { nanoid } from "nanoid";

import { Progress } from "../../components/ui/progress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBriefcase,
  faGraduationCap,
  faBuilding,
  faCode,
  faPlus,
  faArrowLeft,
  faArrowRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  useForm,
  FormProvider,
  useFieldArray,
} from "react-hook-form";
import PersonalDetails from "../../components/resumeFormComponents/personalDetails";
import Skills from "../../components/resumeFormComponents/skills";
import WorkExperienceDetails from "../../components/resumeFormComponents/workExperienceDetails";
import EducationDetails from "../../components/resumeFormComponents/educationDetails";
import RoleDetails from "../../components/resumeFormComponents/roleDetails";
import CustomSection from "../../components/resumeFormComponents/customSection";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ProfileSchema,
  ProfileType,
} from "@/utils/schemas/profileSchema";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DragReorderHandler } from "../../components/dragToReorder";
import DraggableItem from "../../components/resumeFormComponents/draggableItem";
import Loading from "../../components/ui/loading";
import {
  toast,
} from "sonner";
import { useRouter } from "next/navigation";

const Onboarding = () => {
    const [
        currentStep,
        setCurrentStep,
      ] = useState<
        number
      >(
        1
      );
      const [
        submitting,
        setSubmitting,
      ] = useState<
        boolean
      >(
        false
      );
      const methods = useForm(
        {
          mode:
            "all",
          resolver: yupResolver(
            ProfileSchema
          ),
          defaultValues: {
            education: {
              fieldName:
                "Education Details",
              lineItem: [
                {
                  institute:
                    "",
                  degree:
                    "",
                  startDate: undefined,
                  endDate: null,
                  location:
                    "",
                  description:
                    "",
                },
              ],
            },
            workExperience: {
              fieldName:
                "Work Experience",
            },
            template:
              "Classic",
            sectionOrder: [
              {
                id: nanoid(),
                type:
                  "PersonalDetails",
                value:
                  "Personal Details",
              },
              {
                id: nanoid(),
                type:
                  "RoleDetails",
                value:
                  "Role Details",
              },
              {
                id: nanoid(),
                type:
                  "EducationDetails",
                value:
                  "Education Details",
              },
              {
                id: nanoid(),
                type:
                  "WorkExperience",
                value:
                  "Work Experience",
              },
              {
                id: nanoid(),
                type:
                  "Skills",
                value:
                  "Skills",
              },
            ],
          },
          shouldUnregister: false,
        }
      );
      const router = useRouter();
      const {
        fields,
        append,
        remove,
        move,
      } = useFieldArray(
        {
          control:
            methods?.control,
          name:
            "customSections",
        }
      );
      const sensors = useSensors(
        useSensor(
          PointerSensor,
          {
            activationConstraint: {
              distance: 8,
            },
          }
        )
      );
      const handleDragDrop = DragReorderHandler(
        fields,
        move
      );
     
      const handleNextStep = async () => {
        const {
          trigger,
        } = methods;
        let isValid = false;
        switch (
          currentStep
        ) {
          case 0: {
            methods?.reset();
          }
          case 1: {
            isValid = await trigger(
              [
                "personalDetails",
              ]
            );
            if (
              isValid
            )
              setCurrentStep(
                currentStep +
                  1
              );
            break;
          }
          case 2: {
            isValid = await trigger(
              [
                "roleDetails",
              ]
            );
    
            if (
              isValid
            )
              setCurrentStep(
                currentStep +
                  1
              );
            break;
          }
          case 3: {
            isValid = await trigger(
              [
                "education",
              ]
            );
            if (
              isValid
            )
              setCurrentStep(
                currentStep +
                  1
              );
            break;
          }
          case 4: {
            const isValid = await trigger(
              [
                "workExperience",
              ]
            );
            if (
              isValid
            )
              setCurrentStep(
                currentStep +
                  1
              );
            break;
          }
          case 5: {
            const isValid = await trigger(
              [
                "skills",
              ]
            );
            if (
              isValid
            )
              setCurrentStep(
                currentStep +
                  1
              );
            break;
          }
          case 6: {
            isValid = await trigger(
              [
                "customSections",
              ]
            );
    
            if (
              isValid
            ) {
              try {
                setSubmitting(
                  true
                );
                const customSectionOrder: ProfileType["sectionOrder"] =
                  methods
                    ?.watch()
                    ?.customSections?.map(
                      (
                        section
                      ) => ({
                        id:
                          section?.sectionID,
                        type:
                          "CustomSection",
                        value:
                          section?.sectionName,
                      })
                    ) ||
                  [];
                const existingSectionOrder =
                  methods?.watch()
                    ?.sectionOrder ||
                  [];
    
                const payload: ProfileType = {
                  ...methods?.watch(),
                  sectionOrder: [
                    ...existingSectionOrder,
                    ...customSectionOrder,
                  ],
                };
                
                console.log(payload);
                const response = await axios.post("/api/profile", payload);
                const {data, error} = response.data;
              
                if(error){
                  toast.error(error.message);
                }
                else{
                    console.log(data);
                  toast.success("Successful ! Navigating to the dashboard");
                  router.push("/dashboard");
                }
              
              } catch (error) {
                console.log(
                  error
                );
              } finally {
                setSubmitting(
                  false
                );
              }
            }
            break;
          }
        }
      };
    return (
        <>
          {submitting ?(
            <div className="min-w-screen min-h-screen flex justify-center items-center">
              <Loading
                className="text-primary"
                message={`${
                     "Creating the Profile, Please Wait... "
                  }`}
              />
            </div>
          ) : (
            <div className="w-full h-full bg-gray-50 py-8">
              <div className="container mx-auto px-4">
                <div
                  id="onboarding-card"
                  className="bg-white rounded-2xl shadow-sm max-w-5xl mx-auto p-8"
                >
                  <div
                    id="progress-header"
                    className="mb-8"
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Complete
                      Your
                      Profile
                    </h2>
                    <div className="flex items-center justify-between mb-4  mt-6 lg:mt-10 ">
                      <Progress
                        value={
                          (currentStep /
                            6) *
                          100
                        }
                      />
                      <span className="ml-4 text-sm font-medium text-nowrap text-gray-500">
                        {`Step ${currentStep} of 6`}
                      </span>
                    </div>
                    <div className="flex justify-between mb-8">
                      <div className="flex flex-col items-center">
                        <div
                          className={`${
                            currentStep >=
                            1
                              ? "bg-primary"
                              : "bg-gray-200"
                          } w-8 h-8 rounded-full  text-white flex items-center justify-center`}
                        >
                          <FontAwesomeIcon
                            icon={
                              faUser
                            }
                            className="text-sm w-8 h-8  italic"
                          />
                        </div>
                        <span
                          className={`${
                            currentStep >=
                            1
                              ? "text-primary"
                              : "text-gray-400"
                          } text-xs mt-2  font-medium`}
                        >
                          Personal
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div
                          className={`${
                            currentStep >=
                            2
                              ? "bg-primary"
                              : "bg-gray-200"
                          } w-8 h-8 rounded-full  text-white flex items-center justify-center`}
                        >
                          <FontAwesomeIcon
                            icon={
                              faBriefcase
                            }
                            className="text-sm w-8 h-8  italic"
                          />
                        </div>
                        <span
                          className={`${
                            currentStep >=
                            2
                              ? "text-primary"
                              : "text-gray-400"
                          } text-xs mt-2  font-medium`}
                        >
                          Role
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div
                          className={`${
                            currentStep >=
                            3
                              ? "bg-primary"
                              : "bg-gray-200"
                          } w-8 h-8 rounded-full  text-white flex items-center justify-center`}
                        >
                          <FontAwesomeIcon
                            icon={
                              faGraduationCap
                            }
                            className="text-sm w-8 h-8  italic"
                          />
                        </div>
                        <span
                          className={`${
                            currentStep >=
                            3
                              ? "text-primary"
                              : "text-gray-400"
                          } text-xs mt-2  font-medium`}
                        >
                          Education
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div
                          className={`${
                            currentStep >=
                            4
                              ? "bg-primary"
                              : "bg-gray-200"
                          } w-8 h-8 rounded-full  text-white flex items-center justify-center`}
                        >
                          <FontAwesomeIcon
                            icon={
                              faBuilding
                            }
                            className="text-sm w-8 h-8  italic"
                          />
                        </div>
                        <span
                          className={`${
                            currentStep >=
                            4
                              ? "text-primary"
                              : "text-gray-400"
                          } text-xs mt-2  font-medium`}
                        >
                          Experience
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div
                          className={`${
                            currentStep >=
                            5
                              ? "bg-primary"
                              : "bg-gray-200"
                          } w-8 h-8 rounded-full  text-white flex items-center justify-center`}
                        >
                          <FontAwesomeIcon
                            icon={
                              faCode
                            }
                            className="text-sm w-8 h-8  italic"
                          />
                        </div>
                        <span
                          className={`${
                            currentStep >=
                            5
                              ? "text-primary"
                              : "text-gray-400"
                          } text-xs mt-2  font-medium`}
                        >
                          Skills
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div
                          className={`${
                            currentStep >=
                            6
                              ? "bg-primary"
                              : "bg-gray-200"
                          } w-8 h-8 rounded-full  text-white flex items-center justify-center`}
                        >
                          <FontAwesomeIcon
                            icon={
                              faPlus
                            }
                            className="text-sm w-8 h-8  italic"
                          />
                        </div>
                        <span
                          className={`${
                            currentStep >=
                            6
                              ? "text-primary"
                              : "text-gray-400"
                          } text-xs mt-2  font-medium`}
                        >
                          Custom
                        </span>
                      </div>
                    </div>
                  </div>
                  <FormProvider
                    {...methods}
                  >
                    <div className="text-xs space-y-6">
                      <div
                        className={`${
                          currentStep ===
                          1
                            ? "block"
                            : "hidden"
                        }`}
                      >
                        <PersonalDetails />
                      </div>
                      <div
                        className={`${
                          currentStep ===
                          2
                            ? "block"
                            : "hidden"
                        }`}
                      >
                        <RoleDetails />
                      </div>
                      <div
                        className={`${
                          currentStep ===
                          3
                            ? "block"
                            : "hidden"
                        }`}
                      >
                        <EducationDetails />
                      </div>
                      <div
                        className={`${
                          currentStep ===
                          4
                            ? "block"
                            : "hidden"
                        }`}
                      >
                        <WorkExperienceDetails />
                      </div>
                      <div
                        className={`${
                          currentStep ===
                          5
                            ? "block"
                            : "hidden"
                        }`}
                      >
                        <Skills />
                      </div>
                      <div
                        className={`${
                          currentStep ===
                          6
                            ? "block"
                            : "hidden"
                        }`}
                      >
                        <div className="space=y-6">
                          <div className="flex justify-between items-center mb-6">
                            <h3 className="text-sm md:text-lg font-medium text-gray-900">
                              Custom
                              Sections
                            </h3>
                            <button
                              type="button"
                              id="add-section-btn"
                              className="px-4 py-2 text-sm text-center bg-primary/10 text-nowrap text-primary rounded-lg hover:bg-primary/20 transition"
                              onClick={() => {
                                append(
                                  {
                                    sectionID: nanoid(),
                                    sectionName:
                                      "Custom Section ",
                                    lineItems: [
                                      {
                                        header:
                                          "",
                                        subHeader:
                                          "",
                                        description:
                                          "",
                                      },
                                    ],
                                  }
                                );
                              }}
                            >
                              <FontAwesomeIcon
                                icon={
                                  faPlus
                                }
                                className="text-sm w-8 h-8 mr-2 italic"
                              />
                              Add
                              Section
                            </button>
                          </div>
                          <Accordion
                            type="single"
                            collapsible
                            className="w-full text-xs space-y-4  relative"
                          >
                            <DndContext
                              collisionDetection={
                                closestCenter
                              }
                              onDragEnd={
                                handleDragDrop
                              }
                              sensors={
                                sensors
                              }
                            >
                              <SortableContext
                                items={
                                  fields
                                }
                                strategy={
                                  verticalListSortingStrategy
                                }
                              >
                                {fields?.map(
                                  (
                                    lineItem,
                                    idx
                                  ) => {
                                    const sectionNames =
                                      methods
                                        ?.watch(
                                          "customSections"
                                        )
                                        ?.map(
                                          (
                                            s
                                          ) =>
                                            s.sectionName
                                        ) ||
                                      [];
                                    const currentSectionName =
                                      sectionNames[
                                        idx
                                      ];
                                    const isDuplicate =
                                      sectionNames.filter(
                                        (
                                          name
                                        ) =>
                                          name ===
                                          currentSectionName
                                      )
                                        .length >
                                      1;
                                    return (
                                      <DraggableItem
                                        key={
                                          lineItem?.id
                                        }
                                        id={
                                          lineItem?.id
                                        }
                                      >
                                        <AccordionItem
                                          value={`${idx}`}
                                          className={`${
                                            methods
                                              ?.formState
                                              ?.errors
                                              ?.customSections?.[
                                              idx
                                            ] ||
                                            isDuplicate
                                              ? "border-red-300 "
                                              : "border-gray-200 "
                                          }  border w-full rounded-xl overflow-hidden text-xs `}
                                        >
                                          <AccordionTrigger className="text-xs bg-gray-50 p-4 flex items-center justify-between hover:no-underline">
                                            <div className="flex items-center w-full space-x-3">
                                              <input
                                                type="text"
                                                placeholder="Section Name"
                                                className="font-medium bg-transparent border-0 outline-none w-full"
                                                {...methods?.register(
                                                  `customSections.${idx}.sectionName`
                                                )}
                                              />
                                              {isDuplicate && (
                                                <span className="text-red-500 text-xs text-nowrap mr-4">
                                                  Duplicate
                                                  section
                                                  name
                                                </span>
                                              )}
                                              {methods
                                                ?.formState
                                                ?.errors
                                                ?.customSections?.[
                                                idx
                                              ]
                                                ?.sectionName
                                                ?.message && (
                                                <span className="text-red-500 text-xs text-nowrap">
                                                  {
                                                    methods
                                                      ?.formState
                                                      ?.errors
                                                      ?.customSections?.[
                                                      idx
                                                    ]
                                                      ?.sectionName
                                                      ?.message
                                                  }
                                                </span>
                                              )}
                                            </div>
                                          </AccordionTrigger>
                                          <CustomSection
                                            index={
                                              idx
                                            }
                                          />{" "}
                                        </AccordionItem>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            remove(
                                              idx
                                            )
                                          }
                                          className="text-red-500 hover:text-red-700 p-2 mt-2  absolute right-0 "
                                          title="Remove"
                                        >
                                          <FontAwesomeIcon
                                            icon={
                                              faTrash
                                            }
                                            className="w-5 h-5"
                                          />
                                        </button>
                                      </DraggableItem>
                                    );
                                  }
                                )}
                              </SortableContext>
                            </DndContext>
                          </Accordion>
                        </div>
                      </div>
                      <div className="flex justify-between space-x-4 mt-8 pt-6 border-t">
                        <button
                          disabled={
                            currentStep ==
                            1
                          }
                          onClick={(
                            e
                          ) => {
                            e.preventDefault();
                            setCurrentStep(
                              currentStep -
                                1
                            );
                          }}
                          type="button"
                          className="px-6 py-3 flex items-center justify-between text-gray-700 hover:bg-gray-100 transition rounded-xl"
                        >
                          <FontAwesomeIcon
                            icon={
                              faArrowLeft
                            }
                            className="text-sm w-8 h-8 mr-2 italic"
                          />
                          Previous
                        </button>
    
                        <button
                          type="submit"
                          onClick={(
                            e
                          ) => {
                            e.preventDefault();
                            handleNextStep();
                          }}
                          className="px-6 py-3 flex items-center justify-between bg-primary text-white rounded-xl hover:bg-primary/90 transition"
                        >
                          {currentStep ==
                          6
                            ? "Save & Proceed"
                            : `Next`}
                          <FontAwesomeIcon
                            icon={
                              faArrowRight
                            }
                            className="text-sm w-8 h-8 ml-2 italic"
                          />
                        </button>
                      </div>
                    </div>
                  </FormProvider>
                </div>
              </div>
            </div>
          )}
        </>
      );
}

export default Onboarding