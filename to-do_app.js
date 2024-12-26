async function fetchTasks() {
    const response = await fetch('http://127.0.0.1:5000/tasks');
    const tasks = await response.json();
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = `task ${task.completed ? 'completed' : ''}`;
        taskItem.innerHTML = `
            <span>${task.name} - ${task.datetime}</span>
            <div>
                <button onclick="completeTask(${index})">Complete</button>
                <button onclick="editTask(${index})">Edit</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}

async function addTask() {
    const name = document.getElementById('task-name').value;
    const datetime = document.getElementById('task-datetime').value;
    const response = await fetch('http://127.0.0.1:5000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, datetime, completed: false })
    });
    if (response.ok) {
        fetchTasks();
    }
}

async function completeTask(taskId) {
    const response = await fetch(`http://127.0.0.1:5000/tasks/${taskId}/complete`, { method: 'PUT' });
    if (response.ok) {
        fetchTasks();
    }
}

async function editTask(taskId) {
    const newName = prompt('Enter new task name:');
    const newDatetime = prompt('Enter new date and time:');
    const response = await fetch(`http://127.0.0.1:5000/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, datetime: newDatetime, completed: false })
    });
    if (response.ok) {
        fetchTasks();
    }
}

fetchTasks();