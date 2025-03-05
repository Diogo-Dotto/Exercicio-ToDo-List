const taskInput = document.querySelector("#taskInput");
const addTaskBtn = document.querySelector("#addTask");
const taskList = document.querySelector("#taskList");

document.addEventListener('DOMContentLoaded', loadTasks);

addTaskBtn.addEventListener('click', () => {
    if (taskInput.value.trim() !== "") {
        addTask(taskInput.value);
        taskInput.value
        saveTasks()
    }
    
})

function addTask(text) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="task-text">${text}</span>
        <button class="edit">✏️</button>
        <button class="remove">❌</button>
    `;

    li.querySelector(".task-text").addEventListener('click', () => {
        li.classList.toggle("completed");
        saveTasks()
    });

    li.querySelector(".edit").addEventListener('click', () => {
        const newText = prompt("Edite sua tarefa:", text);
        if (newText) {
            li.querySelector('.task-text').innerHTML = newText;
            saveTasks()
        }

    });

    li.querySelector(".remove").addEventListener('click', () => {
        li.remove();
        saveTasks()
    });

    taskList.appendChild(li)

    taskInput.value = ''
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".task-text").forEach(task => {
        tasks.push({ text: task.innerText, completed: task.parentElement.classList.contains("completed") });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => {
        addTask(task.text);
        if (task.completed) {
            document.querySelectorAll(".task-text".forEach(taskEl => {
                if (taskEl.innerText = task.text) {
                    taskEl.parentElement.classList.add(".completed")
                };
            }));
        };
    });
};

