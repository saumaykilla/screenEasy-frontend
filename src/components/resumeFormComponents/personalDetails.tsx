import { ProfileType } from "@/utils/schemas/profileSchema";
import {
  faBuilding,
  faEnvelope,
  faGlobe,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useFormContext } from "react-hook-form";

const PersonalDetails = () => {
  const methods = useFormContext<
    ProfileType
  >();
  const {
    register,
    formState: {
      errors,
    },
  } = methods;
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className=" space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-gray-700">
            Full
            Name
          </label>
          {errors
            ?.personalDetails
            ?.fullName && (
            <span className="text-red-500 text-xs">
              {
                errors
                  .personalDetails
                  .fullName
                  .message
              }
            </span>
          )}
        </div>
        <div className="relative">
          <div className=" absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <FontAwesomeIcon
              icon={
                faUser
              }
              className="text-sm w-8 h-8  italic"
            />
          </div>{" "}
          <input
            {...register(
              "personalDetails.fullName"
            )}
            type="text"
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
            placeholder="Enter your full name"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-gray-700">
            Email
          </label>
          {errors
            ?.personalDetails
            ?.email && (
            <span className="text-red-500 text-xs">
              {
                errors
                  ?.personalDetails
                  ?.email
                  ?.message
              }
            </span>
          )}
        </div>
        <div className="relative">
          <div className=" absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <FontAwesomeIcon
              icon={
                faEnvelope
              }
              className="text-sm w-8 h-8  italic"
            />
          </div>
          <input
            {...register(
              "personalDetails.email"
            )}
            type="email"
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
            placeholder="Enter your email"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-gray-700">
          Contact
          Number
        </label>
        <div className="relative">
          <div className=" absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <FontAwesomeIcon
              icon={
                faPhone
              }
              className="text-sm w-8 h-8  italic"
            />
          </div>
          <input
            {...register(
              "personalDetails.contactNumber"
            )}
            type="tel"
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
            placeholder="Enter your contact number"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-gray-700">
          Country
        </label>
        <div className="relative">
          <div className=" absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <FontAwesomeIcon
              icon={
                faGlobe
              }
              className="text-sm w-8 h-8  italic"
            />
          </div>
          <input
            {...register(
              "personalDetails.country"
            )}
            type="text"
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
            placeholder="Enter your Country"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-gray-700">
          City
        </label>
        <div className="relative">
          <div className=" absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <FontAwesomeIcon
              icon={
                faBuilding
              }
              className="text-sm w-8 h-8  italic"
            />
          </div>{" "}
          <input
            {...register(
              "personalDetails.city"
            )}
            type="text"
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
            placeholder="Enter your city"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
