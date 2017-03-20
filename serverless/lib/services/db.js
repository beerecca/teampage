import AWS from 'aws-sdk';

class DB {

    constructor() {
        this.table = process.env.SETTINGS_TABLE;
        this.db = new AWS.DynamoDB.DocumentClient();
    }

    getSelectedUsers() {
        return new Promise((resolve, reject) => {
            this.db.get({
                TableName: this.table,
                Key: {
                    key: 'selectedUsers'
                }
            }).promise()
            .then(result => { resolve(result.Item.value) })
            .catch(err => { reject(new Error(err)) });
        });
    }

    setSelectedUsers(selectedUsers) {
        return new Promise((resolve, reject) => {
            this.db.update({
                TableName: this.table,
                Key: {
                    key: 'selectedUsers'
                },
                AttributeUpdates: {
                    value: {
                        Action: 'PUT',
                        Value: selectedUsers
                    }
                }
            }).promise()
            .then(() => { resolve(selectedUsers) })
            .catch(err => { reject(new Error(err)) });
        })
    }
}

export default DB;
