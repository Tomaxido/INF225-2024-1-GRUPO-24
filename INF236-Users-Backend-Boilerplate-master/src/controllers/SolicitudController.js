import Solicitud from '../models/solicitud.js';
import { Sequelize } from 'sequelize';

export default class SolicitudController{
	async getAll(req, res) {
		try {
			const soli = await Solicitud.findAll();
			console.log(soli);
			res.send(soli);
		} catch (error) {
			res.status(500).send("Error");
		}
	}	

	async getBynombre(req, res) {
		try {
			const soli = await Solicitud.findAll({
				where: {
					nombre: req.params.nombre
				}
			});
			res.send(soli);
		} catch (error) {
			res.status(500).send("Error");
		}
	}

	async get(req, res) {
		try {
			const soli = await Solicitud.findByPk(req.params.id);
			res.send(soli);
		} catch (error) {
			res.status(500).send("Error");
		}
	}

	async getByEjecutivoId(req, res) {
		try {
			const id = req.params.userId;
			const solicitudes = await Solicitud.findAll({
				where: {
					created_by: id
				},
				attributes: ['id', 'nombre', 'fecha', 'rut', 'estado', 'derivada']
			});
			const solicitudesDataValues = solicitudes.map(solicitud => solicitud.dataValues);
			res.send(solicitudesDataValues);
		} catch (error) {
			res.status(500).send("Error");
		}
	}

	async getAcceptedSolicitudbyDateRange(req,res) {
		const { initial_date, end_date } = req.body;
		try {
			const solicitudes = await Solicitud.findAll({
					where: {
							fecha: {
									[Sequelize.Op.between]: [initial_date, end_date]
							},
							estado: 1 // Filtro para obtener solo solicitudes con estado aceptado
					},
					attributes: ['id', 'nombre', 'fecha', 'rut', 'monto_total', 'interes']
			});
			const response = solicitudes.map((solicitud) => solicitud.dataValues);
			res.send(response);
		} catch (error) {
				console.error("Error al buscar las solicitudes por rango de fecha:", error);
				res.status(500).send("Error al buscar las solicitudes por rango de fecha");
		}
	}

	async create(req, res) {
		try {
			const soli = await Solicitud.create({
				created_by: req.body.userId,
				nombre: req.body.nombre,	
				rut: req.body.rut,
				fecha: req.body.fecha,
				cargo: req.body.oficio,
				tipo_prestamo: req.body.tipo_prestamo,
				monto_total: req.body.monto_prestamo,
				precio_cuota: req.body.precio_cuota,
				n_cuotas : req.body.n_cuotas,
				motivo: req.body.motivo,
				estado: req.body.estado,
				derivada: req.body.derivada,
				interes: req.body.interes,
			});
			res.send(soli);
		} catch (error) {
			res.status(500).send("Error");
		}
	}
	async update(req, res) {
		try {
			const soli = await Solicitud.findByPk(req.params.id);
			soli.update({derivada: 1});
			res.send(soli);
		} catch (error) {
			res.status(500).send("Error");
		}
	}
	async aprobar(req, res) {
		try {
			const soli = await Solicitud.findByPk(req.params.id);
			soli.update({estado: 1});
			res.send(soli);
		} catch (error) {
			res.status(500).send("Error");
		}
	}
	async rechazar(req, res) {
		try {
			const soli = await Solicitud.findByPk(req.params.id);
			soli.update({estado: 2});
			res.send(soli);
		} catch (error) {
			res.status(500).send("Error");
		}
	}

	async delete(req, res) {
		try {
			await Solicitud.destroy({where: {id: req.params.id}});
			res.send({status: "ok"});
		} catch (error) {
			res.status(500).send("Error");
		}
	}	
};


