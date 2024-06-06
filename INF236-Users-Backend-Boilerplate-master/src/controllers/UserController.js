import User from '../models/User.js';

export default class UserController {
	 async getAll(req, res) {
		try {
			const users = await User.findAll();
			res.send(users);
		} catch (error) {
			res.status(500).send("Error");
		}
	}		

	async getBynombre(req, res) {
		try {
			const users = await User.findAll({
				where: {
					nombre: req.params.nombre,
					pass: req.params.pass,
				}
			});
			res.send(users);
		} catch (error) {
			res.status(500).send("Error");
		}
	}

	async get(req, res) {
		try {
			const user = await User.findByPk(req.params.userId);
			res.send(user);
		} catch (error) {
			res.status(500).send("Error");
		}
	}

	async create(req, res) {
		try {
			const user = await User.create({
				nombre: req.body.nombre,
				email: req.body.email,
				cargo: req.body.cargo,
				pass: req.body.pass,
			});
			res.send(user);
		} catch (error) {
			res.status(500).send("Error");
		}
	}

	async update(req, res) {
		try {
			const user = await User.findByPk(req.params.userId);
			user.update({nombre: req.body.nombre, email: req.body.email});
			res.send(user);
		} catch (error) {
			res.status(500).send("Error");
		}
	}

	async delete(req, res) {
		try {
			await User.destroy({where: {id: req.params.userId}});
			res.send({status: "ok"});
		} catch (error) {
			res.status(500).send("Error");
		}
	}
};


