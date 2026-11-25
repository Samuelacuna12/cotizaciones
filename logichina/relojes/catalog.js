const boxPhoto = '16';
const productPhotos = Array.from({ length: 16 }, (_, index) => String(index + 1).padStart(2, '0'));

const translations = {
  es: {
    wordmark: 'Cotizaciones', title: 'Productos\na cotizar', nav: 'Secciones', language: 'Idioma',
    productsLink: 'Productos', quoteLink: 'Cotización', skip: 'Ir al contenido',
    destination: 'Precio puesto en bodega Logi, Colombia.',
    intro: 'Cada reloj y la caja deben llevar nuestra marca propia a un solo color. Cotiza el precio unitario y total de cada referencia con entrega en bodega.',
    seeRequest: 'Ver solicitud de cotización', rotate: 'Arrastra o usa las flechas para girar el reloj',
    count: '15 relojes · 1 caja', watch: 'Reloj {number}', box: 'Caja',
    requestTitle: 'Qué necesitamos cotizar', requestIntro: 'Por favor, confirma estos puntos con cada proveedor.',
    requestLabel: 'Solicitud de cotización', copy: 'Copiar solicitud', copied: 'Solicitud copiada.',
    copyHelp: 'Selecciona y copia el texto para compartirlo.', back: 'Volver arriba',
    questions: [
      ['Precio en bodega Logi', 'Indica el precio unitario y total por referencia, moneda y escalas por cantidad. Desglosa producto, transporte, seguro, aduana, impuestos y cualquier cargo local. Confirma el Incoterm, si puedes entregar DDP y quién se encarga de la importación.'],
      ['Forma de pago', '¿Qué métodos de pago aceptan? Confirma si ofrecen transferencia bancaria o un método con protección al comprador, la moneda, las comisiones, el porcentaje de anticipo, cuándo vence el saldo y qué comprobante entregan.'],
      ['Pedido mínimo y disponibilidad', 'Confirma el mínimo por modelo y color, si se pueden mezclar referencias en un pedido, qué variantes tienen disponibles y si el stock cambia al personalizar.'],
      ['Muestras', 'Cotiza una muestra por referencia y una de la caja. Indica costo del producto, envío y plazo. Confirma si descuentan el costo de las muestras al hacer el pedido.'],
      ['Marca propia obligatoria', 'Cada reloj y la caja deben llevar nuestra marca propia a un solo color. Incluye el costo de personalización en la cotización e indica la ubicación de la marca, la técnica, los colores disponibles y el mínimo de pedido. Envía una prueba visual para aprobar antes de producir.'],
      ['Caja y embalaje', 'Cotiza la caja por separado y el reloj con caja. Confirma medidas, material, compatibilidad con cada reloj, protección para transporte y peso y dimensiones del envío.'],
      ['Producción y entrega', 'Indica el plazo de producción y el tránsito estimado hasta la bodega Logi en Colombia. Confirma qué datos de entrega necesitas, si se pueden consolidar referencias, el seguimiento y los documentos de envío.'],
      ['Calidad, garantía y vigencia', 'Confirma que cada referencia corresponde a la foto y detalla la garantía y cómo resuelven defectos o faltantes. Indica si podemos inspeccionar antes del envío y hasta cuándo es válida la cotización.'],
    ],
  },
  'zh-Hans': {
    wordmark: '询价', title: '待报价\n产品', nav: '页面栏目', language: '语言',
    productsLink: '产品', quoteLink: '报价要求', skip: '跳至正文',
    destination: '请报送达哥伦比亚 Logi 仓库的价格。',
    intro: '每款腕表及礼盒均须带有我方自有品牌的单色标识。请按款分别报送达仓库的单价和总价。',
    seeRequest: '查看询价要求', rotate: '拖动或按方向键旋转腕表',
    count: '15 款腕表 · 1 款礼盒', watch: '{number} 号腕表', box: '腕表礼盒',
    requestTitle: '请确认以下报价信息', requestIntro: '请与每家供应商逐项确认以下信息。',
    requestLabel: '询价内容', copy: '复制询价内容', copied: '询价内容已复制。',
    copyHelp: '请选择并复制下方文字以便分享。', back: '返回顶部',
    questions: [
      ['送达 Logi 仓库的报价', '请按款式提供单价、总价、报价币种及阶梯价格，并分别列明货款、运输费、保险费、清关费、关税及其他税费和当地费用。请确认适用的贸易术语、是否可做 DDP（完税后交货），以及由谁负责进口清关。'],
      ['付款方式', '请说明可接受的付款方式，是否支持银行电汇或带买家保障的付款方式，并注明付款币种、手续费、定金比例、尾款支付时间以及可提供的付款凭证。'],
      ['起订量及库存', '请确认每款、每种颜色的最小起订量，是否允许混款下单，目前有哪些颜色或款式有现货，以及定制是否影响库存或交期。'],
      ['样品', '请分别报价每款腕表及礼盒各一件样品，注明样品费、运费和交期。请确认下正式订单后能否抵扣样品费。'],
      ['必须使用我方自有品牌', '每款腕表及礼盒均须带有我方自有品牌的单色标识。请将定制费用计入报价，并注明标识位置、工艺、可选颜色及最小起订量。请在生产前提供效果图供我们确认。'],
      ['礼盒及运输包装', '请分别报价单独购买礼盒及腕表配礼盒。请确认礼盒的尺寸、材质、适配的腕表款式、运输防护方式，以及整票货物的重量和尺寸。'],
      ['生产及交货', '请提供生产周期，以及运抵哥伦比亚 Logi 仓库的预计运输时间。请说明需要哪些收货信息，能否合并发运多款产品，如何查询物流及提供哪些运输单据。'],
      ['质量、质保及报价有效期', '请确认每款产品与照片一致，并说明质保条款及瑕疵或短缺的处理方式。请说明能否在发货前验货，并注明报价有效期。'],
    ],
  },
  en: {
    wordmark: 'Quotes', title: 'Products\nto quote', nav: 'Sections', language: 'Language',
    productsLink: 'Products', quoteLink: 'Quote request', skip: 'Skip to content',
    destination: 'Price delivered to the Logi warehouse in Colombia.',
    intro: 'Every watch and the box must carry our own brand in a single color. Please quote the unit and total price for each item, delivered to the warehouse.',
    seeRequest: 'View quote request', rotate: 'Drag or use the arrow keys to rotate the watch',
    count: '15 watches · 1 box', watch: 'Watch {number}', box: 'Watch box',
    requestTitle: 'What to include in the quote', requestIntro: 'Please confirm the following with each supplier.',
    requestLabel: 'Quote request', copy: 'Copy quote request', copied: 'Quote request copied.',
    copyHelp: 'Select and copy the text to share it.', back: 'Back to top',
    questions: [
      ['Price delivered to the Logi warehouse', 'Provide unit and total pricing by item, the currency, and quantity price breaks. Itemize product, freight, insurance, customs clearance, duties, taxes, and local charges. State the Incoterm, whether you offer DDP, and who handles import clearance.'],
      ['Payment terms', 'Which payment methods do you accept? Confirm whether bank transfer or a payment method with buyer protection is available, the currency, any fees, the deposit percentage, when the balance is due, and what payment documentation you provide.'],
      ['Minimum order and availability', 'Confirm the MOQ by model and color, whether models can be mixed in one order, which variants are available, and whether customization affects availability.'],
      ['Samples', 'Quote one sample per watch and one box sample. Include the sample cost, shipping, and lead time. Confirm whether the sample cost is credited against the bulk order.'],
      ['Our own branding is required', 'Every watch and the box must carry our own brand in a single color. Include customization in the quoted price and specify the brand placement, method, available colors, and minimum order. Provide a visual proof for approval before production.'],
      ['Box and packaging', 'Quote the box separately and the watch with its box. Confirm dimensions, material, fit for each watch, transit protection, and the shipment weight and dimensions.'],
      ['Production and delivery', 'State the production lead time and estimated transit time to the Logi warehouse in Colombia. Confirm what delivery details you need, whether items can be consolidated, and what tracking and shipping documents you provide.'],
      ['Quality, warranty, and quote validity', 'Confirm that each item matches its photo and state the warranty terms and remedies for defects or missing items. State whether pre-shipment inspection is available and how long the quote is valid.'],
    ],
  },
};

