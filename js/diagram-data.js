export const processFacts = {
  capacity: '≈ 300 m³/h',
  conductivity: '≈ 1.400 → ≈ 30 (osmose reversa)',
  saltRemoval: '≈ 99,9% de retirada de sais',
  coagulant: '10% PAC + 90% coagulante orgânico',
  flocculator1: '4 rpm',
  flocculator2: '2 rpm',
  mode: 'Dados simulados / de referência',
  notes: 'Nenhum dado operacional real foi conectado ao sistema. A representação é visual e educacional.'
};

const info = {
  source: { function: 'Fonte de água bruta do processo.', related: 'Lagoa de reuso.', data: 'Referência visual do diagrama original.' },
  lagoon: { function: 'Recebe e mistura as duas fontes de água.', related: 'Córrego e ETE/Reuso.', data: 'Ponto inicial do tratamento representado.' },
  chicanas: { function: 'Mistura rápida e contato com produtos químicos.', related: 'Hidróxido de sódio e coagulante.', data: 'Coagulante: 10% PAC + 90% coagulante orgânico.' },
  floc1: { function: 'Primeira etapa de floculação.', related: 'Chicanas e floculador 2.', data: 'Velocidade de referência: 4 rpm.' },
  floc2: { function: 'Segunda etapa de floculação e formação dos flocos.', related: 'Floculador 1 e decantadores.', data: 'Velocidade de referência: 2 rpm.' },
  decant: { function: 'Decanta flocos, lodo e sujeiras.', related: 'Floculador 2 e filtragem.', data: 'Representação visual da clarificação.' },
  filter: { function: 'Unidade independente de filtragem.', related: 'Decantadores e distribuição pós-filtros.', data: 'Seis filtros independentes.' },
  filtration: { function: 'Distribui a água clarificada aos seis filtros.', related: 'Decantadores ETA 1 e ETA 2.', data: 'Convergência visual das duas linhas.' },
  cistern: { function: 'Recebe água filtrada e água permeada.', related: 'Desinfecção, osmose e Casa de Bombas.', data: 'Ponto de convergência antes da saída final.' },
  chemical: { function: 'Armazena e alimenta produtos do processo.', related: 'Chicanas e desinfecção da cisterna.', data: 'Dosagens específicas não informadas.' },
  pump: { function: 'Bombeia água no circuito indicado.', related: 'Osmose ou distribuição final, conforme o equipamento.', data: 'Dados operacionais não documentados.' },
  osmosis: { function: 'Realiza separação por osmose reversa.', related: 'Permeado, rejeito e recirculação.', data: 'Condutividade ≈ 1.400 → ≈ 30; retirada de sais ≈ 99,9%.' },
  industry: { function: 'Destino final da água desinfetada.', related: 'Cisterna e Casa de Bombas.', data: 'Vazão específica não informada.' }
};

export const processAreas = [
  { id: 'eta2-area', label: 'LINHA ETA 2', x: 300, y: 45, width: 660, height: 295 },
  { id: 'eta1-area', label: 'LINHA ETA 1', x: 300, y: 385, width: 660, height: 295 },
  { id: 'ro-area', label: 'SUBSISTEMA DE OSMOSE REVERSA', x: 950, y: 710, width: 850, height: 330 }
];

const node = (id, name, label, type, x, y, width, height, extraInfo) => ({ id, name, label, type, x, y, width, height, info: extraInfo });

