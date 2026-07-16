function seedDatabase(db) {
  db.clearAllDataIncludingVisits();

  const r = (...args) => db.addRoute(...args);
  const f = (...args) => db.addFlight(...args);
  const n = (...args) => db.addNews(...args);

  n('Aerocaribe - Políticas de flexibilidad por contingencia',
    'Ante las adversidades que la naturaleza nos ofrece, en AEROCARIBE reafirmamos nuestro compromiso con el país.\n\nPolíticas de flexibilidad:\n• Boletos emitidos con fecha de viaje entre 24/06/2026 y 30/07/2026: cambio sin costo, válido dentro de 365 días de vigencia.\n• Boletos adquiridos a través de agencia de viaje: contactar con su asesor.\n\nContacto: @aerocaribevzla / aerocaribe.aero / +58 (416) 623.74.84',
    'importante', '2026-06-30 18:00:00');
  n('Sasca Airlines - Suspensión de vuelos Caracas-Los Roques',
    'Debido a los recientes acontecimientos en Venezuela, nuestros vuelos Caracas - Los Roques y Los Roques - Caracas, estarán cancelados hasta nuevo aviso.\n\nEl Aeropuerto Nacional de Maiquetía no se encuentra operativo, por ello nuestras operaciones como aerolínea se mantienen a la espera de las instrucciones de las autoridades competentes para su restablecimiento.\n\nPasajeros afectados: reprogramación sin costo, boleto válido por 1 año.\n\nContacto: @sascaa / +58412-3391705',
    'importante', '2026-07-01 22:00:00');
  n('Copa Airlines - Vuelos adicionales desde/hacia Valencia hasta 15 julio',
    'Extenderemos la operación de vuelos adicionales desde y hacia Valencia hasta el 15 de julio de 2026, como alternativa para los pasajeros que requieran movilizarse entre Panamá y Venezuela.\n\nOperación regular:\nCM250 | PTY→VLN | 11:43-14:53\nCM251 | VLN→PTY | 16:03-17:21\n\nOperaciones adicionales:\nCM603 | PTY→VLN | 09:03-12:13\nCM605 | VLN→PTY | 13:43-15:01\nCM447 | PTY→VLN | 13:33-16:43\nCM437 | VLN→PTY | 18:03-19:21\n\nVuelos desde/hacia Caracas continúan suspendidos. Cambios o reembolsos sin costo.\n\nVerifique en copa.com',
    'importante', '2026-07-01 22:00:00');
  n('Copa Airlines - Nueva regulación DOT reembolsos desde/hacia Estados Unidos (24 oct 2024)',
    'COM-24-191 — Jueves, 24 de octubre de 2024\n\nNueva regulación para boletos con itinerarios desde/hacia Estados Unidos.\n\nA partir del 28 de octubre de 2024, se implementa la nueva regulación DOT: pasajeros afectados por cancelación o cambio de itinerario que cause adelanto o demora de 6 horas o más, en vuelos desde/hacia EE.UU., tienen derecho al reembolso automático, incluyendo impuestos y cargos por servicios adicionales.\n\nAplica para todos los boletos emitidos por Copa Airlines (placa 230).\n\nMás información: copa.com',
    'informativo', '2024-10-24 12:00:00');
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
  n('LASER Airlines - Nueva ruta Barcelona-Miami desde 2 julio',
    'LASER Airlines informa a sus clientes y aliados comerciales que debido al cierre temporal del Aeropuerto Internacional Simón Bolívar, hemos diseñado una alternativa a través de Barcelona, estado Anzoátegui.\n\nAeropuerto Internacional General José Antonio Anzoátegui, a partir del jueves 02 de julio de 2026.\n\nG6 200 | MIA → BLA | 07:30-11:00\nG6 201 | BLA → MIA | 12:45-16:15\n\nPresentarse con al menos 3 horas de anticipación.\n\nContacto: 0412.266.26.37 / 0501 LASER 00 / 0501 52737 00',
    'importante', '2026-07-01 23:00:00');
  n('LASER Airlines - Recuperación equipajes bodega vuelos 906 CCS-PMV y 970 CCS-BLA (24 junio)',
    'Comunicado #2\n\nMotivado a la cancelación de los vuelos 906 y 970 del pasado 24 de junio por las causas de fuerza mayor ya conocidas, les informamos que hemos recuperado los equipajes de bodega (o facturado) que se encontraban resguardados en la aeronave.\n\nA partir del miércoles 01 de julio se estará realizando la entrega de dichos equipajes en nuestras instalaciones administrativas.\n\nHorario: MIÉRCOLES A VIERNES: 08:30 A.M. A 12:00 PM. Y DE 01:00 PM. A 04:30 PM.\n\nRequisitos: Cédula de Identidad o Pasaporte (copia o imagen) / Ticket de Bag Tag\n\nSi retira un tercero: carta de autorización firmada por el titular + copias de cédulas de ambos.\n\nDirección: Calle California de Las Mercedes, Torre Laser (al lado del GYM 398).',
    'importante', '2026-07-01 16:00:00');
  n('LASER Airlines - Recuperación de equipajes de mano vuelo 2920 CCS-MAD (29 de junio)',
    'Motivado a la cancelación del vuelo 2920 del pasado 24 de junio por las causas de fuerza mayor ya conocidas, les informamos que hemos recuperado los equipajes de mano que se encontraban resguardados en la aeronave.\n\nTras obtener las autorizaciones necesarias para el desembarque de las pertenencias, les notificamos que a partir de este lunes 29 de junio se estará realizando la entrega de dichos equipajes de mano en nuestras Instalaciones administrativas.\n\nPodrán acudir a nuestras oficinas en el siguiente horario:\n\nLUNES A VIERNES: 08:30 A.M. A 12:00 P.M. Y DE 01:00 P.M. A 04:30 P.M.\n\nPara retirar su equipaje, es indispensable presentar:\n\nCédula de Identidad o Pasaporte. (copia o imagen)\n\nNota importante: Si el equipaje de mano va a ser retirado por un tercero, este deberá presentar una carta de autorización debidamente firmada por el titular, acompañada por las copias de la Cédula de Identidad (o Pasaporte) tanto del dueño del equipaje como de la persona autorizada.\n\nDirección: Calle California de Las Mercedes, Torre Laser (al lado del GYM 398).\n\nSeguimos trabajando para brindarles una pronta respuesta sobre el resto del equipaje facturado, para lo cual informaremos por nuestros canales oficiales.\n\nAtentamente, LASER Airlines',
    'importante', '2026-06-29 13:00:00');
  n('Avior Airlines - Suspensión de operaciones y alternativas para pasajeros (25 de junio)',
    'Jueves, 25 de junio de 2026.\n\nUna vez más, expresamos nuestra solidaridad y acompañamiento a nuestros pasajeros, colaboradores y sus familias ante estos momentos de adversidad.\n\nPor instrucciones del Instituto Nacional de Aeronáutica Civil (INAC) las operaciones aéreas desde y hacia Caracas, a través del Aeropuerto Internacional de Maiquetía se mantienen suspendidas.\n\nReafirmamos nuestro compromiso y conscientes de los inconvenientes que esta medida pueda generar, ponemos a disposición las siguientes alternativas para los pasajeros afectados entre el 24 de junio y el 02 de julio de 2026:\n\n• Cambio de fecha y ruta sin penalidad: Reprograme su viaje manteniendo el tipo de ruta original (nacional o internacional), ajustando fecha y hora según disponibilidad.\n• Sin cobros adicionales, válido para cualquier fecha dentro de los 365 días de vigencia de su boleto.\n• Boleto abierto: Si lo prefiere, puede mantener su boleto abierto durante 365 días a partir de la fecha de emisión, para reprogramarlo luego según disponibilidad del vuelo seleccionado.\n• Boletos emitidos por agencias de viaje: Si su boleto fue adquirido a través de una agencia de viaje, deberá contactar directamente a su asesor para gestionar cualquier modificación.\n\nAgradecemos su comprensión y les invitamos a mantenerse atentos a nuestros canales oficiales, donde compartiremos oportunamente cualquier actualización relacionada con la reanudación de los vuelos y las reprogramaciones correspondientes.\n\nAnte cualquier duda les invitamos a contactarnos a través de nuestros canales de atención:\n• 0501-AVIOR-00\n• +1 407 214 4866\n\nTe acompañamos en este momento y estamos para servirte',
    'importante', '2026-06-25 14:00:00');
  n('Avior Airlines - Itinerario actualizado desde Barcelona (julio 2026)',
    'Seguimos sumando frecuencias a nuestros vuelos de contingencia desde el aeropuerto BLA (General de División José Antonio Anzoátegui).\n\nVUELOS INTERNACIONALES:\n\nBLA↔BOG:\nL-Mi-V: BLA→BOG 17:00-18:10 / BOG→BLA 19:30-22:40\nD (desde 19 JUL): BLA→BOG 16:30-17:40 / BOG→BLA 18:50-22:00\n\nBLA↔MDE:\nMa-S: BLA→MDE 17:00-18:10 / MDE→BLA 19:30-22:40\nJ (desde 17 JUL): BLA→MDE 16:30-17:40 / MDE→BLA 18:50-22:00\n\nBLA↔CUR (desde 16 JUL):\nMa-J: BLA→CUR 10:00-11:30 / CUR→BLA 20:00-21:30\n\nMAR↔CUR (desde 16 JUL):\nMa-J: MAR→CUR 18:00-19:00 / CUR→MAR 12:00-13:00\n\nVUELOS NACIONALES:\nBLA↔BRM↔MAR:\nL-Mi-V-D: BLA→BRM 07:00-08:00 / BRM→MAR 09:00-09:40 / MAR→BRM 11:00-11:40 / BRM→BLA 12:40-13:40\n\nBLA↔LSP↔MAR (desde 16 JUL):\nMa-J: BLA→LSP 07:00-08:00 / LSP→MAR 09:00-09:40 / MAR→LSP 11:00-11:40 / LSP→BLA 13:00-14:00\n\nBLA↔VIG (desde 22 JUL):\nMi: BLA→VIG 09:00-10:30 / VIG→BLA 11:30-13:00\n\nYa estos vuelos se encuentran en sistema para su venta.\n\nContacto: 0501-AVIOR-00 / +1 (407) 214-4866',
    'importante', '2026-07-09 10:00:00');

  r('Barcelona', 'Barquisimeto', 'Ruta Avior Airlines.');
  r('Barquisimeto', 'Barcelona', 'Ruta Avior Airlines.');
  r('Barquisimeto', 'Maracaibo', 'Ruta Avior Airlines.');
  r('Maracaibo', 'Barquisimeto', 'Ruta Avior Airlines.');
  r('Barcelona', 'Bogotá', 'Ruta internacional Avior Airlines.');
  r('Bogotá', 'Barcelona', 'Ruta internacional Avior Airlines.');
  r('Barcelona', 'Medellín', 'Ruta internacional Avior Airlines.');
  r('Medellín', 'Barcelona', 'Ruta internacional Avior Airlines.');
  r('Barcelona', 'Curazao', 'Ruta internacional Avior Airlines.');
  r('Curazao', 'Barcelona', 'Ruta internacional Avior Airlines.');
  r('Maracaibo', 'Curazao', 'Ruta internacional Avior Airlines.');
  r('Curazao', 'Maracaibo', 'Ruta internacional Avior Airlines.');
  r('Barcelona', 'Las Piedras', 'Ruta Avior Airlines.');
  r('Las Piedras', 'Barcelona', 'Ruta Avior Airlines.');
  r('Las Piedras', 'Maracaibo', 'Ruta Avior Airlines.');
  r('Maracaibo', 'Las Piedras', 'Ruta Avior Airlines.');
  r('Barcelona', 'El Vigía', 'Ruta Avior Airlines.');
  r('El Vigía', 'Barcelona', 'Ruta Avior Airlines.');

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
    'Información vuelos desde/hacia Venezuela. Ampliamos operaciones desde Valencia (VLN) hasta el 26 de julio de 2026.\n\nLUNES, MARTES Y JUEVES:\nPU701 | MAD→VLN | 13:00-16:30\nPU702 | VLN→MAD | 19:00-09:55(+1)\n\nSÁBADO:\nPU701 | MAD→VLN | 13:00-16:30\nPU712 | VLN→TFN | 20:30-08:50(+1)\n\nDOMINGO:\nPU711 | TFN→VLN | 12:20-14:55\nPU702 | VLN→MAD | 19:00-09:55(+1)\n\nCualquier novedad será comunicada por canales oficiales.\nContacto: callcentre@plusultra.com',
    'importante', '2026-07-09 08:00:00');
  n('Plus Ultra - Itinerario extendido hasta 26 de julio (10 julio)',
    'Informamos que nuestras operaciones a Venezuela, a través del aeropuerto Arturo Michelena de Valencia (VLN), se mantendrán hasta el 26 de julio.\n\nENTRE MADRID Y VALENCIA:\nLunes, martes y jueves:\nPU701 | MAD→VLN | 13:00-16:30\nPU702 | VLN→MAD | 19:00-09:55(+1)\n\nSábados:\nPU701 | MAD→VLN | 13:00-16:30\n\nDomingos:\nPU702 | VLN→MAD | 19:00-09:55(+1)\n\nENTRE TENERIFE NORTE Y VALENCIA:\nSábados:\nPU712 | VLN→TFN | 20:30-08:50(+1)\n\nDomingos:\nPU711 | TFN→VLN | 12:20-14:55\n\nA la espera de información sobre reapertura de Caracas. Itinerarios disponibles en GDS y plusultra.com.',
    'importante', '2026-07-10 12:00:00');
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

  // ── CONVIASA RUTAS COMPLETAS Julio 2026 ──
  const cvRoutes2 = [
    // Internacionales
    ['Porlamar','Bridgetown'],['Bridgetown','Porlamar'],
    ['Valencia','Cancún'],['Cancún','Valencia'],
    ['Valencia','La Habana'],['La Habana','Valencia'],
    ['Valencia','Santa Lucía (México)'],['Santa Lucía (México)','Valencia'],
    // Interciudad
    ['Valencia','Cumaná'],['Cumaná','Valencia'],
    ['Valencia','El Vigía'],['El Vigía','Valencia'],
    ['El Vigía','Barcelona'],['Barcelona','El Vigía'],
    ['Valencia','Santo Domingo del Táchira'],['Santo Domingo del Táchira','Valencia'],
    ['Santo Domingo del Táchira','Porlamar'],['Porlamar','Santo Domingo del Táchira'],
    ['Santo Domingo del Táchira','Maturín'],['Maturín','Santo Domingo del Táchira'],
    ['Valencia','Valera'],['Valera','Valencia'],
    ['Valera','Porlamar'],['Porlamar','Valera'],
    ['Valencia','San Antonio del Táchira'],['San Antonio del Táchira','Valencia'],
    ['Valencia','Maturín'],['Maturín','Valencia'],
    ['Maturín','Maracaibo'],['Maracaibo','Maturín'],
    ['Maturín','Porlamar'],['Porlamar','Maturín'],
    ['Puerto Ordaz','El Vigía'],['El Vigía','Puerto Ordaz'],
    ['Valencia','La Fría'],['La Fría','Valencia'],
    ['Porlamar','La Fría'],['La Fría','Porlamar'],
    ['Valencia','Canaima'],['Canaima','Valencia'],
    ['Porlamar','Puerto Ordaz'],['Puerto Ordaz','Porlamar'],
    ['Maracaibo','Puerto Ordaz'],['Puerto Ordaz','Maracaibo'],
    ['Valencia','Maracaibo'],['Maracaibo','Valencia'],
    ['Maracaibo','Barcelona'],['Barcelona','Maracaibo'],
    ['Porlamar','Barcelona'],['Barcelona','Porlamar'],
    ['Porlamar','Barquisimeto'],['Barquisimeto','Porlamar'],
    ['Barquisimeto','San Antonio del Táchira'],['San Antonio del Táchira','Barquisimeto'],
    ['Porlamar','El Vigía'],['El Vigía','Porlamar'],
    ['Porlamar','Maracaibo'],['Maracaibo','Porlamar'],
    ['Valencia','Puerto Ordaz'],['Puerto Ordaz','Valencia'],
    ['Valencia','Porlamar'],['Porlamar','Valencia'],
    ['Maracay','Los Roques'],['Los Roques','Maracay'],
    ['Maracay','Barcelona'],['Barcelona','Maracay'],
    ['Maracay','Puerto Ayacucho'],['Puerto Ayacucho','Maracay'],
    ['Maracay','Las Piedras'],['Las Piedras','Maracay'],
    ['Maracay','Barquisimeto'],['Barquisimeto','Maracay'],
    ['Maracay','Barinas'],['Barinas','Maracay'],
  ];
  for (const [o, d] of cvRoutes2) {
    r(o, d, 'Ruta Conviasa - Julio 2026.');
  }

  r('Porlamar', 'Puerto España', 'Ruta internacional temporal.');
  r('Puerto España', 'Porlamar', 'Ruta internacional temporal.');

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
  r('Valencia', 'Panamá', 'Ruta internacional Copa Airlines.');
  r('Panamá', 'Valencia', 'Ruta internacional Copa Airlines.');
  r('Maracaibo', 'Panamá', 'Ruta internacional Copa Airlines.');
  r('Panamá', 'Maracaibo', 'Ruta internacional Copa Airlines.');
  r('Barcelona', 'Miami', 'Ruta internacional LASER Airlines.');
  r('Miami', 'Barcelona', 'Ruta internacional LASER Airlines.');
  r('Barcelona', 'Santo Domingo', 'Ruta internacional LASER Airlines.');
  r('Santo Domingo', 'Barcelona', 'Ruta internacional LASER Airlines.');
  r('Madrid', 'Barcelona', 'Ruta internacional LASER Airlines.');
  r('Barcelona', 'Madrid', 'Ruta internacional LASER Airlines.');
  r('Caracas', 'Porlamar', 'Ruta Aeropostal.');
  r('Porlamar', 'Caracas', 'Ruta Aeropostal.');
  r('Valencia', 'Porlamar', 'Ruta Aeropostal.');
  r('Porlamar', 'Valencia', 'Ruta Aeropostal.');

  r('Valencia', 'Santo Domingo del Táchira', 'Ruta Estelar Airlines.');
  r('Santo Domingo del Táchira', 'Valencia', 'Ruta Estelar Airlines.');
  r('Valencia', 'Maracaibo', 'Ruta Estelar Airlines.');
  r('Maracaibo', 'Valencia', 'Ruta Estelar Airlines.');
  r('Valencia', 'San Antonio del Táchira', 'Ruta Estelar Airlines.');
  r('San Antonio del Táchira', 'Valencia', 'Ruta Estelar Airlines.');
  r('Valencia', 'Puerto Ordaz', 'Ruta Estelar Airlines.');
  r('Puerto Ordaz', 'Valencia', 'Ruta Estelar Airlines.');

  // ── TURPIAL AIRLINES RUTAS NACIONALES ──
  r('Valencia', 'Puerto Ordaz', 'Ruta Turpial Airlines.');
  r('Puerto Ordaz', 'Valencia', 'Ruta Turpial Airlines.');
  r('Valencia', 'San Antonio del Táchira', 'Ruta Turpial Airlines.');
  r('San Antonio del Táchira', 'Valencia', 'Ruta Turpial Airlines.');
  r('Valencia', 'Porlamar', 'Ruta Turpial Airlines.');
  r('Porlamar', 'Valencia', 'Ruta Turpial Airlines.');

  // ── NUEVAS RUTAS POR CONTINGENCIA ──
  r('Barquisimeto', 'Panamá', 'Ruta internacional Copa Airlines.');
  r('Panamá', 'Barquisimeto', 'Ruta internacional Copa Airlines.');
  r('Barcelona', 'Panamá', 'Ruta internacional Copa Airlines.');
  r('Panamá', 'Barcelona', 'Ruta internacional Copa Airlines.');
  r('Bogotá', 'Maracaibo', 'Ruta internacional Avianca.');
  r('Maracaibo', 'Bogotá', 'Ruta internacional Avianca.');
  r('Miami', 'Maracaibo', 'Ruta internacional American Airlines.');
  r('Maracaibo', 'Miami', 'Ruta internacional American Airlines.');
  r('Caracas', 'Los Roques', 'Ruta Aerocaribe.');
  r('Los Roques', 'Caracas', 'Ruta Aerocaribe.');
  r('San Antonio del Táchira', 'Porlamar', 'Ruta Estelar Airlines.');
  r('Porlamar', 'San Antonio del Táchira', 'Ruta Estelar Airlines.');
   r('Bogotá', 'Porlamar', 'Ruta internacional Wingo.');
  r('Porlamar', 'Bogotá', 'Ruta internacional Wingo.');
  r('Maracay', 'Maracaibo', 'Ruta LASER Airlines.');
  r('Maracaibo', 'Maracay', 'Ruta LASER Airlines.');
  r('Maracay', 'El Vigía', 'Ruta LASER Airlines.');
  r('El Vigía', 'Maracay', 'Ruta LASER Airlines.');
  r('Maracay', 'Porlamar', 'Ruta LASER Airlines.');
  r('Porlamar', 'Maracay', 'Ruta LASER Airlines.');

  const allRoutes = db.getAllRoutes();
  const g = (o, d) => { const x = allRoutes.find(x => x.origin === o.toUpperCase() && x.destination === d.toUpperCase()); return x ? x.id : null; };

  const makeF = (o, d, airline, fn, dep, arr, freq, notes) => {
    const rid = g(o, d);
    if (rid) f(rid, airline, fn, dep, arr, freq, notes);
  };


  makeF('Madrid', 'Valencia', 'Plus Ultra Líneas Aéreas', 'PU701', '13:00', '16:30', 'LU - MA - JU - SA (hasta 26 JUL)', 'Itinerario actualizado.');
  makeF('Valencia', 'Madrid', 'Plus Ultra Líneas Aéreas', 'PU702', '19:00', '09:55 (+1 día)', 'LU - MA - JU - DOM', 'Itinerario actualizado.');
  makeF('Tenerife', 'Valencia', 'Plus Ultra Líneas Aéreas', 'PU711', '12:20', '14:55', 'DOMINGO', 'Itinerario actualizado.');
  makeF('Valencia', 'Tenerife', 'Plus Ultra Líneas Aéreas', 'PU712', '20:30', '08:50 (+1 día)', 'SÁBADO', 'Itinerario actualizado.');

  makeF('Bogotá', 'Valencia', 'Avianca', '', '07:35', '10:35', 'Diaria', 'Vuelo temporal por contingencia. Válido hasta 10 de julio.');
  makeF('Bogotá', 'Valencia', 'Avianca', '', '23:20', '02:20 (+1 día)', 'Diaria', 'Vuelo temporal por contingencia. Válido hasta 10 de julio.');
  makeF('Valencia', 'Bogotá', 'Avianca', '', '12:27', '13:10', 'Diaria', 'Vuelo temporal por contingencia. Válido hasta 10 de julio.');
  makeF('Valencia', 'Bogotá', 'Avianca', '', '04:17', '05:00', 'Diaria', 'Vuelo temporal por contingencia. Válido hasta 10 de julio.');

  // ── AEROPOSTAL ITINERARIO COMPLETO JULIO 2026 ──
  // Caracas ↔ Porlamar
  makeF('Caracas', 'Porlamar', 'Aeropostal Alas de Venezuela', '', '12:00', '12:45', 'LUN - VIE - DOM', 'Itinerario julio 2026.');
  makeF('Caracas', 'Porlamar', 'Aeropostal Alas de Venezuela', '', '10:00', '10:45', 'JUE', 'Itinerario julio 2026.');
  makeF('Porlamar', 'Caracas', 'Aeropostal Alas de Venezuela', '', '14:00', '14:45', 'LUN - VIE', 'Itinerario julio 2026.');
  makeF('Porlamar', 'Caracas', 'Aeropostal Alas de Venezuela', '', '15:30', '16:15', 'JUE', 'Itinerario julio 2026.');
  makeF('Porlamar', 'Caracas', 'Aeropostal Alas de Venezuela', '', '17:30', '18:15', 'DOM', 'Itinerario julio 2026.');
  // Porlamar ↔ Valencia
  makeF('Porlamar', 'Valencia', 'Aeropostal Alas de Venezuela', '', '14:00', '15:00', 'LU - MA - JU - VI', 'Itinerario julio 2026.');
  makeF('Valencia', 'Porlamar', 'Aeropostal Alas de Venezuela', '', '12:00', '13:00', 'LU - MA - JU - VI', 'Itinerario julio 2026.');
  makeF('Porlamar', 'Valencia', 'Aeropostal Alas de Venezuela', '', '16:00', '17:00', 'DOM', 'Itinerario julio 2026.');
  makeF('Valencia', 'Porlamar', 'Aeropostal Alas de Venezuela', '', '14:00', '15:00', 'DOM', 'Itinerario julio 2026.');

  // ── TURPIAL AIRLINES FLIGHTS ──
  makeF('Valencia', 'Puerto Ordaz', 'Turpial Airlines', '', '08:00', '09:15', 'LUNES - VIERNES', 'Itinerario nacional.');
  makeF('Puerto Ordaz', 'Valencia', 'Turpial Airlines', '', '10:15', '11:30', 'LUNES - VIERNES', 'Itinerario nacional.');
  makeF('Valencia', 'Maracaibo', 'Turpial Airlines', '', '12:30', '13:30', 'LUNES - VIERNES', 'Itinerario nacional.');
  makeF('Maracaibo', 'Valencia', 'Turpial Airlines', '', '14:30', '15:30', 'LUNES - VIERNES', 'Itinerario nacional.');
  makeF('Valencia', 'San Antonio del Táchira', 'Turpial Airlines', '', '16:30', '17:30', 'LUNES - VIERNES', 'Itinerario nacional.');
  makeF('San Antonio del Táchira', 'Valencia', 'Turpial Airlines', '', '18:30', '19:30', 'LUNES - VIERNES', 'Itinerario nacional.');
  makeF('Valencia', 'Porlamar', 'Turpial Airlines', '', '14:30', '15:30', 'JUEVES - DOMINGO', 'Itinerario nacional.');
  makeF('Porlamar', 'Valencia', 'Turpial Airlines', '', '16:30', '17:30', 'JUEVES - DOMINGO', 'Itinerario nacional.');

  makeF('Valencia', 'Santo Domingo del Táchira', 'Estelar', '', '12:10', '13:10', 'LU MA JU VI SA DO', 'Itinerario contingencia.');
  makeF('Santo Domingo del Táchira', 'Valencia', 'Estelar', '', '14:10', '15:10', 'LU MA JU VI SA DO', 'Itinerario contingencia.');
  makeF('Valencia', 'Santo Domingo del Táchira', 'Estelar', '', '12:30', '13:30', 'JUEVES', 'Itinerario contingencia.');
  makeF('Santo Domingo del Táchira', 'Valencia', 'Estelar', '', '14:30', '15:30', 'JUEVES', 'Itinerario contingencia.');

  makeF('Valencia', 'Maracaibo', 'Estelar', '', '17:00', '18:00', 'LUNES - MIÉRCOLES', 'Itinerario contingencia.');
  makeF('Maracaibo', 'Valencia', 'Estelar', '', '07:30', '08:30', 'MARTES', 'Itinerario contingencia.');
  makeF('Maracaibo', 'Valencia', 'Estelar', '', '06:30', '07:30', 'JUEVES', 'Itinerario contingencia.');
  makeF('Valencia', 'Maracaibo', 'Estelar', '', '20:30', '21:30', 'VIERNES', 'Itinerario contingencia.');
  makeF('Maracaibo', 'Valencia', 'Estelar', '', '09:30', '10:30', 'SÁBADO', 'Itinerario contingencia.');

  makeF('Valencia', 'San Antonio del Táchira', 'Estelar', '', '08:30', '09:30', 'LUNES - MIÉRCOLES - VIERNES - SÁBADO', 'Itinerario contingencia 14 jul.');
  makeF('San Antonio del Táchira', 'Valencia', 'Estelar', '', '10:30', '11:30', 'LUNES - VIERNES', 'Itinerario contingencia 14 jul.');
  makeF('San Antonio del Táchira', 'Valencia', 'Estelar', '', '16:30', '17:30', 'MIÉRCOLES - SÁBADO', 'Itinerario contingencia 14 jul.');

  makeF('San Antonio del Táchira', 'Porlamar', 'Estelar', '', '11:00', '12:30', 'MIÉRCOLES - SÁBADO', 'Itinerario contingencia 14 jul.');
  makeF('Porlamar', 'San Antonio del Táchira', 'Estelar', '', '14:00', '15:30', 'MIÉRCOLES - SÁBADO', 'Itinerario contingencia 14 jul.');

  makeF('Valencia', 'Puerto Ordaz', 'Estelar', '', '14:30', '15:30', 'LUNES', 'Itinerario contingencia 14 jul.');
  makeF('Valencia', 'Puerto Ordaz', 'Estelar', '', '16:00', '17:00', 'JUEVES - DOMINGO', 'Itinerario contingencia 14 jul.');
  makeF('Puerto Ordaz', 'Valencia', 'Estelar', '', '06:30', '07:30', 'LUNES - MARTES - VIERNES', 'Itinerario contingencia 14 jul.');

  makeF('Valencia', 'Porlamar', 'Estelar', '', '08:30', '09:30', 'JUEVES', 'Itinerario contingencia.');
  makeF('Porlamar', 'Valencia', 'Estelar', '', '10:30', '11:30', 'JUEVES', 'Itinerario contingencia.');
  makeF('Valencia', 'Porlamar', 'Estelar', '', '16:10', '17:10', 'VIERNES - DOMINGO', 'Itinerario contingencia.');
  makeF('Porlamar', 'Valencia', 'Estelar', '', '18:10', '19:10', 'VIERNES - DOMINGO', 'Itinerario contingencia.');

  makeF('Madrid', 'Valencia', 'Estelar Latinoamérica', 'ES894', '14:40', '19:00', 'MIÉRCOLES - VIERNES', 'Plan de contingencia desde 1 julio.');
  makeF('Valencia', 'Madrid', 'Estelar Latinoamérica', 'ES895', '22:00', '13:15 (+1 día)', 'MIÉRCOLES - VIERNES', 'Plan de contingencia desde 1 julio.');
  // ── CONVIASA ITINERARIO COMPLETO Julio 2026 ──
  const cvF = (o, d, num, dep, arr, freq) => makeF(o, d, 'Conviasa', num, dep, arr, freq, 'Itinerario julio 2026.');
  // Internacionales
  cvF('Porlamar','Bridgetown','V0 4934','10:40','11:30','MI');
  cvF('Bridgetown','Porlamar','V0 4935','12:30','13:20','MI');
  cvF('Valencia','Cancún','V0 3736','21:30','00:00','LU, VI');
  cvF('Cancún','Valencia','V0 3739','01:30','06:00','MA, SA');
  cvF('Valencia','La Habana','V0 3492','11:30','14:30','MI, VI');
  cvF('La Habana','Valencia','V0 3493','16:30','19:30','MI, VI');
  cvF('Valencia','Santa Lucía (México)','V0 3726','10:00','12:50','MA');
  cvF('Santa Lucía (México)','Valencia','V0 3727','16:10','23:00','MA');
  // Interciudad
  cvF('Valencia','Cumaná','V0 058','07:30','08:10','LU');
  cvF('Cumaná','Valencia','V0 059','09:00','09:40','LU');
  cvF('Valencia','El Vigía','V0 080','10:40','11:40','LU');
  cvF('El Vigía','Valencia','V0 081','17:10','18:10','LU');
  cvF('El Vigía','Barcelona','V0 2442','12:30','14:00','LU');
  cvF('Barcelona','El Vigía','V0 2443','14:50','16:20','LU');
  cvF('Valencia','Santo Domingo del Táchira','V0 038','12:45','13:45','LU, SA');
  cvF('Santo Domingo del Táchira','Valencia','V0 039','10:45','11:45','LU, SA');
  cvF('Valencia','Porlamar','V0 1004','13:40','14:40','LU');
  cvF('Valencia','Porlamar','V0 1012','18:50','19:50','LU, MA, JU, VI');
  cvF('Valencia','Porlamar','V0 1000','07:30','08:30','MI');
  cvF('Valencia','Porlamar','V0 350','09:00','10:00','MI');
  cvF('Valencia','Porlamar','V0 1006','08:00','09:00','SA');
  cvF('Valencia','Porlamar','V0 352','12:50','13:50','SA');
  cvF('Valencia','Porlamar','V0 1002','17:00','18:00','DO');
  cvF('Porlamar','Valencia','V0 1001','08:00','09:00','LU, JU, VI, DO');
  cvF('Porlamar','Valencia','V0 1003','17:00','18:00','LU');
  cvF('Porlamar','Valencia','V0 1005','12:30','13:30','MA');
  cvF('Porlamar','Valencia','V0 1007','15:50','16:50','MI');
  cvF('Porlamar','Valencia','V0 351','07:00','08:00','MI');
  cvF('Porlamar','Valencia','V0 1011','18:50','19:50','SA');
  cvF('Porlamar','Valencia','V0 353','10:50','11:50','SA');
  cvF('Santo Domingo del Táchira','Porlamar','V0 337','14:45','16:10','LU, SA');
  cvF('Santo Domingo del Táchira','Porlamar','V0 335','15:35','17:00','MI');
  cvF('Valencia','Valera','V0 1174','08:00','08:50','MA');
  cvF('Valera','Valencia','V0 1175','13:00','13:50','MA');
  cvF('Valera','Porlamar','V0 2250','09:40','10:55','MA');
  cvF('Porlamar','Valera','V0 2251','11:45','13:00','MA');
  cvF('Valera','Porlamar','V0 2252','12:05','13:20','SA');
  cvF('Porlamar','Valera','V0 2253','10:00','11:15','SA');
  cvF('Valencia','Puerto Ordaz','V0 390','15:40','16:40','MA');
  cvF('Puerto Ordaz','Valencia','V0 391','17:40','18:40','MA');
  cvF('Valencia','Puerto Ordaz','V0 198','10:00','11:00','JU');
  cvF('Puerto Ordaz','Valencia','V0 199','16:50','17:50','JU');
  cvF('Valencia','San Antonio del Táchira','V0 2402','14:35','15:35','MA');
  cvF('San Antonio del Táchira','Valencia','V0 2403','16:45','17:45','MA');
  cvF('Valencia','San Antonio del Táchira','V0 2404','10:00','11:00','DO');
  cvF('San Antonio del Táchira','Valencia','V0 2405','15:10','16:00','DO');
  cvF('Porlamar','Barquisimeto','V0 2290','08:30','09:30','MA');
  cvF('Barquisimeto','Porlamar','V0 2291','10:30','11:30','MA');
  cvF('Porlamar','Barquisimeto','V0 288','14:50','15:50','SA');
  cvF('Barquisimeto','Porlamar','V0 289','16:50','17:50','SA');
  cvF('Valencia','Maturín','V0 032','10:00','10:50','LU, VI');
  cvF('Maturín','Valencia','V0 033','11:50','12:40','LU');
  cvF('Maturín','Valencia','V0 031','19:30','20:20','MI');
  cvF('Maturín','Valencia','V0 035','16:50','17:40','VI');
  cvF('Valencia','Maturín','V0 034','17:50','18:40','MI');
  cvF('Maturín','Maracaibo','V0 272','15:30','17:00','MI');
  cvF('Maracaibo','Maturín','V0 273','13:10','14:40','MI');
  cvF('Maturín','Maracaibo','V0 274','11:50','13:20','VI');
  cvF('Maracaibo','Maturín','V0 275','14:20','15:50','VI');
  cvF('Santo Domingo del Táchira','Maturín','V0 2438','10:45','12:20','MI');
  cvF('Maturín','Santo Domingo del Táchira','V0 2439','13:10','14:45','MI');
  cvF('Puerto Ordaz','El Vigía','V0 2398','11:50','13:20','JU');
  cvF('El Vigía','Puerto Ordaz','V0 2399','14:20','15:50','JU');
  cvF('Porlamar','Maracaibo','V0 302','12:30','13:50','DO');
  cvF('Maracaibo','Porlamar','V0 303','14:40','16:00','DO');
  cvF('Porlamar','Maracaibo','V0 304','15:00','16:20','VI');
  cvF('Maracaibo','Porlamar','V0 305','17:10','18:30','VI');
  cvF('Porlamar','Maracaibo','V0 306','11:00','12:20','MI');
  cvF('Maracaibo','Porlamar','V0 307','17:50','19:10','MI');
  cvF('Valencia','La Fría','V0 062','11:20','12:20','JU');
  cvF('La Fría','Valencia','V0 063','17:30','18:30','JU');
  cvF('Porlamar','La Fría','V0 346','15:20','16:40','JU');
  cvF('La Fría','Porlamar','V0 347','13:10','14:30','JU');
  cvF('Porlamar','La Fría','V0 348','14:20','15:40','SA');
  cvF('La Fría','Porlamar','V0 349','16:30','17:50','SA');
  cvF('Valencia','Canaima','V0 130','07:30','08:30','JU, DO');
  cvF('Canaima','Valencia','V0 131','09:20','10:20','JU, DO');
  cvF('Porlamar','Puerto Ordaz','V0 322','09:00','09:50','JU, DO');
  cvF('Puerto Ordaz','Porlamar','V0 323','16:00','16:50','JU');
  cvF('Porlamar','Puerto Ordaz','V0 321','10:40','11:30','DO');
  cvF('Maracaibo','Puerto Ordaz','V0 332','13:25','15:00','JU');
  cvF('Puerto Ordaz','Maracaibo','V0 333','10:50','12:25','JU');
  cvF('Valencia','Maracaibo','V0 090','08:30','09:30','VI');
  cvF('Maracaibo','Valencia','V0 091','14:40','15:40','VI');
  cvF('Valencia','Maracaibo','V0 092','11:20','12:20','DO');
  cvF('Maracaibo','Valencia','V0 093','13:10','14:10','DO');
  cvF('Maracaibo','Barcelona','V0 2266','10:20','11:40','VI');
  cvF('Barcelona','Maracaibo','V0 2267','12:30','13:50','VI');
  cvF('Porlamar','El Vigía','V0 362','10:30','11:50','VI');
  cvF('El Vigía','Porlamar','V0 363','12:40','14:00','VI');
  cvF('Porlamar','El Vigía','V0 364','17:00','18:20','DO');
  cvF('El Vigía','Porlamar','V0 365','19:10','20:30','DO');
  cvF('San Antonio del Táchira','Barquisimeto','V0 2259','11:50','12:40','DO');
  cvF('Barquisimeto','San Antonio del Táchira','V0 2258','13:30','14:20','DO');
  cvF('Porlamar','Maturín','V0 2310','08:00','08:45','LU, MA, JU, VI, SA, DO');
  cvF('Maturín','Porlamar','V0 2311','09:30','10:15','LU, MA, JU, VI, SA, DO');
  cvF('Porlamar','Maturín','V0 2312','13:40','14:25','LU, MA, JU, VI, SA, DO');
  cvF('Maturín','Porlamar','V0 2313','15:10','15:55','LU, MA, JU, VI, SA, DO');
  cvF('Porlamar','Barcelona','V0 2278','11:00','11:35','LU, MA, JU, VI, SA, DO');
  cvF('Barcelona','Porlamar','V0 2279','12:25','12:55','LU, MA, JU, VI, SA, DO');
  cvF('Maracay','Los Roques','V0 2458','08:30','09:40','LU, MA, MI, JU, VI, SA');
  cvF('Los Roques','Maracay','V0 2459','10:40','11:50','LU, MA, MI, JU, VI, SA');
  cvF('Maracay','Los Roques','V0 2460','13:20','14:30','LU, MA, MI, JU, VI, SA');
  cvF('Los Roques','Maracay','V0 2461','15:30','16:40','LU, MA, MI, JU, VI, SA');
  cvF('Maracay','Los Roques','V0 2464','09:55','11:05','DO');
  cvF('Los Roques','Maracay','V0 2465','11:50','13:00','DO');
  cvF('Maracay','Los Roques','V0 2466','14:10','15:20','DO');
  cvF('Los Roques','Maracay','V0 2467','16:00','17:10','DO');
  cvF('Maracay','Barcelona','V0 1110','07:00','07:50','LU');
  cvF('Barcelona','Maracay','V0 1111','08:40','09:30','LU');
  cvF('Maracay','Barcelona','V0 1112','16:20','17:10','VI');
  cvF('Barcelona','Maracay','V0 1113','18:00','18:50','VI');
  cvF('Maracay','Las Piedras','V0 2486','12:30','13:30','VI');
  cvF('Las Piedras','Maracay','V0 2487','14:30','15:30','VI');
  cvF('Maracay','Barquisimeto','V0 098','09:30','10:00','VI');
  cvF('Barquisimeto','Maracay','V0 099','10:50','11:20','VI');
  cvF('Maracay','Barinas','V0 2492','10:00','11:30','SA');
  cvF('Barinas','Maracay','V0 2493','12:30','14:00','SA');
  // ── RUTACA AIRLINES ITINERARIO COMPLETO JULIO 2026 ──
  // Barcelona ↔ Puerto Ordaz
  makeF('Barcelona', 'Puerto Ordaz', 'Rutaca Airlines', '', '19:20', '20:00', 'LUN-MIÉ-VIE-DOM', 'Itinerario julio 2026.');
  makeF('Puerto Ordaz', 'Barcelona', 'Rutaca Airlines', '', '06:00', '06:40', 'LUN-MAR-JUE-SÁB', 'Itinerario julio 2026.');
  // Puerto Ordaz ↔ Boa Vista
  makeF('Puerto Ordaz', 'Boa Vista', 'Rutaca Airlines', '', '09:00', '10:10', 'LUN-JUE', 'Itinerario internacional julio 2026.');
  makeF('Boa Vista', 'Puerto Ordaz', 'Rutaca Airlines', '', '12:45', '13:55', 'LUN-JUE', 'Itinerario internacional julio 2026.');
  // Porlamar ↔ Puerto Ordaz
  makeF('Porlamar', 'Puerto Ordaz', 'Rutaca Airlines', '', '07:00', '07:50', 'LUN-JUE', 'Itinerario julio 2026.');
  makeF('Puerto Ordaz', 'Porlamar', 'Rutaca Airlines', '', '15:40', '16:30', 'LUN-JUE', 'Itinerario julio 2026.');
  // Valencia ↔ Punta Cana
  makeF('Valencia', 'Punta Cana', 'Rutaca Airlines', '', '10:00', '11:30', 'JUE-DOM (desde 9 JUL)', 'Itinerario internacional julio 2026.');
  makeF('Punta Cana', 'Valencia', 'Rutaca Airlines', '', '13:30', '15:00', 'JUE-DOM (desde 9 JUL)', 'Itinerario internacional julio 2026.');
  // Valencia ↔ Maracaibo
  makeF('Valencia', 'Maracaibo', 'Rutaca Airlines', '', '19:00', '20:00', 'MAR-JUE-DOM', 'Itinerario julio 2026.');
  makeF('Maracaibo', 'Valencia', 'Rutaca Airlines', '', '06:00', '07:00', 'LUN-MIÉ-VIE', 'Itinerario julio 2026.');
  // Valencia ↔ Maturín
  makeF('Valencia', 'Maturín', 'Rutaca Airlines', '', '08:30', '09:30', 'MIÉ-VIE', 'Itinerario julio 2026.');
  makeF('Maturín', 'Valencia', 'Rutaca Airlines', '', '10:30', '11:30', 'MIÉ-VIE', 'Itinerario julio 2026.');
  // Valencia ↔ Porlamar
  makeF('Valencia', 'Porlamar', 'Rutaca Airlines', '', '08:30', '09:30', 'JUE-DOM', 'Itinerario julio 2026.');
  makeF('Porlamar', 'Valencia', 'Rutaca Airlines', '', '17:30', '18:30', 'JUE-DOM', 'Itinerario julio 2026.');
  // Porlamar ↔ Puerto España
  makeF('Porlamar', 'Puerto España', 'Rutaca Airlines', '', '11:30', '12:10', 'JUE-DOM', 'Itinerario internacional julio 2026.');
  makeF('Puerto España', 'Porlamar', 'Rutaca Airlines', '', '13:40', '14:20', 'JUE-DOM', 'Itinerario internacional julio 2026.');
  // Valencia ↔ Santo Domingo del Táchira
  makeF('Valencia', 'Santo Domingo del Táchira', 'Rutaca Airlines', '', '09:30', '10:30', 'LUN-MAR-VIE-SÁB', 'Itinerario julio 2026.');
  makeF('Santo Domingo del Táchira', 'Valencia', 'Rutaca Airlines', '', '11:30', '12:30', 'MAR-VIE-SÁB', 'Itinerario julio 2026.');
  makeF('Santo Domingo del Táchira', 'Valencia', 'Rutaca Airlines', '', '12:00', '13:00', 'LUN', 'Itinerario julio 2026.');
  // Valencia ↔ Puerto Ordaz
  makeF('Valencia', 'Puerto Ordaz', 'Rutaca Airlines', '', '18:00', '19:00', 'JUE-DOM', 'Itinerario julio 2026.');
  makeF('Puerto Ordaz', 'Valencia', 'Rutaca Airlines', '', '07:00', '08:00', 'MIÉ-VIE-DOM', 'Itinerario julio 2026.');
  // Valencia ↔ La Habana
  makeF('Valencia', 'La Habana', 'Rutaca Airlines', '', '10:00', '14:50', 'LUN', 'Itinerario internacional julio 2026.');
  makeF('La Habana', 'Valencia', 'Rutaca Airlines', '', '15:40', '20:30', 'LUN', 'Itinerario internacional julio 2026.');
  // Valencia ↔ Barcelona
  makeF('Valencia', 'Barcelona', 'Rutaca Airlines', '', '17:30', '18:20', 'LUN-MIÉ-VIE-DOM', 'Itinerario julio 2026.');
  makeF('Barcelona', 'Valencia', 'Rutaca Airlines', '', '07:30', '08:10', 'LUN-MAR-JUE-SÁB', 'Itinerario julio 2026.');
  makeF('Madrid', 'Valencia', 'Air Europa', 'UX071', '15:30', '19:05', '11,12,14,16,18,21,23,25,28,30 JUL', 'Operativa por cierre CCS. Cancelados: 17,19,24,26,31 JUL.');
  makeF('Valencia', 'Madrid', 'Air Europa', 'UX072', '21:05', '12:10 (+1 día)', '11,12,14,16,18,21,23,25,28,30 JUL', 'Operativa por cierre CCS. Cancelados: 17,19,24,26,31 JUL.');
  makeF('Panamá', 'Valencia', 'Copa Airlines', 'CM250', '11:43', '14:53', 'Diaria', 'Operación regular.');
  makeF('Valencia', 'Panamá', 'Copa Airlines', 'CM251', '16:03', '17:21', 'Diaria', 'Operación regular.');
  makeF('Panamá', 'Valencia', 'Copa Airlines', 'CM603', '09:03', '12:13', 'Hasta 15 JUL', 'Vuelo adicional.');
  makeF('Valencia', 'Panamá', 'Copa Airlines', 'CM605', '13:43', '15:01', 'Hasta 15 JUL', 'Vuelo adicional.');
  makeF('Panamá', 'Valencia', 'Copa Airlines', 'CM447', '13:33', '16:43', 'Hasta 15 JUL', 'Vuelo adicional.');
  makeF('Valencia', 'Panamá', 'Copa Airlines', 'CM437', '18:03', '19:21', 'Hasta 15 JUL', 'Vuelo adicional.');
  makeF('Maracaibo', 'Panamá', 'Copa Airlines', 'CM713', '15:58', '16:46', 'L-M-M-J-V-D (no S)', 'Operación regular.');
  makeF('Panamá', 'Maracaibo', 'Copa Airlines', 'CM703', '12:04', '12:52', 'L-M-M-J-V-D (no S)', 'Operación regular.');
  makeF('Maracaibo', 'Barquisimeto', 'Venezolana', 'V1242', '08:00', '08:30', 'L M J V D', 'Plan de contingencia desde 6 jul.');
  makeF('Barquisimeto', 'Maracaibo', 'Venezolana', 'V1241', '17:00', '17:30', 'L M J V D', 'Plan de contingencia desde 6 jul.');
  makeF('Barquisimeto', 'Porlamar', 'Venezolana', 'V1341', '11:00', '12:00', 'L-J-D', 'Plan de contingencia desde 6 jul.');
  makeF('Porlamar', 'Barquisimeto', 'Venezolana', 'V1342', '13:00', '14:00', 'L-J-D', 'Plan de contingencia desde 6 jul.');
  makeF('Maracaibo', 'Panamá', 'Venezolana', 'V412', '08:00', '08:30', 'Mar-Sáb', 'Itinerario internacional 10 jul.');
  makeF('Panamá', 'Maracaibo', 'Venezolana', 'V413', '14:30', '17:00', 'Mar-Sáb', 'Itinerario internacional 10 jul.');
  makeF('Barquisimeto', 'Panamá', 'Venezolana', 'V422', '13:00', '13:30', 'Mar-Sáb', 'Itinerario internacional 10 jul.');
  makeF('Panamá', 'Barquisimeto', 'Venezolana', 'V423', '09:30', '12:00', 'Mar-Sáb', 'Itinerario internacional 10 jul.');
  makeF('Barquisimeto', 'Panamá', 'Estelar Latinoamérica', 'ES8402', '10:00', '11:00', '3, 7 y 10 JUL', 'Plan de contingencia.');
  makeF('Panamá', 'Barquisimeto', 'Estelar Latinoamérica', 'ES8403', '12:00', '15:00', '3, 7 y 10 JUL', 'Plan de contingencia.');
  // ── AVIOR AIRLINES ITINERARIO ACTUALIZADO ──
  // Nacional: BLA↔BRM↔MAR↔BRM↔BLA
  makeF('Barcelona', 'Barquisimeto', 'Avior Airlines', '', '07:00', '08:00', 'DIARIO', 'Itinerario 15 jul.');
  makeF('Barquisimeto', 'Maracaibo', 'Avior Airlines', '', '09:00', '09:40', 'DIARIO', 'Itinerario 15 jul.');
  makeF('Maracaibo', 'Barquisimeto', 'Avior Airlines', '', '11:00', '11:40', 'DIARIO', 'Itinerario 15 jul.');
  makeF('Barquisimeto', 'Barcelona', 'Avior Airlines', '', '12:40', '13:40', 'DIARIO', 'Itinerario 15 jul.');
  // Nacional: BLA↔LSP↔MAR↔LSP↔BLA
  makeF('Barcelona', 'Las Piedras', 'Avior Airlines', '', '07:00', '08:00', 'DIARIO', 'Itinerario 15 jul.');
  makeF('Las Piedras', 'Maracaibo', 'Avior Airlines', '', '09:00', '10:00', 'DIARIO', 'Itinerario 15 jul.');
  makeF('Maracaibo', 'Las Piedras', 'Avior Airlines', '', '11:00', '12:00', 'DIARIO', 'Itinerario 15 jul.');
  makeF('Las Piedras', 'Barcelona', 'Avior Airlines', '', '13:00', '14:00', 'DIARIO', 'Itinerario 15 jul.');
  // Nacional: BLA↔VIG
  makeF('Barcelona', 'El Vigía', 'Avior Airlines', '', '09:00', '10:30', 'DIARIO', 'Itinerario 15 jul.');
  makeF('El Vigía', 'Barcelona', 'Avior Airlines', '', '11:30', '13:00', 'DIARIO', 'Itinerario 15 jul.');
  // Internacional: BLA↔BOG
  makeF('Barcelona', 'Bogotá', 'Avior Airlines', '', '17:00', '18:10', 'DIARIO', 'Itinerario 15 jul.');
  makeF('Bogotá', 'Barcelona', 'Avior Airlines', '', '19:30', '22:40', 'DIARIO', 'Itinerario 15 jul.');
  makeF('Barcelona', 'Bogotá', 'Avior Airlines', '', '16:30', '17:40', 'DIARIO', 'Itinerario 15 jul.');
  makeF('Bogotá', 'Barcelona', 'Avior Airlines', '', '07:00', '10:10', 'DIARIO', 'Itinerario 15 jul.');
  makeF('Bogotá', 'Barcelona', 'Avior Airlines', '', '18:50', '22:00', 'DIARIO', 'Itinerario 15 jul.');
  // Internacional: BLA↔MDE
  makeF('Barcelona', 'Medellín', 'Avior Airlines', '', '17:00', '18:10', 'DIARIO', 'Itinerario 15 jul.');
  makeF('Medellín', 'Barcelona', 'Avior Airlines', '', '19:30', '22:40', 'DIARIO', 'Itinerario 15 jul.');
  makeF('Barcelona', 'Medellín', 'Avior Airlines', '', '16:30', '17:40', 'DIARIO', 'Itinerario 15 jul.');
  makeF('Medellín', 'Barcelona', 'Avior Airlines', '', '18:50', '22:00', 'DIARIO', 'Itinerario 15 jul.');
  // Internacional: BLA↔CUR
  makeF('Barcelona', 'Curazao', 'Avior Airlines', '', '10:00', '11:00', 'DIARIO', 'Itinerario 15 jul.');
  makeF('Curazao', 'Barcelona', 'Avior Airlines', '', '20:00', '21:00', 'DIARIO', 'Itinerario 15 jul.');
  // Internacional: CUR↔MAR
  makeF('Curazao', 'Maracaibo', 'Avior Airlines', '', '12:00', '13:00', 'DIARIO', 'Itinerario 15 jul.');
  makeF('Maracaibo', 'Curazao', 'Avior Airlines', '', '18:00', '19:00', 'DIARIO', 'Itinerario 15 jul.');
  makeF('Miami', 'Barcelona', 'LASER Airlines', 'G6 200', '07:30', '11:00', 'Desde 2 JUL', 'Nueva ruta por cierre CCS.');
  makeF('Barcelona', 'Miami', 'LASER Airlines', 'G6 201', '12:45', '16:15', 'Desde 2 JUL', 'Nueva ruta por cierre CCS.');
  makeF('Barcelona', 'Santo Domingo', 'LASER Airlines', 'QL2968', '10:00', '11:50', 'MIÉRCOLES - DOMINGO (desde 8 JUL)', 'Nueva ruta por cierre CCS.');
  makeF('Santo Domingo', 'Barcelona', 'LASER Airlines', 'QL2969', '13:20', '14:50', 'MIÉRCOLES - DOMINGO (desde 8 JUL)', 'Nueva ruta por cierre CCS.');

  // ── LASER AIRLINES Madrid vía Barcelona (8 JUL) ──
  makeF('Madrid', 'Barcelona', 'LASER Airlines', 'QL2921', '10:55', '14:10', 'LUN-MIÉ-VIE-SÁB (desde 8 JUL)', 'Operado por Hifly. Protocolo contingencia ruta Madrid.');
  makeF('Barcelona', 'Madrid', 'LASER Airlines', 'QL2920', '17:00', '08:35 (+1 día)', 'LUN-MIÉ-VIE-SÁB (desde 8 JUL)', 'Operado por Hifly. Protocolo contingencia ruta Madrid.');

  // ── LASER AIRLINES Bogotá vía Barcelona (9 JUL) ──
  makeF('Barcelona', 'Bogotá', 'LASER Airlines', 'QL2980', '09:00', '10:00', 'MAR-JUE-SÁB (desde 9 JUL)', 'Nueva ruta por cierre CCS.');
  makeF('Bogotá', 'Barcelona', 'LASER Airlines', 'QL2981', '11:30', '14:30', 'MAR-JUE-SÁB (desde 9 JUL)', 'Nueva ruta por cierre CCS.');

  // ── LASER AIRLINES Vuelos nacionales desde Maracay (17 JUL) ──
  // Maracay ↔ Maracaibo
  makeF('Maracay', 'Maracaibo', 'LASER Airlines', 'QL942', '10:45', '11:55', 'DIARIO (desde 17 JUL)', 'Protocolo contingencia nacional.');
  makeF('Maracaibo', 'Maracay', 'LASER Airlines', 'QL943', '12:55', '14:05', 'DIARIO (desde 17 JUL)', 'Protocolo contingencia nacional.');
  // Maracay ↔ El Vigía
  makeF('Maracay', 'El Vigía', 'LASER Airlines', 'QL920', '10:00', '11:10', 'DIARIO (desde 17 JUL)', 'Protocolo contingencia nacional.');
  makeF('El Vigía', 'Maracay', 'LASER Airlines', 'QL921', '12:10', '13:20', 'DIARIO (desde 17 JUL)', 'Protocolo contingencia nacional.');
  // Maracay ↔ Barcelona (3 frecuencias diarias)
  makeF('Maracay', 'Barcelona', 'LASER Airlines', 'QL970', '06:30', '07:30', 'DIARIO (desde 17 JUL)', 'Protocolo contingencia nacional.');
  makeF('Barcelona', 'Maracay', 'LASER Airlines', 'QL971', '08:45', '09:45', 'DIARIO (desde 17 JUL)', 'Protocolo contingencia nacional.');
  makeF('Maracay', 'Barcelona', 'LASER Airlines', 'QL972', '09:30', '10:30', 'DIARIO (desde 17 JUL)', 'Protocolo contingencia nacional.');
  makeF('Barcelona', 'Maracay', 'LASER Airlines', 'QL973', '13:00', '14:00', 'DIARIO (desde 17 JUL)', 'Protocolo contingencia nacional.');
  makeF('Maracay', 'Barcelona', 'LASER Airlines', 'QL974', '16:30', '17:30', 'DIARIO (desde 17 JUL)', 'Protocolo contingencia nacional.');
  makeF('Barcelona', 'Maracay', 'LASER Airlines', 'QL975', '18:30', '19:30', 'DIARIO (desde 17 JUL)', 'Protocolo contingencia nacional.');
  // Maracay ↔ Porlamar
  makeF('Porlamar', 'Maracay', 'LASER Airlines', 'QL907', '07:30', '08:40', 'DIARIO (desde 17 JUL)', 'Protocolo contingencia nacional.');
  makeF('Maracay', 'Porlamar', 'LASER Airlines', 'QL904', '15:30', '16:40', 'DIARIO (desde 17 JUL)', 'Protocolo contingencia nacional.');
  makeF('Porlamar', 'Maracay', 'LASER Airlines', 'QL905', '17:40', '18:50', 'DIARIO (desde 17 JUL)', 'Protocolo contingencia nacional.');
  makeF('Maracay', 'Porlamar', 'LASER Airlines', 'QL906', '19:50', '21:00', 'DIARIO (desde 17 JUL)', 'Protocolo contingencia nacional.');

  // ── TURPIAL AIRLINES Valencia ↔ Punta Cana (julio-septiembre 2026) ──
  makeF('Valencia', 'Punta Cana', 'Turpial Airlines', '8608', '14:00', '15:30', 'JUEVES (16 jul - 24 sep)', 'Ruta temporal.');
  makeF('Punta Cana', 'Valencia', 'Turpial Airlines', '8609', '16:30', '18:00', 'JUEVES (16 jul - 24 sep)', 'Ruta temporal.');
  makeF('Valencia', 'Punta Cana', 'Turpial Airlines', '8608', '15:00', '16:30', 'DOMINGO (19 jul - 27 sep)', 'Ruta temporal.');
  makeF('Punta Cana', 'Valencia', 'Turpial Airlines', '8609', '17:30', '19:00', 'DOMINGO (19 jul - 27 sep)', 'Ruta temporal.');

  // ── COPA AIRLINES NUEVAS RUTAS ──
  makeF('Panamá', 'Barquisimeto', 'Copa Airlines', 'CM336', '09:25', '12:28', 'LU - JU - VI', 'Ruta regular Copa Airlines.');
  makeF('Barquisimeto', 'Panamá', 'Copa Airlines', 'CM843', '13:38', '14:38', 'LU - JU - VI', 'Ruta regular Copa Airlines.');
  makeF('Panamá', 'Barcelona', 'Copa Airlines', 'CM100', '09:35', '13:18', 'MA - JU - SA', 'Ruta regular Copa Airlines.');
  makeF('Barcelona', 'Panamá', 'Copa Airlines', 'CM492', '14:28', '16:20', 'MA - JU - SA', 'Ruta regular Copa Airlines.');

  // ── LATAM AIRLINES BARCELONA-BOGOTÁ (JULIO 2026) ──
  makeF('Bogotá', 'Barcelona', 'LATAM Airlines', 'LA4966', '07:35', '09:15', 'LUNES - VIERNES', 'Ruta temporal julio 2026 por contingencia CCS.');
  makeF('Barcelona', 'Bogotá', 'LATAM Airlines', 'LA4967', '11:40', '13:15', 'LUNES - VIERNES', 'Ruta temporal julio 2026 por contingencia CCS.');

  // ── AVIANCA BOGOTÁ-MARACAIBO (DESDE 28 AGO) ──
  makeF('Bogotá', 'Maracaibo', 'Avianca', 'AV94', '15:05', '17:40', 'DIARIA (desde 28 AGO)', 'Nueva ruta directa.');
  makeF('Maracaibo', 'Bogotá', 'Avianca', 'AV95', '19:00', '19:25', 'DIARIA (desde 28 AGO)', 'Nueva ruta directa.');

  // ── WINGO ──
  makeF('Bogotá', 'Porlamar', 'Wingo', '', '22:30', '02:01 (+1 día)', 'SÁBADO', 'Ruta Wingo.');
  makeF('Porlamar', 'Bogotá', 'Wingo', '', '03:14', '04:45', 'DOMINGO', 'Ruta Wingo.');
  makeF('Bogotá', 'Valencia', 'Wingo', '', '', '', 'MA - JU - DO (desde 14 JUL)', 'Horario matutino. Consultar wingo.com.');
  makeF('Valencia', 'Bogotá', 'Wingo', '', '', '', 'MA - JU - DO (desde 14 JUL)', 'Horario matutino. Consultar wingo.com.');

  // ── AMERICAN AIRLINES MIAMI-MARACAIBO (DESDE 14 JUL) ──
  makeF('Miami', 'Maracaibo', 'American Airlines', '', '10:10', '13:30', 'DIARIO (desde 14 JUL)', 'Nueva ruta.');
  makeF('Maracaibo', 'Miami', 'American Airlines', '', '14:10', '17:15', 'DIARIO (desde 14 JUL)', 'Nueva ruta.');

  // ── AEROCARIBE CARACAS-LOS ROQUES (DESDE 17 JUL) ──
  makeF('Caracas', 'Los Roques', 'Aerocaribe', '', '08:00', '08:45', 'Desde 17 JUL', 'Plan de contingencia.');
  makeF('Los Roques', 'Caracas', 'Aerocaribe', '', '17:00', '17:45', 'Desde 17 JUL', 'Plan de contingencia.');

  // ── IBERIA MADRID-VALENCIA (DESDE 9 JUL) ──
  makeF('Madrid', 'Valencia', 'Iberia', '', '', '', 'JUEVES - DOMINGO (desde 9 JUL)', 'Retorno con escala técnica en SDQ.');
  makeF('Valencia', 'Madrid', 'Iberia', '', '', '', 'JUEVES - DOMINGO (desde 9 JUL)', 'Retorno con escala técnica en SDQ.');

  // ── TURPIAL AIRLINES VALENCIA-EL VIGÍA Y PORLAMAR-EL VIGÍA ──
  // VLN↔VIG (19 JUL - 28 SEP)
  makeF('Valencia', 'El Vigía', 'Turpial Airlines', '6450', '10:00', '11:00', 'VIERNES (19 JUL - 28 SEP)', 'Ruta estacional.');
  makeF('El Vigía', 'Valencia', 'Turpial Airlines', '6451', '12:00', '13:00', 'VIERNES (19 JUL - 28 SEP)', 'Ruta estacional.');
  makeF('Valencia', 'El Vigía', 'Turpial Airlines', '6450', '13:30', '14:30', 'DOMINGO (19 JUL - 28 SEP)', 'Ruta estacional.');
  makeF('El Vigía', 'Valencia', 'Turpial Airlines', '6451', '15:30', '16:30', 'DOMINGO (19 JUL - 28 SEP)', 'Ruta estacional.');
  // PMV↔VIG (16 JUL - 28 SEP)
  makeF('Porlamar', 'El Vigía', 'Turpial Airlines', '', '11:00', '12:30', 'LUNES (16 JUL - 28 SEP)', 'Ruta estacional.');
  makeF('El Vigía', 'Porlamar', 'Turpial Airlines', '', '13:30', '15:00', 'LUNES (16 JUL - 28 SEP)', 'Ruta estacional.');
  makeF('Porlamar', 'El Vigía', 'Turpial Airlines', '', '12:00', '13:30', 'JUEVES (16 JUL - 28 SEP)', 'Ruta estacional.');
  makeF('El Vigía', 'Porlamar', 'Turpial Airlines', '', '14:30', '16:00', 'JUEVES (16 JUL - 28 SEP)', 'Ruta estacional.');

  // ── SASCA AIRLINES MARACAY-LOS ROQUES (DESDE 17 JUL) ──
  makeF('Maracay', 'Los Roques', 'Sasca Airlines', '', '08:00', '09:10', 'DIARIO (desde 17 JUL)', 'Plan de contingencia. Bus gratis Caracas (Torre Onix 04:30) → Maracay.');
  makeF('Los Roques', 'Maracay', 'Sasca Airlines', '', '16:00', '17:10', 'DIARIO (desde 17 JUL)', 'Plan de contingencia. Bus gratis Maracay → Caracas.');

  // ── Comunicados 7 de julio ──
  n('LASER Airlines - Nueva ruta Madrid vía Barcelona (BLA) desde 8 de julio',
    'LASER Airlines informa a sus clientes y aliados comerciales que, debido al cierre temporal del Aeropuerto Internacional Simón Bolívar, hemos diseñado una alternativa a través de Barcelona, estado Anzoátegui.\n\nAeropuerto habilitado: Aeropuerto Internacional General José Antonio Anzoátegui (BLA)\n\nA partir del próximo miércoles 8 de julio de 2026.\n\nItinerario disponible (lunes, miércoles, viernes y sábados):\nQL2921 | MAD → BLA | 10:55 - 14:10\nQL2920 | BLA → MAD | 17:00 - 08:35 (+1 día)\n\nVuelo operado por: Hifly.\n\nPasajeros con reservas confirmadas deben presentarse con al menos 3 horas de antelación.\n\nEquipaje Turista: 2 maletas 23 kg + 1 mano 10 kg\nEquipaje Ejecutiva: 3 maletas 23 kg + 1 mano 10 kg\n\nPasajeros afectados (24 jun - 7 jul): reprogramación sin costo, cambio de ruta, boleto 1 año o nota de crédito.\n\nContacto: 0412.266.26.37 / 0501 LASER 00',
    'importante', '2026-07-07 08:00:00');
  n('LASER Airlines - Nueva ruta Bogotá vía Barcelona (BLA) desde 9 de julio',
    'LASER Airlines informa a sus clientes y aliados comerciales que, debido al cierre temporal del Aeropuerto Internacional Simón Bolívar, hemos diseñado una alternativa a través de Barcelona, estado Anzoátegui.\n\nAeropuerto habilitado: Aeropuerto Internacional General José Antonio Anzoátegui (BLA)\n\nA partir del próximo jueves 9 de julio de 2026.\n\nItinerario disponible (martes, jueves y sábados):\nQL2980 | BLA → BOG | 09:00 - 10:00\nQL2981 | BOG → BLA | 11:30 - 14:30\n\nPasajeros con reservas confirmadas deben presentarse con al menos 3 horas de antelación.\n\nContacto: 0412.266.26.37 / 0501 LASER 00',
    'importante', '2026-07-07 08:30:00');
  n('Aerocaribe - Actualización políticas de flexibilidad por contingencia (7 julio)',
    'Ante las adversidades que la naturaleza nos presenta, en AEROCARIBE reafirmamos nuestro compromiso con el país.\n\nPolíticas de flexibilidad:\n• Boletos emitidos con fecha de viaje entre el 24/06/2026 y el 30/07/2026: cambio sin costo, válido para cualquier fecha dentro de los 365 días de vigencia.\n• Boletos adquiridos a través de agencia de viaje: contactar con su asesor para gestionar la modificación de fechas.',
    'importante', '2026-07-07 10:00:00');
  n('Venezolana - Itinerario internacional actualizado (10 julio)',
     'Venezolana actualiza su itinerario internacional (10 de julio de 2026):\n\nMARACAIBO ↔ PANAMÁ:\nV412 MAR→PTY 08:00-08:30 | Martes y Sábado\nV413 PTY→MAR 14:30-17:00 | Martes y Sábado\n\nBARQUISIMETO ↔ PANAMÁ:\nV423 PTY→BRM 09:30-12:00 | Martes y Sábado\nV422 BRM→PTY 13:00-13:30 | Martes y Sábado\n\nContacto:\nWhatsApp: +58 424 639 02 81\nTeléfono: 0212 819 06 00\nCall Center: callcenter@venezolana.aero\nWeb: www.venezolana.aero',
     'importante', '2026-07-10 18:00:00');
  n('Blue Sky Viajes - Política de cambio por contingencia (7 julio)',
    'Blue Sky Viajes informa a sus clientes:\n\n• Cambio de fecha y ruta sin cargo.\n• Salidas por Bogotá, Panamá, Cancún (México) sin cargo.\n• Prórroga hasta el 30 de septiembre.\n• Reembolso según aplique.\n\nContacto: (0212) 5762698\nInstagram: @blueskyviajes\nEmail: reservas2bluesky@gmail.com',
    'importante', '2026-07-07 12:00:00');
  // ── Nuevos comunicados 3 de julio ──
  n('Turpial Airlines - Itinerario nacional desde Valencia (julio 2026)',
    'Turpial Airlines informa sus nuevos itinerarios nacionales desde el Aeropuerto Arturo Michelena de Valencia:\n\nLUNES Y VIERNES:\nValencia → Puerto Ordaz: 08:00-09:15\nPuerto Ordaz → Valencia: 10:15-11:30\nValencia → Maracaibo: 12:30-13:30\nMaracaibo → Valencia: 14:30-15:30\nValencia → San Antonio del Táchira: 16:30-17:30\nSan Antonio del Táchira → Valencia: 18:30-19:30\n\nJUEVES Y DOMINGO:\nValencia → Porlamar: 14:30-15:30\nPorlamar → Valencia: 16:30-17:30\n\nVuelos especiales/chárter disponibles. Contacte a su agencia de viajes o a Turpial Airlines para disponibilidad y reservas.',
    'importante', '2026-07-06 14:00:00');
  n('Turpial Airlines - Vuelo especial Valencia ↔ San Antonio del Táchira (4 julio)',
    'Frecuencia: Sábado 4 de julio de 2026.\n\nRuta: Valencia - San Antonio del Táchira / San Antonio del Táchira - Valencia.\n\nVuelo especial/chárter habilitado ante la contingencia. Contacte a su agencia de viajes o a Turpial Airlines para disponibilidad y reserva.',
    'importante', '2026-07-03 20:00:00');
  n('Turpial Airlines - Vuelo especial Valencia ↔ Bogotá (5 julio)',
    'Frecuencia: Domingo 5 de julio de 2026.\n\nRuta: Valencia - Bogotá / Bogotá - Valencia.\n\nVuelo especial/chárter habilitado ante la contingencia de Maiquetía. Contacte a su agencia de viajes o a Turpial Airlines para disponibilidad y reserva.',
    'importante', '2026-07-03 20:30:00');
  n('Laser Airlines - Ruta alternativa Miami desde Barcelona (desde 2 julio)',
    'A partir del jueves 2 de julio de 2026, Laser Airlines habilita ruta alternativa hacia Miami desde el Aeropuerto Internacional General José Antonio Anzoátegui (Barcelona).\n\nItinerario diario:\nG6 200 | Miami → Barcelona: 07:30 - 11:00\nG6 201 | Barcelona → Miami: 12:45 - 16:15\n\nEquipaje:\nTurista: 1 maleta 32 kg + equipaje de mano 8 kg\nEjecutiva: 2 maletas 23 kg + equipaje de mano 8 kg\n\nPasajeros con reservas afectadas (25 jun - 1 jul): reprogramación sin costo, cambio de ruta, boleto válido 1 año o nota de crédito.\n\nContacto: 0412.266.26.37 / 0501 LASER 00',
    'importante', '2026-07-02 10:00:00');
  n('LASER Airlines - Nueva ruta Barcelona ↔ Santo Domingo desde 8 de julio',
    'LASER Airlines informa a sus clientes y aliados comerciales que, debido al cierre temporal del Aeropuerto Internacional Simón Bolívar, hemos diseñado una alternativa a través de Barcelona, estado Anzoátegui.\n\nAeropuerto habilitado: Aeropuerto Internacional General José Antonio Anzoátegui (BLA)\n\nA partir del próximo miércoles 8 de julio de 2026.\n\nItinerario disponible (miércoles y domingos):\nQL2968 | BLA → SDQ | 10:00 - 11:50\nQL2969 | SDQ → BLA | 13:20 - 14:50\n\nLos pasajeros con reservas confirmadas deberán presentarse en el aeropuerto con al menos tres horas de antelación a la salida de su vuelo, a partir de la fecha señalada.',
    'importante', '2026-07-06 14:00:00');
  n('Laser Airlines - Comunicado oficial (2 julio): reactivación ruta Miami y proceso de inspección',
    'Debido a los eventos sísmicos del 24 de junio, Laser Airlines sufrió pérdidas humanas irreparables. El personal técnico ha logrado acceder a Maiquetía para inspeccionar y certificar las aeronaves.\n\nSe reactivó el vuelo diario a Miami desde Barcelona (BLA) con el siguiente itinerario:\nMiami → Barcelona: 07:30 - 11:00\nBarcelona → Miami: 12:45 - 16:15\n\nLa aerolínea trabaja para restablecer Madrid, Bogotá, Santo Domingo, Curazao y todos los destinos nacionales. Próximamente informarán fechas.\n\nLaser Airlines extiende sus condolencias a las familias afectadas y agradece la comprensión de sus usuarios.',
    'importante', '2026-07-02 14:00:00');
  n('Venezolana - Atención al público Caracas (desde 6 julio) y centro de acopio',
    'A partir del 6 de julio de 2026, Venezolana retoma atención al público en su oficina del Centro Seguros Sudamérica, El Rosal, Caracas.\n\nHorario: Lunes a viernes de 8:00 AM a 5:00 PM.\n\nServicios: reprogramación, venta de boletos y centro de acopio para recibir donaciones para los afectados por la contingencia sísmica.\n\nUbicación: AV. Francisco de Miranda, Centro Seguros Sudamérica, P.B. Locales 4 y 5, El Rosal, Caracas.\n\nContacto:\nWhatsApp: +58 424 6390281\nCentral: 0212 819 06 00\nEmail: callcenter@venezolana.aero',
    'importante', '2026-07-03 12:00:00');
  n('Venezolana - Plan de contingencia desde Barquisimeto (desde 6 julio)',
    'Venezolana operará vuelos desde el Aeropuerto Internacional Jacinto Lara de Barquisimeto a partir del 6 de julio de 2026:\n\nMaracaibo ↔ Barquisimeto (Vuelos 1242/1241)\nV1242 Maracaibo 8:00 → Barquisimeto 8:30 | LM-JV-D\nV1241 Barquisimeto 17:00 → Maracaibo 17:30 | LM-JV-D\n\nBarquisimeto ↔ Porlamar (Vuelos 1341/1342)\nV1341 Barquisimeto 11:00 → Porlamar 12:00 | L-J-D\nV1342 Porlamar 13:00 → Barquisimeto 14:00\n\nBarquisimeto ↔ Panamá (Vuelos 422/423)\nV422 Barquisimeto 10:00 → Panamá 11:00 | Mar y Vie\nV423 Panamá 12:00 → Barquisimeto 15:00 | Mar y Vie\n\nContacto: +58 424 639 02 81 / 0212 819 06 00 / callcenter@venezolana.aero\n\nVerifique su itinerario antes de ir al aeropuerto.',
    'importante', '2026-07-03 14:00:00');
  n('Estelar - Plan de contingencia Barquisimeto ↔ Panamá (desde 3 julio)',
    'Estelar Latinoamérica habilita plan de contingencia para los vuelos ES8402 y ES8403 (ruta Caracas-Panamá) desde el Aeropuerto Jacinto Lara de Barquisimeto (BRM).\n\nItinerario desde 3 julio:\nBRM → PTY: 10:00 - 11:00\nPTY → BRM: 12:00 - 15:00\n\nAplica para pasajeros con vuelos del 3, 7 y 10 de julio.\n\nOpciones: reprogramación sin costo, cambio de ruta, validez 1 año o bono de crédito.\n\nContacto: WhatsApp +58 414 378 3527 / 0501 3783527 / calidad.servicio@flyestelar.com',
    'importante', '2026-07-03 16:00:00');
  n('Estelar - Retiro de equipaje vuelos 24 de junio (Las Mercedes)',
    'Equipaje disponible para retiro desde el 3 de julio en la oficina comercial Torre Estelar, Las Mercedes, Caracas.\n\nHorario: 08:00 AM - 05:00 PM.\n\nVuelos:\nES8302 San Antonio del Táchira - Caracas (24 jun)\nES823 Caracas - Puerto Ordaz (24 jun)\n\nRequisitos: titular debe acudir personalmente con cédula de identidad. Terceros requieren carta de autorización firmada + copias de cédulas.',
    'importante', '2026-07-03 16:30:00');
