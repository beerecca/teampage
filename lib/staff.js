export default class Staff {
    
    constructor({ google }) {
        this.google = google;
    }

    run(event, context, callback) {
        callback(null, 'success');
    }

}
