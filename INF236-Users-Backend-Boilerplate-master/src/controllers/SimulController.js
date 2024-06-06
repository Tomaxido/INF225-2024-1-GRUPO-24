import Simul from '../models/simulaciones.js';

export default class SimulController{
	async getAll(req, res) {
		try {
			const simul = await Simul.findAll();
			res.send(simul);
		} catch (error) {
			res.status(500).send("Error");
		}
	}

	async getByrut(req, res) {
		try {
			const simul = await Simul.findAll({
				where: {
					rut: req.params.rut
				}
			});
			res.send(simul);
			
		} catch (error) {
			res.status(500).send("Error");
		}
	}

	async get(req, res) {
		try {
			const simul = await Simul.findByPk(req.params.id);
			res.send(simul);
		} catch (error) {
			res.status(500).send("Error");
		}
	}

	async create(req, res) {
		try {
			const simul = await Simul.create({
				rut: req.body.rut,
				fecha: req.body.fecha,
				monto: req.body.monto_prestamo,
				n_cuotas : req.body.n_cuotas,
							UF : req.body.UF,
				interes: req.body.interes,
							Total_UF: req.body.Total_UF,
							Cuota_UF: req.body.precio_cuota,
			});
			res.send(simul);
		} catch (error) {
			res.status(500).send("Error");
		}
	}

}
