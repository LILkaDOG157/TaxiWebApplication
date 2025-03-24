import AdminGuard from '../../../components/AdminGuard';
import DriversList from './DriversList';

export default function DriversListPage() {
  return (
    <AdminGuard>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Список водителей</h1>
        </div>
        <DriversList />
      </div>
    </AdminGuard>
  );
} 