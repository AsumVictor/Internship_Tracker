"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle, Edit, Trash2, ExternalLink } from "lucide-react"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

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

// Sample data
const initialApplications: JobApplication[] = [
  {
    id: "1",
    companyName: "Creative Agency",
    role: "Marketing Specialist",
    anticipatedOpeningDate: "2025-04-01",
    applicationDeadline: "2025-04-15",
    preStatus: "Researching",
    requirementsDocLink: "https://example.com/requirements",
    companyCareerWebsite: "https://creativeagency.com/careers",
    onlineAssessment: "Pending",
    interviewRound1: "Not Started",
    interviewRound2: "Not Started",
    interviewRound3: "Not Started",
    finalRound: "Not Started",
    importantNotes: "Need to prepare portfolio",
  },
  {
    id: "2",
    companyName: "Healthcare Inc",
    role: "Healthcare Administrator",
    anticipatedOpeningDate: "2025-03-15",
    applicationDeadline: "2025-03-30",
    preStatus: "Ready to Apply",
    requirementsDocLink: "https://example.com/requirements2",
    companyCareerWebsite: "https://healthcare.com/jobs",
    onlineAssessment: "Completed",
    interviewRound1: "Scheduled",
    interviewRound2: "Not Started",
    interviewRound3: "Not Started",
    finalRound: "Not Started",
    importantNotes: "Have a referral from Dr. Smith",
  },
]

