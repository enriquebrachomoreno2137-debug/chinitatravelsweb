function seedDatabase(db) {
  const routes = db.getAllRoutes();
  if (routes.length > 0) return;

  const r = (...args) => db.addRoute(...args);
  const f = (...args) => db.addFlight(...args);
  const n = (...args) => db.addNews(...args);

  n('Comunicado Oficial Conviasa - Reprogramación de Vuelos por eventos sísmicos',
    'Conviasa informa a todos sus usuarios y al público en general que, con motivo de los eventos sísmicos registrados el pasado miércoles 24 de junio y con el firme compromiso de garantizar la seguridad de nuestros pasajeros, se han tomado medidas de contingencia para la reprogramación de nuestros vuelos.\n\n1. Reprogramación de Vuelos: Todos los pasajeros que tenían viajes programados para los días 27 y 28 de junio han sido debidamente reprogramados para salir el día domingo 28 de junio.\n\n2. Cambio de Ruta (Porlamar - Caracas): Debido a la suspensión temporal de operaciones en el Aeropuerto Internacional de Maiquetía "Simón Bolívar", los pasajeros con boletos emitidos para Porlamar - Caracas serán trasladados excepcionalmente a través de la ruta Porlamar - Valencia.\n\nInstagram: @conviasa_ve\n\nCaracas, 27 de junio de 2026',
    'importante');
  n('Aeropostal Alas de Venezuela - Vuelos especiales 28 de junio',
    'Aeropostal Alas de Venezuela ha reestructurado de manera temporal sus operaciones para garantizar el traslado de todos nuestros usuarios.\n\nFlexibilidades:\n• Reprogramación sin penalidades ni diferencias de tarifa.\n• Boleto válido por 1 año.\n\nImportante: Pasajeros Caracas-Porlamar-Caracas pueden volar desde/hacia Valencia sin costo adicional.\n\nOficinas:\n• Porlamar: Hotel Puerta del Sol\n• Valencia: Aeropuerto Arturo Michelena',
    'importante');
  n('Turpial Airlines - Vuela a San Antonio del Táchira',
    'Turpial Airlines te invita a volar a San Antonio del Táchira.\n\nSábado 4 de julio:\nValencia → San Antonio del Táchira | 16:00 - 17:00\nSan Antonio del Táchira → Valencia | 18:00 - 19:00',
    'general');
  n('Turpial Airlines - Vuela a Bogotá',
    'Turpial Airlines te invita a volar a Bogotá.\n\nDomingo 5 de julio:\nValencia → Bogotá | 17:00 - 17:30\nBogotá → Valencia | 18:30 - 21:00\n\nCupos limitados. ¡Reserva ahora!',
    'general');
  n('Rutaca Airlines - Plan de contingencia 28 de junio',
    'Rutaca Airlines ha activado un plan de contingencia realizando vuelos a través de aeropuertos alternos.\n\nDirectrices:\n• Reprogramación sin costo\n• Boleto válido por 1 año\n\nWhatsApp: 0424-9148669 / 0414-3659083\nCorreo: soporteagencias@flyrutaca.com',
    'importante');
  n('Rutaca Airlines - Plan de contingencia 29 de junio',
    'Estimados Usuarios:\n\nCon el firme compromiso de garantizar la movilidad de sus pasajeros, RUTACA AIRLINES ha activado un plan de contingencia, por lo que estaremos realizando algunos vuelos para mantener la conectividad, desde el Aeropuerto Alterno Arturo Michelena, en la ciudad de Valencia. Itinerario del lunes 29/06/2026.\n\nCanales de Soporte Agencias:\n• Correo electrónico: soporteagencias@flyrutaca.com\n• Contactos de WhatsApp: 0424-9148669 / 0414-3659083\n\nRecomendamos verificar el estado del itinerario de su pasajero a través de estos medios o mediante su sistema de reservación antes de que se dirijan al aeropuerto. RUTACA Airlines agradece profundamente la comprensión y su colaboración.',
    'importante');
  n('Plus Ultra Líneas Aéreas - Reanudación de operaciones 30 de junio',
    'Estimados Agentes de Viaje,\n\nNos unimos al gran duelo que vive el país en este momento, estamos seguros que saldremos adelante y fortalecidos de esta situación.\n\nLes informamos formalmente la reanudación de nuestras operaciones hacia y desde Venezuela a partir del próximo martes 30 de junio de 2026. Con el firme compromiso de mantener la conectividad de nuestros pasajeros, los vuelos operarán de manera temporal a través del Aeropuerto Internacional Arturo Michelena de la Ciudad de Valencia (VLN).\n\nRutas:\n• Madrid – Valencia (VLN): Vuelo PU701\n• Valencia (VLN) – Madrid: Vuelo PU702\n• Tenerife (Norte) – Valencia (VLN): Vuelo PU711\n• Valencia (VLN) – Tenerife (Norte): Vuelo PU712\n\n⚠️ IMPORTANTE: Todos los pasajeros deben presentarse en el aeropuerto de Valencia (VLN) con un mínimo de 4 horas de anticipación.\n\nAlternativas para pasajeros afectados:\n1. Aceptación de cambio de itinerario (sin coste)\n2. Cambio de fecha (gratuito, misma temporada, hasta 6 meses)\n3. Cambio de ruta (exento penalización, sujeto a diferencia tarifaria)\n4. Emisión de bono (válido 1 año, no reembolsable)\n\nGestión: Enviar correo a callcentre@plusultra.com con asunto: "SI ACEPTO" o "NO ACEPTO" + número de billete. Para bono: bonos@plusultra.com con asunto "QUIERO BONO" + número de billete.\n\nPlazo máximo: 2 de julio de 2026.\n\nSaludos cordiales,\nPlus Ultra Líneas Aéreas\nLazos que nos Unen',
    'importante');
  n('Avianca habilita temporalmente operación entre Bogotá y Valencia',
    'Avianca habilitó, de manera temporal, la venta de vuelos entre Bogotá y Valencia inicialmente hasta el próximo 10 de julio con tarifas especiales, periodo que podrá ser extendido dependiendo de la evolución de la contingencia en el Aeropuerto Internacional Simón Bolívar de Maiquetía.\n\nEsta medida permitirá mantener la conectividad aérea entre Colombia y Venezuela mientras se reestablecen las operaciones en Maiquetía, así como continuar transportando rescatistas, médicos y personal de atención de emergencias y ayuda humanitaria.\n\nAvianca ofrecerá dos frecuencias diarias, operadas en aviones de la flota A320.\n\nLos tiquetes están disponibles a la venta con tarifas especiales a través de avianca.com, la aplicación móvil, el Contact Center, puntos de venta físicos y agencias de viajes.\n\nComo parte de sus acciones para apoyar a Venezuela, Avianca continuará facilitando el traslado de rescatistas, personal médico y carga humanitaria, en coordinación con aliados como la Cruz Roja Colombiana y la Patrulla Aérea Civil Colombiana.',
    'importante');
  n('Aeropostal Alas de Venezuela - Nuevo itinerario temporal Valencia-Porlamar',
    'Estimados pasajeros,\n\nEn Aeropostal Alas de Venezuela, nuestra prioridad es garantizar la conectividad y el bienestar de nuestros usuarios. Ante las actuales medidas de contingencia operacional, nos complace informarles que hemos reestructurado de manera temporal nuestro itinerario para ofrecer una mayor disponibilidad y flexibilidad en sus viajes.\n\nA partir de la presente fecha, reforzamos nuestro compromiso de servicio operando nuestra ruta Valencia – Porlamar y Porlamar – Valencia.\n\nFrecuencias: LU MA JU VI y DOMINGO\n\nOficinas:\n• Porlamar (Nueva Esparta): Hotel Puerta del Sol, Calle Los Pinos entre Av. 4 de mayo y Av. Rómulo Betancourt.\n• Valencia (Carabobo): Aeropuerto Internacional Arturo Michelena, Av. Iribarren Borges.\n\nContacto: 0500-2846637 / +58-4227153913',
    'importante');

  const cvRoutes = [
    'Porlamar','Valera', 'Valera','Porlamar', 'Porlamar','Barquisimeto',
    'Barquisimeto','San Antonio del Táchira', 'San Antonio del Táchira','Barquisimeto',
    'Barquisimeto','Porlamar', 'Porlamar','San Antonio del Táchira',
    'San Antonio del Táchira','Porlamar', 'Porlamar','El Vigía', 'El Vigía','Porlamar',
    'Porlamar','Valencia', 'Valencia','Puerto Ordaz', 'Puerto Ordaz','Porlamar',
    'Porlamar','Maracaibo', 'Maracaibo','Porlamar', 'Valencia','Porlamar'
  ];
  for (let i = 0; i < cvRoutes.length; i += 2) {
    r(cvRoutes[i], cvRoutes[i+1], 'Ruta reprogramada por contingencia sísmica.');
  }

  r('Porlamar', 'Puerto España', 'Ruta internacional temporal.');
  r('Puerto España', 'Porlamar', 'Ruta internacional temporal.');

  for (const [o, d] of [['Valencia','San Antonio del Táchira'],['San Antonio del Táchira','Valencia'],['Valencia','Bogotá'],['Bogotá','Valencia']]) {
    r(o, d, 'Ruta Turpial Airlines.');
  }

  for (const [o, d] of [['Puerto Ordaz','Boa Vista'],['Boa Vista','Puerto Ordaz'],['Valencia','Punta Cana'],['Punta Cana','La Habana'],['La Habana','Punta Cana'],['Punta Cana','Valencia']]) {
    r(o, d, 'Ruta internacional Rutaca Airlines.');
  }

  for (const [o, d] of [['Madrid','Valencia'],['Valencia','Madrid'],['Tenerife','Valencia'],['Valencia','Tenerife']]) {
    r(o, d, 'Ruta internacional Plus Ultra Líneas Aéreas.');
  }

  const allRoutes = db.getAllRoutes();
  const g = (o, d) => { const x = allRoutes.find(x => x.origin === o.toUpperCase() && x.destination === d.toUpperCase()); return x ? x.id : null; };

  const makeF = (o, d, airline, fn, dep, arr, freq, notes) => {
    const rid = g(o, d);
    if (rid) f(rid, airline, fn, dep, arr, freq, notes);
  };

  makeF('Puerto Ordaz', 'Boa Vista', 'Rutaca Airlines', '', '9:00', '10:10', 'Lunes 29 de junio', 'Vuelo especial contingencia.');
  makeF('Boa Vista', 'Puerto Ordaz', 'Rutaca Airlines', '', '12:45', '13:55', 'Lunes 29 de junio', 'Vuelo especial contingencia.');
  makeF('Puerto Ordaz', 'Porlamar', 'Rutaca Airlines', '', '15:40', '16:30', 'Lunes 29 de junio', 'Vuelo especial contingencia.');
  makeF('Porlamar', 'Valencia', 'Rutaca Airlines', '', '17:30', '18:30', 'Lunes 29 de junio', 'Vuelo especial contingencia.');
  makeF('Valencia', 'Punta Cana', 'Rutaca Airlines', '', '10:00', '11:30', 'Lunes 29 de junio', 'Vuelo especial contingencia.');
  makeF('Punta Cana', 'La Habana', 'Rutaca Airlines', '', '12:30', '14:50', 'Lunes 29 de junio', 'Vuelo especial contingencia.');
  makeF('La Habana', 'Punta Cana', 'Rutaca Airlines', '', '15:40', '18:00', 'Lunes 29 de junio', 'Vuelo especial contingencia.');
  makeF('Punta Cana', 'Valencia', 'Rutaca Airlines', '', '19:00', '20:30', 'Lunes 29 de junio', 'Vuelo especial contingencia.');

  makeF('Valencia', 'San Antonio del Táchira', 'Turpial Airlines', '', '16:00', '17:00', 'Sábado 4 de julio', 'Vuelo promocional.');
  makeF('San Antonio del Táchira', 'Valencia', 'Turpial Airlines', '', '18:00', '19:00', 'Sábado 4 de julio', 'Vuelo promocional.');
  makeF('Valencia', 'Bogotá', 'Turpial Airlines', '', '17:00', '17:30', 'Domingo 5 de julio', 'Cupos limitados.');
  makeF('Bogotá', 'Valencia', 'Turpial Airlines', '', '18:30', '21:00', 'Domingo 5 de julio', 'Cupos limitados.');

  makeF('Madrid', 'Valencia', 'Plus Ultra Líneas Aéreas', 'PU701', '13:00', '16:30', '30 jun, 1, 2, 4, 7, 9 y 11 de julio', 'Vuelo reprogramado por contingencia.');
  makeF('Valencia', 'Madrid', 'Plus Ultra Líneas Aéreas', 'PU702', '10:00', '01:00 (+1 día)', '1 de julio', 'Vuelo reprogramado por contingencia.');
  makeF('Valencia', 'Madrid', 'Plus Ultra Líneas Aéreas', 'PU702', '19:00', '09:55 (+1 día)', '2, 5, 7, 9 y 12 de julio', 'Vuelo reprogramado por contingencia.');
  makeF('Tenerife', 'Valencia', 'Plus Ultra Líneas Aéreas', 'PU711', '12:20', '14:55', '5 y 12 de julio', 'Vuelo reprogramado por contingencia.');
  makeF('Valencia', 'Tenerife', 'Plus Ultra Líneas Aéreas', 'PU712', '20:30', '08:50 (+1 día)', '5 y 12 de julio', 'Vuelo reprogramado por contingencia. Conexión Madrid.');

  makeF('Bogotá', 'Valencia', 'Avianca', '', '07:35', '10:35', 'Diaria', 'Vuelo temporal por contingencia. Válido hasta 10 de julio.');
  makeF('Bogotá', 'Valencia', 'Avianca', '', '23:20', '02:20 (+1 día)', 'Diaria', 'Vuelo temporal por contingencia. Válido hasta 10 de julio.');
  makeF('Valencia', 'Bogotá', 'Avianca', '', '12:27', '13:10', 'Diaria', 'Vuelo temporal por contingencia. Válido hasta 10 de julio.');
  makeF('Valencia', 'Bogotá', 'Avianca', '', '04:17', '05:00', 'Diaria', 'Vuelo temporal por contingencia. Válido hasta 10 de julio.');

  makeF('Valencia', 'Porlamar', 'Aeropostal Alas de Venezuela', '', '12:00', '13:00', 'LU MA JU VI, DOMINGO', 'Vuelo temporal por contingencia.');
  makeF('Valencia', 'Porlamar', 'Aeropostal Alas de Venezuela', '', '13:00', '14:00', 'LU MA JU VI, DOMINGO', 'Vuelo temporal por contingencia.');
  makeF('Porlamar', 'Valencia', 'Aeropostal Alas de Venezuela', '', '14:00', '15:00', 'LU MA JU VI, DOMINGO', 'Vuelo temporal por contingencia.');
  makeF('Porlamar', 'Valencia', 'Aeropostal Alas de Venezuela', '', '15:00', '16:00', 'LU MA JU VI, DOMINGO', 'Vuelo temporal por contingencia.');
}

module.exports = { seedDatabase };
