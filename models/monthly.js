module.exports = function(sequelize, DataTypes) {
	var monthUsage = sequelize.define('monthUsage', {
        sessions: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isNumeric: true
			}
        },
        pageviews: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isNumeric: true
			}
        },
        users: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isNumeric: true
			}
        },
        pageviewsBySession: {
			type: DataTypes.DECIMAL(2,2),
			allowNull: false,
			validate: {
				isDecimal: true
			}
        },
        exitRate: {
			type: DataTypes.DECIMAL(2,2),
			allowNull: false,
			validate: {
				isDecimal: true
			}
        },
        bounceRate: {
			type: DataTypes.DECIMAL(2,2),
			allowNull: false,
			validate: {
				isDecimal: true
			}
        },
        newSession: {
			type: DataTypes.DECIMAL(2,2),
			allowNull: false,
			validate: {
				isDecimal: true
			}
        },
        avgSession: {
			type: DataTypes.TIME,
			allowNull: false,
			validate: {
	
			}
        },
        channel: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				
			}
		},
        start_date: {
			type: DataTypes.DATE,
			allowNull: false,
			validate: {
				
			}
        },
        end_date: {
			type: DataTypes.DATE,
			allowNull: true,
			validate: {
				
			}
        }
    });

    monthUsage.associate = function(models) {
        monthUsage.belongsTo(models.View, {
			foreignKey: {
				allowNull: true
			}
		});
    };

	return monthUsage;
};