const grid = document.querySelector('#product-grid');
const questionList = document.querySelector('#question-list');
const copyStatus = document.querySelector('#copy-status');
const manualCopy = document.querySelector('#manual-copy');
const languageButtons = [...document.querySelectorAll('[data-lang]')];
let currentLanguage = 'es';

function productLabel(photo, text) {
  return photo === boxPhoto ? text.box : text.watch.replace('{number}', photo);
}

function renderProducts(text) {
  const cards = productPhotos.map((photo, index) => {
    const card = document.createElement('article');
    card.className = 'product';

    const frame = document.createElement('div');
    frame.className = 'product-media';
    const image = document.createElement('img');
    image.src = './assets/' + photo + '.webp';
    image.alt = '';
    image.width = 840;
    image.height = 840;
    image.loading = index < 4 ? 'eager' : 'lazy';
    image.decoding = 'async';
    frame.append(image);

    const label = document.createElement('h3');
    label.textContent = productLabel(photo, text);
    card.append(frame, label);
    return card;
  });
  grid.replaceChildren(...cards);
}

function setLanguage(language) {
  const text = translations[language];
  currentLanguage = language;
  document.documentElement.lang = language;
  document.title = text.title.replace('\n', ' ');
  document.querySelector('meta[name="description"]').content = text.destination + ' ' + text.intro;

  document.querySelectorAll('[data-text]').forEach(element => {
    const lines = text[element.dataset.text].split('\n');
    element.replaceChildren(lines[0]);
    for (const line of lines.slice(1)) element.append(document.createElement('br'), line);
  });
  document.querySelectorAll('[data-aria]').forEach(element => {
    element.setAttribute('aria-label', text[element.dataset.aria]);
  });
  languageButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === language)));
  renderProducts(text);
  questionList.replaceChildren(...text.questions.map(([question, details]) => {
    const item = document.createElement('li');
    const heading = document.createElement('h3');
    const paragraph = document.createElement('p');
    heading.textContent = question;
    paragraph.textContent = details;
    item.append(heading, paragraph);
    return item;
  }));

  copyStatus.textContent = '';
  manualCopy.hidden = true;
  const url = new URL(location.href);
  if (language === 'es') url.searchParams.delete('lang');
  else url.searchParams.set('lang', language);
  if (url.href !== location.href) history.replaceState(null, '', url);
}

