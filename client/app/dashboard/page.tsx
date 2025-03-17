"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TechApplications from "@/components/tech-applications"
import FinanceApplications from "@/components/finance-applications"
import OtherApplications from "@/components/other-applications"
import NetworkingContacts from "@/components/networking-contacts"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

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

export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20"
    >
      <div className="container mx-auto py-8 px-4">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex items-center mb-8">
          <motion.div variants={itemVariants}>
            <Link href="/">
              <motion.div whileHover={{ x: -5 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" className="mr-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Overview
                </Button>
              </motion.div>
            </Link>
          </motion.div>
          <motion.div variants={itemVariants} className="text-center flex-1">
            <motion.h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Job Application Tracker
            </motion.h1>
            <motion.p className="text-muted-foreground mt-2">
              Track and manage your job applications in one place
            </motion.p>
          </motion.div>
          <div className="w-[100px]"></div> {/* This creates balance with the back button */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="backdrop-blur-md bg-white/30 dark:bg-gray-900/30 rounded-xl border border-white/20 shadow-xl p-6"
        >
          <Tabs defaultValue="tech" className="w-full">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <TabsList className="grid grid-cols-4 mb-8">
                {["tech", "finance", "other", "networking"].map((tab, index) => (
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    <TabsTrigger value={tab} className="capitalize">
                      {tab}
                    </TabsTrigger>
                  </motion.div>
                ))}
              </TabsList>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }}>
              <TabsContent value="tech">
                <TechApplications />
              </TabsContent>
              <TabsContent value="finance">
                <FinanceApplications />
              </TabsContent>
              <TabsContent value="other">
                <OtherApplications />
              </TabsContent>
              <TabsContent value="networking">
                <NetworkingContacts />
              </TabsContent>
            </motion.div>
          </Tabs>
        </motion.div>
      </div>
    </motion.div>
  )
}

