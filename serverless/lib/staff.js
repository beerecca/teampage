export default class Staff {

    constructor({ google, htmlGenerator, upload }) {
        this.google = google;
        this.htmlGenerator = htmlGenerator;
        this.upload = upload;
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
                this.upload.upload(html);

                callback(null, html);
            })
            .catch(err => {
                console.log('err', err);
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
