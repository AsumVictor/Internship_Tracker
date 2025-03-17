"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, Users, Briefcase, BarChart3, ArrowRight } from "lucide-react"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
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

const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
}

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20"
    >
      <div className="container mx-auto py-8 px-4">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mb-8 text-center">
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
          >
            Career Progression Hub
          </motion.h1>
          <motion.p variants={itemVariants} className="text-muted-foreground mt-2">
            Track, manage, and optimize your job search journey
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="backdrop-blur-md bg-white/30 dark:bg-gray-900/30 rounded-xl border border-white/20 shadow-xl p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <div className="flex items-center mb-4">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    backgroundColor: ["rgb(59, 130, 246)", "rgb(99, 102, 241)", "rgb(59, 130, 246)"],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                  className="w-4 h-4 rounded-full bg-blue-500 mr-2"
                />
                <h2 className="text-xl font-semibold">Project Status</h2>
                <Badge className="ml-3 bg-blue-100 text-blue-800">In Progress</Badge>
              </div>

              <div className="space-y-4">
                <motion.div variants={itemVariants} className="flex items-center">
                  <CalendarDays className="h-5 w-5 mr-2 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-300 w-32">Last Updated:</span>
                  <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-300 w-32">Target Date:</span>
                  <span className="font-medium">June 30, 2025</span>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-300 w-32">Networking:</span>
                  <span className="font-medium">12 Contacts</span>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-300 w-32">Applications:</span>
                  <span className="font-medium">24 Total</span>
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex items-center mb-4">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    backgroundColor: ["rgb(168, 85, 247)", "rgb(192, 132, 252)", "rgb(168, 85, 247)"],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                  className="w-4 h-4 rounded-full bg-purple-500 mr-2"
                />
                <h2 className="text-xl font-semibold">Description</h2>
              </div>

              <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-300 mb-4">
                This dashboard provides real-time insights into your job application progress, networking efforts, and
                interview performance metrics to optimize your career search strategy.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mt-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Badge variant="outline" className="bg-white/50 dark:bg-gray-800/50">
                    <BarChart3 className="h-3 w-3 mr-1" />
                    Dashboard
                  </Badge>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Badge variant="outline" className="bg-white/50 dark:bg-gray-800/50">
                    Tech
                  </Badge>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Badge variant="outline" className="bg-white/50 dark:bg-gray-800/50">
                    Finance
                  </Badge>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Badge variant="outline" className="bg-white/50 dark:bg-gray-800/50">
                    Networking
                  </Badge>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          <motion.div variants={cardVariants} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
            <Card className="backdrop-blur-md bg-white/30 dark:bg-gray-900/30 border border-white/20 shadow-lg hover:shadow-xl transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Application Metrics</CardTitle>
                <CardDescription>Track your application progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Tech Applications</span>
                    <span className="font-medium">8</span>
                  </div>
                  <motion.div
                    className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <motion.div
                      className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "40%" }}
                      transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
                    />
                  </motion.div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Finance Applications</span>
                    <span className="font-medium">6</span>
                  </div>
                  <motion.div
                    className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <motion.div
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "30%" }}
                      transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                    />
                  </motion.div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Other Applications</span>
                    <span className="font-medium">10</span>
                  </div>
                  <motion.div
                    className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <motion.div
                      className="bg-gradient-to-r from-pink-600 to-purple-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "50%" }}
                      transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
                    />
                  </motion.div>
                </div>
              </CardContent>
              <CardFooter>
                <motion.div whileHover={{ x: 5 }} className="ml-auto">
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
            <Card className="backdrop-blur-md bg-white/30 dark:bg-gray-900/30 border border-white/20 shadow-lg hover:shadow-xl transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Interview Status</CardTitle>
                <CardDescription>Track your interview progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Scheduled</span>
                    <span className="font-medium">3</span>
                  </div>
                  <motion.div
                    className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <motion.div
                      className="bg-purple-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "15%" }}
                      transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
                    />
                  </motion.div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Completed</span>
                    <span className="font-medium">5</span>
                  </div>
                  <motion.div
                    className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <motion.div
                      className="bg-blue-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "25%" }}
                      transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                    />
                  </motion.div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Advanced Rounds</span>
                    <span className="font-medium">2</span>
                  </div>
                  <motion.div
                    className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <motion.div
                      className="bg-green-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "10%" }}
                      transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
                    />
                  </motion.div>
                </div>
              </CardContent>
              <CardFooter>
                <motion.div whileHover={{ x: 5 }} className="ml-auto">
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
            <Card className="backdrop-blur-md bg-white/30 dark:bg-gray-900/30 border border-white/20 shadow-lg hover:shadow-xl transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Networking</CardTitle>
                <CardDescription>Track your networking efforts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Contacts Made</span>
                    <span className="font-medium">12</span>
                  </div>
                  <motion.div
                    className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <motion.div
                      className="bg-gradient-to-r from-green-600 to-teal-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "60%" }}
                      transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
                    />
                  </motion.div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Referrals</span>
                    <span className="font-medium">4</span>
                  </div>
                  <motion.div
                    className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <motion.div
                      className="bg-gradient-to-r from-green-600 to-teal-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "20%" }}
                      transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                    />
                  </motion.div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Follow-ups</span>
                    <span className="font-medium">8</span>
                  </div>
                  <motion.div
                    className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <motion.div
                      className="bg-gradient-to-r from-green-600 to-teal-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "40%" }}
                      transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
                    />
                  </motion.div>
                </div>
              </CardContent>
              <CardFooter>
                <motion.div whileHover={{ x: 5 }} className="ml-auto">
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex justify-center"
        >
          <Link href="/dashboard">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
                <span className="text-lg">Go to Job Application Tracker</span>
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.div>
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

