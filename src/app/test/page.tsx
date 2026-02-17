// src/app/test/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { getBooks } from '@/lib/api';  // ← তোর api.ts থেকে

export default function TestPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await getBooks();  // ← Railway backend থেকে ডাটা আসবে
        setBooks(data);
      } catch (err: any) {
        setErrorMsg(err.message || 'বই লোড করতে সমস্যা হয়েছে');
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  if (loading) {
    return <div className="p-6 text-white text-xl">লোড হচ্ছে... (Railway থেকে বই আনা হচ্ছে)</div>;
  }

  if (errorMsg) {
    return <div className="p-6 text-red-500 text-xl">এরর: {errorMsg}</div>;
  }

  if (books.length === 0) {
    return <div className="p-6 text-yellow-400 text-xl">কোনো বই পাওয়া যায়নি। backend-এ books টেবিলে ডাটা যোগ করো।</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Railway Backend থেকে বই লোড হয়েছে!</h1>
      <ul className="list-disc pl-8 space-y-3">
        {books.map((book: any) => (
          <li key={book.id} className="text-lg text-gray-200">
            <span className="font-semibold">{book.title}</span> — {book.author} 
            ({book.available_copies || 0} কপি)
          </li>
        ))}
      </ul>

      <pre className="mt-8 bg-gray-800 p-4 rounded text-sm text-gray-300 overflow-auto">
        {JSON.stringify(books, null, 2)}
      </pre>
    </div>
  );
}