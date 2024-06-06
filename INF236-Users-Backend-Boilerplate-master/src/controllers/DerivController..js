import Deriv from '../models/derivados.js';

export default class DerivController{
	async getAll(req, res) {
		try {
			const soli = await Deriv.findAll();
			res.send(soli);
		} catch (error) {
			res.status(500).send("Error");
		}
	}	
	async create(req, res) {
		try {
			const deri = await Deriv.create({
				id: req.params.id,	
			});
			res.send(deri);
		} catch (error) {
			res.status(500).send("Error");
		}
	}
};

