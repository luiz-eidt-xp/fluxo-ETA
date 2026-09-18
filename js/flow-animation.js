import { processAreas, processNodes, processConnections, simulationStages, validateProcessGraph } from './diagram-data.js';

const svgNamespace = 'http://www.w3.org/2000/svg';

export class FlowAnimationEngine {
  constructor({ svg, advanceButton, statusNode, currentStageNode }) {
    this.svg = svg;
    this.advanceButton = advanceButton;
    this.statusNode = statusNode;
    this.currentStageNode = currentStageNode;
    this.nodes = processNodes;
    this.connections = processConnections;
    this.nodeMap = new Map(this.nodes.map((node) => [node.id, node]));
    this.connectionMap = new Map(this.connections.map((connection) => [connection.id, connection]));
    this.state = 'IDLE';
    this.speed = 1;
    this.stageIndex = 0;
    this.stageElapsed = 0;
    this.lastTimestamp = null;
    this.animationFrameId = null;
    this.packets = [];
    this.selectedNodeId = 'lagoon';
    this.bound = false;
  }

  init() {
    validateProcessGraph();
    this.renderDiagram();
    this.bindEvents();
    this.syncVisualState();
    this.updateControls();
    this.ensureFrame();
  }

  createElement(tag, attributes = {}) {
    const element = document.createElementNS(svgNamespace, tag);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    return element;
  }

  renderDiagram() {
    this.svg.innerHTML = '<defs><marker id="arrowHead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M 0 0 L 10 3 L 0 6 z" fill="rgba(128, 217, 232, 0.9)"></path></marker></defs>';
    this.zoneLayer = this.createElement('g', { id: 'zones' });
    this.pipeLayer = this.createElement('g', { id: 'pipes' });
    this.nodeLayer = this.createElement('g', { id: 'nodes' });
    this.particleLayer = this.createElement('g', { id: 'particles' });
    this.svg.append(this.zoneLayer, this.pipeLayer, this.nodeLayer, this.particleLayer);

    processAreas.forEach((area) => {
      const zone = this.createElement('g', { class: 'process-zone', 'data-area-id': area.id });
      zone.appendChild(this.createElement('rect', { x: area.x, y: area.y, width: area.width, height: area.height, rx: 14, class: 'zone' }));
      const label = this.createElement('text', { x: area.x + 18, y: area.y + 28, class: 'zone-label' });
      label.textContent = area.label;
      zone.appendChild(label);
      this.zoneLayer.appendChild(zone);
    });

    this.connections.forEach((connection) => {
      const path = this.createElement('path', { d: this.buildPath(connection.points), class: 'pipe', 'data-connection-id': connection.id, 'data-source': connection.source, 'data-target': connection.target, 'marker-end': 'url(#arrowHead)' });
      this.pipeLayer.appendChild(path);
    });

    this.nodes.forEach((node) => this.renderNode(node));
  }

  renderNode(node) {
    const group = this.createElement('g', { 'data-node-id': node.id, tabindex: '0', role: 'button', 'aria-label': node.name });
    const width = node.width || node.radius * 2;
    const height = node.height || node.radius * 2;
    group.appendChild(this.createElement('rect', { class: 'node-highlight', x: node.x - width / 2 - 8, y: node.y - height / 2 - 8, width: width + 16, height: height + 16, rx: 12, 'data-node-id': node.id }));

    if (node.type === 'source' || node.type === 'industry' || node.type === 'lagoon') {
      group.appendChild(this.createElement('circle', { cx: node.x, cy: node.y, r: node.radius, class: 'node-shape', fill: '#1a5662' }));
    } else if (node.type === 'cistern') {
      const top = node.y - node.height / 2 + 22;
      group.appendChild(this.createElement('path', { d: `M ${node.x - node.width / 2} ${top} L ${node.x + node.width / 2} ${top} L ${node.x + node.width / 2} ${node.y + node.height / 2} L ${node.x - node.width / 2} ${node.y + node.height / 2} Z`, class: 'node-shape', fill: '#1a5662' }));
    } else {
      group.appendChild(this.createElement('rect', { x: node.x - width / 2, y: node.y - height / 2, width, height, rx: 9, class: 'node-shape', fill: '#1a5662' }));
    }

    const label = this.createElement('text', { x: node.x, y: node.y, class: 'node-label' });
    (node.label || node.name).split('\n').forEach((line, index) => {
      const tspan = this.createElement('tspan', { x: node.x, dy: index === 0 ? 0 : 17 });
      tspan.textContent = line;
      label.appendChild(tspan);
    });
    group.appendChild(label);
    this.nodeLayer.appendChild(group);
  }

