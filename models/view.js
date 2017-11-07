module.exports = function(sequelize, DataTypes) {
	var View = sequelize.define('View', {
		view_name: {
			type: DataTypes.STRING,
			allowNull: false,
			len: [1]
		},
		ga_view_id: {
			type: DataTypes.STRING,
			allowNull: false,
			len: [1]
		},
		defaultView: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	});

	View.associate = function(models) {
		View.belongsTo(models.Property, {
			foreignKey: 'property_id', targetKey: 'id'
		});
	};

	View.associate = function(models) {

		// View.hasMany(models.Social, { 
		// 	onDelete: 'cascade'
		// });
		// View.hasMany(models.Search_engine, { 
		// 	onDelete: 'cascade'
		// });
		View.hasMany(models.monthUsage, { 
			onDelete: 'cascade'
		});
		// View.hasMany(models.traffic, { 
		// 	onDelete: 'cascade'
		// });
	};

	return View;
};