import { useEffect, useState } from "react";
import { toast } from "sonner";
import PatientCard from "./patient-card";

export default function UserInformation() {
  const [userDetails, setUserDetails] = useState<any[]>([]);
  const getPatientData = () => {
    fetch('https://www.medical-app.online/patient', {
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.length) {
          setUserDetails(data);
        } else {
          toast.error("No data found");
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };
  useEffect(() => {
    getPatientData();
  }, []);
  console.log("userDetails", userDetails);
  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-6 text-2xl font-bold">Patient Overview</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {userDetails.map((patient, index) => (
          <PatientCard key={index} name={patient?.userId?.username} email={patient?.userId?.email} medicationCount={patient?.currentMedications?.length} operationCount={patient?.operationHistories?.length} />
        ))}
      </div>
    </div>
  );
}