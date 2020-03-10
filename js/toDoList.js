$(document).ready(function () {
    renderTickets();
    renderSubTickets();
    if ($("#formArea").is(":visible")){
        $("#formArea").toggle();
    }
});

function showForm() {
    $("#background").addClass("grayout");
    $("#formArea").toggle();
    $("#form").append("<button id='cancel' class='btn btn-danger' type='button' onclick='cancelNewTicket()'>Cancel</button>")
}

function cancelNewTicket() {
    $("#background").removeClass("grayout");
    $("#formArea").toggle();
    $("#cancel").remove();
}

function renderTickets() {
    var tickets = JSON.parse(localStorage.getItem('tickets'));
    if (tickets !== null) {
        tickets.forEach(function (item) {
            if (item[3] === "no") {
                if (item[4] === "yes"){
                    var ticket = "<div class='ticket-working'><h3 class='title'>" + item[1] + " - Working</h3><br><p class='desc'>" + item[2] + "</p> <br> <p>Created on: " + item[5] + "</p><button class='btn btn-success' type='button' onclick='moveComplete(" + tickets.indexOf(item) + ")'>Completed</button> <button class='btn btn-warning' type='button' onclick='working(" + tickets.indexOf(item) + ")'>Stopped working on it!</button> <button class='btn btn-primary' type='button' onclick='editTicket(" + tickets.indexOf(item) + ")'>Edit ticket</button> <button class='btn btn-danger' type='button' onclick='removeTicket(" + item[0] + ")'>Remove</button> </div>";
                    $("#ticketArea").append(ticket);
                } else if (item[4] === "no"){
                    var ticket = "<div class='ticket'><h3 class='title'>" + item[1] + "</h3><br><p class='desc'>" + item[2] + "</p> <br> <p>Created on: " + item[5] + "</p><div class='sub-tickets' id='" + item[0] +"'><button class='btn btn-primary' type='button' onclick='newSubTicket("+ item[0] +")'>New Sub Ticket</button> </div> <button class='btn btn-success' type='button' onclick='moveComplete(" + tickets.indexOf(item) + ")'>Completed</button> <button class='btn btn-warning' type='button' onclick='working(" + tickets.indexOf(item) +")'>Working On It!</button> <button class='btn btn-primary' type='button' onclick='editTicket( " + tickets.indexOf(item) + " )'>Edit ticket</button> <button class='btn btn-danger' type='button' onclick='removeTicket(" + item[0] + ")'>Remove</button> </div>";
                    $("#ticketArea").append(ticket);
                }
            } else {
                var ticket = "<div class='ticket'><h3 class='title'>" + item[1] + "</h3><br><p class='desc'>" + item[2] + "</p> <br> <p>Created on: " + item[5] + "</p><button class='btn btn-success' type='button' onclick='moveComplete(" + tickets.indexOf(item) + ")'>un-completed</button> <button class='btn btn-danger' type='button' onclick='removeTicket(" + item[0] + ")'>Remove</button> </div>";
                $("#completedArea").append(ticket);
            }
        })
    }
}

function renderSubTickets() {
    var subTickets = JSON.parse(localStorage.getItem('subTickets'));
    if (subTickets !== null){
        subTickets.forEach(function (item) {
            var subTicket = "<h3 class='title'>"+ item[1] +"</h3><br><p class='desc'>"+ item[2] +"</p>";
            $("#" + item[0]).append(subTicket);
        })
    }
}

function newTicket() {
    var title = $("#title").val();
    var desc = $("#desc").val();
    var complete = "no";
    var working = "no";
    var date = new Date();
    var month = date.getMonth() + 1;
    var dateShow = date.getDate() + "/" + month + "/" + date.getFullYear();
    if (JSON.parse(localStorage.getItem('tickets')) === null){
        var id = 1;
        var item = [id,title, desc,complete,working,dateShow];
        var ticketList = [item];
        localStorage.setItem('tickets',JSON.stringify(ticketList));
    } else {
        var ticketList = JSON.parse(localStorage.getItem('tickets'));
        var id = ticketList.length + 1;
        var item = [id,title, desc,complete,working,dateShow];
        ticketList.push(item);
        localStorage.setItem('tickets',JSON.stringify(ticketList));
    }
    $("#cancel").remove();
    $("#formArea").toggle();
    $("#background").removeClass("grayout");
    location.reload();
}