export const processNodes = [
  { id: 'corgo', name: 'Córrego Laranja-Azeda', label: 'Córrego\nLaranja-Azeda', type: 'source', x: 75, y: 475, radius: 38, info: info.source },
  { id: 'ete', name: 'ETE/Reuso', label: 'ETE/Reuso', type: 'source', x: 75, y: 610, radius: 38, info: info.source },
  { id: 'lagoon', name: 'Lagoa de reuso', label: 'Lagoa de\nreuso', type: 'lagoon', x: 210, y: 545, radius: 54, info: info.lagoon },

  node('eta2-chicanas', 'Chicanas ETA 2', 'Chicanas', 'process', 390, 140, 125, 54, info.chicanas),
  node('eta2-floc1', 'Floculador 1 ETA 2', 'Floculador 1\n4 rpm', 'process', 580, 140, 125, 75, info.floc1),
  node('eta2-floc2', 'Floculador 2 ETA 2', 'Floculador 2\n2 rpm', 'process', 750, 140, 125, 75, info.floc2),
  node('eta2-decant', 'Decantadores ETA 2', 'Decantadores', 'process', 900, 140, 110, 150, info.decant),
  node('eta1-chicanas', 'Chicanas ETA 1', 'Chicanas', 'process', 390, 480, 125, 54, info.chicanas),
  node('eta1-floc1', 'Floculador 1 ETA 1', 'Floculador 1\n4 rpm', 'process', 580, 480, 125, 75, info.floc1),
  node('eta1-floc2', 'Floculador 2 ETA 1', 'Floculador 2\n2 rpm', 'process', 750, 480, 125, 75, info.floc2),
  node('eta1-decant', 'Decantadores ETA 1', 'Decantadores', 'process', 900, 480, 110, 150, info.decant),

  node('filtration', 'Distribuição para filtragem', 'Distribuição\npara filtros', 'process', 1080, 300, 145, 100, info.filtration),
  node('filter1', 'Filtro 1', 'Filtro 1', 'filter', 1290, 145, 100, 58, info.filter),
  node('filter2', 'Filtro 2', 'Filtro 2', 'filter', 1290, 230, 100, 58, info.filter),
  node('filter3', 'Filtro 3', 'Filtro 3', 'filter', 1290, 315, 100, 58, info.filter),
  node('filter4', 'Filtro 4', 'Filtro 4', 'filter', 1290, 400, 100, 58, info.filter),
  node('filter5', 'Filtro 5', 'Filtro 5', 'filter', 1290, 485, 100, 58, info.filter),
  node('filter6', 'Filtro 6', 'Filtro 6', 'filter', 1290, 570, 100, 58, info.filter),
  node('cistern', 'Cisterna', 'Cisterna', 'cistern', 1510, 335, 230, 125, info.cistern),
  node('casa-quimicos', 'Casa de químicos', 'Casa de\nquímicos', 'chemical', 1510, 80, 155, 56, info.chemical),
  node('naoh', 'Hidróxido de Sódio', 'Hidróxido\nde Sódio', 'chemical', 1260, 70, 135, 54, info.chemical),
  node('coagulant', 'Coagulante', 'Coagulante', 'chemical', 1100, 70, 120, 54, info.chemical),
  node('chlorine', 'Cloro', 'Cloro', 'chemical', 1720, 185, 82, 44, info.chemical),
  node('pump-house', 'Casa de Bombas', 'Casa de\nBombas', 'pump', 1700, 500, 140, 58, info.pump),
  { id: 'industry', name: 'Indústria', label: 'Indústria', type: 'industry', x: 1735, y: 335, radius: 48, info: info.industry },

  node('ro-label', 'Osmose reversa', 'OSMOSE R.', 'chemical', 1060, 790, 135, 50, info.osmosis),
  node('pump1', 'Bomba Centrífuga 1', 'Bomba\nCentrífuga 1', 'pump', 1250, 790, 140, 58, info.pump),
  node('cartridge', 'Filtro Cartucho', 'Filtro Cartucho', 'process', 1450, 790, 155, 58, info.filter),
  node('pump2', 'Bomba Centrífuga 2', 'Bomba\nCentrífuga 2', 'pump', 1650, 790, 140, 58, info.pump),
  node('ro1', 'Osmose Reversa Etapa 1', 'Osmose Reversa\nETAPA 1', 'process', 1320, 930, 175, 62, info.osmosis),
  node('permeate1', 'Água Permeada RO1', 'Permeado\nRO1', 'process', 1130, 930, 125, 54, info.osmosis),
  node('reject1', 'Rejeito RO1', 'Rejeito\nRO1', 'process', 1510, 930, 115, 54, info.osmosis),
  node('ro2', 'Osmose Reversa Etapa 2', 'Osmose Reversa\nETAPA 2', 'process', 1510, 1010, 175, 62, info.osmosis),
  node('permeate2', 'Água Permeada RO2', 'Permeado\nRO2', 'process', 1710, 930, 125, 54, info.osmosis),
  node('reject2', 'Rejeito RO2', 'Rejeito\nRO2', 'process', 1710, 1010, 115, 54, info.osmosis)
];

const route = (id, source, target, points, stage, flowType = 'water') => ({ id, source, target, direction: `${source} -> ${target}`, points, stage, flowType, visualState: 'inactive' });
const p = (x, y) => ({ x, y });

