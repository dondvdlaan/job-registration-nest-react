

export const generateRandomNumber = (min: number, max: number) => {
    return Math.floor((Math.random() * ((max - min) + 1)) + min);
}

/**
 *  Function to convert new Date to 'YYYY-MM-DD hh:mm:ss' format
 * 
 * @param currentDate   [Date]  : js new Date input
 * @return dateStr      [String]: date in string with 'YYYY-MM-DD hh:mm:ss' format
 */
export const convertDate = (currentDate: Date) => {

let formatedDate =
  currentDate.getFullYear() + "-" +
  ("00" + (currentDate.getMonth() + 1)).slice(-2) + "-" +
  ("00" + currentDate.getDate()).slice(-2) + " " +
  ("00" + currentDate.getHours()).slice(-2) + ":" +
  ("00" + currentDate.getMinutes()).slice(-2) + ":" +
  ("00" + currentDate.getSeconds()).slice(-2);

  console.log("dateStr ", formatedDate);

  return formatedDate;
}


    