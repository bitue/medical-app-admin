"use client"

import { useState } from "react"
import { Clock, FileText, User, Check, X, ChevronDown, ChevronUp, DoorClosedIcon as CloseIcon } from "lucide-react"
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

// Sample data from your JSON
const appointmentsData = {
  code: 200,
  message: "All appointments retrieved successfully!",
  data: [
    {
      id: 6,
      accessTime: 10,
      isApproved: true,
      createdAt: "2025-03-12T19:37:25.344Z",
      updatedAt: "2025-03-12T19:37:25.344Z",
      doctor: {
        id: 1,
        user: {
          id: 2,
          username: "Stephen",
          email: "takepet279@payposs.com",
          role: "doctor",
        },
      },
      patient: {
        id: 1,
        userId: {
          id: 1,
          username: "Rakib",
          email: "rakibiuaece@gmail.com",
          role: "patient",
        },
      },
      reports: [
        {
          id: 2,
          title: "2nd report ",
          docPath:
            "https://medical-bucket.s3.eu-north-1.amazonaws.com/f88279a3-cbb9-48ba-adfd-96ebe10268fa-prescription_1741716787676.jpg",
          reportDate: "2025-03-04T18:12:00.000Z",
        },
      ],
      prescriptions: [
        {
          id: 4,
          title: "First prescription ",
          docPath:
            "https://medical-bucket.s3.eu-north-1.amazonaws.com/a5dce4a5-e69c-4ac2-a713-e7f3a7f8cf04-prescription_1741718830655.jpg",
          prescriptionDate: "2025-03-03T18:46:00.000Z",
        },
      ],
    },
    {
      id: 7,
      accessTime: 25,
      isApproved: true,
      createdAt: "2025-03-12T19:43:00.098Z",
      updatedAt: "2025-03-12T19:43:00.098Z",
      doctor: {
        id: 1,
        user: {
          id: 2,
          username: "Stephen",
          email: "takepet279@payposs.com",
          role: "doctor",
        },
      },
      patient: {
        id: 1,
        userId: {
          id: 1,
          username: "Rakib",
          email: "rakibiuaece@gmail.com",
          role: "patient",
        },
      },
      reports: [
        {
          id: 1,
          title: "First report ",
          docPath:
            "https://medical-bucket.s3.eu-north-1.amazonaws.com/fa7abc45-bf1f-407e-8605-ed852c89466e-prescription_1741716342316.jpg",
          reportDate: "2025-03-11T18:05:00.000Z",
        },
        {
          id: 2,
          title: "2nd report ",
          docPath:
            "https://medical-bucket.s3.eu-north-1.amazonaws.com/f88279a3-cbb9-48ba-adfd-96ebe10268fa-prescription_1741716787676.jpg",
          reportDate: "2025-03-04T18:12:00.000Z",
        },
      ],
      prescriptions: [
        {
          id: 4,
          title: "First prescription ",
          docPath:
            "https://medical-bucket.s3.eu-north-1.amazonaws.com/a5dce4a5-e69c-4ac2-a713-e7f3a7f8cf04-prescription_1741718830655.jpg",
          prescriptionDate: "2025-03-03T18:46:00.000Z",
        },
      ],
    },
    {
      id: 8,
      accessTime: 40,
      isApproved: false,
      createdAt: "2025-03-13T12:56:57.542Z",
      updatedAt: "2025-03-13T12:56:57.542Z",
      doctor: {
        id: 1,
        user: {
          id: 2,
          username: "Stephen",
          email: "takepet279@payposs.com",
          role: "doctor",
        },
      },
      patient: {
        id: 1,
        userId: {
          id: 1,
          username: "Rakib",
          email: "rakibiuaece@gmail.com",
          role: "patient",
        },
      },
      reports: [
        {
          id: 1,
          title: "First report ",
          docPath:
            "https://medical-bucket.s3.eu-north-1.amazonaws.com/fa7abc45-bf1f-407e-8605-ed852c89466e-prescription_1741716342316.jpg",
          reportDate: "2025-03-11T18:05:00.000Z",
        },
        {
          id: 2,
          title: "2nd report ",
          docPath:
            "https://medical-bucket.s3.eu-north-1.amazonaws.com/f88279a3-cbb9-48ba-adfd-96ebe10268fa-prescription_1741716787676.jpg",
          reportDate: "2025-03-04T18:12:00.000Z",
        },
      ],
      prescriptions: [
        {
          id: 4,
          title: "First prescription ",
          docPath:
            "https://medical-bucket.s3.eu-north-1.amazonaws.com/a5dce4a5-e69c-4ac2-a713-e7f3a7f8cf04-prescription_1741718830655.jpg",
          prescriptionDate: "2025-03-03T18:46:00.000Z",
        },
      ],
    },
  ],
}

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
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

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
      <h1 className="text-2xl font-bold mb-6">My Appointments</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointmentsData.data.map((appointment) => (
          <Card key={appointment.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">Appointment #{appointment.id}</CardTitle>
                <Badge variant={appointment.isApproved ? "success" : "secondary"}>
                  {appointment.isApproved ? <Check className="h-3 w-3 mr-1" /> : <X className="h-3 w-3 mr-1" />}
                  {appointment.isApproved ? "Approved" : "Pending"}
                </Badge>
              </div>
              <CardDescription>{formatDate(appointment.createdAt)}</CardDescription>
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
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-medium">Access Time:</span> {appointment.accessTime} minutes
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-medium">Reports:</span> {appointment.reports.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-medium">Prescriptions:</span> {appointment.prescriptions.length}
                  </span>
                </div>

                {/* Preview of first document if available */}
                {(appointment.reports.length > 0 || appointment.prescriptions.length > 0) && (
                  <div className="pt-2">
                    <p className="text-xs font-medium mb-2">Latest Document:</p>
                    <div className="relative h-24 w-full rounded-md overflow-hidden border bg-muted">
                      <img
                        src={
                          appointment.reports.length > 0
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

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">View Details</Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Appointment Details</DialogTitle>
                    <DialogDescription>
                      Appointment with Dr. {appointment.doctor.user.username} on {formatDate(appointment.createdAt)}
                    </DialogDescription>
                  </DialogHeader>
                  <AppointmentDetails appointment={appointment} />
                </DialogContent>
              </Dialog>
            </CardFooter>

            {expandedCard === appointment.id && (
              <div className="px-6 pb-4">
                <div className="pt-2 border-t">
                  <h4 className="text-sm font-medium mb-2">Recent Activity</h4>
                  {appointment.reports.length > 0 && (
                    <div className="mb-2">
                      <p className="text-xs text-muted-foreground">
                        Latest Report: {appointment.reports[0].title} ({formatDate(appointment.reports[0].reportDate)})
                      </p>
                    </div>
                  )}
                  {appointment.prescriptions.length > 0 && (
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Latest Prescription: {appointment.prescriptions[0].title} (
                        {formatDate(appointment.prescriptions[0].prescriptionDate)})
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

