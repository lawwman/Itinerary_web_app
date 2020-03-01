
/* Accepts list variable with [<id>, <type>] */
/* <type> is either "date" or "card" */
function timeLineBlock(args) {

    var div = document.createElement('div');
    div.className = "timeline-block";
    div.id = args[0] + "-block";
    var innerHTML = `
    <div id="` + args[0] + `-addCard" class="add-card">
        <button onclick="createNewTimeLineBlock([` + args[0] + `, 'date']);">Add new day</button>
        <button onclick="createNewTimeLineBlock([` + args[0] + `, 'card']);">Add new activity</button>
        <button>Add wet weather program</button>
    </div>
    <div class="icon"><img src="./images/plus_icon.png" class="plus_icon"></div>`;

    if (args[1] == "date") innerHTML += innerHTMLOfDateWrapper(args[0]);

    else innerHTML += innerHTMLOfCardWrapper(args[0]);

    div.innerHTML = innerHTML;
    return div;
}

function innerHTMLOfDateWrapper(id) {
    var innerHTML = `
    <div class="date-wrapper">
        <div class="timeline-date"><h2>Day 1 id: ` + id + `</h2></div>
        <div id="` + id + `-buttonWrapper" class="button-wrapper">
            <button onclick="deleteTimeLineBlock(`+ id + `);">Delete</button>
        </div>
    </div>`;
    return innerHTML;
}

function innerHTMLOfCardWrapper(id) {
    var innerHTML = `
    <div class="card-wrapper">
        <div class="timeline-card">
            <h1 contenteditable="true">New Activity id: ` + id + `</h1>
            <p id="` + id + `-p" contenteditable="true">Activity description.</p>
        </div>
        <div id="` + id + `-buttonWrapper" class="button-wrapper">
            <button onclick="deleteTimeLineBlock(`+ id + `);">Delete</button>
            <button onclick="minimizeTimeLineBlock(`+ id + `);">Minimize</button>
        </div>
        </div>`;
    return innerHTML;
}