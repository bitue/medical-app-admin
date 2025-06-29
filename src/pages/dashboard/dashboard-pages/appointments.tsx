"use client"

import { useState, useEffect } from "react"
import { Clock, FileText, User, Check, X, ChevronDown, ChevronUp, DoorClosedIcon as CloseIcon, LoaderCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"

interface ImageViewerProps {
  imageUrl: string
  title: string
  isOpen: boolean
  onClose: () => void
}

const ImageViewer = ({ imageUrl, title, isOpen, onClose }: ImageViewerProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="relative max-w-4xl w-full">
        <div className="bg-background rounded-lg overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-medium">{title}</h3>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <CloseIcon className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <div className="relative h-[70vh] w-full">
            <img src={imageUrl || "/placeholder.svg"} alt={title} className="object-contain" />
          </div>
        </div>
      </div>
    </div>
  )
}

interface DocumentCardProps {
  document: any
  type: "report" | "prescription"
}

const DocumentCard = ({ document, type }: DocumentCardProps) => {
  const [imageViewerOpen, setImageViewerOpen] = useState(false)

  const dateField = type === "report" ? "reportDate" : "prescriptionDate"
  const formattedDate = new Date(document[dateField]).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <>
      <Card className="overflow-hidden">
        <CardHeader className="p-3 pb-0">
          <CardTitle className="text-base">{document.title}</CardTitle>
          <CardDescription>{formattedDate}</CardDescription>
        </CardHeader>
        <CardContent className="p-3">
          <div className="relative h-32 w-full rounded-md overflow-hidden border bg-muted">
            <img src={document.docPath || "/placeholder.svg"} alt={document.title} className="object-cover" />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <Button variant="secondary" size="sm" onClick={() => setImageViewerOpen(true)}>
                View Full Image
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ImageViewer
        imageUrl={document.docPath}
        title={document.title}
        isOpen={imageViewerOpen}
        onClose={() => setImageViewerOpen(false)}
      />
    </>
  )
}

interface AppointmentDetailsProps {
  appointment: any
}

const AppointmentDetails = ({ appointment }: AppointmentDetailsProps) => {
  const [activeTab, setActiveTab] = useState<"reports" | "prescriptions">("reports")

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Button
          variant={activeTab === "reports" ? "default" : "outline"}
          onClick={() => setActiveTab("reports")}
          className="flex-1"
        >
          Reports ({appointment.reports.length})
        </Button>
        <Button
          variant={activeTab === "prescriptions" ? "default" : "outline"}
          onClick={() => setActiveTab("prescriptions")}
          className="flex-1"
        >
          Prescriptions ({appointment.prescriptions.length})
        </Button>
      </div>

      {activeTab === "reports" && (
        <div className="space-y-3">
          {appointment.reports.map((report: any) => (
            <DocumentCard key={report.id} document={report} type="report" />
          ))}
          {appointment.reports.length === 0 && (
            <p className="text-center text-muted-foreground py-4">No reports available</p>
          )}
        </div>
      )}

      {activeTab === "prescriptions" && (
        <div className="space-y-3">
          {appointment.prescriptions.map((prescription: any) => (
            <DocumentCard key={prescription.id} document={prescription} type="prescription" />
          ))}
          {appointment.prescriptions.length === 0 && (
            <p className="text-center text-muted-foreground py-4">No prescriptions available</p>
          )}
        </div>
      )}
    </div>
  )
}

