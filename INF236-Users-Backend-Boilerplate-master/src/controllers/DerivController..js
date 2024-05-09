import Deriv from '../models/derivados.js';

export default class DerivController{
	async getAll(req, res) {
		const soli = await Deriv.findAll();
		res.send(soli);
	}	
	async create(req, res) {
		try {
			const deri = await Deriv.create({
				id: req.params.id,	
			});
			res.send(deri);
		} catch (error) {
			res.status(400).send(error)
		}
		
	}
};

