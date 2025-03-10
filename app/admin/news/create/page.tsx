'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AdminGuard from '@/app/components/AdminGuard';

export default function CreateNews() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [news, setNews] = useState({
    title: '',
    content: '',
    status: 'draft' as 'published' | 'draft',
    image: null as File | null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let imageUrl = null;
      if (news.image) {
        // Здесь должна быть логика загрузки изображения
        // Например, загрузка на сервер или в облачное хранилище
        imageUrl = URL.createObjectURL(news.image);
      }

      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...news,
          image: imageUrl,
        }),
      });

      if (!response.ok) throw new Error('Failed to create news');

      router.push('/admin/news/list');
    } catch (err) {
      setError('Ошибка при создании новости');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNews({ ...news, image: e.target.files[0] });
    }
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold text-gray-900">Создание новости</h1>
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
              href="/admin/news/list"
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
                {/* Заголовок */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Заголовок
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={news.title}
                    onChange={(e) => setNews({ ...news, title: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                    required
                  />
                </div>

                {/* Содержание */}
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                    Содержание
                  </label>
                  <textarea
                    id="content"
                    rows={10}
                    value={news.content}
                    onChange={(e) => setNews({ ...news, content: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                    required
                  />
                </div>

                {/* Изображение */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Изображение
                  </label>
                  <div className="mt-1 flex items-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-yellow-50 file:text-yellow-700
                        hover:file:bg-yellow-100"
                    />
                  </div>
                </div>

                {/* Статус */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Статус
                  </label>
                  <select
                    value={news.status}
                    onChange={(e) => setNews({ ...news, status: e.target.value as 'published' | 'draft' })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                  >
                    <option value="draft">Черновик</option>
                    <option value="published">Опубликовать</option>
                  </select>
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
                href="/admin/news/list"
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300"
              >
                Отмена
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-300 disabled:opacity-50"
              >
                {loading ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </form>
        </main>
      </div>
    </AdminGuard>
  );
} 