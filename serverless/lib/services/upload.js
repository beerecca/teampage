const aws = require('aws-sdk');

class Upload {

    upload(html) {
        return new Promise((resolve, reject) => {
            const s3 = new aws.S3();
            s3.upload({
                Bucket: process.env.BUCKET_NAME,
                Key: 'teampage.html',
                Body: html,
                ACL: 'public-read',
                ContentType: 'text/html',
            }, (err, res) => {
                if (err) reject(new Error(err));
                resolve(res);
            })
        });
    }
}

export default Upload;
