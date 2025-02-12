"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, HelpCircle, Menu, X, Briefcase, UserPlus, FileText, Calendar, Users, ClipboardCheck } from "lucide-react"

export const SidebarContext = React.createContext<{
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}>({
  isOpen: true,
  setIsOpen: () => {},
})

export const useSidebar = () => React.useContext(SidebarContext)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(true)
  return <SidebarContext.Provider value={{ isOpen, setIsOpen }}>{children}</SidebarContext.Provider>
}

export function Sidebar() {
  const { isOpen, setIsOpen } = useSidebar()
  const pathname = usePathname()

  const toggleSidebar = () => setIsOpen(!isOpen)

  const isActive = (path: string) => pathname === path

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/organization-structure", icon: Briefcase, label: "Organization Structure" },
    { href: "/team-management", icon: UserPlus, label: "Team Management" },
    { href: "/survey-templates", icon: FileText, label: "Survey Templates" },
    { href: "/quarterly-evaluations", icon: Calendar, label: "Quarterly Evaluations" },
    { href: "/team-member-evaluation", icon: ClipboardCheck, label: "Team Member Evaluation" },
    { href: "/dynamic-hierarchy-manager", icon: Users, label: "Hierarchy Manager" },
    { href: "/help", icon: HelpCircle, label: "Help & Support" },
  ]

  return (
    <aside className={`bg-telus-purple text-white transition-all duration-300 ${isOpen ? "w-64" : "w-16"}`}>
      <div className="flex items-center justify-between p-4 border-b border-white/20">
        {isOpen && <h2 className="text-xl font-bold">TELUS CSat</h2>}
        <Button variant="white" size="icon" onClick={toggleSidebar} className="shadow-md">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      <nav className="space-y-1 p-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
              isActive(item.href) ? "bg-white/20 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <item.icon className="h-5 w-5" />
            {isOpen && <span className="font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  )
}

