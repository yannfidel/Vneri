# 🩺 Calculadora VNERi

> Site educacional que calcula o **VNERi (Vascular Norepinephrine Responsiveness Index)** — o Índice de Responsividade Vascular à Noradrenalina — e explica de forma clara o significado do resultado no choque séptico.

🌐 **Idiomas:** Português (BR) · English (botão de tradução no site)
🌙 **Temas:** claro e escuro

---

## 📋 Sobre o projeto

O VNERi é uma ferramenta matemática usada à beira-leito na UTI para avaliar o quão bem os vasos sanguíneos do paciente respondem à noradrenalina durante a fase inicial do choque séptico.

Este projeto transforma o cálculo em um site simples e responsivo. Ele não entrega apenas um número: mostra a faixa em que o paciente se encontra, **o que ela significa**, a **conduta comum descrita na literatura** e um **indicador sobre o uso de vasopressina**.

### Fórmula

```
VNERi = PAD ÷ (FC × Dose NE)
```

| Sigla | Significado | Unidade |
|---|---|---|
| PAD | Pressão arterial diastólica | mmHg |
| FC | Frequência cardíaca | bpm |
| Dose NE | Dose de noradrenalina | mcg/kg/min |

**Exemplo:** 44 ÷ (105 × 0,16) = **2,6**

### Interpretação

| VNERi | Classificação | O que indica |
|---|---|---|
| **< 2,6** | 🔴 Hiporresponsividade vascular grave | Vasos “paralisados” pela inflamação da sepse. **Uso de vasopressina recomendado.** |
| **2,6 – 6,6** | 🟠 Hiporresponsividade vascular | Pressão diastólica baixa para a dose em uso. Vasopressina não indicada pelo índice. |
| **6,7 – 10,8** | 🟢 Zona de menor mortalidade | Equilíbrio entre dose, frequência cardíaca e resposta pressórica. |
| **> 10,8** | 🟣 Outros mecanismos de choque | Considerar disfunção miocárdica ou hipovolemia. |

---

## ✨ Funcionalidades

- Cálculo do VNERi com validação dos campos e mensagens de erro claras
- Interpretação do resultado com cor, ícone e texto (não depende só da cor)
- Régua visual com a posição do paciente nas faixas
- Indicador de uso de vasopressina (recomendado quando VNERi < 2,6)
- Botão de **modo escuro**
- Botão de **tradução PT ⇄ EN** (inclusive do resultado já exibido)
- Layout **responsivo** (celular, tablet e desktop)
- Design moderno e empresarial, com degradês e botões arredondados
- Sem dependências: apenas HTML, CSS e JavaScript puro

---

## 🗂️ Estrutura

```
├── index.html          # Página de boas-vindas e apresentação
├── calculadora.html    # Página da calculadora
├── style.css           # Estilos (inclui modo escuro)
├── app.js              # Tema e idioma (dicionário PT/EN)
├── script.js           # Lógica da calculadora
├── LICENSE
└── README.md
```

---

## 🚀 Como usar

### Localmente
1. Baixe ou clone o repositório:
   ```bash
   git clone https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git
   ```
2. Abra o arquivo `index.html` no navegador.

Não é preciso instalar nada.

### Online com GitHub Pages
1. No repositório, vá em **Settings → Pages**.
2. Em **Source**, escolha **Deploy from a branch**.
3. Selecione a branch `main` e a pasta `/ (root)`, e clique em **Save**.
4. Após alguns minutos, o site ficará disponível em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

---

## 🛠️ Tecnologias

- HTML5
- CSS3 (variáveis CSS, Grid, Flexbox, degradês)
- JavaScript (ES6+)
- Fonte [Poppins](https://fonts.google.com/specimen/Poppins) (Google Fonts)

---

## ⚠️ Aviso importante

Esta ferramenta tem **finalidade exclusivamente educacional e de apoio**. Ela **não substitui** o julgamento clínico, a avaliação à beira-leito nem as diretrizes institucionais. Toda decisão terapêutica, inclusive o uso de vasopressores, deve ser tomada pela equipe médica responsável. Os autores não se responsabilizam por decisões clínicas tomadas com base nesta ferramenta.

---

## 👥 Créditos

| | |
|---|---|
| **Maria Aparecida de Macedo Fidelis Vasconcelos** | Farmacêutica clínica |
| **Yann Fidelis Vasconcelos** | Desenvolvedor web e designer |

<!-- Sugestão: adicione aqui a referência completa do estudo ANDROMEDA-SHOCK e de outras fontes clínicas usadas no conteúdo. -->

---

## 📄 Licença

Distribuído sob a licença **MIT**. Veja o arquivo [`LICENSE`](LICENSE) para mais detalhes.

---

# 🩺 VNERi Calculator (English)

An educational website that calculates the **VNERi (Vascular Norepinephrine Responsiveness Index)** and clearly explains what the result means in septic shock.

**Formula:** `VNERi = DBP ÷ (HR × NE dose)` — DBP in mmHg, HR in bpm, NE dose in mcg/kg/min.

| VNERi | Classification | Vasopressin |
|---|---|---|
| < 2.6 | Severe vascular hyporesponsiveness | Recommended |
| 2.6 – 6.6 | Vascular hyporesponsiveness | Not indicated by the index |
| 6.7 – 10.8 | Lowest-mortality zone | Not indicated by the index |
| > 10.8 | Other shock mechanisms | Not indicated by the index |

**Features:** responsive layout, dark mode, PT/EN language switch, result interpretation, vasopressin indicator. Built with plain HTML, CSS and JavaScript — just open `index.html`.

> **Disclaimer:** educational and support tool only. It does not replace clinical judgment or institutional guidelines. Therapeutic decisions are up to the responsible medical team.

**Credits:** Maria Aparecida de Macedo Fidelis Vasconcelos (clinical pharmacist) and Yann Fidelis Vasconcelos (web developer and designer).

**License:** MIT.
