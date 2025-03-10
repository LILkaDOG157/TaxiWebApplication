'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AdminGuard from '@/app/components/AdminGuard';

export default function EditAbout() {
  const [content, setContent] = useState({
    title: 'О компании',
    description: 'Мы предоставляем качественные услуги такси с 2010 года...',
    mission: 'Наша миссия - обеспечить безопасный и комфортный сервис...',
    values: [
      {
        title: 'Безопасность',
        description: 'Безопасность наших клиентов - главный приоритет...'
      },
      {
        title: 'Качество',
        description: 'Мы стремимся к высокому качеству обслуживания...'
      },
      {
        title: 'Команда',
        description: 'Наша команда - это профессионалы с многолетним опытом...'
      }
    ]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика сохранения данных
    console.log('Saving content:', content);
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold text-gray-900">Редактирование раздела "О нас"</h1>
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
            {/* Основная информация */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Основная информация</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Заголовок
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={content.title}
                    onChange={(e) => setContent({ ...content, title: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Описание
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    value={content.description}
                    onChange={(e) => setContent({ ...content, description: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
                <div>
                  <label htmlFor="mission" className="block text-sm font-medium text-gray-700">
                    Миссия
                  </label>
                  <textarea
                    id="mission"
                    rows={3}
                    value={content.mission}
                    onChange={(e) => setContent({ ...content, mission: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
              </div>
            </div>

            {/* Ценности */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Ценности компании</h2>
              <div className="space-y-6">
                {content.values.map((value, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Ценность {index + 1}</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Заголовок
                        </label>
                        <input
                          type="text"
                          value={value.title}
                          onChange={(e) => {
                            const newValues = [...content.values];
                            newValues[index] = { ...value, title: e.target.value };
                            setContent({ ...content, values: newValues });
                          }}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Описание
                        </label>
                        <textarea
                          rows={3}
                          value={value.description}
                          onChange={(e) => {
                            const newValues = [...content.values];
                            newValues[index] = { ...value, description: e.target.value };
                            setContent({ ...content, values: newValues });
                          }}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Кнопки действий */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-300"
              >
                Сохранить изменения
              </button>
            </div>
          </form>
        </main>
      </div>
    </AdminGuard>
  );
} 