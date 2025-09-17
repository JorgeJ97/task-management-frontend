import React from 'react';
import { Breadcrumb } from '@/components/atoms/breadcrumb';

export const HomePage: React.FC = () => {
  return (
    <>
      <Breadcrumb />
      <main className="h-[50vh] flex items-center justify-center">
        <div>
          <h1 className="mb-10 text-2xl font-bold text-center">
            Bienvenid@ a TasksManager
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
