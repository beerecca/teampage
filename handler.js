import Google from './lib/google';

import Staff from './lib/staff';
import Users from './lib/users';

export function _staff(event, context, callback) {
    const handler = new Staff({ Google });
    handler.run(event, context, callback);
}

export function _users(event, context, callback) {
    const handler = new Users({ Google });
    handler.run(event, context, callback);
}
