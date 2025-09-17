import { cn } from "@/lib/utils"

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  from?: string
  to?: string
}

export const GradientText = ({ 
  children, 
  className,
  from = "from-amber-400",
  to = "to-amber-700" 
}: GradientTextProps) => {
  return (
    <span className={cn(
      `bg-gradient-to-r ${from} ${to} bg-clip-text text-transparent`,
      "font-bold",
      className
    )}>
      {children}
    </span>
  )
}