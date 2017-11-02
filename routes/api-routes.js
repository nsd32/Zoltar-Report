// do we need two route files? route below is not an api route

module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render('index');
	});

	app.get('/dashboard', function(req, res) {
		res.render('dashboard');
	});

	app.get('/createCompany/new', function(req, res) {
		db.Author.findAll({
			include: [db.Post]
		}).then(function(dbAuthor) {
			res.json(dbAuthor);
		});
	});
	
	app.get('/*', function(req, res) {
		res.render('index');
	});
};