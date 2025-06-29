"use client"

import { useState, useEffect } from "react"
import { User, GraduationCap, Briefcase, Building, Calendar, ChevronDown, ChevronUp, LoaderCircle, CheckCircle, XCircle } from 'lucide-react'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

interface TimelineItemProps {
  title: string;
  subtitle: string;
  startDate: string;
  endDate: string | null;
}

const TimelineItem = ({ title, subtitle, startDate, endDate }: TimelineItemProps) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Present";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="relative pl-6 pb-6 border-l border-muted last:pb-0">
      <div className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3 rounded-full bg-primary"></div>
      <div className="space-y-1">
        <h4 className="font-medium text-sm">{title}</h4>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="h-3 w-3 mr-1" />
          {formatDate(startDate)} - {formatDate(endDate)}
        </div>
      </div>
    </div>
  );
};

interface DoctorDetailsProps {
  doctor: any;
}

const DoctorDetails = ({ doctor }: DoctorDetailsProps) => {
  return (
    <Tabs defaultValue="education" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="education">Education</TabsTrigger>
        <TabsTrigger value="experience">Experience</TabsTrigger>
      </TabsList>
      
      <TabsContent value="education" className="space-y-4 pt-4">
        {doctor.educations && doctor.educations.length > 0 ? (
          <div className="space-y-6">
            {doctor.educations.map((education: any) => (
              <TimelineItem
                key={education.id}
                title={education.degreeName}
                subtitle={education.instituteName}
                startDate={education.startDate}
                endDate={education.endDate}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            No education information available
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="experience" className="space-y-4 pt-4">
        {doctor.experiences && doctor.experiences.length > 0 ? (
          <div className="space-y-6">
            {doctor.experiences.map((experience: any) => (
              <TimelineItem
                key={experience.id}
                title={experience.designation}
                subtitle={experience.hospitalName}
                startDate={experience.startDate}
                endDate={experience.endDate}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            No experience information available
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default function DoctorsGrid() {
  const [doctors, setDoctors] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [filterApproved, setFilterApproved] = useState<boolean | null>(null) // null = all, true = approved, false = unapproved

  const fetchDoctors = async (isApproved?: boolean | null) => {
    try {
      setLoading(true)
      setError(null)
      
      let url = 'https://www.medical-app.online/doctors'
      if (typeof isApproved === 'boolean') {
        url += `?isApproved=${isApproved}`
      }
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token') || '{}').token}`,
        }
      })

      const data = await response.json()
      
      if (Array.isArray(data)) {
        setDoctors(data)
        toast.success(`Loaded ${data.length} doctors successfully!`)
      } else {
        setError('Invalid response format')
        toast.error('Failed to load doctors')
      }
    } catch (err) {
      console.error('Error fetching doctors:', err)
      setError('Failed to fetch doctors')
      toast.error('Failed to fetch doctors')
    } finally {
      setLoading(false)
    }
  }

  const toggleDoctorApproval = async (doctorId: number, currentApprovalStatus: boolean) => {
    try {
      const response = await fetch(`https://www.medical-app.online/doctors/${doctorId}/${currentApprovalStatus === false ? 'approve' : 'disapproved'}`, {
        method: 'PATCH',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token') || '{}').token}`,
        }
      })

      const data = await response.json()
      
      if (response.ok) {
        // Update the local state to reflect the change
        setDoctors(prevDoctors => 
          prevDoctors.map(doctor => 
            doctor.id === doctorId 
              ? { ...doctor, isApproved: !currentApprovalStatus }
              : doctor
          )
        )
        
        const action = currentApprovalStatus ? 'removed approval from' : 'approved'
        toast.success(`Successfully ${action} ${data.user?.username || `Doctor #${doctorId}`}`)
      } else {
        toast.error(data.message || 'Failed to update approval status')
      }
    } catch (err) {
      console.error('Error updating doctor approval:', err)
      toast.error('Failed to update approval status')
    }
  }

  useEffect(() => {
    fetchDoctors()
  }, [])

  const toggleExpand = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Our Doctors</h1>
        <div className="flex items-center gap-2">
          <Button 
            variant={filterApproved === null ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setFilterApproved(null)
              fetchDoctors()
            }}
          >
            All
          </Button>
          <Button 
            variant={filterApproved === true ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setFilterApproved(true)
              fetchDoctors(true)
            }}
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Approved
          </Button>
          <Button 
            variant={filterApproved === false ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setFilterApproved(false)
              fetchDoctors(false)
            }}
          >
            <XCircle className="h-4 w-4 mr-1" />
            Pending
          </Button>
          <Button 
            variant="outline" 
            onClick={() => fetchDoctors(filterApproved)} 
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

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-2">
            <LoaderCircle className="h-6 w-6 animate-spin" />
            <span>Loading doctors...</span>
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={() => fetchDoctors(filterApproved)} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      )}

      {!loading && !error && doctors.length === 0 && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              {filterApproved === null ? 'No doctors found' : 
               filterApproved ? 'No approved doctors found' : 'No pending doctors found'}
            </p>
            <Button onClick={() => fetchDoctors(filterApproved)} variant="outline">
              Refresh
            </Button>
          </div>
        </div>
      )}

      {!loading && !error && doctors.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-4">
                    <div>
                      <CardTitle className="text-lg">{doctor.user?.username || `Doctor #${doctor.id}`}</CardTitle>
                      <CardDescription>
                        {doctor.title || 'Medical Professional'} • {doctor.BMDC || 'BMDC Pending'}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={doctor.isApproved ? "success" : "secondary"}>
                    {doctor.isApproved ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                    {doctor.isApproved ? "Approved" : "Pending"}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pb-2">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      <span className="font-medium">Name:</span> {doctor.user?.username || 'N/A'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      <span className="font-medium">Email:</span> {doctor.user?.email || 'N/A'}
                    </span>
                  </div>

                  {doctor.title && (
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        <span className="font-medium">Title:</span> {doctor.title}
                      </span>
                    </div>
                  )}

                  {doctor.BMDC && (
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        <span className="font-medium">BMDC:</span> {doctor.BMDC}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      <span className="font-medium">Education:</span> {doctor.educations?.length || 0} {doctor.educations?.length === 1 ? 'degree' : 'degrees'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      <span className="font-medium">Experience:</span> {doctor.experiences?.length || 0} {doctor.experiences?.length === 1 ? 'position' : 'positions'}
                    </span>
                  </div>
                  
                  {doctor.experiences?.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        <span className="font-medium">Current/Latest:</span> {
                          doctor.experiences
                            .filter((exp: any) => !exp.endDate)
                            .map((exp: any) => exp.hospitalName)
                            .join(", ") || 
                          doctor.experiences[doctor.experiences.length - 1].hospitalName
                        }
                      </span>
                    </div>
                  )}

                  {doctor.introduction && (
                    <div className="pt-2">
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {doctor.introduction}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col justify-between pt-0">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => toggleExpand(doctor.id)}
                >
                  {expandedCard === doctor.id ? (
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
                
                <div className="flex items-center gap-2">
                  <Button
                    variant={doctor.isApproved ? "destructive" : "default"}
                    size="sm"
                    onClick={() => toggleDoctorApproval(doctor.id, doctor.isApproved)}
                    className="text-xs"
                  >
                    {doctor.isApproved ? (
                      <>
                        <XCircle className="h-3 w-3 mr-1" />
                        Remove Approval
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Approve
                      </>
                    )}
                  </Button>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">View Profile</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <div className="flex items-center space-x-4">
                          <div>
                            <DialogTitle>{doctor.user?.username || `Doctor #${doctor.id}`}</DialogTitle>
                            <DialogDescription>
                              {doctor.title || 'Medical Professional'} • {doctor.user?.email || 'Email not available'}
                            </DialogDescription>
                          </div>
                        </div>
                      </DialogHeader>
                      <div className="mt-4">
                        <DoctorDetails doctor={doctor} />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardFooter>
              
              {expandedCard === doctor.id && (
                <div className="px-6 pb-4">
                  <div className="pt-2 border-t">
                    <h4 className="text-sm font-medium mb-2">Doctor Information</h4>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      {doctor.title && <p>Title: {doctor.title}</p>}
                      {doctor.BMDC && <p>BMDC: {doctor.BMDC}</p>}
                      <p>Status: {doctor.isApproved ? 'Approved' : 'Pending Approval'}</p>
                      {doctor.introduction && <p>Introduction: {doctor.introduction}</p>}
                    </div>
                    
                    <h4 className="text-sm font-medium mb-2 mt-4">Education & Experience</h4>
                    
                    {doctor.educations?.length > 0 && (
                      <div className="mb-2">
                        <p className="text-xs text-muted-foreground">
                          <span className="font-medium">Latest Education:</span> {doctor.educations[doctor.educations.length - 1].degreeName} from {doctor.educations[doctor.educations.length - 1].instituteName}
                        </p>
                      </div>
                    )}
                    
                    {doctor.experiences?.length > 0 && (
                      <div>
                        <p className="text-xs text-muted-foreground">
                          <span className="font-medium">Latest Experience:</span> {doctor.experiences[doctor.experiences.length - 1].designation} at {doctor.experiences[doctor.experiences.length - 1].hospitalName}
                        </p>
                      </div>
                    )}

                    {(!doctor.educations?.length && !doctor.experiences?.length) && (
                      <p className="text-xs text-muted-foreground">No education or experience information available</p>
                    )}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
