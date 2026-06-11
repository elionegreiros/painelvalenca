// ==================== DADOS OFICIAIS - VALENÇA DO PIAUÍ ====================

// Vínculo - Classificação Final (página 2 do PDF)
const vinculoData = {
    "PS VALE VERDE - PSF": { cadastros: 3.00, acompanhamento: 7.00, scoreFinal: 10.00, classificacao: "ÓTIMO" },
    "PS MORADA NOVA - PSF": { cadastros: 3.00, acompanhamento: 7.00, scoreFinal: 10.00, classificacao: "ÓTIMO" },
    "PS NOVO HORIZONTE - PSF": { cadastros: 3.00, acompanhamento: 5.25, scoreFinal: 8.25, classificacao: "BOM" },
    "PS AMANO LIMA PSF": { cadastros: 3.00, acompanhamento: 5.25, scoreFinal: 8.25, classificacao: "BOM" },
    "PS IEDA - PSF": { cadastros: 3.00, acompanhamento: 7.00, scoreFinal: 10.00, classificacao: "ÓTIMO" },
    "PS ISIDORIA - PSF": { cadastros: 3.00, acompanhamento: 5.25, scoreFinal: 8.25, classificacao: "BOM" },
    "PS SANTA ROSA - PSF": { cadastros: 3.00, acompanhamento: 5.25, scoreFinal: 8.25, classificacao: "BOM" },
    "PS CENTRO": { cadastros: 3.00, acompanhamento: 7.00, scoreFinal: 10.00, classificacao: "ÓTIMO" },
    "PS LAVANDERIA PSF": { cadastros: 3.00, acompanhamento: 7.00, scoreFinal: 10.00, classificacao: "ÓTIMO" },
    "SEGUNDA EQUIPE SAUDE D FAMILIA": { cadastros: 3.00, acompanhamento: 5.25, scoreFinal: 8.25, classificacao: "BOM" }
};

// Qualidade do Cuidado - C1 a C7 (páginas 3-6 do PDF)
const qualidadeData = {
    "PS VALE VERDE - PSF": { c1: 70.03, c2: 80.00, c3: 69.38, c4: 89.59, c5: 86.26, c6: 79.13, c7: 84.99 },
    "PS MORADA NOVA - PSF": { c1: 38.87, c2: 42.22, c3: 70.33, c4: 69.83, c5: 69.44, c6: 81.27, c7: 71.11 },
    "PS NOVO HORIZONTE - PSF": { c1: 55.90, c2: 71.43, c3: 78.63, c4: 88.20, c5: 86.77, c6: 90.46, c7: 73.96 },
    "PS AMANO LIMA PSF": { c1: 47.49, c2: 56.67, c3: 74.17, c4: 76.49, c5: 76.70, c6: 75.41, c7: 76.90 },
    "PS IEDA - PSF": { c1: 29.68, c2: 20.00, c3: 72.93, c4: 69.13, c5: 70.51, c6: 75.17, c7: 77.88 },
    "PS ISIDORIA - PSF": { c1: 54.76, c2: 70.00, c3: 51.40, c4: 72.10, c5: 75.55, c6: 79.21, c7: 77.30 },
    "PS SANTA ROSA - PSF": { c1: 75.57, c2: 30.00, c3: 61.80, c4: 67.84, c5: 70.44, c6: 72.94, c7: 77.11 },
    "PS CENTRO": { c1: 57.16, c2: 58.18, c3: 69.20, c4: 68.25, c5: 67.11, c6: 70.12, c7: 75.97 },
    "PS LAVANDERIA PSF": { c1: 53.29, c2: 8.57, c3: 70.27, c4: 78.82, c5: 74.10, c6: 69.50, c7: 76.52 },
    "SEGUNDA EQUIPE SAUDE D FAMILIA": { c1: 36.80, c2: 48.89, c3: 73.00, c4: 81.47, c5: 81.03, c6: 83.90, c7: 77.04 }
};

