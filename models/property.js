module.exports = function(sequelize, DataTypes) {
	var Property = sequelize.define('property', {
		property_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			validate: {
				isNumeric: true
			}
		},
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
		company_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			validate: {
				isNumeric: true
			}
		},
		defaultProperty: {
			type: DataTypes.BOOLEAN,
			defaultValue: true

		}
	});
	return Property;
};