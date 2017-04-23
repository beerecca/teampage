(function() {

    //
    // GET PREVIEW HTML
    //

    function getPreview() {
        return fetch(CONFIG.getHtml)
            .then(response => response.text())
            .catch(error => {
                throw new Error('API Error', error)
            });
    }


    //
    // DISPLAY FILTERS
    //

    function uniqueAndSort(array){
        return array.filter(function(el, index, arr) {
            return index === arr.indexOf(el);
        }).sort();
    }

    function createFilters(arr, container, type) {
        arr.forEach(item => {
            const filter = document.createElement('p');
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
        const offices = uniqueAndSort(staff.map(s => s.getAttribute('data-office')));
        const teams = uniqueAndSort(staff.map(s => s.getAttribute('data-team')));
        teams.unshift('All');

        createFilters(offices, officeFilters, 'office');
        createFilters(teams, teamFilters, 'team');

        teamPage.insertBefore(officeFilters, container);
        teamPage.insertBefore(teamFilters, container);

        const p = document.createElement('p');
        p.setAttribute('class', 'tp-staff__empty');
        p.style.display = 'none';
        p.textContent = 'No team members found for these filters';
        teamPage.insertBefore(p, container);

        activateFilter('Amsterdam', 'office');
        activateFilter('All', 'team');
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
                f.className += " tp-filters__filter--active";
            } else if (f.getAttribute('data-filter-type') === type) {
                f.className = f.className.replace(" tp-filters__filter--active", "");
            }
        });

        const staff = [].slice.call(document.getElementsByClassName('tp-staff'));
        let noStaff = true;
        function shouldShow(s) {
            return s.getAttribute('data-office') === activeFilters.office && 
            (s.getAttribute('data-team') === activeFilters.team ||
            activeFilters.team === 'All');
        }
        staff.forEach(s => {
            if (shouldShow(s)) {
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

    getPreview().then(html => {
        showPreview(html);
        initFilters();
    });

})();
