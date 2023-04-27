import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Corporation }  from "./../types/Company";

type SetState<T> = Dispatch<SetStateAction<T>>;
export interface S{
  fieldname: string;
  direction: string;
}
/*
* Customized HOOK to sort data
*
* @param  items       : []       : Input array of data to be sorted
* @param  config      : {}       : Input object to initialise useState
* @return sortedItems : []       : Output of data sorted
* @return onSort      : function : Toggle to de destructured, as input for 
*                                  descending/ascending option)
+ @return sortConfig  : {}       : Current sort criteria
*/
export function useSortData(items: Corporation[]) {

  // Constants and variables
  const initialConfig                 = {fieldname:"",direction:""}
  // const [sortedItems, setSortedItems] = useState<Corporation[]>(items);
  const [sortConfig, setSortConfig]   = useState<S>(initialConfig);

  // Sorting function
  const sortedItems = useMemo(() => {

    // Copy of sortedItems
    let sortableItems = [...items];

    if (sortConfig !== initialConfig) {
      
      // Actual sorting code
      sortableItems.sort((a:any, b:any) => {
        if (a[sortConfig.fieldname] < b[sortConfig.fieldname]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.fieldname] > b[sortConfig.fieldname]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return(sortableItems);

  }, [items, sortConfig]);

  /* 
  * Function to set direction ascending/descending based on input key
  *
  * @param fieldname : string : Input parameter of tuple key/value
  */
  const onSort = (fieldname:string) => {

    let direction = 'ascending';
    
    if (
      sortConfig &&
      sortConfig.fieldname === fieldname &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    // Key and direction are sent to useState for subsequent sorting
    setSortConfig({ fieldname, direction });
  };

  return { sortedItems, onSort, sortConfig };
};


