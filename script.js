//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

//event listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);

//functions
function addTodo(event) {

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
    localStorage.setItem(randomId(), todo)
}

function getTodos(id) {
    localStorage.getItem(id)
}

function removeTodoFromStorage(todo) {
    localStorage.removeItem(localStorage.key(todo))
}

function randomId() {
    return Math.floor(Math.random() * 1000 + 1)
}









