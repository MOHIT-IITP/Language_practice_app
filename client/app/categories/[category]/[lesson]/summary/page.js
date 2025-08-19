'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { use as usePromise } from 'react'

export default function LessonSummary({ params }) {
  const search = useSearchParams()
  const router = useRouter()
  const correct = Number(search.get('correct') || 0)
  const wrong = Number(search.get('wrong') || 0)
  const total = Number(search.get('total') || 0)
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0
  const unwrappedParams = usePromise(params)
  const { category, lesson } = unwrappedParams

  const goNext = () => {
    const totalLessons = Math.ceil((total || 10) / 10) // fallback; real total not known here
    const nextLesson = Number(lesson) + 1
    if (Number.isFinite(nextLesson)) {
      router.push(`/categories/${category}/${nextLesson}`)
    } else {
      router.push(`/categories/${category}`)
    }
  }

  return (
    <div className="min-h-screen w-full px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 py-10 md:py-16 bg-gradient-to-br from-[#eaddffa7] via-[#fff1c288] to-[#eed6ddb5] flex items-center justify-center">
      <div className="w-full max-w-2xl rounded-3xl border border-white/30 bg-white/60 backdrop-blur-xl p-6 sm:p-8 shadow-xl ring-1 ring-black/5">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Lesson Complete</h1>
          <p className="mt-1 text-gray-600">{category.charAt(0).toUpperCase() + category.slice(1)} — Lesson {lesson}</p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-green-50 border border-green-200 px-5 py-6 text-center">
            <div className="text-4xl font-extrabold text-green-600">{correct}</div>
            <div className="mt-1 text-sm font-medium text-green-700">Correct</div>
          </div>
          <div className="rounded-2xl bg-red-50 border border-red-200 px-5 py-6 text-center">
            <div className="text-4xl font-extrabold text-red-600">{wrong}</div>
            <div className="mt-1 text-sm font-medium text-red-700">Wrong</div>
          </div>
          <div className="rounded-2xl bg-indigo-50 border border-indigo-200 px-5 py-6 text-center">
            <div className="text-4xl font-extrabold text-indigo-600">{accuracy}%</div>
            <div className="mt-1 text-sm font-medium text-indigo-700">Accuracy</div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={goNext}
            className="w-full sm:w-auto px-6 py-3 rounded-full text-white font-medium bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-sm"
          >
            Continue
          </button>
          <Link
            href={`/categories/${category}`}
            className="w-full sm:w-auto px-6 py-3 rounded-full text-gray-800 font-medium bg-white/80 border border-gray-200 hover:bg-white text-center"
          >
            Back to category
          </Link>
        </div>
      </div>
    </div>
  )
}


