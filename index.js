const inputField = document.querySelector("#input-field");
const inputForm = document.querySelector("#input-form");
const submitButton = document.querySelector("#submit-button");
const listContainer = document.querySelector("#list-container");
const sort = document.querySelector("#sort");
let listArr = [];


const initializeList = () => {
  if (localStorage.getItem("listArr")) {
    listArr = JSON.parse(localStorage.getItem("listArr"));
  } else {
    listArr = [];
  }
};

const renderTasks = () => {
  while (listContainer.firstChild)
    listContainer.removeChild(listContainer.firstChild);

  listArr.forEach((task) => createTaskCard(task));
};
const createTaskCard = (task) => {
  const mainCard = document.createElement("div");
  mainCard.className = "main-card";

  const container1 = document.createElement("div");
  container1.className = "container1";
  container1.textContent = "Task Complete";

  const isComplete = document.createElement("input");
  isComplete.type = "checkbox";
  isComplete.id = "checkbox";

  const taskText = document.createElement("input");
  taskText.className = "text";
  taskText.type = "text";
  taskText.value = task;
  taskText.readOnly = true;

  const container2 = document.createElement("div");
  container2.className = "container2";

  const editButton = document.createElement("input");
  editButton.type = "button";
  editButton.value = "Edit";
  editButton.className = "btn";

  const deleteButton = document.createElement("input");
  deleteButton.type = "button";
  deleteButton.value = "Delete";
  deleteButton.className = "btn";

  container1.prepend(isComplete);
  container2.append(deleteButton, editButton);
  mainCard.append(container1, taskText, container2);
  listContainer.append(mainCard);

  deleteButton.addEventListener("click", () => deleteTask(task));
  editButton.addEventListener("click", toggleEditTask(task));
};

const deleteTask = (task) => {
  listArr = listArr.filter((item) => item !== task);
  localStorage.setItem("listArr", JSON.stringify(listArr));
  renderTasks();
};

const toggleEditTask = (taskText, editButton, oldTask) => {
  taskText.readOnly = !taskText.readOnly;
  editButton.value = taskText.readOnly ? "Edit" : "Save";

  if (taskText.readOnly) {
    const taskIndex = listArr.indexOf(oldTask);
    if (taskIndex !== -1) {
      listArr[taskIndex] = taskText.value;
      localStorage.setItem("listArr", JSON.stringify(listArr));
    }
  } else {
    taskText.focus();
  }
};
inputForm.addEventListener("submit", (event) => {
  const newTask = inputField.value;
  if (newTask) {
    listArr.push(newTask);
    localStorage.setItem("listArr", JSON.stringify(listArr));
    renderTasks();
    inputField.value = "";
  } else {
    alert("cannot submitt empty task");
  }
});

initializeList();
renderTasks();