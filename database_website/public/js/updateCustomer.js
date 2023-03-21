
// Get the objects we need to modify
let updateCustomerForm = document.getElementById('updateCustomerForm');

// Modify the objects we need
updateCustomerForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCustomerID = document.getElementById("mySelectCustomer");
    let inputEmail = document.getElementById("updateCustomerEmail");
    let inputPassword = document.getElementById("updateCustomerPassword");

    // Get the values from the form fields
    let inputCustomerIDValue = inputCustomerID.value;
    let inputEmailValue = inputEmail.value;
    let inputPasswordValue = inputPassword.value;
    

    if (isNaN(inputCustomerIDValue)) 
    {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        customerID: inputCustomerIDValue,
        email: inputEmailValue,
        password: inputPasswordValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/updateCustomer", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, inputCustomerIDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, customerID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("customerTable");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == customerID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let td1 = updateRowIndex.getElementsByTagName("td")[1];
            let td2 = updateRowIndex.getElementsByTagName("td")[2];

            console.log("TEST");
            // update the price
            td1.innerHTML = parsedData[0].email;
            td2.innerHTML = parsedData[0].password;
       }
    }
}