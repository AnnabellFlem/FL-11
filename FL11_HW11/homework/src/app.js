class TodoItem {
    constructor(text, owner = undefined) {
        this._text = text;
        this._id = this.hash();
        this._owner = owner;
        this._done = false;
    }

    hash() {
        return new Date().getTime();
    }

    setInnerText(text) {
        return `
            <label class="container">${text}
                <input class="checkbox" type="checkbox">
                <span class="checkmark"></span>
            </label>
        `;
    }

    get() {
        const item = document.createElement('li');
        item.id = this.domId();
        item.classList.add('item');
        item.setAttribute('draggable', true);
        item.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', event.target.id);
            event.dataTransfer.effectAllowed = 'move';
        });

        item.addEventListener('dragover', (event) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'move';
        });

        item.addEventListener('drop', (event) => {
            event.preventDefault();
            event.stopPropagation();

            if (event.target.localName === 'li') {
                const data = event.dataTransfer.getData('text');
                const item = document.getElementById(data);
                if (item) {
                    event.target.insertAdjacentElement('beforebegin', item);
                }
            }
        });

        item.innerHTML = `
            <label class="container">${this._text}
                <input class="checkbox" type="checkbox">
                <span class="checkmark"></span>
            </label>
            <button name="btn-edit" class="edit"><i class="material-icons">create</i></button>
            <button name="btn-delete" class="delete"><i class="material-icons">delete</i></button>
            <div class="editPanel">
                <input class="hidden" type="text" placeholder="Add new action" value="${this._text}">
                <button class="hidden" name="btn-save" class="save"><i class="material-icons">save</i></button>
            </div>
        `;

        item.querySelector('input[type=checkbox]')
            .addEventListener('change', (event) => {
                this._done = true;
                event.target.disabled = true;
                item.querySelectorAll('input[type=text], button[name=btn-save]').forEach((el) => {
                    el.disabled = true;
                });
            });
        item.querySelectorAll('button[name=btn-edit], button[name=btn-save]').forEach((el) => {
            if (el.name === 'btn-save') {
                el.addEventListener('click', () => {
                    item.querySelector('label').outerHTML =
                        this.setInnerText(item.querySelector('input[type=text]').value);
                });
            }
            el.addEventListener('click', () => {
                item.querySelectorAll('input[type=text], button[name=btn-save]').forEach((el) => {
                    el.classList.toggle('hidden');
                });
            });
        });
        item.querySelector('button[name=btn-delete]')
            .addEventListener('click', () => {
                this._owner.delete(item);
            });

        return item;
    }

    done() {
        this._done = true;
    }

    domId() {
        return `item${this._id}`;
    }

}

class TodoList {
    constructor() {
        this._items = [];
        this._maxCount = 10;
        this._root = document.getElementById('todo-list');
    }

    add(text) {
        if (this.isEnabled()) {
            const item = new TodoItem(text, this);
            this._items.push(item);
            this._root.appendChild(item.get());
        }
        this.update();
    }

    delete(item) {
        for (let i = 0; i < this.count(); i++) {
            if (this._items[i].domId() === item.id) {
                this._items.splice(i, 1);
                i--;
            }
        }
        item.remove();
        this.update();
    }

    count() {
        return this._items.length;
    }

    isEnabled() {
        return this._items.length < this._maxCount;
    }

    update() {
        const enabled = this.isEnabled();
        document.getElementById('todo-item__new__text').disabled = !enabled;
        document.getElementById('todo-item__new').disabled = !enabled;
        document.getElementsByTagName('h2')[0].classList.toggle('invisible', enabled);
    }
}

const Todo = new TodoList();

document.getElementById('todo-item__new__text')
    .addEventListener('keyup', (event) => {
        const {
            target: {
                value
            }
        } = event;
        document.getElementById('todo-item__new').disabled = !value;
    });


document.getElementById('todo-item__new')
    .addEventListener('click', () => {
        const text = document.getElementById('todo-item__new__text').value;
        Todo.add(text);
    });