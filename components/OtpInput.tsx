"use client";

import React, { useRef } from "react";

interface OtpInputProps {
  length: number;
  onChange: (otp: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ length, onChange }) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (/^\d$/.test(value) || value === "") {
      inputsRef.current[index]!.value = value;

      // move to next input
      if (value && index < length - 1) {
        inputsRef.current[index + 1]?.focus();
      }

      const otp = inputsRef.current.map((input) => input?.value || "").join("");
      onChange(otp);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !inputsRef.current[index]?.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      {Array.from({ length }).map((_, index) => (
        <React.Fragment key={index}>
          <input
            type="text"
            maxLength={1}
            className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            ref={(el) => {
              inputsRef.current[index] = el; 
            }}
          />
          {index === 2 && <span className="mx-2 text-xl">-</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default OtpInput;
