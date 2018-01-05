// Declare my columns which will be empty arrays
// that will take a task object

var toDoList = [
 {
   title: 'title 01',
   desc: 'desc 01',
   assignee: 'me',
   id: '0',
   type: 'todo'
 }
];

var uniqueIdCounter = 0; 
var inProgressList = [
  {
   title: 'title 01',
   desc: 'desc 01',
   assignee: 'me',
   id: '1',
   type: 'In Progress'
 }
];
var completedList = [
  {
   title: 'title 01',
   desc: 'desc 01',
   assignee: 'me',
   id: '2',
   type: 'Completed'
 }
];
var acceptedList = [
  {
   title: 'title 01',
   desc: 'desc 01',
   assignee: 'me',
   id: '3',
   type: 'Accepted'
 }
];
var archiveList = [
  {
   title: 'title 01',
   desc: 'desc 01',
   assignee: 'me',
   id: '4',
   type: 'Archived'
 }
];

var toDoColumn = document.getElementById('todo');
var inProgressColumn = document.getElementById('inprogress');
var completedColumn = document.getElementById('completed');
var acceptedColumn = document.getElementById('accepted');
var archiveColumn = document.getElementById('archive');
var formContainer = document.getElementById('formcontainer');

function renderColumns(){
  toDoColumn.innerHTML = '<h3>To do</h3>';
  inProgressColumn.innerHTML = '<h3>In progress</h3>';
  completedColumn.innerHTML = '<h3>Completed</h3>';
  acceptedColumn.innerHTML = '<h3>Accepted</h3>';
  archiveColumn.innerHTML = '<h3>Archived</h3>';
  
  for(var i = 0; i < toDoList.length; i++){
    
    var newToDoCard = createCardElement(
      toDoList[i].title, 
      toDoList[i].desc, 
      toDoList[i].assignee, 
      toDoList[i].id, 
      toDoList[i].type);
    toDoColumn.appendChild(newToDoCard); 
  }
  
  for(var k = 0; k < inProgressList.length; k++){
    
    var newProgressCard = createCardElement(
      inProgressList[k].title, 
      inProgressList[k].desc, 
      inProgressList[k].assignee, 
      inProgressList[k].id, 
      inProgressList[k].type);
    inProgressColumn.appendChild(newProgressCard); 
  }
  
  for(var l = 0; l < completedList.length; l++){
    
    var newCompletedCard = createCardElement(
      completedList[l].title, 
      completedList[l].desc, 
      completedList[l].assignee, 
      completedList[l].id, 
      completedList[l].type);
    completedColumn.appendChild(newCompletedCard); 
  }
  
  for(var m = 0; m < acceptedList.length; m++){
    
    var newAcceptedCard = createCardElement(
      acceptedList[m].title, 
      acceptedList[m].desc, 
      acceptedList[m].assignee, 
      acceptedList[m].id, 
      acceptedList[m].type);
    acceptedColumn.appendChild(newAcceptedCard); 
  }
  
  for(var n = 0; n < archiveList.length; n++){
    
    var newArchivedCard = createCardElement(
      archiveList[n].title, 
      archiveList[n].desc, 
      archiveList[n].assignee, 
      archiveList[n].id, 
      archiveList[n].type);
    archiveColumn.appendChild(newArchivedCard); 
  }

}

renderColumns();

function createCardElement(title, desc, assignee, id, type ){
    var card = document.createElement('div');
    card.className="card";
  
    var cardTitle = document.createElement('p');
    cardTitle.innerHTML = title;

    var cardDesc = document.createElement('p');
    cardDesc.innerHTML = desc;

    var cardAssignee = document.createElement('p');
    cardAssignee.innerHTML = assignee;
    
    var cardId = document.createElement('p');
    cardId.innerHTML = id;
  
    card.id = id; 
  
    var deleteTaskForm = document.createElement('form');
    deleteTaskForm.onsubmit = deleteCard;
 
    var deleteTaskIdInput = document.createElement('input');
    deleteTaskIdInput.value = id;
    deleteTaskIdInput.name = 'id'; 
  
    var deleteTaskTypeInput = document.createElement('input');
    deleteTaskTypeInput.value = type;
    deleteTaskTypeInput.name = 'type';
  
    var deleteTaskButton = document.createElement('button'); 
    deleteTaskButton.innerHTML = 'Delete';
    deleteTaskButton.type = 'submit'; 
    deleteTaskButton.className = 'deleteTaskButton';
  
    deleteTaskForm.appendChild(deleteTaskIdInput);
    deleteTaskForm.appendChild(deleteTaskTypeInput); 
    deleteTaskForm.appendChild(deleteTaskButton);
  
    var moveTaskForm = document.createElement('form');
    moveTaskForm.onsubmit = moveCard;
  
    var moveTaskIdInput = document.createElement('input'); 
    moveTaskIdInput.value = id;
    moveTaskIdInput.name = 'id';
    moveTaskIdInput.type = 'hidden'; 
  
    var moveTaskTypeInput = document.createElement('input');
    moveTaskTypeInput.value = type;
    moveTaskTypeInput.name = 'type';
    moveTaskTypeInput.type = 'hidden';
  
    var moveTaskButton = document.createElement('button'); 
    moveTaskButton.type = 'submit';
    moveTaskButton.innerHTML = '→';
    moveTaskButton.className = 'moveTaskButton';
  
    moveTaskForm.appendChild(moveTaskIdInput);
    moveTaskForm.appendChild(moveTaskTypeInput);
    moveTaskForm.appendChild(moveTaskButton);

    card.appendChild(cardTitle);
    card.appendChild(cardDesc);
    card.appendChild(cardAssignee);
    card.appendChild(cardId);    
    card.appendChild(deleteTaskForm);
    if(type != 'Archived'){
      card.appendChild(moveTaskForm);
    }
    

    return card;
}

