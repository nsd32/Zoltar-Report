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
        goalCompletion: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isNumeric: true
			}
		},
		company_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isNumeric: true
			}
        },
        property_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isNumeric: true
			}
        },
        view_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isNumeric: true
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
			allowNull: false,
			validate: {
				
			}
        }
    });

    monthUsage.associate = function(models) {
		// We're saying that Social Data should belong to an Company, Property and View
		// Social Data can't be created without an Company, Property and View due to the foreign key constraint
		monthUsage.belongsTo(models.Company, {
			foreignKey: {
				allowNull: false
			}
        });
        monthUsage.belongsTo(models.Property, {
			foreignKey: {
				allowNull: false
			}
        });
        monthUsage.belongsTo(models.View, {
			foreignKey: {
				allowNull: false
			}
		});
    };

	return monthUsage;
};