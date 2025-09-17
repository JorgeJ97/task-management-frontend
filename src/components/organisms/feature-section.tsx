import { FeatureCard } from "../molecules/feature-card" 
import { CheckCircle, Users, BarChart3, Shield } from "lucide-react"

export const FeaturesSection = () => {
  const features = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Gestión Intuitiva",
      description: "Organiza tus tareas con una interfaz limpia y fácil de usar."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Colaboración en Equipo",
      description: "Trabaja junto a tu equipo en proyectos compartidos."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Análisis de Productividad",
      description: "Visualiza tu progreso con reportes y estadísticas detalladas."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Seguridad de Nivel Empresarial",
      description: "Tus datos están protegidos con encriptación de grado militar."
    }
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Potencia tu{" "}
            <span className="bg-gradient-to-r from-amber-400 to-amber-700 bg-clip-text text-transparent">
              productividad
            </span>
          </h2>
          <p className="text-xl max-w-2xl mx-auto">
            Descubre todas las características diseñadas para ayudarte a alcanzar tus objetivos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}