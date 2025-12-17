import React, { useState } from "react";

// Brand data with logos and descriptions
const brands = [
  {
    name: "Logitech G",
    logo: (
      <svg className="w-full h-auto" viewBox="0 0 200 80" fill="currentColor">
        <text
          x="10"
          y="50"
          fontSize="32"
          fontWeight="600"
          fontFamily="system-ui"
        >
          logitech G
        </text>
      </svg>
    ),
    description:
      "Designed innovative gaming interfaces and brand materials for Logitech G's premier gaming peripherals.",
  },
  {
    name: "Vogue",
    logo: (
      <svg className="w-full h-auto" viewBox="0 0 200 80" fill="currentColor">
        <text
          x="20"
          y="55"
          fontSize="48"
          fontWeight="400"
          fontFamily="serif"
          letterSpacing="8"
        >
          VOGUE
        </text>
      </svg>
    ),
    description:
      "Created sleek, fashion-forward digital marketing campaigns that reflected Vogue's luxury and prestige.",
  },
  {
    name: "Squad",
    logo: (
      <svg className="w-full h-auto" viewBox="0 0 200 80" fill="currentColor">
        <text
          x="30"
          y="50"
          fontSize="36"
          fontWeight="700"
          fontFamily="system-ui"
        >
          squad
        </text>
      </svg>
    ),
    description:
      "Developed dynamic brand identity and user experiences for Squad's collaborative platform.",
  },
  {
    name: "Condé Nast",
    logo: (
      <svg className="w-full h-auto" viewBox="0 0 200 80" fill="currentColor">
        <text x="10" y="50" fontSize="28" fontWeight="500" fontFamily="serif">
          CONDÉ NAST
        </text>
      </svg>
    ),
    description:
      "Crafted premium editorial designs and digital experiences for Condé Nast's prestigious publications.",
  },
];

const Experience: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full bg-black text-white py-32 px-8 md:px-16">
      <div className="max-w-[1400px] mx-auto border-2 border-white/20 rounded-[48px] p-16 md:p-24">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 gap-8">
          <h2
            className="text-[80px] md:text-[120px] lg:text-[140px] leading-none font-light tracking-tight"
            style={{
              fontFamily: "serif",
              transform: "scaleY(1.2) scaleX(0.85)",
              transformOrigin: "left center",
            }}
          >
            EXPERIENCE
          </h2>

          <p className="text-gray-400 text-base md:text-lg max-w-md text-left md:text-right leading-relaxed">
            A selection of collaborations with leading brands, showcasing my
            creative impact and professional growth.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brands.map((brand, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative"
              style={{
                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                opacity:
                  hoveredIndex === null ? 1 : hoveredIndex === index ? 1 : 0.5,
                transform: hoveredIndex === index ? "scale(1.04)" : "scale(1)",
                zIndex: hoveredIndex === index ? 10 : 1,
              }}
            >
              <div
                className="relative bg-[#0a0a0a] rounded-[32px] p-8 flex flex-col items-center justify-center min-h-[280px] transition-all duration-500"
                style={{
                  border: "2px dashed rgba(255, 255, 255, 0.2)",
                  boxShadow:
                    hoveredIndex === index
                      ? "0 20px 60px rgba(0, 0, 0, 0.5)"
                      : "none",
                }}
              >
                {/* Logo */}
                <div
                  className="w-full flex items-center justify-center mb-6 transition-all duration-500"
                  style={{
                    color: hoveredIndex === index ? "#ffffff" : "#666666",
                    opacity:
                      hoveredIndex === null
                        ? 0.7
                        : hoveredIndex === index
                          ? 1
                          : 0.3,
                  }}
                >
                  {brand.logo}
                </div>

                {/* Yellow Dot - Only visible on hover */}
                <div
                  className="w-2 h-2 bg-yellow-400 rounded-full mb-4 transition-all duration-500"
                  style={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    transform: hoveredIndex === index ? "scale(1)" : "scale(0)",
                  }}
                />

                {/* Description - Only visible on hover */}
                <div
                  className="text-center text-sm text-gray-300 leading-relaxed px-4 transition-all duration-500"
                  style={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    transform:
                      hoveredIndex === index
                        ? "translateY(0)"
                        : "translateY(10px)",
                    maxHeight: hoveredIndex === index ? "200px" : "0px",
                    overflow: "hidden",
                  }}
                >
                  {brand.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
