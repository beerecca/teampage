export default class Users {
    
    constructor({ google }) {
        this.google = google;
    }

    run(event, context, callback) {
        callback(null, 'success');
    }

}
