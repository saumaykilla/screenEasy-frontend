"use client";

import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { createContext, useState, useEffect } from "react";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await createClient().auth.getUser();
      if (!data.user && window.location.pathname === "/") {
        return;
      } else if (!data.user) {
        window.location.href = "/";
      } else {
        setUser(data.user);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
