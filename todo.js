const addButton = document.querySelectorAll('.add')[0];
const addButtonText = addButton.innerText;
const todoField = document.querySelectorAll('.todo-field')[0];
const todoArea = document.querySelectorAll('.todo-lower-section')[0];

let todo_array = [];
let edit_id = null;

document.addEventListener('DOMContentLoaded', () => {
    let objStr = localStorage.getItem('todo');
    if (objStr != null) {
        todo_array = JSON.parse(objStr);
        displayTodo(todo_array);
    }
});

addButton.addEventListener('click', () => {
    if (todoField.value == "") {
        alert("Please enter something before adding");
    } else {
        if (edit_id === null) {
            todo_array.push({ 'todo': todoField.value, 'done': false });
        } else {
            // Update the existing todo with the new value
            todo_array[edit_id].todo = todoField.value;
            // Reset the edit_id after saving
            edit_id = null;
        }
        saveTodo(todo_array);
        displayTodo(todo_array);
        todoField.value = "";
        addButton.innerText = addButtonText;
    }
});

const saveTodo = (todo_array) => {
    localStorage.setItem('todo', JSON.stringify(todo_array));
};

const displayTodo = (array) => {
    todoArea.innerHTML = "";
    if(array.length == 0){
        todoArea.innerHTML = `<li>No todos here</li>`;
    }
    else{
    array.forEach((value, index) => {
        let li = document.createElement('li');
        let left_section = document.createElement('div');
        left_section.className = 'left-section';
        
        let input = document.createElement('input');
        input.type = 'checkbox';
        input.name = 'checkbox';
        input.id = 'checkbox';
        input.classList.add('checkbox-input');
        input.checked = value.done;
        input.onclick = () => doneTodo(index);

        let todo = document.createElement('span');
        todo.className = 'todo';
        todo.innerText = `${value.todo}`;

        let right_section = document.createElement('div');
        right_section.className = 'right-section';

        let edit_button = document.createElement('button');
        edit_button.className = 'edit';
        edit_button.innerText = 'Edit';
        edit_button.onclick = () => editTodo(index);

        let delete_button = document.createElement('button');
        delete_button.className = 'delete';
        delete_button.innerText = 'Delete';
        delete_button.onclick = () => deleteTodo(index);

        left_section.appendChild(input);
        left_section.appendChild(todo);
        right_section.appendChild(edit_button);
        right_section.appendChild(delete_button);
        li.appendChild(left_section);
        li.appendChild(right_section);
        todoArea.appendChild(li);

        if (value.done) {
            document.querySelectorAll('.todo')[index].classList.add('todo-text-decoration');
        }
    });
}
};

const doneTodo = (index) => {
    todo_array[index].done = !todo_array[index].done;
    saveTodo(todo_array);
    document.querySelectorAll('.todo')[index].classList.toggle('todo-text-decoration');
};

const editTodo = (index) => {
    todoField.value = todo_array[index].todo;
    todoField.focus();
    addButton.innerText = 'Save Todo';
    edit_id = index;
}

const deleteTodo = (index) => {
    todo_array.splice(index, 1);
    saveTodo(todo_array);
    displayTodo(todo_array);
};
