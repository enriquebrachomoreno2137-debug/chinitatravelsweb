function seedDatabase(db) {
  db.clearAllData();

  const r = (...args) => db.addRoute(...args);
  const f = (...args) => db.addFlight(...args);
  const n = (...args) => db.addNews(...args);

  n('Aeropostal Alas de Venezuela - Nuevo itinerario temporal Valencia-Porlamar',
    'Estimados pasajeros,\n\nEn Aeropostal Alas de Venezuela, nuestra prioridad es garantizar la conectividad y el bienestar de nuestros usuarios. Ante las actuales medidas de contingencia operacional, nos complace informarles que hemos reestructurado de manera temporal nuestro itinerario para ofrecer una mayor disponibilidad y flexibilidad en sus viajes.\n\nA partir de la presente fecha, reforzamos nuestro compromiso de servicio operando nuestra ruta Valencia – Porlamar y Porlamar – Valencia.\n\nFrecuencias: LU MA JU VI y DOMINGO\n\nOficinas:\n• Porlamar (Nueva Esparta): Hotel Puerta del Sol, Calle Los Pinos entre Av. 4 de mayo y Av. Rómulo Betancourt.\n• Valencia (Carabobo): Aeropuerto Internacional Arturo Michelena, Av. Iribarren Borges.\n\nContacto: 0500-2846637 / +58-4227153913',
    'importante', '2026-06-29 16:00:00');
  n('Laser Airlines - Flexibilización para pasajeros afectados',
    'En virtud de los recientes acontecimientos como consecuencia del sismo registrado el día 24 de junio, informamos a la colectividad que nuestras operaciones nacionales e internacionales desde y hacia el aeropuerto internacional Simón Bolívar se mantienen a la espera de las instrucciones de las autoridades competentes para su restablecimiento, con el fin de garantizar un pronto y seguro reinicio de los vuelos.\n\nEntre tanto, hemos activado una política de flexibilización para los pasajeros afectados en los vuelos suspendidos:\n\n1. Todos los pasajeros afectados podrán reprogramar su viaje en la misma ruta, sin costo adicional, sujeto a disponibilidad.\n2. Cambio de ruta / destino hacia rutas disponibles de Laser Airlines, sin cobro de penalidad (aplica diferencia de tarifa si la hubiese).\n3. Si el pasajero desiste de su viaje, el boleto tendrá 1 año de validez.\n4. Nota de crédito.\n\nPara información adicional puede comunicarse con su agencia de viajes o con nuestros canales oficiales de atención.\n\nDirección Comercial Caracas, 25 de junio de 2026',
    'importante', '2026-06-29 15:00:00');
  n('LASER Airlines - Recuperación de equipajes de mano vuelo 2920 CCS-MAD (29 de junio)',
    'Motivado a la cancelación del vuelo 2920 del pasado 24 de junio por las causas de fuerza mayor ya conocidas, les informamos que hemos recuperado los equipajes de mano que se encontraban resguardados en la aeronave.\n\nTras obtener las autorizaciones necesarias para el desembarque de las pertenencias, les notificamos que a partir de este lunes 29 de junio se estará realizando la entrega de dichos equipajes de mano en nuestras Instalaciones administrativas.\n\nPodrán acudir a nuestras oficinas en el siguiente horario:\n\nLUNES A VIERNES: 08:30 A.M. A 12:00 P.M. Y DE 01:00 P.M. A 04:30 P.M.\n\nPara retirar su equipaje, es indispensable presentar:\n\nCédula de Identidad o Pasaporte. (copia o imagen)\n\nNota importante: Si el equipaje de mano va a ser retirado por un tercero, este deberá presentar una carta de autorización debidamente firmada por el titular, acompañada por las copias de la Cédula de Identidad (o Pasaporte) tanto del dueño del equipaje como de la persona autorizada.\n\nDirección: Calle California de Las Mercedes, Torre Laser (al lado del GYM 398).\n\nSeguimos trabajando para brindarles una pronta respuesta sobre el resto del equipaje facturado, para lo cual informaremos por nuestros canales oficiales.\n\nAtentamente, LASER Airlines',
    'importante', '2026-06-29 13:00:00');
  n('Estelar - Plan de contingencia Valencia',
    'Para garantizar la movilidad de nuestros pasajeros ante la situación que está atravesando el país, hemos habilitado un plan de contingencia con la finalidad de garantizar la conectividad para algunos de nuestros destinos a través del Aeropuerto Arturo Michelena en la ciudad de Valencia (VLN) con salidas y llegadas hacia Santo Domingo del Táchira (STD), Maracaibo (MAR) y Porlamar (PMV).\n\nNota: Debido a las condiciones antes mencionadas, los itinerarios pueden sufrir algunas modificaciones.\n\nOpciones disponibles:\n1. Reprogramación de fecha sin costo adicional.\n2. Cambio de ruta hacia otros destinos sin cobro de penalidad (puede aplicar diferencia de tarifa).\n3. Validez de un año.\n4. Bono de crédito.\n\nContacto:\n• WhatsApp: +58 414 378 3527\n• Correo: calidad.servicio@flyestelar.com\n• Call Center: 0501 3783527',
    'importante', '2026-06-29 14:30:00');
  n('Plus Ultra Líneas Aéreas - Reanudación de operaciones 30 de junio',
    'Estimados Agentes de Viaje,\n\nNos unimos al gran duelo que vive el país en este momento, estamos seguros que saldremos adelante y fortalecidos de esta situación.\n\nLes informamos formalmente la reanudación de nuestras operaciones hacia y desde Venezuela a partir del próximo martes 30 de junio de 2026. Con el firme compromiso de mantener la conectividad de nuestros pasajeros, los vuelos operarán de manera temporal a través del Aeropuerto Internacional Arturo Michelena de la Ciudad de Valencia (VLN).\n\nRutas:\n• Madrid – Valencia (VLN): Vuelo PU701\n• Valencia (VLN) – Madrid: Vuelo PU702\n• Tenerife (Norte) – Valencia (VLN): Vuelo PU711\n• Valencia (VLN) – Tenerife (Norte): Vuelo PU712\n\n⚠️ IMPORTANTE: Todos los pasajeros deben presentarse en el aeropuerto de Valencia (VLN) con un mínimo de 4 horas de anticipación.\n\nAlternativas para pasajeros afectados:\n1. Aceptación de cambio de itinerario (sin coste)\n2. Cambio de fecha (gratuito, misma temporada, hasta 6 meses)\n3. Cambio de ruta (exento penalización, sujeto a diferencia tarifaria)\n4. Emisión de bono (válido 1 año, no reembolsable)\n\nGestión: Enviar correo a callcentre@plusultra.com con asunto: "SI ACEPTO" o "NO ACEPTO" + número de billete. Para bono: bonos@plusultra.com con asunto "QUIERO BONO" + número de billete.\n\nPlazo máximo: 2 de julio de 2026.\n\nSaludos cordiales,\nPlus Ultra Líneas Aéreas\nLazos que nos Unen',
    'importante', '2026-06-29 14:00:00');
  n('Rutaca Airlines - Plan de contingencia 29 de junio',
    'Estimados Usuarios:\n\nCon el firme compromiso de garantizar la movilidad de sus pasajeros, RUTACA AIRLINES ha activado un plan de contingencia, por lo que estaremos realizando algunos vuelos para mantener la conectividad, desde el Aeropuerto Alterno Arturo Michelena, en la ciudad de Valencia. Itinerario del lunes 29/06/2026.\n\nCanales de Soporte Agencias:\n• Correo electrónico: soporteagencias@flyrutaca.com\n• Contactos de WhatsApp: 0424-9148669 / 0414-3659083\n\nRecomendamos verificar el estado del itinerario de su pasajero a través de estos medios o mediante su sistema de reservación antes de que se dirijan al aeropuerto. RUTACA Airlines agradece profundamente la comprensión y su colaboración.',
    'importante', '2026-06-29 12:00:00');
  n('Avianca habilita temporalmente operación entre Bogotá y Valencia',
    'Avianca habilitó, de manera temporal, la venta de vuelos entre Bogotá y Valencia inicialmente hasta el próximo 10 de julio con tarifas especiales, periodo que podrá ser extendido dependiendo de la evolución de la contingencia en el Aeropuerto Internacional Simón Bolívar de Maiquetía.\n\nEsta medida permitirá mantener la conectividad aérea entre Colombia y Venezuela mientras se reestablecen las operaciones en Maiquetía, así como continuar transportando rescatistas, médicos y personal de atención de emergencias y ayuda humanitaria.\n\nAvianca ofrecerá dos frecuencias diarias, operadas en aviones de la flota A320.\n\nLos tiquetes están disponibles a la venta con tarifas especiales a través de avianca.com, la aplicación móvil, el Contact Center, puntos de venta físicos y agencias de viajes.\n\nComo parte de sus acciones para apoyar a Venezuela, Avianca continuará facilitando el traslado de rescatistas, personal médico y carga humanitaria, en coordinación con aliados como la Cruz Roja Colombiana y la Patrulla Aérea Civil Colombiana.',
    'importante', '2026-06-28 18:00:00');
  n('Rutaca Airlines - Plan de contingencia 28 de junio',
    'Rutaca Airlines ha activado un plan de contingencia realizando vuelos a través de aeropuertos alternos.\n\nDirectrices:\n• Reprogramación sin costo\n• Boleto válido por 1 año\n\nWhatsApp: 0424-9148669 / 0414-3659083\nCorreo: soporteagencias@flyrutaca.com',
    'importante', '2026-06-28 16:00:00');
  n('Turpial Airlines - Vuela a Bogotá',
    'Turpial Airlines te invita a volar a Bogotá.\n\nDomingo 5 de julio:\nValencia → Bogotá | 17:00 - 17:30\nBogotá → Valencia | 18:30 - 21:00\n\nCupos limitados. ¡Reserva ahora!',
    'general', '2026-06-28 14:00:00');
  n('Turpial Airlines - Vuela a San Antonio del Táchira',
    'Turpial Airlines te invita a volar a San Antonio del Táchira.\n\nSábado 4 de julio:\nValencia → San Antonio del Táchira | 16:00 - 17:00\nSan Antonio del Táchira → Valencia | 18:00 - 19:00',
    'general', '2026-06-28 12:00:00');
  n('Aeropostal Alas de Venezuela - Vuelos especiales 28 de junio',
    'Aeropostal Alas de Venezuela ha reestructurado de manera temporal sus operaciones para garantizar el traslado de todos nuestros usuarios.\n\nFlexibilidades:\n• Reprogramación sin penalidades ni diferencias de tarifa.\n• Boleto válido por 1 año.\n\nImportante: Pasajeros Caracas-Porlamar-Caracas pueden volar desde/hacia Valencia sin costo adicional.\n\nOficinas:\n• Porlamar: Hotel Puerta del Sol\n• Valencia: Aeropuerto Arturo Michelena',
    'importante', '2026-06-28 10:00:00');
  n('Comunicado Oficial Conviasa - Reprogramación de Vuelos por eventos sísmicos',
    'Conviasa informa a todos sus usuarios y al público en general que, con motivo de los eventos sísmicos registrados el pasado miércoles 24 de junio y con el firme compromiso de garantizar la seguridad de nuestros pasajeros, se han tomado medidas de contingencia para la reprogramación de nuestros vuelos.\n\n1. Reprogramación de Vuelos: Todos los pasajeros que tenían viajes programados para los días 27 y 28 de junio han sido debidamente reprogramados para salir el día domingo 28 de junio.\n\n2. Cambio de Ruta (Porlamar - Caracas): Debido a la suspensión temporal de operaciones en el Aeropuerto Internacional de Maiquetía "Simón Bolívar", los pasajeros con boletos emitidos para Porlamar - Caracas serán trasladados excepcionalmente a través de la ruta Porlamar - Valencia.\n\nInstagram: @conviasa_ve\n\nCaracas, 27 de junio de 2026',
    'importante', '2026-06-27 10:00:00');

  n('Conviasa - Reprogramación ruta Porlamar-Barbados (30 de junio)',
    'El Consorcio Venezolano de Industrias Aeronáuticas y Servicios Aéreos S.A. (Conviasa) informa a todos sus usuarios y al público en general que, debido a la contingencia generada por los eventos sísmicos registrados el pasado 24 de junio, nos hemos visto en la obligación de realizar ajustes en nuestras operaciones en la ruta Porlamar – Barbados – Porlamar, bajo la siguiente reprogramación:\n\n• Pasajeros con boletos emitidos para salir el 01 de julio serán reprogramados para salir el 8 de julio de 2026.\n• Pasajeros con boletos emitidos para salir el 15 de julio serán reprogramados para salir el 22 de julio de 2026.\n\nLes recordamos presentarse en los mostradores con cuatro (4) horas de anticipación a la salida del vuelo.\n\nPara los pasajeros que viajan desde Caracas, serán contactados por el personal de Conviasa para reprogramar su viaje.\n\nConviasa ratifica su compromiso con los usuarios, agradeciendo enormemente su comprensión, paciencia y confianza mientras se normalizan las operaciones en el principal aeropuerto de nuestro país.',
    'importante', '2026-06-30 10:00:00');

  n('Conviasa - Reprogramación ruta Caracas-Cancún (29 de junio)',
    'Consorcio Venezolano de Industrias Aeronáuticas y Servicios Aéreos S.A. (CONVIASA). Caracas, 29 de junio de 2026.\n\nConviasa se dirige a todos sus usuarios y al público en general para informar sobre una modificación temporal en nuestra programación regular de vuelos.\n\nDebido a los sismos ocurridos el pasado 24 de junio, las operaciones en el Aeropuerto Internacional de Maiquetía "Simón Bolívar" han sido suspendidas; por ello, nos vemos en la imperiosa necesidad de reprogramar temporalmente las operaciones en la ruta Caracas - Cancún - Caracas.\n\nEsta medida entrará en vigor de manera inmediata y se mantendrá por un lapso estimado de quince (15) días o hasta tanto las autoridades competentes habiliten plenamente las operaciones en la mencionada terminal aérea.\n\nNuestras más sinceras disculpas. Lamentamos profundamente los inconvenientes que esta situación, ajena a nuestra voluntad, pueda causar en sus planes de viaje. Para Conviasa, la seguridad de nuestros pasajeros es y siempre será la máxima prioridad.\n\nPara garantizar el respaldo a todos los usuarios afectados por esta suspensión temporal, hemos habilitado la siguiente opción de protección para la reprogramación de fechas:\n\nPara pasajeros procedentes de Cancún, ponemos a su disposición el correo electrónico sucursalmexico@conviasamx.com o dirigirse a la oficina de Conviasa ubicada en el aeropuerto de Cancún para facilitar su contacto, y así informarles oportunamente la reprogramación de su vuelo.\n\nPara los pasajeros que viajan desde Caracas, serán contactados por el personal de Conviasa para reprogramar su viaje.\n\nAgradecemos enormemente su paciencia, comprensión y confianza mientras se normalizan las operaciones en el principal aeropuerto de nuestro país.',
    'importante', '2026-06-29 18:00:00');

  n('Conviasa - Reprogramación rutas Caracas-Santa Lucía y Caracas-La Habana (29 de junio)',
    'Consorcio Venezolano de Industrias Aeronáuticas y Servicios Aéreos S.A. (CONVIASA). Caracas, 29 de junio de 2026.\n\nConviasa se dirige a todos sus usuarios y al público en general para informar sobre una modificación temporal en nuestra programación regular de vuelos.\n\nDebido a los sismos ocurridos el pasado 24 de junio, las operaciones en el Aeropuerto Internacional de Maiquetía "Simón Bolívar" han sido suspendidas; por ello, nos vemos en la imperiosa necesidad de reprogramar temporalmente las operaciones en las rutas Caracas - Santa Lucía (México) - Caracas y Caracas - La Habana - Caracas.\n\nEsta medida entrará en vigor de manera inmediata y se mantendrá por un lapso estimado de quince (15) días o hasta tanto las autoridades competentes habiliten plenamente las operaciones en la mencionada terminal aérea.\n\nNuestras más sinceras disculpas. Lamentamos profundamente los inconvenientes que esta situación, ajena a nuestra voluntad, pueda causar en sus planes de viaje.\n\nPara garantizar el respaldo a todos los usuarios afectados por esta suspensión temporal, hemos habilitado la siguiente opción de protección para la reprogramación de fechas:\n\nPara pasajeros procedentes de Santa Lucía (México), ponemos a su disposición el correo electrónico: estacionsantalucia.mexico@gmail.com a fin de que faciliten sus contactos, y así informarles oportunamente la reprogramación de su vuelo.\n\nPara los pasajeros que viajan desde Caracas y desde La Habana, serán contactados por el personal de Conviasa para reprogramar su viaje, una vez inicien las operaciones en el aeropuerto de Maiquetía.\n\nAgradecemos enormemente su paciencia, comprensión y confianza mientras se normalizan las operaciones en el principal aeropuerto de nuestro país.',
    'importante', '2026-06-29 17:00:00');

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

  r('Bogotá', 'Valencia', 'Ruta Avianca.');
  r('Valencia', 'Bogotá', 'Ruta Avianca.');

  r('Valencia', 'Santo Domingo del Táchira', 'Ruta Estelar Airlines.');
  r('Santo Domingo del Táchira', 'Valencia', 'Ruta Estelar Airlines.');
  r('Valencia', 'Maracaibo', 'Ruta Estelar Airlines.');
  r('Maracaibo', 'Valencia', 'Ruta Estelar Airlines.');

  const allRoutes = db.getAllRoutes();
  const g = (o, d) => { const x = allRoutes.find(x => x.origin === o.toUpperCase() && x.destination === d.toUpperCase()); return x ? x.id : null; };

  const makeF = (o, d, airline, fn, dep, arr, freq, notes) => {
    const rid = g(o, d);
    if (rid) f(rid, airline, fn, dep, arr, freq, notes);
  };


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

  makeF('Valencia', 'Santo Domingo del Táchira', 'Estelar', '', '12:10', '13:10', 'LU MA JU VI SA DO', 'Itinerario contingencia.');
  makeF('Santo Domingo del Táchira', 'Valencia', 'Estelar', '', '14:10', '15:10', 'LU MA JU VI SA DO', 'Itinerario contingencia.');
  makeF('Valencia', 'Santo Domingo del Táchira', 'Estelar', '', '12:30', '13:30', 'JUEVES', 'Itinerario contingencia.');
  makeF('Santo Domingo del Táchira', 'Valencia', 'Estelar', '', '14:30', '15:30', 'JUEVES', 'Itinerario contingencia.');

  makeF('Valencia', 'Maracaibo', 'Estelar', '', '17:00', '18:00', 'LUNES - MIÉRCOLES', 'Itinerario contingencia.');
  makeF('Maracaibo', 'Valencia', 'Estelar', '', '07:30', '08:30', 'MARTES', 'Itinerario contingencia.');
  makeF('Maracaibo', 'Valencia', 'Estelar', '', '06:30', '07:30', 'JUEVES', 'Itinerario contingencia.');
  makeF('Valencia', 'Maracaibo', 'Estelar', '', '20:30', '21:30', 'VIERNES', 'Itinerario contingencia.');
  makeF('Maracaibo', 'Valencia', 'Estelar', '', '09:30', '10:30', 'SÁBADO', 'Itinerario contingencia.');

  makeF('Valencia', 'Porlamar', 'Estelar', '', '08:30', '09:30', 'JUEVES', 'Itinerario contingencia.');
  makeF('Porlamar', 'Valencia', 'Estelar', '', '10:30', '11:30', 'JUEVES', 'Itinerario contingencia.');
  makeF('Valencia', 'Porlamar', 'Estelar', '', '16:10', '17:10', 'VIERNES - DOMINGO', 'Itinerario contingencia.');
  makeF('Porlamar', 'Valencia', 'Estelar', '', '18:10', '19:10', 'VIERNES - DOMINGO', 'Itinerario contingencia.');
}

module.exports = { seedDatabase };
