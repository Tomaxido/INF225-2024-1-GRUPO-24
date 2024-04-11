import Solicitud from '../models/solicitud.js';

export default class SolicitudController{
	async getAll(req, res) {
		const soli = await Solicitud.findAll();
		res.send(soli);
	}	

	async getBynombre(req, res) {
		const soli = await Solicitud.findAll({
			where: {
				nombre: req.params.nombre
			}
		});
		res.send(soli);
	}

	async get(req, res) {
		const soli = await Solicitud.findByPk(req.params.id);
		res.send(soli);
	}

	async create(req, res) {
		const soli = await Solicitud.create({
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
	}
	async update(req, res) {
		const soli = await Solicitud.findByPk(req.params.id);
		soli.update({derivada: 1});
		res.send(soli);
	}
	async aprobar(req, res) {
		const soli = await Solicitud.findByPk(req.params.id);
		soli.update({estado: 1});
		res.send(soli);
	}
	async rechazar(req, res) {
		const soli = await Solicitud.findByPk(req.params.id);
		soli.update({estado: 2});
		res.send(soli);
	}

	async delete(req, res) {
		await Solicitud.destroy({where: {id: req.params.id}});
		res.send({status: "ok"});
	}	
};


