function seedDatabase(db) {
  db.clearAllData();

  const r = (...args) => db.addRoute(...args);
  const f = (...args) => db.addFlight(...args);
  const n = (...args) => db.addNews(...args);

  n('Aerocaribe - Políticas de flexibilidad por contingencia',
    'Ante las adversidades que la naturaleza nos ofrece, en AEROCARIBE reafirmamos nuestro compromiso con el país.\n\nPolíticas de flexibilidad:\n• Boletos emitidos con fecha de viaje entre 24/06/2026 y 30/07/2026: cambio sin costo, válido dentro de 365 días de vigencia.\n• Boletos adquiridos a través de agencia de viaje: contactar con su asesor.\n\nContacto: @aerocaribevzla / aerocaribe.aero / +58 (416) 623.74.84',
    'importante', '2026-06-30 18:00:00');
  n('Sasca Airlines - Suspensión de vuelos Caracas-Los Roques',
    'Debido a los recientes acontecimientos en Venezuela, nuestros vuelos Caracas - Los Roques y Los Roques - Caracas, estarán cancelados hasta nuevo aviso.\n\nEl Aeropuerto Nacional de Maiquetía no se encuentra operativo, por ello nuestras operaciones como aerolínea se mantienen a la espera de las instrucciones de las autoridades competentes para su restablecimiento.\n\nPasajeros afectados: reprogramación sin costo, boleto válido por 1 año.\n\nContacto: @sascaa / +58412-3391705',
    'importante', '2026-07-01 22:00:00');
  n('LATAM Airlines - Extensión de flexibilidad por evento sísmico en Caracas',
    'EXTENSIÓN DE FLEXIBILIDAD - Evento sísmico en Caracas (CCS), Venezuela\n\nClientes que viajan desde/hacia/a través de Caracas\nFecha de vuelo original: entre 26 de junio y 31 de julio de 2026\n\nOpciones sin penalización:\n• Cambio de fecha/vuelo/ruta alternativa: sin penalización, 1 año después de fecha original\n• Cambio de origen/destino: sin penalización (aplica diferencia tarifaria). Cambios a Cúcuta, Riohacha y Valencia (VLN) sin penalización y sin diferencia de tarifa\n• Reembolso: sin penalización, hasta 1 año después de fecha original\n\nCódigo: CCS24JUL26\nOSI: CAMBIO DE VOLUNTARIADO DEBIDO A: CCS24JUL26',
    'importante', '2026-06-29 20:00:00');
  n('Air Europa - Operativa Madrid-Valencia por cierre de Maiquetía',
    'Debido al cierre temporal del Aeropuerto Internacional Simón Bolívar de Maiquetía (CCS) como consecuencia de los terremotos registrados en la zona, se actualiza la operativa entre Madrid - Venezuela - Madrid.\n\nVuelos 30JUN / 02JUL / 04JUL: OPERATIVA HACIA/DESDE VALENCIA:\nUX071 MAD-VLN → 15:30-19:05\nUX072 VLN-MAD → 21:05-12:10 (+1 día)\n\nOpciones para quienes no acepten cambio de aeropuerto:\n• Cambio de fecha sin coste (hasta 31 agosto 2026)\n• Cambio de ruta hacia Medellín, Bogotá o Panamá\n• Vale reembolsable\n• Reembolso\n\nActualmente no existe estimación sobre reapertura de CCS.\n\nContacto: CC Parque Aragua / 0414-4505376',
    'importante', '2026-06-29 18:00:00');
  n('Aeropostal Alas de Venezuela - Nuevo itinerario temporal Valencia-Porlamar',
    'Estimados pasajeros,\n\nEn Aeropostal Alas de Venezuela, nuestra prioridad es garantizar la conectividad y el bienestar de nuestros usuarios. Ante las actuales medidas de contingencia operacional, nos complace informarles que hemos reestructurado de manera temporal nuestro itinerario para ofrecer una mayor disponibilidad y flexibilidad en sus viajes.\n\nA partir de la presente fecha, reforzamos nuestro compromiso de servicio operando nuestra ruta Valencia – Porlamar y Porlamar – Valencia.\n\nItinerario:\n\nVALENCIA - PORLAMAR\nSalida 12:00 pm | Llegada 01:00 pm\n\nPORLAMAR - VALENCIA\nSalida 02:00 pm | Llegada 03:00 pm\n\nDOMINGO:\nVALENCIA - PORLAMAR\nSalida 02:00 pm | Llegada 03:00 pm\n\nPORLAMAR - VALENCIA\nSalida 04:00 pm | Llegada 05:00 pm\n\nOficinas:\n• Porlamar (Nueva Esparta): Hotel Puerta del Sol, Calle Los Pinos entre Av. 4 de mayo y Av. Rómulo Betancourt.\n• Valencia (Carabobo): Aeropuerto Internacional Arturo Michelena, Av. Iribarren Borges.\n\nContacto: 0500-2846637 / +58-4227153913 / @aeropostal_ve',
    'importante', '2026-06-30 14:00:00');
  n('Aeropostal Alas de Venezuela - Solidaridad con afectados por sismos',
    'AEROPOSTAL ALAS DE VENEZUELA SE SOLIDARIZA CON LOS AFECTADOS POR LOS RECIENTES SISMOS\n\nMaiquetía, 30 de junio de 2026 – En Aeropostal Alas de Venezuela, C.A., nos unimos al sentimiento de toda la nación para manifestar nuestra profunda y sincera solidaridad con todas las familias y comunidades afectadas por los sismos registrados el pasado 24 de junio. En momentos de dificultad, reafirmamos que somos esperanza y luz que se fortalecen en la unión de todo un pueblo.\n\nA cada ciudadano y a cada familia afectada, queremos asegurarles que no están solos. Como la Aerolínea Pionera de nuestro país, extendemos nuestras alas y nuestros corazones para ser el puente de apoyo que nos permita superar juntos esta adversidad.\n\nCon la fe puesta en nuestra gente y la fuerza de la unión, seguimos adelante, las Alas de Venezuela, siempre contigo.',
    'importante', '2026-06-30 15:00:00');
  n('Aeropostal Alas de Venezuela - Reprogramación sin penalidad ruta Valencia-Porlamar',
    'Aeropostal Alas de Venezuela C.A, con el objetivo de atender y apoyar a la población tras los recientes sismos, informa que ha habilitado vuelos en la ruta Valencia - Porlamar y Porlamar - Valencia.\n\nConscientes de la situación, se exonera el cobro de penalidad por reprogramación en los boletos de esta ruta.\n\nPara reprogramar su vuelo puede dirigirse a las Oficinas Comerciales:\n• Porlamar (Nueva Esparta): Hotel Puerta del Sol, Calle Los Pinos entre Av. 4 de mayo y Av. Rómulo Betancourt.\n• Valencia (Carabobo): Aeropuerto Internacional Arturo Michelena, Av. Iribarren Borges.\n\nAtención Digital:\nCorreos: optimizacion.aeropostal@gmail.com / comercializacion.aeropostal@gmail.com\n(Incluir nombre completo, cédula, localizador y nueva fecha)\n\nPasajeros en Caracas pueden movilizarse a Valencia para abordar su vuelo a Porlamar.\n\nContacto: 0500-2846637 / +58-4227153913 / @aeropostal_ve',
    'importante', '2026-06-30 16:00:00');
  n('Laser Airlines - Flexibilización para pasajeros afectados',
    'En virtud de los recientes acontecimientos como consecuencia del sismo registrado el día 24 de junio, informamos a la colectividad que nuestras operaciones nacionales e internacionales desde y hacia el aeropuerto internacional Simón Bolívar se mantienen a la espera de las instrucciones de las autoridades competentes para su restablecimiento, con el fin de garantizar un pronto y seguro reinicio de los vuelos.\n\nEntre tanto, hemos activado una política de flexibilización para los pasajeros afectados en los vuelos suspendidos:\n\n1. Todos los pasajeros afectados podrán reprogramar su viaje en la misma ruta, sin costo adicional, sujeto a disponibilidad.\n2. Cambio de ruta / destino hacia rutas disponibles de Laser Airlines, sin cobro de penalidad (aplica diferencia de tarifa si la hubiese).\n3. Si el pasajero desiste de su viaje, el boleto tendrá 1 año de validez.\n4. Nota de crédito.\n\nPara información adicional puede comunicarse con su agencia de viajes o con nuestros canales oficiales de atención.\n\nDirección Comercial Caracas, 25 de junio de 2026',
    'importante', '2026-06-29 15:00:00');
  n('LASER Airlines - Recuperación equipajes bodega vuelos 906 CCS-PMV y 970 CCS-BLA (24 junio)',
    'Comunicado #2\n\nMotivado a la cancelación de los vuelos 906 y 970 del pasado 24 de junio por las causas de fuerza mayor ya conocidas, les informamos que hemos recuperado los equipajes de bodega (o facturado) que se encontraban resguardados en la aeronave.\n\nA partir del miércoles 01 de julio se estará realizando la entrega de dichos equipajes en nuestras instalaciones administrativas.\n\nHorario: MIÉRCOLES A VIERNES: 08:30 A.M. A 12:00 PM. Y DE 01:00 PM. A 04:30 PM.\n\nRequisitos: Cédula de Identidad o Pasaporte (copia o imagen) / Ticket de Bag Tag\n\nSi retira un tercero: carta de autorización firmada por el titular + copias de cédulas de ambos.\n\nDirección: Calle California de Las Mercedes, Torre Laser (al lado del GYM 398).',
    'importante', '2026-07-01 16:00:00');
  n('LASER Airlines - Recuperación de equipajes de mano vuelo 2920 CCS-MAD (29 de junio)',
    'Motivado a la cancelación del vuelo 2920 del pasado 24 de junio por las causas de fuerza mayor ya conocidas, les informamos que hemos recuperado los equipajes de mano que se encontraban resguardados en la aeronave.\n\nTras obtener las autorizaciones necesarias para el desembarque de las pertenencias, les notificamos que a partir de este lunes 29 de junio se estará realizando la entrega de dichos equipajes de mano en nuestras Instalaciones administrativas.\n\nPodrán acudir a nuestras oficinas en el siguiente horario:\n\nLUNES A VIERNES: 08:30 A.M. A 12:00 P.M. Y DE 01:00 P.M. A 04:30 P.M.\n\nPara retirar su equipaje, es indispensable presentar:\n\nCédula de Identidad o Pasaporte. (copia o imagen)\n\nNota importante: Si el equipaje de mano va a ser retirado por un tercero, este deberá presentar una carta de autorización debidamente firmada por el titular, acompañada por las copias de la Cédula de Identidad (o Pasaporte) tanto del dueño del equipaje como de la persona autorizada.\n\nDirección: Calle California de Las Mercedes, Torre Laser (al lado del GYM 398).\n\nSeguimos trabajando para brindarles una pronta respuesta sobre el resto del equipaje facturado, para lo cual informaremos por nuestros canales oficiales.\n\nAtentamente, LASER Airlines',
    'importante', '2026-06-29 13:00:00');
  n('Avior Airlines - Suspensión de operaciones y alternativas para pasajeros (25 de junio)',
    'Jueves, 25 de junio de 2026.\n\nUna vez más, expresamos nuestra solidaridad y acompañamiento a nuestros pasajeros, colaboradores y sus familias ante estos momentos de adversidad.\n\nPor instrucciones del Instituto Nacional de Aeronáutica Civil (INAC) las operaciones aéreas desde y hacia Caracas, a través del Aeropuerto Internacional de Maiquetía se mantienen suspendidas.\n\nReafirmamos nuestro compromiso y conscientes de los inconvenientes que esta medida pueda generar, ponemos a disposición las siguientes alternativas para los pasajeros afectados entre el 24 de junio y el 02 de julio de 2026:\n\n• Cambio de fecha y ruta sin penalidad: Reprograme su viaje manteniendo el tipo de ruta original (nacional o internacional), ajustando fecha y hora según disponibilidad.\n• Sin cobros adicionales, válido para cualquier fecha dentro de los 365 días de vigencia de su boleto.\n• Boleto abierto: Si lo prefiere, puede mantener su boleto abierto durante 365 días a partir de la fecha de emisión, para reprogramarlo luego según disponibilidad del vuelo seleccionado.\n• Boletos emitidos por agencias de viaje: Si su boleto fue adquirido a través de una agencia de viaje, deberá contactar directamente a su asesor para gestionar cualquier modificación.\n\nAgradecemos su comprensión y les invitamos a mantenerse atentos a nuestros canales oficiales, donde compartiremos oportunamente cualquier actualización relacionada con la reanudación de los vuelos y las reprogramaciones correspondientes.\n\nAnte cualquier duda les invitamos a contactarnos a través de nuestros canales de atención:\n• 0501-AVIOR-00\n• +1 407 214 4866\n\nTe acompañamos en este momento y estamos para servirte',
    'importante', '2026-06-25 14:00:00');
  n('Avior Airlines - Nuevas frecuencias desde Barcelona (nacional e internacional) desde 3 julio',
    'Martes, 30 de junio de 2026.\n\nEn Avior Airlines, al mantenerse suspendidas las operaciones desde y hacia Caracas a través del Aeropuerto Internacional de Maiquetía, se han habilitado temporalmente nuevas frecuencias desde el Aeropuerto Internacional de Barcelona (Anzoátegui).\n\nVuelos nacionales desde el 3 de julio:\n• Barcelona - Barquisimeto: 07:00-08:00\n• Barquisimeto - Maracaibo: 09:00-09:40\n• Maracaibo - Barquisimeto: 11:00-11:40\n• Barquisimeto - Barcelona: 12:40-13:40\n\nVuelos internacionales (sujeto a autorización autoridades colombianas):\n• Barcelona - Bogotá: 17:00-18:10\n• Bogotá - Barcelona: 19:30-22:40\n• Barcelona - Medellín: 17:00-18:10\n• Medellín - Barcelona: 19:30-22:40\n\nContacto: 0501-AVIOR-00 / +1 (407) 214-4866\nAviorair.com',
    'importante', '2026-06-30 12:00:00');

  r('Barcelona', 'Barquisimeto', 'Ruta Avior Airlines.');
  r('Barquisimeto', 'Barcelona', 'Ruta Avior Airlines.');
  r('Barquisimeto', 'Maracaibo', 'Ruta Avior Airlines.');
  r('Maracaibo', 'Barquisimeto', 'Ruta Avior Airlines.');
  r('Barcelona', 'Bogotá', 'Ruta internacional Avior Airlines.');
  r('Bogotá', 'Barcelona', 'Ruta internacional Avior Airlines.');
  r('Barcelona', 'Medellín', 'Ruta internacional Avior Airlines.');
  r('Medellín', 'Barcelona', 'Ruta internacional Avior Airlines.');

  n('Estelar Latinoamérica - Retiro equipajes vuelo ES895 Caracas-Madrid (24 junio)',
    'Informamos a nuestros pasajeros que, tras las gestiones realizadas, el equipaje correspondiente al vuelo ES895 CARACAS - MADRID del 24 de junio estará disponible para su retiro.\n\nLugar: Oficina comercial Las Mercedes (Torre Estelar, Calle Londres, Las Mercedes, Caracas)\nA partir del: 02 de julio\nHorario: 08:00AM a 05:00PM\n\nLos titulares deben acudir personalmente con cédula de identidad. Si retira un tercero, debe presentar carta de autorización firmada por el titular + copias de cédulas de ambos.',
    'importante', '2026-07-01 14:00:00');
  n('Estelar Latinoamérica - Plan de contingencia ruta Madrid-Valencia (desde 1 julio)',
    'INFORMACIÓN IMPORTANTE\n\nPara garantizar la movilidad de nuestros pasajeros ante la situación que está atravesando el país, hemos habilitado un plan de contingencia con la finalidad de garantizar la conectividad para algunos de nuestros destinos a través de un aeropuerto alterno.\n\nEl vuelo de Estelar Latinoamérica ES895 y ES894, en la ruta MADRID-CARACAS-MADRID, estará operando a partir del 1 de julio desde el Aeropuerto Internacional Arturo Michelena en la ciudad de Valencia (VLN) y hasta el Aeropuerto Adolfo Suárez en la Ciudad de Madrid, España (MAD).\n\nItinerario de contingencia:\n\nMAD → VLN | Salida 14:40 | Llegada 19:00\nVLN → MAD | Salida 22:00 | Llegada 13:15 (+1 día)\n\nFrecuencias: MIÉRCOLES y VIERNES\n\nContacto:\n• WhatsApp: +58 414 378 3527\n• Correo: calidad.servicio@flyestelar.com\n• Call Center: 0501 3783527\n\nOpciones disponibles:\n1. Reprogramación de fecha sin costo adicional.\n2. Cambio de ruta hacia otros destinos sin cobro de penalidad (puede aplicar diferencia de tarifa).\n3. Validez de un año.\n4. Bono de crédito.',
    'importante', '2026-06-30 18:00:00');
  n('Estelar Latinoamérica - Traslado terrestre gratuito Valencia-Caracas',
    'ANUNCIO IMPORTANTE\n\nComo parte del plan de contingencia en relación a las operaciones internacionales, hemos habilitado la opción de traslado vía terrestre de nuestros pasajeros desde el Aeropuerto Arturo Michelena en la ciudad de Valencia y hasta la ciudad de Caracas, calle Londres, Torre Aerolíneas Estelar, Las Mercedes.\n\nAquellos pasajeros del vuelo ES894 en la ruta MAD-VLN, pueden utilizar el servicio de forma gratuita.\n\nEstamos trabajando de manera constante para ofrecer a nuestros pasajeros opciones que les permitan continuar con sus itinerarios de viajes.\n\nReservas: 04242364555 / www.flyestelar.com / 0501-3783527',
    'importante', '2026-06-30 18:30:00');
  n('Estelar Latinoamérica - Itinerario Madrid-Valencia (miércoles y viernes)',
    'MADRID → VALENCIA\nSalida: 14:40 | Llegada: 19:00\nMIÉRCOLES - VIERNES\n\nVALENCIA → MADRID\nSalida: 22:00 | Llegada: 13:15 (+1 día)\nMIÉRCOLES - VIERNES\n\nReservas: 04242364555 / www.flyestelar.com / 0501-3783527',
    'importante', '2026-06-30 19:00:00');
  n('Estelar - Plan de contingencia Valencia',
    'Para garantizar la movilidad de nuestros pasajeros ante la situación que está atravesando el país, hemos habilitado un plan de contingencia con la finalidad de garantizar la conectividad para algunos de nuestros destinos a través del Aeropuerto Arturo Michelena en la ciudad de Valencia (VLN) con salidas y llegadas hacia Santo Domingo del Táchira (STD), Maracaibo (MAR) y Porlamar (PMV).\n\nNota: Debido a las condiciones antes mencionadas, los itinerarios pueden sufrir algunas modificaciones.\n\nOpciones disponibles:\n1. Reprogramación de fecha sin costo adicional.\n2. Cambio de ruta hacia otros destinos sin cobro de penalidad (puede aplicar diferencia de tarifa).\n3. Validez de un año.\n4. Bono de crédito.\n\nContacto:\n• WhatsApp: +58 414 378 3527\n• Correo: calidad.servicio@flyestelar.com\n• Call Center: 0501 3783527',
    'importante', '2026-06-29 14:30:00');
  n('Plus Ultra Líneas Aéreas - Reanudación de operaciones 30 de junio',
    'Estimados Agentes de Viaje,\n\nNos unimos al gran duelo que vive el país en este momento, estamos seguros que saldremos adelante y fortalecidos de esta situación.\n\nLes informamos formalmente la reanudación de nuestras operaciones hacia y desde Venezuela a partir del próximo martes 30 de junio de 2026. Con el firme compromiso de mantener la conectividad de nuestros pasajeros, los vuelos operarán de manera temporal a través del Aeropuerto Internacional Arturo Michelena de la Ciudad de Valencia (VLN).\n\nRutas:\n• Madrid – Valencia (VLN): Vuelo PU701\n• Valencia (VLN) – Madrid: Vuelo PU702\n• Tenerife (Norte) – Valencia (VLN): Vuelo PU711\n• Valencia (VLN) – Tenerife (Norte): Vuelo PU712\n\n⚠️ IMPORTANTE: Todos los pasajeros deben presentarse en el aeropuerto de Valencia (VLN) con un mínimo de 4 horas de anticipación.\n\nAlternativas para pasajeros afectados:\n1. Aceptación de cambio de itinerario (sin coste)\n2. Cambio de fecha (gratuito, misma temporada, hasta 6 meses)\n3. Cambio de ruta (exento penalización, sujeto a diferencia tarifaria)\n4. Emisión de bono (válido 1 año, no reembolsable)\n\nGestión: Enviar correo a callcentre@plusultra.com con asunto: "SI ACEPTO" o "NO ACEPTO" + número de billete. Para bono: bonos@plusultra.com con asunto "QUIERO BONO" + número de billete.\n\nPlazo máximo: 2 de julio de 2026.\n\nSaludos cordiales,\nPlus Ultra Líneas Aéreas\nLazos que nos Unen',
    'importante', '2026-06-29 14:00:00');
  n('Plus Ultra - Itinerario de contingencia Madrid/Valencia y Tenerife (julio 2026)',
    'Información vuelos desde/hacia Venezuela:\n\n30JUN | PU701 | MAD→VLN | 13:00-16:30\n01JUL | PU702 | VLN→MAD | 10:00-01:00(+1)\n02JUL | PU701 | MAD→VLN | 13:00-16:30\n02JUL | PU702 | VLN→MAD | 19:00-09:55(+1)\n04JUL | PU701 | MAD→VLN | 13:00-16:30\n04JUL | PU712 | VLN→TFN | 20:30-08:50(+1)\n05JUL | PU711 | TFN→VLN | 12:20-14:55\n05JUL | PU702 | VLN→MAD | 19:00-09:55(+1)\n07JUL | PU701 | MAD→VLN | 13:00-16:30\n07JUL | PU702 | VLN→MAD | 19:00-09:55(+1)\n09JUL | PU701 | MAD→VLN | 13:00-16:30\n09JUL | PU702 | VLN→MAD | 19:00-09:55(+1)\n11JUL | PU701 | MAD→VLN | 13:00-16:30\n11JUL | PU712 | VLN→TFN | 20:30-08:50(+1)\n12JUL | PU711 | TFN→VLN | 12:20-14:55\n12JUL | PU702 | VLN→MAD | 19:00-09:55(+1)\n\nVuelos a partir del 12/07 se publicarán próximamente.',
    'importante', '2026-07-01 22:00:00');
  n('Rutaca Airlines - Retiro de equipajes vuelo 300 Caracas-Porlamar',
    'Informamos a los pasajeros del vuelo 300 de Caracas - Porlamar, cancelado tras los sismos ocurridos el pasado 24 de junio, que pueden proceder al retiro de sus equipajes.\n\nOficinas de Rutaca Airlines en el Aeropuerto Internacional Arturo Michelena de Valencia.\n\nHorario de atenci\u00f3n: De lunes a domingo de 8:30 a.m. a 4:30 p.m.\n\nPresentar su pase de abordar (boarding pass) y documento de identidad.',
    'importante', '2026-06-30 21:00:00');
  n('Rutaca Airlines - Retiro equipajes vuelos 306 CCS-Pto Ordaz y 345 CCS-Maturín',
    'Informamos a los pasajeros de los vuelos cancelados tras el sismo ocurrido el pasado 24 de junio, que pueden proceder a contactarnos para el retiro de sus equipajes.\n\nVuelo 306: Caracas - Puerto Ordaz\nVuelo 345: Caracas - Maturín\n\nContacto: calidaddeservicio@flyrutaca.com\n\nPresentar ticket de equipaje y documento de identidad. Si retira un tercero: autorización firmada + copias de cédulas de ambos.',
    'importante', '2026-07-01 23:00:00');
  n('Rutaca Airlines - Activación parcial de operaciones desde Valencia (1 julio)',
    'Rutaca Airlines informa a todos nuestros pasajeros que hemos activado parcialmente nuestras operaciones desde nuestra base alterna Aeropuerto Internacional Arturo Michelena de Valencia.\n\nEstamos desplegando rutas y fortaleciendo frecuencias para garantizar la conectividad en cada tramo programado.\n\nRutaca Airlines reafirma su compromiso con la seguridad, puntualidad y calidad en cada una de nuestras operaciones.',
    'importante', '2026-07-01 18:00:00');
  n('Rutaca Airlines - Itinerarios nacionales desde Valencia',
    'Itinerarios nacionales de Rutaca Airlines a partir del 1 de julio:\n\n1 DE JULIO:\nValencia → Santo Domingo del Táchira | MIÉ 9:30-10:30\nSanto Domingo del Táchira → Valencia | MIÉ 11:30-12:30\n\nDESDE 1 JULIO:\nValencia → Porlamar | MIÉ-DOM 18:00-19:00\nPorlamar → Valencia | LUN-JUE 17:30-18:10\n\nDESDE 2 JULIO:\nValencia → Porlamar | JUE-DOM 8:30-9:30\nPorlamar → Valencia | DOM 16:10-17:10 | JUE 17:30-18:30\nValencia → Puerto Ordaz | MAR-JUE-SÁB 18:00-19:00\nPuerto Ordaz → Valencia | MIÉ-VIE-DOM 7:00-8:00\nPorlamar → Puerto Ordaz | LUN-JUE 7:00-7:50\nPuerto Ordaz → Porlamar | LUN-JUE 15:40-16:30\nValencia → Maracaibo | MAR-JUE-DOM 19:00-20:00\nMaracaibo → Valencia | LUN-MIÉ-VIE 6:00-7:00\n\nDESDE 3 JULIO:\nValencia → Porlamar | VIE 13:40-14:40\nPorlamar → Valencia | VIE 15:40-16:40\nValencia → Santo Domingo del Táchira | LUN-MAR-VIE-SÁB 9:30-10:30\nSanto Domingo del Táchira → Valencia | MAR-VIE-SÁB 11:30-12:30 | LUN 12:00-13:00\nValencia → Maturín | MIÉ-VIE 8:30-9:30\nMaturín → Valencia | MIÉ-VIE 10:30-11:30\nValencia → Barcelona | LUN-MIÉ-VIE-DOM 17:30-18:20\nBarcelona → Puerto Ordaz | LUN-MIÉ-VIE-DOM 19:20-20:00\n\nDESDE 4 JULIO:\nPuerto Ordaz → Barcelona | LUN-MAR-JUE-SÁB 6:00-6:40\nBarcelona → Puerto Ordaz | LUN-MAR-JUE-SÁB 7:30-8:10\nValencia → Porlamar | MAR-SÁB 13:40-14:40\nPorlamar → Valencia | MAR-SÁB 15:40-16:40\n\nCall Center: 0500-RUTACA-1 / 0500-788222-1 (7am-7pm)\nWhatsApp: 0424-8225451 / 0414-6245800 / 0414-8609908 / 0414-7000000 / 0424-8225428',
    'importante', '2026-07-01 19:00:00');
  n('Rutaca Airlines - Itinerarios internacionales desde Valencia',
    'Itinerarios internacionales de Rutaca Airlines:\n\nDESDE 2 JULIO:\nPuerto Ordaz → Boa Vista | LUN-JUE 9:00-10:10\nBoa Vista → Puerto Ordaz | LUN-JUE 12:45-13:55\nPorlamar → Puerto España | JUE-DOM 11:30-12:10\nPuerto España → Porlamar | JUE-DOM 13:40-14:20\n\nDESDE 3 JULIO:\nValencia → Santiago de Cuba | VIE 10:00-12:15\nSantiago de Cuba → Valencia | VIE 13:30-17:30\n\nDESDE 6 JULIO:\nValencia → La Habana | LUN 10:00-14:50\nLa Habana → Valencia | LUN 15:40-20:30\n\nDESDE 9 JULIO:\nValencia → Punta Cana | JUE-DOM 10:00-11:30\nPunta Cana → Valencia | JUE-DOM 13:30-14:50\n\nContacto: 0500-RUTACA-1 / 0500-788222-1\nWhatsApp: 0424-8225451 / 0414-6245800 / 0414-8609908 / 0414-7000000 / 0424-8225428\nHorario atención: 7:00 am a 7:00 pm',
    'importante', '2026-07-01 20:00:00');
  n('Avianca - Operación temporal Bogotá-Valencia (1 julio)',
    'Habilitamos temporalmente nuestra operación entre Bogotá y Valencia, Venezuela. Hasta el 10 de julio, de manera temporal, tendremos dos frecuencias diarias.\n\nBOGOTÁ → VALENCIA: 07:35-10:35\nVALENCIA → BOGOTÁ: 12:27-13:10\nBOGOTÁ → VALENCIA: 23:20-02:20 (+1 día)\nVALENCIA → BOGOTÁ: 04:17-05:00\n\nMedidas de protección (viajes entre 24 jun y 15 jul):\n• Vuela vía Valencia: operaciones desde/hacia este destino\n• Cambia tu ruta en Colombia: Cúcuta o Riohacha\n• Reprograma tu viaje: hasta 31 agosto 2026\n• Reembolso total de trayectos sin utilizar\n\nContinuamos transportando rescatistas, médicos y ayuda humanitaria.',
    'importante', '2026-07-01 22:00:00');
  n('Rutaca Airlines - Plan de contingencia 28 de junio',
    'Avianca habilitó, de manera temporal, la venta de vuelos entre Bogotá y Valencia inicialmente hasta el próximo 10 de julio con tarifas especiales, periodo que podrá ser extendido dependiendo de la evolución de la contingencia en el Aeropuerto Internacional Simón Bolívar de Maiquetía.\n\nEsta medida permitirá mantener la conectividad aérea entre Colombia y Venezuela mientras se reestablecen las operaciones en Maiquetía, así como continuar transportando rescatistas, médicos y personal de atención de emergencias y ayuda humanitaria.\n\nAvianca ofrecerá dos frecuencias diarias, operadas en aviones de la flota A320.\n\nLos tiquetes están disponibles a la venta con tarifas especiales a través de avianca.com, la aplicación móvil, el Contact Center, puntos de venta físicos y agencias de viajes.\n\nComo parte de sus acciones para apoyar a Venezuela, Avianca continuará facilitando el traslado de rescatistas, personal médico y carga humanitaria, en coordinación con aliados como la Cruz Roja Colombiana y la Patrulla Aérea Civil Colombiana.',
    'importante', '2026-06-28 18:00:00');
  n('Rutaca Airlines - Plan de contingencia 28 de junio',
    'Rutaca Airlines ha activado un plan de contingencia realizando vuelos a través de aeropuertos alternos.\n\nDirectrices:\n• Reprogramación sin costo\n• Boleto válido por 1 año\n\nWhatsApp: 0424-9148669 / 0414-3659083\nCorreo: soporteagencias@flyrutaca.com',
    'importante', '2026-06-28 16:00:00');
  n('Turpial Airlines - Vuelo especial Valencia - San Antonio del Táchira (4 de julio)',
    'Vuelo especial\nFrecuencia: Sábado 4 de julio\nValencia - San Antonio del Táchira\nSan Antonio del Táchira - Valencia\n\nReservas a través de nuestros canales oficiales.',
    'importante', '2026-06-30 20:00:00');
  n('Turpial Airlines - Vuelo especial Valencia - Bogotá (5 de julio)',
    'Vuelo especial\nFrecuencia: Domingo 5 de julio\nValencia - Bogotá\nBogotá - Valencia\n\nReservas a través de nuestros canales oficiales.',
    'importante', '2026-06-30 20:00:00');
  n('Aeropostal Alas de Venezuela - Vuelos especiales 28 de junio',
    'Aeropostal Alas de Venezuela ha reestructurado de manera temporal sus operaciones para garantizar el traslado de todos nuestros usuarios.\n\nFlexibilidades:\n• Reprogramación sin penalidades ni diferencias de tarifa.\n• Boleto válido por 1 año.\n\nImportante: Pasajeros Caracas-Porlamar-Caracas pueden volar desde/hacia Valencia sin costo adicional.\n\nOficinas:\n• Porlamar: Hotel Puerta del Sol\n• Valencia: Aeropuerto Arturo Michelena',
    'importante', '2026-06-28 10:00:00');
  n('Venezolana - Vuelo contingencia Barquisimeto-Panamá (3 julio)',
    'Comprometidos con garantizar el traslado y la conectividad de nuestros pasajeros, ejecutaremos un vuelo de contingencia el próximo viernes 3 de julio del 2026.\n\nMARACAIBO - BARQUISIMETO:\nV1242 | Maracaibo → Barquisimeto | 08:00-08:30\nV1241 | Barquisimeto → Maracaibo | 17:00-17:30\n\nBARQUISIMETO - PANAMÁ:\nV422 | Barquisimeto → Panamá | 10:00-11:00\nV423 | Panamá → Barquisimeto | 12:00-15:00\n\nContacto:\nWhatsApp: +58 424 639 02 81\nTeléfono: 0212 819 06 00\nCall Center: callcenter@venezolana.aero\nWeb: www.venezolana.aero',
    'importante', '2026-07-01 12:00:00');
  n('Conviasa - Reestructuración total de operaciones hacia Valencia (1 de julio)',
    'El Consorcio Venezolano de Industrias Aeronáuticas y Servicios Aéreos (Conviasa) informa a todos sus pasajeros y al público en general que, debido a las contingencias de fuerza mayor ocasionadas por los sismos registrados el pasado 24 de junio, y con el fin de garantizar la máxima seguridad en nuestras operaciones, se ha dispuesto la reestructuración temporal de todos nuestros vuelos.\n\nA partir de este miércoles 01 de julio de 2026, todas las operaciones aéreas comerciales programadas con origen y destino al Aeropuerto Internacional "Simón Bolívar" de Maiquetía, serán trasladadas y servidas de manera excepcional en el Aeropuerto Internacional Arturo Michelena de la ciudad de Valencia, estado Carabobo.\n\nItinerario de contingencia:\n\nV01000 | Valencia → Porlamar | 07:25-08:25\nV02254 | Valencia → Porlamar | 11:45-12:55\nV0351 | Valencia → Porlamar | 12:50-13:50\nV02254 | Porlamar → Valencia | 09:25-10:40\nV0350 | Porlamar → Valencia | 10:50-11:50\nV01007 | Porlamar → Valencia | 15:50-16:50\nV0037 | Maturín → Valencia | 14:50-15:40\n\nCheck-in: presentarse en mostradores de Valencia con mínimo 2 horas de anticipación.',
    'importante', '2026-07-01 08:00:00');
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
    'Porlamar','Maracaibo', 'Maracaibo','Porlamar', 'Valencia','Porlamar', 'Maturín','Valencia', 'Valencia','Maturín'
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
  for (const [o, d] of [['Porlamar','Puerto Ordaz'],['Puerto Ordaz','Valencia'],['Puerto Ordaz','Barcelona'],['Barcelona','Puerto Ordaz'],['Barcelona','Valencia'],['Valencia','Barcelona'],['Valencia','Santiago de Cuba'],['Santiago de Cuba','Valencia'],['Valencia','La Habana'],['La Habana','Valencia']]) {
    r(o, d, 'Ruta Rutaca Airlines.');
  }

  for (const [o, d] of [['Madrid','Valencia'],['Valencia','Madrid'],['Tenerife','Valencia'],['Valencia','Tenerife']]) {
    r(o, d, 'Ruta internacional Plus Ultra Líneas Aéreas.');
  }

  r('Bogotá', 'Valencia', 'Ruta Avianca.');
  r('Valencia', 'Bogotá', 'Ruta Avianca.');
  r('Barquisimeto', 'Panamá', 'Ruta internacional Venezolana.');
  r('Panamá', 'Barquisimeto', 'Ruta internacional Venezolana.');

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

  makeF('Madrid', 'Valencia', 'Plus Ultra Líneas Aéreas', 'PU701', '13:00', '16:30', '30 jun, 2, 4, 7, 9 y 11 de julio', 'Vuelo reprogramado por contingencia.');
  makeF('Valencia', 'Madrid', 'Plus Ultra Líneas Aéreas', 'PU702', '10:00', '01:00 (+1 día)', '1 de julio', 'Vuelo reprogramado por contingencia.');
  makeF('Valencia', 'Madrid', 'Plus Ultra Líneas Aéreas', 'PU702', '19:00', '09:55 (+1 día)', '2, 5, 7, 9 y 12 de julio', 'Vuelo reprogramado por contingencia.');
  makeF('Tenerife', 'Valencia', 'Plus Ultra Líneas Aéreas', 'PU711', '12:20', '14:55', '5 y 12 de julio', 'Vuelo reprogramado por contingencia.');
  makeF('Valencia', 'Tenerife', 'Plus Ultra Líneas Aéreas', 'PU712', '20:30', '08:50 (+1 día)', '4 y 11 de julio', 'Vuelo reprogramado por contingencia. Conexión Madrid.');

  makeF('Bogotá', 'Valencia', 'Avianca', '', '07:35', '10:35', 'Diaria', 'Vuelo temporal por contingencia. Válido hasta 10 de julio.');
  makeF('Bogotá', 'Valencia', 'Avianca', '', '23:20', '02:20 (+1 día)', 'Diaria', 'Vuelo temporal por contingencia. Válido hasta 10 de julio.');
  makeF('Valencia', 'Bogotá', 'Avianca', '', '12:27', '13:10', 'Diaria', 'Vuelo temporal por contingencia. Válido hasta 10 de julio.');
  makeF('Valencia', 'Bogotá', 'Avianca', '', '04:17', '05:00', 'Diaria', 'Vuelo temporal por contingencia. Válido hasta 10 de julio.');

  makeF('Valencia', 'Porlamar', 'Aeropostal Alas de Venezuela', '', '12:00', '13:00', 'LU MA JU VI', 'Nuevo itinerario temporal.');
  makeF('Porlamar', 'Valencia', 'Aeropostal Alas de Venezuela', '', '14:00', '15:00', 'LU MA JU VI', 'Nuevo itinerario temporal.');
  makeF('Valencia', 'Porlamar', 'Aeropostal Alas de Venezuela', '', '14:00', '15:00', 'DOMINGO', 'Nuevo itinerario temporal.');
  makeF('Porlamar', 'Valencia', 'Aeropostal Alas de Venezuela', '', '16:00', '17:00', 'DOMINGO', 'Nuevo itinerario temporal.');

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

  makeF('Madrid', 'Valencia', 'Estelar Latinoamérica', 'ES894', '14:40', '19:00', 'MIÉRCOLES - VIERNES', 'Plan de contingencia desde 1 julio.');
  makeF('Valencia', 'Madrid', 'Estelar Latinoamérica', 'ES895', '22:00', '13:15 (+1 día)', 'MIÉRCOLES - VIERNES', 'Plan de contingencia desde 1 julio.');
  makeF('Valencia', 'Porlamar', 'Conviasa', 'V01000', '07:25', '08:25', 'DIARIO', 'Reestructuración temporal desde 1 julio.');
  makeF('Valencia', 'Porlamar', 'Conviasa', 'V02254', '11:45', '12:55', 'DIARIO', 'Reestructuración temporal desde 1 julio.');
  makeF('Valencia', 'Porlamar', 'Conviasa', 'V0351', '12:50', '13:50', 'DIARIO', 'Reestructuración temporal desde 1 julio.');
  makeF('Porlamar', 'Valencia', 'Conviasa', 'V02254', '09:25', '10:40', 'DIARIO', 'Reestructuración temporal desde 1 julio.');
  makeF('Porlamar', 'Valencia', 'Conviasa', 'V0350', '10:50', '11:50', 'DIARIO', 'Reestructuración temporal desde 1 julio.');
  makeF('Porlamar', 'Valencia', 'Conviasa', 'V01007', '15:50', '16:50', 'DIARIO', 'Reestructuración temporal desde 1 julio.');
  makeF('Maturín', 'Valencia', 'Conviasa', 'V0037', '14:50', '15:40', 'DIARIO', 'Reestructuración temporal desde 1 julio.');
  makeF('Valencia', 'Santo Domingo del Táchira', 'Rutaca Airlines', '', '09:30', '10:30', '1 JULIO (MIÉ)', 'Plan de contingencia.');
  makeF('Santo Domingo del Táchira', 'Valencia', 'Rutaca Airlines', '', '11:30', '12:30', '1 JULIO (MIÉ)', 'Plan de contingencia.');
  makeF('Valencia', 'Porlamar', 'Rutaca Airlines', '', '18:00', '19:00', 'MIÉ-DOM', 'Itinerario desde 1 julio.');
  makeF('Porlamar', 'Valencia', 'Rutaca Airlines', '', '17:30', '18:10', 'LUN-JUE', 'Itinerario desde 1 julio.');
  makeF('Valencia', 'Porlamar', 'Rutaca Airlines', '', '08:30', '09:30', 'JUE-DOM', 'Itinerario desde 2 julio.');
  makeF('Porlamar', 'Valencia', 'Rutaca Airlines', '', '16:10', '17:10', 'DOM', 'Itinerario desde 2 julio.');
  makeF('Porlamar', 'Valencia', 'Rutaca Airlines', '', '17:30', '18:30', 'JUE', 'Itinerario desde 2 julio.');
  makeF('Valencia', 'Puerto Ordaz', 'Rutaca Airlines', '', '18:00', '19:00', 'MAR-JUE-SÁB', 'Itinerario desde 2 julio.');
  makeF('Puerto Ordaz', 'Valencia', 'Rutaca Airlines', '', '07:00', '08:00', 'MIÉ-VIE-DOM', 'Itinerario desde 2 julio.');
  makeF('Porlamar', 'Puerto Ordaz', 'Rutaca Airlines', '', '07:00', '07:50', 'LUN-JUE', 'Itinerario desde 2 julio.');
  makeF('Puerto Ordaz', 'Porlamar', 'Rutaca Airlines', '', '15:40', '16:30', 'LUN-JUE', 'Itinerario desde 2 julio.');
  makeF('Valencia', 'Maracaibo', 'Rutaca Airlines', '', '19:00', '20:00', 'MAR-JUE-DOM', 'Itinerario desde 2 julio.');
  makeF('Maracaibo', 'Valencia', 'Rutaca Airlines', '', '06:00', '07:00', 'LUN-MIÉ-VIE', 'Itinerario desde 2 julio.');
  makeF('Valencia', 'Porlamar', 'Rutaca Airlines', '', '13:40', '14:40', 'VIE', 'Itinerario desde 3 julio.');
  makeF('Porlamar', 'Valencia', 'Rutaca Airlines', '', '15:40', '16:40', 'VIE', 'Itinerario desde 3 julio.');
  makeF('Valencia', 'Santo Domingo del Táchira', 'Rutaca Airlines', '', '09:30', '10:30', 'LUN-MAR-VIE-SÁB', 'Itinerario desde 3 julio.');
  makeF('Santo Domingo del Táchira', 'Valencia', 'Rutaca Airlines', '', '11:30', '12:30', 'MAR-VIE-SÁB', 'Itinerario desde 3 julio.');
  makeF('Santo Domingo del Táchira', 'Valencia', 'Rutaca Airlines', '', '12:00', '13:00', 'LUN', 'Itinerario desde 3 julio.');
  makeF('Valencia', 'Maturín', 'Rutaca Airlines', '', '08:30', '09:30', 'MIÉ-VIE', 'Itinerario desde 3 julio.');
  makeF('Maturín', 'Valencia', 'Rutaca Airlines', '', '10:30', '11:30', 'MIÉ-VIE', 'Itinerario desde 3 julio.');
  makeF('Valencia', 'Barcelona', 'Rutaca Airlines', '', '17:30', '18:20', 'LUN-MIÉ-VIE-DOM', 'Itinerario desde 3 julio.');
  makeF('Barcelona', 'Puerto Ordaz', 'Rutaca Airlines', '', '19:20', '20:00', 'LUN-MIÉ-VIE-DOM', 'Itinerario desde 3 julio.');
  makeF('Puerto Ordaz', 'Barcelona', 'Rutaca Airlines', '', '06:00', '06:40', 'LUN-MAR-JUE-SÁB', 'Itinerario desde 4 julio.');
  makeF('Barcelona', 'Puerto Ordaz', 'Rutaca Airlines', '', '07:30', '08:10', 'LUN-MAR-JUE-SÁB', 'Itinerario desde 4 julio.');
  makeF('Valencia', 'Porlamar', 'Rutaca Airlines', '', '13:40', '14:40', 'MAR-SÁB', 'Itinerario desde 4 julio.');
  makeF('Porlamar', 'Valencia', 'Rutaca Airlines', '', '15:40', '16:40', 'MAR-SÁB', 'Itinerario desde 4 julio.');
  makeF('Valencia', 'Barcelona', 'Rutaca Airlines', '', '17:30', '18:20', '9 JULIO (JUE)', 'Únicamente 9 julio.');
  makeF('Barcelona', 'Puerto Ordaz', 'Rutaca Airlines', '', '19:20', '20:00', '9 JULIO (JUE)', 'Únicamente 9 julio.');
  makeF('Puerto Ordaz', 'Barcelona', 'Rutaca Airlines', '', '06:00', '06:40', '10 JULIO (VIE)', 'Únicamente 10 julio.');
  makeF('Barcelona', 'Valencia', 'Rutaca Airlines', '', '07:30', '08:10', '10 JULIO (VIE)', 'Únicamente 10 julio.');
  makeF('Puerto Ordaz', 'Boa Vista', 'Rutaca Airlines', '', '09:00', '10:10', 'LUN-JUE', 'Itinerario internacional desde 2 julio.');
  makeF('Boa Vista', 'Puerto Ordaz', 'Rutaca Airlines', '', '12:45', '13:55', 'LUN-JUE', 'Itinerario internacional desde 2 julio.');
  makeF('Porlamar', 'Puerto España', 'Rutaca Airlines', '', '11:30', '12:10', 'JUE-DOM', 'Itinerario internacional desde 2 julio.');
  makeF('Puerto España', 'Porlamar', 'Rutaca Airlines', '', '13:40', '14:20', 'JUE-DOM', 'Itinerario internacional desde 2 julio.');
  makeF('Valencia', 'Santiago de Cuba', 'Rutaca Airlines', '', '10:00', '12:15', 'VIE', 'Itinerario internacional desde 3 julio.');
  makeF('Santiago de Cuba', 'Valencia', 'Rutaca Airlines', '', '13:30', '17:30', 'VIE', 'Itinerario internacional desde 3 julio.');
  makeF('Valencia', 'La Habana', 'Rutaca Airlines', '', '10:00', '14:50', 'LUN', 'Itinerario internacional desde 6 julio.');
  makeF('La Habana', 'Valencia', 'Rutaca Airlines', '', '15:40', '20:30', 'LUN', 'Itinerario internacional desde 6 julio.');
  makeF('Valencia', 'Punta Cana', 'Rutaca Airlines', '', '10:00', '11:30', 'JUE-DOM', 'Itinerario internacional desde 9 julio.');
  makeF('Punta Cana', 'Valencia', 'Rutaca Airlines', '', '13:30', '14:50', 'JUE-DOM', 'Itinerario internacional desde 9 julio.');
  makeF('Madrid', 'Valencia', 'Air Europa', 'UX071', '15:30', '19:05', '30JUN/02JUL/04JUL', 'Operativa por cierre de CCS.');
  makeF('Valencia', 'Madrid', 'Air Europa', 'UX072', '21:05', '12:10 (+1 día)', '30JUN/02JUL/04JUL', 'Operativa por cierre de CCS.');
  makeF('Maracaibo', 'Barquisimeto', 'Venezolana', 'V1242', '08:00', '08:30', 'VIERNES 3 DE JULIO', 'Vuelo de contingencia.');
  makeF('Barquisimeto', 'Maracaibo', 'Venezolana', 'V1241', '17:00', '17:30', 'VIERNES 3 DE JULIO', 'Vuelo de contingencia.');
  makeF('Barquisimeto', 'Panamá', 'Venezolana', 'V422', '10:00', '11:00', 'VIERNES 3 DE JULIO', 'Vuelo de contingencia.');
  makeF('Panamá', 'Barquisimeto', 'Venezolana', 'V423', '12:00', '15:00', 'VIERNES 3 DE JULIO', 'Vuelo de contingencia.');
  makeF('Barcelona', 'Barquisimeto', 'Avior Airlines', '', '07:00', '08:00', 'L-M-V-D', 'Plan de contingencia desde 3 JUL.');
  makeF('Barquisimeto', 'Maracaibo', 'Avior Airlines', '', '09:00', '09:40', 'L-M-V-D', 'Plan de contingencia desde 3 JUL.');
  makeF('Maracaibo', 'Barquisimeto', 'Avior Airlines', '', '11:00', '11:40', 'L-M-V-D', 'Plan de contingencia desde 3 JUL.');
  makeF('Barquisimeto', 'Barcelona', 'Avior Airlines', '', '12:40', '13:40', 'L-M-V-D', 'Plan de contingencia desde 3 JUL.');
  makeF('Barcelona', 'Bogotá', 'Avior Airlines', '', '17:00', '18:10', 'L-M-V', 'Plan de contingencia desde 3 JUL. Sujeto a autorización.');
  makeF('Bogotá', 'Barcelona', 'Avior Airlines', '', '19:30', '22:40', 'L-M-V', 'Plan de contingencia desde 3 JUL. Sujeto a autorización.');
  makeF('Barcelona', 'Medellín', 'Avior Airlines', '', '17:00', '18:10', 'M-S', 'Plan de contingencia desde 3 JUL. Sujeto a autorización.');
  makeF('Medellín', 'Barcelona', 'Avior Airlines', '', '19:30', '22:40', 'M-S', 'Plan de contingencia desde 3 JUL. Sujeto a autorización.');
}

module.exports = { seedDatabase };
