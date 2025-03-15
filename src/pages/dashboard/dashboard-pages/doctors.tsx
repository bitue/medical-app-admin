// "use client"

// import { useState } from "react"
// import { User, GraduationCap, Briefcase, Building, Calendar, ChevronDown, ChevronUp } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { 
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// // Sample data with populated education and experience arrays based on your entity structure
// const doctorsData = {
//   "code": 200,
//   "message": "Doctors retrieved successfully!",
//   "data": [
//     {
//       "id": 1,
//       "userId": 1,
//       "educations": [
//         {
//           "id": 1,
//           "degreeName": "Doctor of Medicine",
//           "instituteName": "Harvard Medical School",
//           "startDate": "2010-09-01T00:00:00.000Z",
//           "endDate": "2014-06-30T00:00:00.000Z"
//         },
//         {
//           "id": 2,
//           "degreeName": "Cardiology Fellowship",
//           "instituteName": "Mayo Clinic",
//           "startDate": "2014-07-01T00:00:00.000Z",
//           "endDate": "2017-06-30T00:00:00.000Z"
//         }
//       ],
//       "experiences": [
//         {
//           "id": 1,
//           "hospitalName": "Massachusetts General Hospital",
//           "designation": "Resident Physician",
//           "startDate": "2014-07-01T00:00:00.000Z",
//           "endDate": "2017-06-30T00:00:00.000Z"
//         },
//         {
//           "id": 2,
//           "hospitalName": "Cleveland Clinic",
//           "designation": "Attending Cardiologist",
//           "startDate": "2017-07-01T00:00:00.000Z",
//           "endDate": "2023-12-31T00:00:00.000Z"
//         }
//       ]
//     },
//     {
//       "id": 2,
//       "userId": 2,
//       "educations": [
//         {
//           "id": 3,
//           "degreeName": "Doctor of Medicine",
//           "instituteName": "Stanford University School of Medicine",
//           "startDate": "2008-09-01T00:00:00.000Z",
//           "endDate": "2012-06-30T00:00:00.000Z"
//         },
//         {
//           "id": 4,
//           "degreeName": "Neurology Residency",
//           "instituteName": "UCSF Medical Center",
//           "startDate": "2012-07-01T00:00:00.000Z",
//           "endDate": "2016-06-30T00:00:00.000Z"
//         }
//       ],
//       "experiences": [
//         {
//           "id": 3,
//           "hospitalName": "UCSF Medical Center",
//           "designation": "Resident Neurologist",
//           "startDate": "2012-07-01T00:00:00.000Z",
//           "endDate": "2016-06-30T00:00:00.000Z"
//         },
//         {
//           "id": 4,
//           "hospitalName": "Johns Hopkins Hospital",
//           "designation": "Attending Neurologist",
//           "startDate": "2016-07-01T00:00:00.000Z",
//           "endDate": null
//         }
//       ]
//     }
//   ]
// };

// interface TimelineItemProps {
//   title: string;
//   subtitle: string;
//   startDate: string;
//   endDate: string | null;
// }

// const TimelineItem = ({ title, subtitle, startDate, endDate }: TimelineItemProps) => {
//   const formatDate = (dateString: string | null) => {
//     if (!dateString) return "Present";
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short'
//     });
//   };

//   return (
//     <div className="relative pl-6 pb-6 border-l border-muted last:pb-0">
//       <div className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3 rounded-full bg-primary"></div>
//       <div className="space-y-1">
//         <h4 className="font-medium text-sm">{title}</h4>
//         <p className="text-sm text-muted-foreground">{subtitle}</p>
//         <div className="flex items-center text-xs text-muted-foreground">
//           <Calendar className="h-3 w-3 mr-1" />
//           {formatDate(startDate)} - {formatDate(endDate)}
//         </div>
//       </div>
//     </div>
//   );
// };

// interface DoctorDetailsProps {
//   doctor: any;
// }

// const DoctorDetails = ({ doctor }: DoctorDetailsProps) => {
//   return (
//     <Tabs defaultValue="education" className="w-full">
//       <TabsList className="grid w-full grid-cols-2">
//         <TabsTrigger value="education">Education</TabsTrigger>
//         <TabsTrigger value="experience">Experience</TabsTrigger>
//       </TabsList>
      
