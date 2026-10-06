/* ============ VNERi — tema (claro/escuro) e idioma (PT/EN) ============
   - Textos estáticos: atributos data-i18n, data-i18n-html, data-i18n-ph e data-i18n-aria
   - Textos dinâmicos (script.js): window.t('chave', {parametros})
   - Escolhas salvas no localStorage
*/
(function () {
  const DICT = {
    pt: {
      'title.index': `VNERi — Índice de Responsividade Vascular à Noradrenalina`,
      'title.calc': `Calculadora VNERi`,
      'brand.aria': `VNERi - início`,
      'nav.home': `Início`,
      'nav.calc': `Calculadora`,
      'tool.theme.toDark': `Ativar modo escuro`,
      'tool.theme.toLight': `Ativar modo claro`,
      'tool.lang': `Translate to English`,

      'hero.eyebrow': `Apoio à decisão em terapia intensiva`,
      'hero.title': `Bem-vindo à calculadora <span>VNERi</span>`,
      'hero.text': `Descubra, de forma rápida e clara, o quão bem os vasos do paciente respondem à noradrenalina na fase inicial do choque séptico — e entenda o que cada resultado significa.`,
      'hero.btnCalc': `Abrir calculadora`,
      'hero.btnMore': `Saiba mais`,
      'hero.formulaTitle': `A fórmula`,
      'hero.formula': `VNERi = PAD ÷ (FC × Dose NE)`,
      'hero.units': `PAD em mmHg · FC em bpm · NE em mcg/kg/min`,

      'about.tag': `O projeto`,
      'about.title': `O que é o VNERi?`,
      'about.desc': `VNERi significa <strong>Vascular Norepinephrine Responsiveness Index</strong> (Índice de Responsividade Vascular à Noradrenalina) — uma ferramenta matemática usada à beira-leito na UTI.`,
      'c1.t': `Mede a resposta dos vasos`,
      'c1.p': `Avalia o quão bem os vasos sanguíneos reagem à noradrenalina durante a fase inicial do choque séptico.`,
      'c2.t': `Resultado em segundos`,
      'c2.p': `Basta informar três valores que já estão no monitor e na bomba de infusão: PAD, FC e dose de noradrenalina.`,
      'c3.t': `Interpretação clara`,
      'c3.p': `Não entrega só um número: explica o significado do resultado e as condutas comumente descritas na literatura.`,

      'how.tag': `Passo a passo`,
      'how.title': `Como funciona`,
      'how.desc': `Três etapas simples para obter o índice e a interpretação.`,
      's1.t': `Informe os dados`,
      's1.p': `Pressão arterial diastólica (PAD), frequência cardíaca (FC) e dose de noradrenalina (NE).`,
      's2.t': `Calcule`,
      's2.p': `O sistema aplica a fórmula PAD ÷ (FC × Dose NE) e mostra o índice com uma casa decimal.`,
      's3.t': `Entenda o resultado`,
      's3.p': `Veja a faixa em que o paciente se encontra, o que ela significa e a conduta comum associada.`,

      'bands.tag': `Interpretação`,
      'bands.title': `O que os valores indicam`,
      'bands.desc': `Análises do banco de dados ANDROMEDA-SHOCK mostram que a mortalidade hospitalar desenha uma curva em “J invertido” em relação ao VNERi.`,
      'r.grave': `< 2,6`,
      'r.baixo': `2,6 – 6,6`,
      'r.ideal': `6,7 – 10,8`,
      'r.alto': `> 10,8`,
      'bt.baixo': `Hiporresponsividade vascular`,
      'bp.grave': `Vasos “paralisados” pela inflamação da sepse, mesmo com noradrenalina em dose alta.`,
      'bp.baixo': `Pressão diastólica ainda baixa para a dose de noradrenalina em uso.`,
      'bp.ideal': `Equilíbrio entre dose, frequência cardíaca e resposta da pressão arterial.`,
      'bp.alto': `O problema pode não ser vascular: considerar disfunção miocárdica ou hipovolemia.`,

      'disc.index': `<strong>Aviso importante:</strong> esta ferramenta tem finalidade educacional e de apoio. Ela não substitui o julgamento clínico, a avaliação à beira-leito nem as diretrizes institucionais. Toda decisão terapêutica deve ser tomada pela equipe médica responsável.`,
      'disc.calc': `<strong>Aviso importante:</strong> ferramenta educacional e de apoio. Não substitui o julgamento clínico nem as diretrizes institucionais. Decisões terapêuticas cabem à equipe médica responsável.`,

      'cta.t': `Pronto para calcular?`,
      'cta.p': `Insira os valores do paciente e receba o índice com a interpretação completa.`,
      'cta.btn': `Ir para a calculadora`,

      'credits.title': `Créditos de desenvolvimento`,
      'role.pharm': `Farmacêutica clínica`,
      'role.dev': `Desenvolvedor web e designer`,
      'foot.note': `VNERi · Projeto educacional de apoio à decisão clínica · Não substitui avaliação médica`,

      'calc.h1': `Calculadora VNERi`,
      'calc.sub': `Preencha os três campos para obter o índice e a interpretação do resultado.`,
      'form.title': `Dados do paciente`,
      'form.sub': `Use ponto ou vírgula para decimais.`,
      'pad.label': `PAD`,
      'pad.small': `Pressão arterial diastólica`,
      'pad.ph': `ex.: 44`,
      'fc.label': `FC`,
      'fc.small': `Frequência cardíaca`,
      'fc.ph': `ex.: 105`,
      'ne.label': `Dose NE`,
      'ne.small': `Noradrenalina`,
      'ne.ph': `ex.: 0,16`,
      'ne.hint': `Informe a dose já convertida para mcg/kg/min.`,
      'btn.calc': `Calcular`,
      'btn.example': `Exemplo`,
      'btn.clear': `Limpar`,
      'chip.title': `Fórmula`,
      'chip.formula': `VNERi = PAD ÷ (FC × Dose NE)`,
      'chip.example': `Ex.: 44 ÷ (105 × 0,16) = <b>2,6</b>`,
      'res.title': `Resultado e interpretação`,
      'res.sub': `O resultado aparece aqui depois do cálculo.`,
      'res.empty': `Aguardando os dados do paciente…`,
      'score.label': `VNERi calculado`,
      'tick.26': `2,6`,
      'tick.67': `6,7`,
      'tick.108': `10,8`,
      'lg.grave': `< 2,6 grave`,
      'lg.baixo': `2,6–6,6 baixo`,
      'lg.ideal': `6,7–10,8 ideal`,
      'lg.alto': `> 10,8 alto`,
      'sum.pad': `PAD`,
      'sum.fc': `FC`,
      'sum.ne': `Dose NE`,

      'fname.pad': `PAD`,
      'fname.fc': `FC`,
      'fname.ne': `Dose de noradrenalina`,
      'err.required': `Preencha este campo.`,
      'err.invalid': `Digite um número válido maior que zero.`,
      'err.range': `Valor fora do esperado para {name} ({min} a {max}). Confira o dado.`,

      'badge.grave': `Hiporresponsividade vascular grave`,
      'badge.baixo': `Vascular: resposta reduzida`,
      'badge.ideal': `Zona de menor mortalidade`,
      'badge.alto': `Outros mecanismos de choque`,

      'mean.grave': `O paciente recebe noradrenalina em dose alta para o que consegue de resposta: a pressão diastólica continua muito baixa. Os vasos sanguíneos estão “paralisados” pela inflamação da sepse e não conseguem contrair adequadamente. Valores abaixo de 2,6 estão entre os de maior mortalidade nas análises do ANDROMEDA-SHOCK.`,
      'mean.baixo': `Os vasos respondem menos do que o esperado à noradrenalina: a pressão diastólica está baixa em relação à dose e à frequência cardíaca. Indica hiporresponsividade vascular, ainda que menos intensa que a faixa grave.`,
      'mean.ideal': `Há um bom equilíbrio entre a dose do medicamento, a frequência cardíaca e a resposta da pressão arterial. O paciente está respondendo conforme o esperado à terapia padrão. Nas análises do ANDROMEDA-SHOCK, valores próximos de 6,7 estão associados à menor mortalidade hospitalar.`,
      'mean.alto': `A resposta dos vasos à noradrenalina não parece ser o problema principal. Se o paciente continua em choque, a causa da hipotensão provavelmente está associada a disfunção miocárdica (coração fraco devido à sepse) ou a hipovolemia (falta de líquido na circulação).`,

      'cond.grave.1': `Aumentar ainda mais a noradrenalina pode não resolver e causar efeitos colaterais (arritmias, isquemia periférica).`,
      'cond.grave.2': `Costuma-se associar um segundo vasopressor, como a vasopressina.`,
      'cond.grave.3': `Também se considera o uso de corticosteroides para tentar “desinflamar” os receptores vasculares.`,
      'cond.baixo.1': `Escalonar apenas a noradrenalina tende a ter ganho limitado e mais efeitos colaterais.`,
      'cond.baixo.2': `Pelo VNERi, a associação de vasopressina não é indicada nesta faixa (o corte de indicação é abaixo de 2,6).`,
      'cond.baixo.3': `Reavaliar volemia, perfusão e função cardíaca em conjunto e acompanhar a evolução do índice.`,
      'cond.ideal.1': `Em geral, manter a terapia padrão e o acompanhamento seriado.`,
      'cond.ideal.2': `Reavaliar o índice sempre que a dose, a FC ou a PAD mudarem de forma importante.`,
      'cond.alto.1': `Investigar a função cardíaca (por exemplo, com ecocardiograma à beira-leito).`,
      'cond.alto.2': `Reavaliar o estado volêmico e a necessidade de reposição.`,
      'cond.alto.3': `Considerar a necessidade de suporte inotrópico conforme avaliação da equipe.`,

      'fb.meaning': `O que significa`,
      'fb.conduct': `Conduta comum descrita na literatura`,
      'fb.remember': `Lembre-se`,
      'fb.rememberText': `O VNERi é um apoio à decisão e deve ser interpretado junto ao quadro clínico completo do paciente. A conduta final é sempre da equipe médica.`,

      'vaso.label': `Indicador de vasopressina`,
      'vaso.yes.t': `Uso de vasopressina RECOMENDADO`,
      'vaso.yes.p': `VNERi abaixo de 2,6: considerar associar vasopressina.`,
      'vaso.no.t': `Uso de vasopressina NÃO recomendado`,
      'vaso.no.p': `VNERi igual ou acima de 2,6: sem indicação pelo índice.`
    },

    en: {
      'title.index': `VNERi — Vascular Norepinephrine Responsiveness Index`,
      'title.calc': `VNERi Calculator`,
      'brand.aria': `VNERi - home`,
      'nav.home': `Home`,
      'nav.calc': `Calculator`,
      'tool.theme.toDark': `Switch to dark mode`,
      'tool.theme.toLight': `Switch to light mode`,
      'tool.lang': `Traduzir para o português`,

      'hero.eyebrow': `Decision support in intensive care`,
      'hero.title': `Welcome to the <span>VNERi</span> calculator`,
      'hero.text': `Quickly and clearly find out how well the patient's blood vessels respond to norepinephrine in the early phase of septic shock — and understand what each result means.`,
      'hero.btnCalc': `Open calculator`,
      'hero.btnMore': `Learn more`,
      'hero.formulaTitle': `The formula`,
      'hero.formula': `VNERi = DBP ÷ (HR × NE dose)`,
      'hero.units': `DBP in mmHg · HR in bpm · NE in mcg/kg/min`,

      'about.tag': `The project`,
      'about.title': `What is VNERi?`,
      'about.desc': `VNERi stands for <strong>Vascular Norepinephrine Responsiveness Index</strong> — a mathematical tool used at the ICU bedside.`,
      'c1.t': `Measures vascular response`,
      'c1.p': `Assesses how well the blood vessels react to norepinephrine during the early phase of septic shock.`,
      'c2.t': `Results in seconds`,
      'c2.p': `Just enter three values already available on the monitor and the infusion pump: DBP, HR and norepinephrine dose.`,
      'c3.t': `Clear interpretation`,
      'c3.p': `It does not just give a number: it explains what the result means and the management commonly described in the literature.`,

      'how.tag': `Step by step`,
      'how.title': `How it works`,
      'how.desc': `Three simple steps to get the index and its interpretation.`,
      's1.t': `Enter the data`,
      's1.p': `Diastolic blood pressure (DBP), heart rate (HR) and norepinephrine dose (NE).`,
      's2.t': `Calculate`,
      's2.p': `The system applies the formula DBP ÷ (HR × NE dose) and shows the index with one decimal place.`,
      's3.t': `Understand the result`,
      's3.p': `See which range the patient falls into, what it means and the associated common management.`,

      'bands.tag': `Interpretation`,
      'bands.title': `What the values indicate`,
      'bands.desc': `Analyses of the ANDROMEDA-SHOCK database show that hospital mortality follows an “inverted J” curve in relation to the VNERi.`,
      'r.grave': `< 2.6`,
      'r.baixo': `2.6 – 6.6`,
      'r.ideal': `6.7 – 10.8`,
      'r.alto': `> 10.8`,
      'bt.baixo': `Vascular hyporesponsiveness`,
      'bp.grave': `Vessels “paralyzed” by sepsis-related inflammation, even with a high norepinephrine dose.`,
      'bp.baixo': `Diastolic pressure still low for the norepinephrine dose in use.`,
      'bp.ideal': `Balance between dose, heart rate and blood pressure response.`,
      'bp.alto': `The problem may not be vascular: consider myocardial dysfunction or hypovolemia.`,

      'disc.index': `<strong>Important notice:</strong> this tool is for educational and support purposes only. It does not replace clinical judgment, bedside assessment or institutional guidelines. All therapeutic decisions must be made by the responsible medical team.`,
      'disc.calc': `<strong>Important notice:</strong> educational and support tool. It does not replace clinical judgment or institutional guidelines. Therapeutic decisions are up to the responsible medical team.`,

      'cta.t': `Ready to calculate?`,
      'cta.p': `Enter the patient's values and get the index with the full interpretation.`,
      'cta.btn': `Go to the calculator`,

      'credits.title': `Development credits`,
      'role.pharm': `Clinical pharmacist`,
      'role.dev': `Web developer and designer`,
      'foot.note': `VNERi · Educational clinical decision support project · Does not replace medical evaluation`,

      'calc.h1': `VNERi Calculator`,
      'calc.sub': `Fill in the three fields to get the index and the interpretation of the result.`,
      'form.title': `Patient data`,
      'form.sub': `Use a dot or a comma for decimals.`,
      'pad.label': `DBP`,
      'pad.small': `Diastolic blood pressure`,
      'pad.ph': `e.g. 44`,
      'fc.label': `HR`,
      'fc.small': `Heart rate`,
      'fc.ph': `e.g. 105`,
      'ne.label': `NE dose`,
      'ne.small': `Norepinephrine`,
      'ne.ph': `e.g. 0.16`,
      'ne.hint': `Enter the dose already converted to mcg/kg/min.`,
      'btn.calc': `Calculate`,
      'btn.example': `Example`,
      'btn.clear': `Clear`,
      'chip.title': `Formula`,
      'chip.formula': `VNERi = DBP ÷ (HR × NE dose)`,
      'chip.example': `E.g.: 44 ÷ (105 × 0.16) = <b>2.6</b>`,
      'res.title': `Result and interpretation`,
      'res.sub': `The result appears here after calculation.`,
      'res.empty': `Waiting for the patient's data…`,
      'score.label': `Calculated VNERi`,
      'tick.26': `2.6`,
      'tick.67': `6.7`,
      'tick.108': `10.8`,
      'lg.grave': `< 2.6 severe`,
      'lg.baixo': `2.6–6.6 low`,
      'lg.ideal': `6.7–10.8 ideal`,
      'lg.alto': `> 10.8 high`,
      'sum.pad': `DBP`,
      'sum.fc': `HR`,
      'sum.ne': `NE dose`,

      'fname.pad': `DBP`,
      'fname.fc': `HR`,
      'fname.ne': `Norepinephrine dose`,
      'err.required': `Fill in this field.`,
      'err.invalid': `Enter a valid number greater than zero.`,
      'err.range': `Value outside the expected range for {name} ({min} to {max}). Please check the data.`,

      'badge.grave': `Severe vascular hyporesponsiveness`,
      'badge.baixo': `Vascular: reduced response`,
      'badge.ideal': `Lowest-mortality zone`,
      'badge.alto': `Other shock mechanisms`,

      'mean.grave': `The patient is receiving a high norepinephrine dose for the response achieved: diastolic pressure remains very low. The blood vessels are “paralyzed” by sepsis-related inflammation and cannot constrict adequately. Values below 2.6 are among those with the highest mortality in ANDROMEDA-SHOCK analyses.`,
      'mean.baixo': `The vessels respond less than expected to norepinephrine: diastolic pressure is low relative to the dose and heart rate. This indicates vascular hyporesponsiveness, although less intense than the severe range.`,
      'mean.ideal': `There is a good balance between the drug dose, heart rate and blood pressure response. The patient is responding as expected to standard therapy. In ANDROMEDA-SHOCK analyses, values close to 6.7 are associated with the lowest hospital mortality.`,
      'mean.alto': `The vascular response to norepinephrine does not seem to be the main problem. If the patient remains in shock, the cause of hypotension is probably related to myocardial dysfunction (a heart weakened by sepsis) or hypovolemia (lack of fluid in the circulation).`,

      'cond.grave.1': `Increasing norepinephrine even further may not solve the problem and can cause side effects (arrhythmias, peripheral ischemia).`,
      'cond.grave.2': `A second vasopressor, such as vasopressin, is usually added.`,
      'cond.grave.3': `Corticosteroids are also considered to try to “calm” inflammation at the vascular receptors.`,
      'cond.baixo.1': `Escalating norepinephrine alone tends to have limited benefit and more side effects.`,
      'cond.baixo.2': `By the VNERi, adding vasopressin is not indicated in this range (the cutoff for indication is below 2.6).`,
      'cond.baixo.3': `Reassess volume status, perfusion and cardiac function together, and follow the index over time.`,
      'cond.ideal.1': `In general, keep standard therapy and monitor serially.`,
      'cond.ideal.2': `Reassess the index whenever the dose, HR or DBP change significantly.`,
      'cond.alto.1': `Investigate cardiac function (for example, bedside echocardiography).`,
      'cond.alto.2': `Reassess volume status and the need for fluid replacement.`,
      'cond.alto.3': `Consider the need for inotropic support according to the team's assessment.`,

      'fb.meaning': `What it means`,
      'fb.conduct': `Common management described in the literature`,
      'fb.remember': `Remember`,
      'fb.rememberText': `The VNERi is a decision-support tool and must be interpreted together with the patient's full clinical picture. Final management always rests with the medical team.`,

      'vaso.label': `Vasopressin indicator`,
      'vaso.yes.t': `Vasopressin use RECOMMENDED`,
      'vaso.yes.p': `VNERi below 2.6: consider adding vasopressin.`,
      'vaso.no.t': `Vasopressin use NOT recommended`,
      'vaso.no.p': `VNERi equal to or above 2.6: not indicated by the index.`
    }
  };

  const root = document.documentElement;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignora */ } }
  };

  let lang = store.get('vneri-lang') === 'en' ? 'en' : 'pt';
  let theme = root.dataset.theme === 'dark' ? 'dark' : 'light';

  function t(key, params) {
    let s = (DICT[lang] && DICT[lang][key]) || DICT.pt[key] || key;
    if (params) for (const p in params) s = s.replace('{' + p + '}', params[p]);
    return s;
  }

  function applyTheme() {
    root.dataset.theme = theme;
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      const label = t(theme === 'dark' ? 'tool.theme.toLight' : 'tool.theme.toDark');
      btn.setAttribute('aria-label', label);
      btn.setAttribute('title', label);
    }
  }

  function applyLang() {
    root.lang = lang === 'en' ? 'en' : 'pt-BR';
    document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
    document.querySelectorAll('[data-i18n-ph]').forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });

    const lb = document.getElementById('lang-toggle');
    if (lb) {
      const label = t('tool.lang');
      lb.setAttribute('aria-label', label);
      lb.setAttribute('title', label);
      const txt = document.getElementById('lang-label');
      if (txt) txt.textContent = lang === 'pt' ? 'EN' : 'PT';
    }
    applyTheme();
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  window.t = t;
  window.getLang = () => lang;
  window.getLocale = () => (lang === 'en' ? 'en-US' : 'pt-BR');

  const themeBtn = document.getElementById('theme-toggle');
  const langBtn = document.getElementById('lang-toggle');
  if (themeBtn) themeBtn.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    store.set('vneri-theme', theme);
    applyTheme();
  });
  if (langBtn) langBtn.addEventListener('click', () => {
    lang = lang === 'pt' ? 'en' : 'pt';
    store.set('vneri-lang', lang);
    applyLang();
  });

  applyLang();
})();