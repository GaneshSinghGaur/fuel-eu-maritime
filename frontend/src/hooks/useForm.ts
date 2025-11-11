import { useState } from "react";

export default function useForm<T extends Record<string, any>>(initial: T) {
  const [values, setValues] = useState<T>(initial);

  const onChange =
    (k: keyof T) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setValues((s) => ({ ...s, [k]: e.target.value }));
    };

  const reset = () => setValues(initial);

  return { values, onChange, reset, setValues };
}
