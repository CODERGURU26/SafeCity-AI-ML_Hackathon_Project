"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError("Email is required")
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address")
      return false
    }
    if (!formData.password) {
      setError("Password is required")
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Check if user data exists in localStorage (for demo)
      const userData = localStorage.getItem("user-data")
      
      if (userData) {
        try {
          const parsedData = JSON.parse(userData)
          if (parsedData.email === formData.email && parsedData.password === formData.password) {
            // Save login session
            if (rememberMe) {
              localStorage.setItem("remember-me", JSON.stringify({ email: formData.email }))
            }
            localStorage.setItem("user-session", JSON.stringify({ email: formData.email, loggedIn: true }))
            setIsLoading(false)
            router.push("/")
          } else {
            setError("Invalid email or password")
            setIsLoading(false)
          }
        } catch (e) {
          setError("An error occurred. Please try again.")
          setIsLoading(false)
        }
      } else {
        // For demo: accept any credentials
        localStorage.setItem("user-session", JSON.stringify({ email: formData.email, loggedIn: true }))
        if (rememberMe) {
          localStorage.setItem("remember-me", JSON.stringify({ email: formData.email }))
        }
        setIsLoading(false)
        router.push("/")
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border-border">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 border-2 border-primary/30">
              <Lock className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">Sign In</CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your credentials to access SafeCity
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive border border-destructive/30 animate-in fade-in">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="officer@mumbaipolice.gov.in"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-secondary border-border text-foreground placeholder:text-muted-foreground pl-10"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-foreground">
                  Password
                </Label>
                <button
                  type="button"
                  onClick={() => router.push("/forgot-password")}
                  className="text-xs text-primary hover:underline font-medium"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-secondary border-border text-foreground placeholder:text-muted-foreground pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked)}
                className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label htmlFor="rememberMe" className="text-sm font-medium text-foreground cursor-pointer">
                Remember me
              </Label>
            </div>

            <Separator className="bg-border" />

            {/* Sign In Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base font-medium"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

            {/* Sign Up Link */}
            <div className="text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/signup")}
                  className="text-primary hover:underline font-medium"
                >
                  Create one
                </button>
              </p>
            </div>
          </form>

          {/* Demo Info */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground text-center mb-3">
              Demo Credentials
            </p>
            <div className="bg-secondary/50 rounded-lg p-3 space-y-2 text-xs text-muted-foreground">
              <p className="flex justify-between">
                <span className="font-medium">Email:</span>
                <span className="font-mono">demo@example.com</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Password:</span>
                <span className="font-mono">demo123</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
