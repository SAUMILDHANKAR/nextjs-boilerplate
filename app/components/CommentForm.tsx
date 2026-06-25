'use client'

import { useState } from 'react'

export default function CommentForm() {
  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault()

    setLoading(true)
    setMessage('')

    const response = await fetch('/api/decentralbiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        comment,
      }),
    })

    if (response.ok) {
      setEmail('')
      setComment('')
      setMessage('Comment submitted!')
    } else {
      setMessage('Something went wrong.')
    }

    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-4 mt-12"
    >
      <h2 className="text-xl font-semibold">
        Leave a Comment
      </h2>

      <input
        type="email"
        placeholder="Email (optional)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded p-2 w-full"
      />

      <textarea
        placeholder="Comment"
        rows={5}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="border rounded p-2 w-full"
      />

      <button
        type="submit"
        disabled={!comment || loading}
        className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>

      {message && (
        <p className="text-sm">
          {message}
        </p>
      )}
    </form>
  )
}
