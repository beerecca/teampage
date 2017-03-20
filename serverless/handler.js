import DB from './lib/services/db';
import Google from './lib/services/google';
import HtmlGenerator from './lib/services/html-generator';
import Upload from './lib/services/upload';

import Staff from './lib/staff';
import Users from './lib/users';

export function _staff(event, context, callback) {
    const handler = new Staff({ google: new Google(), db: new DB(), htmlGenerator: new HtmlGenerator(), upload: new Upload() });
    handler.run(event, context, callback);
}

export function _users(event, context, callback) {
    const handler = new Users({ google: new Google(), db: new DB() });
    handler.run(event, context, callback);
}
