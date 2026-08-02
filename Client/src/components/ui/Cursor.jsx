"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Cursor() {

  const [mouse, setMouse] = useState({
    x:0,
    y:0
  });

  useEffect(()=>{

    const move=(e)=>{

      setMouse({
        x:e.clientX,
        y:e.clientY
      });

    };

    window.addEventListener("mousemove",move);

    return ()=>window.removeEventListener("mousemove",move);

  },[]);

  return(

    <Image
      src="/assets/cursor/gavel.png"
      alt="cursor"
      width={40}
      height={40}
      className="fixed pointer-events-none z-[9999]"
      style={{
        left:mouse.x,
        top:mouse.y,
        transform:"translate(-30%,-30%)"
      }}
    />

  );

}