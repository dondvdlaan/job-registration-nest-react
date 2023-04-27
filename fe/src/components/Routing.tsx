import { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ActiveJobs } from "./Job/ActiveJobs";
import { JobDetails } from "./Job/JobDetails";
import { NewJob } from "./Job/NewJob";
import { UpdateJob } from "./Job/UpdateJob";
import { Summary } from "./Summary";
import { AddCompany } from "./Company/AddCompany";
import { UpdateComp } from "./Company/UpdateComp";
import { DisplayCompany } from "./Company/DisplayCompany";
import { AddEmployee } from "./Employee/AddEmployee";
import { LostJobs } from "./Job/LostJobs";
import { Partners } from "./Partners/Partners";
import { JobsPerCompany } from "./Company/JobsPerCompany";

export default function Routing(): ReactElement {
  return (
    <Routes>
      <Route path="/summary"                element={<Summary />} />
      <Route path="/activeJobs"             element={<ActiveJobs />} />
      <Route path="/lostJobs"               element={<LostJobs />} />
      <Route path="/jobsPerCompany/:compID" element={<JobsPerCompany />} />

      <Route path="/companies"              element={<DisplayCompany />} />
      <Route path="/addCompany"             element={<AddCompany />} />
      <Route path="/updateComp/:idComp"     element={<UpdateComp />} />

      <Route path="/addJob"                 element={<NewJob />} />
      <Route path="/updateJob/:jobID"       element={<UpdateJob />} />
      <Route path="/details/:jobID"         element={<JobDetails />} />

      <Route path="/addEmployee"            element={<AddEmployee />} />
      
      <Route path="/partners"               element={<Partners />} />
      

      <Route path="/" element={<Navigate to="/summary" />} />

    </Routes>
  );
}