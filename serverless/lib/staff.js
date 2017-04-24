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
    const {orgUnitPath, thumbnailPhotoUrl, name, organizations} = user;
    const org = (orgUnitPath && orgUnitPath.includes('/')) ? orgUnitPath.split('/') : ['','',''];
    const photo = (thumbnailPhotoUrl) ? (thumbnailPhotoUrl.includes('private') ? null : thumbnailPhotoUrl) : null;
    return {
        name: (name && name.fullName) ? name.fullName : '',
        title: (organizations && organizations.length > 0 && organizations[0].title) ? organizations[0].title : '',
        photo: photo,
        office: org[1],
        team: org[2],
    }
}

function includedInSelection(userId, selectedStaffIds) {
    return selectedStaffIds.some(id => id === userId)
}
