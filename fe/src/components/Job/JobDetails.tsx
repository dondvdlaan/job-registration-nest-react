import {  useNavigate, useParams }  from 'react-router-dom';
import {Method}                     from "axios";
import { api, useApi }              from '../../shared/API';
import {  JobWCompanyWEmployee }    from '../../types/Job';
import { CLOSED } from '../../shared/Constants';

/**
 * Component to show all details of a sngle job
 */
export const JobDetails = () => {

    // ************** Constants and Hooks **************
    const { jobID } = useParams<{jobID: string}>();
    const job       = useApi<JobWCompanyWEmployee>(`job/${jobID}`)[0];
    const navigate  = useNavigate();
    
    // Wait till job arrived
    if(!job){return (<p>Loading Job...</p>)}

    console.log("job: ", job)
    console.log("job date: ", job.jobDate)

    // ************** Event hamdling ************** 
    const onUpdate = ()=> {
      navigate(`/UpdateJob/${jobID}`);
    }

    const onDelete = ()=> {
      const method: Method = "DELETE";
      const path: string = `deleteJob/${jobID}`;

      api(method,path, ()=>navigate("/activeJobs"), {})
      }

    return (
    <>
      <h3>Job Details</h3>
      <div className="container">
        <div className="row">
          <div className="col">
            Job Title
          </div>
          <div className="col-5">
            {job.jobTitle}
          </div>
          <div className="col">
            Date
          </div>
          <div className="col">
          {job.jobDate.slice(0,10)}
          </div>
        </div>
        
        <div className="row">
          <div className="col">
            Description
          </div>
          <div className="col-5">
            {job.jobDescription}
          </div>
          <div className="col">
            Company
          </div>
          <div className="col">
            {job.compName}
          </div>
        </div>
        
        <div className="row">
          <div className="col">
            Details
          </div>
          <div className="col-5" >
            {job.jobDetails}
          </div>
          <div className="col">
            Contact
          </div>
          <div className="col">
            {job.emplFirstName}{" "}{job.emplLastName}
          </div>
        </div>

        <div className="row">
          <div className="col">
            Contract
          </div>
          <div className="col-5" >
            {job.jobContract}
          </div>
          <div className="col">
            Status
          </div>
          <div className="col">
            {job.jobStatus}
          </div>
        </div>

        <div className="row">
          <div className="col">
            Note
          </div>
          <div className="col-5" >
            {job.jobNote}
          </div>
          <div className="col">
            ""
          </div>
          <div className="col">
            {/* {job.jobStatus} */}
          </div>
        </div>

        {job.jobStatus == CLOSED ?
          <div className="row">
            <div className="col">
              Closed Lost Reason
            </div>
            <div className="col-5" >
              {job.jobClosedReason}
            </div>
            <div className="col">
              Close Date
            </div>
            <div className="col">
              {job.jobCloseDate ? job.jobCloseDate.slice(0,10) : ""}
            </div>
          </div>
        : ""
        }
        <br />
        
        <div className="row">
          <div className="col">
            <button 
              type="button" 
              onClick={onUpdate} 
              className="btn btn-primary btn-sm">
                Update
            </button>
            <button 
              type="button" 
              onClick={onDelete} 
              className="btn btn-warning btn-sm">
                Delete
            </button>
          </div>
        </div>
      </div>
  </>
  )
}