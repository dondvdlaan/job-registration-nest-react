import { CompanyWOID } from "./company";
import { EmployeeShort } from "./employee";

export interface JobWCompanyWEmployee extends Job, EmployeeShort, CompanyWOID{}
export interface JobWCompany extends Job, CompanyWOID{}

export interface Job{
    jobID           : string;     
    jobTitle        : string;
    jobDescription  : string;
    jobDetails      : string;
    jobStatus       : string;
    jobNote         : string;
    jobClosedReason?: string;
    jobDate         : string;
    jobCloseDate?   : string | null;
    jobContract     : string;
    compID          : string;
    emplID          : string | undefined;
}