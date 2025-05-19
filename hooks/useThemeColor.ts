import { Colors } from "@/constants/Colors";
import { useMemo } from "react";

export function useThemeColor(){

  const colors = useMemo(
    () => {return Colors},
    []
  );

  return colors;

}
