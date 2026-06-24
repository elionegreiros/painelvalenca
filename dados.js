// ============================================
// DADOS OFICIAIS - SIAPS
// VALENÇA DO PIAUÍ - 1º QUADRIMESTRE 2026
// ============================================

// ============================================
// ESF - CLASSIFICAÇÕES E NOTAS OFICIAIS
// ============================================
const ESF = [
    { id: 1, nome: "PS AMANO LIMA PSF", unidade: "PS DR FRANCISCO DE CASTRO VELOSO CASTRINHO", nota: 6.75, classificacao: "BOM" },
    { id: 2, nome: "PS CENTRO", unidade: "PS MARIA DE NAZARETH DE SOUSA MONTEIRO", nota: 8.25, classificacao: "ÓTIMO" },
    { id: 3, nome: "PS IEDA - PSF", unidade: "PS IEDA LIMA VERDE", nota: 8.25, classificacao: "ÓTIMO" },
    { id: 4, nome: "PS ISIDORIA - PSF", unidade: "PS CINEAS VELOSO", nota: 8.75, classificacao: "ÓTIMO" },
    { id: 5, nome: "PS LAVANDERIA PSF", unidade: "PS DR NEMESIO VELOSO MARTINS DE CASTRO", nota: 8.25, classificacao: "ÓTIMO" },
    { id: 6, nome: "PS MORADA NOVA - PSF", unidade: "PS VALENTIM MORADA NOVA PSF", nota: 9.25, classificacao: "ÓTIMO" },
    { id: 7, nome: "PS NOVO HORIZONTE - PSF", unidade: "PS DR LINDOMAR DE MOURA BARBOSA", nota: 9.00, classificacao: "ÓTIMO" },
    { id: 8, nome: "PS SANTA ROSA - PSF", unidade: "PS ANGELO JOSE DOS SANTOS", nota: 7.75, classificacao: "ÓTIMO" },
    { id: 9, nome: "PS VALE VERDE - PSF", unidade: "PS MARIA DE JESUS LIMA", nota: 8.75, classificacao: "ÓTIMO" },
    { id: 10, nome: "SEGUNDA EQUIPE SAUDE D FAMILIA", unidade: "SEGUNDA EQUIPE SAUDE D FAMILIA", nota: 8.50, classificacao: "ÓTIMO" }
];

