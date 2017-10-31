module.exports = function(sequelize, DataTypes) {
	var Search_Engine = sequelize.define('search_engine', {
 
        entrances: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isNumeric: true
			}
        },
        unique_pages: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isNumeric: true
			}
        },
        search_engine: {
			type: DataTypes.STRING(50),
			allowNull: false,
			validate: {
				isAlphaNumeric: true
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
    
    // Search_Engine.associate = function(models) {
	// 	// We're saying that Search_Engine Data should belong to an Company, Property and View
	// 	// Search_Engine Data can't be created without an Company, Property and View due to the foreign key constraint
	// 	Soc.belongsTo(models.companies, {
	// 		foreignKey: {
	// 			allowNull: false
	// 		}
    //     });
    //     Search_Engine.belongsTo(models.properties, {
	// 		foreignKey: {
	// 			allowNull: false
	// 		}
    //     });
    //     Search_Engine.belongsTo(models.views, {
	// 		foreignKey: {
	// 			allowNull: false
	// 		}
	// 	});
    // };
    
    return Search_Engine;
};