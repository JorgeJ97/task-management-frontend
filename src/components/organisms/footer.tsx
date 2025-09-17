import { Button } from "../atoms/button" 
import { Card, CardContent } from "../atoms/card" 
import { cn } from "@/lib/utils"

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <Card className="rounded-none border-x-0 border-b-0 bg-gray-900 text-white">
      <CardContent className="pt-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TF</span>
              </div>
              <span className="text-xl font-bold">TaskFlow</span>
            </div>
            
            <div className="flex space-x-4">
              <Button 
                variant="link" 
                className="text-gray-300 hover:text-blue-400 p-0 h-auto"
                onClick={(e) => e.preventDefault()}
              >
                Términos
              </Button>
              <Button 
                variant="link" 
                className="text-gray-300 hover:text-blue-400 p-0 h-auto"
                onClick={(e) => e.preventDefault()}
              >
                Privacidad
              </Button>
              <Button 
                variant="link" 
                className="text-gray-300 hover:text-blue-400 p-0 h-auto"
                onClick={(e) => e.preventDefault()}
              >
                Soporte
              </Button>
            </div>
          </div>
          
          <div className={cn(
            "mt-8 pt-8 border-t border-gray-700 text-center text-gray-400",
            "text-sm md:text-base"
          )}>
            <p>© {currentYear} TaskManager. Todos los derechos reservados.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}