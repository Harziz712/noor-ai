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
    <header className="w-full flex gap-y-4 p-4 lg:flex-row items-center justify-between bg-transparent backdrop-blur-sm">
        <span className="h-[36px] w-[36px] flex justify-center items-center  bg-[#5e2ea3] hover:bg-[#7741cb] rounded-full">
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
