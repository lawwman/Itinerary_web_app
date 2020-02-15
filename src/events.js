events_ids = [];

function create_event_card(event_id, name, location, duration, description) {
  const div = document.createElement('div');
  div.className = 'col-auto mb-3';
  div.id = event_id;
  div.innerHTML = `
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">` + name + `</h5>
        <h6 class="card-subtitle mb-2 text-muted">` + location + `</h6>
        <p class="card-text">` + description + `</p>
        <h6 class="card-subtitle mb-2 text-muted">` + duration + `</h6>
        <button type="button" class="btn btn-danger btn-sm float-right"  onclick="remove_event_card('` + div.id + `')">Delete event</button>
      </div>
    </div>`

  document.getElementById('event_card_container').appendChild(div);
}

// Add new event
function add_event(e) {

  // Prevent page from refreshing
  e.preventDefault();

  // Get event information
  var event_id = events_ids.length;
  var event_name = document.getElementById('eventInput').value;
  var event_location = document.getElementById('locationInput').value;
  var duration = document.getElementById('durationInput').value;
  var event_description = document.getElementById('descriptionInput').value;

  create_event_card(event_id, event_name, event_location, duration, event_description);

  // Add to local storage
  var events_list = localStorage.getItem("events_list");
  var event_item = {"event_id": event_id, "name": event_name, "location": event_location, "duration": duration, "event_description": event_description};

  // If no events list created yet
  if (events_list == null) events_list = [event_item];
  else {
    events_list = JSON.parse(events_list);
    events_list.push(event_item);
  }
  localStorage.setItem("events_list", JSON.stringify(events_list));
  events_ids.push(event_id);
}

function remove_event_card(event_id) {
  // remove div from html
  var element = document.getElementById(event_id);
  element.parentNode.removeChild(element);

  // remove item from storage
  var events_list = JSON.parse(localStorage.getItem("events_list"));
  for (var i = 0; i < events_list.length; i++) {
    if (events_list[i].event_id == event_id) {
      events_list.splice(i, 1);
      break;
    }
  }

  localStorage.setItem("events_list", JSON.stringify(events_list));
}

// Load event cards and initialise the events_ids
function load_event_cards() {
  var events_list = localStorage.getItem("events_list");

  if (events_list != null) {
    events_list = JSON.parse(events_list);

    for (var i = 0; i < events_list.length; i++) {
      var {event_id, name, location, duration, event_description} = events_list[i];
      create_event_card(event_id, name, location, duration, event_description);
      events_ids.push(i);
    }
  }
  console.log(events_ids);
}


// Add listener to create event form
document.getElementById("create_event").addEventListener('submit', add_event);


load_event_cards();

