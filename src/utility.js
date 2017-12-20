/*!
 * Centralio
 * Copyright(c) 2016-2017 Javanile.org
 * MIT Licensed
 */

module.exports = {
    registerStateCallback: function (stack, state, callback) {
        if (typeof state === 'function' && typeof callback === 'undefined') {
            callback = state;
            state = '*';
        }
        if (typeof stack[state] === 'undefined') {
            stack[state] = [];
        }
        stack[state].push(callback);
    }
};