//       <TabsContent value="education" className="space-y-4 pt-4">
//         {doctor.educations && doctor.educations.length > 0 ? (
//           <div className="space-y-6">
//             {doctor.educations.map((education: any) => (
//               <TimelineItem
//                 key={education.id}
//                 title={education.degreeName}
//                 subtitle={education.instituteName}
//                 startDate={education.startDate}
//                 endDate={education.endDate}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-6 text-muted-foreground">
//             No education information available
//           </div>
//         )}
//       </TabsContent>
      
//       <TabsContent value="experience" className="space-y-4 pt-4">
//         {doctor.experiences && doctor.experiences.length > 0 ? (
//           <div className="space-y-6">
//             {doctor.experiences.map((experience: any) => (
//               <TimelineItem
//                 key={experience.id}
//                 title={experience.designation}
//                 subtitle={experience.hospitalName}
//                 startDate={experience.startDate}
//                 endDate={experience.endDate}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-6 text-muted-foreground">
//             No experience information available
//           </div>
//         )}
//       </TabsContent>
//     </Tabs>
//   );
// };

// export default function DoctorsGrid() {
//   const [expandedCard, setExpandedCard] = useState<number | null>(null);
  
//   const toggleExpand = (id: number) => {
//     setExpandedCard(expandedCard === id ? null : id);
//   };

//   return (
//     <div className="container mx-auto py-6">
//       <h1 className="text-2xl font-bold mb-6">Our Doctors</h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {doctorsData.data.map((doctor) => (
//           <Card key={doctor.id} className="overflow-hidden">
//             <CardHeader className="pb-2">
//               <div className="flex justify-between items-start">
//                 <div className="flex items-center space-x-4">
//                   {/* <div className="relative h-12 w-12 rounded-full overflow-hidden bg-muted">
//                     <img 
//                       src={`/placeholder.svg?height=100&width=100&text=Dr.${doctor.id}`} 
//                       alt={`Doctor ${doctor.id}`}
//                       className="object-cover"
//                     />
//                   </div> */}
//                   <div>
//                     <CardTitle className="text-lg">Doctor #{doctor.id}</CardTitle>
//                     <CardDescription>
//                       User ID: {doctor.userId}
//                     </CardDescription>
//                   </div>
//                 </div>
//               </div>
//             </CardHeader>
            
//             <CardContent className="pb-2">
//               <div className="space-y-3">
//                 <div className="flex items-center gap-2">
//                   <User className="h-4 w-4 text-muted-foreground" />
//                   <span className="text-sm">
//                     <span className="font-medium">User ID:</span> {doctor.userId}
//                   </span>
//                 </div>
                
//                 <div className="flex items-center gap-2">
//                   <GraduationCap className="h-4 w-4 text-muted-foreground" />
//                   <span className="text-sm">
//                     <span className="font-medium">Education:</span> {doctor.educations.length} {doctor.educations.length === 1 ? 'degree' : 'degrees'}
//                   </span>
//                 </div>
                
//                 <div className="flex items-center gap-2">
//                   <Briefcase className="h-4 w-4 text-muted-foreground" />
//                   <span className="text-sm">
//                     <span className="font-medium">Experience:</span> {doctor.experiences.length} {doctor.experiences.length === 1 ? 'position' : 'positions'}
//                   </span>
//                 </div>
                
//                 {doctor.experiences.length > 0 && (
//                   <div className="flex items-center gap-2">
//                     <Building className="h-4 w-4 text-muted-foreground" />
//                     <span className="text-sm">
//                       <span className="font-medium">Current/Latest:</span> {
//                         doctor.experiences
//                           .filter((exp: any) => !exp.endDate)
//                           .map((exp: any) => exp.hospitalName)
//                           .join(", ") || 
//                         doctor.experiences[doctor.experiences.length - 1].hospitalName
//                       }
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </CardContent>
            
//             <CardFooter className="flex justify-between pt-0">
//               <Button 
//                 variant="ghost" 
//                 size="sm" 
//                 className="text-xs"
//                 onClick={() => toggleExpand(doctor.id)}
//               >
//                 {expandedCard === doctor.id ? (
//                   <>
//                     <ChevronUp className="h-4 w-4 mr-1" />
//                     Show Less
//                   </>
//                 ) : (
//                   <>
//                     <ChevronDown className="h-4 w-4 mr-1" />
//                     Show More
//                   </>
//                 )}
//               </Button>
              