function quoteText(language) {
  const text = translations[language];
  const questions = text.questions.map(([question, detail]) => question + '\n' + detail);
  const items = productPhotos.map(photo => productLabel(photo, text));
  return [
    text.title.replace('\n', ' '),
    text.destination + '\n' + text.intro,
    ...questions,
    text.productsLink + ' · ' + text.count,
    items.join('\n'),
  ].join('\n\n');
}

languageButtons.forEach(button => button.addEventListener('click', () => {
  if (button.dataset.lang !== currentLanguage) setLanguage(button.dataset.lang);
}));

document.querySelector('#copy-request').addEventListener('click', async () => {
  const language = currentLanguage;
  const text = translations[language];
  const content = quoteText(language);
  try {
    await navigator.clipboard.writeText(content);
    if (language !== currentLanguage) return;
    manualCopy.hidden = true;
    copyStatus.textContent = text.copied;
  } catch {
    if (language !== currentLanguage) return;
    manualCopy.value = content;
    manualCopy.hidden = false;
    manualCopy.focus();
    manualCopy.select();
    copyStatus.textContent = text.copyHelp;
  }
});

const requestedLanguage = new URLSearchParams(location.search).get('lang');
setLanguage(Object.hasOwn(translations, requestedLanguage) ? requestedLanguage : 'es');
document.querySelector('#request-actions').hidden = false;
