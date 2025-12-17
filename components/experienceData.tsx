// components/experienceData.tsx
import React from "react";

type Brand = {
  id: string;
  name: string;
  description: string;
  Logo: React.FC<{ className?: string }>;
};

export const brands: Brand[] = [
  {
    id: "logitech",
    name: "Logitech G",
    description:
      "Collaborated on gaming visuals and product microsites for high-performance peripherals.",
    Logo: ({ className }) => (
      <div className={`text-white ${className}`}>
        <span className="text-2xl font-medium tracking-wide">logitech</span>{" "}
        <span className="text-3xl font-bold">G</span>
      </div>
    ),
  },
  {
    id: "vogue",
    name: "VOGUE",
    description:
      "Created sleek, fashion-forward digital marketing campaigns that reflected Vogue’s luxury and prestige.",
    Logo: ({ className }) => (
      <div
        className={`text-white font-serif text-4xl tracking-tight ${className}`}
      >
        VOGUE
      </div>
    ),
  },
  {
    id: "squad",
    name: "Squad",
    description:
      "Built contemporary brand assets and motion-led launch pages focused on community engagement.",
    Logo: ({ className }) => (
      <div className={`flex items-center gap-2 ${className}`}>
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="14" cy="14" r="12" stroke="white" strokeWidth="3" />
          <circle cx="14" cy="14" r="6" fill="white" />
        </svg>
        <span className="text-white font-bold text-2xl">squad</span>
      </div>
    ),
  },
  {
    id: "condenast",
    name: "Condé Nast",
    description:
      "Delivered premium editorial landing experiences optimized for clarity, elegance, and conversion.",
    Logo: ({ className }) => (
      <div
        className={`text-white font-serif text-2xl tracking-wide ${className}`}
      >
        CONDÉ NAST
      </div>
    ),
  },
];
