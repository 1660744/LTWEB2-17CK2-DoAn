const express = require('express');
require('express-async-errors');
// const session = require('express-session');
const passport = require('passport');
const path = require('path');
let flash = require('express-flash');
//const bcrypt = require('bcrypt');
const app = express();


app.use(express.static("public"));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({
    extended: true
}));
require('./middlewares/view.mdw')(app);
require('./middlewares/session.mdw')(app);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());




app.use('/', require('./routers/home.route'));
app.use('/writer', require('./routers/writer.route'));
app.use('/editor', require('./routers/editor.route'));
app.use('/account', require('./routers/user.route'));
app.use('/news', require('./routers/news.route'));
app.use('/admin', require('./routers/admin.route'));

app.use(function (req, res) {
    res.render('404', { layout: false });
});


app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).render('500', { layout: false });
})
const PORT = 3000;
app.listen(PORT, function () {
    console.log(`Server is running at http://localhost:${PORT}`);

})