n('Turpial Airlines - Vuelo especial Valencia ↔ El Vigía (7 julio)',
    'Vuelo especial/chárter habilitado ante la contingencia de Maiquetía.\n\nFecha: 7 de julio de 2026.\nRuta: Valencia - El Vigía / El Vigía - Valencia.\n\nContacte a su agencia de viajes o a Turpial Airlines para disponibilidad y reserva.',
    'importante', '2026-07-03 18:00:00');
n('Iberia - Flexibilización por terremoto en Venezuela (25 de junio)',
    'NOTA: Vuelos afectados A/desde Caracas (CCS).\n\nBilletes emitidos hasta: 25 de junio de 2026.\nFechas de vuelo original: 25 de junio al 25 de julio de 2026.\nNuevas fechas de vuelo: hasta 15 de agosto de 2026.\n\nCambio de origen/destino: permitido a/desde BOG y PTY. Costes de aeropuerto por cuenta del cliente.\n\nAcople permitido: misma clase del billete original o la más baja disponible en la misma cabina.\nReembolsos: permitidos (forma de pago original o Bono).\nBilletes en redención: Sí.\n\n1 cambio involuntario permitido. Aplica a cualquier vuelo afectado del itinerario, ida o vuelta, haya o no empezado el viaje.\n\nClientes Iberia Express con billete 075/060 también aplican. Para vuelos cancelados aplicar normativa general estándar.',
    'importante', '2026-06-25 12:00:00');