//               <Dialog>
//                 <DialogTrigger asChild>
//                   <Button size="sm">View Profile</Button>
//                 </DialogTrigger>
//                 <DialogContent className="max-w-md">
//                   <DialogHeader>
//                     <div className="flex items-center space-x-4">
//                       {/* <div className="relative h-16 w-16 rounded-full overflow-hidden bg-muted">
//                         <img 
//                           src={`/placeholder.svg?height=100&width=100&text=Dr.${doctor.id}`} 
//                           alt={`Doctor ${doctor.id}`}
//                           className="object-cover"
//                         />
//                       </div> */}
//                       <div>
//                         <DialogTitle>Doctor #{doctor.id}</DialogTitle>
//                         <DialogDescription>
//                           User ID: {doctor.userId}
//                         </DialogDescription>
//                       </div>
//                     </div>
//                   </DialogHeader>
//                   <div className="mt-4">
//                     <DoctorDetails doctor={doctor} />
//                   </div>
//                 </DialogContent>
//               </Dialog>
//             </CardFooter>
            
//             {expandedCard === doctor.id && (
//               <div className="px-6 pb-4">
//                 <div className="pt-2 border-t">
//                   <h4 className="text-sm font-medium mb-2">Education & Experience</h4>
                  
//                   {doctor.educations.length > 0 && (
//                     <div className="mb-2">
//                       <p className="text-xs text-muted-foreground">
//                         <span className="font-medium">Latest Education:</span> {doctor.educations[doctor.educations.length - 1].degreeName} from {doctor.educations[doctor.educations.length - 1].instituteName}
//                       </p>
//                     </div>
//                   )}
                  
//                   {doctor.experiences.length > 0 && (
//                     <div>
//                       <p className="text-xs text-muted-foreground">
//                         <span className="font-medium">Latest Experience:</span> {doctor.experiences[doctor.experiences.length - 1].designation} at {doctor.experiences[doctor.experiences.length - 1].hospitalName}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import { User, GraduationCap, Briefcase, Building, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// // TimelineItem component to display each item in education and experience
// interface TimelineItemProps {
//   title: string;
//   subtitle: string;
//   startDate: string;
//   endDate: string | null;
// }

// const TimelineItem = ({ title, subtitle, startDate, endDate }: TimelineItemProps) => {
//   const formatDate = (dateString: string | null) => {
//     if (!dateString) return "Present";
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short'
//     });
//   };

//   return (
//     <div className="relative pl-6 pb-6 border-l border-muted last:pb-0">
//       <div className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3 rounded-full bg-primary"></div>
//       <div className="space-y-1">
//         <h4 className="font-medium text-sm">{title}</h4>
//         <p className="text-sm text-muted-foreground">{subtitle}</p>
//         <div className="flex items-center text-xs text-muted-foreground">
//           <Calendar className="h-3 w-3 mr-1" />
//           {formatDate(startDate)} - {formatDate(endDate)}
//         </div>
//       </div>
//     </div>
//   );
// };

// // DoctorDetails component to display education and experience in tabs
// interface DoctorDetailsProps {
//   doctor: any;
// }

// const DoctorDetails = ({ doctor }: DoctorDetailsProps) => {
//   return (
//     <Tabs defaultValue="education" className="w-full">
//       <TabsList className="grid w-full grid-cols-2">
//         <TabsTrigger value="education">Education</TabsTrigger>
//         <TabsTrigger value="experience">Experience</TabsTrigger>
//       </TabsList>
      
//       <TabsContent value="education" className="space-y-4 pt-4">
//         {doctor.educations && doctor.educations.length > 0 ? (
//           <div className="space-y-6">
//             {doctor.educations.map((education: any) => (
//               <TimelineItem
//                 key={education.id}
//                 title={education.degreeName}
//                 subtitle={education.instituteName}
//                 startDate={education.startDate}
//                 endDate={education.endDate}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-6 text-muted-foreground">
//             No education information available
//           </div>
//         )}
//       </TabsContent>
      
//       <TabsContent value="experience" className="space-y-4 pt-4">
//         {doctor.experiences && doctor.experiences.length > 0 ? (
//           <div className="space-y-6">
//             {doctor.experiences.map((experience: any) => (
//               <TimelineItem
//                 key={experience.id}
//                 title={experience.designation}
//                 subtitle={experience.hospitalName}
//                 startDate={experience.startDate}
//                 endDate={experience.endDate}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-6 text-muted-foreground">
//             No experience information available
//           </div>
//         )}
//       </TabsContent>
//     </Tabs>
//   );
// };

