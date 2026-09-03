import { useState } from "react";
import { FieldShell } from "./FieldShell";
import { fieldStyle } from "./fieldStyles";

export function TextAreaField({
  id,
  label,
  error,
  hint,
  rows,
  ...props
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  rows?: number;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [focused, setFocused] = useState(false);
  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      <textarea
        id={id}
        rows={rows}
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={fieldStyle(focused, error !== undefined, true)}
      />
    </FieldShell>
  );
}