function newSubTicket(divID){
    $("#background").addClass("grayout");
    $("#formArea").toggle();
    $("#submit").remove();
    $("#form").append("<button id='sub-ticket-submit' class='btn btn-primary' type='button' onclick='createSubTicket("+ divID +")'>Save</button>");
    $("#form").append("<button id='cancel' class='btn btn-danger' type='button' onclick='cancelNewTicket()'>Cancel</button>")
}

function createSubTicket(divID) {
    console.log(divID);
    var title = $("#title").val();
    var desc = $("#desc").val();
    var subTicket = [divID,title,desc];
    if (JSON.parse(localStorage.getItem('subTickets')) === null){
        var subTickets = [];
        subTickets.push(subTicket);
        localStorage.setItem('subTickets',JSON.stringify(subTickets))
    } else {
        subTickets = JSON.parse(localStorage.getItem('subTickets'));
        subTickets.push(subTicket);
        localStorage.setItem('subTickets',JSON.stringify(subTickets));
    }
    $("#formArea").toggle();
    location.reload();
}

function clearList() {
    localStorage.clear();
    location.reload();
}

function moveComplete(ticketIndex){
    var ticketList = JSON.parse(localStorage.getItem('tickets'));
    var item = ticketList[ticketIndex];
    if (item[3] === "no"){
        item[3] = "yes";
    } else if (item[3] === "yes"){
        item[3] = "no";
    }
    ticketList.splice(ticketIndex,1);
    ticketList.splice(ticketIndex,0,item);
    localStorage.setItem('tickets',JSON.stringify(ticketList));
    location.reload();
}

function working(ticketIndex) {
    var ticketList = JSON.parse(localStorage.getItem('tickets'));
    var item = ticketList[ticketIndex];
    if (item[4] === "no"){
        item[4] = "yes";
    } else if (item[4] === "yes"){
        item[4] = "no";
    }
    ticketList.splice(ticketIndex,1);
    ticketList.splice(ticketIndex,0,item);
    localStorage.setItem('tickets',JSON.stringify(ticketList));
    location.reload();
}

function editTicket(ticketIndex) {
    $("#formArea").toggle();
    $("#background").addClass("grayout");
    var ticketList = JSON.parse(localStorage.getItem('tickets'));
    var item = ticketList[ticketIndex];
    var title = item[1];
    var desc = item[2];
    $("#title").val(title);
    $("#desc").val(desc);
    ticketList.splice(ticketIndex,1);
    localStorage.setItem('oldContent',JSON.stringify([title,desc]));
    localStorage.setItem('tickets',JSON.stringify(ticketList));
    var cancelButton = "<button class='btn btn-danger cancelButton' type='button' onclick='editCancel(" + ticketIndex +")'>Cancel</button>";
    $("#form").append(cancelButton);
}

function editCancel(ticketIndex) {
    var ticketList = JSON.parse(localStorage.getItem('tickets'));
    var oldContent = JSON.parse(localStorage.getItem('oldContent'));
    var title = oldContent[0];
    var desc = oldContent[1];
    var id = ticketIndex + 1;
    var item = [id,title,desc,"no","no"];
    ticketList.splice(ticketIndex,0,item);
    localStorage.setItem('tickets',JSON.stringify(ticketList));
    $(".cancelButton").remove();
    $("#background").removeClass("grayout");
    location.reload()
}

function removeTicket(id) {
    var ticketList = JSON.parse(localStorage.getItem('tickets'));
    ticketList.forEach(function (item) {
        if (id === item[0]){
            ticketList.splice(ticketList.indexOf(item),1);
            localStorage.setItem('tickets',JSON.stringify(ticketList));
            location.reload();
        }
    })
}