n('Conviasa - Reprogramación total de rutas y contingencia por terremoto (6 de julio)',
    'El Consorcio Venezolano de Industrias Aeronáuticas y Servicios Aéreos S.A. (Conviasa), informa a todos sus usuarios sobre la reprogramación de sus rutas nacionales e internacionales por los eventos sísmicos del 24 de junio y la suspensión temporal de operaciones en Maiquetía.\n\n1. Todas las operaciones nacionales desde Maiquetía han sido trasladadas al Aeropuerto Internacional "Arturo Michelena", Valencia, estado Carabobo.\n\n2. Pasajeros con destinos Barcelona, Puerto Ayacucho, Las Piedras, Barquisimeto, Barinas, Los Roques: abordarán y desembarcarán en el Aeropuerto "Los Tacariguas", Base Aérea Mariscal Sucre de Maracay, estado Aragua.\n\n3. Rutas internacionales México (Cancún y Santa Lucía) y La Habana (Cuba): reprogramadas desde Valencia.\n\n4. Vuelos desde Porlamar siguen operando normalmente.\n\nItinerario completo disponible en la página. Canales oficiales:\n• Redes: @conviasa_ve\n• Web: www.conviasa.aero\n• Email: callcenter@conviasa.aero',
    'importante', '2026-07-06 08:00:00');
  n('Conviasa - Itinerario completo julio 2026',
    'El Consorcio Venezolano de Industrias Aeronáuticas y Servicios Aéreos S.A. (Conviasa) presenta su itinerario completo para julio 2026.\n\nINTERNACIONAL:\nV0 4934 | Porlamar → Bridgetown | 10:40-11:30 | MI\nV0 4935 | Bridgetown → Porlamar | 12:30-13:20 | MI\nV0 3736 | Valencia → Cancún | 21:30-00:00 | LU, VI\nV0 3739 | Cancún → Valencia | 01:30-06:00 | MA, SA\nV0 3492 | Valencia → La Habana | 11:30-14:30 | MI, VI\nV0 3493 | La Habana → Valencia | 16:30-19:30 | MI, VI\nV0 3726 | Valencia → Santa Lucía (México) | 10:00-12:50 | MA\nV0 3727 | Santa Lucía (México) → Valencia | 16:10-23:00 | MA\n\nItinerario completo disponible en la página de búsqueda. Canales oficiales: @conviasa_ve',
    'importante', '2026-07-08 12:00:00');
  n('Air Europa - Actualización cancelaciones julio y agosto (14 julio)',
     'Actualización de cancelaciones (14 de julio de 2026):\n\nCANCELADOS:\n• UX071 Madrid-Valencia: 17, 19, 24, 26 y 31 de julio\n• UX072 Valencia-Madrid: 17, 19, 24, 26 y 31 de julio\n• UX071 Madrid-Caracas: 7 y 14 de agosto\n• UX072 Caracas-Madrid: 7 y 14 de agosto\n\nVUELOS OPERATIVOS (MAD→VLN / VLN→MAD):\n11, 12, 14, 16, 18, 21, 23, 25, 28 y 30 de julio.\n\nPolíticas para pasajeros con vuelos cancelados (billetes emitidos hasta 25 junio):\n• Cambio de fecha sin coste (misma cabina) hasta 31 octubre\n• Cambio de ruta a Medellín, Bogotá o Panamá sin coste (misma cabina, hasta 31 oct)\n• Cambio de ruta a Valencia (VLN) sin coste\n• Vale reembolsable\n• Reembolso',
    'importante', '2026-07-10 14:00:00');
