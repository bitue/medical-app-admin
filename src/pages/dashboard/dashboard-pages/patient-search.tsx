// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { LoaderCircle } from 'lucide-react';
// import { useState } from 'react';
// import { toast } from 'sonner';
// import PatientDetailsPage from './patient-details';

// // const _fakeResponse = {
// //   code: 200,
// //   message: 'Patient retrieved successfully!',
// //   data: {
// //     id: 1,
// //     userId: {
// //       id: 1,
// //       username: 'Rakib',
// //       email: 'rakibiuaece@gmail.com',
// //       password: '$2b$10$8qvHV.jgonQ9UNBHfgx4x.WcEyt6z/Xn955PUYLe7aR3MK1YpT8ai',
// //       role: 'patient',
// //       createdAt: '2025-03-11T17:46:29.315Z',
// //       updatedAt: '2025-03-11T17:46:29.315Z'
// //     },
// //     currentMedications: [],
// //     operationHistories: [],
// //     healthStatuses: [
// //       {
// //         id: 1,
// //         smokingStatus: false,
// //         exercise: true,
// //         alcoholStatus: true,
// //         covidVaccination: true,
// //         allergy: false,
// //         diabeticsStatus: true
// //       }
// //     ],
// //     prescriptions: [
// //       {
// //         id: 4,
// //         title: 'First prescription ',
// //         docPath:
// //           'https://medical-bucket.s3.eu-north-1.amazonaws.com/a5dce4a5-e69c-4ac2-a713-e7f3a7f8cf04-prescription_1741718830655.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA3TD2SZ2NU4MYMPMS%2F20250311%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250311T184713Z&X-Amz-Expires=518400&X-Amz-Signature=a47569f1d3dcdfceb4582a388c3e0edc9dbe0e53628d441f487a94817752f135&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject',
// //         prescriptionDate: '2025-03-03T18:46:00.000Z'
// //       }
// //     ],
// //     reports: [
// //       {
// //         id: 1,
// //         title: 'First report ',
// //         docPath:
// //           'https://medical-bucket.s3.eu-north-1.amazonaws.com/fa7abc45-bf1f-407e-8605-ed852c89466e-prescription_1741716342316.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA3TD2SZ2NU4MYMPMS%2F20250311%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250311T180545Z&X-Amz-Expires=518400&X-Amz-Signature=b1b0366989e7b8e28c46c8e29eabde9129a8f3f0ce78942852458f6bbf9d2644&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject',
// //         reportDate: '2025-03-11T18:05:00.000Z'
// //       },
// //       {
// //         id: 2,
// //         title: '2nd report ',
// //         docPath:
// //           'https://medical-bucket.s3.eu-north-1.amazonaws.com/f88279a3-cbb9-48ba-adfd-96ebe10268fa-prescription_1741716787676.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA3TD2SZ2NU4MYMPMS%2F20250311%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250311T181311Z&X-Amz-Expires=518400&X-Amz-Signature=5ed779a2e6033e630f909c0d372148e235710eb13d6d285850a37596bb1cff77&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject',
// //         reportDate: '2025-03-04T18:12:00.000Z'
// //       }
// //     ],
// //     appointments: [
// //       {
// //         id: 8,
// //         accessTime: 40,
// //         isApproved: false,
// //         createdAt: '2025-03-13T12:56:57.542Z',
// //         updatedAt: '2025-03-13T12:56:57.542Z'
// //       },
// //       {
// //         id: 7,
// //         accessTime: 25,
// //         isApproved: true,
// //         createdAt: '2025-03-12T19:43:00.098Z',
// //         updatedAt: '2025-03-12T19:43:00.098Z'
// //       },
// //       {
// //         id: 6,
// //         accessTime: 10,
// //         isApproved: true,
// //         createdAt: '2025-03-12T19:37:25.344Z',
// //         updatedAt: '2025-03-12T19:37:25.344Z'
// //       }
// //     ]
// //   },
// //   status: true
// // };

