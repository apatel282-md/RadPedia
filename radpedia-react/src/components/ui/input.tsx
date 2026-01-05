import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-xl border border-white/10 bg-brand-bg-300 px-3 py-2 text-sm text-brand-text-100 ring-offset-brand-bg-100 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-brand-text-200/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-200 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