export const processConnections = [
  route('corgo-lagoon', 'corgo', 'lagoon', [p(113, 475), p(155, 475), p(155, 545), p(156, 545)], 'source-feed'),
  route('ete-lagoon', 'ete', 'lagoon', [p(113, 610), p(155, 610), p(155, 545), p(156, 545)], 'source-feed'),
  route('lagoon-eta2', 'lagoon', 'eta2-chicanas', [p(264, 545), p(285, 545), p(285, 140), p(327, 140)], 'eta-distribution'),
  route('lagoon-eta1', 'lagoon', 'eta1-chicanas', [p(264, 545), p(285, 545), p(285, 480), p(327, 480)], 'eta-distribution'),
  route('eta2-chicanas-floc1', 'eta2-chicanas', 'eta2-floc1', [p(452, 140), p(517, 140)], 'flocculation1'),
  route('eta2-floc1-floc2', 'eta2-floc1', 'eta2-floc2', [p(642, 140), p(687, 140)], 'flocculation2'),
  route('eta2-floc2-decant', 'eta2-floc2', 'eta2-decant', [p(812, 140), p(845, 140)], 'decantation'),
  route('eta1-chicanas-floc1', 'eta1-chicanas', 'eta1-floc1', [p(452, 480), p(517, 480)], 'flocculation1'),
  route('eta1-floc1-floc2', 'eta1-floc1', 'eta1-floc2', [p(642, 480), p(687, 480)], 'flocculation2'),
  route('eta1-floc2-decant', 'eta1-floc2', 'eta1-decant', [p(812, 480), p(845, 480)], 'decantation'),
  route('eta2-decant-filtration', 'eta2-decant', 'filtration', [p(955, 140), p(1000, 140), p(1000, 300), p(1008, 300)], 'filter-distribution'),
  route('eta1-decant-filtration', 'eta1-decant', 'filtration', [p(955, 480), p(985, 480), p(985, 350), p(1008, 350)], 'filter-distribution'),
  route('filtration-filter1', 'filtration', 'filter1', [p(1152, 300), p(1210, 300), p(1210, 145), p(1240, 145)], 'filtration'),
  route('filtration-filter2', 'filtration', 'filter2', [p(1152, 310), p(1185, 310), p(1185, 230), p(1240, 230)], 'filtration'),
  route('filtration-filter3', 'filtration', 'filter3', [p(1152, 320), p(1170, 320), p(1170, 315), p(1240, 315)], 'filtration'),
  route('filtration-filter4', 'filtration', 'filter4', [p(1152, 330), p(1170, 330), p(1170, 400), p(1240, 400)], 'filtration'),
  route('filtration-filter5', 'filtration', 'filter5', [p(1152, 340), p(1185, 340), p(1185, 485), p(1240, 485)], 'filtration'),
  route('filtration-filter6', 'filtration', 'filter6', [p(1152, 350), p(1210, 350), p(1210, 570), p(1240, 570)], 'filtration'),
  route('filter1-cistern', 'filter1', 'cistern', [p(1340, 145), p(1420, 145), p(1420, 335)], 'cistern-feed'),
  route('filter2-cistern', 'filter2', 'cistern', [p(1340, 230), p(1400, 230), p(1400, 335)], 'cistern-feed'),
  route('filter3-cistern', 'filter3', 'cistern', [p(1340, 315), p(1380, 315), p(1380, 335)], 'cistern-feed'),
  route('filter4-cistern', 'filter4', 'cistern', [p(1340, 400), p(1380, 400), p(1380, 395)], 'cistern-feed'),
  route('filter5-cistern', 'filter5', 'cistern', [p(1340, 485), p(1400, 485), p(1400, 395)], 'cistern-feed'),
  route('filter6-cistern', 'filter6', 'cistern', [p(1340, 570), p(1420, 570), p(1420, 395)], 'cistern-feed'),
  route('filter3-ro', 'filter3', 'ro-label', [p(1340, 315), p(1370, 315), p(1370, 700), p(1060, 700), p(1060, 765)], 'ro-feed'),
  route('ro-label-pump1', 'ro-label', 'pump1', [p(1127, 790), p(1180, 790)], 'reverse-osmosis'),
  route('pump1-cartridge', 'pump1', 'cartridge', [p(1320, 790), p(1372, 790)], 'reverse-osmosis'),
  route('cartridge-pump2', 'cartridge', 'pump2', [p(1527, 790), p(1580, 790)], 'reverse-osmosis'),
  route('pump2-ro1', 'pump2', 'ro1', [p(1720, 790), p(1750, 790), p(1750, 880), p(1320, 880), p(1320, 899)], 'reverse-osmosis'),
  route('ro1-permeate1', 'ro1', 'permeate1', [p(1232, 930), p(1170, 930)], 'ro-output'),
  route('ro1-reject1', 'ro1', 'reject1', [p(1407, 930), p(1452, 930)], 'ro-output'),
  route('reject1-ro2', 'reject1', 'ro2', [p(1510, 957), p(1510, 979)], 'ro2'),
  route('ro2-permeate2', 'ro2', 'permeate2', [p(1597, 1010), p(1650, 1010), p(1650, 930), p(1647, 930)], 'ro-output'),
  route('ro2-reject2', 'ro2', 'reject2', [p(1597, 1041), p(1650, 1041), p(1650, 1010), p(1652, 1010)], 'ro-output', 'reject'),
  route('permeate1-cistern', 'permeate1', 'cistern', [p(1130, 903), p(1080, 903), p(1080, 680), p(1510, 680), p(1510, 397)], 'permeate-return'),
  route('permeate2-cistern', 'permeate2', 'cistern', [p(1710, 903), p(1810, 903), p(1810, 650), p(1510, 650), p(1510, 397)], 'permeate-return'),
  route('reject2-pump1', 'reject2', 'pump1', [p(1652, 1010), p(1600, 1070), p(1180, 1070), p(1180, 820)], 'recirculation', 'reject'),
  route('casa-naoh', 'casa-quimicos', 'naoh', [p(1432, 80), p(1395, 80), p(1395, 70), p(1327, 70)], 'chemical-treatment', 'chemical'),
  route('casa-coagulant', 'casa-quimicos', 'coagulant', [p(1432, 95), p(1220, 95)], 'chemical-treatment', 'chemical'),
  route('naoh-eta1', 'naoh', 'eta1-chicanas', [p(1260, 97), p(1120, 97), p(1120, 390), p(390, 390), p(390, 453)], 'chemical-treatment', 'chemical'),
  route('naoh-eta2', 'naoh', 'eta2-chicanas', [p(1260, 43), p(1130, 43), p(1130, 30), p(390, 30), p(390, 113)], 'chemical-treatment', 'chemical'),
  route('coagulant-eta1', 'coagulant', 'eta1-chicanas', [p(1040, 70), p(980, 70), p(980, 390), p(390, 390), p(390, 453)], 'chemical-treatment', 'chemical'),
  route('coagulant-eta2', 'coagulant', 'eta2-chicanas', [p(1040, 70), p(970, 70), p(970, 30), p(390, 30), p(390, 113)], 'chemical-treatment', 'chemical'),
  route('casa-chlorine', 'casa-quimicos', 'chlorine', [p(1587, 108), p(1720, 163)], 'disinfection', 'chemical'),
  route('chlorine-cistern', 'chlorine', 'cistern', [p(1720, 207), p(1680, 250), p(1625, 250), p(1625, 335)], 'disinfection', 'chemical'),
  route('cistern-pump-house', 'cistern', 'pump-house', [p(1625, 397), p(1625, 500), p(1630, 500)], 'final-distribution'),
  route('pump-house-industry', 'pump-house', 'industry', [p(1770, 500), p(1810, 500), p(1810, 335), p(1735, 335)], 'final-distribution')
];

