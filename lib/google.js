class Google {

    constructor() {
        this.authorized = false
    }
    
    login() {
        //jwt stuff
        return new Promise((resolved, reject) => {

            //jwt stuff + authorize.
            //if success resolve();
            //if fail reject();
        
            this.authorized = true
        })
    }

    getUsers() {
        if (!this.authorized) this.login();
        return new Promise((resolve, reject) => {
        
        })
    }

}

export default Google;
