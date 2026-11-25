const products = [
  { brand: 'LOUIE JUELEN', listing: 'LOUIE-JUELEN-Men-s-Automatic-Hollow_1602029038971', names: ['Automático esqueletado', '镂空自动机械表', 'Skeleton automatic watch'] },
  { brand: 'MONTAGUT', listing: 'Moon-Phase-Week-Display-Wristwatch-Wholesale_1601979902878', names: ['MTJ-5202 con fase lunar', 'MTJ-5202 月相腕表', 'MTJ-5202 moonphase watch'] },
  { brand: 'OCHSTIN', listing: 'OCHSTIN-62028-Automatic-Watch-Mechanical-Pilot_1601456214728', names: ['62028 automático estilo piloto', '62028 飞行员款自动机械表', '62028 automatic pilot watch'] },
  { brand: 'POEDAGAR', listing: 'New-POEDAGAR-930-Watch-for-Men_1601855465404', names: ['930 de cuarzo', '930 石英腕表', '930 quartz watch'] },
  { brand: 'SUNON', listing: 'Luxury-Walnut-Wood-Stainless-Steel-Watch_1601613024229', names: ['Cronógrafo de nogal y acero', '胡桃木与不锈钢计时腕表', 'Walnut and steel chronograph'] },
  { brand: 'AIMANA', listing: 'Executive-Refined-Quartz-Watch-30m-Waterproof_1601917892442', names: ['Reloj ejecutivo de cuarzo', '商务石英腕表', 'Executive quartz watch'] },
  { brandKey: 'customBrand', listing: 'OEM-Wholesale-Waterproof-Men-s-Wristwatch_1601723937060', names: ['Reloj OEM de cuarzo con brazalete de acero', '钢带 OEM 石英腕表', 'OEM quartz watch with a steel bracelet'] },
  { brandKey: 'unconfirmedBrand', listing: 'Luxury-Fashion-Men-s-Alloy-Case_1601767462915', names: ['Reloj deportivo con correa de silicona', '硅胶表带运动腕表', 'Sports watch with a silicone strap'] },
  { brand: 'AIMANA', listing: 'New-Waterproof-Ultra-thin-Men-s_1601904246789', names: ['Reloj ultradelgado de cuarzo', '超薄石英腕表', 'Ultra-thin quartz watch'] },
  { brand: 'VDEAR', listing: 'Men-Automatic-Watches-Luxury-Automatic-Watch_1601636913269', names: ['Automático con reserva de marcha', '带动力储存显示的自动机械表', 'Automatic watch with a power reserve indicator'] },
  { brand: 'VDEAR', listing: 'Relojes-Hombre-Original-Brand-Luxury-Men_1601778187971', names: ['Automático estilo diver', '潜水风格自动机械表', 'Diver-style automatic watch'] },
  { brand: 'MAROSERTO', listing: 'MAROSERTO-Men-s-Business-Quartz-Watch_1602017073516', names: ['Reloj de cuarzo con esfera verde', '绿盘石英腕表', 'Quartz watch with a green dial'] },
  { brand: 'VDEAR', listing: 'High-Quality-Pointer-Men-Luxury-Custom_1601720475221', names: ['Minimalista de cuarzo personalizable', '可定制简约石英腕表', 'Customizable minimalist quartz watch'] },
  { brand: 'MAROSERTO', listing: 'MAROSERTO-Two-Tone-Men-s-Business_1601968370269', names: ['Reloj bicolor', '间金款腕表', 'Two-tone watch'] },
  { brand: 'B&S', listing: 'New-Fashion-Men-Watch-Leather-Quartz_1601988885042', names: ['Reloj de cuarzo con correa de cuero', '皮表带石英腕表', 'Quartz watch with a leather strap'] },
  { brandKey: 'box', listing: 'Customized-High-End-PU-Leather-Watch_1601728700720', names: ['Caja para reloj personalizable', '可定制腕表礼盒', 'Customizable watch box'] },
];

