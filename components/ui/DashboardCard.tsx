"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export default function DashboardCard({
  title,
  description,
  href,
  icon: Icon,
}: DashboardCardProps) {
  return (
    <Link
      href={href}
      className="group bg-white/10 hover:bg-white/20 rounded-2xl p-6 shadow-md 
                 transition duration-300 flex flex-col justify-between border border-white/10"
    >
      <div className="flex items-center gap-3">
        <div className="p-3 bg-purple-600 rounded-xl">
          <Icon className="text-white" size={24} />
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <p className="text-sm text-gray-300 mt-2 group-hover:text-gray-100">
        {description}
      </p>
    </Link>
  );
}
