

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