// // Main DoctorsGrid component
// export default function DoctorsGrid() {
//   const [doctorsData, setDoctorsData] = useState<any[]>([]);
//   const [expandedCard, setExpandedCard] = useState<number | null>(null);

//   // Fetch doctors data from API
//   const getDoctorsData = () => {
//     fetch("https://www.medical-app.online/doctors", {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data?.length) {
//           setDoctorsData(data); // Update state with fetched data
//         } else {
//           toast.error("No doctors data found");
//         }
//       })
//       .catch(() => {
//         toast.error("Something went wrong while fetching doctor data");
//       });
//   };

//   // Fetch doctors data on component mount
//   useEffect(() => {
//     getDoctorsData();
//   }, []);

//   // Toggle expand/collapse for doctor details
//   const toggleExpand = (id: number) => {
//     setExpandedCard(expandedCard === id ? null : id);
//   };

//   return (
//     <div className="container mx-auto py-6">
//       <h1 className="text-2xl font-bold mb-6">Our Doctors</h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {doctorsData.map((doctor) => (
//           <Card key={doctor.id} className="overflow-hidden">
//             <CardHeader className="pb-2">
//               <div className="flex justify-between items-start">
//                 <div className="flex items-center space-x-4">
//                   <div>
//                     <CardTitle className="text-lg">{doctor.user.username}</CardTitle>
//                     <CardDescription>{doctor.user.email}</CardDescription>
//                   </div>
//                 </div>
//               </div>
//             </CardHeader>
            
//             <CardContent className="pb-2">
//               <div className="space-y-3">
//                 <div className="flex items-center gap-2">
//                   <User className="h-4 w-4 text-muted-foreground" />
//                   <span className="text-sm">
//                     <span className="font-medium">Username:</span> {doctor.user.username}
//                   </span>
//                 </div>
                
//                 <div className="flex items-center gap-2">
//                   <GraduationCap className="h-4 w-4 text-muted-foreground" />
//                   <span className="text-sm">
//                     <span className="font-medium">Education:</span> {doctor.educations.length} {doctor.educations.length === 1 ? 'degree' : 'degrees'}
//                   </span>
//                 </div>
                
//                 <div className="flex items-center gap-2">
//                   <Briefcase className="h-4 w-4 text-muted-foreground" />
//                   <span className="text-sm">
//                     <span className="font-medium">Experience:</span> {doctor.experiences.length} {doctor.experiences.length === 1 ? 'position' : 'positions'}
//                   </span>
//                 </div>
                
//                 {doctor.experiences.length > 0 && (
//                   <div className="flex items-center gap-2">
//                     <Building className="h-4 w-4 text-muted-foreground" />
//                     <span className="text-sm">
//                       <span className="font-medium">Current/Latest:</span> {
//                         doctor.experiences
//                           .filter((exp: any) => !exp.endDate)
//                           .map((exp: any) => exp.hospitalName)
//                           .join(", ") || 
//                         doctor.experiences[doctor.experiences.length - 1].hospitalName
//                       }
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </CardContent>
            
//             <CardFooter className="flex justify-between pt-0">
//               <Button 
//                 variant="ghost" 
//                 size="sm" 
//                 className="text-xs"
//                 onClick={() => toggleExpand(doctor.id)}
//               >
//                 {expandedCard === doctor.id ? (
//                   <>
//                     <ChevronUp className="h-4 w-4 mr-1" />
//                     Show Less
//                   </>
//                 ) : (
//                   <>
//                     <ChevronDown className="h-4 w-4 mr-1" />
//                     Show More
//                   </>
//                 )}
//               </Button>
              
//               <Dialog>
//                 <DialogTrigger asChild>
//                   <Button size="sm">View Profile</Button>
//                 </DialogTrigger>
//                 <DialogContent className="max-w-md">
//                   <DialogHeader>
//                     <DialogTitle>{doctor.user.username}</DialogTitle>
//                     <DialogDescription>{doctor.user.email}</DialogDescription>
//                   </DialogHeader>
//                   <div className="mt-4">
//                     <DoctorDetails doctor={doctor} />
//                   </div>
//                 </DialogContent>
//               </Dialog>
//             </CardFooter>
            
