// file: main-date
// author: Santiago Stanham & Conor Kelly
//
// CSCI 2254 Web App Development
//

// Remove and complete icons in SVG format
var removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';


// Establishes the model
let makeModel = function() {
  return {
    todo: [],
    date: [],
    complete: [],
    date2: [],
    props: {
      input: document.getElementById('item'),
      addButton: document.getElementById('add'),
      todoList: document.getElementById('todo'),
      completeList: document.getElementById('completed'),

  }
};
}

// update : event * model -> model
//update has to contain all the changes to the data of the todolist
//includes the add item, delete item, move item between lists
//will return a updated model.
function update(event, model) {
  var target = event.target.closest('BUTTON');
if (target === model.props.addButton) {
console.log("adding a person..");
let name = model.props.input.value;
model.props.input.value = '';
model.todo.push(name); //This should handle the addButton
model.date.push(Date());
}
else if (target.className == "remove") {
let remove = event.target.closest('li').innerText;
console.log("in delete area of update, removing ", remove);
let i = model.todo.indexOf(remove);
if (i == -1) {
let j = model.complete.indexOf(remove);
model.complete.splice(j,1);
model.date2.splice(j,1);
}
else {
model.todo.splice(i, 1);  //remove from list
model.date.splice(i,1);
}
}
else {
let moveToComplete = event.target.closest('li').innerText;
console.log("Moving to completed..");
let i = model.todo.indexOf(moveToComplete);
if (i == -1) {
//move it back
let x = model.complete.indexOf(moveToComplete);
model.complete.splice(x,1);
let a = model.date2.splice(x,1);
model.todo.push(moveToComplete);
model.date.push(a);
}
else {
model.todo.splice(i, 1);
model.complete.push(moveToComplete);   //move to Complete
let a = model.date.splice(i,1);
model.date2.push(a);
}
}
//else if(event.target === model.props.todoList) {}   //..continue the process...
return model;

}


// view : model * (event -> unit) -> element
//The view element needs to render the todolist and the completed list
//for the user to see
function view(model, responder) {
  model.props.todoList.innerHTML = '';
  model.props.completeList.innerHTML = '';

    for (var i = 0; i < model.todo.length; i++) {
      var value = model.todo[i];

      var item = document.createElement('li');
      item.innerText = value;


      item.title = model.date[i];

      var buttons = document.createElement('div');
      buttons.classList.add('buttons');

      var remove = document.createElement('button');
      remove.classList.add('remove');
      remove.innerHTML = removeSVG;

      // Add click event for removing the item
      remove.addEventListener('click', responder);

      var complete = document.createElement('button');
      complete.classList.add('complete');
      complete.innerHTML = completeSVG;

      // Add click event for completing the item
      complete.addEventListener('click', responder);

      buttons.appendChild(remove);
      buttons.appendChild(complete);
      item.appendChild(buttons);
      model.props.todoList.insertBefore(item,model.props.todoList[0]);
    }

  for (var j = 0; j < model.complete.length; j++) {
    var value = model.complete[j];


    var item = document.createElement('li');
    item.innerText = value;

    item.title = model.date2[j];

    var buttons = document.createElement('div');
    buttons.classList.add('buttons');

    var remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = removeSVG;

    // Add click event for removing the item
    remove.addEventListener('click', responder);

    var complete = document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML = completeSVG;

    // Add click event for completing the item
    complete.addEventListener('click', responder);

    buttons.appendChild(remove);
    buttons.appendChild(complete);
    item.appendChild(buttons);
    model.props.completeList.insertBefore(item,model.props.completeList[0]);
  }

}


// start : app -> unit
function start(app) {
  console.log("starting app..");
  let model = makeModel();
  let cycle = function (event) {
  model = update(event,model);
  view(model,cycle);
  }
model.props.addButton.addEventListener('click', cycle);

document.getElementById('item').addEventListener('keydown', function (e) {
if (e.code === 'Enter') {
let value = model.props.input.value;
model.props.input.value = '';
model.todo.push(value); //This should handle the addButton
model.date.push(Date());
view(model,cycle);
}
})

}


let app = {
  view: view,
  update: update,
}

window.onload = function(){
  start(app);
}
