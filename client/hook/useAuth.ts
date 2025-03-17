"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout, setUser } from "@/redux/authSlice";
import { AUTH } from "@/config/config";

export function useAuth() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${AUTH}`);
        if (!res.ok) {
          setError(true);
          router.push("/login");
        }

        const data = await res.json();
        dispatch(setUser(data)); 
        setLoading(false)
        setError(false);
      } catch (error) {
        setError(true);
        dispatch(logout());
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [user, dispatch, router]);

  return { user, loading, error };
}
