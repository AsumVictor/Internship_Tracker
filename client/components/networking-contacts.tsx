"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Define the ContactRecord interface
interface ContactRecord {
  id: string
  companyName: string
  roleType: string
  personName: string
  linkedInProfile: string
  contacted: string
  referral: string
  importantNotes: string
}

// Sample data
const initialContacts: ContactRecord[] = [
  {
    id: "1",
    companyName: "TechCorp",
    roleType: "Software Engineer",
    personName: "John Smith",
    linkedInProfile: "https://linkedin.com/in/johnsmith",
    contacted: "Yes",
    referral: "Pending",
    importantNotes: "Met at tech conference",
  },
  {
    id: "2",
    companyName: "InnovateTech",
    roleType: "Product Manager",
    personName: "Sarah Johnson",
    linkedInProfile: "https://linkedin.com/in/sarahjohnson",
    contacted: "No",
    referral: "No",
    importantNotes: "Friend of a friend",
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

export default function NetworkingContacts() {
  const [contacts, setContacts] = useState<ContactRecord[]>(initialContacts)
  const [currentContact, setCurrentContact] = useState<ContactRecord | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Partial<ContactRecord>>({})

  const handleCreateOrUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const contactData = {
      id: (formData.get("id") as string) || crypto.randomUUID(),
      companyName: formData.get("companyName") as string,
      roleType: formData.get("roleType") as string,
      personName: formData.get("personName") as string,
      linkedInProfile: formData.get("linkedInProfile") as string,
      contacted: formData.get("contacted") as string,
      referral: formData.get("referral") as string,
      importantNotes: formData.get("importantNotes") as string,
    }

    if (isEditing) {
      // Update existing contact
      const updatedContacts = contacts.map((contact) => (contact.id === contactData.id ? contactData : contact))
      setContacts(updatedContacts)
    } else {
      // Create new contact
      setContacts([...contacts, contactData])
    }

    setCurrentContact(null)
    setIsEditing(false)
    setFormData({})
  }

  const handleDelete = async (id: string) => {
    setContacts(contacts.filter((contact) => contact.id !== id))
  }

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, string> = {
      Yes: "bg-green-100 text-green-800",
      No: "bg-red-100 text-red-800",
      Pending: "bg-yellow-100 text-yellow-800",
    }

    return statusMap[status] || "bg-gray-200 text-gray-800"
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants} className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Networking Contacts</h2>
        <Dialog>
          <DialogTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => {
                  setCurrentContact(null)
                  setIsEditing(false)
                  setFormData({})
                }}
                className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Contact
              </Button>
            </motion.div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border border-white/20">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Contact" : "Add New Contact"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateOrUpdate}>
              {isEditing && <Input type="hidden" name="id" value={currentContact?.id} />}
              <div className="grid grid-cols-2 gap-4 py-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="space-y-2"
                >
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    defaultValue={currentContact?.companyName || ""}
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
                  <Label htmlFor="roleType">Role Type</Label>
                  <Input
                    id="roleType"
                    name="roleType"
                    defaultValue={currentContact?.roleType || ""}
                    value={formData.roleType}
                    onChange={(e) => handleFieldChange("roleType", e.target.value)}
                    className="bg-white/50 dark:bg-gray-800/50 border-white/20"
                    required
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="space-y-2"
                >
                  <Label htmlFor="personName">Person Name</Label>
                  <Input
                    id="personName"
                    name="personName"
                    defaultValue={currentContact?.personName || ""}
                    value={formData.personName}
                    onChange={(e) => handleFieldChange("personName", e.target.value)}
                    className="bg-white/50 dark:bg-gray-800/50 border-white/20"
                    required
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="space-y-2"
                >
                  <Label htmlFor="linkedInProfile">LinkedIn Profile</Label>
                  <Input
                    id="linkedInProfile"
                    name="linkedInProfile"
                    defaultValue={currentContact?.linkedInProfile || ""}
                    value={formData.linkedInProfile}
                    onChange={(e) => handleFieldChange("linkedInProfile", e.target.value)}
                    className="bg-white/50 dark:bg-gray-800/50 border-white/20"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="space-y-2"
                >
                  <Label htmlFor="contacted">Contacted</Label>
                  <Input
                    id="contacted"
                    name="contacted"
                    defaultValue={currentContact?.contacted || "No"}
                    value={formData.contacted}
                    onChange={(e) => handleFieldChange("contacted", e.target.value)}
                    className="bg-white/50 dark:bg-gray-800/50 border-white/20"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                  className="space-y-2"
                >
                  <Label htmlFor="referral">Referral</Label>
                  <Input
                    id="referral"
                    name="referral"
                    defaultValue={currentContact?.referral || "No"}
                    value={formData.referral}
                    onChange={(e) => handleFieldChange("referral", e.target.value)}
                    className="bg-white/50 dark:bg-gray-800/50 border-white/20"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.3 }}
                  className="space-y-2 col-span-2"
                >
                  <Label htmlFor="importantNotes">Important Notes</Label>
                  <Textarea
                    id="importantNotes"
                    name="importantNotes"
                    defaultValue={currentContact?.importantNotes || ""}
                    value={formData.importantNotes}
                    onChange={(e) => handleFieldChange("importantNotes", e.target.value)}
                    className="min-h-[100px] bg-white/50 dark:bg-gray-800/50 border-white/20"
                  />
                </motion.div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline" className="border-white/20">
                    Cancel
                  </Button>
                </DialogClose>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
                  >
                    {isEditing ? "Update" : "Add"} Contact
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
              <TableHead>Role Type</TableHead>
              <TableHead>Person</TableHead>
              <TableHead>LinkedIn</TableHead>
              <TableHead>Contacted</TableHead>
              <TableHead>Referral</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {contacts.map((contact, index) => (
                <motion.tr
                  key={contact.id}
                  custom={index}
                  variants={tableRowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="removed"
                  className="hover:bg-white/20 dark:hover:bg-gray-800/20 cursor-pointer"
                  onClick={() => {
                    setCurrentContact(contact)
                    setIsEditing(false)
                  }}
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                >
                  <TableCell className="font-medium">{contact.companyName}</TableCell>
                  <TableCell>{contact.roleType}</TableCell>
                  <TableCell>{contact.personName}</TableCell>
                  <TableCell>
                    {contact.linkedInProfile && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        href={contact.linkedInProfile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="mr-1">Profile</span>
                        <ExternalLink className="h-3 w-3" />
                      </motion.a>
                    )}
                  </TableCell>
                  <TableCell>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Badge className={getStatusBadge(contact.contacted)}>{contact.contacted}</Badge>
                    </motion.div>
                  </TableCell>
                  <TableCell>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Badge className={getStatusBadge(contact.referral)}>{contact.referral}</Badge>
                    </motion.div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          setCurrentContact(contact)
                          setIsEditing(true)
                          setFormData(contact)
                        }}
                      >
                        <Button variant="outline" size="icon" className="border-white/20">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(contact.id)
                        }}
                      >
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-red-500 hover:text-red-700 border-white/20"
                        >
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

      {currentContact && (
        <Dialog open={!!currentContact} onOpenChange={(open) => !open && setCurrentContact(null)}>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border border-white/20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {currentContact.personName} - {currentContact.roleType}
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
                    <h3 className="text-lg font-medium mb-2">Contact Information</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-medium">Person:</div>
                      <div>{currentContact.personName}</div>

                      <div className="font-medium">Company:</div>
                      <div>{currentContact.companyName}</div>

                      <div className="font-medium">Role Type:</div>
                      <div>{currentContact.roleType}</div>

                      <div className="font-medium">LinkedIn:</div>
                      <div>
                        {currentContact.linkedInProfile && (
                          <motion.a
                            whileHover={{ scale: 1.05 }}
                            href={currentContact.linkedInProfile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            <span className="mr-1">Profile</span>
                            <ExternalLink className="h-3 w-3" />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Status</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-medium">Contacted:</div>
                      <div>
                        <motion.div whileHover={{ scale: 1.05 }}>
                          <Badge className={getStatusBadge(currentContact.contacted)}>{currentContact.contacted}</Badge>
                        </motion.div>
                      </div>

                      <div className="font-medium">Referral:</div>
                      <div>
                        <motion.div whileHover={{ scale: 1.05 }}>
                          <Badge className={getStatusBadge(currentContact.referral)}>{currentContact.referral}</Badge>
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
                    <h3 className="text-lg font-medium mb-2">Notes</h3>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                      className="p-3 bg-white/30 dark:bg-gray-800/30 rounded-md text-sm min-h-[100px]"
                    >
                      {currentContact.importantNotes}
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
                        handleDelete(currentContact.id)
                        setCurrentContact(null)
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
                        setFormData(currentContact)
                      }}
                      className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
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

