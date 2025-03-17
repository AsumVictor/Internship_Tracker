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
import { ArrowRight, Lock, Mail, Briefcase, BarChart3, Trophy } from "lucide-react"
import { useDispatch } from "react-redux"
import axios from "axios"
import { AUTH } from "@/config/config"
import { setUser } from "@/redux/authSlice"

// Company logos for the animation
const companyLogos = [
  { name: "Google", url: "/logos/google.svg" },
  { name: "Microsoft", url: "/logos/microsoft.svg" },
  { name: "Apple", url: "/logos/apple.svg" },
  { name: "Amazon", url: "/logos/amazon.svg" },
  { name: "Meta", url: "/logos/meta.svg" },
  { name: "Netflix", url: "/logos/netflix.svg" },
  { name: "Tesla", url: "/logos/tesla.svg" },
  { name: "Spotify", url: "/logos/spotify.svg" },
]

// Job metrics for display
const jobMetrics = [
  { label: "Applications Tracked", value: "10,000+", icon: <Briefcase className="h-5 w-5 text-purple-500" /> },
  { label: "Success Rate", value: "68%", icon: <BarChart3 className="h-5 w-5 text-blue-500" /> },
  { label: "Job Offers", value: "2,500+", icon: <Trophy className="h-5 w-5 text-amber-500" /> },
]

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

const logoContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const logoVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 0.7,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
}

const metricsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
}

const metricVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
}

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { data } = await axios.post(`${AUTH}/login/`, {
        password,
        email,
      },{
        withCredentials: true
      });

      if (!data.success) {
        throw new Error(data.message);
      }

      dispatch(setUser(data.user));
      router.replace("/");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20">
      {/* Left Section - Login Form */}
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
                Welcome Back
              </motion.h1>
              <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-300 mt-2">
                Sign in to continue to your job application tracker
              </motion.p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium flex items-center">
                    <Lock className="h-4 w-4 mr-2 text-purple-600" />
                    Password
                  </Label>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
                    >
                      Forgot password?
                    </Link>
                  </motion.div>
                </div>
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

              <motion.div variants={itemVariants} className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
                  Remember me for 30 days
                </Label>
              </motion.div>

              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:shadow-lg"
                  disabled={isLoading}
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
                      Signing in...
                    </div>
                  ) : (
                    <div className="flex items-center group">
                      Sign in
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
                Don't have an account?{" "}
                <motion.span whileHover={{ scale: 1.05 }}>
                  <Link
                    href="/signup"
                    className="font-medium text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
                  >
                    Sign up
                  </Link>
                </motion.span>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Section - Animated Content */}
      <div className="w-full md:w-1/2 relative overflow-hidden hidden md:block">
        <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-br from-purple-600/10 via-blue-600/10 to-pink-600/10"></div>

        {/* Animated company logos */}
        <motion.div className="absolute inset-0" variants={logoContainerVariants} initial="hidden" animate="visible">
          {companyLogos.map((logo, index) => {
            // Calculate positions in a distributed manner
            const angle = (index / companyLogos.length) * 2 * Math.PI
            const radius = 35 // % from center
            const left = 50 + radius * Math.cos(angle)
            const top = 50 + radius * Math.sin(angle)

            return (
              <motion.div
                key={logo.name}
                className="absolute"
                variants={logoVariants}
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  transform: "translate(-50%, -50%)",
                }}
                animate={{
                  y: [0, -10, 0, 10, 0],
                  rotate: [0, 2, 0, -2, 0],
                  transition: {
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    delay: index * 0.5,
                  },
                }}
              >
                <motion.div
                  className="w-16 h-16 md:w-20 md:h-20 backdrop-blur-md bg-white/30 dark:bg-gray-900/30 rounded-full border border-white/20 shadow-lg flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <img
                    src={`/placeholder.svg?height=40&width=40`}
                    alt={logo.name}
                    className="w-10 h-10 object-contain"
                  />
                </motion.div>
                <div className="text-center mt-2 text-xs font-medium text-gray-700 dark:text-gray-300">{logo.name}</div>
              </motion.div>
            )
          })}
        </motion.div>

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
              Elevate Your Job Search
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-gray-700 dark:text-gray-300 mb-8"
            >
              Track your applications, prepare for interviews, and land your dream job with our comprehensive job
              application tracker.
            </motion.p>

            <motion.div variants={metricsContainerVariants} initial="hidden" animate="visible" className="space-y-4">
              {jobMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  variants={metricVariants}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                  className="flex items-center p-3 backdrop-blur-md bg-white/30 dark:bg-gray-800/30 rounded-lg border border-white/20 transition-all duration-300"
                >
                  <motion.div
                    className="mr-4"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                      delay: index * 0.5,
                    }}
                  >
                    {metric.icon}
                  </motion.div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</div>
                    <div className="text-xl font-bold text-gray-800 dark:text-gray-200">{metric.value}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

