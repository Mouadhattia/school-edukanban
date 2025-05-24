"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EditTeacherDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (teacher: any) => void
  teacher: any
}

export function EditTeacherDialog({ isOpen, onClose, onSave, teacher }: EditTeacherDialogProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [department, setDepartment] = useState("")
  const [status, setStatus] = useState("")
  const [errors, setErrors] = useState<{ name?: string; email?: string; department?: string }>({})

  useEffect(() => {
    if (teacher) {
      setName(teacher.name || "")
      setEmail(teacher.email || "")
      setDepartment(teacher.department || "")
      setStatus(teacher.status || "Active")
    }
  }, [teacher])

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; department?: string } = {}
    let isValid = true

    if (!name.trim()) {
      newErrors.name = "Name is required"
      isValid = false
    }

    if (!email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid"
      isValid = false
    }

    if (!department) {
      newErrors.department = "Department is required"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm() && teacher) {
      onSave({
        ...teacher,
        name,
        email,
        department,
        status,
      })
    }
  }

  const resetForm = () => {
    if (teacher) {
      setName(teacher.name || "")
      setEmail(teacher.email || "")
      setDepartment(teacher.department || "")
      setStatus(teacher.status || "Active")
    }
    setErrors({})
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  if (!teacher) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Teacher</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-department">Department</Label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger id="edit-department" className={errors.department ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="History">History</SelectItem>
                  <SelectItem value="Art">Art</SelectItem>
                  <SelectItem value="Music">Music</SelectItem>
                  <SelectItem value="Physical Education">Physical Education</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Foreign Languages">Foreign Languages</SelectItem>
                </SelectContent>
              </Select>
              {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="edit-status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="On Leave">On Leave</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
