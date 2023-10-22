import React from "react";

export function InputButton({ children }) {
  return (
    <button className="w-full rounded bg-zinc-700 text-gray-00 p-1">
      {children}
    </button>
  );
}
