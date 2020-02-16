colNum = 17
dates = []
selectedEventDates = -1

function addRow(id) {
    const tr = document.createElement('tr');
    var innerHTML = `<th id="` + id + `" class="eventDate">insert date</th>`
    for(var i = 0; i < colNum; i++) innerHTML += "<td></td>";
    tr.innerHTML = innerHTML
    document.getElementById('scheduleBody').appendChild(tr);
    initEventDate(id.toString());
}


function setupSchedule() {
    if (dates.length == 0) addRow(1);
}


function createDateInput(id) {
    if (selectedEventDates == id) { // remove date input
        selectedEventDates = -1;
        var innerHTML = document.getElementById(id).innerHTML;
        /* Get the input date from the innerHTML. */
        var date = innerHTML.split(`placeholder="`)[1];
        date = date.replace(`"></div></div>`, "");

        document.getElementById(id).innerHTML = date;

        return;
    }
    selectedEventDates = id;

    var date = document.getElementById(id).innerHTML;
    document.getElementById(id).innerHTML = "";

    const div = document.createElement('div');
    div.className = "form-group";
    div.id = "dateInputForm";
    document.getElementById(id).appendChild(div);

    const formDiv = document.createElement('div');
    formDiv.className = "form-group col-md-6";
    var innerHTML = `<input id="dateInput" type="text" class="form-control" id="formGroupExampleInput" placeholder="` + date + `">`
    formDiv.innerHTML = innerHTML;
    document.getElementById("dateInputForm").appendChild(formDiv);

    document.getElementById("dateInput").select();
    $("#dateInput").bind("keypress", {}, keypressInBox);
}



function keypressInBox(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) { //Enter keycode                        
        e.preventDefault();

        console.log("hello") // do something
    }
};


$(window).on('load',function(){
    setupSchedule();
});


  function initEventDetail() {
    $('td').click(function() {
        console.log("hi");
    });
  }

/* The th element in the table. Basically the table cell that stores the date. */
  function initEventDate(id) {
    var idHash = "#" + id.toString();
    $(idHash).click(function() {
        createDateInput(id);
    });
  }