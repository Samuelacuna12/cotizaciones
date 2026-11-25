const host = document.querySelector('[data-watch-scene]');
const visual = host?.closest('.hero-visual') ?? host?.parentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (host && visual && !reduceMotion.matches) {
  loadScene().catch(() => revealPhoto());
}

function revealPhoto() {
  visual.classList.remove('is-rendering');
  host.replaceChildren();
  host.setAttribute('aria-hidden', 'true');
  host.removeAttribute('tabindex');
  host.removeAttribute('aria-label');
  host.removeAttribute('aria-describedby');
  host.removeAttribute('role');
}

async function loadScene() {
  const [T, { RoundedBoxGeometry }] = await Promise.all([
    import('./assets/three/three.module.min.js'),
    import('./assets/three/RoundedBoxGeometry.js'),
  ]);
  if (reduceMotion.matches) return;

  const renderer = new T.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.14;
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.setAttribute('aria-hidden', 'true');
  Object.assign(canvas.style, { width: '100%', height: '100%', display: 'block' });
  host.style.touchAction = 'pan-y';

  const scene = new T.Scene();
  const environment = makeStudioLighting(T, renderer);
  scene.environment = environment.texture;
  scene.environmentIntensity = 1.02;
  const camera = new T.OrthographicCamera(-4, 4, 4, -4, 0.1, 30);
  camera.position.z = 12;
  const fill = new T.HemisphereLight(0xf7f9ff, 0xc5c0b9, 1.05);
  const key = new T.DirectionalLight(0xffffff, 1.85);
  key.position.set(-3, 4, 6);
  scene.add(fill, key);

  const dial = await new T.TextureLoader().loadAsync(new URL('./assets/hero-dial.webp', import.meta.url).href);
  dial.colorSpace = T.SRGBColorSpace;
  dial.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

  if (reduceMotion.matches) {
    dial.dispose();
    environment.dispose();
    renderer.dispose();
    return;
  }

  const watch = makeWatch(T, RoundedBoxGeometry, dial);
  scene.add(watch);
  scene.add(makeShadow(T));

  host.append(canvas);

  const rest = { x: 0.07, y: -0.27, z: -0.34 };
  const goal = { ...rest };
  const current = { ...rest };
  const bounds = { x: 0.52, y: 0.96 };
  let startTime;
  let visible = true;
  let frameId = 0;
  let previousTime = 0;
  let drag = null;
  let settled = false;
  let disposed = false;
  let allowIntro = true;

  function render(now) {
    frameId = 0;
    if (!visible || document.hidden || disposed) return;

    startTime ??= now;
    const elapsed = now - startTime;
    const introDuration = 4300;
    if (allowIntro && elapsed < introDuration) {
      const progress = elapsed / introDuration;
      const envelope = Math.sin(Math.PI * progress) ** 2;
      goal.x = rest.x + Math.sin(progress * 2 * Math.PI) * envelope * 0.09;
      goal.y = rest.y + envelope * 0.21;
      goal.z = rest.z + envelope * 0.035;
    } else if (allowIntro) {
      allowIntro = false;
      Object.assign(goal, rest);
    }

    const delta = Math.min((previousTime ? now - previousTime : 16) / 1000, 0.06);
    previousTime = now;
    const blend = 1 - Math.exp(-delta * (drag ? 23 : 11));
    for (const axis of ['x', 'y', 'z']) {
      current[axis] += (goal[axis] - current[axis]) * blend;
    }
    watch.rotation.set(current.x, current.y, current.z, 'XYZ');
    renderer.render(scene, camera);
    if (!settled) {
      settled = true;
      host.removeAttribute('aria-hidden');
      host.setAttribute('role', 'group');
      host.setAttribute('aria-label', '3D');
      host.setAttribute('aria-describedby', 'scene-caption');
      host.tabIndex = 0;
      visual.classList.add('is-rendering');
    }

    if (allowIntro || axesDiffer(current, goal)) requestDraw();
  }

  function requestDraw() {
    if (visible && !document.hidden && !frameId && !disposed) {
      frameId = requestAnimationFrame(render);
    }
  }

  function sizeScene() {
    const { width, height } = host.getBoundingClientRect();
    if (width < 1 || height < 1 || disposed) return;
    const aspect = width / height;
    const heightInUnits = Math.max(6.35, 4.65 / aspect);
    camera.top = heightInUnits / 2;
    camera.bottom = -heightInUnits / 2;
    camera.right = heightInUnits * aspect / 2;
    camera.left = -camera.right;
    camera.updateProjectionMatrix();
    renderer.setSize(Math.round(width), Math.round(height), false);
    requestDraw();
  }

  const resizeObserver = new ResizeObserver(sizeScene);
  resizeObserver.observe(host);
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) requestDraw();
    else {
      cancelAnimationFrame(frameId);
      frameId = 0;
      previousTime = 0;
    }
  });
  visibilityObserver.observe(host);

  const signals = new AbortController();
  function listen(target, event, handler, options = {}) {
    target.addEventListener(event, handler, { ...options, signal: signals.signal });
  }

  listen(document, 'visibilitychange', requestDraw);
  listen(host, 'pointerdown', (event) => {
    if (drag || !event.isPrimary || event.button !== 0) return;
    allowIntro = false;
    Object.assign(goal, current);
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY };
    host.setPointerCapture(event.pointerId);
    host.classList.add('is-dragging');
    requestDraw();
  });
  listen(host, 'pointermove', (event) => {
    if (drag?.id !== event.pointerId) return;
    goal.y = T.MathUtils.clamp(goal.y + (event.clientX - drag.x) * 0.008, -bounds.y, bounds.y);
    goal.x = T.MathUtils.clamp(goal.x + (event.clientY - drag.y) * 0.007, -bounds.x, bounds.x);
    drag.x = event.clientX;
    drag.y = event.clientY;
    requestDraw();
  });
  function endDrag(event) {
    if (drag?.id !== event.pointerId) return;
    drag = null;
    host.classList.remove('is-dragging');
    requestDraw();
  }
  listen(host, 'pointerup', endDrag);
  listen(host, 'pointercancel', endDrag);
  listen(host, 'lostpointercapture', endDrag);

  listen(host, 'keydown', (event) => {
    const shifts = {
      ArrowLeft: [0, -0.16],
      ArrowRight: [0, 0.16],
      ArrowUp: [-0.12, 0],
      ArrowDown: [0.12, 0],
    };
    const shift = shifts[event.key];
    if (!shift && event.key !== 'Home') return;
    event.preventDefault();
    allowIntro = false;
    if (shift) {
      goal.x = T.MathUtils.clamp(goal.x + shift[0], -bounds.x, bounds.x);
      goal.y = T.MathUtils.clamp(goal.y + shift[1], -bounds.y, bounds.y);
    } else {
      Object.assign(goal, rest);
    }
    requestDraw();
  });

  function destroy() {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(frameId);
    resizeObserver.disconnect();
    visibilityObserver.disconnect();
    signals.abort();
    dial.dispose();
    environment.dispose();
    renderer.dispose();
    revealPhoto();
  }

  listen(canvas, 'webglcontextlost', destroy, { once: true });
  listen(reduceMotion, 'change', (event) => {
    if (event.matches) destroy();
  });
  sizeScene();
}

