import { Sequelize } from 'sequelize';
import sequelize from '../database.js';

class Deriv extends Sequelize.Model {};

Deriv.init({
  id: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
  },
  }, {
    sequelize,
    timestamps: true,
  });

export default Deriv;
