import {Method}             from "axios";
import React, { useState }  from "react"
import { useNavigate }      from 'react-router-dom';
import { api, useApi, useApi2 }      from "../../shared/API";
import { convertDate }      from "../../shared/Assistant";
import { CLOSED, FIXED, FREELANCE, PENDING, 
    REGISTERED, WON }       from "../../shared/Constants";
import { Company }          from "../../types/Company";
import { Employee } from "../../types/Employee";
import { Job }              from "../../types/Job";
import css                  from "./JobForm.module.css";

interface Props extends Job{

    isEdit: boolean,
}
/**
 * Component for creating and editing a Job
 */

export const JobForm = (props: Props) =>{
    
    // ******************** Hooks and Constants ********************
    const [jobID, setJobID]                     = useState(props.jobID);
    const [jobTitle, setJobTitle]               = useState(props.jobTitle);
    const [jobDescription, setJobDescription]   = useState(props.jobDescription);
    const [jobDetails, setJobDetails]           = useState(props.jobDetails);
    const [jobStatus, setJobStatus]             = useState(props.jobStatus);
    const [jobNote, setJobNote]                 = useState(props.jobNote);
    const [jobClosedReason, setJobClosedReason] = useState(props.jobClosedReason);
    const [jobCloseDate, setJobCloseDate]       = useState(props.jobCloseDate);
    const [jobContract, setJobContract]         = useState(props.jobContract);
    
    const [compID, setCompID]                   = useState(props.compID);
    const [emplID, setEmplID]                   = useState(props.emplID);
    
    const [companies, setCompanies]             = useApi<Company[]>("allCompanies");
    const [employees, setEmployees]             = useApi2<Employee[] | undefined>(`employeesCompany/${compID}`,compID);
    
    const navigate                              = useNavigate();

    if(!companies){
        return (<p>Loading Companies...</p>)    
      }
    // if(!employees){
    //     return (<p>Loading employees...</p>)    
    //   }

      console.log("emplID ", emplID)
      console.log("compID ", compID)
      console.log("employees ", employees)


    // Job object prepared for sending to DB
    const job = () => ({
      jobID,
      jobTitle,
      jobDescription,
      jobDetails,
      jobStatus,
      jobNote,
      jobClosedReason,
      jobCloseDate,
      jobContract,
      compID,
      // Write undefined in to DB, instead of empty string
      emplID: emplID === "" ? undefined : emplID
    })
  

    // ******************** Event handling ********************
    const onJobClosedReason = (e: React.ChangeEvent<HTMLInputElement> ) =>{

        setJobClosedReason(e.target.value);

        setJobCloseDate(()=>convertDate(new Date))
    }
    
    const onFormSubmit = (e: React.FormEvent) =>{
        e.preventDefault();
        console.log('Form submitted');

        console.log("job() ", job())

        const [method, path, jobData]:[Method, string, {}] = props.isEdit
        ? ["PUT", `updateJob`, job()]
        : ["POST", `addJob`, job()];

        api(method,path, ()=>navigate("/activeJobs"), jobData)
    }

    const onSetCompID = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        e.preventDefault();
        console.log("onSetCompID e.target.value", e.target.value)
        
        setCompID(e.target.value)
    }

    const onSetEmplID = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        e.preventDefault();
        console.log("onSetEmplID e.target.value ", e.target.value)
        
        setEmplID(e.target.value)
    }

