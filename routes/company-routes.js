var db = require('../models');

module.exports = function(app) {
	app.get('/api/companies', function(req, res) {
		// Here we add an 'include' property to our options in our findAll query
		// We set the value to an array of the models we want to include in a left outer join
		// In this case, just db.Post
		db.Company.findAll({
			include: [db.Property]
		}).then(function(dbCompany) {
			res.json(dbCompany);
		});
	});

	app.get('/api/company/:id', function(req, res) {
		// Here we add an 'include' property to our options in our findOne query
		// We set the value to an array of the models we want to include in a left outer join
		// In this case, just db.Post
		db.Company.findOne({
			where: {
				id: req.params.id
			},
			include: [db.Property]
		}).then(function(dbCompany) {
			res.json(dbCompany);
		});
	});

	app.post('/api/company', function(req, res) {
		db.Company.create({
			company_name: req.body.company_name,
			account_number: req.body.account_number		
		}).then(function(dbCompany) {
			res.json(dbCompany);
		});
    });
};