
//show the current date
let currentDateElement = document.getElementById("CurrentDate");
const currentDate = new Date();
let dateString = (currentDate.getMonth() + 1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear();
currentDateElement.innerHTML = "Current Date : " + (currentDate.getMonth() + 1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear();

document.getElementById('deadlineInput').valueAsDate = new Date(dateString);

let TaskList = []; // this is our empty array for the items

// Caching items from the HTML
let tasknameInput = document.getElementById("tasknameInput");
let categoryInput = document.getElementById("categoryInput");
let deadlineInput = document.getElementById("deadlineInput");
let statusSelect = document.getElementById("status-select");

let addTaskButton = document.getElementById("addTaskButton");
let TaskBody = document.getElementById("TaskBody");

// Our button fuctionalities

addTaskButton.addEventListener("click", function () {
  let taskname = tasknameInput.value;
  let category = categoryInput.value;
  let deadline = deadlineInput.value;

  let status = statusSelect.value;
 
  if (taskname === "") {
    let errorMessage = document.getElementById("ErrorMessage");
    errorMessage.innerText = "Please enter Task Name.";
    return;
  }
 
  if (category === "") {
    let errorMessage = document.getElementById("ErrorMessage");
    errorMessage.innerText = "Please enter a category.";
    return;
  }
  

  let taskItem = {};
  taskItem.Name = taskname;
  taskItem.Category = category;
  taskItem.Deadline = deadline;

  taskItem.Status = status;

  //format deadline date in GMT time zone without the time clock affecting the date part
  var deadLineDate = new Date(taskItem.Deadline)
  var newDeadLineString = deadLineDate.getFullYear() + "-" + (deadLineDate.getMonth() + 1) + "-" + (deadLineDate.getDate()+1);
  var newdeadLineDate = new Date (newDeadLineString);

  //format current date in GMT time zone without the time clock affecting the date part
  var newcurrentDateString = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate());
  var newcurrentDate = new Date (newcurrentDateString);

  //check for overdue status
  if (+newcurrentDate === +newdeadLineDate)
  {
    //"equal"
  }
  else if (newcurrentDate > newdeadLineDate)
  {
    //"greater"
    //overdue, change status to overdue
    taskItem.Status = "Overdue";
  }
  else
  {
    //"less"
  }



  TaskList.push(taskItem); // Add item to cart array

  renderTask();
  //reset the fields
  tasknameInput.value = "";
  categoryInput.value = "";
});
 
// show the list in a table format
function renderTask() {
  
  let lastIndex = TaskList.length-1;
  let lastItem = TaskList[lastIndex];

  let taskRow = document.createElement("tr");
  taskRow.setAttribute("data-itemIndex", lastIndex);

  let taskName = document.createElement("td");
  let taskNameString = lastItem.Name;
  taskName.innerHTML = taskNameString;
  taskRow.appendChild(taskName);
  
  let taskCategory = document.createElement("td");
  let taskCategoryString = lastItem.Category;
  taskCategory.innerHTML = taskCategoryString;
  taskRow.appendChild(taskCategory);

  let taskDeadlineDate = document.createElement("td");
  let taskDeadlineDateString = lastItem.Deadline;
  taskDeadlineDate.innerHTML = taskDeadlineDateString;
  taskRow.appendChild(taskDeadlineDate);

  let taskStatus = document.createElement("td");
  taskStatus.classList.add("Status");
  let taskStatusString = lastItem.Status;
  taskStatus.innerHTML = taskStatusString;
  taskRow.appendChild(taskStatus); 

  let taskChangeStatusColumn = document.createElement("td")
  let taskChangeStatusString = '<button class="ChangeStatusButton" onclick="ChangeStatusButtonClick(' + 
    lastIndex + ')"> Change Status </button>';

  taskChangeStatusColumn.innerHTML = taskChangeStatusString;
  taskRow.appendChild(taskChangeStatusColumn);     

  TaskBody.appendChild(taskRow);
  
  
}

const modal = document.getElementById("ChangeStatusDialog");

let ChangeStatusButtonClick = function(itemIndex){

  var element = document.getElementById("submitBtn"); 
  element.setAttribute("data-indexnumber", itemIndex);

  modal.classList.add("show");

};

const SubmitBtn = document.getElementById("submitBtn");
const CancelBtn = document.getElementById("cancelBtn");

SubmitBtn.addEventListener("click", submitModal);
CancelBtn.addEventListener("click", cancelModal);

function submitModal() {
  var element = document.getElementById("submitBtn"); 
  var itemIndex = element.getAttribute("data-indexnumber");

  let newStatus = document.getElementById("newstatus-select");
  

  //update the item in the list
  let taskItem = TaskList[itemIndex];
  taskItem.Status = newStatus.value;

  //update the table view
  var rows = document.getElementById("TaskBody").getElementsByTagName("tr");

  for (var rowIndex = 0; rowIndex < rows.length; rowIndex++)
  {
    var row = rows[rowIndex];
    var rowItemIndex = row.getAttribute("data-itemIndex");
    if (rowItemIndex == itemIndex)
    {
      var cols = row.getElementsByTagName("td");
      var colItem = cols[3];
      colItem.innerHTML = taskItem.Status;
    }
  }
 
  modal.classList.remove("show");
}

function cancelModal() {
  modal.classList.remove("show");
}


let filterstatusSelect = document.getElementById("filterstatus-select");
filterstatusSelect.addEventListener("change", function(){

  var e = document.getElementById("filterstatus-select");
  var value = e.value;
  var text = e.options[e.selectedIndex].text;

  RefreshFilterList(value);
});

function RefreshFilterList (filterValue) {  

  //clear the list
  TaskBody.innerHTML = "";

  for (var index = 0; index < TaskList.length; index++)
  {
    var TaskItem = TaskList[index];

    if (TaskItem.Status == filterValue)
    {

      //show this item
      let lastIndex = index;
      let lastItem = TaskList[lastIndex];

      let taskRow = document.createElement("tr");
      taskRow.setAttribute("data-itemIndex", lastIndex);

      let taskName = document.createElement("td");
      let taskNameString = lastItem.Name;
      taskName.innerHTML = taskNameString;
      taskRow.appendChild(taskName);
      
      let taskCategory = document.createElement("td");
      let taskCategoryString = lastItem.Category;
      taskCategory.innerHTML = taskCategoryString;
      taskRow.appendChild(taskCategory);

      let taskDeadlineDate = document.createElement("td");
      let taskDeadlineDateString = lastItem.Deadline;
      taskDeadlineDate.innerHTML = taskDeadlineDateString;
      taskRow.appendChild(taskDeadlineDate);

      let taskStatus = document.createElement("td");
      taskStatus.classList.add("Status");
      let taskStatusString = lastItem.Status;
      taskStatus.innerHTML = taskStatusString;
      taskRow.appendChild(taskStatus); 

      let taskChangeStatusColumn = document.createElement("td")
      let taskChangeStatusString = '<button class="ChangeStatusButton" onclick="ChangeStatusButtonClick(' + 
        lastIndex + ')"> Change Status </button>';

      taskChangeStatusColumn.innerHTML = taskChangeStatusString;
      taskRow.appendChild(taskChangeStatusColumn);     

      TaskBody.appendChild(taskRow);
                  
    }
  }


}

