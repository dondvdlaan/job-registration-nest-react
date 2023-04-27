import { ChangeEvent, useState }     from "react";
import Badge            from 'react-bootstrap/Badge'
import { api }          from "../../shared/API";
import { Corporation as Company }  from "../../types/Company";
import { Pagination }   from "../Pagination";
import { Method }       from "axios";
import { useNavigate }  from 'react-router-dom';
import { useSortData }  from "../../shared/SortData";
import { SearchOutline } from 'react-ionicons'
import { UserWorker } from "grommet-icons";
import { Button, Card } from "react-bootstrap";
import './Companies.css'

// Export Components
export const NoRowsFound = (props:{rows: string}) =>(
  
   <Card className="text-center">
    <Card.Body>No {props.rows} found</Card.Body>
  </Card>
)

/**
*  Component to display all companies
*
*/
export const Companies = (props: {corporations: Company[]}) => {

  // *************** Constants and variables ***************
  const [page, setPage]                   = useState(1);
  const navigate                          = useNavigate();
  const [items, setItems]                 = useState<Company[]>(props.corporations);

  const {sortedItems, onSort, sortConfig} = useSortData(items);
  const [itemSearched, setItemSearched]   = useState("");
  const [displaySearch, setDisplaySearch] = useState<Boolean>(false);

  if(!sortedItems) return (<p>Loading items...</p>)

  const maxRowsPerPage      = 10;
  const minNrOfChararcters  = 0;

  // *** Components ***
  const SearchCompany = () =>(
    <div className="panel-block">
    <p className="control has-icons-right">
      <input
        value={itemSearched}
        onChange={onSearch}
        type="text"
        className="input"
        autoFocus
      />
    </p>
  </div>
  )

  // *************** Event handling ***************
  /**
   * Set page for Pagination
   */
  const onSetPage = (page   : number) => setPage(page);

  /**
   * Navigate to details page of Company
   */
  const onUpdate  = (compID : string) => {
    navigate(`/updateComp/${compID}`);
  }

  /**
   * Delete company from DB
   */
  const onDelete  = (compID : string) => {

    //Constants and variables
    const method: Method = "DELETE";
    const path: string = `deleteCompany/${compID}`;
    
    // Callback to refresh page after API
    api(method, path, () => window.location.reload(), {})
  }

  /**
   * Search through companies
   */
  const onSearch = (e: ChangeEvent<HTMLInputElement>) =>{

    // Capture input value
    const inputValue = e.target.value;

    // Pass to useState
    setItemSearched(inputValue);
    
    // If minimum number of char entered, start searching
    if (inputValue.length >= minNrOfChararcters){
        
        // Compare first characters of item name in array with inputValue
        let result = props.corporations.filter(item => 
        item.compName.slice(0,inputValue.length).toLowerCase() == 
        inputValue.toLowerCase());

        // If input is empty, show full list of companies
        if (inputValue.length == 0) result = props.corporations;
        
        // Pass result to useState
        setItems(result);
    }
  }

  /**
   * Displays onSearch window
   */
  const onDisplaySearch = ()=>{

    // At reset of onSearch, empty imput field and restore original list
    if(displaySearch){
      setItems(props.corporations);
      setItemSearched("");
    }
    
    // Toggle for SearchCompany bar
    setDisplaySearch(!displaySearch)
    }

  /**
   * Show jobs per company
   */  
  const onJobsPerCompany = (compID: string) => {

   navigate(`/jobsPerCompany/${compID}`);
  }


  // *************** Functions ***************
  /**
   * Function to check which sorting direction is chosen and which className to use
   * for sorting companies
  */
  const getClassNamesFor = (name: string) => {
    if (!sortConfig) {return;}
    return sortConfig.fieldname === name ? sortConfig.direction : undefined;
  };

  // Rows per Page to be displayed
  const rowsOnThisPage = sortedItems.slice((page - 1) * maxRowsPerPage,
                                      page * maxRowsPerPage);

  return (
    <>
      <div className="mx-0 p-0 container.fluid">
      <table className="table table-hover table-light">
      <caption>Companies</caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">
              {displaySearch &&<SearchCompany />}
              <button 
                type="button" 
                className={getClassNamesFor("compName")?`button button1 ${getClassNamesFor("compName")}`:"button button1" } 
                onClick={() => onSort('compName')} >
                  Company
              </button>
              {" "}
              <SearchOutline
                color={'#2f5b83'} 
                title={""}
                height="25px"
                onClick={onDisplaySearch}
                width="25px"
              />
            </th>
            <th scope="col">
              <button 
              type="button" 
              className={getClassNamesFor("compType")?`button button1 ${getClassNamesFor("compType")}`:"button button1" }
              onClick={() => onSort('compType')} >
                Type
              </button>
            </th>
            <th scope="col">
              <div className="headerText">
                Jobs per Company
              </div>
                
            </th>

          </tr>
        </thead>
        <tbody>
          {rowsOnThisPage.length == 0 ? 
            <NoRowsFound rows={"companies"} />
          :
          <>
            {rowsOnThisPage.map((company: Company, index: number) =>
              <tr key={company.compID}>
                <th scope="row">

                  {/* // Numbering of rows */}
                  {(index + 1) + (page - 1) * maxRowsPerPage }{' '}

                  {/* Badges Delete and Update */}
                  <Badge onClick={compID => onDelete(company.compID)} pill bg="warning">Del</Badge>
                  <Badge onClick={compID => onUpdate(company.compID)} pill bg="secondary">Upd</Badge>{' '}
                </th>
                <td>{company.compName} </td>
                <td>{company.compType} </td>
                <td><Button 
                    variant="outline-info"
                    size="sm"
                    onClick={() => onJobsPerCompany(company.compID)}>
                      <UserWorker /> 
                    </Button>
                </td>
              </tr>
            )}
          </>
          }
        </tbody>
      </table>

      <br />
      <Pagination
        currentPage     = {page}
        rows            = {sortedItems.length}
        maxRowsPerPage  = {maxRowsPerPage}
        onSetPage       = {onSetPage}
      />
    </div>
    </>
  )
}