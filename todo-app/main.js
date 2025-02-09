const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const li = document.createElement("li");
    li.innerHTML = `${taskText} <button class="delete-btn">X</button>`;

    li.querySelector(".delete-btn").addEventListener("click", function () {
        li.remove();
        saveTasks();
    });

    taskList.appendChild(li);

    setTimeout(() => {
        li.classList.add("show");
    }, 10); 
    taskInput.value = "";
    saveTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", taskList.innerHTML);
}

function loadTasks() {
    taskList.innerHTML = localStorage.getItem("tasks") || "";

    
    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", function () {
            button.parentElement.remove();
            saveTasks();
        });
    });

    document.querySelectorAll("li").forEach(li => {
        setTimeout(() => {
            li.classList.add("show");
        }, 10);
    });
}

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

document.addEventListener("DOMContentLoaded", loadTasks);
