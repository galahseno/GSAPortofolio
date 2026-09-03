import { useState } from "react";
import { FieldShell } from "./FieldShell";
import { fieldStyle } from "./fieldStyles";

export function SelectField({
  id,
  label,
  hint,
  options,
  ...props
}: {
  id: string;
  label: string;
  hint?: string;
  options: string[];
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const [focused, setFocused] = useState(false);
  return (
    <FieldShell id={id} label={label} hint={hint}>
      <select
        id={id}
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ ...fieldStyle(focused, false, false), appearance: "none", cursor: "pointer" }}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}
