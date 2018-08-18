if (process.env.NODE_ENV === 'production') {
    module.exports = require('./configureStore.prod').configureStore
} else {
    module.exports = require('./configureStore.dev').configureStore
}