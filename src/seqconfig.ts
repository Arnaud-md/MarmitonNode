import { Sequelize } from "sequelize";
import { DataTypes } from "sequelize";


export const sequelize = new Sequelize({
    dialect: "sqlite",
    // dialect: 'postgres',
    storage: "./db.sqlite",
    // storage: "./db.postgres",
})

export const Recipe = sequelize.define('Recipes', {
    // Chaque champ correspond à une colonne dans la table
    nom: {
        type: DataTypes.STRING,
        allowNull: false // Indique si ce champ peut être null
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    duree: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    note: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
},{
        timestamps: false,
});

sequelize
  .sync()
  // .sync({ force: true })
  .then(() => {
    console.log("Base de données synchronisée et prête");
       
  })
  .catch(error => {
    console.error('Erreur de synchronisation:', error);
  });
