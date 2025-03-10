import { prisma } from '@/lib/prisma';

async function getNews() {
  const news = await prisma.news.findMany({
    where: {
      status: 'published',
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return news;
}

export default async function NewsPage() {
  const news = await getNews();

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Новости</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <article key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h2>
                <p className="text-gray-600 mb-4">{item.content}</p>
                <time className="text-sm text-gray-500">
                  {new Date(item.createdAt).toLocaleDateString('ru-RU')}
                </time>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
} 