n('Aeropostal Alas de Venezuela - Comunicado oficial (2 de julio)',
    'Desde Aeropostal Alas de Venezuela C.A., nos unimos al profundo dolor que embarga a nuestro país tras los difíciles acontecimientos sísmicos ocurridos recientemente. Lamentamos profundamente la pérdida de vidas humanas.\n\nAnte esta emergencia, reafirmamos nuestro compromiso de acompañar a la nación en su proceso de recuperación, trabajando junto al Ministerio del Poder Popular para el Transporte.\n\nNuestro personal despliega todo su esfuerzo y capacidades logísticas para brindar el apoyo necesario en las operaciones aéreas de contingencia.\n\nITINERARIO VALENCIA - PORLAMAR:\nLUNES A VIERNES:\nValencia → Porlamar: 12:00 PM - 01:00 PM\nPorlamar → Valencia: 02:00 PM - 03:00 PM\n\nDOMINGO:\nValencia → Porlamar: 02:00 PM - 03:00 PM\nPorlamar → Valencia: 04:00 PM - 05:00 PM\n\nContacto: +58 422-715-39-13 / @aeropostal_ve',
    'importante', '2026-07-02 10:00:00');
  n('Aeropostal Alas de Venezuela - Nuevo itinerario julio 2026',
    'Aeropostal Alas de Venezuela actualiza sus itinerarios para julio 2026:\n\nCARACAS ↔ PORLAMAR:\nLunes, Viernes y Domingo:\nCaracas → Porlamar: 12:00 PM - 12:45 PM\nPorlamar → Caracas: 02:00 PM - 02:45 PM\n\nJueves:\nCaracas → Porlamar: 10:00 AM - 10:45 AM\nPorlamar → Caracas: 03:30 PM - 04:15 PM\n\nDomingo:\nCaracas → Porlamar: 12:00 PM - 12:45 PM\nPorlamar → Caracas: 05:30 PM - 06:15 PM\n\nPORLAMAR ↔ VALENCIA:\nJueves:\nPorlamar → Valencia: 11:45 AM - 12:45 PM\nValencia → Porlamar: 01:45 PM - 02:45 PM\n\nDomingo:\nPorlamar → Valencia: 01:45 PM - 02:45 PM\nValencia → Porlamar: 03:45 PM - 04:45 PM\n\nContacto: @aeropostal_ve',
    'importante', '2026-07-08 10:00:00');
  n('LATAM Airlines - Actualización flexibilidad por evento sísmico Caracas (3 de julio)',
    'ACTUALIZACIÓN FLEXIBILIDAD - Evento sísmico en Caracas (CCS), Venezuela.\n\nPasajeros desde/hacia/vía Caracas.\nFecha de vuelo original: entre 26 junio 2026 al 31 julio 2026.\n\nOpciones SIN multa (elegir una):\n\n1. Cambio de fecha/vuelo/retouring: sin multa, misma cabina, hasta 1 año desde fecha original.\n\n2. Cambio de origen/destino: sin multa, sujeta a diferencia tarifaria. Cambio a Cúcuta (CUC), Riohacha (RCH) y Barcelona (BLA) sin multa y sin diferencia de tarifa.\n\n3. Devolución: sin multa, hasta 1 año desde fecha de vuelo original.\n\nCódigo: CCS24JUL26\nOSI: INVCL CHG DUE TO: CCS24JUL26\n\nNota: LATAM opera temporalmente desde Barcelona (BLA) como aeropuerto alterno por cierre de Maiquetía.',
    'importante', '2026-07-03 14:00:00');
