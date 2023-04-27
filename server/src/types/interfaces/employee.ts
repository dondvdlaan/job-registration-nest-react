export interface EmployeeShort{
    
    emplFirstName : string;
    emplLastName  : string;
}


export interface Employee extends EmployeeShort {

    emplTel       : string;
    emplEmail     : string | undefined;
    compID        : string;
    emplID        : string | undefined;
}