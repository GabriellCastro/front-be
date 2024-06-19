import Image from "next/image";
import { FC } from "react";

export const Header: FC = () => {
  return (
    <div
      className="w-full flex items-center justify-between bg-white
      p-4 h-20 border-b-2 shadow-md
    "
    >
      <Image src={"/logo.svg"} width={50} height={50} alt="logo" />
    </div>
  );
};
