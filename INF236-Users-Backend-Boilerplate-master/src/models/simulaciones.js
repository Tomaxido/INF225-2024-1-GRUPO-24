import { Sequelize } from 'sequelize';
import sequelize from '../database.js';

class Simul extends Sequelize.Model {};

Simul.init(
    {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    rut: Sequelize.DataTypes.INTEGER,
    fecha: Sequelize.DataTypes.DATE,
    monto: Sequelize.DataTypes.INTEGER,
    n_cuotas: Sequelize.DataTypes.INTEGER,
    UF: Sequelize.DataTypes.NUMERIC,
    interes: Sequelize.DataTypes.INTEGER,
    Total_UF: Sequelize.DataTypes.NUMERIC,
    Cuota_UF: Sequelize.DataTypes.NUMERIC,
    },
    {
    sequelize,
    timestamps: true,
    }
);
export default Simul;