"use client";
import { useRouter } from "next/navigation";
import React from "react";

const NotFound: React.FC = () => {
  const router = useRouter();
  const handleReload = () => {
    router.push("/");
  };

  return (
    <div className="bg-no-repeat bg-center bg-cover h-screen w-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl">Page not found</h1>
      <button
        onClick={handleReload}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Reload
      </button>
    </div>
  );
};

export default NotFound;
