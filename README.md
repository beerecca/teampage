# teampage

This project allows you to have the team page on your site automatically update when a new staff member joins your company. It uses the [google directory api](https://developers.google.com/admin-sdk/directory) to do so. 


## backend
To deploy the backend, you will need an admin login to your Google Apps account. You will need to create a new project in the [google console](https://console.cloud.google.com) with a service account that has domain-wide delegation enabled and the OAuth 2 scope: 'https://www.googleapis.com/auth/admin.directory.user.readonly' enabled. 

Save the following environment variables in a file called secrets.dev.yml:
 - GOOGLE_CLIENT_EMAIL (this is the service account id, ending in iam.gserviceaccount.com)
 - GOOGLE_ADMIN_EMAIL (the email address of an admin user at your company) 
 - GOOGLE_PRIVATE_KEY (created when you create your service account)
 - BUCKET_NAME (name of the bucket serverless will create to store your html)
 - SETTINGS_TABLE (name of the dynamodb table serverless will create to store your selected users)
 - DOMAIN (your google apps domain)

You can also use the [apis explorer](https://developers.google.com/apis-explorer/#p/admin/directory_v1/directory.users.list) to test the directory api.

You can then deploy the backend using [serverless](https://serverless.com/).
 
```cd serverless```

```npm install```  
 
```npm install -g serverless```

```sls deploy --stage dev```

You can also encrypt your secrets file which will allow you to commit it to source control:

```sls encrypt --stage dev --password '{your secure password}'```

## frontend
The frontend folder contains an admin app which can be used to filter the google api results to only display the users you wish to show on your website. The entry point is index.html. You will need to add a config.js file that has the following: 
```const CONFIG = {
getUsers: '<your users endpoint, created and returned by your serverless deploy>',
postStaff: '<your staff endpoint, created and returned by your serverless deploy>',
getHtml: '<your bucket url>/teampage.html'};
```

You will want to copy all the static files in this folder to your intranet or another location where your staff can administer the team page.

It also contains index.js and style.css which are the files that need to be included on your team page on your website.

For all files in the frontend you will need to fork and personalise to your website as you desire.
