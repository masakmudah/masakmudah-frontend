import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export const CategoryBar: React.FC<{ tabs: string[] }> = ({ tabs }) => {
  const fired = useRef(false);
  const defaultSelectedTabIndex = 0;
  const [currentLink, setCurrentLink] = useState<{
    index: number;
    left: undefined | number;
    width: undefined | number;
  }>({
    index: defaultSelectedTabIndex,
    left: undefined,
    width: undefined,
  });

  const defaultSelectedTabStyles = [
    "[&:nth-child(1)]:dark:bg-white [&:nth-child(1)]:bg-[#C1F17A]",
    "[&:nth-child(2)]:dark:bg-white [&:nth-child(2)]:bg-[#C1F17A]",
    "[&:nth-child(3)]:dark:bg-white [&:nth-child(3)]:bg-[#C1F17A]",
    "[&:nth-child(4)]:dark:bg-white [&:nth-child(4)]:bg-[#C1F17A]",
  ];

  useEffect(() => {
    setCurrentLink(() => ({
      left: document.getElementById("uuu-btn-" + defaultSelectedTabIndex)
        ?.offsetLeft,
      width: document
        .getElementById("uuu-btn-" + defaultSelectedTabIndex)
        ?.getBoundingClientRect().width,
      index: defaultSelectedTabIndex,
    }));
  }, []);

  return (
    <div
      className={
        "w-fit relative dark:border-neutral-800 border-neutral-300 rounded-full flex gap-5 items-center justify-center p-2 backdrop-blur-2xl text-white text-sm"
      }
    >
      {tabs.map((link, i) => (
        <button
          key={i}
          id={"uuu-btn-" + i}
          onClick={() => {
            fired.current = true;
            setCurrentLink(() => ({
              left: document.getElementById("uuu-btn-" + i)?.offsetLeft,
              width: document
                .getElementById("uuu-btn-" + i)
                ?.getBoundingClientRect().width,
              index: i,
            }));
          }}
          className={twMerge(
            "transition-colors duration-200 flex items-center justify-center rounded-full h-fit px-4 py-2 text-nowrap",
            currentLink.index === i && "dark:text-neutral-900 text-[#1C2625]",
            fired.current
              ? ""
              : defaultSelectedTabStyles[defaultSelectedTabIndex]
          )}
        >
          {link}
        </button>
      ))}
      <div className={"absolute inset-0 h-full p-2 -z-[1] overflow-hidden"}>
        <div className={"relative h-full w-full overflow-hidden"}>
          <div
            style={{
              left: `calc(${currentLink.left || 0}px - 0.75rem + 0.25rem)`,
              width: `${currentLink.width || 0}px`,
            }}
            className={twMerge(
              `transition-[color,left,width] duration-300 absolute top-1/2 -translate-y-1/2 h-full rounded-full -z-[1]`,
              //just skips animation on page load
              fired.current ? "dark:bg-white bg-[#C1F17A]" : "bg-transparent"
            )}
          />
        </div>
      </div>
    </div>
  );
};
