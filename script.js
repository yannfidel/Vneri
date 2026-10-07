/* ============ Calculadora VNERi ============
   VNERi = PAD / (FC × Dose NE)
   PAD (mmHg) · FC (bpm) · NE (mcg/kg/min)
   Faixas: <2,6 grave · 2,6–6,6 baixo · 6,7–10,8 ideal · >10,8 alto
   Vasopressina: recomendada quando VNERi < 2,6
   Textos vêm de app.js (window.t) para funcionar em PT e EN.
*/

const $ = (id) => document.getElementById(id);

const form = $('form');
const fields = {
  pad: { el: $('pad'), err: $('err-pad'), name: 'fname.pad', min: 10, max: 150, state: null },
  fc:  { el: $('fc'),  err: $('err-fc'),  name: 'fname.fc',  min: 20, max: 300, state: null },
  ne:  { el: $('ne'),  err: $('err-ne'),  name: 'fname.ne',  min: 0.001, max: 5, state: null }
};

let lastRender = null; // { v, vals } — usado para redesenhar ao trocar de idioma

const ICONS = {
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>',
  down:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M6 13l6 6 6-6"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/></svg>',
  up:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M6 11l6-6 6 6"/></svg>',
  info:  '<svg viewBox="0 0 24 24" fill="none" stroke="#00a3a3" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
  pill:  '<svg viewBox="0 0 24 24" fill="none" stroke="#2f80ed" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.5 20.5a5 5 0 0 1-7-7l10-10a5 5 0 0 1 7 7z"/><path d="M8.5 8.5l7 7"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="#e5484d" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/></svg>'
};

/* Estrutura de cada faixa (textos vêm do dicionário) */
const BANDS = {
  grave: { color: 'red',    icon: ICONS.alert, tone: 'alert', conduct: 3 },
  baixo: { color: 'orange', icon: ICONS.down,  tone: 'warn',  conduct: 3 },
  ideal: { color: 'green',  icon: ICONS.check, tone: 'ok',    conduct: 2 },
  alto:  { color: 'violet', icon: ICONS.up,    tone: 'warn',  conduct: 3 }
};

/* ---------- Utilidades ---------- */
function parseNum(txt) {
  if (txt == null) return NaN;
  const s = String(txt).trim().replace(/\s/g, '').replace(',', '.');
  if (!/^\d*\.?\d+$|^\d+\.$/.test(s)) return NaN;
  return parseFloat(s);
}
const fmt = (n, d = 1) => n.toLocaleString(window.getLocale(), { minimumFractionDigits: d, maximumFractionDigits: d });
const fmtLimit = (n) => n.toLocaleString(window.getLocale(), { maximumFractionDigits: 3 });

function classify(v) {
  if (v < 2.6) return 'grave';
  if (v < 6.7) return 'baixo';
  if (v <= 10.8) return 'ideal';
  return 'alto';
}

/* Erro guardado como { key, params } para poder ser retraduzido */
function setError(f, state) {
  f.state = state || null;
  paintError(f);
}
function paintError(f) {
  if (!f.state) {
    f.err.textContent = '';
    f.err.classList.remove('show');
    f.el.classList.remove('invalid');
    return;
  }
  const params = f.state.params ? { ...f.state.params } : undefined;
  if (params && params.nameKey) { params.name = window.t(params.nameKey); delete params.nameKey; }
  f.err.textContent = window.t(f.state.key, params);
  f.err.classList.add('show');
  f.el.classList.add('invalid');
}

/* ---------- Validação ---------- */
function validate() {
  let ok = true;
  const values = {};
  for (const key in fields) {
    const f = fields[key];
    const raw = f.el.value.trim();
    if (!raw) { setError(f, { key: 'err.required' }); ok = false; continue; }
    const n = parseNum(raw);
    if (isNaN(n) || n <= 0) { setError(f, { key: 'err.invalid' }); ok = false; continue; }
    if (n < f.min || n > f.max) {
      setError(f, { key: 'err.range', params: { nameKey: f.name, min: fmtLimit(f.min), max: fmtLimit(f.max) } });
      ok = false; continue;
    }
    setError(f, null);
    values[key] = n;
  }
  return ok ? values : null;
}

/* ---------- Renderização ---------- */
function paintTexts(v, vals) {
  const t = window.t;
  const id = classify(v);
  const band = BANDS[id];

  $('score').textContent = fmt(v);
  $('badge').innerHTML = band.icon + '<span>' + t('badge.' + id) + '</span>';

  // indicador de vasopressina (recomendada quando VNERi < 2,6)
  const vaso = $('vaso');
  if (v < 2.6) {
    vaso.className = 'vaso yes';
    vaso.innerHTML = `
      <div class="vaso-icon">${ICONS.alert}</div>
      <div class="vaso-text">
        <small>${t('vaso.label')}</small>
        <strong>${t('vaso.yes.t')}</strong>
        <span>${t('vaso.yes.p')}</span>
      </div>`;
  } else {
    vaso.className = 'vaso no';
    vaso.innerHTML = `
      <div class="vaso-icon">${ICONS.check}</div>
      <div class="vaso-text">
        <small>${t('vaso.label')}</small>
        <strong>${t('vaso.no.t')}</strong>
        <span>${t('vaso.no.p')}</span>
      </div>`;
  }

  $('s-pad').textContent = fmt(vals.pad, vals.pad % 1 ? 1 : 0) + ' mmHg';
  $('s-fc').textContent = fmt(vals.fc, vals.fc % 1 ? 1 : 0) + ' bpm';
  $('s-ne').textContent = fmt(vals.ne, 2).replace(/0$/, '') + ' mcg/kg/min';

  let conduct = '';
  for (let i = 1; i <= band.conduct; i++) conduct += `<li>${t(`cond.${id}.${i}`)}</li>`;

  $('feedback').innerHTML = `
    <div class="fb ${band.tone}">
      <h3>${ICONS.info} ${t('fb.meaning')}</h3>
      <p>${t('mean.' + id)}</p>
    </div>
    <div class="fb ${band.tone}">
      <h3>${ICONS.pill} ${t('fb.conduct')}</h3>
      <ul>${conduct}</ul>
    </div>
    <div class="fb">
      <h3>${ICONS.heart} ${t('fb.remember')}</h3>
      <p>${t('fb.rememberText')}</p>
    </div>`;
}

function render(v, vals) {
  lastRender = { v, vals };
  const band = BANDS[classify(v)];

  $('empty').style.display = 'none';
  const res = $('result');
  res.classList.remove('show');
  void res.offsetWidth;            // reinicia a animação
  res.classList.add('show');

  $('score-card').className = 'score-card ' + band.color;
  paintTexts(v, vals);

  // ponteiro (escala 0–14)
  const pct = Math.max(0, Math.min(v, 14)) / 14 * 100;
  $('pointer').style.left = '0%';
  requestAnimationFrame(() => requestAnimationFrame(() => { $('pointer').style.left = pct + '%'; }));

  if (window.innerWidth < 900) res.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function reset() {
  lastRender = null;
  for (const k in fields) { fields[k].el.value = ''; setError(fields[k], null); }
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
  fields.ne.el.value = window.getLang() === 'en' ? '0.16' : '0,16';
  form.requestSubmit();
});

$('btn-clear').addEventListener('click', reset);

Object.values(fields).forEach((f) => f.el.addEventListener('input', () => setError(f, null)));

/* Troca de idioma: retraduz erros e o resultado já exibido, sem recalcular */
document.addEventListener('langchange', () => {
  Object.values(fields).forEach(paintError);
  if (lastRender) paintTexts(lastRender.v, lastRender.vals);
});
