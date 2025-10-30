"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MessageSquare, Clock } from "lucide-react"
import { useState } from "react"

export default function HelpPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send to a backend
    alert("Thank you for your message! We'll get back to you soon.")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Help & Support</h1>
          <p className="text-lg text-muted-foreground">
            We're here to help! Find answers and get in touch with our support team.
          </p>
        </div>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 text-center hover:shadow-lg transition">
            <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Email Support</h3>
            <p className="text-sm text-muted-foreground mb-3">support@craftmemories.com</p>
            <p className="text-xs text-muted-foreground">Response within 24 hours</p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition">
            <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Phone Support</h3>
            <p className="text-sm text-muted-foreground mb-3">+1 (234) 567-890</p>
            <p className="text-xs text-muted-foreground">Mon-Fri, 9AM-6PM EST</p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition">
            <MessageSquare className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Live Chat</h3>
            <p className="text-sm text-muted-foreground mb-3">Chat with us online</p>
            <p className="text-xs text-muted-foreground">Available during business hours</p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition">
            <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Business Hours</h3>
            <p className="text-sm text-muted-foreground mb-3">Monday - Friday</p>
            <p className="text-xs text-muted-foreground">9:00 AM - 6:00 PM EST</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Help Topics */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Help Topics</h2>
            <div className="space-y-3">
              {[
                { title: "Getting Started", desc: "Learn how to browse and shop" },
                { title: "Customization Guide", desc: "How to customize your products" },
                { title: "Shipping & Delivery", desc: "Track your orders and shipping" },
                { title: "Returns & Refunds", desc: "Our return policy and process" },
                { title: "Account Management", desc: "Manage your profile and settings" },
                { title: "Payment Issues", desc: "Troubleshoot payment problems" },
              ].map((topic, idx) => (
                <Card key={idx} className="p-4 hover:bg-muted transition cursor-pointer">
                  <h4 className="font-semibold text-foreground">{topic.title}</h4>
                  <p className="text-sm text-muted-foreground">{topic.desc}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <Card className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={4}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
