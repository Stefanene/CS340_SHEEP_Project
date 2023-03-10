function deleteSneakerToLocation(productID, storeID) {
    // Put our data we want to send in a javascript object
    let data = {
      productID: productID,
      storeID: storeID
    };
  
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/deleteSneakerToLocation", true);
    xhttp.setRequestHeader("Content-type", "application/json");
  
    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
  
            // Add the new data to the table
            deleteRow(productID, storeID);
  
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
  }
  
// AJAX NOT FUNCTIONING BECAUSE oF data-value having 2 values.
//   function deleteRow(productID, storeID){
  
//     let table = document.getElementById("sneakerToLocationTable");
//     for (let i = 0, row; row = table.rows[i]; i++) {
//        //iterate through rows
//        //rows would be accessed using the "row" variable assigned in the for loop
//        if (table.rows[i].getAttribute("data-value") == [productID, storeID]) {
//             table.deleteRow(i);
//             break;
//        }
//     }
//   }