export default class Users {

    constructor({ google, db }) {
        this.google = google;
        this.db = db;
    }

    run(event, context, callback) {

        Promise.all([ this.google.getUsers(), this.db.getSelectedUsers() ])
            .then(results => {

                const users = results[0];
                const selectedUsers = results[1];

                return users.map(user => ({
                    id: user.id,
                    name: user.name.fullName,
                    isSelected: selectedUsers.indexOf(user.id) !== -1
                }));
            })
            .then(summarisedUsers => {
                callback(null, summarisedUsers);
            })
            .catch(err => {
                callback(err);
            });
    }
}
