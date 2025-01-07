import { useEffect, useState } from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import client from "@/lib/mongodb";
import { useRouter } from "next/router";
import { useAuth } from "@/lib/auth";

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    await client.connect();
    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default function Login({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();



  useEffect(() => {
    if (isAuthenticated) {
      router.push("/pet-listing");
    }
    else {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-white">
      Loading...
    </main>
  );
}

