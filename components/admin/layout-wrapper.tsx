"use client"

import type React from "react"

import { AdminSidebar } from "./sidebar"

export function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1">{children}</div>
    </div>
  )
}
