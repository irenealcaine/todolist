const form = document.querySelector("#form");
const list = document.querySelector("#list");
let tasks = [];

eventListeners();
function eventListeners() {
  form.addEventListener("submit", addTask);
  document.addEventListener("DOMContentLoaded", () => {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    createHTML();
  });
}

function addTask(e) {
  e.preventDefault();
  const task = document.querySelector("#task").value;
  const style = document.querySelector("#priority").value;
  const taskObj = {
    id: Date.now(),
    task,
    style
  };
  tasks = [...tasks, taskObj];

  createHTML();
  form.reset();
}

function createHTML() {
  clearHTML();
  if (tasks.length > 0) {
    tasks.forEach(task => {
      const btnEliminar = document.createElement("a");
      btnEliminar.classList.add("delete");
      btnEliminar.textContent = "X";
      btnEliminar.onclick = () => {
        deleteTask(task.id);
      };

      const li = document.createElement("li");
      li.textContent = task.task;

      if (task.style === "high") {
        li.classList.add("high");
      } else if (task.style === "medium") {
        li.classList.add("medium");
      } else if (task.style === "low") {
        li.classList.add("low");
      } else {
        li.classList.add("no-priority");
      }

      li.appendChild(btnEliminar);
      list.appendChild(li);
    });
  }

  sincronizarStorage();
}

function clearHTML() {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}

function sincronizarStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  createHTML();
}
