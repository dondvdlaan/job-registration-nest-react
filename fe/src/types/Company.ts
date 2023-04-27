import { Employee } from "./Employee";

interface Approached{
    approached: string;
}
interface Registered{
    registered: string;
}

export type CompStatus  = Approached | Registered;  
export type Corporation = Company & Employee;

export interface Company extends CompanyWOID{
    compID        : string;
    }

export interface CompanyWOID {
    compName      : string;
    compType      : string;
    compNote      : string;
    compStatus    : string;
    }

