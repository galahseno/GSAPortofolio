import { useState } from "react";
import { FieldShell } from "./FieldShell";
import { fieldStyle } from "./fieldStyles";

export function TextField({
  id,
  label,
  error,
  hint,
  onBlur,
  ...props
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);
  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      <input
        id={id}
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={(event) => {
          onBlur?.(event);
          setFocused(false);
        }}
        style={fieldStyle(focused, error !== undefined, false)}
      />
    </FieldShell>
  );
}
