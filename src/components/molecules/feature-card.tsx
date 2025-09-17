// components/molecules/FeatureCard.tsx
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/atoms/card"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
}

export const FeatureCard = ({ icon, title, description, className }: FeatureCardProps) => {
  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-xl hover:border-blue-300",
      "group hover:transform hover:-translate-y-1",
      className
    )}>
      <CardHeader>
        <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center group-hover:bg-amber-700 transition-colors">
          {icon}
        </div>
        <CardTitle className="mt-4">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}