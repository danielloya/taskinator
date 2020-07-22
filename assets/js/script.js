var taskIdCounter = 0;
var formE1 = document.querySelector("#task-form");
var tasksToDoE1 = document.querySelector("#tasks-to-do");
var pageContentE1 = document.querySelector("#page-content");

var taskFormHandler = function(event) {

    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
    }
    
    formE1.reset();

    // package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };
    // send it as an argument to createTaskE1
    createTaskE1(taskDataObj);
}

var createTaskE1 = function(taskDataObj) {
    var listItemE1 = document.createElement("li");
    listItemE1.className = "task-item";

    // add task id as a custom attribute
    listItemE1.setAttribute("data-task-id", taskIdCounter);

    var taskInfoE1 = document.createElement("div");
    taskInfoE1.className = "task-info";
    taskInfoE1.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemE1.appendChild(taskInfoE1);

    var taskActionsEl = createTaskActions(taskIdCounter);
    taskInfoE1.appendChild(taskActionsEl);
    
    tasksToDoE1.appendChild(listItemE1);

    // increase task counter for next unique id
    taskIdCounter++;

};

var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
      
        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
};

formE1.addEventListener("submit", taskFormHandler);

var taskButtonHandler = function(event) {
    // get target element from event
    var targetE1 = event.target;

    // edit button was clicked
    if (targetE1.matches(".edit-btn")) {
        var taskId = targetE1.getAttribute("data-task-id");
        editTask(taskId);
    }
    // delete button was clicked
    else if (targetE1.matches(".delete-btn")) {
        var taskId = targetE1.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

var editTask = function(taskId) {
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
    console.log("editing task #" + taskId);

    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;

    var taskType = taskSelected.querySelector("span.task-type").textContent;
        document.querySelector("input[name='task-name']").value = taskName;
        document.querySelector("select[name='task-type']").value = taskType;
};

pageContentE1.addEventListener("click", taskButtonHandler);