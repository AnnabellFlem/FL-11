const rootNode = document.getElementById('root');

const todoItems = [];

const idPrefix = 'item';

const hash = () => new Date().getTime();

const move = (array, from, to) => array.splice(to, 0, ...array.splice(from, 1));

const titleElement = (tag, text) => {
    const item = document.createElement(tag);
    item.textContent = text;
    return item;
}

const buttonElement = (props) => {
    const {
        text,
        enabled = true,
        className
    } = props;
    const item = document.createElement('button');
    item.textContent = text;
    if (className) {
        item.classList.add(className);
    }
    if (!enabled) {
        item.disabled = true;
    }
    return item;
}

const alertElement = (title, text) => {
    const timeout = 2000;
    const alertId = 'alert';
    const item = document.getElementById(alertId) || document.createElement('div');
    item.id = alertId;
    // item.style.border = '1px solid red'; // delete!!
    // item.style.width = '300px'; // delete!!
    // item.style.position = 'absolute'; // delete!!
    // item.style.top = '0'; // delete!!
    if (window.chrome) {
        item.style.left = 0;
    } else {
        item.style.right = 0;
    }

    item.innerHTML = `
        <h3>${title}</h3>
        <p>${text}</p>
        <button class="alert-close">&times;</button>
    `;
    item.getElementsByClassName('alert-close')[0]
        .addEventListener('click', () => item.remove());
    setTimeout(() => item.remove(), timeout);
    return item;
}

const inputElement = (text) => {
    const item = document.createElement('input');
    item.setAttribute('type', 'text');
    if (text) {
        item.value = text;
    }
    return item;
}

const getId = (id) => `${idPrefix}${id}`;

const liItem = (item) => {
    const li = document.createElement('li');
    li.id = getId(item.id);
    li.innerHTML = `
        <input class="checkbox" type="checkbox" ${item.isDone ? 'checked' : ''}>
        <label class="container">${item.description}</label>
        <button name="btn-delete" class="delete"><i class="material-icons">delete</i></button>
    `;
    return li;
}

function createMainPage() {
    rootNode.appendChild(titleElement('h2', 'Simple TODO application'));

    const button = buttonElement({
        text: 'Add new task'
    });
    button.addEventListener('click', () => {
        reloadPageWithHash('add');
    });
    rootNode.appendChild(button);

    todoItems.push(...localStorage.getItem('todoItems') ?
        JSON.parse(localStorage.getItem('todoItems')) : []);
    if (todoItems.length) {
        const ul = document.createElement('ul');
        todoItems.forEach((item) => {
            const li = liItem(item);

            li.querySelector('input[type=checkbox]')
                .addEventListener('change', () => {
                    const index = todoItems.findIndex((el) => el.id === item.id);
                    if (!item.isDone) {
                        move(todoItems, index, todoItems.length - 1);
                        ul.appendChild(li);
                    } else {
                        const doneIndex = todoItems.findIndex((el) => el.isDone);
                        move(todoItems, index, doneIndex ? doneIndex : 0);
                        ul.insertBefore(li, ul.getElementsByTagName('li')[doneIndex]);
                    }
                    item.isDone = !item.isDone;
                    localStorage.setItem('todoItems', JSON.stringify(todoItems));
                });
            li.querySelector('button[name=btn-delete]')
                .addEventListener('click', () => {
                    const index = todoItems.findIndex((el) => el.id === item.id);
                    todoItems.splice(index, 1);
                    localStorage.setItem('todoItems', JSON.stringify(todoItems));
                    li.remove();
                    if (!todoItems.length) {
                        rootNode.appendChild(titleElement('h3', 'TODO is empty'));
                    }
                });

            li.querySelector('label')
                .addEventListener('click', () => {
                    if (item.isDone) {
                        rootNode.appendChild(alertElement('Error!', "You can't edit already done item"));
                    } else {
                        reloadPageWithHash(`modify/${li.id.slice(idPrefix.length)}`);
                    }
                });

            ul.appendChild(li);
        });
        rootNode.appendChild(ul);
    } else {
        rootNode.appendChild(titleElement('h3', 'TODO is empty'));
    }
}

function createModifyTaskPage(id) {
    const task = todoItems.find((item) => item.id === id);

    rootNode.appendChild(titleElement('h2', 'Modify item'));
    if (task) {
        rootNode.appendChild(inputElement(task.description)).focus();
    }

    const buttonCancel = buttonElement({
        text: 'Cancel'
    });
    buttonCancel.addEventListener('click', () => {
        location = '';
    });
    rootNode.appendChild(buttonCancel);

    const buttonSave = buttonElement({
        text: 'Save changes'
    });
    buttonSave.addEventListener('click', () => {
        let result = false;
        todoItems.map((item) => {
            const index = -1;
            const value = document.getElementsByTagName('input')[0].value;
            if (item.id === id) {
                if (todoItems.findIndex((el) => el.description === value) !== index) {
                    rootNode.appendChild(alertElement('Error!', "You can't add already exist item"));
                } else {
                    item.description = value;
                    result = true;
                }
            }
            return item;
        });
        if (result) {
            localStorage.setItem('todoItems', JSON.stringify(todoItems));
            location = '';
        }
    });
    rootNode.appendChild(buttonSave);
}

function createAddTaskPage() {
    rootNode.appendChild(titleElement('h2', 'Add task'));

    const input = inputElement();
    input.addEventListener('keyup', (event) => {
        const {
            target: {
                value
            }
        } = event;
        document.getElementsByClassName('btn-save')[0].disabled = !value;
    });
    rootNode.appendChild(input).focus();

    const buttonCancel = buttonElement({
        text: 'Cancel'
    });
    buttonCancel.addEventListener('click', () => {
        location = '';
    });
    rootNode.appendChild(buttonCancel);

    const buttonSave = buttonElement({
        text: 'Save changes',
        className: 'btn-save',
        enabled: false
    });
    buttonSave.addEventListener('click', () => {
        const value = document.getElementsByTagName('input')[0].value;
        const index = -1;
        let result = false;

        if (todoItems.findIndex((item) => item.description === value) === index) {
            todoItems.push({
                isDone: false,
                id: hash(),
                description: value
            });
            result = true;
        } else {
            rootNode.appendChild(alertElement('Error!', "You can't add already exist item"));
        }
        
        if (result) {
            localStorage.setItem('todoItems', JSON.stringify(todoItems));
            location = '';
        }
    });
    rootNode.appendChild(buttonSave);
}

function reloadPageWithHash(url) {
    location.replace(`#/${url}`);
}

function locationHashChanged() {
    while (rootNode.hasChildNodes()) {
        rootNode.removeChild(rootNode.firstChild);
    }
    if (!location.hash) {
        createMainPage();
    } else if (location.hash === '#/add') {
        createAddTaskPage();

    } else if (/^#\/modify\/\d+$/i.test(location.hash)) {
        const data = location.hash.split('/');
        createModifyTaskPage(+data[data.length - 1]);
    }
}

locationHashChanged();

window.onhashchange = locationHashChanged;