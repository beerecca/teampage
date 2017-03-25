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
            console.log('users', users);
            postUsers(users).then(() => {
                window.alert('Successfully submitted!');
                location.reload(true);
            });
        })
    }


    //
    // GET PREVIEW HTML AND DISPLAY FILTERS
    //

    function getPreview() {
        return fetch(CONFIG.getHtml)
            .then(response => response.text())
            .catch(error => {
                throw new Error('API Error', error)
            });
    }

    function unique(array){
        return array.filter(function(el, index, arr) {
            return index === arr.indexOf(el);
        });
    }

    function createFilters(arr, container, type) {
        arr.forEach(item => {
            const filter = document.createElement('span');
            filter.setAttribute('class', 'tp-filters__filter');
            filter.setAttribute('data-filter', item);
            filter.setAttribute('data-filter-type', type);
            filter.textContent = item;
            container.appendChild(filter);
        });
    }

    function showPreview(html) {
        const teamPage = document.getElementsByClassName('team-page')[0];
        const container = document.createElement('div');
        container.setAttribute('class', 'tp-staff__container');
        container.innerHTML = html;
        teamPage.appendChild(container);

        const officeFilters = document.createElement('div');
        officeFilters.setAttribute('class', 'tp-filters--offices');

        const teamFilters = document.createElement('div');
        teamFilters.setAttribute('class', 'tp-filters--teams');

        const staff = [].slice.call(document.getElementsByClassName('tp-staff'));
        const offices = unique(staff.map(s => s.getAttribute('data-office')));
        const teams = unique(staff.map(s => s.getAttribute('data-team')));

        createFilters(offices, officeFilters, 'office');
        createFilters(teams, teamFilters, 'team');

        teamPage.insertBefore(officeFilters, container);
        teamPage.insertBefore(teamFilters, container);

        const p = document.createElement('p');
        p.setAttribute('class', 'tp-staff__empty');
        p.style.display = 'none';
        p.textContent = 'No team members found for your search';
        teamPage.insertBefore(p, container);

        activateFilter('Amsterdam', 'office');
        activateFilter('Marketing', 'team'); //TODO: change this to Management
    }


    //
    // MAKE FILTERS INTERACTIVE
    //

    const activeFilters = {
        office: null,
        team: null
    };

    function initFilters() {
        const filters = [].slice.call(document.getElementsByClassName('tp-filters__filter'));
        filters.forEach((filter) => {
            filter.addEventListener('click', () => {
                const filterName = filter.getAttribute('data-filter');
                const filterType = filter.getAttribute('data-filter-type');
                activateFilter(filterName, filterType);
            })
        });
    }

    function activateFilter(name, type) {
        activeFilters[type] = name;

        const filters = [].slice.call(document.getElementsByClassName('tp-filters__filter'));
        filters.forEach(f => {
            if (f.getAttribute('data-filter-type') === type && f.getAttribute('data-filter') === activeFilters[type]) {
                f.classList.add('tp-filters__filter--active');
            } else if (f.getAttribute('data-filter-type') === type) {
                f.classList.remove('tp-filters__filter--active');
            }
        });

        const staff = [].slice.call(document.getElementsByClassName('tp-staff'));
        let noStaff = true;
        staff.forEach(s => {
            if (s.getAttribute('data-office') === activeFilters.office && s.getAttribute('data-team') === activeFilters.team) {
                s.style.display = 'block';
                noStaff = false;
            } else {
                s.style.display = 'none';
            }
        });

        const emptyEl = document.getElementsByClassName('tp-staff__empty')[0];
        if (noStaff) {
            emptyEl.style.display = 'block';
        } else {
            emptyEl.style.display = 'none';
        }
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

    getPreview().then(html => {
        showPreview(html);
        initFilters();
    });

})();
