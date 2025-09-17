import { useAuth } from "@/hooks/useAuth"
import { AnimatedButton } from "../atoms/animated-button"

import { GradientText } from "../atoms/gradient-text";
import { Brain } from "lucide-react";


export const LandingNavbar = () => {
  const { login, isAuthenticated } = useAuth()

  return (
    <nav className="fixed top-0 w-full backdrop-blur-md border-b z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 ">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-700 rounded-lg">
              <Brain />
            </div>
              <GradientText className=" text-3xl" from="from-amber-400" to="to-amber-700">
                  TaskManager
              </GradientText>
          </div>
          
          <div className="hidden lg:flex items-center space-x-4">
            {!isAuthenticated ? (
              <AnimatedButton onClick={login} size="lg">
                Iniciar Sesión
              </AnimatedButton>
            ) : (
              <AnimatedButton onClick={() => window.location.href = '/app'} size="lg">
                Ir a la App
              </AnimatedButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}