//move task to another column

function moveCard(event){
  event.preventDefault();
  console.log(event.target.id.value); 
  console.log(event.target.type.value); 
  
  switch(event.target.type.value){
   case 'todo':
      var taskToMove = toDoList.find(function(task){
        return task.id == event.target.id.value;
      });
      deleteCard(event);
      taskToMove.type = 'In Progress'; 
      inProgressList.push(taskToMove);
    break;
     
   case 'In Progress':
      var taskToMove = inProgressList.find(function(task){
        return task.id == event.target.id.value;
      });
      deleteCard(event);
      taskToMove.type = 'Completed'; 
      completedList.push(taskToMove);
    break;
     
   case 'Completed':
      var taskToMove = completedList.find(function(task){
        return task.id == event.target.id.value;
      });
      deleteCard(event);
      taskToMove.type = 'Accepted'; 
      acceptedList.push(taskToMove);
    break;
   
  case 'Accepted':
      var taskToMove = acceptedList.find(function(task){
        return task.id == event.target.id.value;
      });
      deleteCard(event);
      taskToMove.type = 'Accepted'; 
      archiveList.push(taskToMove);
    break;
     
   case 'Archived':
    break;
 }
 renderColumns();
}



//create a form function to handle when new 
// task it submitted 

function handleSubmit(event){
  console.log('handle submit fired'); 
  event.preventDefault();
  console.log(event.target.title.value); 
  console.log(event.target.description.value); 
  console.log(event.target.assignee.value); 
  var newTaskObject = {
    title: event.target.title.value, 
    desc: event.target.description.value, 
    assignee: event.target.assignee.value,
    id: 'task' + uniqueIdCounter + 1,
    type: 'todo'
  };
  uniqueIdCounter++;
  uniqueIdCounter = uniqueIdCounter + 1;
  toDoList.push(newTaskObject);
  renderColumns(); 
  


}
function deleteCard(event){
  event.preventDefault();
  console.log('deleted this card');
  console.log(event.target.id.value);
  console.log(event.target.type.value);
  
//   if(event.target.type.value === 'todo'){
//     console.log(event.target.id.value, 'inside');
//      toDoList = toDoList.filter(function(task){
//        return task.id != event.target.id.value;
//      });
//     renderColumns();
//   }
  // switch case //
 switch(event.target.type.value){
   case 'todo': // checking type is 'todo'
    toDoList = toDoList.filter(function(task){
      return task.id != event.target.id.value;
    });
    break;
     
   case 'In Progress': // checking type is 'inprogress'
    inProgressList = inProgressList.filter(function(task){
      return task.id != event.target.id.value;
    });
    break;
     
   case 'Completed': // checking type is 'completed'
    completedList = completedList.filter(function(task){
      return task.id != event.target.id.value;
    });
    break;
   
  case 'Accepted': // checking type is 'accepted'
    acceptedList = acceptedList.filter(function(task){
      return task.id != event.target.id.value;
    });
    break;
     
   case 'Archived': // checking type is 'archive'
    archiveList = archiveList.filter(function(task){
      return task.id != event.target.id.value;
    });
    break;
 }
 renderColumns();
}


var newTaskForm = document.createElement('form'); 
newTaskForm.onsubmit = handleSubmit; 

var titleInput = document.createElement('input'); 
titleInput.placeholder = 'title'; 
titleInput.name = 'title'; 
titleInput.required = true; 

var descInput = document.createElement('input'); 
descInput.placeholder = 'description'; 
descInput.name = 'description';
descInput.required = true;

var assigneeInput = document.createElement('input'); 
assigneeInput.placeholder = "assignee";
assigneeInput.name = 'assignee';
assigneeInput.required = true; 

var submitButton = document.createElement('button'); 
submitButton.innerHTML = 'add task'; 

submitButton.type = 'submit';

newTaskForm.appendChild(titleInput);
newTaskForm.appendChild(descInput);
newTaskForm.appendChild(assigneeInput);
newTaskForm.appendChild(submitButton);
formContainer.appendChild(newTaskForm); 
