import { Toaster } from 'sonner';

export const ToastContainer = () => {


  return (
    <Toaster
      position="top-right"
      expand={false}
      richColors={true}
      closeButton={true}
      duration={4000}
      toastOptions={{
        style: {
          background: 'hsl(var(--background))',
          border: '1px solid hsl(var(--border))',
          color: 'hsl(var(--foreground))',
        },
      }}
    />
  );
};