// const fakeData = {
//   code: 200,
//   message: "Patient retrieved successfully!",
//   data: {
//     id: 1,
//     userId: {
//       id: 1,
//       username: "Rakib",
//       email: "rakibiuaece@gmail.com",
//       password: "$2b$10$8qvHV.jgonQ9UNBHfgx4x.WcEyt6z/Xn955PUYLe7aR3MK1YpT8ai",
//       role: "patient",
//       createdAt: "2025-03-11T17:46:29.315Z",
//       updatedAt: "2025-03-11T17:46:29.315Z",
//     },
//     // Sample data for demonstration - would be empty in your actual data
//     currentMedications: [
//       {
//         id: 1,
//         startDate: "2025-02-15T00:00:00.000Z",
//         endDate: "2025-04-15T00:00:00.000Z",
//         doses: ["10mg morning", "5mg evening"],
//         doctor: {
//           id: 2,
//           name: "Dr. Sarah Johnson",
//         },
//       },
//       {
//         id: 2,
//         startDate: "2025-03-01T00:00:00.000Z",
//         endDate: "2025-03-30T00:00:00.000Z",
//         doses: ["20mg with meals"],
//         doctor: {
//           id: 3,
//           name: "Dr. Michael Chen",
//         },
//       },
//     ],
//     // Sample data for demonstration - would be empty in your actual data
//     operationHistories: [
//       {
//         id: 1,
//         startDate: "2024-11-10T00:00:00.000Z",
//         endDate: "2024-11-10T00:00:00.000Z",
//         descriptions: ["Appendectomy", "Laparoscopic procedure"],
//       },
//     ],
//     healthStatuses: [
//       {
//         id: 1,
//         smokingStatus: false,
//         exercise: true,
//         alcoholStatus: true,
//         covidVaccination: true,
//         allergy: false,
//         diabeticsStatus: true,
//       },
//     ],
//     prescriptions: [
//       {
//         id: 4,
//         title: "First prescription ",
//         docPath:
//           "https://medical-bucket.s3.eu-north-1.amazonaws.com/a5dce4a5-e69c-4ac2-a713-e7f3a7f8cf04-prescription_1741718830655.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA3TD2SZ2NU4MYMPMS%2F20250311%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250311T184713Z&X-Amz-Expires=518400&X-Amz-Signature=a47569f1d3dcdfceb4582a388c3e0edc9dbe0e53628d441f487a94817752f135&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject",
//         prescriptionDate: "2025-03-03T18:46:00.000Z",
//       },
//     ],
//     reports: [
//       {
//         id: 1,
//         title: "First report ",
//         docPath:
//           "https://medical-bucket.s3.eu-north-1.amazonaws.com/fa7abc45-bf1f-407e-8605-ed852c89466e-prescription_1741716342316.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA3TD2SZ2NU4MYMPMS%2F20250311%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250311T180545Z&X-Amz-Expires=518400&X-Amz-Signature=b1b0366989e7b8e28c46c8e29eabde9129a8f3f0ce78942852458f6bbf9d2644&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject",
//         reportDate: "2025-03-11T18:05:00.000Z",
//       },
//       {
//         id: 2,
//         title: "2nd report ",
//         docPath:
//           "https://medical-bucket.s3.eu-north-1.amazonaws.com/f88279a3-cbb9-48ba-adfd-96ebe10268fa-prescription_1741716787676.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA3TD2SZ2NU4MYMPMS%2F20250311%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250311T181311Z&X-Amz-Expires=518400&X-Amz-Signature=5ed779a2e6033e630f909c0d372148e235710eb13d6d285850a37596bb1cff77&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject",
//         reportDate: "2025-03-04T18:12:00.000Z",
//       },
//     ],
//     appointments: [
//       {
//         id: 8,
//         accessTime: 40,
//         isApproved: false,
//         createdAt: "2025-03-13T12:56:57.542Z",
//         updatedAt: "2025-03-13T12:56:57.542Z",
//       },
//       {
//         id: 7,
//         accessTime: 25,
//         isApproved: true,
//         createdAt: "2025-03-12T19:43:00.098Z",
//         updatedAt: "2025-03-12T19:43:00.098Z",
//       },
//       {
//         id: 6,
//         accessTime: 10,
//         isApproved: true,
//         createdAt: "2025-03-12T19:37:25.344Z",
//         updatedAt: "2025-03-12T19:37:25.344Z",
//       },
//     ],
//   },
//   status: true,
// }
// export default function PatientSearch() {
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [patientData, setPatientData] = useState<any>(null);

