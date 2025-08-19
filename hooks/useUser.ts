// hooks/useUser.ts
"use client";

import { useState, useEffect } from "react";
import supabase from "@/lib/supabase";

export default function useUser() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
      } else {
        setUser(user);
      }
      setLoading(false);
    };

    getUser();

    // subscribe to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}
