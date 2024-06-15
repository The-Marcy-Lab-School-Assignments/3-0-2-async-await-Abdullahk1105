export const fetchHandler = async (url, options = {}) => { // creating a async function with two parameters(url) and a option
    try {
        const response =  await fetch(url, options) // fetching the url and option passed in the function and saving it to the response variable

    // Throw an error if the response was not ok - let the catch statement handle it
        if(!response.ok) throw new Error(`Fetch failed with status ${response.status}, ${response.statusText}`) 
            // get the headers from the response.headers
    const isJson = (response.headers.get('content-type') || '').includes('application/json'); 
    if (isJson){ // isJson is true 
        const jsonData = await response.json(); // wait for fetch and turn that data into a json
        return [jsonData, null] // return a tuple with the json data that has been parsed , and a null for error handling 
    }
   
  // If the contentType of the response is not JSON, parse it as plain
  // text and return a tuple with a null error
  const textData = await response.text();// wait for fetch and turn that data into text 
  return [textData, null] // return a tuple with the text, and a null for error handling 
  
    } catch (error) {
        console.warn(error) // outputs a warning message to the console
        return [null,error] // returning a tuple with the error and null
    }

};
