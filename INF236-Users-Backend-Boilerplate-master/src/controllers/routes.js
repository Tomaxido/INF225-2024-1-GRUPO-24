import UserController from './UserController.js';
import SolicitudController from './SolicitudController.js';
import DerivController from './DerivController..js';
import SimulController from './SimulController.js';


export default (app) => {
	const userController = new UserController();
	const solicitudController = new SolicitudController();
	const derivController = new DerivController();
	const simulController = new SimulController();

	app.get('/users', userController.getAll);
	app.get('/users/:nombre/:pass', userController.getBynombre);
	app.post('/users', userController.create);
	app.get('/derivados', derivController.getAll);
	app.post('/derivados/:id', derivController.create);
	app.get('/solicitud', solicitudController.getAll);
	app.post('/solicitud', solicitudController.create);
	app.get('/solicitud/:id', solicitudController.get);
	app.put('/solicitud/:id', solicitudController.update);
	app.put('/solicitud/aprob/:id', solicitudController.aprobar);
	app.put('/solicitud/rech/:id', solicitudController.rechazar);
	app.delete('/solicitud/:id', solicitudController.delete);
	app.post('/simulacion', simulController.create);
	app.get('/simulacion', simulController.getAll);
	app.get('/simulacion/:id', simulController.get);
	app.get('/simulacion/filter/:rut', simulController.getByrut);
	app.get('/users/:userId', userController.get);
	app.put('/users/:userId', userController.update);
	app.delete('/users/:userId', userController.delete);
};