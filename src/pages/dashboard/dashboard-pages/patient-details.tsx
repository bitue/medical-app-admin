'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import {
  Activity,
  Calendar,
  CheckCircle,
  Clipboard,
  Clock,
  FileText,
  Pill,
  Stethoscope,
  User,
  XCircle
} from 'lucide-react';
import { useState } from 'react';

// This would come from your API in a real application
// const patientData = {
//   code: 200,
//   message: 'Patient retrieved successfully!',
//   data: {
//     id: 1,
//     userId: {
//       id: 1,
//       username: 'Rakib',
//       email: 'rakibiuaece@gmail.com',
//       password: '$2b$10$8qvHV.jgonQ9UNBHfgx4x.WcEyt6z/Xn955PUYLe7aR3MK1YpT8ai',
//       role: 'patient',
//       createdAt: '2025-03-11T17:46:29.315Z',
//       updatedAt: '2025-03-11T17:46:29.315Z'
//     },
//     currentMedications: [],
//     operationHistories: [],
//     healthStatuses: [
//       {
//         id: 1,
//         smokingStatus: false,
//         exercise: true,
//         alcoholStatus: true,
//         covidVaccination: true,
//         allergy: false,
//         diabeticsStatus: true
//       }
//     ],
//     prescriptions: [
//       {
//         id: 4,
//         title: 'First prescription ',
//         docPath:
//           'https://medical-bucket.s3.eu-north-1.amazonaws.com/a5dce4a5-e69c-4ac2-a713-e7f3a7f8cf04-prescription_1741718830655.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA3TD2SZ2NU4MYMPMS%2F20250311%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250311T184713Z&X-Amz-Expires=518400&X-Amz-Signature=a47569f1d3dcdfceb4582a388c3e0edc9dbe0e53628d441f487a94817752f135&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject',
//         prescriptionDate: '2025-03-03T18:46:00.000Z'
//       }
//     ],
//     reports: [
//       {
//         id: 1,
//         title: 'First report ',
//         docPath:
//           'https://medical-bucket.s3.eu-north-1.amazonaws.com/fa7abc45-bf1f-407e-8605-ed852c89466e-prescription_1741716342316.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA3TD2SZ2NU4MYMPMS%2F20250311%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250311T180545Z&X-Amz-Expires=518400&X-Amz-Signature=b1b0366989e7b8e28c46c8e29eabde9129a8f3f0ce78942852458f6bbf9d2644&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject',
//         reportDate: '2025-03-11T18:05:00.000Z'
//       },
//       {
//         id: 2,
//         title: '2nd report ',
//         docPath:
//           'https://medical-bucket.s3.eu-north-1.amazonaws.com/f88279a3-cbb9-48ba-adfd-96ebe10268fa-prescription_1741716787676.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA3TD2SZ2NU4MYMPMS%2F20250311%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250311T181311Z&X-Amz-Expires=518400&X-Amz-Signature=5ed779a2e6033e630f909c0d372148e235710eb13d6d285850a37596bb1cff77&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject',
//         reportDate: '2025-03-04T18:12:00.000Z'
//       }
//     ],
//     appointments: [
//       {
//         id: 8,
//         accessTime: 40,
//         isApproved: false,
//         createdAt: '2025-03-13T12:56:57.542Z',
//         updatedAt: '2025-03-13T12:56:57.542Z'
//       },
//       {
//         id: 7,
//         accessTime: 25,
//         isApproved: true,
//         createdAt: '2025-03-12T19:43:00.098Z',
//         updatedAt: '2025-03-12T19:43:00.098Z'
//       },
//       {
//         id: 6,
//         accessTime: 10,
//         isApproved: true,
//         createdAt: '2025-03-12T19:37:25.344Z',
//         updatedAt: '2025-03-12T19:37:25.344Z'
//       }
//     ]
//   },
//   status: true
// };

