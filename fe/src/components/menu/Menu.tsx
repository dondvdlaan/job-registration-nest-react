import { ReactElement } from "react";
import { Dropdown, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

interface Props {
  children: ReactElement;
}

/**
 * Menu Component is standard lay-out for all pages
 */
export default function Menu(props: Props): ReactElement {


  return (
    <>
      <Navbar bg="bg-secondary" collapseOnSelect expand="sm">
      <Navbar.Toggle aria-controls="navbar-toggle" />
        <Navbar.Collapse id="navbar-toggle">
          <div className="nav nav-pills" >   
            <NavLink className="nav-link" to="/summary">Summary </NavLink >  
          <Dropdown>
            <Dropdown.Toggle variant="pills" id="dropdown-basic">
                Jobs
            </Dropdown.Toggle>
            <Dropdown.Menu>
               <Dropdown.Item >
                <NavLink className="nav-link" to="/activeJobs"  >Active Jobs  </NavLink >  
              </Dropdown.Item>
              <Dropdown.Item >
                <NavLink className="nav-link" to="/lostJobs"    >Lost Jobs    </NavLink >  
              </Dropdown.Item>
              <Dropdown.Item >
                <NavLink className="nav-link" to="/addJob"      >New Job      </NavLink >  
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          
          <Dropdown>
            <Dropdown.Toggle variant="pills" id="dropdown-basic">
                Companies
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item >
                <NavLink className="nav-link"  to="/companies"   >Show Companies    </NavLink >  
              </Dropdown.Item>
              <Dropdown.Item >
                <NavLink className="nav-link"  to="/addCompany"  >Add Company  </NavLink > 
              </Dropdown.Item>
              <Dropdown.Item >
                <NavLink className="nav-link" to="/addEmployee" >Add Employee </NavLink > 
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
            <NavLink className="nav-link" to="/partners"    >Partners     </NavLink > 
          </div>
        </Navbar.Collapse>
      </Navbar>

      <div className="container">{props.children}</div>
    </>
  );
}