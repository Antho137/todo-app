const todoForm = document.getElementById('todo-form');
let todoInput = document.getElementById('todo-input');
let todoDate = document.getElementById('todo-date'); 
let todoPriority = document.getElementById('todo-priority'); 
const todoList = document.getElementById('todo-list');
const completed = document.getElementById('completed'); 
const uncompleted = document.getElementById('uncompleted');

todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const newTask = todoInput.value;
    const newDate = todoDate.value;
    const newPriority = todoPriority.value;

    if (newTask === '' && newDate === '' && newPriority === '') {
        alert('Please enter a task!');
        return
    }
    todoInput.value = '';
    todoDate.value = '';
    todoPriority.value = '';
    addTask(newTask, newDate, newPriority);
});

function addTask(task, date, priority) {
    const list = document.createElement('li');
    
    const checkBox = document.createElement('input');
    checkBox.className = 'checkbox';
    checkBox.setAttribute('type', 'checkbox');
    list.appendChild(checkBox);
    
    const taskText = document.createElement('span');
    taskText.className = 'task';
    taskText.textContent = task;
    list.appendChild(taskText);
    
    const dateText = document.createElement('span');
    dateText.className = 'date';
    dateText.textContent = `Date: ${date}`;
    list.appendChild(dateText);
    
    const priorityText = document.createElement('span');
    priorityText.className = 'priority';
    priorityText.textContent = `Priority: ${priority}`;
    list.appendChild(priorityText);
    
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = 'Edit';
    list.appendChild(editBtn);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    list.appendChild(deleteBtn);

    todoList.appendChild(list);

    checkBox.addEventListener('change', function() {
        if (this.checked) {
            taskText.style.textDecoration = 'line-through';
        } else {
            taskText.style.textDecoration = 'none';
        }
        list.classList.toggle('completed', checkBox.checked);
        saveTasksToLocalStorage();
        updateCounter();
    })

    deleteBtn.addEventListener('click', function() {
        if (confirm("Are you sure to delete this task?")) {
            todoList.removeChild(list);
        }
        saveTasksToLocalStorage();
        updateCounter();
    })

    editBtn.addEventListener('click', function() {
        const isEditing = prompt('Edit task:', taskText.textContent);
        const isEditing1 = prompt('Edit date:', dateText.textContent);
        const isEditing2 = prompt('Edit priority:', priorityText.textContent);
        if (isEditing) {
            taskText.textContent = isEditing;
            dateText.textContent = isEditing1;
            priorityText.textContent = isEditing2;
            list.classList.remove('completed');
            checkBox.checked = false;
            updateCounter();
            saveTasksToLocalStorage();
        }
    });
    
    updateCounter(); 
    saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#todo-list li').forEach(task => {
        const taskText = task.querySelector('span').textContent;
        let isCompleted = task.classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

document.addEventListener('DOMContentLoaded', function() {
    const saveTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    saveTasks.forEach(task => {
        addTask(task.text);
    });
});

function updateCounter() {
    const completedTask = document.querySelectorAll('.completed').length;
    const uncompletedTask = document.querySelectorAll('li:not(.completed)').length;

    completed.textContent = completedTask;
    uncompleted.textContent = uncompletedTask;
}