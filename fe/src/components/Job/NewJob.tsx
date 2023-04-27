import { JobForm } from "./JobForm"

export const NewJob = () =>{

    return(
        <JobForm
        jobID=""
        jobDate=""
        jobTitle = ""
        jobDescription=""
        jobDetails=""
        jobStatus=""
        jobNote=""
        jobContract=""
        jobCloseDate={null}
        compID=""
        emplID=""
        
        isEdit= {false}
        />
    )
}