import React from 'react';
import { Breadcrumb } from '@/components/atoms/breadcrumb';

export const HomePage: React.FC = () => {
  return (
    <>
      <Breadcrumb />
      <main className="h-[50vh] flex items-center justify-center">
        <div>
          <h1 className="mb-10 text-2xl font-bold text-center">
            Bienvenid@ a Task Manager
          </h1>
          <p className="text-center text-muted-foreground">
            La aplicación donde podra manejar sus tareas personales
          </p>
          <p className="text-center text-muted-foreground">
            Dale un vistaso a la barra lateral donde encontraras las
            herramientas disponibles
          </p>
        </div>
      </main>
    </>
  );
};


// import { useNavigate } from 'react-router-dom'
// import { Button } from '@/components/atoms/button'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/atoms/card'
// import { Rocket, Calendar, CheckCircle } from 'lucide-react'

// export default function WelcomePage() {
//   const navigate = useNavigate()

//   const features = [
//     {
//       icon: CheckCircle,
//       title: "Gestiona tus tareas",
//       description: "Crea, edita y organiza tus tareas personales"
//     },
//     {
//       icon: Calendar,
//       title: "Planifica tu tiempo",
//       description: "Establece fechas límite y prioridades"
//     },
//     {
//       icon: Rocket,
//       title: "Aumenta tu productividad",
//       description: "Mantén el control de tus objetivos diarios"
//     }
//   ]

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
//       <Card className="w-full max-w-2xl">
//         <CardHeader className="text-center">
//           <CardTitle className="text-3xl font-bold">
//             ¡Bienvenido a Task Manager!
//           </CardTitle>
//           <CardDescription className="text-lg">
//             Tu herramienta personal para gestionar tareas y aumentar la productividad
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {features.map((feature, index) => (
//               <div key={index} className="text-center p-4">
//                 <feature.icon className="w-12 h-12 mx-auto mb-3 text-blue-600" />
//                 <h3 className="font-semibold mb-2">{feature.title}</h3>
//                 <p className="text-sm text-muted-foreground">{feature.description}</p>
//               </div>
//             ))}
//           </div>
          
//           <div className="text-center space-y-4">
//             <p className="text-muted-foreground">
//               Serás redirigido al dashboard en unos momentos...
//             </p>
//             <Button onClick={() => navigate('/app/tasks')}>
//               Ir al dashboard ahora
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }