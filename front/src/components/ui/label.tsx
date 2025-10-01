// src/components/ui/label.tsx
import React from "react";
import { cn } from "@/lib/utils";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & { className?: string };

export const Label: React.FC<LabelProps> = ({ className, children, ...props }) => {
  return (
    <label className={cn("text-sm font-medium text-muted-foreground px-1", className)} {...props}>
      {children}
    </label>
  );
};
