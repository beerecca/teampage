(function() {

function getUsers() {
    return fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:0747532699')
        .then(response => response.json())
        .catch(error => {
            throw new Error('API Error', error)
        });
}

function postUsers(users) {
    return fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:0747532699', {
        method: 'POST',
        body: JSON.stringify({users: users})
    })
        .then(response => response.json())
        .catch(error => {
            throw new Error('API Error', error)
        });
}

function createUserList(users) {
    console.log('createUserList', users);
    const userListDiv = document.getElementById('userList');
    const fragment = document.createDocumentFragment();

    users.forEach(user => {
        const div = document.createElement('div');
        div.setAttribute('class', 'checkbox');

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = user.id;
        input.setAttribute('class', 'user-checkbox');

        const label = document.createElement('label');
        label.setAttribute('for', user.id);
        const text = document.createTextNode(user.name);

        label.appendChild(input);
        label.appendChild(text);
        div.appendChild(label);
        fragment.appendChild(div);
    });

    userListDiv.appendChild(fragment);
}

function selectAll(checkboxes) {
    const allCheckbox = document.getElementById('all');
    allCheckbox.addEventListener('click', function() {
        Array.from(checkboxes).forEach(checkbox => {
            checkbox.checked = allCheckbox.checked;
        });
    })
}

function postSelectedUsers(checkboxes) {
    document.getElementById('submit-user-list').addEventListener('click', function(e) {
        e.preventDefault();
        const users = Array.from(checkboxes).reduce((arr, checkbox) => {
            if (checkbox.checked) {
                return arr.concat(checkbox.id);
            }
            return arr;
        }, []);
        console.log('users', users);
        postUsers(users);
    })
}

function getPreview() {
    return fetch('teampage.html')
        .then(response => response.text())
        .catch(error => {
            throw new Error('API Error', error)
        });
}

function showPreview(html) {
    document.getElementById('staffPreview').innerHTML = html;
}

getUsers().then(users => createUserList(users));

const checkboxes = document.getElementsByClassName('user-checkbox');
selectAll(checkboxes);
postSelectedUsers(checkboxes);

getPreview().then(html => showPreview(html));

})();
