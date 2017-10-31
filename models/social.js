module.exports = function(sequelize, DataTypes) {
	var Social = sequelize.define('social', {
        entrances: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isNumeric: true
			}
        },
        bounces: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isNumeric: true
			}
        },
        bounce_rate: {
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
        pageviews_session: {
			type: DataTypes.DECIMAL(2,2),
			allowNull: false,
			validate: {
				isDecimal: true
			}
        },
        social_source: {
			type: DataTypes.STRING(50),
			allowNull: false,
			validate: {
				
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
    
    // Social.associate = function(models) {
	// 	// We're saying that Social Data should belong to an Company, Property and View
	// 	// Social Data can't be created without an Company, Property and View due to the foreign key constraint
	// 	Social.belongsTo(models.companies, {
	// 		foreignKey: {
	// 			allowNull: false
	// 		}
    //     });
    //     Social.belongsTo(models.properties, {
	// 		foreignKey: {
	// 			allowNull: false
	// 		}
    //     });
    //     Social.belongsTo(models.views, {
	// 		foreignKey: {
	// 			allowNull: false
	// 		}
	// 	});
    // };
    
    return Social;
};