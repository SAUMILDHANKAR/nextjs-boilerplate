import { createServerClient } from '@/lib/supabase/server'
import CommentForm from './components/CommentForm'

export default async function Home() {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('announcements')
    .select('*')

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col py-32 px-16 bg-white dark:bg-black">

        <h1 className="text-2xl font-bold mb-6">
          Announcements
        </h1>

        {data?.length ? (
          <div className="space-y-4">
            {data.map((row) => (
              <div
                key={row.id}
                className="border rounded-md p-4 shadow-sm bg-zinc-100 dark:bg-zinc-800"
              >
                <h2 className="text-lg font-semibold">
                  {row.title}
                </h2>

                {row.content && (
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {row.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No announcements found.</p>
        )}

        <CommentForm />

      </main>
    </div>
  )
}
