//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

//event listeners
document.addEventListener('DOMContentLoaded', rerenderTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);

//functions

//load any saved previous todos from local storage
getTodos()

//add todo
function addTodo(event) {
    if(todoInput.value === '') return
    
    console.log(todoInput.value)

    //prevent form from submitting
    event.preventDefault();
   
    //Todo Div create
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    saveTodo(todoInput.value)

    //checkmark button
    const completedButton = document.createElement('button');
    completedButton.innerText = '✓';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //trash button
    const trashButton = document.createElement('button');
    trashButton.innerText = '✕';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);


    //append to list
    todoList.appendChild(todoDiv);

    //clear out input value
    todoInput.value = '';
}


function deleteCheck(event) {
    const item = event.target;

    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        const deleteValue = item.parentElement.firstChild.innerText
        todo.classList.add('fall');
        removeTodoFromStorage(todo)
        todo.addEventListener('transitionend', function () {
            todo.remove();
            removeTodoFromStorage(deleteValue)
        });
    }
    

    if (item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

//local storage functions
function saveTodo(todo) {
    let todos = getTodosFromStorage()
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodosFromStorage() {
    let todos
    // let status
    if(localStorage.getItem('todos') === null) {
        todos = []
        // status = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
        // status = JSON.parse(localStorage.getItem('status'))
    }
    
    return todos
}

function rerenderTodos() {
    let todos = getTodosFromStorage()
    todos.forEach(todo => {
    //Todo Div create
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //checkmark button
    const completedButton = document.createElement('button');
    completedButton.innerText = '✓';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //trash button
    const trashButton = document.createElement('button');
    trashButton.innerText = '✕';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);


    //append to list
    todoList.appendChild(todoDiv);
    })

}

function removeTodoFromStorage(todo) {
    let todos = getTodosFromStorage()
    let todoText = todo.children[0].innerText
    todos.splice(todos.indexOf(todoText), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function randomId() {
    return Math.floor(Math.random() * 1000 + 1)
}









