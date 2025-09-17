import { UserStats } from "@/components/organisms/user-stats";

export const UserStatsPage = () => {
  return (
    <div className="container mx-auto py-6">
      {/* <h1 className="text-3xl font-bold mb-6">Estadísticas de Tareas</h1> */}
      <UserStats />
    </div>
  );
};