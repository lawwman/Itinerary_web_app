function createEventForm(id) {
    const form = document.createElement('form');
    form.innerHTML = `
    <div class="form-row">
        <div class="form-group col-md-4">
            <label for="locationInput">Location</label>
            <input type="text" class="form-control" id="` + id + `-locationInput" placeholder="Location. E.g. Nara Park">
        </div>
        <div class="form-group col-md-4">
            <label for="descriptionInput">Event Description</label>
            <input type="text" class="form-control" id="` + id + `-descriptionInput" placeholder="look at deers.">
        </div>
    </div>
    <div class="form-group  col-md-4">
        <label for="durationInput">Duration</label>
        <select id="` + id + `-durationInput" class="form-control">
            <option selected>1 hour</option>
            <option>2 hours</option>
            <option>3 hours</option>
            <option>4 hours</option>
            <option>5 hours</option>
            <option>6 hours</option>
            <option>7 hours</option>
            <option>8 hours</option>
            <option>9 hours</option>
            <option>10 hours</option>
            <option>11 hours</option>
            <option>12 hours</option>
        </select>
    </div>
  <button id="` + id + `-submitEditForm" type="button" class="btn btn-primary">Add new event</button>`

  return form;
}

function createDateInput(date) {
    const div = document.createElement('div');
    div.className = "form-group";
    div.innerHTML = `
    <div class="form-group col-md-6">
        <input id="dateInput" type="text" class="form-control" id="formGroupExampleInput" placeholder="` + date + `">
    </div>
    `
    return div;
}

function createResizableDiv(height) {
    var div = document.createElement('div');
    div.className = 'columnSelector';
    div.style.top = 0;
    div.style.right = 0;
    div.style.width = '5px';
    div.style.position = 'absolute';
    div.style.cursor = 'col-resize';
    div.style.userSelect = 'none';
    /* table height */
    div.style.height = height - 18  + 'px';
    return div;
}

function createEventDetailButtons(id) {
    var div = document.createElement('div');
    div.innerHTML = `
    <button type="button" id="` + id + "-edit" + `" class="btn btn-outline-primary">Edit</button>
    <button type="button" class="btn btn-outline-danger">Delete</button>
    <button type="button" class="btn btn-outline-info">Duplicate</button>`

    return div;
}