'use client';

import React from 'react';
import Link from 'next/link';
import AdminGuard from '@/app/components/AdminGuard';

export default function AdminDashboard() {
  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    window.location.href = '/admin/login';
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold text-gray-900">Админ-панель</h1>
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
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
            >
              Выйти
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Управление контентом */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Управление контентом</h2>
              <div className="space-y-4">
                <Link
                  href="/admin/content/about"
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                >
                  <h3 className="text-lg font-medium text-gray-900">О нас</h3>
                  <p className="text-sm text-gray-500">Редактирование информации о компании</p>
                </Link>
                <Link
                  href="/admin/content/requirements"
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                >
                  <h3 className="text-lg font-medium text-gray-900">Требования</h3>
                  <p className="text-sm text-gray-500">Редактирование требований к водителям</p>
                </Link>
                <Link
                  href="/admin/content/contact"
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                >
                  <h3 className="text-lg font-medium text-gray-900">Контакты</h3>
                  <p className="text-sm text-gray-500">Редактирование контактной информации</p>
                </Link>
              </div>
            </div>

            {/* Управление новостями */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Управление новостями</h2>
              <div className="space-y-4">
                <Link
                  href="/admin/news/create"
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                >
                  <h3 className="text-lg font-medium text-gray-900">Добавить новость</h3>
                  <p className="text-sm text-gray-500">Создание новой новости</p>
                </Link>
                <Link
                  href="/admin/news/list"
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                >
                  <h3 className="text-lg font-medium text-gray-900">Список новостей</h3>
                  <p className="text-sm text-gray-500">Управление существующими новостями</p>
                </Link>
              </div>
            </div>

            {/* Управление водителями */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Управление водителями</h2>
              <div className="space-y-4">
                <Link
                  href="/admin/drivers/list"
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                >
                  <h3 className="text-lg font-medium text-gray-900">Список водителей</h3>
                  <p className="text-sm text-gray-500">Управление зарегистрированными водителями</p>
                </Link>
                <Link
                  href="/admin/drivers/applications"
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                >
                  <h3 className="text-lg font-medium text-gray-900">Заявки на регистрацию</h3>
                  <p className="text-sm text-gray-500">Рассмотрение новых заявок</p>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AdminGuard>
  );
} 