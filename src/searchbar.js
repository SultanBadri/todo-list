import {
  lists,
  selectedListId,
  clearElement,
  listsContainer,
  renderLists,
  listDisplayContainer,
  listTitleElement,
  tasksContainer,
  taskTemplate,
  editTask,
} from "./index";

const searchTasks = (() => {
  const searchBar = document.querySelector("#searchBar");

  searchBar.addEventListener("keyup", (e) => {
    const selectedList = lists.find((list) => list.id === selectedListId);
    const searchString = e.target.value.toLowerCase();

    const searchedTasks = selectedList.tasks.filter((task) => {
      return (
        task.name.toLowerCase().includes(searchString) ||
        task.description.toLowerCase().includes(searchString)
      );
    });
    renderSearch(searchedTasks);
  });

  function renderSearch(searchedTasks) {
    clearElement(listsContainer);
    renderLists();
    const selectedList = lists.find((list) => list.id === selectedListId);

    if (selectedListId === null) {
      const todoLister = document.querySelector(".todo-lister");
      todoLister.style.display = "none";
      listDisplayContainer.style.background = "red";
    } else {
      listDisplayContainer.style.display = "";
      listTitleElement.innerHTML = `<i class="fas fa-tasks"></i> ${selectedList.name}`;
      clearElement(tasksContainer);
      renderSearchedTasks(searchedTasks);
      colorSearchedTasks(searchedTasks);
    }
  }

  function colorSearchedTasks(searchedTasks) {
    const todos = [...document.querySelectorAll(".todo")];
    const checkbox = [...document.querySelectorAll(".checkbox")];
    for (let i = 0; i < todos.length; i++) {
      for (let i = 0; i < searchedTasks.length; i++) {
        if (searchedTasks[i].priority === "High") {
          checkbox[i].style.border = "2px solid #ed1250";
        } else if (searchedTasks[i].priority === "Medium") {
          checkbox[i].style.border = "2px solid #d3d00f";
        } else {
          checkbox[i].style.border = "2px solid #0fc53d";
        }
      }
    }
  }

  function renderSearchedTasks(searchedTasks) {
    searchedTasks.forEach((task) => {
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
})();

export { searchTasks };
