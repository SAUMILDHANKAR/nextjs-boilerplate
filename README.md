This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
# dont use npm, bad npm
# npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


Below page.tsx works in local and shows the table
```
// app/page.tsx
import { createServerClient } from '@/lib/supabase/server'

export default async function Home() {
  // Create Supabase client (server-side)
  const supabase = createServerClient()

  // Fetch announcements table
  const { data, error } = await supabase
    .from('announcements')
    .select('*')

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-2xl font-bold mb-6">Announcements</h1>

        {data?.length ? (
          <div className="w-full space-y-4">
            {data.map((row) => (
              <div
                key={row.id}
                className="border rounded-md p-4 shadow-sm bg-zinc-100 dark:bg-zinc-800"
              >
                <h2 className="text-lg font-semibold">{row.title}</h2>
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
      </main>
    </div>
  )
}
```
will troubleshoot the reasons later