export const simulationStages = [
  { id: 'source-feed', label: 'Entrada: Córrego e ETE/Reuso', duration: 1800, activeNodes: ['corgo', 'ete', 'lagoon'], connections: ['corgo-lagoon', 'ete-lagoon'], waterState: 'RAW' },
  { id: 'lagoon', label: 'Lagoa de reuso', duration: 1400, activeNodes: ['lagoon'], connections: [], waterState: 'RAW' },
  { id: 'eta-distribution', label: 'Distribuição para ETA 1 e ETA 2', duration: 1600, activeNodes: ['lagoon', 'eta1-chicanas', 'eta2-chicanas'], connections: ['lagoon-eta1', 'lagoon-eta2'], waterState: 'RAW' },
  { id: 'chemical-treatment', label: 'Chicanas + hidróxido de sódio + coagulante', duration: 2200, activeNodes: ['eta1-chicanas', 'eta2-chicanas', 'casa-quimicos', 'naoh', 'coagulant'], connections: ['eta1-chicanas-floc1', 'eta2-chicanas-floc1', 'naoh-eta1', 'naoh-eta2', 'coagulant-eta1', 'coagulant-eta2'], waterState: 'COAGULATING' },
  { id: 'flocculation1', label: 'Floculador 1 - 4 rpm', duration: 1500, activeNodes: ['eta1-floc1', 'eta2-floc1'], connections: ['eta1-chicanas-floc1', 'eta2-chicanas-floc1'], waterState: 'FLOCCULATING' },
  { id: 'flocculation2', label: 'Floculador 2 - 2 rpm', duration: 1500, activeNodes: ['eta1-floc2', 'eta2-floc2'], connections: ['eta1-floc1-floc2', 'eta2-floc1-floc2'], waterState: 'FLOCCULATING' },
  { id: 'decantation', label: 'Decantação', duration: 1800, activeNodes: ['eta1-decant', 'eta2-decant'], connections: ['eta1-floc2-decant', 'eta2-floc2-decant'], waterState: 'CLARIFIED' },
  { id: 'filter-distribution', label: 'Distribuição para os 6 filtros', duration: 1600, activeNodes: ['filtration', 'filter1', 'filter2', 'filter3', 'filter4', 'filter5', 'filter6'], connections: ['eta1-decant-filtration', 'eta2-decant-filtration', 'filtration-filter1', 'filtration-filter2', 'filtration-filter3', 'filtration-filter4', 'filtration-filter5', 'filtration-filter6'], waterState: 'FILTERED' },
  { id: 'parallel-treatment', label: 'Filtragem e divisão: Cisterna + Osmose', duration: 2800, activeNodes: ['filter1', 'filter2', 'filter3', 'filter4', 'filter5', 'filter6', 'cistern', 'ro-label', 'pump1', 'cartridge', 'pump2', 'ro1'], connections: ['filter1-cistern', 'filter2-cistern', 'filter3-cistern', 'filter4-cistern', 'filter5-cistern', 'filter6-cistern', 'filter3-ro', 'ro-label-pump1', 'pump1-cartridge', 'cartridge-pump2', 'pump2-ro1'], waterState: 'TREATED' },
  { id: 'ro1', label: 'Osmose reversa - Etapa 1', duration: 1800, activeNodes: ['ro1', 'permeate1', 'reject1'], connections: ['ro1-permeate1', 'ro1-reject1'], waterState: 'RO_FEED' },
  { id: 'ro2', label: 'Osmose reversa - Etapa 2 e recirculação', duration: 1800, activeNodes: ['ro2', 'permeate2', 'reject2', 'pump1'], connections: ['reject1-ro2', 'ro2-permeate2', 'ro2-reject2', 'reject2-pump1'], waterState: 'RO_FEED' },
  { id: 'permeate-return', label: 'Permeado retorna à Cisterna', duration: 1800, activeNodes: ['permeate1', 'permeate2', 'cistern'], connections: ['permeate1-cistern', 'permeate2-cistern'], waterState: 'TREATED' },
  { id: 'disinfection', label: 'Desinfecção na Cisterna', duration: 1600, activeNodes: ['cistern', 'casa-quimicos', 'chlorine'], connections: ['casa-chlorine', 'chlorine-cistern'], waterState: 'DISINFECTED' },
  { id: 'final-distribution', label: 'Casa de Bombas → Indústria', duration: 1800, activeNodes: ['cistern', 'pump-house', 'industry'], connections: ['cistern-pump-house', 'pump-house-industry'], waterState: 'DISINFECTED' }
];

