(function() {
const returnedFromLambdaGet = {
    users: [{
        "id": "106058633312625095450",
        "name": "Rafael Dohms"
    }, {
        "id": "107797129014721380856",
        "name": "Rebecca Hill"
    }]
};

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
        body: users
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
        div.setAttribute('class', 'user');

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = user.id;
        input.setAttribute('class', 'user-checkbox');

        const label = document.createElement('label');
        label.setAttribute('for', user.id);
        const text = document.createTextNode(user.name);

        label.appendChild(text);
        div.appendChild(input);
        div.appendChild(label);
        fragment.appendChild(div);
    });

    userListDiv.appendChild(fragment);
}

function postSelectedUsers() {
    const checkboxes = document.getElementsByClassName('user-checkbox');
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

getUsers().then(users => createUserList(users));
postSelectedUsers();

})();