  bindEvents() {
    if (this.bound) return;
    this.bound = true;
    this.svg.addEventListener('click', (event) => {
      const target = event.target.closest('[data-node-id]');
      if (target) this.updateNodeSelection(target.dataset.nodeId);
    });
    this.svg.addEventListener('mousemove', (event) => {
      this.svg.style.cursor = event.target.closest('[data-node-id]') ? 'pointer' : 'default';
    });
  }

  buildPath(points) {
    return points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
  }

  currentStage() {
    return simulationStages[this.stageIndex];
  }

  setStatus(value) {
    this.statusNode.textContent = value;
  }

  updateNodeSelection(nodeId) {
    if (!this.nodeMap.has(nodeId)) return;
    this.selectedNodeId = nodeId;
    this.svg.querySelectorAll('.node-highlight').forEach((highlight) => highlight.classList.toggle('visible', highlight.dataset.nodeId === nodeId));
  }

  updateControls() {
    const isCompleted = this.state === 'COMPLETED';
    const isRunning = this.state === 'RUNNING';
    this.advanceButton.disabled = isRunning;
    this.advanceButton.textContent = isCompleted ? 'REINICIAR' : 'AVANÇAR';
    this.advanceButton.setAttribute('aria-label', isCompleted ? 'Reiniciar simulação' : 'Avançar para a próxima etapa');
    this.statusNode.dataset.state = this.state.toLowerCase();
  }

  advanceSimulation() {
    if (this.state === 'COMPLETED') {
      this.reset();
      return;
    }

    if (this.state === 'IDLE') {
      this.state = 'RUNNING';
      this.stageElapsed = 0;
      this.lastTimestamp = null;
      this.setStatus('EM EXECUÇÃO');
      this.syncVisualState();
      this.updateControls();
      this.ensureFrame();
      return;
    }

    if (this.state !== 'WAITING') return;

    if (this.stageIndex === simulationStages.length - 1) {
      this.state = 'COMPLETED';
      this.setStatus('CONCLUÍDO');
      this.updateControls();
      this.syncVisualState();
      return;
    }

    this.stageIndex += 1;
    this.stageElapsed = 0;
    this.lastTimestamp = null;
    this.state = 'RUNNING';
    this.setStatus('EM EXECUÇÃO');
    this.syncVisualState();
    this.updateControls();
    this.ensureFrame();
  }

  reset() {
    cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = null;
    this.state = 'IDLE';
    this.stageIndex = 0;
    this.stageElapsed = 0;
    this.lastTimestamp = null;
    this.clearPackets();
    this.setStatus('PRONTO');
    this.syncVisualState();
    this.updateControls();
    this.ensureFrame();
  }

  ensureFrame() {
    if (this.animationFrameId !== null) return;
    this.animationFrameId = requestAnimationFrame((timestamp) => this.tick(timestamp));
  }

  tick(timestamp) {
    this.animationFrameId = null;
    if (this.lastTimestamp === null) this.lastTimestamp = timestamp;
    const delta = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;

    if (this.state === 'RUNNING') {
      this.stageElapsed = Math.min(this.currentStage().duration, this.stageElapsed + delta * this.speed);
      if (this.stageElapsed >= this.currentStage().duration) {
        this.stageElapsed = this.currentStage().duration;
        if (this.stageIndex === simulationStages.length - 1) {
          this.state = 'COMPLETED';
          this.setStatus('CONCLUÍDO');
        } else {
          this.state = 'WAITING';
          this.setStatus('AGUARDANDO AVANÇAR');
        }
        this.updateControls();
      }
    }

    this.syncVisualState();
    if (this.state !== 'IDLE' && this.state !== 'COMPLETED') {
      this.syncPackets();
      this.updatePackets(delta);
    }
    this.ensureFrame();
  }