function axesDiffer(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z) > 0.001;
}

function makeStudioLighting(T, renderer) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#8b8e93';
  ctx.fillRect(0, 0, 512, 256);
  ctx.fillStyle = '#27292d';
  ctx.fillRect(6, 32, 96, 176);
  ctx.fillRect(256, 40, 82, 160);
  ctx.fillStyle = '#38383a';
  ctx.fillRect(436, 55, 69, 136);
  ctx.fillStyle = '#e9ecef';
  ctx.fillRect(113, 26, 53, 185);
  ctx.fillRect(374, 10, 28, 214);
  ctx.fillStyle = '#fff';
  ctx.fillRect(177, 24, 71, 84);
  ctx.fillRect(348, 24, 16, 184);
  const roof = ctx.createLinearGradient(0, 0, 0, 75);
  roof.addColorStop(0, '#e8e8eb');
  roof.addColorStop(1, 'rgba(240,240,240,0)');
  ctx.fillStyle = roof;
  ctx.fillRect(0, 0, 512, 75);
  const floor = ctx.createLinearGradient(0, 194, 0, 256);
  floor.addColorStop(0, 'rgba(245,242,238,0)');
  floor.addColorStop(1, '#edeae6');
  ctx.fillStyle = floor;
  ctx.fillRect(0, 194, 512, 62);

  const map = new T.CanvasTexture(canvas);
  map.mapping = T.EquirectangularReflectionMapping;
  map.colorSpace = T.SRGBColorSpace;
  const generator = new T.PMREMGenerator(renderer);
  const result = generator.fromEquirectangular(map);
  map.dispose();
  generator.dispose();
  return result;
}

