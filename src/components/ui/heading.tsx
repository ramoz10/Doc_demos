import * as React from "react"
import { cn } from "@/lib/utils"

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

function Heading({ className, level = 2, ...props }: HeadingProps) {
  const Comp = `h${level}` as const;
  
  return (
    <Comp
      className={cn(
        "font-sans font-bold tracking-tight text-foreground",
        {
          "text-4xl lg:text-5xl": level === 1,
          "text-3xl lg:text-4xl": level === 2,
          "text-2xl lg:text-3xl": level === 3,
          "text-xl lg:text-2xl": level === 4,
          "text-lg lg:text-xl": level === 5,
          "text-base lg:text-lg": level === 6,
        },
        className
      )}
      {...props}
    />
  )
}

export { Heading }
