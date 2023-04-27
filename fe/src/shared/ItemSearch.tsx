import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Company } from "../types/Company"
import { Job } from "../types/Job"
import { SearchOutline } from 'react-ionicons'



type SearchItems = Company ;

interface Props{
    items: SearchItems [],
    headline?: string, 
    width?: number
}

/**
 * Search Component to be used per item (ie Company or Job)
 */
export const ItemSearch = (props : Props) => {

    // *** Constants and variables ***
    const [itemSearched, setItemSearched] = useState("");
    const [itemsFound, setItemsFound] = useState<SearchItems[]>([]);

    const navigate = useNavigate();
    const minNrOfChararcters = 0;

    // *** Event handlers ***
    const onSearch = (e: ChangeEvent<HTMLInputElement>) =>{

        // Capture input value
        const inputValue = e.target.value;

        // Pass to useState
        setItemSearched(inputValue);
        
        // If minimum number of char entered, start searching
        if (inputValue.length > minNrOfChararcters){
            
            // Compare first characters of item name in array with inputValue
            const result = props.items.filter(item => 
            item.compName.slice(0,inputValue.length).toLowerCase() == 
            inputValue.toLowerCase());
            
            // Pass result to useState
            setItemsFound(result);
        }
    }

    const onSelectFoundItem = (item: SearchItems) =>{

        // Reset useStates
        setItemSearched("");
        setItemsFound([]);

        // Navigate to detail page of item
        navigate(`/updateComp/${item.compID}`)
    }

        
    return(

    <div style={{ width: props.width || 800 }}>
      {props.headline && <h2 className="title">{props.headline}</h2>}
      <div className="panel-block">
        <p className="control has-icons-right">
          <input
            value={itemSearched}
            onChange={onSearch}
            type="text"
            className="input"
          />
          <span className="searchSymbol">
            {/* <SearchOutline
                color={'#2f5b83'} 
                title={""}
                height="25px"
                width="25px"
            /> */}
                <i className="searchSymbol" />
          </span>
        </p>
      </div>
      {itemsFound.length !== 0 && (
        <div className="has-background-light" style={{ position: "absolute" }}>
          {itemsFound.map((item) => (
            <span
              onClick={() => onSelectFoundItem(item)}
              key={item.compID}
              className="panel-block is-clickable columns py-2"
            >
              <p className="column is-3">{item.compName}</p>
              {/* <p className="column is-9 is-gray">{book.subtitle}</p> */}
            </span>
          ))}
        </div>
      )}
    </div>
    )
}