// Saúde Bucal (páginas 7-9 do PDF)
const sbData = {
    "PS VALE VERDE - PSF": { equipeSB: "ESB VALE VERDE", b1: 1.37, b2: 27.27, b3: 3.51, b4: 45.80, b5: 67.91, b6: 3.70 },
    "PS MORADA NOVA - PSF": { equipeSB: "ESB VALENTIM MORADA NOVA", b1: 1.28, b2: 54.55, b3: 5.22, b4: 20.97, b5: 64.53, b6: 16.28 },
    "PS NOVO HORIZONTE - PSF": { equipeSB: "ESB NOVO HORIZONTE", b1: 2.64, b2: 63.46, b3: 0.00, b4: 28.79, b5: 69.08, b6: 6.12 },
    "PS AMANO LIMA PSF": { equipeSB: "ESB AMANDO LIMA", b1: 1.83, b2: 20.00, b3: 0.00, b4: 0.00, b5: 62.62, b6: 11.76 },
    "PS IEDA - PSF": { equipeSB: "ESB IEDA", b1: 2.31, b2: 44.12, b3: 0.00, b4: 24.66, b5: 72.51, b6: 6.67 },
    "PS ISIDORIA - PSF": { equipeSB: "ESB ISIDORIA", b1: 0.94, b2: 11.76, b3: 4.29, b4: 19.30, b5: 59.05, b6: 3.33 },
    "PS SANTA ROSA - PSF": { equipeSB: "ESB SANTA ROSA", b1: 1.60, b2: 88.89, b3: 5.52, b4: 15.13, b5: 84.69, b6: 21.05 },
    "PS CENTRO": { equipeSB: "ESB CENTRO", b1: 1.43, b2: 17.14, b3: 0.00, b4: 0.00, b5: 38.10, b6: 11.11 },
    "PS LAVANDERIA PSF": { equipeSB: "ESB LAVANDERIA", b1: 3.70, b2: 63.75, b3: 0.00, b4: 16.83, b5: 79.56, b6: 29.82 },
    "SEGUNDA EQUIPE SAUDE D FAMILIA": { equipeSB: "ESB SEGUNDA EQUIPE", b1: 1.94, b2: 86.49, b3: 10.34, b4: 0.00, b5: 60.80, b6: 11.36 }
};

// eMulti (página 10 do PDF)
const eMultiData = [
    { nome: "EMULTI-COMPLEMENTAR", m1: 8.04, m2: 51.20 },
    { nome: "EMULT-ESTRATEGICA I", m1: 12.70, m2: 9.76 },
    { nome: "EMULT-ESTRATEGICA II", m1: 17.23, m2: 14.95 }
];

// Listas
const equipesAPS = [
    "PS VALE VERDE - PSF", "PS MORADA NOVA - PSF", "PS NOVO HORIZONTE - PSF",
    "PS AMANO LIMA PSF", "PS IEDA - PSF", "PS ISIDORIA - PSF",
    "PS SANTA ROSA - PSF", "PS CENTRO", "PS LAVANDERIA PSF",
    "SEGUNDA EQUIPE SAUDE D FAMILIA"
];

const equipesBucal = [
    { nomeSB: "ESB VALE VERDE", ref: "PS VALE VERDE - PSF" },
    { nomeSB: "ESB VALENTIM MORADA NOVA", ref: "PS MORADA NOVA - PSF" },
    { nomeSB: "ESB NOVO HORIZONTE", ref: "PS NOVO HORIZONTE - PSF" },
    { nomeSB: "ESB AMANDO LIMA", ref: "PS AMANO LIMA PSF" },
    { nomeSB: "ESB IEDA", ref: "PS IEDA - PSF" },
    { nomeSB: "ESB ISIDORIA", ref: "PS ISIDORIA - PSF" },
    { nomeSB: "ESB SANTA ROSA", ref: "PS SANTA ROSA - PSF" },
    { nomeSB: "ESB CENTRO", ref: "PS CENTRO" },
    { nomeSB: "ESB LAVANDERIA", ref: "PS LAVANDERIA PSF" },
    { nomeSB: "ESB SEGUNDA EQUIPE", ref: "SEGUNDA EQUIPE SAUDE D FAMILIA" }
];

function getClassFromPercent(pct) {
    if (pct >= 80) return "ÓTIMO";
    if (pct >= 60) return "BOM";
    if (pct >= 40) return "SUFICIENTE";
    return "REGULAR";
}