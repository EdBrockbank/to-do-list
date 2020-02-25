$(document).ready(function () {
    //render tickets on load
    renderTickets();
});

//function to render the tickets
function renderTickets() {
    //recalls tickets from local storage
    var tickets = JSON.parse(localStorage.getItem('tickets'));
    //if local storage isn't empty cycle through the list
    if (tickets !== null) {
        tickets.forEach(function (item) {
            //for each item check if the completed flag is set to "no"
            if (item[3] === "no") {
                if (item[4] === "yes"){
                    var ticket = "<div class='ticket-working'><h3 class='title'>" + item[1] + " - Working</h3><br><p class='desc'>" + item[2] + "</p><button class='btn btn-success' type='button' onclick='moveComplete(" + tickets.indexOf(item) + ")'>Completed</button> <button class='btn btn-warning' type='button' onclick='working(" + tickets.indexOf(item) + ")'>Stopped working on it!</button> <button class='btn btn-primary' type='button' onclick='editTicket(" + tickets.indexOf(item) + ")'>Edit ticket</button> <button class='btn btn-danger' type='button' onclick='removeTicket(" + item[0] + ")'>Remove</button> </div>";
                    $("#ticketArea").append(ticket);
                } else if (item[4] === "no"){
                    var ticket = "<div class='ticket'><h3 class='title'>" + item[1] + "</h3><br><p class='desc'>" + item[2] + "</p><button class='btn btn-success' type='button' onclick='moveComplete(" + tickets.indexOf(item) + ")'>Completed</button> <button class='btn btn-warning' type='button' onclick='working(" + tickets.indexOf(item) +")'>Working On It!</button> <button class='btn btn-primary' type='button' onclick='editTicket( " + tickets.indexOf(item) + " )'>Edit ticket</button> <button class='btn btn-danger' type='button' onclick='removeTicket(" + item[0] + ")'>Remove</button> </div>";
                    $("#ticketArea").append(ticket);
                }
            } else {
                //if yes create the html and append it to the completed area div
                var ticket = "<div class='ticket'><h3 class='title'>" + item[1] + "</h3><br><p class='desc'>" + item[2] + "</p> <button class='btn btn-success' type='button' onclick='moveComplete(" + tickets.indexOf(item) + ")'>un-completed</button> <button class='btn btn-danger' type='button' onclick='removeTicket(" + item[0] + ")'>Remove</button> </div>";
                $("#completedArea").append(ticket);
            }
        })
    }
}
//function to create a new ticket
function newTicket() {
    //getting the title and description and setting the completed and working flags to no
    var title = $("#title").val();
    var desc = $("#desc").val();
    var complete = "no";
    var working = "no";
    //if the local storage is empty
    if (JSON.parse(localStorage.getItem('tickets')) === null){
        //setting the id
        var id = 1;
        //putting the variables into an array
        var item = [id,title, desc,complete,working];
        //setting the array of arrays
        var ticketList = [item];
        //pushing it to local storage
        localStorage.setItem('tickets',JSON.stringify(ticketList));
    } else {
        //getting the current list of tickets
        var ticketList = JSON.parse(localStorage.getItem('tickets'));
        //setting the id
        var id = ticketList.length + 1;
        //pushing the data into an array
        var item = [id,title, desc,complete,working];
        //pushing the array into the list of tickets
        ticketList.push(item);
        //pushing the updated list to the local storage
        localStorage.setItem('tickets',JSON.stringify(ticketList));
    }
    //re loading the page
    location.reload();
}

//function for clearing the list and reloading the page
function clearList() {
    localStorage.clear();
    location.reload();
}

//setting the ticket completed flag to yes
function moveComplete(ticketIndex){
    var ticketList = JSON.parse(localStorage.getItem('tickets'));
    var item = ticketList[ticketIndex];
    if (item[3] === "no"){
        item[3] = "yes";
    } else if (item[3] === "yes"){
        item[3] = "no";
    }
    //removing the original ticket to avoid duplicates
    ticketList.splice(ticketIndex,1);
    //putting the updated ticket back in at the same index
    ticketList.splice(ticketIndex,0,item);
    //re uploading the tickets to the local storage
    localStorage.setItem('tickets',JSON.stringify(ticketList));
    location.reload();
}

//setting the ticket working flag to yes
function working(ticketIndex) {
    var ticketList = JSON.parse(localStorage.getItem('tickets'));
    var item = ticketList[ticketIndex];
    if (item[4] === "no"){
        item[4] = "yes";
    } else if (item[4] === "yes"){
        item[4] = "no";
    }
    //removing the original ticket to avoid duplicates
    ticketList.splice(ticketIndex,1);
    //putting the updated ticket back in at the same index
    ticketList.splice(ticketIndex,0,item);
    //re uploading the tickets to the local storage
    localStorage.setItem('tickets',JSON.stringify(ticketList));
    location.reload();
}

//function for editing a ticket - Still needs work but is functional - If you click edit and then refresh the page it will delete the ticket - currently working on it
function editTicket(ticketIndex) {
    //getting the tickets
    var ticketList = JSON.parse(localStorage.getItem('tickets'));
    //getting the correct ticket using the ticket index passed in by the button
    var item = ticketList[ticketIndex];
    //getting the title and description
    var title = item[1];
    var desc = item[2];
    //setting those fields on the form to the correct text
    $("#title").val(title);
    $("#desc").val(desc);
    //removing the original ticket from the list
    ticketList.splice(ticketIndex,1);
    //setting the original text and title for if the edit is cancelled
    localStorage.setItem('oldContent',JSON.stringify([title,desc]));
    //re setting the ticket list in local storage - the ticket is now deleted so if the page is refreshed it will be lost
    localStorage.setItem('tickets',JSON.stringify(ticketList));
    //creating and appending the cancel button that calls the editCancel(ticketIndex) function
    var cancelButton = "<button class='btn btn-danger cancelButton' type='button' onclick='editCancel(" + ticketIndex +")'>Cancel</button>";
    $("#form").append(cancelButton);
}

//function for cancelling an edit of a ticket
function editCancel(ticketIndex) {
    //getting the current ticket list
    var ticketList = JSON.parse(localStorage.getItem('tickets'));
    //getting the original content of the ticket being edited
    var oldContent = JSON.parse(localStorage.getItem('oldContent'));
    //setting all the variables back to their original state
    var title = oldContent[0];
    var desc = oldContent[1];
    var id = ticketIndex + 1;
    //setting the variables into an array
    var item = [id,title,desc,"no","no"];
    //pushing it back into the ticket list at its original index
    ticketList.splice(ticketIndex,0,item);
    //re setting the ticket list
    localStorage.setItem('tickets',JSON.stringify(ticketList));
    //removing the cancel button
    $(".cancelButton").remove();
    //re loading the page
    location.reload()
}

//function for deleting tickets - takes the id variable from when the ticket was originally appended to the page
function removeTicket(id) {
    //collecting the list of tickets from local storage
    var ticketList = JSON.parse(localStorage.getItem('tickets'));
    //for each ticket
    ticketList.forEach(function (item) {
        //checking the stored id against the id of the ticket that was clicked
        if (id === item[0]){
            //if it matches, starting at the index of the matching id, remove one item
            ticketList.splice(ticketList.indexOf(item),1);
            //re upload the list to local storage
            localStorage.setItem('tickets',JSON.stringify(ticketList));
            //re load the page to see it take affect as it is re rendered
            location.reload();
        }
    })
}