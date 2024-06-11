import Image from "next/image";
import React from "react";

export default function loading() {
  return (
    <div>
      <Image
        src={"/favicon.ico"}
        width={40}
        height={40}
        alt="Image not found"
      />
    </div>
  );
}
