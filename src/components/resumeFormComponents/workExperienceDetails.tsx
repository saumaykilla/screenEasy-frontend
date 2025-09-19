"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  Controller,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import { ProfileType } from "@/utils/schemas/profileSchema";
import Editor from "../ui/rich-text/editor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
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
import DraggableItem from "./draggableItem";
import { DragReorderHandler } from "../dragToReorder";

const WorkExperienceDetails = () => {
  const methods = useFormContext<
    ProfileType
  >();
  const {
    register,
    control,
    setValue,
    watch,
    formState: {
      errors,
    },
  } = methods;
  const {
    append,
    remove,
    fields,
    move,
  } = useFieldArray(
    {
      control: control,
      name:
        "workExperience.lineItem",
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
  return (
    <div className="space-y-6 text-xs">
      <div
        id="workExperience-entries"
        className="space-y-4"
      >
        <Accordion
          type="single"
          collapsible
          className="w-full text-xs space-y-4"
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
                        value={`${lineItem}.${idx}`}
                        className={` ${
                          errors
                            ?.workExperience
                            ?.lineItem?.[
                            idx
                          ]
                            ?.company ||
                          errors
                            ?.workExperience
                            ?.lineItem?.[
                            idx
                          ]
                            ?.role ||
                          errors
                            ?.workExperience
                            ?.lineItem?.[
                            idx
                          ]
                            ?.location ||
                          errors
                            ?.workExperience
                            ?.lineItem?.[
                            idx
                          ]
                            ?.endDate ||
                          errors
                            ?.workExperience
                            ?.lineItem?.[
                            idx
                          ]
                            ?.startDate
                            ? "border-red-300 "
                            : "border-gray-200 "
                        } border w-full rounded-xl overflow-hidden text-xs`}
                      >
                        <AccordionTrigger className="text-xs bg-gray-50 p-4 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <FontAwesomeIcon
                              icon={
                                faGraduationCap
                              }
                              className="text-sm text-primary w-8 h-8  italic"
                            />

                            <span className="font-medium text-gray-700">
                              {watch()
                                ?.workExperience
                                ?.lineItem?.[
                                idx
                              ]
                                ?.company
                                ? watch()
                                    ?.workExperience
                                    ?.lineItem?.[
                                    idx
                                  ]
                                    ?.company
                                : `Work Experience ${idx +
                                    1}`}
                            </span>
                          </div>
                        </AccordionTrigger>

                        <AccordionContent className="p-6 text-xs border-t">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <label className="block text-gray-700">
                                  Company
                                </label>
                                {errors
                                  ?.workExperience
                                  ?.lineItem?.[
                                  idx
                                ]
                                  ?.company
                                  ?.message && (
                                  <span className="text-red-500 text-xs">
                                    {
                                      errors
                                        ?.workExperience
                                        ?.lineItem?.[
                                        idx
                                      ]
                                        ?.company
                                        ?.message
                                    }
                                  </span>
                                )}
                              </div>
                              <input
                                type="text"
                                {...register(
                                  `workExperience.lineItem.${idx}.company`
                                )}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                              />
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <label className="block text-gray-700">
                                  Role
                                  /
                                  Position
                                </label>
                                {errors
                                  ?.workExperience
                                  ?.lineItem?.[
                                  idx
                                ]
                                  ?.role
                                  ?.message && (
                                  <span className="text-red-500 text-xs">
                                    {
                                      errors
                                        ?.workExperience
                                        ?.lineItem?.[
                                        idx
                                      ]
                                        ?.role
                                        ?.message
                                    }
                                  </span>
                                )}
                              </div>
                              <input
                                {...register(
                                  `workExperience.lineItem.${idx}.role`
                                )}
                                type="text"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <label className="block text-gray-700">
                                  Start
                                  Date
                                </label>
                                {errors
                                  ?.workExperience
                                  ?.lineItem?.[
                                  idx
                                ]
                                  ?.startDate
                                  ?.message && (
                                  <span className="text-red-500 text-xs">
                                    {
                                      errors
                                        ?.workExperience
                                        ?.lineItem?.[
                                        idx
                                      ]
                                        ?.startDate
                                        ?.message
                                    }
                                  </span>
                                )}
                              </div>
                              <Controller
                                control={
                                  control
                                }
                                name={`workExperience.lineItem.${idx}.startDate`}
                                render={({
                                  field,
                                }) => (
                                  <input
                                    type="date"
                                    {...field}
                                    value={
                                      field?.value
                                        ? new Date(
                                            field?.value
                                          )
                                            ?.toISOString()
                                            ?.split(
                                              "T"
                                            )[0]
                                        : ""
                                    }
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                                  />
                                )}
                              />
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <label className="block text-gray-700">
                                  End
                                  Date
                                </label>
                                {errors
                                  ?.workExperience
                                  ?.lineItem?.[
                                  idx
                                ]
                                  ?.endDate
                                  ?.message && (
                                  <span className="text-red-500 text-xs">
                                    {
                                      errors
                                        ?.workExperience
                                        ?.lineItem?.[
                                        idx
                                      ]
                                        ?.endDate
                                        ?.message
                                    }
                                  </span>
                                )}
                              </div>
                              <Controller
                                control={
                                  control
                                }
                                name={`workExperience.lineItem.${idx}.endDate`}
                                render={({
                                  field,
                                }) => (
                                  <input
                                    type="date"
                                    {...field}
                                    value={
                                      field?.value
                                        ? new Date(
                                            field?.value
                                          )
                                            ?.toISOString()
                                            ?.split(
                                              "T"
                                            )[0]
                                        : ""
                                    }
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                                  />
                                )}
                              />
                            </div>
                          </div>

                          <div className="mt-4 space-y-2">
                            <div className="flex items-center justify-between">
                              <label className="block text-gray-700">
                                Location
                              </label>
                              {errors
                                ?.workExperience
                                ?.lineItem?.[
                                idx
                              ]
                                ?.location
                                ?.message && (
                                <span className="text-red-500 text-xs">
                                  {
                                    errors
                                      ?.workExperience
                                      ?.lineItem?.[
                                      idx
                                    ]
                                      ?.location
                                      ?.message
                                  }
                                </span>
                              )}
                            </div>
                            <input
                              type="text"
                              {...register(
                                `workExperience.lineItem.${idx}.location`
                              )}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                            />
                          </div>

                          <div className="mt-4 space-y-2">
                            <div className="flex items-center justify-between">
                              <label className="block text-gray-700">
                                Description
                              </label>
                              {errors
                                ?.workExperience
                                ?.lineItem?.[
                                idx
                              ]
                                ?.description
                                ?.message && (
                                <span className="text-red-500 text-xs">
                                  {
                                    errors
                                      ?.workExperience
                                      ?.lineItem?.[
                                      idx
                                    ]
                                      ?.description
                                      ?.message
                                  }
                                </span>
                              )}
                            </div>
                            <div>
                              <Editor
                                placeholder="Write your summary here..."
                                content={
                                  watch()
                                    ?.workExperience
                                    ?.lineItem?.[
                                    idx
                                  ]
                                    ?.description
                                }
                                onChange={(
                                  value: string
                                ) => {
                                  setValue(
                                    `workExperience.lineItem.${idx}.description`,
                                    value
                                  );
                                }}
                              />
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <button
                        type="button"
                        onClick={() =>
                          remove(
                            idx
                          )
                        }
                        className="text-red-500 hover:text-red-700 p-2 mt-2 "
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

      <button
        type="button"
        id="add-workExperience"
        onClick={() =>
          append(
            {
              company:
                "",
              role:
                "",
              location:
                "",
              startDate: null,
              endDate: null,
              description:
                "",
            }
          )
        }
        className="flex items-center text-primary hover:text-primary/80 transition"
      >
        <FontAwesomeIcon
          icon={
            faPlus
          }
          className="text-sm  w-8 h-8 mr-2 italic"
        />
        Add
        Another
        Work
        Experience
      </button>
    </div>
  );
};

export default WorkExperienceDetails;
