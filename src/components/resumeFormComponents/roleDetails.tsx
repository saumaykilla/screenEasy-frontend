import React from "react";
import Editor from "../ui/rich-text/editor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLink,
  faPlus,
  faTag,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import { ProfileType } from "@/utils/schemas/profileSchema";

const RoleDetails = () => {
  const methods = useFormContext<
    ProfileType
  >();
  const {
    register,
    setValue,
    control,
    watch,
    formState: {
      errors,
    },
  } = methods;
  const {
    fields,
    append,
    remove,
  } = useFieldArray(
    {
      control: control,
      name:
        "roleDetails.additionalLinks",
    }
  );
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="block text-gray-700">
          Professional
          Summary
        </label>
        <div>
          <Editor
            placeholder="Write your summary here..."
            content={
              watch()
                ?.roleDetails
                ?.summary
            }
            onChange={(
              value: string
            ) => {
              setValue(
                "roleDetails.summary",
                value
              );
            }}
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-gray-700">
            LinkedIn
            URL
          </label>
          {errors
            ?.roleDetails
            ?.linkedInURL && (
            <span className="text-red-500 text-xs">
              {
                errors
                  ?.roleDetails
                  ?.linkedInURL
                  ?.message
              }
            </span>
          )}
        </div>
        <div className="relative">
          <div className=" absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <FontAwesomeIcon
              icon={
                faLinkedin
              }
              className="text-sm w-8 h-8  italic"
            />
          </div>{" "}
          <input
            {...register(
              "roleDetails.linkedInURL"
            )}
            type="url"
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
            placeholder="https://linkedin.com/in/your-profile"
          />
        </div>
      </div>
      {(watch()
        ?.roleDetails
        ?.additionalLinks
        ?.length ??
        0) >
        0 && (
        <div
          id="additional-links"
          className="space-y-4"
        >
          <label className="block text-gray-700">
            Additional
            Links
          </label>
          {fields?.map(
            (
              item,
              idx
            ) => {
              return (
                <div
                  className="link-entry space-y-4 flex items-center justify-between gap-4"
                  key={
                    item?.id
                  }
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-gray-700">
                          Label
                        </label>
                        {errors
                          ?.roleDetails
                          ?.additionalLinks?.[
                          idx
                        ]
                          ?.label
                          ?.message && (
                          <span className="text-red-500 text-xs">
                            {
                              errors
                                ?.roleDetails
                                ?.additionalLinks?.[
                                idx
                              ]
                                ?.label
                                ?.message
                            }
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                          <FontAwesomeIcon
                            icon={
                              faTag
                            }
                            className="text-sm w-8 h-8 italic"
                          />
                        </div>
                        <input
                          type="text"
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                          placeholder="Link Label (e.g., Portfolio)"
                          {...register(
                            `roleDetails.additionalLinks.${idx}.label`
                          )}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-gray-700">
                          URL
                        </label>
                        {errors
                          ?.roleDetails
                          ?.additionalLinks?.[
                          idx
                        ]
                          ?.url
                          ?.message && (
                          <span className="text-red-500 text-xs">
                            {
                              errors
                                ?.roleDetails
                                ?.additionalLinks?.[
                                idx
                              ]
                                ?.url
                                ?.message
                            }
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                          <FontAwesomeIcon
                            icon={
                              faLink
                            }
                            className="text-sm w-8 h-8 italic"
                          />
                        </div>
                        <input
                          type="text"
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                          placeholder="Link Label (e.g., Portfolio)"
                          {...register(
                            `roleDetails.additionalLinks.${idx}.url`
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      remove(
                        idx
                      )
                    }
                    className="text-red-500 hover:text-red-700 p-2 "
                    title="Remove"
                  >
                    <FontAwesomeIcon
                      icon={
                        faTrash
                      }
                      className="w-5 h-5"
                    />
                  </button>
                </div>
              );
            }
          )}
        </div>
      )}
      <button
        type="button"
        id="add-link"
        className="flex items-center text-primary hover:text-primary/80 transition"
        onClick={() =>
          append(
            {
              label:
                "",
              url:
                "",
            }
          )
        }
      >
        <FontAwesomeIcon
          icon={
            faPlus
          }
          className="text-sm w-8 h-8 mr-2 italic"
        />
        Add
        Another
        Link
      </button>
    </div>
  );
};

export default RoleDetails;
