"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  PlusCircle,
  Edit,
  Trash2,
  ExternalLink,
  Building,
  Briefcase,
  Calendar,
  Link2,
  FileText,
  Users,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define the JobApplication interface
interface JobApplication {
  id: string
  companyName: string
  role: string
  anticipatedOpeningDate: string
  applicationDeadline: string
  preStatus: string
  requirementsDocLink: string
  companyCareerWebsite: string
  onlineAssessment: string
  interviewRound1: string
  interviewRound2: string
  interviewRound3: string
  finalRound: string
  importantNotes: string
}

// Status options for dropdowns
const statusOptions = [
  "Not Started",
  "Researching",
  "Ready to Apply",
  "Applied",
  "Pending",
  "Scheduled",
  "Completed",
  "Rejected",
  "Offer Received",
  "Accepted",
]

// Sample data
const initialApplications: JobApplication[] = [
  {
    id: "1",
    companyName: "TechCorp",
    role: "Frontend Developer",
    anticipatedOpeningDate: "2025-04-01",
    applicationDeadline: "2025-04-15",
    preStatus: "Researching",
    requirementsDocLink: "https://example.com/requirements",
    companyCareerWebsite: "https://techcorp.com/careers",
    onlineAssessment: "Pending",
    interviewRound1: "Not Started",
    interviewRound2: "Not Started",
    interviewRound3: "Not Started",
    finalRound: "Not Started",
    importantNotes: "Need to prepare React and TypeScript skills",
  },
  {
    id: "2",
    companyName: "InnovateTech",
    role: "Full Stack Engineer",
    anticipatedOpeningDate: "2025-03-15",
    applicationDeadline: "2025-03-30",
    preStatus: "Ready to Apply",
    requirementsDocLink: "https://example.com/requirements2",
    companyCareerWebsite: "https://innovatetech.com/jobs",
    onlineAssessment: "Completed",
    interviewRound1: "Scheduled",
    interviewRound2: "Not Started",
    interviewRound3: "Not Started",
    finalRound: "Not Started",
    importantNotes: "Have a referral from John",
  },
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
}

const tableRowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  }),
  removed: {
    opacity: 0,
    x: -100,
    transition: { duration: 0.3 },
  },
}

