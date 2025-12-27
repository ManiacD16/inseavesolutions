import { useEffect, useState } from "react";

export function useTypewriter(text: string, speed: number = 45) {
  const [value, setValue] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setValue(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return value;
}
