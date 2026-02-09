import { supabase } from '@/lib/supabase'

export default async function TestPage() {
  const { data: books, error } = await supabase
    .from('books')
    .select('*')
    .limit(5) // প্রথমে ৫টা রেকর্ড দেখব

  if (error) {
    return (
      <div className="p-6 text-red-500 text-xl">
        এরর: {error.message}
      </div>
    )
  }

  if (!books || books.length === 0) {
    return (
      <div className="p-6 text-yellow-400 text-xl">
        কোনো বই পাওয়া যায়নি। Supabase-এ books টেবিলে টেস্ট ডাটা যোগ করো।
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Supabase থেকে বই লোড হয়েছে!</h1>
      <ul className="list-disc pl-8 space-y-3">
        {books.map((book: any) => (
          <li key={book.id} className="text-lg text-gray-200">
            <span className="font-semibold">{book.title}</span> — {book.author} 
            ({book.available_copies || 0} কপি)
          </li>
        ))}
      </ul>
    </div>
  )
}