return(
<>
<br />
    <form 
    className   = {css.jobForm}
    onSubmit    = {onFormSubmit}>

        <div className="form-group row">
            <label htmlFor="company" className="col-sm-2 col-form-label">Company</label>
            <div className="col-sm-10">
                <select 
                    className       ="form-control" 
                    id              ="company" 
                    placeholder     ="-----"
                    value           ={compID} 
                    onChange        ={(e)=>{onSetCompID(e)}}
                    required
                >
                        <option value="" disabled  >Select Company</option>

                    {companies.map(company =>
                        <option 
                            key={company.compID} 
                            value={company.compID}
                        >
                            {company.compName}
                        </option>
                    )}
                </select>
            </div>
        </div>
        
        {/* Employees listed for this company? */}
        {employees != undefined && employees?.length > 0 ?
        <div className="form-group row">
            <label htmlFor="employee" className="col-sm-2 col-form-label">Employee</label>
            <div className="col-sm-10">
                <select 
                    name            ="employee" 
                    className       ="form-control" 
                    id              ="employee" 
                    placeholder     ="-----"
                    value           ={emplID} 
                    onChange        ={(e)=>{onSetEmplID(e)}}
                >
                        <option value="" disabled  >Select Employee</option>

                    {employees.map(employee =>
                        <option key={employee.emplID} 
                                value={employee.emplID}
                        >
                            {employee.emplFirstName}{" "}{employee.emplLastName}
                        </option>
                    )}
                </select>
            </div>
        </div>
        : "" }

        <div className="form-group row">
            <label htmlFor="jobTitle" className="col-sm-2 col-form-label">Job Title</label>
            <div className="col-sm-10">
            <input 
            type        ="text" 
            className   ="form-control" 
            id          ="jobTitle" 
            placeholder ="Job Title"
            value       ={jobTitle}
            onChange    ={(e)=>{setJobTitle(e.target.value)}}
            required
            minLength=  {3}
            />
            </div>
        </div>

        <div className="form-group row">
            <label htmlFor="jobDescription" className="col-sm-2 col-form-label">Job Description</label>
            <div className="col-sm-10">
            <textarea
            className   ="form-control" 
            id          ="jobDescription" 
            placeholder ="Job Description"
            value       ={jobDescription}
            onChange    ={(e)=>{setJobDescription(e.target.value)}}
            />
            </div>
        </div>
  
        <div className="form-group row">
            <label htmlFor="jobDetails" className="col-sm-2 col-form-label">Job Details</label>
            <div className="col-sm-10">
            <textarea
            className   ="form-control" 
            id          ="jobDetails" 
            placeholder ="Job Details"
            value       ={jobDetails}
            onChange    ={(e)=>{setJobDetails(e.target.value)}}
            />
            </div>
        </div>

        <div className="form-group row">
            <label htmlFor="jobContract" className="col-sm-2 col-form-label">Contract</label>
            <div className="col-sm-10">
            <select 
            name        ="jobContract" 
            className   ="form-control" 
            id          ="jobContract" 
            placeholder ="-----"
            value       ={jobContract} 
            onChange    ={(e)=>{setJobContract(e.target.value)}}
            required
            >
                <option value={""} disabled selected  >Contract</option>
                <option value={FIXED}>{FIXED}</option>
                <option value={FREELANCE}>{FREELANCE}</option>
    
            </select>
            </div>
        </div>

        <div className="form-group row">
            <label htmlFor="jobStatus" className="col-sm-2 col-form-label">Status</label>
            <div className="col-sm-10">
            <select 
            name        ="jobStatus" 
            className   ="form-control" 
            id          ="jobStatus" 
            placeholder ="-----"
            value       ={jobStatus} 
            onChange    ={(e)=>{setJobStatus(e.target.value)}}
            required
            >
                <option value={""} disabled selected  >Status</option>
                <option value={REGISTERED}>{REGISTERED}</option>
                <option value={PENDING}>{PENDING}</option>
                <option value={WON}>{WON}</option>
                <option value={CLOSED}>{CLOSED}</option>
    
            </select>
            </div>
        </div>

        {/* Job closed lost? What was the reason? */}
        {jobStatus == CLOSED ?
            <div className="form-group row">
                <label htmlFor="jobClosedReason" className="col-sm-2 col-form-label">Reason Closed Lost?</label>
                <div className="col-sm-10">
                    <input 
                    type        ="text" 
                    className   ="form-control" 
                    id          ="jobClosedReason" 
                    placeholder ="Reason Closed Lost"
                    value       ={jobClosedReason}
                    onChange    ={(e)=>{onJobClosedReason(e)}}
                    required
                    />
                </div>
            </div>
        : ""
        }

        <div className="form-group row">
                    <label htmlFor="jobNote" className="col-sm-2 col-form-label">Job Note</label>
                    <div className="col-sm-10">
                    <textarea
                    className   ="form-control" 
                    id          ="jobNote" 
                    placeholder ="Job note"
                    value       ={jobNote}
                    onChange    ={(e)=>{setJobNote(e.target.value)}}
                    />
                    </div>
                </div>

        <div className="form-group row">
            <div className="col-sm-10">
            <button type="submit" className="btn btn-primary">Finished</button>
            </div>
        </div>
    </form>
    </>
    )
}