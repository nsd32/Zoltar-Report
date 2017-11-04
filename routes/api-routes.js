var db = require('../models');
var Sequelize = require('sequelize');
var company = db.Company;
var property = db.Property;
var view = db.View;
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];

if (config.use_env_variable) {
	var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
	var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

module.exports = function(app) {
	app.get('/', function(req, res) {
			res.render('index',hbsObject);
		});

		
		
		app.get('/dashboard', function(req, res) {		
			company.findAll({
				include: [
					{
						model: property, 
						include: [
							{ 
							model:view
							}
						]  
					}
				]
			}).then(function(allCompany) {
				
				var hbsObject = {
					company: allCompany
				};
				// console.log(allCompany[0].dataValues.Properties[0].dataValues.Views[0].dataValues.view_name);
				res.render('dashboard', hbsObject);
				console.log('Properties: ', JSON.stringify(hbsObject, null, 2));
			});
	});

	app.get('/company', function(req, res) {
		company.findAll({
			include: [property]		
		}).then(function(dbCompany) {
			res.json(dbCompany);
		});
	});


	app.post('/company/new', function(req, res) {

		console.log(req.body.company_name);
		console.log(req.body.account_number);
		console.log(req.body.property_name);
		console.log(req.body.tracking_id);
		console.log(req.body.view_name);
		console.log(req.body.ga_view_id);

		return db.sequelize.transaction(function (t) {	
			  // chain all your queries here. make sure you return them.
			  	return company.create({
					company_name: req.body.company_name,
					account_number: req.body.account_number	
			  	}, {transaction: t}).then(function (dbCompany) {
					console.log('Company Created');
				return property.create({
					property_name: req.body.property_name,
					tracking_id: req.body.tracking_id,	
					CompanyId: dbCompany.dataValues.id
				}, {transaction: t}).then(function (dbProperty) {
					console.log('Property Created');
				return view.create({
					view_name: req.body.view_name,
					ga_view_id: req.body.ga_view_id,	
					PropertyId: dbProperty.dataValues.id,
					CompanyId: dbCompany.dataValues.id
				}, {transaction: t});
			});
			});
			
			}).then(function (result) {
				console.log('View Created');
				// Transaction has been committed
				// result is whatever the result of the promise chain returned to the transaction callback
			}).catch(function (err) {
				// Transaction has been rolled back
				// err is whatever rejected the promise chain returned to the transaction callback
			});
		});





		// company.create({
		// 	company_name: req.body.company_name,
		// 	account_number: req.body.account_number		
		// }).then(function(dbCompany) {
		// 	res.json(dbCompany);
		// 		console.log('Company created');
		// 		console.log('Company ID: ', dbCompany.dataValues.id);
		// 	property.create({
		// 		property_name: req.body.property_name,
		// 		tracking_id: req.body.tracking_id,	
		// 		CompanyId: dbCompany.dataValues.id
			
		// 	}).then(function(dbProperty) {
		// 		res.json(dbProperty);
		// 			console.log('Property created');
		// 			console.log(dbProperty);
		// 			console.log('Property ID: ', dbProperty.dataValues.id);
		// 		view.create({
		// 			view_name: req.body.view_name,
		// 			ga_view_id: req.body.ga_view_id,	
		// 			PropertyId: dbProperty.dataValues.id
		// 		});
		// 	});
		// });
			
	// });

	// app.post('/property/new', function(req, res) {
	// 	property.create({
	// 		property_name: req.body.property_name,
	// 		tracking_id: req.body.tracking_id,	
	// 		CompanyId: dbcompany[0].id
	// 	}).then(function(dbProperty) {
	// 		res.json(dbProperty);
	// 	});
	// });

	// app.post('/view/new', function(req, res) {
	// 	property.create({
	// 		view_name: req.body.view_name,
	// 		ga_view_id: req.body.ga_view_id,	
	// 		PropertyId: dbProperty.id
	// 	}).then(function(dbView) {
	// 		res.json(dbView);
	// 	});
	// });



	app.get('/*', function(req, res) {
		res.render('index');
	});
};

// return sequelize.transaction(function (t) {
	
// 	  // chain all your queries here. make sure you return them.
// 	  return db.Company.create({
// 		company_name: req.body.company_name,
// 		account_number: req.body.account_number	
// 	  }, {transaction: t})
// 	  .then(function (user) {
// 		return db.Property.create({
// 			property_name: req.body.property_name,
// 			tracking_id: req.bosy.tracking_id
// 		}, {transaction: t});
// 	  });
	
// 	}).then(function (res) {
// 	  // Transaction has been committed
// 	  // result is whatever the result of the promise chain returned to the transaction callback
// 	}).catch(function (err) {
// 	  // Transaction has been rolled back
// 	  // err is whatever rejected the promise chain returned to the transaction callback
// 	});