function makeWatch(T, RoundedBoxGeometry, dial) {
  const watch = new T.Group();
  const steel = new T.MeshStandardMaterial({ color: 0xcad0d3, metalness: 0.96, roughness: 0.24 });
  const brightSteel = new T.MeshStandardMaterial({ color: 0xe5e6e6, metalness: 0.98, roughness: 0.17 });
  const brushedSteel = new T.MeshPhysicalMaterial({
    color: 0xc8cbcc,
    metalness: 0.95,
    roughness: 0.34,
    anisotropy: 0.43,
  });
  const shadowSteel = new T.MeshStandardMaterial({ color: 0x797b80, metalness: 0.94, roughness: 0.24 });
  const gap = new T.MeshStandardMaterial({ color: 0x25272a, metalness: 0.5, roughness: 0.5 });

  function profile(points, material, fluted = false) {
    const shape = new T.LatheGeometry(points.map(([radius, depth]) => new T.Vector2(radius, depth)), 160);
    if (fluted) {
      const positions = shape.attributes.position;
      for (let i = 0; i < positions.count; i += 1) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = positions.getZ(i);
        const radius = Math.hypot(x, z);
        const angle = Math.atan2(x, z);
        const indent = ((Math.cos(angle * 24) + 1) / 2) ** 7;
        const weight = T.MathUtils.clamp((radius - 1.18) / 0.12, 0, 1);
        const scale = 1 - 0.019 * indent * weight;
        positions.setXYZ(i, x * scale, y - 0.018 * indent * weight, z * scale);
      }
      shape.computeVertexNormals();
    }
    const mesh = new T.Mesh(shape, material);
    mesh.rotation.x = Math.PI / 2;
    watch.add(mesh);
    return mesh;
  }

  profile([[0.02, -0.22], [1.04, -0.22], [1.13, -0.20], [1.20, -0.16], [1.25, -0.10]], brushedSteel);
  profile([[1.20, -0.20], [1.27, -0.15], [1.30, -0.07], [1.31, 0.10], [1.28, 0.18], [1.17, 0.20]], steel);
  profile([[1.27, 0.12], [1.33, 0.20], [1.30, 0.27], [1.16, 0.327], [1.105, 0.32], [1.08, 0.273]], brightSteel, true);
  profile([[1.09, 0.285], [1.12, 0.310], [1.135, 0.318], [1.15, 0.31]], shadowSteel);
  profile([[1.088, 0.297], [1.11, 0.308], [1.118, 0.304]], brightSteel);

  const face = new T.Mesh(new T.CircleGeometry(1.11, 96), new T.MeshBasicMaterial({ map: dial, toneMapped: false }));
  face.position.z = 0.304;
  watch.add(face);

  const bezelPrint = makeBezelPrint(T);
  const bezel = new T.Mesh(
    new T.PlaneGeometry(2.66, 2.66),
    new T.MeshBasicMaterial({ map: bezelPrint, transparent: true, toneMapped: false, depthWrite: false }),
  );
  bezel.position.z = 0.316;
  watch.add(bezel);

  const lug = new T.Shape();
  lug.moveTo(0.54, 0.72);
  lug.lineTo(0.98, 0.71);
  lug.quadraticCurveTo(0.89, 1.24, 0.77, 1.47);
  lug.quadraticCurveTo(0.70, 1.52, 0.53, 1.49);
  lug.lineTo(0.44, 1.23);
  lug.closePath();
  const lugGeometry = new T.ExtrudeGeometry(lug, {
    depth: 0.18,
    bevelEnabled: true,
    bevelThickness: 0.045,
    bevelSize: 0.045,
    bevelSegments: 4,
    steps: 1,
    curveSegments: 8,
  });
  for (const horizontal of [-1, 1]) {
    for (const vertical of [-1, 1]) {
      const mount = new T.Mesh(lugGeometry, steel);
      mount.position.z = -0.14;
      mount.scale.set(horizontal, vertical, 1);
      watch.add(mount);
    }
  }

  for (const direction of [-1, 1]) {
    for (let index = 0; index < 8; index += 1) {
      const progress = index / 7;
      const tilt = direction * (0.05 - progress * 0.81);
      const row = new T.Group();
      row.position.set(0, direction * (1.31 + index * 0.235 - 0.39 * progress ** 2), -0.07 - 0.66 * progress ** 2);
      row.rotation.x = tilt;
      const width = 1.37 - progress * 0.25;
      const polishedWidth = width * 0.29;
      const outerWidth = width * 0.225;
      const connectorWidth = width * 0.119;
      const center = new T.Mesh(new RoundedBoxGeometry(polishedWidth, 0.223, 0.23, 2, 0.043), brushedSteel);
      center.position.z = 0.045;
      const under = new T.Mesh(new RoundedBoxGeometry(width * 0.94, 0.238, 0.12, 1, 0.04), gap);
      under.position.z = -0.04;
      row.add(center, under);
      for (const side of [-1, 1]) {
        const connector = new T.Mesh(new RoundedBoxGeometry(connectorWidth, 0.235, 0.20, 2, 0.03), brightSteel);
        connector.position.set(side * width * 0.217, 0, 0.035);
        const outer = new T.Mesh(new RoundedBoxGeometry(outerWidth, 0.221, 0.236, 2, 0.048), steel);
        outer.position.set(side * width * 0.392, 0, 0.02);
        row.add(connector, outer);
      }
      watch.add(row);
    }
  }

  function crownCylinder(radius, depth, x, material) {
    const part = new T.Mesh(new T.CylinderGeometry(radius, radius, depth, 48), material);
    part.position.set(x, 0, -0.025);
    part.rotation.z = Math.PI / 2;
    watch.add(part);
  }
  crownCylinder(0.158, 0.085, 1.29, steel);
  crownCylinder(0.145, 0.156, 1.392, shadowSteel);
  crownCylinder(0.134, 0.04, 1.477, brightSteel);
  const ridges = new T.InstancedMesh(new RoundedBoxGeometry(0.136, 0.018, 0.020, 1, 0.005), brightSteel, 30);
  const ridge = new T.Object3D();
  for (let index = 0; index < 30; index += 1) {
    const angle = index * Math.PI * 2 / 30;
    ridge.position.set(1.400, 0.147 * Math.cos(angle), -0.025 + 0.147 * Math.sin(angle));
    ridge.rotation.x = angle;
    ridge.updateMatrix();
    ridges.setMatrixAt(index, ridge.matrix);
  }
  watch.add(ridges);
  return watch;
}

function makeBezelPrint(T) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 512;
  const ctx = canvas.getContext('2d');
  ctx.translate(256, 256);
  ctx.fillStyle = '#222325';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '800 24px Arial, sans-serif';
  for (let index = 0; index < 6; index += 1) {
    ctx.save();
    ctx.rotate(index * Math.PI / 3);
    ctx.fillText(index === 0 ? '60' : String(index * 10), 0, -234);
    ctx.restore();
  }
  return new T.CanvasTexture(canvas);
}

function makeShadow(T) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(64, 64, 2, 64, 64, 63);
  gradient.addColorStop(0, 'rgba(15,17,20,0.28)');
  gradient.addColorStop(0.42, 'rgba(15,17,20,0.12)');
  gradient.addColorStop(1, 'rgba(15,17,20,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  const mesh = new T.Mesh(new T.PlaneGeometry(3.7, 1.42), new T.MeshBasicMaterial({
    map: new T.CanvasTexture(canvas),
    transparent: true,
    depthWrite: false,
    toneMapped: false,
  }));
  mesh.position.set(0.29, -1.99, -2.4);
  return mesh;
}
