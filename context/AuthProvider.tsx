'use client';

import { createContext, useEffect, useState, ReactNode } from "react";
import supabase from "@/lib/supabase";
import { AuthChangeEvent, Session } from '@supabase/supabase-js';

interface AuthContextType {
    user: Session['user'] | null;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({ user: null, loading: false });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<Session['user'] | null>(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const getInitialSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user || null);
            setLoading(false);
        };
        getInitialSession();
    
        const { data: authListener } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
            setUser(session?.user || null);
        });
    
        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []);
    
    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export default { AuthContext, AuthProvider };