//             {expandedCard === doctor.id && (
//               <div className="px-6 pb-4">
//                 <div className="pt-2 border-t">
//                   <h4 className="text-sm font-medium mb-2">Education & Experience</h4>
                  
//                   {doctor.educations.length > 0 && (
//                     <div className="mb-2">
//                       <p className="text-xs text-muted-foreground">
//                         <span className="font-medium">Latest Education:</span> {doctor.educations[doctor.educations.length - 1].degreeName} from {doctor.educations[doctor.educations.length - 1].instituteName}
//                       </p>
//                     </div>
//                   )}
                  
//                   {doctor.experiences.length > 0 && (
//                     <div>
//                       <p className="text-xs text-muted-foreground">
//                         <span className="font-medium">Latest Experience:</span> {doctor.experiences[doctor.experiences.length - 1].designation} at {doctor.experiences[doctor.experiences.length - 1].hospitalName}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }

//=========================================================>>>>

// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import { User, GraduationCap, Briefcase, Building, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// // TimelineItem component to display each item in education and experience
// interface TimelineItemProps {
//   title: string;
//   subtitle: string;
//   startDate: string;
//   endDate: string | null;
// }

// const TimelineItem = ({ title, subtitle, startDate, endDate }: TimelineItemProps) => {
//   const formatDate = (dateString: string | null) => {
//     if (!dateString) return "Present";
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short'
//     });
//   };

//   return (
//     <div className="relative pl-6 pb-6 border-l border-muted last:pb-0">
//       <div className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3 rounded-full bg-primary"></div>
//       <div className="space-y-1">
//         <h4 className="font-medium text-sm">{title}</h4>
//         <p className="text-sm text-muted-foreground">{subtitle}</p>
//         <div className="flex items-center text-xs text-muted-foreground">
//           <Calendar className="h-3 w-3 mr-1" />
//           {formatDate(startDate)} - {formatDate(endDate)}
//         </div>
//       </div>
//     </div>
//   );
// };

// // DoctorDetails component to display education and experience in tabs
// interface DoctorDetailsProps {
//   doctor: any;
// }

// const DoctorDetails = ({ doctor }: DoctorDetailsProps) => {
//   return (
//     <Tabs defaultValue="education" className="w-full">
//       <TabsList className="grid w-full grid-cols-2">
//         <TabsTrigger value="education">Education</TabsTrigger>
//         <TabsTrigger value="experience">Experience</TabsTrigger>
//       </TabsList>
      
//       <TabsContent value="education" className="space-y-4 pt-4">
//         {doctor.educations && doctor.educations.length > 0 ? (
//           <div className="space-y-6">
//             {doctor.educations.map((education: any) => (
//               <TimelineItem
//                 key={education.id}
//                 title={education.degreeName}
//                 subtitle={education.instituteName}
//                 startDate={education.startDate}
//                 endDate={education.endDate}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-6 text-muted-foreground">
//             No education information available
//           </div>
//         )}
//       </TabsContent>
      
//       <TabsContent value="experience" className="space-y-4 pt-4">
//         {doctor.experiences && doctor.experiences.length > 0 ? (
//           <div className="space-y-6">
//             {doctor.experiences.map((experience: any) => (
//               <TimelineItem
//                 key={experience.id}
//                 title={experience.designation}
//                 subtitle={experience.hospitalName}
//                 startDate={experience.startDate}
//                 endDate={experience.endDate}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-6 text-muted-foreground">
//             No experience information available
//           </div>
//         )}
//       </TabsContent>
//     </Tabs>
//   );
// };

// // Main DoctorsGrid component
// export default function DoctorsGrid() {
//   const [doctorsData, setDoctorsData] = useState<any[]>([]);
//   const [expandedCard, setExpandedCard] = useState<number | null>(null);

//   // Fetch doctors data from API
//   const getDoctorsData = () => {
//     fetch("https://www.medical-app.online/doctors", {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data?.length) {
//           setDoctorsData(data); // Update state with fetched data
//         } else {
//           toast.error("No doctors data found");
//         }
//       })
//       .catch(() => {
//         toast.error("Something went wrong while fetching doctor data");
//       });
//   };

//   // Fetch doctors data on component mount
//   useEffect(() => {
//     getDoctorsData();
//   }, []);

//   // Toggle expand/collapse for doctor details
//   const toggleExpand = (id: number) => {
//     setExpandedCard(expandedCard === id ? null : id);
//   };

