
// Get the objects we need to modify
let updateEmployeeForm = document.getElementById('updateEmployeeForm');

// Modify the objects we need
updateEmployeeForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputEmployeeID = document.getElementById("mySelectEmployeeTable");
    let inputEmail = document.getElementById("updateEmployeeEmail");
    let inputPassword = document.getElementById("updateEmployeePassword");
    let inputRank = document.getElementById("updateRank");

    // Get the values from the form fields
    let inputEmployeeIDValue = inputEmployeeID.value;
    let inputEmailValue = inputEmail.value;
    let inputPasswordValue = inputPassword.value;
    let inputRankValue = inputRank.value;
    
    // Put our data we want to send in a javascript object
    let data = {
        employeeID: inputEmployeeIDValue,
        email: inputEmailValue,
        password: inputPasswordValue,
        position_rank: inputRankValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/updateEmployee", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, inputEmployeeIDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, employeeID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("employeeTable");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == employeeID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let td1 = updateRowIndex.getElementsByTagName("td")[1];
            let td2 = updateRowIndex.getElementsByTagName("td")[2];
            let td3 = updateRowIndex.getElementsByTagName("td")[3];

            // update the price
            td1.innerHTML = parsedData[0].email;
            td2.innerHTML = parsedData[0].password;
            td3.innerHTML = parsedData[0].position_rank;
       }
    }
}