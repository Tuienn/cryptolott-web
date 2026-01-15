"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const lotteryBallVariants = cva(
  "relative inline-flex items-center justify-center rounded-full font-bold transition-all select-none",
  {
    variants: {
      variant: {
        gold: "bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-600 text-yellow-900 shadow-md",
        empty: "bg-gray-200 text-gray-400 border-2 border-dashed border-gray-300",
        selected:
          "bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-600 text-yellow-900 shadow-md ring-2 ring-primary ring-offset-2",
        quickPick: "bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-600 text-yellow-900 shadow-md",
        outline: "border-2 border-gray-300 bg-white text-foreground hover:border-primary hover:bg-primary/5",
        outlineSelected: "border-2 border-primary bg-primary text-primary-foreground",
      },
      size: {
        sm: "size-8 text-xs",
        default: "size-10 text-sm",
        lg: "size-12 text-base",
        xl: "size-14 text-lg",
      },
    },
    defaultVariants: {
      variant: "gold",
      size: "default",
    },
  },
)

export interface LotteryBallProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof lotteryBallVariants> {
  number?: number | string
  showDecorator?: boolean
}

const LotteryBall = React.forwardRef<HTMLDivElement, LotteryBallProps>(
  ({ className, variant, size, number, showDecorator = false, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(lotteryBallVariants({ variant, size, className }))} {...props}>
        {/* Decorator for gold balls */}
        {showDecorator && (variant === "gold" || variant === "selected" || variant === "quickPick") && (
          <div className="absolute -top-1 left-1/2 -translate-x-1/2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="size-1 rounded-full bg-red-500" />
              ))}
            </div>
          </div>
        )}
        {/* Shine effect */}
        {(variant === "gold" || variant === "selected" || variant === "quickPick") && (
          <div className="absolute top-1 left-1/4 size-2 rounded-full bg-white/40" />
        )}
        <span className="relative z-10">
          {number !== undefined ? (typeof number === "number" ? number.toString().padStart(2, "0") : number) : ""}
        </span>
      </div>
    )
  },
)
LotteryBall.displayName = "LotteryBall"

export { LotteryBall, lotteryBallVariants }
