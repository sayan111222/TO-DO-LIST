document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load saved tasks from localStorage when the page loads
    loadTasks();

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const task = taskInput.value;
        addTask(task);
        saveTaskToLocalStorage(task);
        taskInput.value = ''; // Clear input after adding the task
    });

    // Add a new task to the list
    function addTask(task) {
        const li = document.createElement('li');
        li.textContent = task;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            li.remove();
            deleteTaskFromLocalStorage(task);
        };

        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }

    // Save task to localStorage
    function saveTaskToLocalStorage(task) {
        let tasks = getTasksFromLocalStorage();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Delete task from localStorage
    function deleteTaskFromLocalStorage(taskToRemove) {
        let tasks = getTasksFromLocalStorage();
        tasks = tasks.filter(task => task !== taskToRemove);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Retrieve tasks from localStorage
    function getTasksFromLocalStorage() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }

    // Load tasks from localStorage and display them
    function loadTasks() {
        const tasks = getTasksFromLocalStorage();
        tasks.forEach(task => addTask(task));
    }
});
