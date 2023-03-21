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

            // // // Add the new data to the table
            // addRowToTable(xhttp.response);
            // // Clear the input fields for another transaction
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
    location.reload();
})