'use client';

import { useEffect, useState } from 'react';
import { TariffClass } from '@prisma/client';

interface Driver {
  id: string;
  applicationId: string;
  application: {
    name: string;
    phone: string;
    email: string;
    experience: number;
    carYear: number;
    hasLicense: boolean;
  };
  carNumber: string;
  licensePhoto: string;
  faceVideo: string;
  tariffClasses: TariffClass[];
  isActive: boolean;
  createdAt: string;
}

export default function DriversList() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDrivers = async () => {
    try {
      const response = await fetch('/api/admin/drivers');
      if (!response.ok) {
        throw new Error('Ошибка при загрузке списка водителей');
      }
      const data = await response.json();
      setDrivers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  const toggleDriverStatus = async (driverId: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/drivers/${driverId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при обновлении статуса водителя');
      }

      await fetchDrivers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const getTariffClassesText = (classes: TariffClass[]) => {
    return classes.map(c => {
      switch (c) {
        case 'ECONOMY': return 'Эконом';
        case 'COMFORT': return 'Комфорт';
        case 'BUSINESS': return 'Бизнес';
        case 'PREMIUM': return 'Премиум';
        default: return c;
      }
    }).join(', ');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {error}
      </div>
    );
  }

  if (drivers.length === 0) {
    return (
      <div className="text-center py-8 text-gray-600">
        Нет активных водителей
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Водитель
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Номер машины
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Тарифы
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Документы
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Статус
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Действия
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {drivers.map((driver) => (
            <tr key={driver.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">
                  {driver.application.name}
                </div>
                <div className="text-sm text-gray-500">
                  {driver.application.phone}
                </div>
                <div className="text-sm text-gray-500">
                  {driver.application.email}
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {driver.carNumber}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {getTariffClassesText(driver.tariffClasses)}
              </td>
              <td className="px-6 py-4">
                <div className="flex space-x-2">
                  <a
                    href={driver.licensePhoto}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-600 hover:text-yellow-900"
                  >
                    Права
                  </a>
                  <a
                    href={driver.faceVideo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-600 hover:text-yellow-900"
                  >
                    Видео
                  </a>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  driver.isActive
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {driver.isActive ? 'Активен' : 'Неактивен'}
                </span>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => toggleDriverStatus(driver.id, !driver.isActive)}
                  className={`px-3 py-1 text-sm font-medium rounded-md ${
                    driver.isActive
                      ? 'text-red-700 bg-red-100 hover:bg-red-200'
                      : 'text-green-700 bg-green-100 hover:bg-green-200'
                  }`}
                >
                  {driver.isActive ? 'Деактивировать' : 'Активировать'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 