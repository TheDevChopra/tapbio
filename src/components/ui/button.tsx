import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "ghost"
  size?: "default" | "sm" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "default", ...props }, ref) => {
    
    let variantStyles = ""
    switch (variant) {
      case "primary":
        variantStyles = "bg-foreground text-background hover:bg-foreground/90 border border-transparent"
        break
      case "secondary":
        variantStyles = "bg-background text-foreground hover:bg-muted border border-border"
        break
      case "accent":
        variantStyles = "bg-accent text-white hover:bg-accent-hover border border-transparent"
        break
      case "ghost":
        variantStyles = "bg-transparent text-foreground hover:bg-muted border border-transparent"
        break
    }

    let sizeStyles = ""
    switch (size) {
      case "default":
        sizeStyles = "h-10 px-4 py-2"
        break
      case "sm":
        sizeStyles = "h-9 rounded-md px-3"
        break
      case "lg":
        sizeStyles = "h-11 rounded-md px-8 text-lg"
        break
    }

    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${variantStyles} ${sizeStyles} ${className}`}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