  syncVisualState() {
    const stage = this.currentStage();
    const isIdle = this.state === 'IDLE';
    const activeNodes = new Set(isIdle ? [] : stage.activeNodes);
    const activeConnections = new Set(isIdle ? [] : stage.connections);
    const completedConnections = new Set();
    const completedNodes = new Set();
    if (!isIdle) {
      simulationStages.slice(0, this.stageIndex).forEach((completedStage) => {
        completedStage.connections.forEach((id) => completedConnections.add(id));
        completedStage.activeNodes.forEach((id) => completedNodes.add(id));
      });
    }

    this.currentStageNode.textContent = stage.label;
    this.svg.querySelectorAll('.pipe').forEach((pipe) => {
      const active = activeConnections.has(pipe.dataset.connectionId);
      pipe.classList.toggle('pipe-active', active);
      pipe.classList.toggle('pipe-complete', !active && completedConnections.has(pipe.dataset.connectionId));
      pipe.classList.toggle('pipe-chemical', active && this.connectionMap.get(pipe.dataset.connectionId).flowType === 'chemical');
    });
    this.svg.querySelectorAll('.node-shape').forEach((shape) => {
      const id = shape.closest('[data-node-id]')?.dataset.nodeId;
      const active = activeNodes.has(id);
      const complete = !active && completedNodes.has(id);
      shape.classList.toggle('node-active', active);
      shape.classList.toggle('node-complete', complete);
      shape.setAttribute('fill', active || complete ? this.nodeColor(stage.waterState) : '#1a5662');
    });
  }

  nodeColor(state) {
    return { RAW: '#173e49', COAGULATING: '#705d2b', FLOCCULATING: '#1e5e68', CLARIFIED: '#255e68', FILTERED: '#216a78', TREATED: '#2d7e68', RO_FEED: '#2f8aa7', RO_PERMEATE: '#5eabb8', DISINFECTED: '#3c8f76' }[state] || '#1a5662';
  }

  syncPackets() {
    const activeIds = new Set(this.currentStage().connections);
    activeIds.forEach((connectionId) => {
      if (this.packets.some((packet) => packet.connectionId === connectionId)) return;
      const connection = this.connectionMap.get(connectionId);
      const count = connection.flowType === 'chemical' ? 5 : 9;
      for (let index = 0; index < count; index += 1) {
        const circle = this.createElement('circle', { class: connection.flowType === 'chemical' ? 'particle particle-coag' : 'particle particle-water', r: connection.flowType === 'chemical' ? 3.5 : 4 });
        this.particleLayer.appendChild(circle);
        this.packets.push({ connectionId, connection, circle, progress: index / count, speed: 0.0002 + index % 3 * 0.00004 });
      }
    });
  }

  updatePackets(delta) {
    this.packets = this.packets.filter((packet) => {
      packet.progress += delta * packet.speed * this.speed;
      if (packet.progress >= 1) {
        packet.progress = 0;
      }
      const point = this.pointAt(packet.connection.points, packet.progress);
      packet.circle.setAttribute('cx', point.x);
      packet.circle.setAttribute('cy', point.y);
      return true;
    });
  }

  pointAt(points, progress) {
    const segments = points.slice(1).map((point, index) => ({ from: points[index], to: point, length: Math.hypot(point.x - points[index].x, point.y - points[index].y) }));
    const total = segments.reduce((sum, segment) => sum + segment.length, 0);
    let remaining = total * progress;
    for (const segment of segments) {
      if (remaining <= segment.length) {
        const ratio = segment.length ? remaining / segment.length : 0;
        return { x: segment.from.x + (segment.to.x - segment.from.x) * ratio, y: segment.from.y + (segment.to.y - segment.from.y) * ratio };
      }
      remaining -= segment.length;
    }
    return points[points.length - 1];
  }

  clearPackets() {
    this.packets.forEach((packet) => packet.circle.remove());
    this.packets = [];
  }
}