export const processHighlights = ['lagoon', 'filtration', 'cistern', 'ro-label', 'permeate1', 'permeate2', 'industry'];

export function validateProcessGraph() {
  const nodeIds = new Set(processNodes.map((item) => item.id));
  const connectionIds = new Set();
  const errors = [];
  if (nodeIds.size !== processNodes.length) errors.push('IDs de nós duplicados.');
  processConnections.forEach((connection) => {
    if (connectionIds.has(connection.id)) errors.push(`ID de conexão duplicado: ${connection.id}`);
    connectionIds.add(connection.id);
    if (!nodeIds.has(connection.source) || !nodeIds.has(connection.target)) errors.push(`Conexão ${connection.id} aponta para nó inexistente.`);
    if (!Array.isArray(connection.points) || connection.points.length < 2) errors.push(`Conexão ${connection.id} não possui rota válida.`);
    const first = connection.points[0];
    const last = connection.points[connection.points.length - 1];
    if (first.x === last.x && first.y === last.y) errors.push(`Conexão degenerada: ${connection.id}`);
  });
  simulationStages.forEach((stage) => {
    stage.activeNodes.forEach((id) => { if (!nodeIds.has(id)) errors.push(`Stage ${stage.id} referencia nó inexistente: ${id}`); });
    stage.connections.forEach((id) => { if (!connectionIds.has(id)) errors.push(`Stage ${stage.id} referencia conexão inexistente: ${id}`); });
  });
  if (errors.length) throw new Error(`Modelo de processo inválido:\n${errors.join('\n')}`);
  return true;
}
