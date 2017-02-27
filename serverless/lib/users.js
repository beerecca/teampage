export default class Users {
    
    constructor({ google }) {
        this.google = google;
    }

    run(event, context, callback) {

        this.google.getUsers()
            .then(users => {
                return users.map(user => ({
                    id: user.id,
                    name: user.name.fullName
                }));
            })
            .then(userSummaries => {
                callback(null, userSummaries);
            })
            .catch(err => {
                callback(err);
            });
    }
}
