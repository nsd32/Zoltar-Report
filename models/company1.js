module.exports = function(sequelize, DataTypes) {
	var Company = sequelize.define('Company', {
		company_name: {
			type: DataTypes.STRING,
			allowNull: false,
			len: [1]
		},
		account_number: {
			type: DataTypes.STRING,
			allowNull: false,
			len: [1]
		}
	});
	
	Company.associate = function(models) {
		Company.hasMany(models.Property, { 
			onDelete: 'cascade'
		});
		// Company.hasMany(models.Social, { 
		// 	onDelete: 'cascade'
		// });
		// Company.hasMany(models.Search_engine, { 
		// 	onDelete: 'cascade'
		// });
		// Company.hasMany(models.monthUsage, { 
		// 	onDelete: 'cascade'
		// });
		// Company.hasMany(models.traffic, { 
		// 	onDelete: 'cascade'
		// });

	};

	return Company;
};