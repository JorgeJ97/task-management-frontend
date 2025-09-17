import { Button } from "./button"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  from?:string
  to?:string
  className?: string
}

export const AnimatedButton = ({ 
  children, 
  onClick, 
  variant = "default", 
  size = "default", 
  from = "from-amber-400",
  to= "to-amber-700",
  className 
}: AnimatedButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      size={size}
      className={cn(
        "transition-all duration-300 transform hover:shadow-lg",
        `bg-gradient-to-r ${from} ${to} hover:from-amber-500 hover:to-amber-700`,
        "text-slate-200 font-semibold",
        className
      )}
    >
      {children}
    </Button>
  )
}