n('Avior Airlines - Nuevas frecuencias desde Barcelona por contingencia (29 de junio)',
    'Avior Airlines habilita temporalmente nuevas frecuencias desde el Aeropuerto Internacional de Barcelona (BLA) para reforzar la conexión nacional e internacional.\n\nA partir del viernes 3 de julio de 2026:\n\nVUELOS NACIONALES:\nBarcelona → Barquisimeto: 07:00-08:00 | L-M-V\nBarquisimeto → Maracaibo: 09:00-09:40 | L-M-V\nMaracaibo → Barquisimeto: 11:00-11:40 | L-M-V\nBarquisimeto → Barcelona: 12:40-13:40 | L-M-V\n\nVUELOS INTERNACIONALES (sujeto a autorización Colombia):\nBarcelona → Bogotá: 17:00-18:10 | L-M-V\nBogotá → Barcelona: 19:30-22:40 | L-M-V\nBarcelona → Medellín: 17:00-18:10 | M-S\nMedellín → Barcelona: 19:30-22:40 | M-S\n\nContacto: 0501 AVIOR 00 / www.aviorair.com',
    'importante', '2026-06-29 12:00:00');
n('American Airlines - Política de excepción por terremoto Caracas (actualizado 1 julio)',
    'American Airlines ha implementado una política de excepción especial por el terremoto de Caracas, Venezuela.\n\nCódigos afectados: CCS\nBoletos emitidos hasta: 23 de junio de 2026\nFechas de viaje afectadas: 25 junio - 11 julio 2026 (extendido)\nNuevas fechas de viaje: hasta 14 julio 2026\n\nCambio de origen/destino: No permitido. Radio de 300 millas permitido.\nCambio de Connection City: Permitido\nCambio coterminal: Permitido\n\nCódigo en endoso: TNADVE/24JUN26A\n\nAplica para vuelos operados por American Airlines y JB, y socios Aer Lingus, British Airways, Finnair, Iberia, Japan Airlines, Qantas.',
    'importante', '2026-07-01 12:00:00');
