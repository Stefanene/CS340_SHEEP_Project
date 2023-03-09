
// Get the objects we need to modify
let updateSneakerForm = document.getElementById('updateSneakerForm');

// Modify the objects we need
updateSneakerForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
<<<<<<< HEAD
    let inputSneakerName = document.getElementById("mySelectSneaker");
    let inputPrice = document.getElementById("updatePrice");

    // Get the values from the form fields
    let SneakerNameValue = inputSneakerName.value;
    let PriceValue = inputPrice.value;
=======
    let inputSneakerName = document.getElementById("sneakerSelect");
    let inputPrice = document.getElementById("price");

    // Get the values from the form fields
    let inputSneakerNameValue = inputSneakerName.value;
    let inputPriceValue = inputPrice.value;
>>>>>>> c528f61fc96b19783d96f48a6bc5bf45dc6888fc
    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

<<<<<<< HEAD
    if (isNaN(PriceValue)) 
    {
        return;
    }
    if (isNaN(SneakerNameValue)) 
=======
    if (isNaN(inputSneakerNameValue)) 
>>>>>>> c528f61fc96b19783d96f48a6bc5bf45dc6888fc
    {
        return;
    }

<<<<<<< HEAD
    // Put our data we want to send in a javascript object
    let data = {
        productID: SneakerNameValue,
        price: PriceValue,
=======
    if (isNaN(inputPriceValue)) 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        name: inputSneakerNameValue,
        price: inputPriceValue,
>>>>>>> c528f61fc96b19783d96f48a6bc5bf45dc6888fc
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
<<<<<<< HEAD
    xhttp.open("PUT", "/updateSneakerAjax", true);
=======
    xhttp.open("PUT", "/updateSneakerForm", true);
>>>>>>> c528f61fc96b19783d96f48a6bc5bf45dc6888fc
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
<<<<<<< HEAD
            updateRow(xhttp.response, SneakerNameValue);
=======
            updateRow(xhttp.response, inputSneakerNameValue);
>>>>>>> c528f61fc96b19783d96f48a6bc5bf45dc6888fc

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, productID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("sneakerTable");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == productID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
<<<<<<< HEAD
            let td = updateRowIndex.getElementsByTagName("td")[2];

            // update the price
            td.innerHTML = parsedData[0].price;
=======
            let td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign homeworld to our value we updated to
            td.innerHTML = parsedData[0].name; 
>>>>>>> c528f61fc96b19783d96f48a6bc5bf45dc6888fc
       }
    }
}
