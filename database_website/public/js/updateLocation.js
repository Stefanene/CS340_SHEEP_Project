
// Get the objects we need to modify
let updateLocationForm = document.getElementById('updateLocationForm');

// Modify the objects we need
updateLocationForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputLocationName = document.getElementById("mySelectLocation");
    let inputAddress = document.getElementById("updateAddress");
    let inputStaff = document.getElementById("updateStaff");

    // Get the values from the form fields
    let storeNameValue = inputLocationName.value;
    let addressValue = inputAddress.value;
    let staffValue = inputStaff.value;
    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (isNaN(addressValue)) 
    {
        return;
    }
    if (isNaN(staffValue)) 
    {
        return;
    }
    if (isNaN(storeNameValue)) 
    {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        storeID: storeNameValue,
        physical_address: addressValue,
        staff_size: staffValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/updateLocationAjax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, storeNameValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, storeID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("storeTable");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == storeID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let tdAddress = updateRowIndex.getElementsByTagName("td")[2];
            let tdStaff = updateRowIndex.getElementsByTagName("td")[3];

            // update the price
            tdAddress.innerHTML = parsedData[0].physical_address;
            tdStaff.innerHTML = parsedData[0].staff_size;
       }
    }
}