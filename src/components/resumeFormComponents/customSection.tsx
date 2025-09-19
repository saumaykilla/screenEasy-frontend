import { ProfileType } from "@/utils/schemas/profileSchema";
import React from "react";
import {
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import Editor from "../ui/rich-text/editor";

const CustomSection = ({
  index,
}: {
  index: number;
}) => {
  const {
    control,
    watch,
    register,
    setValue,
    formState: {
      errors,
    },
  } = useFormContext<
    ProfileType
  >();

  const {
    append,
    fields,
    remove,
    move,
  } = useFieldArray(
    {
      control: control,
      name: `customSections.${index}.lineItems`,
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
    <AccordionContent className="p-6 text-xs border-t">
      <Accordion
        type="single"
        collapsible
        className="w-full text-xs space-y-4 relative"
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
                      value={`${lineItem?.id}.${idx}`}
                      className={` ${
                        errors
                          ?.customSections?.[
                          index
                        ]
                          ?.lineItems?.[
                          idx
                        ]
                          ? "border-red-300 "
                          : "border-gray-200 "
                      }  border w-full rounded-xl  overflow-hidden text-xs`}
                    >
                      <AccordionTrigger className="text-xs bg-gray-50 p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="font-medium text-gray-700">
                            {watch()
                              ?.customSections?.[
                              index
                            ]
                              ?.lineItems?.[
                              idx
                            ]
                              ?.header
                              ? watch()
                                  ?.customSections?.[
                                  index
                                ]
                                  ?.lineItems?.[
                                  idx
                                ]
                                  ?.header
                              : `${
                                  watch()
                                    ?.customSections?.[
                                    index
                                  ]
                                    ?.sectionName
                                } ${idx +
                                  1}`}
                          </span>
                        </div>
                      </AccordionTrigger>

                      <AccordionContent className="p-6 text-xs border-t">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <label className="block text-gray-700">
                                Header
                              </label>
                              {errors
                                ?.customSections?.[
                                index
                              ]
                                ?.lineItems?.[
                                idx
                              ]
                                ?.header
                                ?.message && (
                                <span className="text-red-500 text-xs">
                                  {
                                    errors
                                      ?.customSections?.[
                                      index
                                    ]
                                      ?.lineItems?.[
                                      idx
                                    ]
                                      ?.header
                                      ?.message
                                  }
                                </span>
                              )}
                            </div>

                            <input
                              type="text"
                              {...register(
                                `customSections.${index}.lineItems.${idx}.header`
                              )}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <label className="block text-gray-700">
                                Sub
                                Header
                              </label>
                              {errors
                                ?.customSections?.[
                                index
                              ]
                                ?.lineItems?.[
                                idx
                              ]
                                ?.subHeader
                                ?.message && (
                                <span className="text-red-500 text-xs">
                                  {
                                    errors
                                      ?.customSections?.[
                                      index
                                    ]
                                      ?.lineItems?.[
                                      idx
                                    ]
                                      ?.subHeader
                                      ?.message
                                  }
                                </span>
                              )}
                            </div>
                            <input
                              {...register(
                                `customSections.${index}.lineItems.${idx}.subHeader`
                              )}
                              type="text"
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                            />
                          </div>
                        </div>

                        <div className="mt-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="block text-gray-700">
                              Description
                            </label>
                          </div>
                          <div>
                            <Editor
                              placeholder="Write your summary here..."
                              content={
                                watch()
                                  ?.customSections?.[
                                  index
                                ]
                                  ?.lineItems?.[
                                  idx
                                ]
                                  ?.description
                              }
                              onChange={(
                                value: string
                              ) => {
                                setValue(
                                  `customSections.${index}.lineItems.${idx}.description`,
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
                      disabled={
                        watch()
                          ?.customSections?.[
                          index
                        ]
                          ?.lineItems
                          ?.length ==
                        1
                      }
                      onClick={() =>
                        remove(
                          idx
                        )
                      }
                      className={` ${
                        watch()
                          ?.customSections?.[
                          index
                        ]
                          ?.lineItems
                          ?.length ==
                        1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-red-500 hover:text-red-700"
                      }  p-2 mt-2 absolute right-0 `}
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
      <button
        type="button"
        id="add-customSection"
        onClick={() =>
          append(
            {
              header:
                "",
              subHeader:
                "",
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
        {`Add Item`}
      </button>
    </AccordionContent>
  );
};

export default CustomSection;
