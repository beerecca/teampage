const googleapis = require('googleapis');

class Google {

    constructor() {
        this.authorized = false;
        this.jwt = null;
    }

    login() {
        if (this.authorized) return Promise.resolve();

        this.jwt = new googleapis.auth.JWT(
            process.env.GOOGLE_CLIENT_EMAIL,
            null,
            process.env.GOOGLE_PRIVATE_KEY,
            ['https://www.googleapis.com/auth/admin.directory.user.readonly'],
            process.env.GOOGLE_ADMIN_EMAIL
        );

        return new Promise((resolve, reject) => {
            this.jwt.authorize(err => {
                if (err) reject(new Error(err));
                this.authorized = true;
                resolve();
            });
        });
    }

    getUsers() {
        return this.login()
            .then(() => {
                return new Promise((resolve, reject) => {
                    googleapis.admin('directory_v1').users.list({
                        domain: 'usabilla.com',
                        viewType: 'domain_public',
                        auth: this.jwt
                    }, function (err, data) {
                        if (err) reject(new Error(err));
                        resolve(data.users);
                    });
                });
            });
    }
}

export default Google;
