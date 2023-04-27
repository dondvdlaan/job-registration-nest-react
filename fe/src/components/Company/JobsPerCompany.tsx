import { Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "../../shared/API";
import { Job, JobWCompany } from "../../types/Job";
import { NoRowsFound } from "./Companies";

/**
 * Component to display jobs per company
 */
export const JobsPerCompany=() => {

    // *** Constants and variables ***
    const navigate        = useNavigate();
    const {compID}        = useParams<{compID : string}>()
    const [jobs, setJobs] = useApi<JobWCompany[]>(`jobsPerCompany/${compID}`)

    if(!jobs) return <p>Loading jobs...</p>
    
    // *** Event handlers ***
    const onGoToDetail = (job: Job) =>{
        navigate(`/details/${job.jobID}`)
      }

return(
<>
  <div className="container">
    
    {/* // Check if there are jobs to display */}
    {jobs.length > 0 ?
    <>
    <Card className="text-center">
      <Card.Body>Company: {jobs[0].compName}</Card.Body>
    </Card>
    <table className="table table-hover">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Company</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
            </tr>
        </thead>
        <tbody>
            {jobs.map((job, index) =>
            <tr key={job.jobID} onClick={()=> onGoToDetail(job)}>
            <th scope="row">{index +1}</th>
                <td>{job.jobTitle}</td>
                <td>{job.jobDescription}</td>
                <td>{job.compName}</td>
                <td>{job.jobDate.slice(0, 10)}</td>
                <td>{job.jobStatus}</td>
            </tr>
            )}
        </tbody>
    </table>
    </>
    :
    <NoRowsFound rows={"Jobs"} />
    }
  </div>
</>

)
}