// ============================================
// ESF - INDICADORES C1-C7
// ============================================
const ESF_INDICADORES = {
    "PS AMANO LIMA PSF": {
        c1: { valor: 35.9, classificacao: "SUFICIENTE" },
        c2: { valor: 40.0, classificacao: "SUFICIENTE" },
        c3: { valor: 27.0, classificacao: "SUFICIENTE" },
        c4: { valor: 69.28, classificacao: "BOM" },
        c5: { valor: 78.31, classificacao: "ÓTIMO" },
        c6: { valor: 68.33, classificacao: "BOM" },
        c7: { valor: 74.75, classificacao: "BOM" }
    },
    "PS CENTRO": {
        c1: { valor: 50.49, classificacao: "ÓTIMO" },
        c2: { valor: 50.0, classificacao: "SUFICIENTE" },
        c3: { valor: 69.2, classificacao: "BOM" },
        c4: { valor: 77.49, classificacao: "ÓTIMO" },
        c5: { valor: 77.28, classificacao: "ÓTIMO" },
        c6: { valor: 68.85, classificacao: "BOM" },
        c7: { valor: 83.1, classificacao: "ÓTIMO" }
    },
    "PS IEDA - PSF": {
        c1: { valor: 56.28, classificacao: "ÓTIMO" },
        c2: { valor: 50.0, classificacao: "SUFICIENTE" },
        c3: { valor: 67.78, classificacao: "BOM" },
        c4: { valor: 79.44, classificacao: "ÓTIMO" },
        c5: { valor: 82.16, classificacao: "ÓTIMO" },
        c6: { valor: 72.32, classificacao: "BOM" },
        c7: { valor: 75.13, classificacao: "BOM" }
    },
    "PS ISIDORIA - PSF": {
        c1: { valor: 46.3, classificacao: "BOM" },
        c2: { valor: 60.0, classificacao: "BOM" },
        c3: { valor: 53.2, classificacao: "BOM" },
        c4: { valor: 84.13, classificacao: "ÓTIMO" },
        c5: { valor: 86.3, classificacao: "ÓTIMO" },
        c6: { valor: 77.44, classificacao: "ÓTIMO" },
        c7: { valor: 83.05, classificacao: "ÓTIMO" }
    },
    "PS LAVANDERIA PSF": {
        c1: { valor: 60.84, classificacao: "ÓTIMO" },
        c2: { valor: 47.27, classificacao: "SUFICIENTE" },
        c3: { valor: 74.29, classificacao: "BOM" },
        c4: { valor: 78.17, classificacao: "ÓTIMO" },
        c5: { valor: 80.51, classificacao: "ÓTIMO" },
        c6: { valor: 66.13, classificacao: "BOM" },
        c7: { valor: 79.49, classificacao: "ÓTIMO" }
    },
    "PS MORADA NOVA - PSF": {
        c1: { valor: 41.24, classificacao: "BOM" },
        c2: { valor: 52.0, classificacao: "BOM" },
        c3: { valor: 76.31, classificacao: "ÓTIMO" },
        c4: { valor: 84.62, classificacao: "ÓTIMO" },
        c5: { valor: 85.38, classificacao: "ÓTIMO" },
        c6: { valor: 76.95, classificacao: "ÓTIMO" },
        c7: { valor: 82.07, classificacao: "ÓTIMO" }
    },
    "PS NOVO HORIZONTE - PSF": {
        c1: { valor: 66.97, classificacao: "ÓTIMO" },
        c2: { valor: 57.5, classificacao: "BOM" },
        c3: { valor: 77.25, classificacao: "ÓTIMO" },
        c4: { valor: 85.69, classificacao: "ÓTIMO" },
        c5: { valor: 90.51, classificacao: "ÓTIMO" },
        c6: { valor: 85.56, classificacao: "ÓTIMO" },
        c7: { valor: 70.55, classificacao: "BOM" }
    },
    "PS SANTA ROSA - PSF": {
        c1: { valor: 16.6, classificacao: "SUFICIENTE" },
        c2: { valor: 45.0, classificacao: "SUFICIENTE" },
        c3: { valor: 57.33, classificacao: "BOM" },
        c4: { valor: 79.74, classificacao: "ÓTIMO" },
        c5: { valor: 82.52, classificacao: "ÓTIMO" },
        c6: { valor: 63.16, classificacao: "BOM" },
        c7: { valor: 83.6, classificacao: "ÓTIMO" }
    },
    "PS VALE VERDE - PSF": {
        c1: { valor: 65.42, classificacao: "ÓTIMO" },
        c2: { valor: 60.0, classificacao: "BOM" },
        c3: { valor: 84.83, classificacao: "ÓTIMO" },
        c4: { valor: 86.22, classificacao: "ÓTIMO" },
        c5: { valor: 87.79, classificacao: "ÓTIMO" },
        c6: { valor: 70.69, classificacao: "BOM" },
        c7: { valor: 67.51, classificacao: "BOM" }
    },
    "SEGUNDA EQUIPE SAUDE D FAMILIA": {
        c1: { valor: 54.13, classificacao: "ÓTIMO" },
        c2: { valor: 60.0, classificacao: "BOM" },
        c3: { valor: 70.45, classificacao: "BOM" },
        c4: { valor: 82.8, classificacao: "ÓTIMO" },
        c5: { valor: 82.62, classificacao: "ÓTIMO" },
        c6: { valor: 77.98, classificacao: "ÓTIMO" },
        c7: { valor: 72.73, classificacao: "BOM" }
    }
};

