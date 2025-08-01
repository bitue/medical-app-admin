"use client"

import { useState, useEffect } from "react"
import { 
  FileText, 
  Plus, 
  Search, 
  Calendar,
  User,
  Pill,
  LoaderCircle,
  ChevronDown,
  ChevronUp,
  Download
} from "lucide-react"
import { format } from "date-fns"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Medication {
  name: string
  dosage: string
  frequency: string
  duration: string
  instructions: string
}

interface Prescription {
  id: number
  patientId: number
  doctorId: number
  patient: {
    user: {
      username: string
      email: string
    }
  }
  doctor: {
    user: {
      username: string
      email: string
    }
  }
  medications: Medication[]
  prescriptionDate: string
  notes: string
  status: "active" | "completed" | "cancelled"
}

interface NewPrescriptionForm {
  patientId: number
  medications: Medication[]
  notes: string
}

export default function PrescriptionManagement() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [newPrescription, setNewPrescription] = useState<NewPrescriptionForm>({
    patientId: 0,
    medications: [{ name: "", dosage: "", frequency: "", duration: "", instructions: "" }],
    notes: ""
  })
  const [isCreatingPrescription, setIsCreatingPrescription] = useState(false)

  const fetchPrescriptions = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('https://www.medical-app.online/prescriptions', {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('token') || '{}').token}`,
        }
      })

      const data = await response.json()
      
      if (data.status && data.data) {
        setPrescriptions(data.data)
        toast.success('Prescriptions loaded successfully!')
      } else {
        setError(data.message || 'Failed to load prescriptions')
        toast.error(data.message || 'Failed to load prescriptions')
      }
    } catch (err) {
      console.error('Error fetching prescriptions:', err)
      setError('Failed to fetch prescriptions')
      toast.error('Failed to fetch prescriptions')
    } finally {
      setLoading(false)
    }
  }

  const createPrescription = async () => {
    try {
      setIsCreatingPrescription(true)
      
      const response = await fetch('https://www.medical-app.online/prescriptions', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('token') || '{}').token}`,
        },
        body: JSON.stringify(newPrescription)
      })

      const data = await response.json()
      
      if (response.ok && data.status) {
        toast.success('Prescription created successfully!')
        fetchPrescriptions() // Refresh the list
        return true
      } else {
        toast.error(data.message || 'Failed to create prescription')
        return false
      }
    } catch (err) {
      console.error('Error creating prescription:', err)
      toast.error('Failed to create prescription')
      return false
    } finally {
      setIsCreatingPrescription(false)
    }
  }

  const addMedication = () => {
    setNewPrescription(prev => ({
      ...prev,
      medications: [
        ...prev.medications,
        { name: "", dosage: "", frequency: "", duration: "", instructions: "" }
      ]
    }))
  }

  const removeMedication = (index: number) => {
    setNewPrescription(prev => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index)
    }))
  }

  const updateMedication = (index: number, field: keyof Medication, value: string) => {
    setNewPrescription(prev => ({
      ...prev,
      medications: prev.medications.map((med, i) => 
        i === index ? { ...med, [field]: value } : med
      )
    }))
  }

  const toggleExpand = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id)
  }

  const downloadPrescription = async (prescriptionId: number) => {
    try {
      const response = await fetch(`https://www.medical-app.online/prescriptions/${prescriptionId}/download`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('token') || '{}').token}`,
        }
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `prescription_${prescriptionId}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        toast.success('Prescription downloaded successfully!')
      } else {
        toast.error('Failed to download prescription')
      }
    } catch (err) {
      console.error('Error downloading prescription:', err)
      toast.error('Failed to download prescription')
    }
  }

  useEffect(() => {
    fetchPrescriptions()
  }, [])

  const filteredPrescriptions = prescriptions.filter(prescription => 
    prescription.patient.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prescription.doctor.user.username.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Prescription Management</h1>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Prescription
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Prescription</DialogTitle>
                <DialogDescription>
                  Create a new prescription for a patient. Add medications and instructions below.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Patient ID</Label>
                  <Input
                    type="number"
                    placeholder="Enter patient ID"
                    value={newPrescription.patientId || ""}
                    onChange={(e) => setNewPrescription(prev => ({
                      ...prev,
                      patientId: parseInt(e.target.value) || 0
                    }))}
                  />
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Medications</h4>
                    <Button onClick={addMedication} variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Medication
                    </Button>
                  </div>

                  {newPrescription.medications.map((medication, index) => (
                    <Card key={index}>
                      <CardHeader className="p-4 pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">Medication #{index + 1}</CardTitle>
                          {index > 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => removeMedication(index)}
                            >
                              ×
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-2 grid gap-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label>Name</Label>
                            <Input
                              placeholder="Medication name"
                              value={medication.name}
                              onChange={(e) => updateMedication(index, "name", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Dosage</Label>
                            <Input
                              placeholder="e.g., 500mg"
                              value={medication.dosage}
                              onChange={(e) => updateMedication(index, "dosage", e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label>Frequency</Label>
                            <Input
                              placeholder="e.g., Twice daily"
                              value={medication.frequency}
                              onChange={(e) => updateMedication(index, "frequency", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Duration</Label>
                            <Input
                              placeholder="e.g., 7 days"
                              value={medication.duration}
                              onChange={(e) => updateMedication(index, "duration", e.target.value)}
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Special Instructions</Label>
                          <Input
                            placeholder="Any special instructions"
                            value={medication.instructions}
                            onChange={(e) => updateMedication(index, "instructions", e.target.value)}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label>Additional Notes</Label>
                  <Input
                    placeholder="Any additional notes or instructions"
                    value={newPrescription.notes}
                    onChange={(e) => setNewPrescription(prev => ({
                      ...prev,
                      notes: e.target.value
                    }))}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  onClick={async () => {
                    const success = await createPrescription()
                    if (success) {
                      setNewPrescription({
                        patientId: 0,
                        medications: [{ name: "", dosage: "", frequency: "", duration: "", instructions: "" }],
                        notes: ""
                      })
                    }
                  }}
                  disabled={isCreatingPrescription}
                >
                  {isCreatingPrescription ? (
                    <>
                      <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Prescription'
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button 
            variant="outline" 
            onClick={fetchPrescriptions} 
            disabled={loading}
            className="flex items-center gap-2"
          >
            {loading ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Refresh'
            )}
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search prescriptions by patient or doctor name..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-2">
            <LoaderCircle className="h-6 w-6 animate-spin" />
            <span>Loading prescriptions...</span>
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={fetchPrescriptions} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      )}

      {!loading && !error && filteredPrescriptions.length === 0 && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              {searchQuery ? "No prescriptions found matching your search" : "No prescriptions found"}
            </p>
            <Button onClick={fetchPrescriptions} variant="outline">
              Refresh
            </Button>
          </div>
        </div>
      )}

      {!loading && !error && filteredPrescriptions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrescriptions.map((prescription) => (
            <Card key={prescription.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">Prescription #{prescription.id}</CardTitle>
                  <Badge variant="outline">
                    {prescription.status}
                  </Badge>
                </div>
                <CardDescription>
                  {format(new Date(prescription.prescriptionDate), "PPP")}
                </CardDescription>
              </CardHeader>

              <CardContent className="pb-2">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      <span className="font-medium">Patient:</span> {prescription.patient.user.username}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      <span className="font-medium">Doctor:</span> {prescription.doctor.user.username}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      <span className="font-medium">Date:</span> {format(new Date(prescription.prescriptionDate), "PP")}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Pill className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      <span className="font-medium">Medications:</span> {prescription.medications.length}
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between pt-0">
                <Button variant="ghost" size="sm" className="text-xs" onClick={() => toggleExpand(prescription.id)}>
                  {expandedCard === prescription.id ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-1" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-1" />
                      Show More
                    </>
                  )}
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-1"
                  onClick={() => downloadPrescription(prescription.id)}
                >
                  <Download className="h-3 w-3" />
                  Download
                </Button>
              </CardFooter>

              {expandedCard === prescription.id && (
                <div className="px-6 pb-4">
                  <div className="pt-2 border-t">
                    <h4 className="text-sm font-medium mb-2">Medications</h4>
                    <div className="space-y-3">
                      {prescription.medications.map((medication, index) => (
                        <div key={index} className="bg-muted/50 rounded-lg p-3 text-sm">
                          <div className="font-medium mb-1">{medication.name}</div>
                          <div className="text-muted-foreground space-y-1">
                            <p>Dosage: {medication.dosage}</p>
                            <p>Frequency: {medication.frequency}</p>
                            <p>Duration: {medication.duration}</p>
                            {medication.instructions && (
                              <p>Instructions: {medication.instructions}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {prescription.notes && (
                      <>
                        <h4 className="text-sm font-medium mb-2 mt-4">Additional Notes</h4>
                        <p className="text-sm text-muted-foreground">{prescription.notes}</p>
                      </>
                    )}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 