import { CompanyWOID } from "./Company";
import { Employee, EmployeeShort } from "./Employee";

interface Registered{
    registered: string;
}
interface Pending{
    pending: string;
}
interface Closed{
    closed: string;
}
interface Won{
    won: string;
}
export type JobStatus = Registered |Pending | Closed | Won;

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