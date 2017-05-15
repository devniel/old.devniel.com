var Views = require("./../controllers/Views");
var Auth = require("./../controllers/Auth");

module.exports = function(app){

    app.get('/auth/logout', Auth.braph_logout);
    app.get('/auth/oauth/braph', Auth.braph_login);
    app.get('/temp/:token', Views.temp);

    app.get("*", Views.render);

}
