'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminGuard from '@/app/components/AdminGuard';

interface RequirementData {
  id: string;
  section: string;
  title: string;
  items: string[];
}

interface RequirementsState {
  basic: RequirementData;
  documents: RequirementData;
  car: RequirementData;
}

export default function EditRequirements() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requirements, setRequirements] = useState<RequirementsState>({
    basic: {
      id: '',
      section: 'basic',
      title: 'Базовые требования',
      items: []
    },
    documents: {
      id: '',
      section: 'documents',
      title: 'Необходимые документы',
      items: []
    },
    car: {
      id: '',
      section: 'car',
      title: 'Требования к автомобилю',
      items: []
    }
  });

  useEffect(() => {
    fetchRequirements();
  }, []);

  const fetchRequirements = async () => {
    try {
      const response = await fetch('/api/requirements');
      if (!response.ok) throw new Error('Failed to fetch requirements');
      const data = await response.json();
      
      // Преобразуем массив требований в объект с разделами
      const requirementsMap = data.reduce((acc: any, req: RequirementData) => {
        acc[req.section] = req;
        return acc;
      }, {});

      setRequirements(prev => ({
        ...prev,
        ...requirementsMap
      }));
    } catch (err) {
      setError('Ошибка при загрузке требований');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const response = await fetch('/api/requirements', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.values(requirements)),
      });

      if (!response.ok) throw new Error('Failed to update requirements');

      // Обновляем данные после успешного сохранения
      await fetchRequirements();
    } catch (err) {
      setError('Ошибка при сохранении требований');
    } finally {
      setSaving(false);
    }
  };

  const addItem = (section: keyof RequirementsState) => {
    setRequirements({
      ...requirements,
      [section]: {
        ...requirements[section],
        items: [...requirements[section].items, '']
      }
    });
  };

  const removeItem = (section: keyof RequirementsState, index: number) => {
    setRequirements({
      ...requirements,
      [section]: {
        ...requirements[section],
        items: requirements[section].items.filter((_, i) => i !== index)
      }
    });
  };

  const updateItem = (section: keyof RequirementsState, index: number, value: string) => {
    const newItems = [...requirements[section].items];
    newItems[index] = value;
    setRequirements({
      ...requirements,
      [section]: {
        ...requirements[section],
        items: newItems
      }
    });
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold text-gray-900">Редактирование требований</h1>
              <Link
                href="/"
                target="_blank"
                className="text-yellow-500 hover:text-yellow-600 transition-colors duration-300 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>Открыть сайт</span>
              </Link>
            </div>
            <Link
              href="/admin/dashboard"
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300"
            >
              Назад
            </Link>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {Object.entries(requirements).map(([section, data]) => (
              <div key={section} className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{data.title}</h2>
                <div className="space-y-4">
                  {data.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateItem(section as keyof RequirementsState, index, e.target.value)}
                        className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => removeItem(section as keyof RequirementsState, index)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addItem(section as keyof RequirementsState)}
                    className="text-yellow-600 hover:text-yellow-900 flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Добавить пункт</span>
                  </button>
                </div>
              </div>
            ))}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* Кнопки действий */}
            <div className="flex justify-end space-x-4">
              <Link
                href="/admin/dashboard"
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300"
              >
                Отмена
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-300 disabled:opacity-50"
              >
                {saving ? 'Сохранение...' : 'Сохранить изменения'}
              </button>
            </div>
          </form>
        </main>
      </div>
    </AdminGuard>
  );
} 