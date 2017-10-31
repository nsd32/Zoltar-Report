module.exports = function(sequelize, DataTypes) {
	var Post = sequelize.define('Post', {
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
	return Post;
};