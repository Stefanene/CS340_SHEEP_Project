// Get the objects we need to modify
let addSneakerToLocations = document.getElementById('addSneakerToLocations');

// Modify the objects we need
addSneakerToLocations.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputSneakerName = document.getElementById("inputSneaker");
    let inputStoreName = document.getElementById("inputLocation");
    let inputInventorySize = document.getElementById("inventory_size");
    let inputSizeAvailable = document.getElementById("sizeAvailable");

    // Get the values from the form fields
    let sneakerNameValue = inputSneakerName.value;
    let storeNameValue = inputStoreName.value;
    let inventorySizeValue = inputInventorySize.value;
    let sizeAvailableValue = inputSizeAvailable.value;


    // Put our data we want to send in a javascript object
    let data = {
        productID: sneakerNameValue,
        storeID: storeNameValue,
        inventory_size: inventorySizeValue,
        sizeAvailable: sizeAvailableValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/addSneakerToLocations", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
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


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("sneakerToLocationTable");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let productIDCell = document.createElement("TD");
    let storeIDCell = document.createElement("TD");
    let inventorySizeCell = document.createElement("TD");
    let sizeAvailableCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");


    // Fill the cells with correct data
    productIDCell.innerText = newRow.productID;
    storeIDCell.innerText = newRow.storeID;
    inventorySizeCell.innerText = newRow.inventory_size;
    sizeAvailableCell.innerText = newRow.sizeAvailable;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteSneakerToLocation(newRow.productID, newRow.storeID);
    };

    // Add the cells to the row 
    row.appendChild(productIDCell);
    row.appendChild(storeIDCell);
    row.appendChild(inventorySizeCell);
    row.appendChild(sizeAvailableCell); 
    row.appendChild(deleteCell);

    row.setAttribute('data-value', [newRow.prodcutID, newRow.storeID]);

    
    // Add the row to the table
    currentTable.appendChild(row);

    // let selectMenu = document.getElementById("mySelectSneaker");
    // let option = document.createElement("option");
    // option.text = newRow.name;
    // option.value = newRow.productID;
    // selectMenu.add(option);
}