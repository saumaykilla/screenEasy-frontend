"use client";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  useRef,
  useState,
} from "react";

type Props = {
  defaultValue: string;
  onChange?: (
    val: string
  ) => void;
  children?: React.ReactNode;
};

const EditableSectionHeader = ({
  defaultValue,
  onChange,
  children,
}: Props) => {
  const [
    isEditing,
    setIsEditing,
  ] = useState(
    false
  );
  const [
    title,
    setTitle,
  ] = useState(
    defaultValue
  );
  const inputRef = useRef<
    HTMLInputElement
  >(
    null
  );

  const handleBlur = () => {
    const newValue = inputRef.current?.value.trim();
    if (
      newValue &&
      newValue !==
        title
    ) {
      setTitle(
        newValue
      );
      onChange?.(
        newValue
      );
    }
    setIsEditing(
      false
    );
  };

  return (
    <div className="flex items-center justify-between relative w-full  ">
      {isEditing ? (
        <input
          ref={
            inputRef
          }
          autoFocus
          defaultValue={
            title
          }
          onBlur={
            handleBlur
          }
          className="text-lg font-bold text-gray-900 bg-white w-full  rounded outline-none "
        />
      ) : (
        <span className="text-lg w-full font-bold text-gray-900">
          {
            title
          }
        </span>
      )}
      <div className="flex items-center gap-2 md:gap-4">
        {
          children
        }
        <div
          onClick={(
            e
          ) => {
            e.stopPropagation();
            setIsEditing(
              true
            );
          }}
          className=" order-2  text-gray-300 hover:text-gray-500"
        >
          <FontAwesomeIcon
            icon={
              faEdit
            }
            className="text-lg italic"
          />
        </div>
      </div>
    </div>
  );
};

export default EditableSectionHeader;
