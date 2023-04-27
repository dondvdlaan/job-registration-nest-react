import { useParams }    from "react-router-dom";
import { useApi }       from "../../shared/API";
import { Company }      from "../../types/Company";
import { CompanyForm }  from "./CompanyForm";

/* 
*   Component to start CompanyForm to update data of individual company
*
*   @input  none
*   @return CompanyForm tsx :   CompanyForm with parameters initiated with
*                               values out of DB
*/
export const UpdateComp = () =>
{
    // Constants and Hooks
    const { idComp }            = useParams<{idComp: string}>();
    const [company, setCompany] = useApi<Company[]>(`company/${idComp}`);

    console.log("idComp ", idComp)
    console.log("company ", company)
    
    // Wait till data from DB arrived
    if(!company){return (<p>Loading company...</p>)}
    

        return(
            <CompanyForm
            compID         = {company[0].compID}
            compName       = {company[0].compName}
            compType       = {company[0].compType}
            compNote       = {company[0].compNote}
            compStatus     = {company[0].compStatus}
            isEdit         = {true}
            />
        )
}