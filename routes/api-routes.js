// do we need two route files? route below is not an api route

var db = require('../models');

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

	app.get('/apitest', function(req, res) {
		res.render('apiTest');
	});

	app.post('/api/monthly', function(req, res) {
		console.log(req.body);

		db.test.create({

	      sessions: req.body.sessions,
	      pageviews: req.body.pageviews,
	      users: req.body.users,
	      pageviewsBySession: req.body.pageviewsBySession,
	      bounceRate: req.body.bounceRate,
	      exitRate: req.body.exitRate,
	      newSession: req.body.newSession,
	      avgSession: req.body.avgSession,
	      goalCompletion: req.body.goalCompletion,
	      view_id: req.body.view_id,
	      start_date: req.body.start_date,
	      end_date: req.body.end_date
		    

		}).then(function(dbMonthly) {
			res.json(dbMonthly);
		})
	})
	
	app.get('/*', function(req, res) {
		res.render('index');
	});

};