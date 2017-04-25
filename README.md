# teampage

This project allows you to have the team page on your site automatically update when a new staff member joins your company. It uses the [google directory api](https://developers.google.com/admin-sdk/directory) to do so. 


## backend
To deploy the backend, you will need to create a new project in the [google console](https://console.cloud.google.com) with a service account that has domain-wide delegation enabled and the OAuth 2 scope: 'https://www.googleapis.com/auth/admin.directory.user.readonly' enabled (this has to be done by an admin). 

Save the following environment variables in a file called secrets.dev.yml:
 - GOOGLE_CLIENT_EMAIL (this is the service account id, ending in iam.gserviceaccount.com)
 - GOOGLE_ADMIN_EMAIL (the email address of an admin user at your company) 
 - GOOGLE_PRIVATE_KEY (created when you create your service account)
 
 You will also need to change the provider.environment.BUCKET_NAME variable in the serverless.yml file as this is globally unique. And lastly the domain parameter in the google.js file (I do plan to pull these out into environment variables at some point!).

You can also use the [apis explorer](https://developers.google.com/apis-explorer/#p/admin/directory_v1/directory.users.list) to test the directory api.

You can then deploy the backend using [serverless](https://serverless.com/).
 
```cd serverless```

```npm install```  
 
```npm install -g serverless```

```sls deploy --stage dev```

##frontend
The frontend folder contains an admin app which can be used to filter the google api results to only display the users you wish to show on your website. The entry point is index.html. You will need to add a config.js file that has the following: 
```const CONFIG = {
getUsers: '<your users endpoint, created and returned by your serverless deploy>',
postStaff: '<your staff endpoint, created and returned by your serverless deploy>',
getHtml: '<your bucket url>/teampage.html'};
```

You will want to copy all the static files in this folder to your intranet or another location where your staff can administer the team page.

It also contains index.js and style.css which are the files that need to be included on your team page on your website.
