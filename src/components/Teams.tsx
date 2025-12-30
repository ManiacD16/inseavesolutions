import { useEffect, useMemo, useState } from "react";
import { Linkedin, ArrowRight } from "lucide-react";

const TeamMember = ({
  name,
  title,
  bgColor,
  image,
}: {
  name: string;
  title: string;
  bgColor: string;
  image: React.ReactNode;
}) => (
  <div className="flex-shrink-0 basis-full sm:basis-1/2 lg:basis-1/4 px-4">
    <div className="flex flex-col group cursor-pointer">
      <div
        className={`${bgColor} rounded-tl-[80px] rounded-br-[80px] overflow-hidden mb-6 transition-transform duration-300 group-hover:scale-105`}
      >
        <div className="aspect-[3/4] flex items-end justify-center p-8">
          <div className="w-full h-full rounded-lg flex items-center justify-center text-6xl">
            {image}
          </div>
        </div>
      </div>
      <h3 className="text-xl font-bold text-neutral-400 mb-1">{name}</h3>
      <p className="text-gray-500 mb-4">{title}</p>

      <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <Linkedin className="w-4 h-4 text-white" />
        </div>
        <span className="font-medium">LinkedIn</span>
      </button>
    </div>
  </div>
);

const Teams = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(4);

  const team = useMemo(
    () => [
      {
        name: "Mr. Jorche Milton",
        title: "(CTO, Co-founder)",
        bgColor: "bg-gradient-to-br from-green-900 to-green-600",
        image: "👨‍💼",
      },
      {
        name: "Robert Jhonson",
        title: "(Marketing Head)",
        bgColor: "bg-gradient-to-br from-purple-300 to-purple-400",
        image: "👨‍💼",
      },
      {
        name: "Daniel Ryan",
        title: "(Sr. Marketing Manager)",
        bgColor: "bg-gradient-to-br from-pink-600 to-red-600",
        image: "👨‍💼",
      },
      {
        name: "Mrs. Emily Sophia",
        title: "(Jr. Marketing Manager)",
        bgColor: "bg-gradient-to-br from-purple-300 to-purple-400",
        image: "👩‍💼",
      },
      {
        name: "Mr. John Smith",
        title: "(CTO, Co-founder)",
        bgColor: "bg-gradient-to-br from-green-900 to-green-600",
        image: "👨‍💼",
      },
      {
        name: "Sarah Wilson",
        title: "(Marketing Head)",
        bgColor: "bg-gradient-to-br from-purple-300 to-purple-400",
        image: "👩‍💼",
      },
      {
        name: "Michael Brown",
        title: "(Sr. Marketing Manager)",
        bgColor: "bg-gradient-to-br from-pink-600 to-red-600",
        image: "👨‍💼",
      },
      {
        name: "Jessica Davis",
        title: "(Jr. Marketing Manager)",
        bgColor: "bg-gradient-to-br from-purple-300 to-purple-400",
        image: "👩‍💼",
      },
    ],
    []
  );

  // ✅ set itemsPerView by breakpoint
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const perView = w >= 1024 ? 4 : w >= 640 ? 2 : 1;
      setItemsPerView(perView);

      // also keep index safe when resizing
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, team.length - perView);
        return Math.min(prev, maxIndex);
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [team.length]);

  // ✅ Autoplay (no blank end)
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, team.length - itemsPerView);
        if (prev >= maxIndex) return 0;
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, team.length, itemsPerView]);

  const totalDots = team.length; // keep dots per team member
  const activeDot = currentIndex % totalDots;

  const goToSlide = (index: number) => {
    const maxIndex = Math.max(0, team.length - itemsPerView);
    setCurrentIndex(Math.min(index, maxIndex));
  };

  // ✅ translate based on itemsPerView
  const translatePercent = currentIndex * (100 / itemsPerView);

  return (
    <div className="min-h-screen p-8 md:p-16 border-t border-blue-900/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
          <div className="mb-8 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              We've Most<br />Talented Team.
            </h1>
            <p className="text-gray-600 text-lg max-w-md">
              To provide most expensive work for our clients in<br />the
              world-wide.
            </p>
          </div>

          {/* Hiring Badge */}
          <div className="relative">
            <div className="absolute -left-24 top-1/2 -translate-y-1/2 w-24 h-0.5 bg-gray-900 hidden md:block"></div>
            <div className="bg-white rounded-full px-6 py-3 shadow-lg flex items-center gap-3">
              <span className="text-gray-900 font-medium">We're Hiring</span>
              <span className="flex gap-1">
                <span className="w-2 h-2 bg-gray-900 rounded-full"></span>
                <span className="w-2 h-2 bg-gray-900 rounded-full"></span>
              </span>
            </div>
            <button className="mt-4 w-full bg-gray-900 text-white rounded-full px-6 py-3 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
              <span className="font-medium">Join Our Team</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="overflow-hidden mb-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${translatePercent}%)`,
            }}
          >
            {team.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                title={member.title}
                bgColor={member.bgColor}
                image={member.image}
              />
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalDots }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeDot
                  ? "w-8 bg-blue-600"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teams;
