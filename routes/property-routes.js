// Requiring our models
var db = require('../models');

// Routes
// =============================================================
module.exports = function(app) {

	// GET route for getting all of the posts
	app.get('/api/property', function(req, res) {
		var query = {};
		if (req.query.company_id) {
			query.CompanyId = req.query.company_id;
		}
		// Here we add an 'include' property to our options in our findAll query
		// We set the value to an array of the models we want to include in a left outer join
		// In this case, just db.Author
		db.Property.findAll({
			where: query,
			include: [db.Company]
		}).then(function(dbProperty) {
			res.json(dbProperty);
		});
	});

	// Get rotue for retrieving a single post
	app.get('/api/property/:id', function(req, res) {
		// Here we add an 'include' property to our options in our findOne query
		// We set the value to an array of the models we want to include in a left outer join
		// In this case, just db.Author
		db.Property.findOne({
			where: {
				id: req.params.id
			},
			include: [db.Company]
		}).then(function(dbProperty) {
			res.json(dbProperty);
		});
	});

	// POST route for saving a new post
	app.post('/api/property', function(req, res) {
		db.Property.create({
			property_name: req.body.property_name,
			tracking_id: req.body.tracking_id,	
		}).then(function(dbProperty) {
			res.json(dbProperty);
		});
	});

	// PUT route for updating posts
	app.put('/api/property', function(req, res) {
		db.Property.update({
            property_name: req.body.property_name,
            tracking_id: req.body.tracking_id
        },
        {
            where: {
                id: req.body.id
            }
        }).then(function(dbProperty) {
            res.json(dbProperty);
        });
	});
};