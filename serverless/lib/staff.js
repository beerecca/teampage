export default class Staff {

    constructor({ google, htmlGenerator, upload, db}) {
        this.google = google;
        this.htmlGenerator = htmlGenerator;
        this.upload = upload;
        this.db = db;
        this.table = process.env.SETTINGS_TABLE;
    }

    run(event, context, callback) {
        const selectedStaffIds = event.body.users;

        this.google.getUsers() 
            .then(users => {
                return users
                    .filter(user => includedInSelection(user.id, selectedStaffIds))
                    .map(user => createStaff(user));
            })
            .then(values => {
                const html = this.htmlGenerator.generate(values);
                return this.upload.upload(html);
            })
            .then(result => {
                return this.db.setSelectedUsers(selectedStaffIds);
            })
            .then(() => {
                callback(null, 'success');
            })
            .catch(err => {
                callback(err);
            });
    }
}

function createStaff(user) {
    const org = user.orgUnitPath.split('/');
    return {
        name: user.name.fullName,
        title: user.organizations[0].title,
        photo: user.thumbnailPhotoUrl,
        office: org[1],
        team: org[2],
    }
}

function includedInSelection(userId, selectedStaffIds) {
    return selectedStaffIds.some(id => id === userId)
}
