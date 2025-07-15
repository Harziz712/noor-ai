"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const BackNav = ({
  title,
  action,
}: {
  title: ReactNode;
  action?: ReactNode;
}) => {
  const router = useRouter();

  return (
    <header className="w-full flex gap-y-4 p-4 lg:flex-row items-center justify-between">
        <span className="h-[36px] w-[36px] flex justify-center items-center bg-blue-600/30 hover:bg-blue-600 rounded-full">
          <ArrowLeft
            onClick={() => router.back()}
            className="cursor-pointer text-white  "
            size={20}
          />
        </span>
        <p className="font-bold text-xl">{title}</p>
      <div>{action}</div>
    </header>
  );
};

export default BackNav;
