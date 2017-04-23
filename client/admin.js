(function() {

    //
    // GET USER LIST AND LOAD ONTO PAGE
    //

    function getUsers() {
        return fetch(CONFIG.getUsers)
            .then(response => response.json())
            .catch(error => {
                throw new Error('API Error', error)
            });
    }

    function createUserList(users) {
        const userListDiv = document.getElementById('userList');
        const fragment = document.createDocumentFragment();

        users.forEach(user => {
            const div = document.createElement('div');
            div.setAttribute('class', 'checkbox');

            const input = document.createElement('input');
            input.type = 'checkbox';
            input.id = user.id;
            input.setAttribute('class', 'user-checkbox');
            if (user.isSelected) {
                input.setAttribute('checked', 'checked');
            }

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


    //
    // SELECT USERS AND POST TO API
    //

    function selectAll(checkboxes) {
        const allCheckbox = document.getElementById('all');
        allCheckbox.addEventListener('click', function() {
            Array.from(checkboxes).forEach(checkbox => {
                checkbox.checked = allCheckbox.checked;
            });
        })
    }

    function postUsers(users) {
        return fetch(CONFIG.postStaff, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({users: users})
        })
            .then(response => response.json())
            .catch(error => {
                throw new Error('API Error', error)
            });
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

            postUsers(users)
                .then(() => {
                    window.alert('Successfully submitted!');
                    location.reload(true);
                })
                .catch((e) => {
                    window.alert('An error has occurred.');
                    console.log('Error', e);
                });
        })
    }

    //
    // RUN ALL THE THINGS
    //

    getUsers().then(users =>
        createUserList(users)
    );

    const checkboxes = document.getElementsByClassName('user-checkbox');
    selectAll(checkboxes);
    postSelectedUsers(checkboxes);

})();