export default function AppointmentsGrid() {
  const [appointments, setAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [approvingAppointment, setApprovingAppointment] = useState<number | null>(null)

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('https://www.medical-app.online/appointments', {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token') || '{}').token}`,
        }
      })

      const data = await response.json()
      
      if (data.status && data.data) {
        setAppointments(data.data)
        toast.success('Appointments loaded successfully!')
      } else {
        setError(data.message || 'Failed to load appointments')
        toast.error(data.message || 'Failed to load appointments')
      }
    } catch (err) {
      console.error('Error fetching appointments:', err)
      setError('Failed to fetch appointments')
      toast.error('Failed to fetch appointments')
    } finally {
      setLoading(false)
    }
  }

  const approveAppointment = async (appointmentId: number) => {
    try {
      setApprovingAppointment(appointmentId)
      
      const response = await fetch(`https://www.medical-app.online/appointments/${appointmentId}/approve`, {
        method: 'PATCH',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token') || '{}').token}`,
        }
      })

      const data = await response.json()
      
      if (response.ok && data.status) {
        toast.success('Appointment approved successfully!')
        // Update the appointment in the local state
        setAppointments(prev => prev.map(appointment => 
          appointment.id === appointmentId 
            ? { ...appointment, isApproved: true }
            : appointment
        ))
      } else {
        toast.error(data.message || 'Failed to approve appointment')
      }
    } catch (err) {
      console.error('Error approving appointment:', err)
      toast.error('Failed to approve appointment')
    } finally {
      setApprovingAppointment(null)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  const toggleExpand = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Appointments</h1>
        <Button 
          variant="outline" 
          onClick={fetchAppointments} 
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

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-2">
            <LoaderCircle className="h-6 w-6 animate-spin" />
            <span>Loading appointments...</span>
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={fetchAppointments} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      )}

      {!loading && !error && appointments.length === 0 && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">No appointments found</p>
            <Button onClick={fetchAppointments} variant="outline">
              Refresh
            </Button>
          </div>
        </div>
      )}

      {!loading && !error && appointments.length > 0 && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appointment) => (
          <Card key={appointment.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">Appointment #{appointment.id}</CardTitle>
                <Badge variant={appointment.isApproved ? "success" : "secondary"}>
                  {appointment.isApproved ? <Check className="h-3 w-3 mr-1" /> : <X className="h-3 w-3 mr-1" />}
                  {appointment.isApproved ? "Approved" : "Pending"}
                </Badge>
              </div>
                <CardDescription>{formatDate(appointment.appointmentDate)}</CardDescription>
            </CardHeader>

            <CardContent className="pb-2">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-medium">Doctor:</span> {appointment.doctor.user.username}
                  </span>
                </div>

                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      <span className="font-medium">Patient:</span> {appointment.patient.user.username}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      <span className="font-medium">Appointment Date:</span> {formatDate(appointment.appointmentDate)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      <span className="font-medium">Time Slot:</span> {appointment.appointmentSlot}
                    </span>
                  </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-medium">Access Time:</span> {appointment.accessTime} minutes
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                      <span className="font-medium">Reports:</span> {appointment.reports?.length || 0}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      <span className="font-medium">Prescriptions:</span> {appointment.prescriptions?.length || 0}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                      <span className="font-medium">Medications:</span> {appointment.providedMedications?.length || 0}
                  </span>
                </div>

                {/* Preview of first document if available */}
                  {(appointment.reports?.length > 0 || appointment.prescriptions?.length > 0) && (
                  <div className="pt-2">
                    <p className="text-xs font-medium mb-2">Latest Document:</p>
                    <div className="relative h-24 w-full rounded-md overflow-hidden border bg-muted">
                      <img
                        src={
                            appointment.reports?.length > 0
                            ? appointment.reports[0].docPath
                            : appointment.prescriptions[0].docPath
                        }
                        alt="Latest document"
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex justify-between pt-0">
              <Button variant="ghost" size="sm" className="text-xs" onClick={() => toggleExpand(appointment.id)}>
                {expandedCard === appointment.id ? (
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

              <div className="flex gap-2">
                {!appointment.isApproved && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => approveAppointment(appointment.id)}
                    disabled={approvingAppointment === appointment.id}
                    className="flex items-center gap-1"
                  >
                    {approvingAppointment === appointment.id ? (
                      <>
                        <LoaderCircle className="h-3 w-3 animate-spin" />
                        Approving...
                      </>
                    ) : (
                      <>
                        <Check className="h-3 w-3" />
                        Approve
                      </>
                    )}
                  </Button>
                )}

                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">View Details</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Appointment Details</DialogTitle>
                      <DialogDescription>
                          Appointment with Dr. {appointment.doctor.user.username} on {formatDate(appointment.appointmentDate)}
                          <br />
                          Time: {appointment.appointmentSlot}
                      </DialogDescription>
                    </DialogHeader>
                    <AppointmentDetails appointment={appointment} />
                  </DialogContent>
                </Dialog>
              </div>
            </CardFooter>

            {expandedCard === appointment.id && (
              <div className="px-6 pb-4">
                <div className="pt-2 border-t">
                    <h4 className="text-sm font-medium mb-2">Appointment Details</h4>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>Date: {formatDate(appointment.appointmentDate)}</p>
                      <p>Time: {appointment.appointmentSlot}</p>
                      <p>Duration: {appointment.accessTime} minutes</p>
                      <p>Status: {appointment.isApproved ? 'Approved' : 'Pending'}</p>
                    </div>
                    
                    <h4 className="text-sm font-medium mb-2 mt-4">Recent Activity</h4>
                    {appointment.reports?.length > 0 && (
                    <div className="mb-2">
                      <p className="text-xs text-muted-foreground">
                        Latest Report: {appointment.reports[0].title} ({formatDate(appointment.reports[0].reportDate)})
                      </p>
                    </div>
                  )}
                    {appointment.prescriptions?.length > 0 && (
                      <div className="mb-2">
                      <p className="text-xs text-muted-foreground">
                        Latest Prescription: {appointment.prescriptions[0].title} (
                        {formatDate(appointment.prescriptions[0].prescriptionDate)})
                      </p>
                    </div>
                  )}
                    {appointment.providedMedications?.length > 0 && (
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Medications Provided: {appointment.providedMedications.length} items
                        </p>
                      </div>
                    )}
                    {(!appointment.reports?.length && !appointment.prescriptions?.length && !appointment.providedMedications?.length) && (
                      <p className="text-xs text-muted-foreground">No activity recorded yet</p>
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

