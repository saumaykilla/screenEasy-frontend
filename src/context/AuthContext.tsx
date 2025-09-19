"use client";

import { createClient } from "@/lib/supabase/client";
import { ProfileType } from "@/utils/schemas/profileSchema";
import { User } from "@supabase/supabase-js";
import { createContext, useState, useEffect } from "react";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  profile: ProfileType | null;
  setProfile: (profile: ProfileType) => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  profile: null,
  setProfile: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileType | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await createClient().auth.getUser();
      
      if (data.user) {
        setUser(data.user);
        
        // Fetch profile if user exists
        const { data: profileData } = await createClient()
          .from("profiles")
          .select("*")
          .eq("user_id", data.user.id)
          .single();

        if (profileData) {
          setProfile({
            personalDetails: profileData?.personal_details as ProfileType['personalDetails'],
            education: profileData?.education as ProfileType['education'],
            skills: profileData?.skills as ProfileType['skills'],
            template: profileData?.template as ProfileType['template'],
            roleDetails: profileData?.role_details as ProfileType['roleDetails'],
            sectionOrder: profileData?.section_order as ProfileType['sectionOrder'],
            workExperience: profileData?.work_experience as ProfileType['workExperience'],
            customSections: profileData?.custom_sections as ProfileType['customSections'],
          });
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      
      setIsLoading(false);
    };

    getUser();

    const { data } = createClient().auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        profile,
        setProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};