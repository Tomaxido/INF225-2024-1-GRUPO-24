import User from '../models/User.js';

export default class UserController {
	 async getAll(req, res) {
		const users = await User.findAll();
		res.send(users);
	}		

	async getBynombre(req, res) {
		console.log("Nombre:", req.params.nombre,);
  		console.log("Contraseña:", req.params.pass);
		const users = await User.findAll({
			where: {
				nombre: req.params.nombre,
				pass: req.params.pass,
			}
		});
		res.send(users);
	}

	async get(req, res) {
		const user = await User.findByPk(req.params.userId);
		res.send(user);
	}

	async create(req, res) {
		const user = await User.create({
			nombre: req.body.nombre,
			email: req.body.email,
			cargo: req.body.cargo,
			pass: req.body.pass,
		});
		res.send(user);
	}

	async update(req, res) {
		const user = await User.findByPk(req.params.userId);
		user.update({nombre: req.body.nombre, email: req.body.email});
		res.send(user);
	}

	async delete(req, res) {
		await User.destroy({where: {id: req.params.userId}});
		res.send({status: "ok"});
	}
};