export default function OtherApplications() {
  const [applications, setApplications] = useState<JobApplication[]>(initialApplications)
  const [currentApplication, setCurrentApplication] = useState<JobApplication | null>(null)
  const [isEditing, setIsEditing] = useState(false)

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
    } else {
      // Create new application
      setApplications([...applications, applicationData])
    }

    setCurrentApplication(null)
    setIsEditing(false)
  }

  const handleDelete = async (id: string) => {
    setApplications(applications.filter((app) => app.id !== id))
  }

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, string> = {
      "Not Started": "bg-gray-200 text-gray-800",
      Researching: "bg-blue-100 text-blue-800",
      "Ready to Apply": "bg-green-100 text-green-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Completed: "bg-green-100 text-green-800",
      Scheduled: "bg-purple-100 text-purple-800",
    }

    return statusMap[status] || "bg-gray-200 text-gray-800"
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Other Job Applications</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setCurrentApplication(null)
                setIsEditing(false)
              }}
              className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Application
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border border-white/20">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Application" : "Add New Application"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateOrUpdate}>
              {isEditing && <Input type="hidden" name="id" value={currentApplication?.id} />}
              <div className="grid grid-cols-2 gap-4 py-4">
                {/* Form fields similar to the tech applications form */}
                {/* ... */}
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
                >
                  {isEditing ? "Update" : "Add"} Application
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto">
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
            {applications.map((application) => (
              <TableRow
                key={application.id}
                className="hover:bg-white/20 dark:hover:bg-gray-800/20 cursor-pointer"
                onClick={() => {
                  setCurrentApplication(application)
                  setIsEditing(false)
                }}
              >
                <TableCell className="font-medium">{application.companyName}</TableCell>
                <TableCell>{application.role}</TableCell>
                <TableCell>{application.applicationDeadline}</TableCell>
                <TableCell>
                  <Badge className={getStatusBadge(application.preStatus)}>{application.preStatus}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusBadge(application.onlineAssessment)}>{application.onlineAssessment}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Badge className={getStatusBadge(application.interviewRound1)}>R1</Badge>
                    <Badge className={getStatusBadge(application.interviewRound2)}>R2</Badge>
                    <Badge className={getStatusBadge(application.interviewRound3)}>R3</Badge>
                    <Badge className={getStatusBadge(application.finalRound)}>Final</Badge>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            setCurrentApplication(application)
                            setIsEditing(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[700px] backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border border-white/20">
                        <DialogHeader>
                          <DialogTitle>Edit Application</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleCreateOrUpdate}>
                          <Input type="hidden" name="id" value={currentApplication?.id} />
                          <div className="grid grid-cols-2 gap-4 py-4">
                            {/* Form fields similar to the add form */}
                            {/* ... */}
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button type="button" variant="outline">
                                Cancel
                              </Button>
                            </DialogClose>
                            <Button
                              type="submit"
                              className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
                            >
                              Update Application
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(application.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {currentApplication && (
        <Dialog open={!!currentApplication} onOpenChange={(open) => !open && setCurrentApplication(null)}>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border border-white/20">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {currentApplication.companyName} - {currentApplication.role}
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Company Information</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">Company:</div>
                    <div>{currentApplication.companyName}</div>

                    <div className="font-medium">Role:</div>
                    <div>{currentApplication.role}</div>

                    <div className="font-medium">Career Website:</div>
                    <div>
                      {currentApplication.companyCareerWebsite && (
                        <a
                          href={currentApplication.companyCareerWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center"
                        >
                          <span className="mr-1">Visit</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>

                    <div className="font-medium">Requirements:</div>
                    <div>
                      {currentApplication.requirementsDocLink && (
                        <a
                          href={currentApplication.requirementsDocLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center"
                        >
                          <span className="mr-1">View</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Application Timeline</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">Opening Date:</div>
                    <div>{currentApplication.anticipatedOpeningDate}</div>

                    <div className="font-medium">Deadline:</div>
                    <div>{currentApplication.applicationDeadline}</div>

                    <div className="font-medium">Status:</div>
                    <div>
                      <Badge className={getStatusBadge(currentApplication.preStatus)}>
                        {currentApplication.preStatus}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Interview Progress</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">Online Assessment:</div>
                    <div>
                      <Badge className={getStatusBadge(currentApplication.onlineAssessment)}>
                        {currentApplication.onlineAssessment}
                      </Badge>
                    </div>

                    <div className="font-medium">Round 1:</div>
                    <div>
                      <Badge className={getStatusBadge(currentApplication.interviewRound1)}>
                        {currentApplication.interviewRound1}
                      </Badge>
                    </div>

                    <div className="font-medium">Round 2:</div>
                    <div>
                      <Badge className={getStatusBadge(currentApplication.interviewRound2)}>
                        {currentApplication.interviewRound2}
                      </Badge>
                    </div>

                    <div className="font-medium">Round 3:</div>
                    <div>
                      <Badge className={getStatusBadge(currentApplication.interviewRound3)}>
                        {currentApplication.interviewRound3}
                      </Badge>
                    </div>

                    <div className="font-medium">Final Round:</div>
                    <div>
                      <Badge className={getStatusBadge(currentApplication.finalRound)}>
                        {currentApplication.finalRound}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Notes</h3>
                  <div className="p-3 bg-white/30 dark:bg-gray-800/30 rounded-md text-sm min-h-[100px]">
                    {currentApplication.importantNotes}
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-100"
                  onClick={() => {
                    handleDelete(currentApplication.id)
                    setCurrentApplication(null)
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
              <div className="flex gap-2">
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {isEditing && currentApplication && (
        <Dialog open={isEditing} onOpenChange={(open) => !open && setIsEditing(false)}>
          <DialogContent className="sm:max-w-[700px] backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border border-white/20">
            <DialogHeader>
              <DialogTitle>Edit Application</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateOrUpdate}>
              <Input type="hidden" name="id" value={currentApplication?.id} />
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    defaultValue={currentApplication?.companyName || ""}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" name="role" defaultValue={currentApplication?.role || ""} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="anticipatedOpeningDate">Anticipated Opening Date</Label>
                  <Input
                    id="anticipatedOpeningDate"
                    name="anticipatedOpeningDate"
                    type="date"
                    defaultValue={currentApplication?.anticipatedOpeningDate || ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="applicationDeadline">Application Deadline</Label>
                  <Input
                    id="applicationDeadline"
                    name="applicationDeadline"
                    type="date"
                    defaultValue={currentApplication?.applicationDeadline || ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preStatus">Pre-Application Status</Label>
                  <Input
                    id="preStatus"
                    name="preStatus"
                    defaultValue={currentApplication?.preStatus || "Not Started"}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requirementsDocLink">Requirements Doc Link</Label>
                  <Input
                    id="requirementsDocLink"
                    name="requirementsDocLink"
                    defaultValue={currentApplication?.requirementsDocLink || ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyCareerWebsite">Company Career Website</Label>
                  <Input
                    id="companyCareerWebsite"
                    name="companyCareerWebsite"
                    defaultValue={currentApplication?.companyCareerWebsite || ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="onlineAssessment">Online Assessment</Label>
                  <Input
                    id="onlineAssessment"
                    name="onlineAssessment"
                    defaultValue={currentApplication?.onlineAssessment || "Not Started"}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interviewRound1">Interview Round 1</Label>
                  <Input
                    id="interviewRound1"
                    name="interviewRound1"
                    defaultValue={currentApplication?.interviewRound1 || "Not Started"}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interviewRound2">Interview Round 2</Label>
                  <Input
                    id="interviewRound2"
                    name="interviewRound2"
                    defaultValue={currentApplication?.interviewRound2 || "Not Started"}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interviewRound3">Interview Round 3</Label>
                  <Input
                    id="interviewRound3"
                    name="interviewRound3"
                    defaultValue={currentApplication?.interviewRound3 || "Not Started"}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="finalRound">Final Round</Label>
                  <Input
                    id="finalRound"
                    name="finalRound"
                    defaultValue={currentApplication?.finalRound || "Not Started"}
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="importantNotes">Important Notes</Label>
                  <Textarea
                    id="importantNotes"
                    name="importantNotes"
                    defaultValue={currentApplication?.importantNotes || ""}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false)
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
                >
                  Update Application
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

