import { EmployeeForm } from "./EmployeeForm"


export const AddEmployee = () =>{


    return(
        <EmployeeForm
        emplID          = ""
        emplFirstName   = ""
        emplLastName    = ""
        emplTel         = ""
        emplEmail       = {undefined}
        compID          = ""
        compName        = ""
        isEdit= {false}
        />
    )
}