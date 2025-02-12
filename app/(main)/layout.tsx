import type React from "react"
import { Sidebar } from "@/components/ui/sidebar"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto bg-background-grey">{children}</main>
    </div>
  )
}

