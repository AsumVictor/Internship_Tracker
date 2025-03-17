"use client";

import { useAuth } from "@/hook/useAuth";
import { store } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Provider } from "react-redux";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { loading, user, error } = useAuth();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!loading && (!user || error)) {
  //     router.replace("/login");
  //   }
  // }, []);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  return <Provider store={store}>{children}</Provider>;
}
