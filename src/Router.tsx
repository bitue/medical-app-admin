import { BrowserRouter, Route, Routes } from "react-router";
import UserInformation from "./pages/dashboard/dashboard-pages/user-information";
import Dashboard from "./pages/dashboard/dashboard.page";
import SigninPage from "./pages/signin/signin.page";
import PatientSearch from "./pages/dashboard/dashboard-pages/patient-search";
import AppointmentsGrid from "./pages/dashboard/dashboard-pages/appointments";
import DoctorsGrid from "./pages/dashboard/dashboard-pages/doctors";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<App />} /> */}
        <Route path="/" element={<SigninPage />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index path="patient-information" element={<UserInformation />} />
          <Route path="patient-search" element={<PatientSearch />} />
          <Route path="appointments" element={<AppointmentsGrid />} />
          <Route path="doctor-approval" element={<DoctorsGrid />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}