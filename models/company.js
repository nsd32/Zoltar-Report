module.exports = function(sequelize, DataTypes) {
	var Company = sequelize.define('company', {
		company_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			validate: {
				len: [1]
			}
		},
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
	return Company;
};