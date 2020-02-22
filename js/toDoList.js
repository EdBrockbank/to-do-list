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
                //if no create the html and append it to the ticket area div
                var ticket = "<div class='ticket'><h3 class='title'>" + item[1] + "</h3><br><p class='desc'>" + item[2] + "</p><button class='btn btn-success' type='button' data-id='" + item[0] + "' onclick='moveComplete(" + item[0] + ")'>Completed</button> <button class='btn btn-danger' type='button' data-id='" + item[0] + "' onclick='removeTicket(" + item[0] + ")'>Remove</button> </div>";
                $("#ticketArea").append(ticket);
            } else {
                //if yes create the html and append it to the completed area div
                var ticket = "<div class='ticket'><h3 class='title'>" + item[1] + "</h3><br><p class='desc'>" + item[2] + "</p> <button class='btn btn-danger' type='button' data-id='" + item[0] + "' onclick='removeTicket(" + item[0] + ")'>Remove</button> </div>";
                $("#completedArea").append(ticket);
            }
        })
    }
}

//function to create a new ticket
function newTicket() {
    //getting the title and description and setting the completed flag to no
    var title = $("#title").val();
    var desc = $("#desc").val();
    var complete = "no";
    //if the local storage is empty
    if (JSON.parse(localStorage.getItem('tickets')) === null){
        //setting the id
        var id = 1;
        //setting the variable
        var item = [id,title, desc,complete];
        //setting the array of arrays
        var items = [item];
        //pushing it to local storage
        localStorage.setItem('tickets',JSON.stringify(items));
    } else {
        //getting the current list of tickets
        var list = JSON.parse(localStorage.getItem('tickets'));
        //setting the id
        var id = list.length + 1;
        //pushing the data into an array
        var item = [id,title, desc,complete];
        //pushing the array into the list of tickets
        list.push(item);
        //pushing the updated list to the local storage
        localStorage.setItem('tickets',JSON.stringify(list));
    }
    //re directing back to the index page (this all takes place on a form page)
    window.location.href = "index.html";
}

//function for clearing the list and reloading the page
function clearList() {
    localStorage.clear();
    location.reload();
}

//function for moving a ticket to the completed list - takes the id variable from when the ticket was originally appended to the page
function moveComplete(id) {
    //getting the list of tickets from local storage
    var ticketList = JSON.parse(localStorage.getItem('tickets'));
    //for each item in the list of tickets
    ticketList.forEach(function (item) {
        //check the stored id against the id of the ticket that was clicked
        if (item[0] === id){
            //if it matches change the completed flag to yes
            item[3] = "yes";
        }
    });
    //re upload the list to the local storage with the new 'yes' flag
    localStorage.setItem('tickets',JSON.stringify(ticketList));
    //re load the page to see it take affect as it is re rendered
    location.reload();
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