//   const onSearch = () => {
//     setLoading(true);
//     const q : string = `https://www.medical-app.online/patient/find-by-email?email=${searchQuery}` 
//     console.log(q, "+++++++++++++");

//     fetch(`https://www.medical-app.online/patient/find-by-email?email=${searchQuery}`, {
//       method: 'GET',
//       headers: {
//         accept: 'application/json'
//       }
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (!data.status) {
//           console.error('Patient not found');
//           toast.error(data.message);
//           setLoading(false);
//           return;
//         }
//         console.log(data);
//         setPatientData(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//         setLoading(false);
//       });
//   };

//   return (
//     <div>
//       <h2 className="mb-6 text-2xl font-bold">Patient Search</h2>
//       <div className="flex w-full max-w-sm items-center space-x-2">
//         <Input
//           type="email"
//           placeholder="Email"
//           onChange={(e) => setSearchQuery(e.target.value)}
//           value={searchQuery}
//         />
//         <Button onClick={() => onSearch()}>
//           Search {loading && <LoaderCircle className="animate-spin" />}
//         </Button>
//       </div>

//       {/* <PatientDetailsPage patientData={fakeData} /> */}
//       {patientData ? (
//         <PatientDetailsPage patientData={patientData} />
//       ) : (
//         <h2 className="mt-6 text-2xl font-bold">No patient found</h2>
//       )}
//     </div>
//   );
// }


// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { LoaderCircle } from 'lucide-react';
// import { useState } from 'react';
// import { toast } from 'sonner';
// import PatientDetailsPage from './patient-details';

// export default function PatientSearch() {
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [patientData, setPatientData] = useState<any>(null);

//   const onSearch = () => {
//     setLoading(true);
//     const q: string = `https://www.medical-app.online/patient/find-by-email?email=${searchQuery}`;
//     console.log(q, "+++++++++++++");

//     fetch(`https://www.medical-app.online/patient/find-by-email?email=${searchQuery}`, {
//       method: 'GET',
//       headers: {
//         accept: 'application/json'
//       }
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (!data.status) {
//           console.error('Patient not found');
//           toast.error(data.message);
//           setLoading(false);
//           return;
//         }
//         console.log(data);
//         setPatientData(data);  // Set the patient data dynamically
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//         setLoading(false);
//       });
//   };

//   return (
//     <div>
//       <h2 className="mb-6 text-2xl font-bold">Patient Search</h2>
//       <div className="flex w-full max-w-sm items-center space-x-2">
//         <Input
//           type="email"
//           placeholder="Email"
//           onChange={(e) => setSearchQuery(e.target.value)}
//           value={searchQuery}
//         />
//         <Button onClick={() => onSearch()}>
//           Search {loading && <LoaderCircle className="animate-spin" />}
//         </Button>
//       </div>

//       {/* Conditionally render the PatientDetailsPage component */}
//       {patientData ? (
//         <PatientDetailsPage patientData={patientData} />
//       ) : (
//         <h2 className="mt-6 text-2xl font-bold">No patient found</h2>
//       )}
//     </div>
//   );
// }


"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import PatientDetailsPage from "./patient-details";

export default function PatientSearch() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [patientData, setPatientData] = useState<any>(null);

  const onSearch = () => {
    setLoading(true);
    const q: string = `https://www.medical-app.online/patient/find-by-email?email=${searchQuery}`;
    console.log(q, "+++++++++++++");

    fetch(`https://www.medical-app.online/patient/find-by-email?email=${searchQuery}`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.status) {
          console.error("Patient not found");
          toast.error(data.message);
          setLoading(false);
          return;
        }
        console.log(data);
        setPatientData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Patient Search</h2>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        <Button onClick={() => onSearch()}>
          Search {loading && <LoaderCircle className="animate-spin" />}
        </Button>
      </div>

      {patientData ? (
        <PatientDetailsPage patientData={patientData} />
      ) : (
        <h2 className="mt-6 text-2xl font-bold">No patient found</h2>
      )}
    </div>
  );
}
