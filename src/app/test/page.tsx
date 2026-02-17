// src/app/test/page.tsx
'use client'; // ← এটা যোগ করো কারণ useState + useEffect client-side

import { useState, useEffect } from 'react';
import { getBooks } from '@/lib/api'; // ← তোমার api.ts থেকে import

export default function TestPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const booksData = await getBooks(); // ← Railway backend থেকে ডাটা আনা
        setBooks(booksData);
      } catch (err: any) {
        setError(err.message || 'বই লোডে সমস্যা হয়েছে');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-xl text-white">
        লোড হচ্ছে... (Railway backend থেকে বই আনা হচ্ছে)
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500 text-xl">
        এরর: {error}
      </div>
    );
  }

  if (!books || books.length === 0) {
    return (
      <div className="p-6 text-yellow-400 text-xl">
        কোনো বই পাওয়া যায়নি। Railway backend-এ books টেবিলে টেস্ট ডাটা যোগ করো।
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">
        Railway Backend থেকে বই লোড হয়েছে!
      </h1>
      <ul className="list-disc pl-8 space-y-3">
        {books.map((book: any) => (
          <li key={book.id} className="text-lg text-gray-200">
            <span className="font-semibold">{book.title}</span> — {book.author} 
            ({book.available_copies || 0} কপি)
          </li>
        ))}
      </ul>

      {/* পরীক্ষার জন্য JSON দেখতে চাইলে যোগ করতে পারো */}
      <pre className="mt-8 bg-gray-800 p-4 rounded text-sm text-gray-300 overflow-auto">
        {JSON.stringify(books, null, 2)}
      </pre>
    </div>
  );
}