const translations = {
  es: {
    wordmark: 'Cotizaciones', title: 'Productos\na cotizar', nav: 'Secciones', language: 'Idioma',
    productsLink: 'Productos', quoteLink: 'Cotización', skip: 'Ir al contenido',
    destination: 'Precio puesto en bodega Logi, Colombia.',
    intro: 'Cada reloj y la caja deben llevar nuestra marca propia a un solo color. Cotiza el precio unitario y total de cada referencia con entrega en bodega.',
    seeRequest: 'Ver solicitud de cotización', rotate: 'Arrastra o usa las flechas para girar el reloj',
    count: '15 relojes · 1 caja', customBrand: 'Marca personalizada', unconfirmedBrand: 'Marca por confirmar', box: 'Caja para reloj',
    requestTitle: 'Qué necesitamos cotizar', requestIntro: 'Por favor, confirma estos puntos con cada proveedor.',
    requestLabel: 'Solicitud de cotización', copy: 'Copiar solicitud', copied: 'Solicitud copiada.',
    copyHelp: 'Selecciona y copia el texto para compartirlo.', back: 'Volver arriba', source: 'Ficha de Alibaba',
    questions: [
      ['Precio en bodega Logi', 'Indica el precio unitario y total por referencia, moneda y escalas por cantidad. Desglosa producto, transporte, seguro, aduana, impuestos y cualquier cargo local. Confirma el Incoterm, si puedes entregar DDP y quién se encarga de la importación.'],
      ['Forma de pago', '¿Qué métodos de pago aceptan? Confirma si ofrecen Alibaba Trade Assurance o transferencia bancaria, la moneda, las comisiones, el porcentaje de anticipo, cuándo vence el saldo y qué comprobante entregan.'],
      ['Pedido mínimo y disponibilidad', 'Confirma el mínimo por modelo y color, si se pueden mezclar referencias en un pedido, qué variantes tienen disponibles y si el stock cambia al personalizar.'],
      ['Muestras', 'Cotiza una muestra por referencia y una de la caja. Indica costo del producto, envío y plazo. Confirma si descuentan el costo de las muestras al hacer el pedido.'],
      ['Marca propia obligatoria', 'Cada reloj y la caja deben llevar nuestra marca propia a un solo color. Incluye el costo de personalización en la cotización e indica la ubicación de la marca, la técnica, los colores disponibles y el mínimo de pedido. Envía una prueba visual para aprobar antes de producir.'],
      ['Caja y embalaje', 'Cotiza la caja por separado y el reloj con caja. Confirma medidas, material, compatibilidad con cada reloj, protección para transporte y peso y dimensiones del envío.'],
      ['Producción y entrega', 'Indica el plazo de producción y el tránsito estimado hasta la bodega Logi en Colombia. Confirma qué datos de entrega necesitas, si se pueden consolidar referencias, el seguimiento y los documentos de envío.'],
      ['Calidad, garantía y vigencia', 'Confirma marca y modelo de cada reloj, condiciones de garantía y solución por defectos o faltantes. Indica si podemos inspeccionar antes del envío y hasta cuándo es válida la cotización.'],
    ],
  },
  'zh-Hans': {
    wordmark: '询价', title: '待报价\n产品', nav: '页面栏目', language: '语言',
    productsLink: '产品', quoteLink: '报价要求', skip: '跳至正文',
    destination: '请报送达哥伦比亚 Logi 仓库的价格。',
    intro: '每款腕表及礼盒均须带有我方自有品牌的单色标识。请按款分别报送达仓库的单价和总价。',
    seeRequest: '查看询价要求', rotate: '拖动或按方向键旋转腕表',
    count: '15 款腕表 · 1 款礼盒', customBrand: '可定制品牌', unconfirmedBrand: '品牌待确认', box: '腕表礼盒',
    requestTitle: '请确认以下报价信息', requestIntro: '请与每家供应商逐项确认以下信息。',
    requestLabel: '询价内容', copy: '复制询价内容', copied: '询价内容已复制。',
    copyHelp: '请选择并复制下方文字以便分享。', back: '返回顶部', source: '阿里巴巴国际站商品页',
    questions: [
      ['送达 Logi 仓库的报价', '请按款式提供单价、总价、报价币种及阶梯价格，并分别列明货款、运输费、保险费、清关费、关税及其他税费和当地费用。请确认适用的贸易术语、是否可做 DDP（完税后交货），以及由谁负责进口清关。'],
      ['付款方式', '请说明可接受的付款方式，是否支持阿里巴巴国际站信用保障（Trade Assurance）或银行电汇，并注明付款币种、手续费、定金比例、尾款支付时间以及可提供的付款凭证。'],
      ['起订量及库存', '请确认每款、每种颜色的最小起订量，是否允许混款下单，目前有哪些颜色或款式有现货，以及定制是否影响库存或交期。'],
      ['样品', '请分别报价每款腕表及礼盒各一件样品，注明样品费、运费和交期。请确认下正式订单后能否抵扣样品费。'],
      ['必须使用我方自有品牌', '每款腕表及礼盒均须带有我方自有品牌的单色标识。请将定制费用计入报价，并注明标识位置、工艺、可选颜色及最小起订量。请在生产前提供效果图供我们确认。'],
      ['礼盒及运输包装', '请分别报价单独购买礼盒及腕表配礼盒。请确认礼盒的尺寸、材质、适配的腕表款式、运输防护方式，以及整票货物的重量和尺寸。'],
      ['生产及交货', '请提供生产周期，以及运抵哥伦比亚 Logi 仓库的预计运输时间。请说明需要哪些收货信息，能否合并发运多款产品，如何查询物流及提供哪些运输单据。'],
      ['质量、质保及报价有效期', '请确认每款腕表的品牌和型号、质保条款，以及出现瑕疵或短缺时的处理方式。请说明能否在发货前验货，并注明报价有效期。'],
    ],
  },
  en: {
    wordmark: 'Quotes', title: 'Products\nto quote', nav: 'Sections', language: 'Language',
    productsLink: 'Products', quoteLink: 'Quote request', skip: 'Skip to content',
    destination: 'Price delivered to the Logi warehouse in Colombia.',
    intro: 'Every watch and the box must carry our own brand in a single color. Please quote the unit and total price for each item, delivered to the warehouse.',
    seeRequest: 'View quote request', rotate: 'Drag or use the arrow keys to rotate the watch',
    count: '15 watches · 1 box', customBrand: 'Custom branding', unconfirmedBrand: 'Brand to confirm', box: 'Watch box',
    requestTitle: 'What to include in the quote', requestIntro: 'Please confirm the following with each supplier.',
    requestLabel: 'Quote request', copy: 'Copy quote request', copied: 'Quote request copied.',
    copyHelp: 'Select and copy the text to share it.', back: 'Back to top', source: 'Alibaba listing',
    questions: [
      ['Price delivered to the Logi warehouse', 'Provide unit and total pricing by item, the currency, and quantity price breaks. Itemize product, freight, insurance, customs clearance, duties, taxes, and local charges. State the Incoterm, whether you offer DDP, and who handles import clearance.'],
      ['Payment terms', 'Which payment methods do you accept? Confirm whether Alibaba Trade Assurance or bank transfer is available, the currency, any fees, the deposit percentage, when the balance is due, and what payment documentation you provide.'],
      ['Minimum order and availability', 'Confirm the MOQ by model and color, whether models can be mixed in one order, which variants are available, and whether customization affects availability.'],
      ['Samples', 'Quote one sample per watch and one box sample. Include the sample cost, shipping, and lead time. Confirm whether the sample cost is credited against the bulk order.'],
      ['Our own branding is required', 'Every watch and the box must carry our own brand in a single color. Include customization in the quoted price and specify the brand placement, method, available colors, and minimum order. Provide a visual proof for approval before production.'],
      ['Box and packaging', 'Quote the box separately and the watch with its box. Confirm dimensions, material, fit for each watch, transit protection, and the shipment weight and dimensions.'],
      ['Production and delivery', 'State the production lead time and estimated transit time to the Logi warehouse in Colombia. Confirm what delivery details you need, whether items can be consolidated, and what tracking and shipping documents you provide.'],
      ['Quality, warranty, and quote validity', 'Confirm each watch brand and model, warranty terms, and remedies for defects or missing items. State whether pre-shipment inspection is available and how long the quote is valid.'],
    ],
  },
};

const grid = document.querySelector('#product-grid');
const questionList = document.querySelector('#question-list');
const copyStatus = document.querySelector('#copy-status');
const manualCopy = document.querySelector('#manual-copy');
const languageButtons = [...document.querySelectorAll('[data-lang]')];
const listingBase = 'https://www.alibaba.com/product-detail/';
let currentLanguage = 'es';

function productName(product, language, text) {
  return {
    brand: product.brand || text[product.brandKey],
    name: product.names[Object.keys(translations).indexOf(language)],
  };
}

function renderProducts(language, text) {
  const cards = products.map((product, index) => {
    const { brand, name } = productName(product, language, text);
    const card = document.createElement('article');
    card.className = 'product';
    const link = document.createElement('a');
    link.className = 'product-link';
    link.href = listingBase + product.listing + '.html';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', brand + ' · ' + name + ' · ' + text.source);

    const frame = document.createElement('div');
    frame.className = 'product-media';
    const image = document.createElement('img');
    image.src = './assets/' + String(index + 1).padStart(2, '0') + '.webp';
    image.alt = '';
    image.width = 840;
    image.height = 840;
    image.loading = index < 4 ? 'eager' : 'lazy';
    image.decoding = 'async';
    frame.append(image);

    const label = document.createElement('h3');
    label.textContent = brand;
    link.append(frame, label);
    card.append(link);
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
  renderProducts(language, text);
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
  const items = products.map((product, index) => {
    const { brand, name } = productName(product, language, text);
    return (index + 1) + '. ' + brand + ' · ' + name + '\n' + listingBase + product.listing + '.html';
  });
  return [
    text.title.replace('\n', ' '),
    text.destination + '\n' + text.intro,
    ...questions,
    text.productsLink + ' · ' + text.count,
    items.join('\n\n'),
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
