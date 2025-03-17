"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, User, Mail, Lock, CheckCircle } from "lucide-react"

// Framer Motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
}

const featureContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
}

const featureVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
}

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate account creation
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20">
      {/* Left Section - Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md backdrop-blur-md bg-white/40 dark:bg-gray-900/40 rounded-2xl border border-white/20 shadow-xl p-8"
        >
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            <div className="mb-8 text-center">
              <motion.h1
                variants={itemVariants}
                className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
              >
                Create Account
              </motion.h1>
              <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-300 mt-2">
                Sign up to start tracking your job applications
              </motion.p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium flex items-center">
                  <User className="h-4 w-4 mr-2 text-purple-600" />
                  Full Name
                </Label>
                <motion.div whileFocus={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white/50 dark:bg-gray-800/50 border-white/20 transition-all duration-300 focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-purple-600" />
                  Email
                </Label>
                <motion.div whileFocus={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/50 dark:bg-gray-800/50 border-white/20 transition-all duration-300 focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium flex items-center">
                  <Lock className="h-4 w-4 mr-2 text-purple-600" />
                  Password
                </Label>
                <motion.div whileFocus={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/50 dark:bg-gray-800/50 border-white/20 transition-all duration-300 focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-purple-600" />
                  Confirm Password
                </Label>
                <motion.div whileFocus={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-white/50 dark:bg-gray-800/50 border-white/20 transition-all duration-300 focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  required
                />
                <Label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
                  I agree to the{" "}
                  <motion.span whileHover={{ scale: 1.05 }}>
                    <Link
                      href="/terms"
                      className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
                    >
                      Terms of Service
                    </Link>
                  </motion.span>{" "}
                  and{" "}
                  <motion.span whileHover={{ scale: 1.05 }}>
                    <Link
                      href="/privacy"
                      className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
                    >
                      Privacy Policy
                    </Link>
                  </motion.span>
                </Label>
              </motion.div>

              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:shadow-lg"
                  disabled={isLoading || !agreeTerms}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating account...
                    </div>
                  ) : (
                    <div className="flex items-center group">
                      Create Account
                      <motion.div
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </motion.div>
                    </div>
                  )}
                </Button>
              </motion.div>

              <motion.div variants={itemVariants} className="text-center text-sm text-gray-600 dark:text-gray-300">
                Already have an account?{" "}
                <motion.span whileHover={{ scale: 1.05 }}>
                  <Link
                    href="/login"
                    className="font-medium text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
                  >
                    Sign in
                  </Link>
                </motion.span>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Section - Features */}
      <div className="w-full md:w-1/2 relative overflow-hidden hidden md:block">
        <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-br from-purple-600/10 via-blue-600/10 to-pink-600/10"></div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="backdrop-blur-md bg-white/40 dark:bg-gray-900/40 rounded-2xl border border-white/20 shadow-xl p-8 max-w-md"
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
            >
              Why Join Us?
            </motion.h2>

            <motion.div variants={featureContainerVariants} initial="hidden" animate="visible" className="space-y-6">
              <motion.div variants={featureVariants} whileHover={{ x: 5 }} className="flex items-start">
                <motion.div
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-4"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                >
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    ></path>
                  </svg>
                </motion.div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Organized Tracking</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Keep all your job applications in one place with detailed status tracking.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={featureVariants} whileHover={{ x: 5 }} className="flex items-start">
                <motion.div
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    delay: 0.5,
                  }}
                >
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                </motion.div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Boost Productivity</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Increase your application success rate with our structured approach.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={featureVariants} whileHover={{ x: 5 }} className="flex items-start">
                <motion.div
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-4"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    delay: 1,
                  }}
                >
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    ></path>
                  </svg>
                </motion.div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Secure & Private</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your data is encrypted and never shared with third parties.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

