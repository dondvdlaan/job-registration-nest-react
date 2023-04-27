import { useParams }    from "react-router-dom";
import { useApi }       from "../../shared/API";
import { Job }          from "../../types/Job"
import { JobForm }      from "./JobForm"


/**
 * Component to fetch data from DB and start Jobform
 */
export const UpdateJob = () =>{

// **************** Constants and Hooks **************** 
const { jobID }                 = useParams<{jobID: string}>();
const [job, setJob]             = useApi<Job>(`job/${jobID}`);
let jobCloseDate                = null;
// Form shows only 'Select Employee', when emplID = empty string
let jobEmplID                   = "";

if(!job){return (<p>Loading Jobs...</p>)}

console.log("Update Job ", job)

if(job.jobCloseDate){
    
    // Convert format '2022-11-07T10:59:23.000Z' to '2022-11-07 10:59:23'
    jobCloseDate =  job.jobCloseDate.slice(0,10) + " " + job.jobCloseDate.slice(11,-5);
    
    console.log("Update Job jobCloseDate", jobCloseDate)
}

// If emplID is not null, pass the current emplID, else default value is empty string
if (job.emplID != undefined) jobEmplID = job.emplID;

    return(
        <JobForm
        jobID           = {job.jobID}
        jobTitle        = {job.jobTitle}
        jobDescription  = {job.jobDescription}
        jobDetails      = {job.jobDetails}
        jobStatus       = {job.jobStatus}
        jobNote         = {job.jobNote}
        jobContract     = {job.jobContract}
        jobClosedReason = {job.jobClosedReason}
        jobCloseDate    = {jobCloseDate}
        jobDate         = {job.jobDate}
        
        compID          = {job.compID}
        emplID          = {jobEmplID}
        
        isEdit          = {true}
        />
    )
}