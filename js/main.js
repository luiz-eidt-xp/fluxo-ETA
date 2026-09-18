import { FlowAnimationEngine } from './flow-animation.js';

const svg = document.querySelector('#eta-diagram');
const advanceButton = document.querySelector('#advance-btn');
const viewport = document.querySelector('#diagram-viewport');
const statusNode = document.querySelector('#sim-status');
const currentStageNode = document.querySelector('#current-stage');

const engine = new FlowAnimationEngine({
  svg,
  advanceButton,
  statusNode,
  currentStageNode
});

engine.init();
advanceButton.addEventListener('click', () => engine.advanceSimulation());

let zoomLevel = 1;
let panX = 0;
let panY = 0;

const updateTransform = () => {
  svg.style.transform = `translate(${panX}px, ${panY}px) scale(${zoomLevel})`;
};

viewport.addEventListener('wheel', (event) => {
  event.preventDefault();
  const delta = event.deltaY > 0 ? -0.08 : 0.08;
  zoomLevel = Math.min(1.9, Math.max(0.7, zoomLevel + delta));
  updateTransform();
}, { passive: false });

let pointerDown = false;
let lastPoint = { x: 0, y: 0 };
viewport.addEventListener('pointerdown', (event) => {
  pointerDown = true;
  lastPoint = { x: event.clientX, y: event.clientY };
  viewport.setPointerCapture(event.pointerId);
});

viewport.addEventListener('pointermove', (event) => {
  if (!pointerDown) return;
  panX += event.clientX - lastPoint.x;
  panY += event.clientY - lastPoint.y;
  lastPoint = { x: event.clientX, y: event.clientY };
  updateTransform();
});

viewport.addEventListener('pointerup', () => {
  pointerDown = false;
});

viewport.addEventListener('pointercancel', () => {
  pointerDown = false;
});

updateTransform();
