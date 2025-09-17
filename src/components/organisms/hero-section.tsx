import { useAuth } from "@/hooks/useAuth"
import { useNavigate } from "react-router-dom" 
import { AnimatedButton } from "../atoms/animated-button" 
import { GradientText } from "../atoms/gradient-text" 
import { Button } from "../atoms/button"
import dashboardImage from '../../assets/dashboard.png'

export const HeroSection = () => {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleDashboardClick = () => {
    navigate('/app') 
  }

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-16">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Organiza tus{" "}
            <GradientText from="from-amber-400" to="to-amber-700">
              tareas
            </GradientText>{" "}
            como un{" "}
            <GradientText from="from-amber-400" to="to-amber-700">
              profesional
            </GradientText>
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            La plataforma todo en uno para gestionar tus tareas personales y alcanzar tus metas de productividad.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <AnimatedButton 
              onClick={isAuthenticated ? handleDashboardClick : login} // ← Corregido
              size="lg"
              className="px-8 py-6 text-lg"
            >
              {isAuthenticated ? 'Ir a mi Dashboard' : 'Comenzar Gratis'}
            </AnimatedButton>
            
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
              Ver Demo
            </Button>
          </div>

          <div className="mt-12 bg-white rounded-2xl shadow-2xl border">
            <img 
              src={dashboardImage}
              alt="Dashboard preview" 
              className="rounded-lg shadow-inner w-full max-w-4xl mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}