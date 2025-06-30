import { API_ROOT } from "@/models/Base"
import { useEffect, useState } from "react"

export const useDebounce = (value, milliSeconds) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, milliSeconds)

    return () => {
      clearTimeout(handler)
    }
  }, [value, milliSeconds])

  return debouncedValue
}

export const handleSrcImg = src => {
  const srcImg = src ? `${API_ROOT}/${src}` : ""

  return srcImg
}

export const removeEmptyFields = obj => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) =>
        value !== undefined &&
        value !== null &&
        value !== "" &&
        !(typeof value === "number" && isNaN(value)) &&
        !(Array.isArray(value) && value.length === 0) &&
        !(typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0)
    )
  )
}

export const omitField = (obj, keyToRemove) => {
  const { [keyToRemove]: _, ...rest } = obj
  return rest
}
