"use client";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

export default function Navbar() {
  return (
    <nav className="flex flex-row-reverse h-12 bg-gray-50">
      <DynamicWidget />
    </nav>
  );
}
