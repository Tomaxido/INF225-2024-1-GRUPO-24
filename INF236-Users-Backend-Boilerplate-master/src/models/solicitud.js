import { Sequelize } from 'sequelize';
import sequelize from '../database.js';

class Solicitud extends Sequelize.Model {};

Solicitud.init({
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: Sequelize.DataTypes.STRING,
  rut: Sequelize.DataTypes.STRING,
  fecha: Sequelize.DataTypes.DATE,
  cargo: Sequelize.DataTypes.STRING,
  tipo_prestamo: Sequelize.DataTypes.INTEGER,
  monto_total: Sequelize.DataTypes.INTEGER,
  precio_cuota: Sequelize.DataTypes.NUMERIC,
  n_cuotas: Sequelize.DataTypes.INTEGER,
  motivo: Sequelize.DataTypes.STRING,
  estado: Sequelize.DataTypes.INTEGER,
  derivada: Sequelize.DataTypes.INTEGER,
  interes: Sequelize.DataTypes.INTEGER,

  }, {
    sequelize,
    timestamps: true,
  });

export default Solicitud;