// ============================================
// ESB - CLASSIFICAÇÕES OFICIAIS
// ============================================
const ESB = [
    { id: 1, nome: "CEO DE VALENCA", unidade: "PS MARIA DE NAZARETH DE SOUSA MONTEIRO", nota: 3.25, classificacao: "SUFICIENTE" },
    { id: 2, nome: "ESB AMANDO LIMA", unidade: "PS DR FRANCISCO DE CASTRO VELOSO CASTRINHO", nota: 4.75, classificacao: "SUFICIENTE" },
    { id: 3, nome: "ESB CENTRO", unidade: "PS MARIA DE NAZARETH DE SOUSA MONTEIRO", nota: 3.75, classificacao: "SUFICIENTE" },
    { id: 4, nome: "ESB IEDA", unidade: "PS IEDA LIMA VERDE", nota: 6.50, classificacao: "BOM" },
    { id: 5, nome: "ESB ISIDORIA", unidade: "PS CINEAS VELOSO", nota: 6.00, classificacao: "BOM" },
    { id: 6, nome: "ESB LAVANDERIA", unidade: "PS DR NEMESIO VELOSO MARTINS DE CASTRO", nota: 7.25, classificacao: "BOM" },
    { id: 7, nome: "ESB NOVO HORIZONTE", unidade: "PS DR LINDOMAR DE MOURA BARBOSA", nota: 7.00, classificacao: "BOM" },
    { id: 8, nome: "ESB SANTA ROSA", unidade: "PS ANGELO JOSE DOS SANTOS", nota: 7.00, classificacao: "BOM" },
    { id: 9, nome: "ESB SEGUNDA EQUIPE", unidade: "PS DR LINDOMAR DE MOURA BARBOSA", nota: 8.00, classificacao: "ÓTIMO" },
    { id: 10, nome: "ESB VALE VERDE", unidade: "PS MARIA DE JESUS LIMA", nota: 6.75, classificacao: "BOM" },
    { id: 11, nome: "ESB VALENTIM MORADA NOVA", unidade: "PS VALENTIM MORADA NOVA PSF", nota: 7.00, classificacao: "BOM" }
];

