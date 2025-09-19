import React from "react";
import Editor from "../ui/rich-text/editor";
import { useFormContext } from "react-hook-form";
import { ProfileType } from "@/utils/resolverSchemas";

const Skills = () => {
  const methods = useFormContext<
    ProfileType
  >();
  const {
    setValue,
    watch,
  } = methods;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="block text-gray-700">
          Skills
        </label>
        <div>
          <Editor
            placeholder="Write your summary here..."
            content={
              watch()
                ?.skills
                ?.data
            }
            onChange={(
              value: string
            ) => {
              setValue(
                "skills.data",
                value
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Skills;
