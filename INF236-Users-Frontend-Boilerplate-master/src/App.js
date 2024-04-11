import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import UsersEdit from "./views/users/edit";
import UsersView from "./views/users/show";
import UserList from "./views/users/index";
import UserAdd from "./views/users/create";

import SolicitudList from "./views/solicitud/index";
import SolicitudAdd from "./views/solicitud/nuevo";
import SolicitudView from "./views/solicitud/show";

import Simulacion from "./views/simulacion/index";
import SimulacionListuser from "./views/simulacion/listuser"
import SimulacionList from "./views/simulacion/list"
import SimulacionShow from "./views/simulacion/show";
import SimulacionShowuser from "./views/simulacion/showuser";

import DeriList from "./views/derivados/index"
import DeriShow from "./views/derivados/show";

import Login from "./views/login/login"
import Out from "./views/login/cerrar_sesion"
import Home from "./views/Home";

export default function App() {
	return (
		<Router>
			<div>
				<Header />
				<Container fluid className="p-0">
					<Row className="no-gutters">
						<Col xs="2">
							<Sidebar />
						</Col>
						<Col xs="10">
							{/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
							<Switch>
								<Route path="/users/create">
									<UserAdd />
								</Route>
								<Route path="/users/:id/edit">
									<UsersEdit />
								</Route>
								<Route path="/users/:id">
									<UsersView />
								</Route>
								<Route path="/users">
									<UserList />
								</Route>
								<Route path="/solicitud/nuevo">
									<SolicitudAdd />
								</Route>
								<Route path="/solicitud/:id">
									<SolicitudView />
								</Route>
								<Route path="/solicitud">
									<SolicitudList />
								</Route>
								<Route path="/login/cerrar_sesion">
									<Out />
								</Route>
								<Route path="/login">
									<Login />
								</Route>
								<Route path="/simular/list/:id">
									<SimulacionShow />
								</Route>
								<Route path="/simular/list">
									<SimulacionList />
								</Route>
								<Route path="/simular/listuser/:id">
									<SimulacionShowuser />
								</Route>
								<Route path="/simular/listuser">
									<SimulacionListuser />
								</Route>
								<Route path="/simular">
									<Simulacion />
								</Route>
								<Route path="/derivados/:id">
									<DeriShow />
								</Route>
								<Route path="/derivados">
									<DeriList />
								</Route>
								
								
								<Route path="/">
									<Home />
								</Route>
							</Switch>
						</Col>
					</Row>
				</Container>
			</div>
		</Router>
	);
}
