'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminGuard from '@/app/components/AdminGuard';

interface ContactData {
  id: string;
  address: string;
  phone: string;
  email: string;
  workingHours: {
    weekdays: string;
    weekends: string;
  };
  socialMedia: {
    vk: string;
    telegram: string;
    whatsapp: string;
  };
}

export default function EditContact() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contact, setContact] = useState<ContactData>({
    id: '',
    address: '',
    phone: '',
    email: '',
    workingHours: {
      weekdays: '',
      weekends: ''
    },
    socialMedia: {
      vk: '',
      telegram: '',
      whatsapp: ''
    }
  });

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const response = await fetch('/api/contact');
      if (!response.ok) throw new Error('Failed to fetch contact info');
      const data = await response.json();
      if (data) {
        setContact(data);
      }
    } catch (err) {
      setError('Ошибка при загрузке контактной информации');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      });

      if (!response.ok) throw new Error('Failed to update contact info');

      // Обновляем данные после успешного сохранения
      await fetchContact();
    } catch (err) {
      setError('Ошибка при сохранении контактной информации');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold text-gray-900">Редактирование контактов</h1>
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
            <div className="bg-white shadow rounded-lg p-6">
              <div className="space-y-6">
                {/* Адрес */}
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Адрес
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={contact.address}
                    onChange={(e) => setContact({ ...contact, address: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                    required
                  />
                </div>

                {/* Телефон */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                    required
                  />
                </div>

                {/* Часы работы */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Часы работы</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="weekdays" className="block text-sm font-medium text-gray-700">
                        Будние дни
                      </label>
                      <input
                        type="text"
                        id="weekdays"
                        value={contact.workingHours.weekdays}
                        onChange={(e) => setContact({
                          ...contact,
                          workingHours: { ...contact.workingHours, weekdays: e.target.value }
                        })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="weekends" className="block text-sm font-medium text-gray-700">
                        Выходные дни
                      </label>
                      <input
                        type="text"
                        id="weekends"
                        value={contact.workingHours.weekends}
                        onChange={(e) => setContact({
                          ...contact,
                          workingHours: { ...contact.workingHours, weekends: e.target.value }
                        })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Социальные сети */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Социальные сети</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="vk" className="block text-sm font-medium text-gray-700">
                        ВКонтакте
                      </label>
                      <input
                        type="url"
                        id="vk"
                        value={contact.socialMedia.vk}
                        onChange={(e) => setContact({
                          ...contact,
                          socialMedia: { ...contact.socialMedia, vk: e.target.value }
                        })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="telegram" className="block text-sm font-medium text-gray-700">
                        Telegram
                      </label>
                      <input
                        type="url"
                        id="telegram"
                        value={contact.socialMedia.telegram}
                        onChange={(e) => setContact({
                          ...contact,
                          socialMedia: { ...contact.socialMedia, telegram: e.target.value }
                        })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">
                        WhatsApp
                      </label>
                      <input
                        type="url"
                        id="whatsapp"
                        value={contact.socialMedia.whatsapp}
                        onChange={(e) => setContact({
                          ...contact,
                          socialMedia: { ...contact.socialMedia, whatsapp: e.target.value }
                        })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

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