import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-colors duration-300",
          "focus:outline-none",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          // Variants
          variant === "primary" &&
          "bg-foreground text-background hover:bg-foreground/90",
          variant === "secondary" &&
          "bg-secondary text-foreground hover:bg-secondary/80",
          variant === "outline" &&
          "border border-border text-foreground hover:border-accent hover:text-accent",
          variant === "ghost" &&
          "text-muted-foreground hover:bg-secondary/20 hover:text-foreground",
          // Sizes
          size === "sm" && "px-4 py-2 text-xs tracking-widest uppercase",
          size === "md" && "px-6 py-3 text-sm tracking-widest uppercase",
          size === "lg" && "px-10 py-5 text-base tracking-widest uppercase",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
