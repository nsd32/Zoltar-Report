var db = require('../models');

var company = db.Company;
var property = db.Property;
var monthlyUsage = db.MonthUsage;
var view = db.View;


module.exports = function(app) {
	app.get('/', function(req, res) {
			res.render('index');
		});

	app.get('/company', function(req, res) {
		if(req.params.company) {		
			company.findAll({
				where: {
					company_name: req.params.company
				}
			}).then(function(companyInfo) {
				res.json(companyInfo);
			});
		}
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
			// console.log('Properties: ', JSON.stringify(hbsObject, null, 2));
		});
	});

	app.get('/customer', function(req, res) {
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
		}).then(function(dbCompany) {

			var hbsObject = {
				companyInfo: dbCompany
			};

			res.render('customer', hbsObject);
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
				}).then(function(dbCompany) {

					var hbsObject = {
						companyInfo: dbCompany
					};
					res.render('customer', hbsObject);
					
				});
				// Transaction has been committed
				// result is whatever the result of the promise chain returned to the transaction callback
			}).catch(function (err) {
				// Transaction has been rolled back
				// err is whatever rejected the promise chain returned to the transaction callback
			});
		});

		app.post('/view/edit', function(req, res) {
			console.log('View Update: ', req.body);
			view.update({
				view_name: req.body.view_name,
				ga_view_id:req.body.ga_view_id
			},
			{
				where: {id:req.body.id}
			});
		});
		
		app.post('/company/delete', function(req, res) {
			console.log('Delete Body: ',req.body);
			console.log('Delete ID: ', req.body.id);
			company.destroy({
				where: {
					id: req.body.id
				}
			
			}).then(function (result) {
				console.log('View Created');
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
				}).then(function(dbCompany) {

					var hbsObject = {
						companyInfo: dbCompany
					};
					res.render('customer', hbsObject);
					
				});
			});
		});


		// app.post('/monthUsage/new/:id', function(req, res) {
			// 	return db.sequelize.transaction(function (t) {	
		// 		// chain all your queries here. make sure you return them.
		// 		return view.findAll({
		// 			where: {
		// 				ga_view_id: req.params.ga_view_id	
		// 			}
		// 		}, {transaction: t}).then(function (dbView) {
		// 			  console.log('Company Created');
		// 		return monthlyUsage.create({
		// 				sessions:req.body.sessions,
		// 				pageviews:req.body.pageviews,
		// 				users:req.body.users,
		// 				pageviewsBySession: req.body.pageviewsPerSession,
		// 				exitRate:req.body.exitRate,
		// 				bounceRate:req.body.bounceRate,
		// 				newSession:req.body.newSession,
		// 				avgSession:req.body.avgSession,
		// 				channel:req.body.channel,
		// 				start_date:req.body.start_date,
		// 				end_date:req.body.end_date,
		// 				ViewId: dbView.id
		// 			}, {transaction: t});		
		// 	  	});
			  
		// 	}).then(function (result) {
		// 		  console.log('View Created');
		// 		  // Transaction has been committed
		// 		  // result is whatever the result of the promise chain returned to the transaction callback
		// 	  }).catch(function (err) {
		// 		  // Transaction has been rolled back
		// 		  // err is whatever rejected the promise chain returned to the transaction callback
		// 	  });
		//   });	

			
	// app.get('/*', function(req, res) {
	// 	res.render('index');
	// });
};