n('Copa Airlines - Rutas Panamá-Barquisimeto y Panamá-Barcelona',
    'Copa Airlines mantiene sus vuelos regulares a Barquisimeto y Barcelona como parte de su red de destinos en Venezuela.\n\nBarquisimeto (BRM):\nCM336 | PTY→BRM | 09:25-12:28 | LU-JU-VI\nCM843 | BRM→PTY | 13:38-14:38 | LU-JU-VI\n\nBarcelona (BLA):\nCM100 | PTY→BLA | 09:35-13:18 | MA-JU-SA\nCM492 | BLA→PTY | 14:28-16:20 | MA-JU-SA\n\nMás información en copa.com',
    'informativo', '2026-07-09 08:00:00');
n('LATAM Airlines - Nueva ruta temporal Bogotá-Barcelona (julio 2026)',
    'LATAM Airlines Colombia habilitó una ruta temporal entre Bogotá y Barcelona (Venezuela) para reforzar la conectividad durante la contingencia.\n\nLA4966 | BOG→BLA | 07:35-09:15 | LUNES y VIERNES (solo julio)\nLA4967 | BLA→BOG | 11:40-13:15 | LUNES y VIERNES (solo julio)\n\nPasajeros afectados pueden cambiar fecha sin costo, reembolso o cambio de ruta hacia Cúcuta, Riohacha o Barcelona.',
    'importante', '2026-07-06 22:00:00');
