import React, { useState }  from "react"
import { useNavigate }      from 'react-router-dom';
import { api, 
        ApiSimplified }     from "../../shared/API";
import { APPROACHED, 
        CONSULTANT, 
        ENDUSER, 
        FOOD_AND_BEVERAGE, 
        HEALTH_CARE, 
        INSURANCE, 
        IT_OEM, 
        PARTNER, 
        RECRUITER, 
        REGISTERED }        from "../../shared/Constants";
import { Company }      from "../../types/Company";
import css                  from "./CompanyForm.module.css";
import {Method}             from "axios";


interface Props extends Company {
    isEdit  : boolean
    
}
/**
 *  Component to create/update a company
 * 
 * @input   props
 * @output  tsx
 */
export const CompanyForm = (props: Props) =>{

    // *********** Hooks and Constants ***********
    const [compID]                          = useState(props.compID);
    const [compName, setCompName]           = useState(props.compName);
    const [compType, setCompType]           = useState(props.compType);
    const [compNote, setCompNote]           = useState(props.compNote);
    const [compStatus, setCompStatus]       = useState(props.compStatus);

    const navigate = useNavigate();

    console.log({props})
    console.log({compName})

    // Prepare payloads for API
    const company = () =>({
        compID,
        compName,
        compType,
        compNote,
        compStatus,
    })

    // *********** Event handling ***********
    const onFormSubmit = (e: React.FormEvent) =>{
        e.preventDefault();
        console.log('Form submitted');

        // Send Company request to DB
        const [method, path]:[Method, string] = props.isEdit
        ? ["PUT", `updateCompany`]
        : ["POST", `addCompany`];

        ApiSimplified(method, path, company())
        .then(res => {
            console.log("Responds: ", res);
            navigate('/companies')
        })
        .catch(err=> console.log(err))
    }

    return(
        <>
    <form 
    className   ={css.companyForm}
    onSubmit    ={onFormSubmit}>
        <fieldset>
        <legend 
            className   ="font-weight-bold" > 
            {props.isEdit?"Update Company":"Add Company"}
        </legend>
        <div className="form-group row">
            <label htmlFor="compName" className="col-sm-3 col-form-label">Company Name</label>
            <div className="col-sm-9">
            <input 
            type        ="text" 
            className   ="form-control" 
            id          ="compName" 
            placeholder ="Company name"
            required
            value       ={compName}
            onChange    ={(e)=>{setCompName(e.target.value)}}
            />
            </div>
        </div>

        <div className="form-group row">
            <label htmlFor="compType" className="col-sm-3 col-form-label">Company Type</label>
            <div className="col-sm-9">
                <select
                    className   ="form-control" 
                    id          ="compType" 
                    placeholder ="Company type"
                    value       ={compType}
                    onChange    ={(e)=>{setCompType(e.target.value)}}
                    required
                >
                    <option value={''}  disabled selected >Company Type</option>
                    <option value={PARTNER}>{PARTNER}</option>
                    <option value={RECRUITER}>{RECRUITER}</option>
                    <option value={ENDUSER}>{ENDUSER}</option>
                    <option value={CONSULTANT}>{CONSULTANT}</option>
                    <option value={IT_OEM}>{IT_OEM}</option>
                    <option value={INSURANCE}>{INSURANCE}</option>
                    <option value={FOOD_AND_BEVERAGE}>{FOOD_AND_BEVERAGE}</option>
                    <option value={HEALTH_CARE}>{HEALTH_CARE}</option>
                </select>
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="compType" className="col-sm-3 col-form-label">Note</label>
            <div className="col-sm-9">
            <input 
            type        ="text" 
            className   ="form-control" 
            id          ="compNote" 
            placeholder ="Note"
            value       ={compNote}
            onChange    ={(e)=>{setCompNote(e.target.value)}}
            />
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="compStatus" className="col-sm-3 col-form-label">Status</label>
            <div className="col-sm-9">
            <select 
            name            ="compStatus" 
            className       ="form-control" 
            id              ="compStatus" 
            placeholder     ="-----"
            value           ={compStatus} 
            onChange        ={(e)=>{setCompStatus(e.target.value)}}
            required
            >
                <option value={''}  disabled selected >Status</option>
                <option value={REGISTERED}>{REGISTERED}</option>
                <option value={APPROACHED}>{APPROACHED}</option>
            </select>
            </div>
        </div>

        <div className="form-group row">
            <div className="col-sm-10">
            <button type="submit" className="btn btn-primary">Finished</button>
            </div>
        </div>
        </fieldset>
    </form>
    </>
    )
}