export default function PatientDetailsPage({ patientData }: {patientData: any}) {
  const [selectedImage, setSelectedImage] = useState('');

  const { data: patient } = patientData
  const { user, healthStatus, prescriptions, reports, appointments, currentMedications, operationHistories } =
    patient

  // Get initials for the avatar
  const initials = user.username
    .split(' ')
    .map((n: any) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <div className={`min-h-screen bg-background transition-colors duration-300`}>
      <div className="container mx-auto p-4">
        {/* Header with theme toggle */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Patient Details</h1>
        </div>

        {/* Patient Profile Card */}
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <Avatar className="h-16 w-16 border-2 border-primary/10">
              <AvatarFallback className="bg-primary/10 text-primary dark:bg-primary/20">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <CardTitle className="text-2xl">{user.username}</CardTitle>
              <CardDescription className="text-base">{user.email}</CardDescription>
              <div className="mt-1 flex gap-2">
                <Badge variant="outline">ID: {patient.id}</Badge>
                <Badge variant="outline" className="capitalize">
                  {user.role}
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Main Content */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 md:col-span-1">
            {/* Health Status Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Health Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Smoking</span>
                  {healthStatus?.smokingStatus ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span>Exercise</span>
                  {healthStatus?.exercise ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span>Alcohol</span>
                  {healthStatus?.alcoholStatus ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span>COVID Vaccination</span>
                  {healthStatus?.covidVaccination ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span>Allergy</span>
                  {healthStatus?.allergy ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span>Diabetics</span>
                  {healthStatus?.diabeticsStatus ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Counters Card */}
            <Card>
              <CardHeader>
                <CardTitle>Medical Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center rounded-lg bg-muted p-3 dark:bg-muted/50">
                    <Pill className="mb-1 h-5 w-5 text-primary" />
                    <span className="text-xl font-bold text-primary">{patient.currentMedications.length}</span>
                    <span className="text-xs text-muted-foreground">Medications</span>
                  </div>
                  <div className="flex flex-col items-center rounded-lg bg-muted p-3 dark:bg-muted/50">
                    <Stethoscope className="mb-1 h-5 w-5 text-primary" />
                    <span className="text-xl font-bold text-primary">{patient.operationHistories.length}</span>
                    <span className="text-xs text-muted-foreground">Operations</span>
                  </div>
                  <div className="flex flex-col items-center rounded-lg bg-muted p-3 dark:bg-muted/50">
                    <FileText className="mb-1 h-5 w-5 text-primary" />
                    <span className="text-xl font-bold text-primary">{patient.prescriptions.length}</span>
                    <span className="text-xs text-muted-foreground">Prescriptions</span>
                  </div>
                  <div className="flex flex-col items-center rounded-lg bg-muted p-3 dark:bg-muted/50">
                    <Calendar className="mb-1 h-5 w-5 text-primary" />
                    <span className="text-xl font-bold text-primary">{patient.appointments.length}</span>
                    <span className="text-xs text-muted-foreground">Appointments</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2">
            <Tabs defaultValue="medications" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="medications">Medications</TabsTrigger>
                <TabsTrigger value="operations">Operations</TabsTrigger>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>

              {/* Medications Tab */}
              <TabsContent value="medications">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Pill className="h-5 w-5" />
                      Current Medications
                    </CardTitle>
                    <CardDescription>Patient's current medication regimen</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {currentMedications.length > 0 ? (
                        currentMedications.map((medication: any) => (
                          <div key={medication.id} className="overflow-hidden rounded-lg">
                            <div className="bg-primary/5 p-4 dark:bg-primary/10">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <div>
                                  <p className="font-medium">Medication #{medication.id}</p>
                                  <p className="text-sm text-muted-foreground">
                                    Prescribed by: {medication.doctor?.name || "Unknown Doctor"}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  <Badge variant="outline">Start: {format(new Date(medication.startDate), "PP")}</Badge>
                                  <Badge variant="outline">End: {format(new Date(medication.endDate), "PP")}</Badge>
                                </div>
                              </div>
                              <div className="mt-3">
                                <p className="text-sm font-medium">Dosage Instructions:</p>
                                <ul className="mt-1 list-inside list-disc">
                                  {Array.isArray(medication.doses) 
                                    ? medication.doses.map((dose: string, index: number) => (
                                        <li key={index} className="text-sm">
                                          {dose}
                                        </li>
                                      ))
                                    : medication.doses.split(',').map((dose: string, index: number) => (
                                        <li key={index} className="text-sm">
                                          {dose.trim()}
                                        </li>
                                      ))
                                  }
                                </ul>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-muted-foreground">No current medications</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Operations Tab */}
              <TabsContent value="operations">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Operation History
                    </CardTitle>
                    <CardDescription>Patient's surgical and procedure history</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {operationHistories?.length > 0 ? (
                        operationHistories.map((operation: any) => (
                          <div key={operation.id} className="overflow-hidden rounded-lg">
                            <div className="bg-primary/5 p-4 dark:bg-primary/10">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <div>
                                  <p className="font-medium">Operation #{operation.id}</p>
                                </div>
                                <div className="flex gap-2">
                                  <Badge variant="outline">Date: {format(new Date(operation.startDate), "PP")}</Badge>
                                </div>
                              </div>
                              <div className="mt-3">
                                <p className="text-sm font-medium">Procedure Details:</p>
                                <ul className="mt-1 list-inside list-disc">
                                  {operation.descriptions.map((description: string, index: number) => (
                                    <li key={index} className="text-sm">
                                      {description}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-muted-foreground">No operation history</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Appointments Tab */}
              <TabsContent value="appointments">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Appointments
                    </CardTitle>
                    <CardDescription>Patient's scheduled appointments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {appointments.length > 0 ? (
                        appointments.map((appointment: any) => (
                          <div key={appointment.id} className="overflow-hidden rounded-lg">
                            <div
                              className={`flex items-center justify-between p-4 ${
                                appointment.isApproved
                                  ? "bg-green-100 dark:bg-green-900/20"
                                  : "bg-amber-100 dark:bg-amber-900/20"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <Clock className="h-5 w-5" />
                                <div>
                                  <p className="font-medium">Appointment #{appointment.id}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {format(new Date(appointment.createdAt), "PPP")}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge variant={appointment.isApproved ? "success" : "outline"}>
                                  {appointment.isApproved ? "Approved" : "Pending"}
                                </Badge>
                                <p className="mt-1 text-sm">
                                  <span className="font-medium">{appointment.accessTime}</span> minutes
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-muted-foreground">No appointments scheduled</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Prescriptions Tab */}
              <TabsContent value="prescriptions">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Prescriptions
                    </CardTitle>
                    <CardDescription>Patient's medical prescriptions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {prescriptions.length > 0 ? (
                        prescriptions.map((prescription: any) => (
                          <Card key={prescription.id} className="overflow-hidden">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4">
                              <div className="mb-3 sm:mb-0">
                                <p className="font-medium">{prescription.title}</p>
                                <p className="text-sm text-muted-foreground">
                                  {format(new Date(prescription.prescriptionDate), "PPP")}
                                </p>
                              </div>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" onClick={() => setSelectedImage(prescription.docPath)}>
                                    View Prescription
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-3xl">
                                  <div className="aspect-auto relative h-[70vh] w-full overflow-hidden rounded-md">
                                    <img
                                      src={prescription.docPath || "/placeholder.svg"}
                                      alt={prescription.title}
                                      className="object-contain"
                                    />
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </Card>
                        ))
                      ) : (
                        <p className="text-center text-muted-foreground">No prescriptions available</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reports Tab */}
              <TabsContent value="reports">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clipboard className="h-5 w-5" />
                      Medical Reports
                    </CardTitle>
                    <CardDescription>Patient's medical test reports</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {reports.length > 0 ? (
                        reports.map((report: any) => (
                          <Card key={report.id} className="overflow-hidden">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4">
                              <div className="mb-3 sm:mb-0">
                                <p className="font-medium">{report.title}</p>
                                <p className="text-sm text-muted-foreground">
                                  {format(new Date(report.reportDate), "PPP")}
                                </p>
                              </div>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" onClick={() => setSelectedImage(report.docPath)}>
                                    View Report
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-3xl">
                                  <div className="aspect-auto relative h-[70vh] w-full overflow-hidden rounded-md">
                                    <img
                                      src={report.docPath || "/placeholder.svg"}
                                      alt={report.title}
                                      className="object-contain"
                                    />
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </Card>
                        ))
                      ) : (
                        <p className="text-center text-muted-foreground">No reports available</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
