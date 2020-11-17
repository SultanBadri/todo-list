import { searchTasks } from "./searchbar";

const listsContainer = document.querySelector("[data-lists]");
const newListForm = document.querySelector("[data-new-list-form]");
const newListInput = document.querySelector("[data-new-list-input]");
const deleteListButton = document.querySelector("[data-delete-list-button]");
const listDisplayContainer = document.querySelector(
  "[data-list-display-container]"
);
const listTitleElement = document.querySelector("[data-list-title");
const listCountElement = document.querySelector("[data-list-count");
const tasksContainer = document.querySelector("[data-tasks");
const taskTemplate = document.querySelector("#task-template");
const newTaskForm = document.querySelector("[data-new-task-form]");
const newTaskInput = document.querySelector("[data-new-task-input]");
const newTaskDate = document.querySelector("#due-date");
const newTaskPriority = document.querySelector("#priority");
const newTaskDescription = document.querySelector("#description");
const clearCompleteTasksButton = document.querySelector(
  "[data-clear-complete-tasks-button]"
);
let lists = JSON.parse(localStorage.getItem("task.lists")) || [];
let selectedListId = localStorage.getItem("task.selectedListId");
const overlay = document.querySelector("#overlay");
const formContainer = document.querySelector(".container");
const closeButton = document.querySelector(".close");
const addButton = document.querySelector(".add-btn");
const hamburger = document.querySelector(".hamburger");
let modalOpen = false;

function renderAndSave() {
  render();
  localStorage.setItem("task.lists", JSON.stringify(lists));
  localStorage.setItem("task.selectedListId", selectedListId);
}

function render() {
  clearElement(listsContainer);
  renderLists();
  const selectedList = lists.find((list) => list.id === selectedListId);

  if (selectedListId === null) {
    listDisplayContainer.style.display = "none";
  } else {
    listDisplayContainer.style.display = "";
    listTitleElement.innerHTML = `<i class="fas fa-tasks"></i> ${selectedList.name}`;
    renderTaskCount(selectedList);
    clearElement(tasksContainer);
    renderTasks(selectedList);
    colorTasks(selectedList);
  }
}

//clear lists
function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function renderLists() {
  lists.forEach((list) => {
    const listElement = document.createElement("li");
    listElement.innerText = list.name;
    listElement.dataset.listId = list.id;
    if (list.id === selectedListId) {
      listElement.classList.add("active-list");
    }
    listsContainer.appendChild(listElement);
  });
}

