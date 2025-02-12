import type React from "react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-telus-purple">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">{children}</div>
    </div>
  )
}

