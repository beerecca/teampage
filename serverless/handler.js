import Google from './lib/google';

import Staff from './lib/staff';
import Users from './lib/users';

export function _staff(event, context, callback) {
    const handler = new Staff({ google: new Google() });
    handler.run(event, context, callback);
}

export function _users(event, context, callback) {
    const handler = new Users({ google: new Google() });
    handler.run(event, context, callback);
}