function renderTasks(selectedList) {
  if (selectedList.tasks.length === 0) {
    listDisplayContainer.style.background =
      "url(./images/tasks.svg) center no-repeat";
    listDisplayContainer.style.backgroundSize = "35%";
  } else {
    listDisplayContainer.style.background = "";
  }

  function renderTaskCount(selectedList) {
    const incompleteTaskCount = selectedList.tasks.filter(
      (task) => !task.complete
    ).length;
    const taskString = incompleteTaskCount === 1 ? "task" : "tasks";
    listCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`;
  }

  function colorTasks(selectedList) {
    const todos = [...document.querySelectorAll(".todo")];
    const checkbox = [...document.querySelectorAll(".checkbox")];
    for (let i = 0; i < todos.length; i++) {
      for (let i = 0; i < selectedList.tasks.length; i++) {
        if (selectedList.tasks[i].priority === "High") {
          checkbox[i].style.border = "2px solid #ed1250";
        } else if (selectedList.tasks[i].priority === "Medium") {
          checkbox[i].style.border = "2px solid #d3d00f";
        } else {
          checkbox[i].style.border = "2px solid #0fc53d";
        }
      }
    }
  }

  selectedList.tasks.forEach((task) => {
    const taskElement = document.importNode(taskTemplate.content, true);
    const checkbox = taskElement.querySelector("input");
    checkbox.id = task.id;
    checkbox.checked = task.complete;
    const label = taskElement.querySelector("label");
    label.htmlFor = task.id;

    const lineBreak = document.createElement("br");
    label.append(task.name, ", ", task.date, lineBreak, task.description);
    const editButton = document.createElement("p");
    editButton.innerHTML = `<i class="far fa-edit"></i>`;
    editButton.classList.add("edit");
    editButton.addEventListener("click", () => editTask(task, label));
    const todoTask = taskElement.querySelector(".task");
    todoTask.append(editButton);
    tasksContainer.appendChild(taskElement);
  });
}

function editTask(task, label) {
  openOrCloseUpdateTaskForm();
  newTaskInput.value = task.name;
  newTaskDate.value = task.date;
  newTaskPriority.value = task.priority;
  newTaskDescription.value = task.description;

  newTaskForm.addEventListener("submit", () => {
    console.log("daw");
    task.name = newTaskInput.value;
    task.date = newTaskDate.value;
    task.priority = newTaskPriority.value;
    task.description = newTaskDescription.value;
    label.innerHTML = `<span class="checkbox"></span>${task.name}<br>${task.date}<br>${task.description}`;
    renderAndSave();
    // location.reload();
  });
}

//make new list
newListForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const listName = newListInput.value;
  if (listName === null || listName === "") return;
  const list = createList();
  newListInput.value = null;
  lists.push(list);
  renderAndSave();
});

function createList() {
  return { id: Date.now().toString(), name: newListInput.value, tasks: [] };
}

//make new task
newTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskName = newTaskInput.value;
  const h2 = document.querySelector(".container h2");
  if (h2.textContent === "Update Task") return;
  if (taskName === null || taskName === "") return;
  const task = createTask();
  newTaskInput.value = null;
  const selectedList = lists.find((list) => list.id === selectedListId);
  selectedList.tasks.push(task);
  renderAndSave();
});

function createTask() {
  return {
    id: Date.now().toString(),
    name: newTaskInput.value,
    date: newTaskDate.value,
    priority: newTaskPriority.value,
    description: newTaskDescription.value,
    complete: false,
  };
}

//delete a selected list
deleteListButton.addEventListener("click", (e) => {
  lists = lists.filter((list) => list.id !== selectedListId);
  selectedListId = null;
  renderAndSave();
});

//clear all checked tasks
clearCompleteTasksButton.addEventListener("click", (e) => {
  const selectedList = lists.find((list) => list.id === selectedListId);
  selectedList.tasks = selectedList.tasks.filter((task) => !task.complete);
  renderAndSave();
});

//when user wants to add a new task
function openOrCloseAddTaskForm() {
  const h2 = document.querySelector(".container h2");
  const submitInput = document.querySelector(`input[type="submit"]`);

  if (modalOpen) {
    formContainer.style.pointerEvents = "none";
    formContainer.style.transform = "scale(0)";
    overlay.style.opacity = 0;
    modalOpen = false;
  } else {
    h2.textContent = "New Task";
    submitInput.value = "Submit";
    formContainer.style.pointerEvents = "auto";
    formContainer.style.transform = "scale(1)";
    overlay.style.opacity = 1;
    modalOpen = true;
  }
}

//for when user wants to update task
function openOrCloseUpdateTaskForm() {
  const h2 = document.querySelector(".container h2");
  const submitInput = document.querySelector(`input[type="submit"]`);

  if (modalOpen) {
    formContainer.style.pointerEvents = "none";
    formContainer.style.transform = "scale(0)";
    overlay.style.opacity = 0;
    modalOpen = false;
  } else {
    h2.textContent = "Update Task";
    submitInput.value = "Update";
    formContainer.style.pointerEvents = "auto";
    formContainer.style.transform = "scale(1)";
    overlay.style.opacity = 1;
    modalOpen = true;
  }
}

//close modal
function closeModal() {
  formContainer.style.transform = "scale(0)";
  overlay.style.opacity = 0;
  modalOpen = false;
}

//display list tasks
listsContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "li") {
    selectedListId = e.target.dataset.listId;
    renderAndSave();
  }
});

//saves whether task is checked or unchecked
tasksContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "input") {
    const selectedList = lists.find((list) => list.id === selectedListId);
    const selectedTask = selectedList.tasks.find(
      (task) => task.id === e.target.id
    );
    selectedTask.complete = e.target.checked;
    renderAndSave();
  }
});

//open form when user clicks on + button
addButton.addEventListener("click", () => {
  openOrCloseAddTaskForm();
  if (modalOpen) {
    addButton.style.background = "#2185d5";
    addButton.style.transform = "rotate(45deg)";
  } else {
    addButton.style.background = "transparent";
    addButton.style.transform = "rotate(0)";
  }
});

//close form when user clicks on X
closeButton.addEventListener("click", () => {
  closeModal();
  addButton.style.background = "transparent";
  addButton.style.transform = "rotate(0)";
});

//close form after it's submitted
formContainer.addEventListener("submit", (e) => {
  e.preventDefault();
  openOrCloseAddTaskForm();
  addButton.style.background = "transparent";
  addButton.style.transform = "rotate(0)";
  modalOpen = false;
});

//toggle slide-in of sidebar when user clicks on hamburger menu
hamburger.addEventListener("click", () => {
  const sidebar = document.querySelector("#sidebar");
  sidebar.classList.toggle("active");
  hamburger.classList.toggle("clicked");
});

render();

export {
  lists,
  selectedListId,
  clearElement,
  listsContainer,
  renderLists,
  listDisplayContainer,
  listTitleElement,
  renderTaskCount,
  tasksContainer,
  taskTemplate,
  editTask,
};