n('Avianca - Nueva ruta Bogotá-Maracaibo (desde 28 de agosto)',
    'Avianca anuncia nueva ruta directa diaria entre Bogotá y Maracaibo a partir del 28 de agosto de 2026.\n\nAV94 | BOG→MAR | 15:05-17:40 | DIARIA\nAV95 | MAR→BOG | 19:00-19:25 | DIARIA\n\nOperada con Airbus A320 (180 asientos). Boletos ya disponibles en avianca.com.\n\nSujeto a aprobación gubernamental.',
    'informativo', '2026-07-09 10:00:00');
n('Wingo - Nueva ruta Bogotá-Valencia y Bogotá-Porlamar (julio 2026)',
    'Wingo inició vuelos entre Bogotá y Valencia de forma anticipada por cierre de Maiquetía.\n\nBOGOTÁ-VALENCIA:\nDesde 14 JUL: MA-JU-DO, horario matutino. Consultar horarios en wingo.com\n\nBOGOTÁ-PORLAMAR:\nSA 22:30-02:01(+1) / DO 03:14-04:45\n\nPasajeros con vuelos BOG-CCS entre 26 jun y 15 jul: reubicación voluntaria sin costo hacia Valencia.',
    'importante', '2026-07-09 10:00:00');
n('American Airlines - Nueva ruta Miami-Maracaibo (desde 14 de julio)',
    'American Airlines lanza servicio diario entre Miami y Maracaibo a partir del 14 de julio de 2026.\n\nMIA→MAR | 10:10-13:30 | DIARIO\nMAR→MIA | 14:10-17:15 | DIARIO\n\nOperado con Embraer E175. Segundo destino de American en Venezuela junto a Caracas.',
    'importante', '2026-07-09 10:00:00');
n('Aerocaribe - Plan de contingencia ruta Caracas-Los Roques (desde 17 julio)',
    'Plan de Contingencia: Ruta Los Roques.\nConectividad garantizada desde el Aeropuerto Caracas (Charallave).\n\nCCS→LRV | 08:00-08:45 | Desde 17 JUL\nLRV→CCS | 17:00-17:45 | Desde 17 JUL\n\nPresentarse 1:30 h antes. Horarios sujetos a modificaciones.',
    'importante', '2026-07-10 14:00:00');
