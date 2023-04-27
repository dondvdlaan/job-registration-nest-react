export interface Company extends CompanyWOID{
    compID        : string;
    }

export interface CompanyWOID {
    compName      : string;
    compType      : string;
    compNote      : string;
    compStatus    : string;
    }