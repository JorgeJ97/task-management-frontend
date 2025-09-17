import { 
  CheckCircle, 
  Clock, 
  List, 
  TrendingUp, 
  Home,
  Briefcase,
  AlertTriangle,
  Bell,
  Star,
  ArrowUp,
  ArrowDown,
  Minus,
  PieChart,
  Target,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/atoms/card';
import { Progress } from '@/components/atoms/progress';
// import { Badge } from '@/components/atoms/badge';
import { Skeleton } from '@/components/atoms/skeleton';
import { useUserStats } from '@/hooks/useUserStats';
import type { JSX } from 'react';

// Iconos por categoría
const categoryIcons = {
  personal: <Home className="w-4 h-4" />,
  work: <Briefcase className="w-4 h-4" />,
  urgent: <AlertTriangle className="w-4 h-4" />,
  reminder: <Bell className="w-4 h-4" />,
  general: <Star className="w-4 h-4" />,
};

// Iconos por prioridad
const priorityIcons = {
  high: <ArrowUp className="w-4 h-4" />,
  medium: <Minus className="w-4 h-4" />,
  low: <ArrowDown className="w-4 h-4" />,
};

// Paleta de colores profesional para categorías
const categoryBarColors = {
  personal: 'bg-blue-400 dark:bg-blue-600',
  work: 'bg-indigo-400 dark:bg-indigo-600',
  urgent: 'bg-rose-400 dark:bg-rose-600',
  reminder: 'bg-amber-400 dark:bg-amber-600',
  general: 'bg-slate-400 dark:bg-slate-600',
};

// Paleta de colores profesional para prioridades
const priorityBarColors = {
  high: 'bg-rose-400 dark:bg-rose-600',
  medium: 'bg-amber-400 dark:bg-amber-600',
  low: 'bg-emerald-400 dark:bg-emerald-600',
};

// Colores de texto para modo claro/oscuro
const categoryTextColors = {
  personal: 'text-blue-700 dark:text-blue-300',
  work: 'text-indigo-700 dark:text-indigo-300',
  urgent: 'text-rose-700 dark:text-rose-300',
  reminder: 'text-amber-700 dark:text-amber-300',
  general: 'text-slate-700 dark:text-slate-300',
};

const priorityTextColors = {
  high: 'text-rose-700 dark:text-rose-300',
  medium: 'text-amber-700 dark:text-amber-300',
  low: 'text-emerald-700 dark:text-emerald-300',
};

// Componente para gráfico de barras horizontal mejorado
const HorizontalBarChart = ({ data, colors, textColors, icons }: { 
  data: Record<string, number>, 
  colors: Record<string, string>, 
  textColors: Record<string, string>,
  icons: Record<string, JSX.Element>,
  title: string
}) => {
  const maxValue = Math.max(...Object.values(data));
  const total = Object.values(data).reduce((sum, value) => sum + value, 0);
  
  return (
    <div className="space-y-4 mt-4">
      {Object.entries(data).map(([key, value]) => {
        const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
        
        return (
          <div key={key} className="flex items-center justify-between group">
            <div className="flex items-center w-32 flex-shrink-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${colors[key]} transition-colors duration-200 group-hover:opacity-90`}>
                <div className="text-white dark:text-white/90">
                  {icons[key]}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium capitalize text-foreground">{key}</span>
                <span className={`text-xs ${textColors[key]}`}>{percentage}%</span>
              </div>
            </div>
            
            <div className="flex-1 mx-4">
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 transition-all duration-300">
                <div 
                  className={`h-2.5 rounded-full ${colors[key]} transition-all duration-500 ease-out`} 
                  style={{ width: `${maxValue > 0 ? (value / maxValue) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
            
            <div className="w-12 text-right">
              <span className="text-sm font-semibold text-foreground">{value}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const UserStats = () => {
  const { data: stats, isLoading, error } = useUserStats();

  if (error) {
    return (
      <div className="p-6">
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Error
            </CardTitle>
            <CardDescription>
              No se pudieron cargar las estadísticas: {error.message}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-16 mt-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <Skeleton className="h-5 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[...Array(5)].map((_, j) => (
                  <div key={j} className="flex items-center">
                    <Skeleton className="h-8 w-8 rounded-full mr-3" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-full mb-1" />
                      <Skeleton className="h-2 w-full" />
                    </div>
                    <Skeleton className="h-4 w-8 ml-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Sin datos
            </CardTitle>
            <CardDescription>
              No hay estadísticas disponibles para mostrar.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Estadísticas de Tareas</h1>
        <p className="text-muted-foreground mt-2">
          Resumen del rendimiento y distribución de tus tareas
        </p>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center text-muted-foreground">
              <List className="w-4 h-4 mr-1" /> Total de Tareas
            </CardDescription>
            <CardTitle className="text-3xl text-foreground">{stats.totalTasks}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Tareas creadas en total
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center text-muted-foreground">
              <CheckCircle className="w-4 h-4 mr-1" /> Completadas
            </CardDescription>
            <CardTitle className="text-3xl text-foreground">{stats.completedTasks}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Tareas finalizadas
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center text-muted-foreground">
              <Clock className="w-4 h-4 mr-1" /> Pendientes
            </CardDescription>
            <CardTitle className="text-3xl text-foreground">{stats.pendingTasks}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Tareas por completar
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center text-muted-foreground">
              <TrendingUp className="w-4 h-4 mr-1" /> Tasa de Finalización
            </CardDescription>
            <CardTitle className="text-3xl text-foreground">{stats.completionRate.toFixed(1)}%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={stats.completionRate} className="h-2 bg-muted" />
              <div className="text-xs text-muted-foreground">
                Porcentaje de tareas completadas
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estadísticas detalladas con gráficos de barras */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tareas por categoría - Gráfico de barras */}
        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <PieChart className="w-5 h-5 mr-2" /> Tareas por Categoría
            </CardTitle>
            <CardDescription>
              Distribución de tareas por categoría
            </CardDescription>
          </CardHeader>
          <CardContent>
            <HorizontalBarChart 
              data={stats.tasksByCategory} 
              colors={categoryBarColors}
              textColors={categoryTextColors}
              icons={categoryIcons}
              title="Categorías"
            />
          </CardContent>
        </Card>

        {/* Tareas por prioridad - Gráfico de barras */}
        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <Target className="w-5 h-5 mr-2" /> Tareas por Prioridad
            </CardTitle>
            <CardDescription>
              Distribución de tareas por nivel de prioridad
            </CardDescription>
          </CardHeader>
          <CardContent>
            <HorizontalBarChart 
              data={stats.tasksByPriority} 
              colors={priorityBarColors}
              textColors={priorityTextColors}
              icons={priorityIcons}
              title="Prioridades"
            />
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de distribución */}
      <Card className="transition-all duration-200 hover:shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center text-foreground">
            <BarChart3 className="w-5 h-5 mr-2" /> Distribución General
          </CardTitle>
          <CardDescription>
            Resumen visual de tus tareas completadas vs pendientes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 mr-2"></div>
                  <span className="text-sm font-medium">Completadas</span>
                </div>
                <span className="text-sm font-semibold">{stats.completedTasks}</span>
              </div>
              <Progress 
                value={(stats.completedTasks / stats.totalTasks) * 100} 
                className="h-2 bg-muted" 
              />
              <div className="text-xs text-muted-foreground text-center">
                {((stats.completedTasks / stats.totalTasks) * 100).toFixed(1)}% del total
              </div>
            </div>
            
            <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-amber-400 mr-2"></div>
                  <span className="text-sm font-medium">Pendientes</span>
                </div>
                <span className="text-sm font-semibold">{stats.pendingTasks}</span>
              </div>
              <Progress 
                value={(stats.pendingTasks / stats.totalTasks) * 100} 
                className="h-2 bg-muted" 
              />
              <div className="text-xs text-muted-foreground text-center">
                {((stats.pendingTasks / stats.totalTasks) * 100).toFixed(1)}% del total
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};