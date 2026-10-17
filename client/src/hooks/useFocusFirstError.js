import { useEffect } from "react";

export function useFocusFirstError({ errors, submitCount, setFocus }) {
  useEffect(() => {
    const firstError = Object.keys(errors)[0];
    if (submitCount > 0 && firstError) {
      setFocus(firstError);
    }
    // Solo depende de submitCount: si dependiera de errors, el foco
    // saltaría mientras el usuario escribe y corrige los campos.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitCount]);
}
