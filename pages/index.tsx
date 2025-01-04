import { useEffect, useState } from "react";
import LoginForm from "@/pages/loginForm";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import client from "@/lib/mongodb";
import AddDetails from "./addDetails";

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
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-[#D2D3D3]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-bold text-green-500">Vet Vault</h2>
        {userData ? <AddDetails /> : (
          <LoginForm />
        )}
      </div>
    </main>
  );
}
