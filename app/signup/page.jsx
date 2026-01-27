"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    badgeNumber: "",
    phone: "",
    zone: "",
    rank: "",
    department: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError("Full name is required")
      return false
    }
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
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return false
    }
    if (!formData.phone.trim()) {
      setError("Phone number is required")
      return false
    }
    if (!formData.zone) {
      setError("Assigned zone is required")
      return false
    }
    if (!formData.rank) {
      setError("Rank is required")
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
      console.log("Signup data:", formData)
      // Save to localStorage for demo purposes
      localStorage.setItem("user-data", JSON.stringify(formData))
      setIsLoading(false)
      // Redirect to home or login page
      router.push("/")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-card border-border">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-bold text-foreground">Create Account</CardTitle>
          <CardDescription className="text-muted-foreground">
            Fill in your information to create a new SafeCity account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive border border-destructive/30">
                {error}
              </div>
            )}

            {/* Account Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Account Information</h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-foreground">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="officer@mumbaipolice.gov.in"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleChange}
                      className="bg-secondary border-border text-foreground placeholder:text-muted-foreground pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-foreground">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="bg-secondary border-border text-foreground placeholder:text-muted-foreground pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-border" />

            {/* Profile Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Profile Information</h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="badgeNumber" className="text-foreground">
                    Badge Number
                  </Label>
                  <Input
                    id="badgeNumber"
                    name="badgeNumber"
                    type="text"
                    placeholder="e.g., MH-4521"
                    value={formData.badgeNumber}
                    onChange={handleChange}
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zone" className="text-foreground">
                    Assigned Zone *
                  </Label>
                  <Select value={formData.zone} onValueChange={(value) => handleSelectChange("zone", value)}>
                    <SelectTrigger className="bg-secondary border-border text-foreground">
                      <SelectValue placeholder="Select a zone" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="zone1" className="text-foreground focus:bg-secondary">
                        Zone 1 - South
                      </SelectItem>
                      <SelectItem value="zone2" className="text-foreground focus:bg-secondary">
                        Zone 2 - Central
                      </SelectItem>
                      <SelectItem value="zone3" className="text-foreground focus:bg-secondary">
                        Zone 3 - West
                      </SelectItem>
                      <SelectItem value="zone4" className="text-foreground focus:bg-secondary">
                        Zone 4 - East
                      </SelectItem>
                      <SelectItem value="zone5" className="text-foreground focus:bg-secondary">
                        Zone 5 - North
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rank" className="text-foreground">
                    Rank *
                  </Label>
                  <Select value={formData.rank} onValueChange={(value) => handleSelectChange("rank", value)}>
                    <SelectTrigger className="bg-secondary border-border text-foreground">
                      <SelectValue placeholder="Select rank" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="constable" className="text-foreground focus:bg-secondary">
                        Constable
                      </SelectItem>
                      <SelectItem value="si" className="text-foreground focus:bg-secondary">
                        Sub-Inspector
                      </SelectItem>
                      <SelectItem value="inspector" className="text-foreground focus:bg-secondary">
                        Inspector
                      </SelectItem>
                      <SelectItem value="aci" className="text-foreground focus:bg-secondary">
                        ACI
                      </SelectItem>
                      <SelectItem value="dcp" className="text-foreground focus:bg-secondary">
                        DCP
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="department" className="text-foreground">
                    Department
                  </Label>
                  <Input
                    id="department"
                    name="department"
                    type="text"
                    placeholder="e.g., Crime Investigation Department"
                    value={formData.department}
                    onChange={handleChange}
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            </div>

            <Separator className="bg-border" />

            {/* Submit Button */}
            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base font-medium"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="text-primary hover:underline font-medium"
                >
                  Sign In
                </button>
              </p>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              * Required fields. By creating an account, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
