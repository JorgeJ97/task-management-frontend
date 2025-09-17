import { useEffect } from 'react';
import { ThemeProvider } from './context/theme.context'; 
import DashBoard from './pages/DashBoard';
import LandingPage from './pages/LandingPage';
// import WelcomePage from './pages/Welcome';
import { Routes, Route, useLocation } from 'react-router-dom'
import ProtectedRoute from './components/atoms/protected-route';

function App() {
  const location = useLocation()
  
  useEffect(() => {
    console.log('Ruta actual:', location.pathname)
  }, [location])

  return (
    <ThemeProvider defaultTheme="dark" storageKey="taskmanager-ui-theme"> 
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        
        {/* 
        <Route path='welcome' element={
          <ProtectedRoute>
            <WelcomePage/>
          </ProtectedRoute>
        }/> */}
     
        {/* Dashboard con rutas anidadas */}
        <Route path='app/*' element={
          <ProtectedRoute>
            <DashBoard/>
          </ProtectedRoute>
        }/>
      </Routes>
    </ThemeProvider>
  )
}

export default App;