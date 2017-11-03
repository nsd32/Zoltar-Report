var Company = require('./Company');

module.exports = function(sequelize, DataTypes) {
	var Property = sequelize.define('Property', {
		property_name: {
			type: DataTypes.STRING,
			allowNull: false,
			len: [1]
		},
		tracking_id: {
			type: DataTypes.STRING,
			allowNull: false,
			len: [1]
		},
		defaultProperty: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	});

	Property.associate = function(models) {
		Property.belongsTo(models.Company, {
			foreignKey: 'company_id', targetKey: 'id'
		});
	};

	Property.associate = function(models) {
		Property.hasMany(models.View, { 
			onDelete: 'cascade'
		});
		Property.hasMany(models.Social, { 
			onDelete: 'cascade'
		});
		Property.hasMany(models.Search_engine, { 
			onDelete: 'cascade'
		});
		Property.hasMany(models.monthUsage, { 
			onDelete: 'cascade'
		});
		Property.hasMany(models.traffic, { 
			onDelete: 'cascade'
		});
	};
	return Property;
};

