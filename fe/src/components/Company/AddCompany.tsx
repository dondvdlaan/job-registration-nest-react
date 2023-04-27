import { CompanyForm } from "./CompanyForm"

/* 
*   Main function to start CompayForm for adding a new company
*
*   @input  none
*   @return CompanyForm tsx :   CompanyForm with parameters initiated
*/
export const AddCompany = () =>
{

    return(
        <CompanyForm
        compID          = ""
        compName        = ""
        compType        = ""
        compNote        = ""
        compStatus      = ""
        isEdit          = {false}
        />
    )
}