//   // Handle doctor approval
//   const approveDoctor = (doctorId: number) => {

//     console.log(`https://www.medical-app.online/doctors/${doctorId}/approve`, "++++++")

//     fetch(`https://www.medical-app.online/doctors/${doctorId}/approve`, {
//       method: "POST",
//       headers: {
//         accept: "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.status) {
//           toast.success("Doctor Approval successfully!");
//           // Update the doctor status after approval
//           setDoctorsData((prevDoctors) =>
//             prevDoctors.map((doctor) =>
//               doctor.id === doctorId
//                 ? { ...doctor, isApproved: true }
//                 : doctor
//             )
//           );
//         } else {
//           toast.error("Doctor approval failed!");
//         }
//       })
//       .catch(() => {
//         toast.error("Something went wrong while approving the doctor");
//       });
//   };

//   return (
//     <div className="container mx-auto py-6">
//       <h1 className="text-2xl font-bold mb-6">Our Doctors</h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {doctorsData.map((doctor) => (
//           <Card key={doctor.id} className="overflow-hidden">
//             <CardHeader className="pb-2">
//               <div className="flex justify-between items-start">
//                 <div className="flex items-center space-x-4">
//                   <div>
//                     <CardTitle className="text-lg">{doctor.user.username}</CardTitle>
//                     <CardDescription>{doctor.user.email}</CardDescription>
//                   </div>
//                 </div>
//               </div>
//             </CardHeader>
            
//             <CardContent className="pb-2">
//               <div className="space-y-3">
//                 <div className="flex items-center gap-2">
//                   <User className="h-4 w-4 text-muted-foreground" />
//                   <span className="text-sm">
//                     <span className="font-medium">Username:</span> {doctor.user.username}
//                   </span>
//                 </div>
                
//                 <div className="flex items-center gap-2">
//                   <GraduationCap className="h-4 w-4 text-muted-foreground" />
//                   <span className="text-sm">
//                     <span className="font-medium">Education:</span> {doctor.educations.length} {doctor.educations.length === 1 ? 'degree' : 'degrees'}
//                   </span>
//                 </div>
                
//                 <div className="flex items-center gap-2">
//                   <Briefcase className="h-4 w-4 text-muted-foreground" />
//                   <span className="text-sm">
//                     <span className="font-medium">Experience:</span> {doctor.experiences.length} {doctor.experiences.length === 1 ? 'position' : 'positions'}
//                   </span>
//                 </div>
                
//                 {doctor.experiences.length > 0 && (
//                   <div className="flex items-center gap-2">
//                     <Building className="h-4 w-4 text-muted-foreground" />
//                     <span className="text-sm">
//                       <span className="font-medium">Current/Latest:</span> {
//                         doctor.experiences
//                           .filter((exp: any) => !exp.endDate)
//                           .map((exp: any) => exp.hospitalName)
//                           .join(", ") || 
//                         doctor.experiences[doctor.experiences.length - 1].hospitalName
//                       }
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </CardContent>
            
//             <CardFooter className="flex justify-between pt-0">
//               {doctor.isApproved ? (
//                 <Button variant="success" size="sm" disabled>Approved</Button>
//               ) : (
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => approveDoctor(doctor.id)}
//                 >
//                   Approve
//                 </Button>
//               )}

//               <Button variant="ghost" size="sm" onClick={() => toggleExpand(doctor.id)}>
//                 {expandedCard === doctor.id ? (
//                   <>
//                     <ChevronUp className="h-4 w-4 mr-1" />
//                     Show Less
//                   </>
//                 ) : (
//                   <>
//                     <ChevronDown className="h-4 w-4 mr-1" />
//                     Show More
//                   </>
//                 )}
//               </Button>

//               <Dialog>
//                 <DialogTrigger asChild>
//                   <Button size="sm">View Profile</Button>
//                 </DialogTrigger>
//                 <DialogContent className="max-w-md">
//                   <DialogHeader>
//                     <DialogTitle>{doctor.user.username}</DialogTitle>
//                     <DialogDescription>{doctor.user.email}</DialogDescription>
//                   </DialogHeader>
//                   <div className="mt-4">
//                     <DoctorDetails doctor={doctor} />
//                   </div>
//                 </DialogContent>
//               </Dialog>
//             </CardFooter>
            
