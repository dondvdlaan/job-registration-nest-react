import { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap"
import { ApiSimplified, useApi } from "../../shared/API";
import { Company } from "../../types/Company";
import { Employee } from "../../types/Employee";
import css from "./Partners.module.css"

/**
 * Component to diplay Partners and Employees
 */
export const Partners = ()=>{

// *** Constants and variables ***
const [partners, setPartners]   = useApi<Company[]>("partners");
const [isActive, setIsActive]   = useState("");
const [employees, setEmployees] = useState<Employee[]>([]);

if(!partners) return(<p>Loading partners...</p>)


// *** Event Handlesr ***
const onEmployees = (compID:string) =>{
  
  // Get employee data by Company ID
  ApiSimplified("GET", `employeesCompany/${compID}`)
  .then(res=> setEmployees(res.data))
  
  // Set Active color to selected partner
  setIsActive(compID);
}

// *** Components ***
interface Props{
  partner: Company;
  partnerID: string;
}
/**
 * Component to show details of Partner
 */
const PartnerCard = (props: Props) =>{

  return(
    <Card 
      style={{ padding: '0rem', width: '18rem' }}
      className={isActive == props.partnerID ? css.rowActive : "" }
    >
      <Card.Body>
        <Card.Title>{props.partner.compName}</Card.Title>
        <Card.Text>
          <p>Note: {props.partner.compNote} </p>
          <p>Status: {props.partner.compStatus} </p>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
/**
 * Component to show details of Employee
 */
const EmployeeCard = (props: {employee: Employee}) =>{

  return(
    <Card 
      style={{ padding: '0rem', width: '18rem' }}
    >
      <Card.Body>
        <Card.Title>{props.employee.emplFirstName} {props.employee.emplLastName}</Card.Title>
        <Card.Text>
          <p>Email: {props.employee.emplEmail} </p>
          <p>Tel: {props.employee.emplTel} </p>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

return(
  <>
 <Container>
    <Row>
      <Col>Partners Company
        {partners.map(partner=>
          <Row
            key={partner.compID} 
            onClick={()=>onEmployees(partner.compID)} 
          >
            <PartnerCard 
              partner={partner}
              partnerID={partner.compID}
            />
          </Row>
        )}
      </Col>
      
      <Col>Employees
        {employees.map(employee=>
          <Row
            key={employee.emplID}
          >
              <EmployeeCard 
                employee={employee}
            />
          </Row>
        )}
      </Col>
    </Row>
  </Container>
</>
       
    )
}