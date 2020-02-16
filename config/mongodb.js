global.SALT_KEY = 'f58877-ji839-12jidh-iej982uji08';
let port = process.env.MONGO_PORT || 27017;
let connection = 'mongodb://marcos:hjkaskhshuduqwyoueqy-17829873qwjkaksyd-iqiwuey8137d826@ds121135.mlab.com:21135/marketing-service'

const options = {
    "useNewUrlParser": true,
    useUnifiedTopology: true,
    useCreateIndex: true,
};

module.exports = () => ({
    connection,
    options
});