export default function TechApplications() {
  const [applications, setApplications] = useState<JobApplication[]>(initialApplications)
  const [currentApplication, setCurrentApplication] = useState<JobApplication | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Partial<JobApplication>>({})

  const handleCreateOrUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const applicationData = {
      id: (formData.get("id") as string) || crypto.randomUUID(),
      companyName: formData.get("companyName") as string,
      role: formData.get("role") as string,
      anticipatedOpeningDate: formData.get("anticipatedOpeningDate") as string,
      applicationDeadline: formData.get("applicationDeadline") as string,
      preStatus: formData.get("preStatus") as string,
      requirementsDocLink: formData.get("requirementsDocLink") as string,
      companyCareerWebsite: formData.get("companyCareerWebsite") as string,
      onlineAssessment: formData.get("onlineAssessment") as string,
      interviewRound1: formData.get("interviewRound1") as string,
      interviewRound2: formData.get("interviewRound2") as string,
      interviewRound3: formData.get("interviewRound3") as string,
      finalRound: formData.get("finalRound") as string,
      importantNotes: formData.get("importantNotes") as string,
    }

    if (isEditing) {
      // Update existing application
      const updatedApplications = applications.map((app) => (app.id === applicationData.id ? applicationData : app))
      setApplications(updatedApplications)
      // In a real app, you would call the server action:
      // await updateTechApplication(applicationData)
    } else {
      // Create new application
      setApplications([...applications, applicationData])
      // In a real app, you would call the server action:
      // await createTechApplication(applicationData)
    }

    setCurrentApplication(null)
    setIsEditing(false)
    setFormData({})
  }

  const handleDelete = async (id: string) => {
    setApplications(applications.filter((app) => app.id !== id))
    // In a real app, you would call the server action:
    // await deleteTechApplication(id)
  }

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, string> = {
      "Not Started": "bg-gray-200 text-gray-800",
      Researching: "bg-blue-100 text-blue-800",
      "Ready to Apply": "bg-green-100 text-green-800",
      Applied: "bg-indigo-100 text-indigo-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Completed: "bg-green-100 text-green-800",
      Scheduled: "bg-purple-100 text-purple-800",
      Rejected: "bg-red-100 text-red-800",
      "Offer Received": "bg-emerald-100 text-emerald-800",
      Accepted: "bg-teal-100 text-teal-800",
    }

    return statusMap[status] || "bg-gray-200 text-gray-800"
  }

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants} className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Tech Job Applications</h2>
        <Dialog>
          <DialogTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => {
                  setCurrentApplication(null)
                  setIsEditing(false)
                  setFormData({})
                }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Application
              </Button>
            </motion.div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border border-white/20">
            <DialogHeader>
              <DialogTitle className="text-2xl">{isEditing ? "Edit Application" : "Add New Application"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateOrUpdate} className="space-y-6">
              {isEditing && <Input type="hidden" name="id" value={currentApplication?.id} />}

              <Tabs defaultValue="company" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="company">Company Info</TabsTrigger>
                  <TabsTrigger value="application">Application Status</TabsTrigger>
                  <TabsTrigger value="interview">Interview Process</TabsTrigger>
                </TabsList>

                <TabsContent value="company" className="space-y-4 p-2">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center mb-2"
                  >
                    <Building className="h-5 w-5 mr-2 text-purple-600" />
                    <h3 className="text-lg font-medium">Company Information</h3>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="companyName" className="text-sm font-medium">
                        Company Name
                      </Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        placeholder="Enter company name"
                        defaultValue={currentApplication?.companyName || ""}
                        value={formData.companyName}
                        onChange={(e) => handleFieldChange("companyName", e.target.value)}
                        className="bg-white/50 dark:bg-gray-800/50 border-white/20"
                        required
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="role" className="text-sm font-medium">
                        <div className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-1 text-purple-600" />
                          Role
                        </div>
                      </Label>
                      <Input
                        id="role"
                        name="role"
                        placeholder="Enter job title"
                        defaultValue={currentApplication?.role || ""}
                        value={formData.role}
                        onChange={(e) => handleFieldChange("role", e.target.value)}
                        className="bg-white/50 dark:bg-gray-800/50 border-white/20"
                        required
                      />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="companyCareerWebsite" className="text-sm font-medium">
                        <div className="flex items-center">
                          <Link2 className="h-4 w-4 mr-1 text-purple-600" />
                          Company Career Website
                        </div>
                      </Label>
                      <Input
                        id="companyCareerWebsite"
                        name="companyCareerWebsite"
                        placeholder="https://company.com/careers"
                        defaultValue={currentApplication?.companyCareerWebsite || ""}
                        value={formData.companyCareerWebsite}
                        onChange={(e) => handleFieldChange("companyCareerWebsite", e.target.value)}
                        className="bg-white/50 dark:bg-gray-800/50 border-white/20"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="requirementsDocLink" className="text-sm font-medium">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-1 text-purple-600" />
                          Requirements Doc Link
                        </div>
                      </Label>
                      <Input
                        id="requirementsDocLink"
                        name="requirementsDocLink"
                        placeholder="https://example.com/requirements"
                        defaultValue={currentApplication?.requirementsDocLink || ""}
                        value={formData.requirementsDocLink}
                        onChange={(e) => handleFieldChange("requirementsDocLink", e.target.value)}
                        className="bg-white/50 dark:bg-gray-800/50 border-white/20"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="importantNotes" className="text-sm font-medium">
                      Important Notes
                    </Label>
                    <Textarea
                      id="importantNotes"
                      name="importantNotes"
                      placeholder="Add any important details about the company or role"
                      defaultValue={currentApplication?.importantNotes || ""}
                      value={formData.importantNotes}
                      onChange={(e) => handleFieldChange("importantNotes", e.target.value)}
                      className="min-h-[100px] bg-white/50 dark:bg-gray-800/50 border-white/20"
                    />
                  </motion.div>
                </TabsContent>

                <TabsContent value="application" className="space-y-4 p-2">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center mb-2"
                  >
                    <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                    <h3 className="text-lg font-medium">Application Timeline</h3>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="anticipatedOpeningDate" className="text-sm font-medium">
                        Anticipated Opening Date
                      </Label>
                      <Input
                        id="anticipatedOpeningDate"
                        name="anticipatedOpeningDate"
                        type="date"
                        defaultValue={currentApplication?.anticipatedOpeningDate || ""}
                        value={formData.anticipatedOpeningDate}
                        onChange={(e) => handleFieldChange("anticipatedOpeningDate", e.target.value)}
                        className="bg-white/50 dark:bg-gray-800/50 border-white/20"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="applicationDeadline" className="text-sm font-medium">
                        Application Deadline
                      </Label>
                      <Input
                        id="applicationDeadline"
                        name="applicationDeadline"
                        type="date"
                        defaultValue={currentApplication?.applicationDeadline || ""}
                        value={formData.applicationDeadline}
                        onChange={(e) => handleFieldChange("applicationDeadline", e.target.value)}
                        className="bg-white/50 dark:bg-gray-800/50 border-white/20"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="preStatus" className="text-sm font-medium">
                      Pre-Application Status
                    </Label>
                    <Select
                      name="preStatus"
                      defaultValue={currentApplication?.preStatus || "Not Started"}
                      onValueChange={(value) => handleFieldChange("preStatus", value)}
                    >
                      <SelectTrigger className="bg-white/50 dark:bg-gray-800/50 border-white/20">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((status) => (
                          <SelectItem key={status} value={status}>
                            <div className="flex items-center">
                              <span
                                className={`w-2 h-2 rounded-full mr-2 ${getStatusBadge(status).split(" ")[0]}`}
                              ></span>
                              {status}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="onlineAssessment" className="text-sm font-medium">
                      Online Assessment Status
                    </Label>
                    <Select
                      name="onlineAssessment"
                      defaultValue={currentApplication?.onlineAssessment || "Not Started"}
                      onValueChange={(value) => handleFieldChange("onlineAssessment", value)}
                    >
                      <SelectTrigger className="bg-white/50 dark:bg-gray-800/50 border-white/20">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((status) => (
                          <SelectItem key={status} value={status}>
                            <div className="flex items-center">
                              <span
                                className={`w-2 h-2 rounded-full mr-2 ${getStatusBadge(status).split(" ")[0]}`}
                              ></span>
                              {status}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>
                </TabsContent>

                <TabsContent value="interview" className="space-y-4 p-2">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center mb-2"
                  >
                    <Users className="h-5 w-5 mr-2 text-purple-600" />
                    <h3 className="text-lg font-medium">Interview Process</h3>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="interviewRound1" className="text-sm font-medium">
                        Interview Round 1
                      </Label>
                      <Select
                        name="interviewRound1"
                        defaultValue={currentApplication?.interviewRound1 || "Not Started"}
                        onValueChange={(value) => handleFieldChange("interviewRound1", value)}
                      >
                        <SelectTrigger className="bg-white/50 dark:bg-gray-800/50 border-white/20">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((status) => (
                            <SelectItem key={status} value={status}>
                              <div className="flex items-center">
                                <span
                                  className={`w-2 h-2 rounded-full mr-2 ${getStatusBadge(status).split(" ")[0]}`}
                                ></span>
                                {status}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="interviewRound2" className="text-sm font-medium">
                        Interview Round 2
                      </Label>
                      <Select
                        name="interviewRound2"
                        defaultValue={currentApplication?.interviewRound2 || "Not Started"}
                        onValueChange={(value) => handleFieldChange("interviewRound2", value)}
                      >
                        <SelectTrigger className="bg-white/50 dark:bg-gray-800/50 border-white/20">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((status) => (
                            <SelectItem key={status} value={status}>
                              <div className="flex items-center">
                                <span
                                  className={`w-2 h-2 rounded-full mr-2 ${getStatusBadge(status).split(" ")[0]}`}
                                ></span>
                                {status}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="interviewRound3" className="text-sm font-medium">
                        Interview Round 3
                      </Label>
                      <Select
                        name="interviewRound3"
                        defaultValue={currentApplication?.interviewRound3 || "Not Started"}
                        onValueChange={(value) => handleFieldChange("interviewRound3", value)}
                      >
                        <SelectTrigger className="bg-white/50 dark:bg-gray-800/50 border-white/20">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((status) => (
                            <SelectItem key={status} value={status}>
                              <div className="flex items-center">
                                <span
                                  className={`w-2 h-2 rounded-full mr-2 ${getStatusBadge(status).split(" ")[0]}`}
                                ></span>
                                {status}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="finalRound" className="text-sm font-medium">
                        Final Round
                      </Label>
                      <Select
                        name="finalRound"
                        defaultValue={currentApplication?.finalRound || "Not Started"}
                        onValueChange={(value) => handleFieldChange("finalRound", value)}
                      >
                        <SelectTrigger className="bg-white/50 dark:bg-gray-800/50 border-white/20">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((status) => (
                            <SelectItem key={status} value={status}>
                              <div className="flex items-center">
                                <span
                                  className={`w-2 h-2 rounded-full mr-2 ${getStatusBadge(status).split(" ")[0]}`}
                                ></span>
                                {status}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline" className="border-white/20">
                    Cancel
                  </Button>
                </DialogClose>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    {isEditing ? "Update" : "Add"} Application
                  </Button>
                </motion.div>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>

      <motion.div variants={itemVariants} className="overflow-x-auto">
        <Table className="backdrop-blur-md bg-white/10 dark:bg-gray-900/10 border border-white/10 rounded-lg">
          <TableHeader className="bg-white/20 dark:bg-gray-800/20">
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assessment</TableHead>
              <TableHead>Interview Progress</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {applications.map((application, index) => (
                <motion.tr
                  key={application.id}
                  custom={index}
                  variants={tableRowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="removed"
                  className="hover:bg-white/20 dark:hover:bg-gray-800/20 cursor-pointer"
                  onClick={() => {
                    setCurrentApplication(application)
                    setIsEditing(false)
                  }}
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                >
                  <TableCell className="font-medium">{application.companyName}</TableCell>
                  <TableCell>{application.role}</TableCell>
                  <TableCell>{application.applicationDeadline}</TableCell>
                  <TableCell>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Badge className={getStatusBadge(application.preStatus)}>{application.preStatus}</Badge>
                    </motion.div>
                  </TableCell>
                  <TableCell>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Badge className={getStatusBadge(application.onlineAssessment)}>
                        {application.onlineAssessment}
                      </Badge>
                    </motion.div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      {["interviewRound1", "interviewRound2", "interviewRound3", "finalRound"].map((round, i) => (
                        <motion.div
                          key={round}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            transition: { delay: 0.3 + i * 0.1 },
                          }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Badge className={getStatusBadge(application[round as keyof JobApplication] as string)}>
                            {round === "interviewRound1"
                              ? "R1"
                              : round === "interviewRound2"
                                ? "R2"
                                : round === "interviewRound3"
                                  ? "R3"
                                  : "Final"}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation()
                              setCurrentApplication(application)
                              setIsEditing(true)
                              setFormData(application)
                            }}
                          >
                            <Button variant="outline" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[800px] backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border border-white/20">
                          {/* Edit dialog content - similar to add form */}
                        </DialogContent>
                      </Dialog>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(application.id)
                        }}
                      >
                        <Button variant="outline" size="icon" className="text-red-500 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </motion.div>

      {currentApplication && (
        <Dialog open={!!currentApplication} onOpenChange={(open) => !open && setCurrentApplication(null)}>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border border-white/20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {currentApplication.companyName} - {currentApplication.role}
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <Building className="h-5 w-5 mr-2 text-purple-600" />
                      Company Information
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-medium">Company:</div>
                      <div>{currentApplication.companyName}</div>

                      <div className="font-medium">Role:</div>
                      <div>{currentApplication.role}</div>

                      <div className="font-medium">Career Website:</div>
                      <div>
                        {currentApplication.companyCareerWebsite && (
                          <motion.a
                            whileHover={{ scale: 1.05 }}
                            href={currentApplication.companyCareerWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            <span className="mr-1">Visit</span>
                            <ExternalLink className="h-3 w-3" />
                          </motion.a>
                        )}
                      </div>

                      <div className="font-medium">Requirements:</div>
                      <div>
                        {currentApplication.requirementsDocLink && (
                          <motion.a
                            whileHover={{ scale: 1.05 }}
                            href={currentApplication.requirementsDocLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            <span className="mr-1">View</span>
                            <ExternalLink className="h-3 w-3" />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                      Application Timeline
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-medium">Opening Date:</div>
                      <div>{currentApplication.anticipatedOpeningDate}</div>

                      <div className="font-medium">Deadline:</div>
                      <div>{currentApplication.applicationDeadline}</div>

                      <div className="font-medium">Status:</div>
                      <div>
                        <motion.div whileHover={{ scale: 1.05 }}>
                          <Badge className={getStatusBadge(currentApplication.preStatus)}>
                            {currentApplication.preStatus}
                          </Badge>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <Users className="h-5 w-5 mr-2 text-purple-600" />
                      Interview Progress
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-medium">Online Assessment:</div>
                      <div>
                        <motion.div whileHover={{ scale: 1.05 }}>
                          <Badge className={getStatusBadge(currentApplication.onlineAssessment)}>
                            {currentApplication.onlineAssessment}
                          </Badge>
                        </motion.div>
                      </div>

                      <div className="font-medium">Round 1:</div>
                      <div>
                        <motion.div whileHover={{ scale: 1.05 }}>
                          <Badge className={getStatusBadge(currentApplication.interviewRound1)}>
                            {currentApplication.interviewRound1}
                          </Badge>
                        </motion.div>
                      </div>

                      <div className="font-medium">Round 2:</div>
                      <div>
                        <motion.div whileHover={{ scale: 1.05 }}>
                          <Badge className={getStatusBadge(currentApplication.interviewRound2)}>
                            {currentApplication.interviewRound2}
                          </Badge>
                        </motion.div>
                      </div>

                      <div className="font-medium">Round 3:</div>
                      <div>
                        <motion.div whileHover={{ scale: 1.05 }}>
                          <Badge className={getStatusBadge(currentApplication.interviewRound3)}>
                            {currentApplication.interviewRound3}
                          </Badge>
                        </motion.div>
                      </div>

                      <div className="font-medium">Final Round:</div>
                      <div>
                        <motion.div whileHover={{ scale: 1.05 }}>
                          <Badge className={getStatusBadge(currentApplication.finalRound)}>
                            {currentApplication.finalRound}
                          </Badge>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-purple-600" />
                      Notes
                    </h3>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                      className="p-3 bg-white/30 dark:bg-gray-800/30 rounded-md text-sm min-h-[100px]"
                    >
                      {currentApplication.importantNotes}
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              <DialogFooter className="flex justify-between items-center">
                <div className="flex gap-2">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-100 border-white/20"
                      onClick={() => {
                        handleDelete(currentApplication.id)
                        setCurrentApplication(null)
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </motion.div>
                </div>
                <div className="flex gap-2">
                  <DialogClose asChild>
                    <Button variant="outline" className="border-white/20">
                      Close
                    </Button>
                  </DialogClose>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => {
                        setIsEditing(true)
                        setFormData(currentApplication)
                      }}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </motion.div>
                </div>
              </DialogFooter>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </motion.div>
  )
}

