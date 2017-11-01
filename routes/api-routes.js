// do we need two route files? route below is not an api route



module.exports = function(app) {
	app.get('/dashboard', function(req, res) {
		res.render('dashboard');
	})
};

module.exports = function(app) {
	app.get('/*', function(req, res) {
		res.render('index');
	})
};