//             {expandedCard === doctor.id && (
//               <div className="px-6 pb-4">
//                 <div className="pt-2 border-t">
//                   <h4 className="text-sm font-medium mb-2">Education & Experience</h4>
                  
//                   {doctor.educations.length > 0 && (
//                     <div className="mb-2">
//                       <p className="text-xs text-muted-foreground">
//                         <span className="font-medium">Latest Education:</span> {doctor.educations[doctor.educations.length - 1].degreeName} from {doctor.educations[doctor.educations.length - 1].instituteName}
//                       </p>
//                     </div>
//                   )}
                  
//                   {doctor.experiences.length > 0 && (
//                     <div>
//                       <p className="text-xs text-muted-foreground">
//                         <span className="font-medium">Latest Experience:</span> {doctor.experiences[doctor.experiences.length - 1].designation} at {doctor.experiences[doctor.experiences.length - 1].hospitalName}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { toast } from "sonner";
import { User, GraduationCap, Briefcase, Building, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// TimelineItem component to display each item in education and experience
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

// DoctorDetails component to display education and experience in tabs
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

// Main DoctorsGrid component
export default function DoctorsGrid() {
  const [doctorsData, setDoctorsData] = useState<any[]>([]);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  // Fetch doctors data from the new API endpoint that includes the isApproved field
  const getDoctorsData = () => {
    fetch("https://www.medical-app.online/doctors/with-status", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.length) {
          setDoctorsData(data); // Update state with fetched data
        } else {
          toast.error("No doctors data found");
        }
      })
      .catch(() => {
        toast.error("Something went wrong while fetching doctor data");
      });
  };

  // Fetch doctors data on component mount
  useEffect(() => {
    getDoctorsData();
  }, []);

  // Toggle expand/collapse for doctor details
  const toggleExpand = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  // Handle doctor approval
  const approveDoctor = (doctorId: number) => {
    // https://www.medical-app.online/doctors/5/approve
    fetch(`https://www.medical-app.online/doctors/${doctorId}/approve`, {
      method: "PATCH",
      headers: {
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, " ==============================================================>>>>")
        if (data.status) {
          toast.success("Doctor approved successfully!");
          // Update the doctor status after approval
          setDoctorsData((prevDoctors) =>
            prevDoctors.map((doctor) =>
              doctor.id === doctorId
                ? { ...doctor, isApproved: true }
                : doctor
            )
          );
        } else {
          toast.error("Doctor approval failed!");
        }
      })
      .catch(() => {
        toast.error("Something went wrong while approving the doctor");
      });
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Our Doctors</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctorsData.map((doctor) => (
          <Card key={doctor.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <div>
                    <CardTitle className="text-lg">{doctor.user.username}</CardTitle>
                    <CardDescription>{doctor.user.email}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pb-2">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-medium">Username:</span> {doctor.user.username}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-medium">Education:</span> {doctor.educations.length} {doctor.educations.length === 1 ? 'degree' : 'degrees'}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-medium">Experience:</span> {doctor.experiences.length} {doctor.experiences.length === 1 ? 'position' : 'positions'}
                  </span>
                </div>
                
                {doctor.experiences.length > 0 && (
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
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between pt-0">
              {doctor.isApproved ? (
                <Button variant="success" size="sm" disabled>Approved</Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => approveDoctor(doctor.id)}
                >
                  Approve
                </Button>
              )}

              <Button variant="ghost" size="sm" onClick={() => toggleExpand(doctor.id)}>
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

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">View Profile</Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>{doctor.user.username}</DialogTitle>
                    <DialogDescription>{doctor.user.email}</DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    <DoctorDetails doctor={doctor} />
                  </div>
                </DialogContent>
              </Dialog>
            </CardFooter>
            
            {expandedCard === doctor.id && (
              <div className="px-6 pb-4">
                <div className="pt-2 border-t">
                  <h4 className="text-sm font-medium mb-2">Education & Experience</h4>
                  
                  {doctor.educations.length > 0 && (
                    <div className="mb-2">
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">Latest Education:</span> {doctor.educations[doctor.educations.length - 1].degreeName} from {doctor.educations[doctor.educations.length - 1].instituteName}
                      </p>
                    </div>
                  )}
                  
                  {doctor.experiences.length > 0 && (
                    <div>
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">Latest Experience:</span> {doctor.experiences[doctor.experiences.length - 1].designation} at {doctor.experiences[doctor.experiences.length - 1].hospitalName}
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
  );
}
