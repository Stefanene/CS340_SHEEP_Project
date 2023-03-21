
// Get the objects we need to modify
let updateSneakerToLocation = document.getElementById('updateSneakerToLocation');

// Modify the objects we need
updateSneakerToLocation.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputSneakerName = document.getElementById("mySelectUpdateProduct");
    let inputStoreName = document.getElementById("mySelectUpdateLocation");
    let inputInventorySize = document.getElementById("inventory_size_update");
    let inputSizeAvailable = document.getElementById("sizeAvailable_update");

    // Get the values from the form fields
    let sneakerNameValue = inputSneakerName.value;
    let storeNameValue = inputStoreName.value;
    let inventorySizeValue = inputInventorySize.value;
    let sizeAvailableValue = inputSizeAvailable.value;

    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (isNaN(sneakerNameValue)) 
    {
        return;
    }
    if (isNaN(storeNameValue)) 
    {
        return;
    }
    if (isNaN(inventorySizeValue)) 
    {
        return;
    }
    if (isNaN(sizeAvailableValue)) 
    {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        productID: sneakerNameValue,
        storeID: storeNameValue,
        inventory_size: inventorySizeValue,
        sizeAvailable: sizeAvailableValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/updateSneakerToLocation", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, sneakerNameValue, storeNameValue);
            inputSneakerName.value = '';
            inputStoreName.value = '';
            inputInventorySize.value = '';
            inputSizeAvailable.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

// ajax is stil a WIP becuase there's an error with data-value having 2 values
function updateRow(data, productID, storeID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("sneakerToLocationTable");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == productID && table.rows[i].getAttribute("data-value2") == storeID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let pid = updateRowIndex.getElementsByTagName("td")[0];
            let sid = updateRowIndex.getElementsByTagName("td")[1];
            let inventory_size = updateRowIndex.getElementsByTagName("td")[2];
            let sizeAvailable = updateRowIndex.getElementsByTagName("td")[3];

            // update the price
            pid.innerHTML = parsedData[0].productID;
            sid.innerHTML = parsedData[0].storeID;
            inventory_size.innerHTML = parsedData[0].inventory_size;
            sizeAvailable.innerHTML = parsedData[0].sizeAvailable;
       }
    }
}