n('Iberia - Reactivación vuelos Madrid-Valencia (desde 9 de julio)',
    'Iberia retomó sus vuelos regulares a Venezuela desde el 9 de julio, operando desde/hacia Valencia (VLN) por cierre de Maiquetía.\n\nJUEVES y DOMINGOS:\nMAD→VLN: Directo\nVLN→MAD: Con escala técnica en Santo Domingo (SDQ)\n\nDos frecuencias semanales. Consultar horarios en iberia.com.',
    'importante', '2026-07-09 12:00:00');
 n('Turpial Airlines - Nueva ruta Valencia-El Vigía y Porlamar-El Vigía (14 julio)',
     'Turpial Airlines anuncia rutas estacionales (julio-septiembre 2026):\n\nVALENCIA ↔ EL VIGÍA (19 JUL - 28 SEP):\nViernes: VLN→VIG 10:00-11:00 / VIG→VLN 12:00-13:00\nDomingos: VLN→VIG 13:30-14:30 / VIG→VLN 15:30-16:30\n\nPORLAMAR ↔ EL VIGÍA (16 JUL - 28 SEP):\nLunes: PMV→VIG 11:00-12:30 / VIG→PMV 13:30-15:00\nJueves: PMV→VIG 12:00-13:30 / VIG→PMV 14:30-16:00\n\nReservas: www.turpialairlines.com',
     'informativo', '2026-07-14 10:00:00');
 n('Estelar Latinoamérica - Itinerario completo contingencia (14 julio)',
     'Estelar Latinoamérica actualiza su itinerario de contingencia (14 julio 2026):\n\nMADRID:\nMi-Vie: MAD→VLN 14:40-19:00 / VLN→MAD 22:00-13:15(+1)\n\nSANTO DOMINGO DEL TÁCHIRA:\nLU-MA-MI-VIE-SA-DO: VLN→STD 12:10-13:10 / STD→VLN 14:10-15:10\nJUEVES: VLN→STD 12:30-13:30 / STD→VLN 14:30-15:30\n\nSAN ANTONIO DEL TÁCHIRA:\nLU-MI-VI-SA: VLN→SVZ 08:30-09:30\nLU-VI: SVZ→VLN 10:30-11:30\nMI-SA: SVZ→VLN 16:30-17:30\n\nSAN ANTONIO ↔ PORLAMAR:\nMI-SA: SVZ→PMV 11:00-12:30 / PMV→SVZ 14:00-15:30\n\nPUERTO ORDAZ:\nLU: VLN→PZO 14:30-15:30\nJU-DO: VLN→PZO 16:00-17:00\nLU-MA-VI: PZO→VLN 06:30-07:30\n\nMARACAIBO:\nLU-MI: VLN→MAR 17:00-18:00\nMA: MAR→VLN 07:30-08:30\nJU: MAR→VLN 06:30-07:30\nVI: VLN→MAR 20:30-21:30\nSA: MAR→VLN 09:30-10:30\n\nContacto: 0414-3783527 / 0424-2364555 / flyestelar.com',
     'importante', '2026-07-14 10:30:00');
 n('Sasca Airlines - Reanudación ruta Los Roques desde Maracay (15 julio)',
     'A partir del viernes 17 de julio de 2026, Sasca Airlines retoma operaciones diarias hacia Los Roques.\n\nITINERARIO:\nMYC→LRV: 08:00-09:10\nLRV→MYC: 16:00-17:10\n\nServicio gratuito de transporte terrestre (ida y vuelta):\n• Salida desde Torre Onix, Av. Sojo, El Rosal, Caracas a las 05:00\n• Punto de encuentro: 04:30 en Torre Onix\n• Retorno: sujeto a hora de aterrizaje\n\nTasa de salida Maracay: 5.90 € (pago en aeropuerto).\n\nContacto: @sascaa / +58 412-3391705',
     'importante', '2026-07-15 12:00:00');
 n('Sasca Airlines - Tasas de entrada y salida Los Roques (14 julio)',
     'Tasas de entrada y salida para Los Roques:\n\nVENEZOLANOS:\nEntrada: Adultos 15 USD / Niños 8 USD / Adultos mayores 8 USD\nSalida: 12 USD\n\nEXTRANJEROS:\nEntrada: Adultos 50 USD / Niños 25 USD / Adultos mayores 25 USD\nSalida: 12 USD\n\nMARACAY:\n5.90 EUR (desde 2 años)\n\nPago en efectivo o punto directamente en el aeropuerto. Sasca Airlines no es responsable de estos cobros.',
     'informativo', '2026-07-14 12:30:00');
 n('Avior Airlines - Itinerario confirmado todas las rutas diarias (15 julio)',
     'Avior Airlines confirma todos sus itinerarios como DIARIOS (15 julio 2026):\n\nINTERNACIONAL:\nBLA↔BOG: 5 frecuencias diarias (17:00-18:10, 19:30-22:40, 16:30-17:40, 07:00-10:10, 18:50-22:00)\nBLA↔MDE: 4 frecuencias diarias (17:00-18:10, 19:30-22:40, 16:30-17:40, 18:50-22:00)\nBLA↔CUR: 10:00-11:00 / 20:00-21:00\nCUR↔MAR: 12:00-13:00 / 18:00-19:00\n\nNACIONAL:\nBLA↔BRM↔MAR: Diario\nBLA↔LSP↔MAR: Diario\nBLA↔VIG: Diario\n\nContacto: 0501-AVIOR-00 / +1 (407) 214-4866\nWeb: aviorair.com',
     'importante', '2026-07-14 14:00:00');
 n('Venezolana - Itinerario internacional confirmado (14 julio)',
     'Venezolana confirma itinerario internacional:\n\nMARACAIBO ↔ PANAMÁ:\nV412 MAR→PTY 08:00-08:30 | Martes y Sábado\nV413 PTY→MAR 14:30-17:00 | Martes y Sábado\n\nBARQUISIMETO ↔ PANAMÁ:\nV423 PTY→BRM 09:30-12:00 | Martes y Sábado\nV422 BRM→PTY 13:00-13:30 | Martes y Sábado\n\nContacto: +58 424 639 02 81 / callcenter@venezolana.aero',
     'importante', '2026-07-14 14:00:00');
 n('Aerocaribe - Confirmación plan contingencia Los Roques (14 julio)',
     'Aerocaribe confirma operaciones especiales desde Aeropuerto Caracas (Charallave) para la ruta Los Roques.\n\nSVCS→SVRS: 08:00\nSVRS→SVCS: 17:00\n\nChequeo: 1:30 h antes. Horarios sujetos a modificaciones.\nPasajeros con boleto emitido: reubicación automática sin costo.\n\nContacto: +58 (416) 623.74.84 / @aerocaribevzla / aerocaribe.aero',
     'importante', '2026-07-14 15:00:00');
n('Conviasa - Itinerario actualizado desde Maracay (10 julio)',
    'Atención pasajeros: Ahora despegamos desde Maracay.\n\nVUELOS DESDE MARACAY (MYC):\nV0 2458 | MYC→LRV | 08:30-09:40 | LU-MA-MI-JU-VI-SA\nV0 2464 | MYC→LRV | 09:55-11:05 | DO\nV0 2460 | MYC→LRV | 13:20-14:30 | LU-MA-MI-JU-VI-SA\nV0 2466 | MYC→LRV | 14:10-15:20 | DO\nV0 1110 | MYC→BLA | 07:00-07:50 | LU\nV0 1112 | MYC→BLA | 16:20-17:10 | VI\nV0 1070 | MYC→PYH | 10:30-11:45 | LU\nV0 2488 | MYC→LSP | 14:50-15:50 | LU\nV0 2486 | MYC→LSP | 12:30-13:30 | VI\nV0 098 | MYC→BRM | 09:30-10:00 | VI\nV0 2492 | MYC→BNS | 10:00-11:30 | SA\n\nVUELOS HACIA MARACAY:\nLos Roques, Barcelona, Puerto Ayacucho, Las Piedras, Barquisimeto, Barinas.\n\nItinerarios disponibles en conviasa.aero.',
    'importante', '2026-07-10 16:00:00');
n('Aeropostal - Nuevo itinerario Valencia-Porlamar (10 julio)',
    'Aeropostal Alas de Venezuela actualiza su itinerario Valencia-Porlamar.\n\nLU, MA, JU, VI:\nValencia → Porlamar: 12:00-13:00\nPorlamar → Valencia: 14:00-15:00\n\nDOMINGO:\nValencia → Porlamar: 14:00-15:00\nPorlamar → Valencia: 16:00-17:00\n\nContacto: +58 422-715-39-13 / @aeropostal_ve',
     'importante', '2026-07-10 16:00:00');
 n('Rutaca Airlines - Medidas para pasajeros afectados por contingencia (15 julio)',
     'Rutaca Airlines informa medidas para pasajeros afectados por la contingencia del 24/06/2026:\n\nANTICIPACIÓN RECOMENDADA:\n• Vuelos nacionales: 4 horas antes en VLN\n• Vuelos internacionales: 5 horas antes en VLN\n\nOPCIONES DE PROTECCIÓN (hasta 30 JUL):\n1. Cambio de itinerario: un (1) cambio gratuito sin penalidad ni diferencia de tarifa si se completa antes del 30 JUL. Para cambios posteriores, boleto válido 365 días con penalidad exonerada pero diferencia tarifaria aplica.\n2. Nota de crédito (EMD): canjeable para misma ruta o cualquier ruta Rutaca. Válida 1 año. No reembolsable.\n\nPlazo máximo para gestionar: 30 de julio de 2026.\n\nVuelos disponibles en sistema para nuevos boletos.\nContacto: callcenter@flyrutaca.com / 0500-RUTACA-1',
     'importante', '2026-07-15 10:00:00');
  n('LASER Airlines - Protocolo contingencia vuelos nacionales desde Maracay (15 julio)',
      'LASER Airlines habilita operaciones nacionales desde el Aeropuerto Libertador de Maracay (MYC) a partir del 17 de julio de 2026.\n\nITINERARIOS DIARIOS:\n\nMARACAY ↔ MARACAIBO:\nQL942 MYC→MAR 10:45-11:55\nQL943 MAR→MYC 12:55-14:05\n\nMARACAY ↔ EL VIGÍA:\nQL920 MYC→VIG 10:00-11:10\nQL921 VIG→MYC 12:10-13:20\n\nMARACAY ↔ BARCELONA (3 frecuencias):\nQL970 MYC→BLA 06:30-07:30 / QL971 BLA→MYC 08:45-09:45\nQL972 MYC→BLA 09:30-10:30 / QL973 BLA→MYC 13:00-14:00\nQL974 MYC→BLA 16:30-17:30 / QL975 BLA→MYC 18:30-19:30\n\nMARACAY ↔ PORLAMAR:\nQL907 PMV→MYC 07:30-08:40\nQL904 MYC→PMV 15:30-16:40\nQL905 PMV→MYC 17:40-18:50\nQL906 MYC→PMV 19:50-21:00\n\nFranquicia equipaje:\nTurista: 1 maleta 30 kg + mano 8 kg\nEjecutiva: 2 maletas 30 kg + mano 8 kg\n\nContacto: 0412.266.26.37 / 0501 LASER 00',
      'importante', '2026-07-15 16:00:00');

  // ── HOTEL SEED DATA ──
  db.addHotel('LD Palm Beach', 'Margarita', 'Superior', 'Todo incluido',
    'Hotel de categoría Superior, régimen TODO INCLUIDO, con amplias y cómodas habitaciones, ideal para el disfrute en familia. Ofrece desayunos, almuerzos y cenas tipo Buffet, bebidas nacionales alcohólicas y no alcohólicas, snack de media tarde, animación y recreación, piscina, bar en la playa, toldos y sillas. Se sitúa al norte de la Isla de Margarita, a escasos minutos de Playa el Agua y a 45 minutos del Aeropuerto Internacional Santiago Mariño.',
    4.2, 128, null, 'Playa El Agua, Isla de Margarita', null,
    'https://lirp.cdn-website.com/a109d03d/dms3rep/multi/opt/BEACH-01-dbd6fd0d-640w.jpg', null);
  const hotels = db.getHotels('Margarita');
  const ld = hotels[hotels.length - 1];
  const ldId = ld.id;
  db.addHotelRate(ldId, 'Pre-temporada', '2026-05-27', '2026-05-31', 68.74, 54.79, 27.90, 0, 2);
  db.addHotelRate(ldId, 'Inicio temporada', '2026-06-01', '2026-06-30', 79.70, 64.76, 32.88, 0, 2);
  db.addHotelRate(ldId, 'Alta (Hot Sale 10%)', '2026-07-01', '2026-07-31', 84.68, 69.74, 34.87, 0, 2);
  db.addHotelRate(ldId, 'Alta', '2026-08-01', '2026-09-15', 94.15, 76.21, 38.56, 0, 2);
  db.addHotelRate(ldId, 'Baja', '2026-09-16', '2026-12-20', 84.68, 69.74, 34.87, 0, 2);

  db.addHotelPhoto(ldId, 'https://lirp.cdn-website.com/a109d03d/dms3rep/multi/opt/BEACH-01-dbd6fd0d-640w.jpg', 1);
  db.addHotelPhoto(ldId, 'https://viajes-indigo.com/public/uploads/0000/8/2023/05/15/ldpalmbeach-1684192448885.jpg', 0);
  db.addHotelPhoto(ldId, 'https://viajes-indigo.com/public/uploads/0000/8/2023/05/15/ldpalmbeach-1684192511436.jpg', 0);
  db.addHotelPhoto(ldId, 'https://viajes-indigo.com/public/uploads/0000/8/2023/05/15/palm-beach-15-min.jpeg', 0);
  db.addHotelPhoto(ldId, 'https://viajes-indigo.com/public/uploads/0000/8/2023/05/15/palm-beach-11-min.jpeg', 0);
  db.addHotelPhoto(ldId, 'https://viajes-indigo.com/public/uploads/0000/8/2023/05/15/palm-beach-8-min.jpeg', 0);
  db.addHotelPhoto(ldId, 'https://viajes-indigo.com/public/uploads/0000/8/2023/05/15/palm-beach-7-min.jpeg', 0);
  db.addHotelPhoto(ldId, 'https://viajes-indigo.com/public/uploads/0000/8/2023/05/15/palm-beach-2-min.jpeg', 0);

  db.addHotelReview(ldId, 'María G.', 5, 'Excelente hotel, la playa es espectacular. La comida muy buena y el personal muy amable. Volvería sin dudas.');
  db.addHotelReview(ldId, 'Carlos M.', 4, 'Muy buena ubicación, frente a Playa El Agua. Habitaciones cómodas, el servicio de comida aceptable.');
  db.addHotelReview(ldId, 'Ana R.', 4, 'Buen hotel para descansar. La piscina y el acceso a la playa son lo mejor. Relación calidad-precio justa.');

  db.addFlightPrice('Margarita', 'Valencia', 250, 170, 'Vuelo ida y vuelta + traslado aeropuerto-hotel');
}

module.exports = { seedDatabase };
