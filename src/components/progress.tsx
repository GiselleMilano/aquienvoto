import { FC } from "react";

interface props {
  value: number;
}

export const Progress: FC<props> = ({ value }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${value}%`, transition: "width 0.5s ease-in-out" }}
      ></div>
    </div>
  );
};
