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

old page.tsx was as below:
```
'use client'

import Image from "next/image";
import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { createServerClient } from '@/lib/supabase/server'

export default function Home() {

  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('announcements')
    .select('*')
  
  if (error) {
    return <div>{error.message}</div>
  }  
  
  useEffect(() => {
    async function test() {
      const { data, error } = await supabase
        .from('test')
        .select('*')

      console.log(data, error)
    }

    test()
  }, [])
  
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
		<h1>Announcements</h1>

		{data?.map((row) => (
		  <div key={row.id}>
		    {row.title}
		  </div>
		))}
		<pre>
          {JSON.stringify(data, null, 2)}
        </pre>
        <div><p>Supabase Connected</p></div>
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center. Red flag commit.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
```
