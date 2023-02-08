import { useEffect, RefObject } from "react";
import { useFormikContext } from "formik";

export const useErrorFocus = (
  fieldRef: RefObject<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >,
  name: string
) => {
  const { isSubmitting, isValid, errors } = useFormikContext();

  const firstErrorKey = Object.keys(errors)[0];

  useEffect(() => {
    if (!isSubmitting || isValid) return;
    if (!isValid && firstErrorKey === name) {
      fieldRef.current?.focus;
    }
  }, [isSubmitting, isValid, fieldRef, firstErrorKey, name]);
};
