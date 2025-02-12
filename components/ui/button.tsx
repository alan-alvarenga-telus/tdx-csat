import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-telus-purple focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-telus-purple text-white hover:bg-telus-purple-light active:bg-telus-purple-dark shadow-sm",
        destructive: "bg-crimson text-white hover:bg-crimson-light active:bg-crimson-dark shadow-sm",
        outline:
          "border-2 border-telus-purple text-telus-purple bg-white hover:bg-telus-purple hover:text-white active:bg-telus-purple-dark",
        secondary:
          "bg-accessible-green text-white hover:bg-accessible-green/90 active:bg-accessible-green-dark shadow-sm",
        ghost: "text-telus-purple hover:bg-telus-purple/10 active:bg-telus-purple/20",
        link: "text-telus-purple underline-offset-4 hover:underline",
        white: "bg-white text-telus-purple hover:bg-gray-50 active:bg-gray-100 shadow-sm",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  fullWidth?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, fullWidth, className }))} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }

