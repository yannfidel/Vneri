/* ============ Calculadora VNERi ============
   VNERi = PAD / (FC × Dose NE)
   PAD (mmHg) · FC (bpm) · NE (mcg/kg/min)
   Faixas: <2,6 grave · 2,6–6,6 baixo · 6,7–10,8 ideal · >10,8 alto
*/

const $ = (id) => document.getElementById(id);

const form = $('form');
const fields = {
  pad: { el: $('pad'), err: $('err-pad'), name: 'PAD', min: 10, max: 150 },
  fc:  { el: $('fc'),  err: $('err-fc'),  name: 'FC',  min: 20, max: 300 },
  ne:  { el: $('ne'),  err: $('err-ne'),  name: 'Dose de noradrenalina', min: 0.001, max: 5 }
};

const ICONS = {
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>',
  down:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M6 13l6 6 6-6"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/></svg>',
  up:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M6 11l6-6 6 6"/></svg>',
  info:  '<svg viewBox="0 0 24 24" fill="none" stroke="#00798a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
  pill:  '<svg viewBox="0 0 24 24" fill="none" stroke="#1565c0" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.5 20.5a5 5 0 0 1-7-7l10-10a5 5 0 0 1 7 7z"/><path d="M8.5 8.5l7 7"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="#d32f2f" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/></svg>'
};

/* Conteúdo de cada faixa */
const BANDS = {
  grave: {
    color: 'red', icon: ICONS.alert, badge: 'Hiporresponsividade vascular grave',
    meaning: 'O paciente recebe noradrenalina em dose alta para o que consegue de resposta: a pressão diastólica continua muito baixa. Os vasos sanguíneos estão “paralisados” pela inflamação da sepse e não conseguem contrair adequadamente. Valores abaixo de 2,6 estão entre os de maior mortalidade nas análises do ANDROMEDA-SHOCK.',
    tone: 'alert',
    conduct: [
      'Aumentar ainda mais a noradrenalina pode não resolver e causar efeitos colaterais (arritmias, isquemia periférica).',
      'Costuma-se associar um segundo vasopressor, como a vasopressina.',
      'Também se considera o uso de corticosteroides para tentar “desinflamar” os receptores vasculares.'
    ]
  },
  baixo: {
    color: 'orange', icon: ICONS.down, badge: 'Vascular: resposta reduzida',
    meaning: 'Os vasos respondem menos do que o esperado à noradrenalina: a pressão diastólica está baixa em relação à dose e à frequência cardíaca. Indica hiporresponsividade vascular, ainda que menos intensa que a faixa grave.',
    tone: 'warn',
    conduct: [
      'Escalonar apenas a noradrenalina tende a ter ganho limitado e mais efeitos colaterais.',
      'Pelo VNERi, a associação de vasopressina não é indicada nesta faixa (o corte de indicação é abaixo de 2,6).',
      'Reavaliar volemia, perfusão e função cardíaca em conjunto e acompanhar a evolução do índice.'
    ]
  },
  ideal: {
    color: 'green', icon: ICONS.check, badge: 'Zona de menor mortalidade',
    meaning: 'Há um bom equilíbrio entre a dose do medicamento, a frequência cardíaca e a resposta da pressão arterial. O paciente está respondendo conforme o esperado à terapia padrão. Nas análises do ANDROMEDA-SHOCK, valores próximos de 6,7 estão associados à menor mortalidade hospitalar.',
    tone: 'ok',
    conduct: [
      'Em geral, manter a terapia padrão e o acompanhamento seriado.',
      'Reavaliar o índice sempre que a dose, a FC ou a PAD mudarem de forma importante.'
    ]
  },
  alto: {
    color: 'violet', icon: ICONS.up, badge: 'Outros mecanismos de choque',
    meaning: 'A resposta dos vasos à noradrenalina não parece ser o problema principal. Se o paciente continua em choque, a causa da hipotensão provavelmente está associada a disfunção miocárdica (coração fraco devido à sepse) ou a hipovolemia (falta de líquido na circulação).',
    tone: 'warn',
    conduct: [
      'Investigar a função cardíaca (por exemplo, com ecocardiograma à beira-leito).',
      'Reavaliar o estado volêmico e a necessidade de reposição.',
      'Considerar a necessidade de suporte inotrópico conforme avaliação da equipe.'
    ]
  }
};

/* ---------- Utilidades ---------- */
function parseNum(txt) {
  if (txt == null) return NaN;
  const s = String(txt).trim().replace(/\s/g, '').replace(',', '.');
  if (!/^\d*\.?\d+$|^\d+\.$/.test(s)) return NaN;
  return parseFloat(s);
}
const fmt = (n, d = 1) => n.toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d });

function classify(v) {
  if (v < 2.6) return 'grave';
  if (v < 6.7) return 'baixo';
  if (v <= 10.8) return 'ideal';
  return 'alto';
}

function setError(f, msg) {
  f.err.textContent = msg || '';
  f.err.classList.toggle('show', !!msg);
  f.el.classList.toggle('invalid', !!msg);
}

/* ---------- Validação ---------- */
function validate() {
  let ok = true;
  const values = {};
  for (const key in fields) {
    const f = fields[key];
    const raw = f.el.value.trim();
    if (!raw) { setError(f, 'Preencha este campo.'); ok = false; continue; }
    const n = parseNum(raw);
    if (isNaN(n) || n <= 0) { setError(f, 'Digite um número válido maior que zero.'); ok = false; continue; }
    if (n < f.min || n > f.max) {
      setError(f, `Valor fora do esperado para ${f.name} (${String(f.min).replace('.', ',')} a ${String(f.max).replace('.', ',')}). Confira o dado.`);
      ok = false; continue;
    }
    setError(f, '');
    values[key] = n;
  }
  return ok ? values : null;
}

/* ---------- Renderização ---------- */
function render(v, vals) {
  const band = BANDS[classify(v)];

  $('empty').style.display = 'none';
  const res = $('result');
  res.classList.remove('show');
  void res.offsetWidth;            // reinicia a animação
  res.classList.add('show');

  $('score-card').className = 'score-card ' + band.color;
  $('score').textContent = fmt(v);
  $('badge').innerHTML = band.icon + '<span>' + band.badge + '</span>';

  // indicador de vasopressina (recomendada quando VNERi < 2,6)
  const vaso = $('vaso');
  if (v < 2.6) {
    vaso.className = 'vaso yes';
    vaso.innerHTML = `
      <div class="vaso-icon">${ICONS.alert}</div>
      <div class="vaso-text">
        <small>Indicador de vasopressina</small>
        <strong>Uso de vasopressina RECOMENDADO</strong>
        <span>VNERi abaixo de 2,6: considerar associar vasopressina.</span>
      </div>`;
  } else {
    vaso.className = 'vaso no';
    vaso.innerHTML = `
      <div class="vaso-icon">${ICONS.check}</div>
      <div class="vaso-text">
        <small>Indicador de vasopressina</small>
        <strong>Uso de vasopressina NÃO recomendado</strong>
        <span>VNERi igual ou acima de 2,6: sem indicação pelo índice.</span>
      </div>`;
  }

  // ponteiro (escala 0–14)
  const pct = Math.max(0, Math.min(v, 14)) / 14 * 100;
  $('pointer').style.left = '0%';
  requestAnimationFrame(() => requestAnimationFrame(() => { $('pointer').style.left = pct + '%'; }));

  $('s-pad').textContent = fmt(vals.pad, vals.pad % 1 ? 1 : 0) + ' mmHg';
  $('s-fc').textContent = fmt(vals.fc, vals.fc % 1 ? 1 : 0) + ' bpm';
  $('s-ne').textContent = fmt(vals.ne, 2).replace(/0$/, '') + ' mcg/kg/min';

  const conduct = band.conduct.map((c) => `<li>${c}</li>`).join('');
  $('feedback').innerHTML = `
    <div class="fb ${band.tone}">
      <h3>${ICONS.info} O que significa</h3>
      <p>${band.meaning}</p>
    </div>
    <div class="fb ${band.tone}">
      <h3>${ICONS.pill} Conduta comum descrita na literatura</h3>
      <ul>${conduct}</ul>
    </div>
    <div class="fb">
      <h3>${ICONS.heart} Lembre-se</h3>
      <p>O VNERi é um apoio à decisão e deve ser interpretado junto ao quadro clínico completo do paciente. A conduta final é sempre da equipe médica.</p>
    </div>`;

  if (window.innerWidth < 900) res.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function reset() {
  for (const k in fields) { fields[k].el.value = ''; setError(fields[k], ''); }
  $('result').classList.remove('show');
  $('empty').style.display = '';
}

/* ---------- Eventos ---------- */
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const vals = validate();
  if (!vals) return;
  const v = vals.pad / (vals.fc * vals.ne);
  render(v, vals);
});

$('btn-example').addEventListener('click', () => {
  fields.pad.el.value = '44';
  fields.fc.el.value = '105';
  fields.ne.el.value = '0,16';
  form.requestSubmit();
});

$('btn-clear').addEventListener('click', reset);

Object.values(fields).forEach((f) => f.el.addEventListener('input', () => setError(f, '')));
