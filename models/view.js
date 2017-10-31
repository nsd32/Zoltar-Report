module.exports = function(sequelize, DataTypes) {
	var View = sequelize.define('View', {
		view_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			validate: {
				isNumeric: true
			}
		},
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
		property_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			validate: {
				isNumeric: true
			}
		},
		defaultView: {
			type: DataTypes.BOOLEAN,
			defaultValue: true

		}
	});

	View.associate = function(models) {
		// We're saying that Social Data should belong to an Company, Property and View
		// Social Data can't be created without an Company, Property and View due to the foreign key constraint
		View.belongsTo(models.Property, {
			foreignKey: {
				allowNull: false
			}
		});
		View.hasMany(models.Social, { 
			onDelete: 'cascade'
		});
		View.hasMany(models.Search_engine, { 
			onDelete: 'cascade'
		});
		View.hasMany(models.monthUsage, { 
			onDelete: 'cascade'
		});
		View.hasMany(models.traffic, { 
			onDelete: 'cascade'
		});
	};

	return View;
};