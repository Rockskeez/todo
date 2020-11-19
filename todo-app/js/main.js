const form = document.querySelector('#newTaskForm');
const input = document.querySelector('#addNewTask');
const tasksList = document.querySelector('#list-group');

// загрузить данные
loadData();

// Скрываем/Показываем запись "список дел пуст"
// toggleEmptyListItem();

// добавление задачи

form.addEventListener('submit', (event) => {
    event.preventDefault();

    input.value;
    const taskText = input.value;

    const taskHTML = `  <li class="list-group-item d-flex justify-content-between">
                            <span contenteditable="true" class="task-title">${taskText}</span>
                            <div>
                                <button type="button" data-action="ready" class="btn btn-light align-self-end">Готово</button>
                                <button type="button" data-action="delete-task" class="btn btn-light align-self-end">Удалить</button>
                            </div>
                        </li>`;

    tasksList.insertAdjacentHTML('afterbegin', taskHTML);

    // удаляем кнопку готово
    toggleEmptyListItem();
    
    input.value = "";

    input.focus();

    // сохраняем данные
    saveData();
});

// прослушивание клика по всей области списка
tasksList.addEventListener('click', (event) => {
    console.log(event.target);
    event.target

    // кнопка "удалить"
    if (event.target.getAttribute('data-action') == 'delete-task') {

        event.target.closest('.list-group-item').remove();

        toggleEmptyListItem();

        saveData();
    } // кнопка "добавить"
     else if (event.target.getAttribute('data-action') == 'ready') {

        const parentElement = event.target.closest('.list-group-item');

        parentElement.querySelector('span.task-title').classList.add('task-title--done');

        // уберем у тега span атрибут contenteditable
        parentElement.querySelector('span.task-title').setAttribute('contenteditable', 'false');


        // перемещаем запись в конец списка
        tasksList.insertAdjacentElement('beforeend', parentElement);

        // удалить кнопку "готово" и "удалить"
        parentElement.querySelector('button[data-action="ready"]').remove();

        // Сохраняем данные
        saveData();
    }
});


// функция проверки списка на пустоту

let toggleEmptyListItem = () => {
    if (tasksList.children.length > 1) {
        document.querySelector('#empty-list-item').style.display = "none";
    } else {
        document.querySelector('#empty-list-item').style.display = "block";
    }
};

// функция сохранение данных
let saveData = () => {
    localStorage.setItem('todoList' , tasksList.innerHTML);
}

function loadData() {
    if (localStorage.getItem('todoList')) {
        tasksList.innerHTML = localStorage.getItem('todoList');
    }
}