// ============================================
// ESB - INDICADORES B1-B6
// ============================================
const ESB_INDICADORES = {
    "CEO DE VALENCA": {
        b1: { valor: 0, classificacao: "REGULAR" },
        b2: { valor: 45.45, classificacao: "SUFICIENTE" },
        b3: { valor: 0, classificacao: "REGULAR" },
        b4: { valor: 0, classificacao: "REGULAR" },
        b5: { valor: 51.61, classificacao: "SUFICIENTE" },
        b6: { valor: 0, classificacao: "REGULAR" }
    },
    "ESB AMANDO LIMA": {
        b1: { valor: 1.42, classificacao: "SUFICIENTE" },
        b2: { valor: 33.33, classificacao: "SUFICIENTE" },
        b3: { valor: 0.37, classificacao: "REGULAR" },
        b4: { valor: 0, classificacao: "REGULAR" },
        b5: { valor: 65.69, classificacao: "BOM" },
        b6: { valor: 10.2, classificacao: "ÓTIMO" }
    },
    "ESB CENTRO": {
        b1: { valor: 1.61, classificacao: "SUFICIENTE" },
        b2: { valor: 19.18, classificacao: "REGULAR" },
        b3: { valor: 0.36, classificacao: "REGULAR" },
        b4: { valor: 0, classificacao: "REGULAR" },
        b5: { valor: 17.27, classificacao: "REGULAR" },
        b6: { valor: 28.93, classificacao: "ÓTIMO" }
    },
    "ESB IEDA": {
        b1: { valor: 1.57, classificacao: "SUFICIENTE" },
        b2: { valor: 63.84, classificacao: "BOM" },
        b3: { valor: 4.27, classificacao: "REGULAR" },
        b4: { valor: 3.83, classificacao: "ÓTIMO" },
        b5: { valor: 53.42, classificacao: "SUFICIENTE" },
        b6: { valor: 12.23, classificacao: "ÓTIMO" }
    },
    "ESB ISIDORIA": {
        b1: { valor: 1.26, classificacao: "SUFICIENTE" },
        b2: { valor: 42.22, classificacao: "SUFICIENTE" },
        b3: { valor: 1.04, classificacao: "REGULAR" },
        b4: { valor: 1.53, classificacao: "ÓTIMO" },
        b5: { valor: 59.24, classificacao: "BOM" },
        b6: { valor: 10.3, classificacao: "ÓTIMO" }
    },
    "ESB LAVANDERIA": {
        b1: { valor: 1.59, classificacao: "SUFICIENTE" },
        b2: { valor: 76.3, classificacao: "ÓTIMO" },
        b3: { valor: 0, classificacao: "REGULAR" },
        b4: { valor: 2.18, classificacao: "ÓTIMO" },
        b5: { valor: 63.57, classificacao: "BOM" },
        b6: { valor: 14.29, classificacao: "ÓTIMO" }
    },
    "ESB NOVO HORIZONTE": {
        b1: { valor: 2.53, classificacao: "ÓTIMO" },
        b2: { valor: 87.63, classificacao: "ÓTIMO" },
        b3: { valor: 2.22, classificacao: "REGULAR" },
        b4: { valor: 2.46, classificacao: "ÓTIMO" },
        b5: { valor: 59.18, classificacao: "BOM" },
        b6: { valor: 10.62, classificacao: "ÓTIMO" }
    },
    "ESB SANTA ROSA": {
        b1: { valor: 1.84, classificacao: "SUFICIENTE" },
        b2: { valor: 92.52, classificacao: "ÓTIMO" },
        b3: { valor: 5.42, classificacao: "REGULAR" },
        b4: { valor: 2.86, classificacao: "ÓTIMO" },
        b5: { valor: 47.81, classificacao: "SUFICIENTE" },
        b6: { valor: 9.36, classificacao: "ÓTIMO" }
    },
    "ESB SEGUNDA EQUIPE": {
        b1: { valor: 1.61, classificacao: "SUFICIENTE" },
        b2: { valor: 104.24, classificacao: "ÓTIMO" },
        b3: { valor: 8.26, classificacao: "ÓTIMO" },
        b4: { valor: 0.67, classificacao: "BOM" },
        b5: { valor: 47.49, classificacao: "SUFICIENTE" },
        b6: { valor: 9.89, classificacao: "ÓTIMO" }
    },
    "ESB VALE VERDE": {
        b1: { valor: 1.25, classificacao: "SUFICIENTE" },
        b2: { valor: 110.53, classificacao: "ÓTIMO" },
        b3: { valor: 7.68, classificacao: "REGULAR" },
        b4: { valor: 0.66, classificacao: "BOM" },
        b5: { valor: 60.59, classificacao: "BOM" },
        b6: { valor: 14.29, classificacao: "ÓTIMO" }
    },
    "ESB VALENTIM MORADA NOVA": {
        b1: { valor: 1.16, classificacao: "SUFICIENTE" },
        b2: { valor: 83.65, classificacao: "ÓTIMO" },
        b3: { valor: 2.99, classificacao: "REGULAR" },
        b4: { valor: 2.2, classificacao: "ÓTIMO" },
        b5: { valor: 48.6, classificacao: "SUFICIENTE" },
        b6: { valor: 13.29, classificacao: "ÓTIMO" }
    }
};

// ============================================
// eMulti - CLASSIFICAÇÕES OFICIAIS
// ============================================
const EMULTI = [
    { id: 1, nome: "EMULT-ESTRATERGICA I", unidade: "PS DR LINDOMAR DE MOURA BARBOSA", nota: 8.50, classificacao: "ÓTIMO" },
    { id: 2, nome: "EMULT-ESTRATERGICA II", unidade: "PS DR LINDOMAR DE MOURA BARBOSA", nota: 10.00, classificacao: "ÓTIMO" },
    { id: 3, nome: "EMULTI-COMPLEMENTAR", unidade: "PS VALENTIM MORADA NOVA PSF", nota: 10.00, classificacao: "ÓTIMO" }
];

// ============================================
// eMulti - INDICADORES M1-M2
// ============================================
const EMULTI_INDICADORES = {
    "EMULT-ESTRATERGICA I": {
        m1: { valor: 4.5, classificacao: "BOM" },
        m2: { valor: 6.53, classificacao: "ÓTIMO" }
    },
    "EMULT-ESTRATERGICA II": {
        m1: { valor: 6, classificacao: "ÓTIMO" },
        m2: { valor: 7.04, classificacao: "ÓTIMO" }
    },
    "EMULTI-COMPLEMENTAR": {
        m1: { valor: 6, classificacao: "ÓTIMO" },
        m2: { valor: 12.26, classificacao: "ÓTIMO" }
    }
};