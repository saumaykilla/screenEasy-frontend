import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export const useAuth =
  () => {
    const {
      user,
      isLoading,
      profile,
      setProfile
    } =
      useContext(
        AuthContext
      );
    return {
      user,
      isLoading,
      profile,
      setProfile
    };
  };
