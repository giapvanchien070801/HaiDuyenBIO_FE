import { API_ROOT } from "@/app/models/Base";
import { useEffect, useState } from "react";

export const useDebounce = (value, milliSeconds) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, milliSeconds);

    return () => {
      clearTimeout(handler);
    };
  }, [value, milliSeconds]);

  return debouncedValue;
};

export const handleSrcImg = (src) => {
  const srcImg = src ? `${API_ROOT}${src}` : "";

  return srcImg;
};
