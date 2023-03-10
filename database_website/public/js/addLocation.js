// Get the objects we need to modify
let addLocationform = document.getElementById('addLocationForm');

// Modify the objects we need
addLocationform.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputStoreName = document.getElementById("storeName");
    let inputAddress = document.getElementById("address");
    let inputStaff = document.getElementById("staff_size");

    // Get the values from the form fields
    let storeNameValue = inputStoreName.value;
    let addressValue = inputAddress.value;
    let staffValue = inputStaff.value;

    // Put our data we want to send in a javascript object
    let data = {
        store_name: storeNameValue,
        physical_address: addressValue,
        staff_size: staffValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/addLocationform", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputStoreName.value = '';
            inputAddress.value = '';
            inputStaff.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("storeTable");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let storeNameCell = document.createElement("TD");
    let addressCell = document.createElement("TD");
    let staffCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");


    // Fill the cells with correct data
    idCell.innerText = newRow.storeID;
    storeNameCell.innerText = newRow.store_name;
    addressCell.innerText = newRow.physical_address;
    staffCell.innerText = newRow.staff_size;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteLocation(newRow.storeID);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(storeNameCell);
    row.appendChild(addressCell);
    row.appendChild(staffCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.storeID);

    
    // Add the row to the table
    currentTable.appendChild(row);

    let selectMenu = document.getElementById("mySelectLocation");
    let option = document.createElement("option");
    option.text = newRow.store_name;
    option.value = newRow.storeID;
    selectMenu.add(option);
}