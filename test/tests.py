import unittest
import requests

class testFinanciera(unittest.TestCase):
    rangoFechasconDatos = None
    rangoFechassinDatos = None
    idvalida = None
    idprueba = None
    rutvalido = None
    idupdatederivar = None

    @classmethod
    def setUpClass(cls): #crea datos, incluso en la bdd 
        cls.urlApipost1 = "http://localhost:8080/solicitud/dates"
        cls.rangoFechasconDatos={
            "initial_date": "2024-04-30",
			"end_date": "2024-05-8"
        }

        cls.rangoFechassinDatos={
            "initial_date": "2025-03-30",
			"end_date": "2025-10-8"
        }

        cls.idvalida = 39
        cls.urlApipost2 = "http://localhost:8080/derivados/"+str(cls.idvalida) 
    

        cls.idprueba = 30
        cls.urlApiput1 = "http://localhost:8080/solicitud/aprob/"+str(cls.idprueba)
        cls.urlApiput2 = "http://localhost:8080/solicitud/rech/"+str(cls.idprueba)

        cls.rutvalido = 21296333
        cls.urlApiget1 = "http://localhost:8080/simulacion/filter/"+str(cls.rutvalido)
        
        cls.idupdatederivar = 37
        cls.urlApiput3 = "http://localhost:8080/solicitud/"+str(cls.idupdatederivar)

    @classmethod
    def tearDownClass(cls): #vuelve el sistema al estado anterior (borra datos)
        del cls.rangoFechasconDatos
        del cls.rangoFechassinDatos
        del cls.idvalida
        del cls.idprueba
        del cls.rutvalido
        del cls.idupdatederivar


# aquí se definen las pruebas

    def test_SolicitudbyDateRange1(self):
        respuesta = requests.post(self.urlApipost1, json=self.rangoFechasconDatos) 
        datos = respuesta.json()[0]
        bien = {
            "id": 39 , 
            "nombre" : "Alex",
            "fecha" : "2024-05-02",
            "rut" : 12322211, 
            "monto_total" : 100000000,
            "interes" : 100
        } 
        

        self.assertEqual(datos, bien)

    def test_SolicitudbyDateRange2(self):
        respuesta = requests.post(self.urlApipost1, json=self.rangoFechassinDatos) 
        datos = respuesta.json()
        bien = []
        self.assertEqual(datos, bien)
    
    def test_SoliDerivadaInfo1(self):
        respuesta = requests.post(self.urlApipost2)
        datos = respuesta.status_code
        bien = 400
        self.assertEqual(datos, bien)

    def test_SoliDerivadaInfo2(self):
        respuesta = requests.post(self.urlApipost2)
        datos = respuesta.status_code
        bien = 200
        self.assertEqual(datos, bien)

    def test_aprobarID(self):
        respuesta = requests.put(self.urlApiput1)
        datos = respuesta.status_code
        bien = 200
        self.assertEqual(datos,bien)
        
    def test_rechazarID(self):
        respuesta = requests.put(self.urlApiput2)
        datos = respuesta.status_code
        bien = 400
        self.assertEqual(datos,bien)

    def test_filtrarRut1(self):
        respuesta = requests.get(self.urlApiget1)
        datos = respuesta.json()[0]
        bien = {
            "id": 5 ,
            "rut": 21296333,
            "fecha": "2024-05-02",
            "monto": 12000,
            "n_cuotas": 6,
            "UF": "37.271",
            "interes": 55,
            "Total_UF": "1153.45",
            "Cuota_UF": "192.24",
            "createdAt": "2024-05-02T23:45:57.855Z",
            "updatedAt": "2024-05-02T23:45:57.855Z"
        }
        self.assertEqual(datos,bien)

    def test_ActualizarDerivadoSolicitud (self):
        respuesta = requests.put(self.urlApiput3)
        datos = respuesta.status_code
        bien = 200
        self.assertEqual(datos,bien)

    
if __name__ == "__main__":
    unittest.main()