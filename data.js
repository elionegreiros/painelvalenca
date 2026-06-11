// ============================================================================
// PARÂMETROS OFICIAIS DO PROGRAMA NOVO FINANCIAMENTO APS
// ============================================================================

// ---------- VÍNCULO E ACOMPANHAMENTO TERRITORIAL ----------
function classificarVinculo(score) {
    if (score > 8.5) return "ÓTIMO";
    if (score >= 7.0 && score <= 8.5) return "BOM";
    if (score >= 5.0 && score <= 6.9) return "SUFICIENTE";
    return "REGULAR";
}

function classificarAcompanhamento(score) {
    if (score > 85) return "ÓTIMO";
    if (score >= 65 && score <= 84.9) return "BOM";
    if (score >= 45 && score <= 64.9) return "SUFICIENTE";
    return "REGULAR";
}

// ---------- C1 - Mais Acesso ----------
function classificarC1(pct) {
    if (pct > 50 && pct <= 70) return "ÓTIMO";
    if (pct > 30 && pct <= 50) return "BOM";
    if (pct > 10 && pct <= 30) return "SUFICIENTE";
    return "REGULAR";
}

// ---------- C2 a C7 (Qualidade do Cuidado) ----------
function classificarQualidadeGeral(pct) {
    if (pct > 75) return "ÓTIMO";
    if (pct > 50) return "BOM";
    if (pct > 25) return "SUFICIENTE";
    return "REGULAR";
}

// ---------- B1 - 1ª Consulta Odontológica Programada ----------
function classificarB1(valor) {
    if (valor > 1.25) return "ÓTIMO";
    if (valor > 0.75 && valor <= 1.25) return "BOM";
    if (valor > 0.25 && valor <= 0.75) return "SUFICIENTE";
    return "REGULAR";
}

// ---------- B2 - Tratamento Odontológico Concluído ----------
function classificarB2(pct) {
    if (pct > 75) return "ÓTIMO";
    if (pct > 50) return "BOM";
    if (pct > 25) return "SUFICIENTE";
    return "REGULAR";
}

// ---------- B3 - Taxa de Exodontias ----------
function classificarB3(pct) {
    if (pct >= 3 && pct < 10) return "ÓTIMO";
    if (pct >= 10 && pct < 12) return "BOM";
    if (pct >= 12 && pct < 14) return "SUFICIENTE";
    return "REGULAR";
}

// ---------- B4 - Escovação Supervisionada ----------
function classificarB4(valor) {
    if (valor > 1) return "ÓTIMO";
    if (valor > 0.5 && valor <= 1) return "BOM";
    if (valor > 0.25 && valor <= 0.5) return "SUFICIENTE";
    return "REGULAR";
}

// ---------- B5 - Procedimentos Odontológicos Preventivos ----------
function classificarB5(pct) {
    if (pct >= 65 && pct < 85) return "ÓTIMO";
    if (pct >= 55 && pct < 65) return "BOM";
    if (pct >= 40 && pct < 55) return "SUFICIENTE";
    return "REGULAR";
}

// ---------- B6 - Tratamento Restaurador Atraumático ----------
function classificarB6(pct) {
    if (pct > 8) return "ÓTIMO";
    if (pct > 6 && pct <= 8) return "BOM";
    if (pct > 3 && pct <= 6) return "SUFICIENTE";
    return "REGULAR";
}

// ---------- M1 - Média de Atendimentos por Pessoa (eMulti) ----------
function classificarM1(valor) {
    if (valor > 3) return "ÓTIMO";
    if (valor > 2 && valor <= 3) return "BOM";
    if (valor > 1 && valor <= 2) return "SUFICIENTE";
    return "REGULAR";
}

// ---------- M2 - Ações Interprofissionais (eMulti) ----------
function classificarM2(valor) {
    if (valor > 5) return "ÓTIMO";
    if (valor > 2.5 && valor <= 5) return "BOM";
    if (valor > 1 && valor <= 2.5) return "SUFICIENTE";
    return "REGULAR";
}

// ============================================================================
// DADOS OFICIAIS - 1º QUADRIMESTRE 2026
// ============================================================================

const vinculoData1Q = {
    "PS VALE VERDE - PSF": { cadastros: 3.00, acompanhamento: 7.00, scoreFinal: 10.00 },
    "PS MORADA NOVA - PSF": { cadastros: 3.00, acompanhamento: 7.00, scoreFinal: 10.00 },
    "PS NOVO HORIZONTE - PSF": { cadastros: 3.00, acompanhamento: 5.25, scoreFinal: 8.25 },
    "PS AMANO LIMA PSF": { cadastros: 3.00, acompanhamento: 5.25, scoreFinal: 8.25 },
    "PS IEDA - PSF": { cadastros: 3.00, acompanhamento: 7.00, scoreFinal: 10.00 },
    "PS ISIDORIA - PSF": { cadastros: 3.00, acompanhamento: 5.25, scoreFinal: 8.25 },
    "PS SANTA ROSA - PSF": { cadastros: 3.00, acompanhamento: 5.25, scoreFinal: 8.25 },
    "PS CENTRO": { cadastros: 3.00, acompanhamento: 7.00, scoreFinal: 10.00 },
    "PS LAVANDERIA PSF": { cadastros: 3.00, acompanhamento: 7.00, scoreFinal: 10.00 },
    "SEGUNDA EQUIPE SAUDE D FAMILIA": { cadastros: 3.00, acompanhamento: 5.25, scoreFinal: 8.25 }
};

const qualidadeData1Q = {
    "PS VALE VERDE - PSF": { c1: 65.65, c2: 56.67, c3: 86.33, c4: 92.87, c5: 93.35, c6: 81.64, c7: 83.97 },
    "PS MORADA NOVA - PSF": { c1: 41.35, c2: 52.00, c3: 72.08, c4: 76.23, c5: 77.35, c6: 84.58, c7: 77.43 },
    "PS NOVO HORIZONTE - PSF": { c1: 66.72, c2: 60.00, c3: 73.00, c4: 90.81, c5: 92.66, c6: 91.27, c7: 74.06 },
    "PS AMANO LIMA PSF": { c1: 35.71, c2: 60.00, c3: 81.00, c4: 77.39, c5: 75.87, c6: 76.72, c7: 78.43 },
    "PS IEDA - PSF": { c1: 48.78, c2: 33.33, c3: 74.00, c4: 79.50, c5: 78.15, c6: 79.25, c7: 82.43 },
    "PS ISIDORIA - PSF": { c1: 47.54, c2: 62.50, c3: 64.00, c4: 81.78, c5: 83.90, c6: 85.85, c7: 81.11 },
    "PS SANTA ROSA - PSF": { c1: 37.50, c2: 36.00, c3: 65.75, c4: 75.92, c5: 78.30, c6: 74.41, c7: 81.66 },
    "PS CENTRO": { c1: 50.29, c2: 60.00, c3: 84.00, c4: 77.34, c5: 73.26, c6: 74.12, c7: 77.57 },
    "PS LAVANDERIA PSF": { c1: 60.60, c2: 36.36, c3: 85.38, c4: 84.35, c5: 80.61, c6: 71.98, c7: 78.54 },
    "SEGUNDA EQUIPE SAUDE D FAMILIA": { c1: 54.19, c2: 50.00, c3: 80.57, c4: 85.30, c5: 87.88, c6: 86.15, c7: 79.71 }
};

const sbData1Q = {
    "PS VALE VERDE - PSF": { equipeSB: "ESB VALE VERDE", b1: 4.48, b2: 56.48, b3: 8.05, b4: 2.09, b5: 63.37, b6: 14.19 },
    "PS MORADA NOVA - PSF": { equipeSB: "ESB VALENTIM MORADA NOVA", b1: 3.86, b2: 49.49, b3: 2.88, b4: 7.35, b5: 62.27, b6: 12.96 },
    "PS NOVO HORIZONTE - PSF": { equipeSB: "ESB NOVO HORIZONTE", b1: 9.54, b2: 62.57, b3: 2.07, b4: 9.90, b5: 72.99, b6: 10.43 },
    "PS AMANO LIMA PSF": { equipeSB: "ESB AMANDO LIMA", b1: 5.21, b2: 13.13, b3: 0.35, b4: 0.00, b5: 62.56, b6: 9.85 },
    "PS IEDA - PSF": { equipeSB: "ESB IEDA", b1: 5.60, b2: 46.34, b3: 4.16, b4: 14.90, b5: 65.38, b6: 13.10 },
    "PS ISIDORIA - PSF": { equipeSB: "ESB ISIDORIA", b1: 4.93, b2: 21.35, b3: 1.02, b4: 6.09, b5: 54.93, b6: 10.24 },
    "PS SANTA ROSA - PSF": { equipeSB: "ESB SANTA ROSA", b1: 6.51, b2: 43.64, b3: 5.24, b4: 10.96, b5: 55.64, b6: 11.86 },
    "PS CENTRO": { equipeSB: "ESB CENTRO", b1: 5.75, b2: 12.86, b3: 0.34, b4: 0.00, b5: 32.78, b6: 28.48 },
    "PS LAVANDERIA PSF": { equipeSB: "ESB LAVANDERIA", b1: 6.28, b2: 45.65, b3: 0.00, b4: 9.09, b5: 70.04, b6: 14.17 },
    "SEGUNDA EQUIPE SAUDE D FAMILIA": { equipeSB: "ESB SEGUNDA EQUIPE", b1: 6.23, b2: 76.47, b3: 8.30, b4: 3.76, b5: 52.31, b6: 9.96 }
};

const eMultiData1Q = [
    { nome: "EMULTI-COMPLEMENTAR", m1: 9.44, m2: 43.60 },
    { nome: "EMULT-ESTRATEGICA I", m1: 14.63, m2: 14.43 },
    { nome: "EMULT-ESTRATEGICA II", m1: 17.16, m2: 15.17 }
];

// ============================================================================
// DADOS OFICIAIS - 2º QUADRIMESTRE 2026
// ============================================================================

const vinculoData2Q = {
    "PS VALE VERDE - PSF": { cadastros: 3.00, acompanhamento: 7.00, scoreFinal: 10.00 },
    "PS MORADA NOVA - PSF": { cadastros: 3.00, acompanhamento: 7.00, scoreFinal: 10.00 },
    "PS NOVO HORIZONTE - PSF": { cadastros: 3.00, acompanhamento: 5.25, scoreFinal: 8.25 },
    "PS AMANO LIMA PSF": { cadastros: 3.00, acompanhamento: 5.25, scoreFinal: 8.25 },
    "PS IEDA - PSF": { cadastros: 3.00, acompanhamento: 7.00, scoreFinal: 10.00 },
    "PS ISIDORIA - PSF": { cadastros: 3.00, acompanhamento: 5.25, scoreFinal: 8.25 },
    "PS SANTA ROSA - PSF": { cadastros: 3.00, acompanhamento: 5.25, scoreFinal: 8.25 },
    "PS CENTRO": { cadastros: 3.00, acompanhamento: 7.00, scoreFinal: 10.00 },
    "PS LAVANDERIA PSF": { cadastros: 3.00, acompanhamento: 7.00, scoreFinal: 10.00 },
    "SEGUNDA EQUIPE SAUDE D FAMILIA": { cadastros: 3.00, acompanhamento: 5.25, scoreFinal: 8.25 }
};

const qualidadeData2Q = {
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

const sbData2Q = {
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

const eMultiData2Q = [
    { nome: "EMULTI-COMPLEMENTAR", m1: 8.04, m2: 51.20 },
    { nome: "EMULT-ESTRATEGICA I", m1: 12.70, m2: 9.76 },
    { nome: "EMULT-ESTRATEGICA II", m1: 17.23, m2: 14.95 }
];

// ============================================================================
// CONFIGURAÇÕES GLOBAIS
// ============================================================================

let currentPeriodo = "2Q_2026";

function getCurrentData() {
    if (currentPeriodo === "1Q_2026") {
        return {
            vinculo: vinculoData1Q,
            qualidade: qualidadeData1Q,
            sb: sbData1Q,
            eMulti: eMultiData1Q,
            label: "1º Quadrimestre 2026"
        };
    } else {
        return {
            vinculo: vinculoData2Q,
            qualidade: qualidadeData2Q,
            sb: sbData2Q,
            eMulti: eMultiData2Q,
            label: "2º Quadrimestre 2026"
        };
    }
}

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

const descricoes = {
    c1: "C1 - Mais Acesso: mede o equilíbrio entre demanda programada e espontânea. Ideal entre 50% e 70%.",
    c2: "C2 - Desenvolvimento Infantil: acompanhamento do crescimento e desenvolvimento de crianças.",
    c3: "C3 - Gestante/Puérpera: cuidado pré-natal e pós-parto de qualidade.",
    c4: "C4 - Diabetes: acompanhamento de usuários com diabetes mellitus.",
    c5: "C5 - Hipertensão: acompanhamento de usuários com hipertensão arterial.",
    c6: "C6 - Pessoa Idosa: atenção integral à saúde da pessoa idosa.",
    c7: "C7 - Mulheres: saúde da mulher, incluindo preventivo e planejamento familiar."
};

// ============================================================================
// CONFIGURAÇÃO DOS INDICADORES PARA MENU
// ============================================================================

const indicadoresAPS = [
    { id: "c1", nome: "C1 - Mais Acesso", descricao: "Equilíbrio entre demanda programada e espontânea. Ideal: 50-70%", unidade: "%", tipo: "c1" },
    { id: "c2", nome: "C2 - Desenvolvimento Infantil", descricao: "Acompanhamento do crescimento e desenvolvimento de crianças", unidade: "%", tipo: "geral" },
    { id: "c3", nome: "C3 - Gestante/Puérpera", descricao: "Cuidado pré-natal e pós-parto de qualidade", unidade: "%", tipo: "geral" },
    { id: "c4", nome: "C4 - Diabetes", descricao: "Acompanhamento de usuários com diabetes mellitus", unidade: "%", tipo: "geral" },
    { id: "c5", nome: "C5 - Hipertensão", descricao: "Acompanhamento de usuários com hipertensão arterial", unidade: "%", tipo: "geral" },
    { id: "c6", nome: "C6 - Pessoa Idosa", descricao: "Atenção integral à saúde da pessoa idosa", unidade: "%", tipo: "geral" },
    { id: "c7", nome: "C7 - Mulheres", descricao: "Saúde da mulher, preventivo e planejamento familiar", unidade: "%", tipo: "geral" }
];

const indicadoresSB = [
    { id: "b1", nome: "B1 - 1ª Consulta Programada", descricao: "Acesso à primeira consulta odontológica", unidade: "%", metodo: "classificarB1" },
    { id: "b2", nome: "B2 - Tratamento Concluído", descricao: "Proporção de tratamentos odontológicos finalizados", unidade: "%", metodo: "classificarB2" },
    { id: "b3", nome: "B3 - Taxa de Exodontia", descricao: "Relação entre extrações e procedimentos preventivos", unidade: "%", metodo: "classificarB3" },
    { id: "b4", nome: "B4 - Escovação Supervisionada", descricao: "Proporção de crianças beneficiadas", unidade: "%", metodo: "classificarB4" },
    { id: "b5", nome: "B5 - Procedimentos Preventivos", descricao: "Proporção de ações preventivas", unidade: "%", metodo: "classificarB5" },
    { id: "b6", nome: "B6 - Tratamento Restaurador Atraumático", descricao: "Realização de ART na APS", unidade: "%", metodo: "classificarB6" }
];

const indicadoresMulti = [
    { id: "m1", nome: "M1 - Média de Atendimentos/Pessoa", descricao: "Acesso da população aos atendimentos da eMulti", unidade: "atendimentos", metodo: "classificarM1" },
    { id: "m2", nome: "M2 - Ações Interprofissionais", descricao: "Ações de cuidado compartilhado", unidade: "%", metodo: "classificarM2" }
];

// Função para obter o valor de um indicador específico
function obterValorIndicador(equipe, indicadorId, data) {
    if (indicadorId.startsWith('c')) {
        return data.qualidade[equipe]?.[indicadorId] || 0;
    }
    if (indicadorId.startsWith('b')) {
        return data.sb[equipe]?.[indicadorId] || 0;
    }
    return 0;
}

// Função para classificar um indicador
function classificarIndicador(indicadorId, valor) {
    if (indicadorId === 'c1') return classificarC1(valor);
    if (indicadorId === 'c2' || indicadorId === 'c3' || indicadorId === 'c4' || 
        indicadorId === 'c5' || indicadorId === 'c6' || indicadorId === 'c7') {
        return classificarQualidadeGeral(valor);
    }
    if (indicadorId === 'b1') return classificarB1(valor);
    if (indicadorId === 'b2') return classificarB2(valor);
    if (indicadorId === 'b3') return classificarB3(valor);
    if (indicadorId === 'b4') return classificarB4(valor / 100);
    if (indicadorId === 'b5') return classificarB5(valor);
    if (indicadorId === 'b6') return classificarB6(valor);
    return "REGULAR";
}

// Ranking de equipes para um indicador
function obterRankingIndicador(indicadorId, data, limit = 10) {
    const ranking = equipesAPS.map(equipe => ({
        equipe: equipe.replace(' - PSF', ''),
        equipeOriginal: equipe,
        valor: obterValorIndicador(equipe, indicadorId, data),
        classificacao: classificarIndicador(indicadorId, obterValorIndicador(equipe, indicadorId, data))
    })).sort((a, b) => b.valor - a.valor);
    
    return ranking;
}

// Calcular média municipal para um indicador
function obterMediaMunicipal(indicadorId, data) {
    let soma = 0;
    let count = 0;
    equipesAPS.forEach(equipe => {
        const valor = obterValorIndicador(equipe, indicadorId, data);
        if (valor !== undefined) {
            soma += valor;
            count++;
        }
    });
    return count > 0 ? soma / count : 0;
}

// Metadados de classificação para exibição
function obterMetadadoClassificacao(indicadorId, nivel) {
    const metadados = {
        c1: { otimo: ">50% e ≤70%", bom: ">30% e ≤50%", suficiente: ">10% e ≤30%", regular: "≤10% ou >70%" },
        c2_c7: { otimo: ">75%", bom: ">50% e ≤75%", suficiente: ">25% e ≤50%", regular: "≤25%" },
        b1: { otimo: ">1.25", bom: ">0.75 e ≤1.25", suficiente: ">0.25 e ≤0.75", regular: "≤0.25" },
        b2: { otimo: ">75%", bom: ">50% e ≤75%", suficiente: ">25% e ≤50%", regular: "≤25%" },
        b3: { otimo: "≥3% e <10%", bom: "≥10% e <12%", suficiente: "≥12% e <14%", regular: "<3% ou ≥14%" },
        b4: { otimo: ">1", bom: ">0.5 e ≤1", suficiente: ">0.25 e ≤0.5", regular: "≤0.25" },
        b5: { otimo: "≥65% e <85%", bom: "≥55% e <65%", suficiente: "≥40% e <55%", regular: "<40% ou >85%" },
        b6: { otimo: ">8%", bom: ">6% e ≤8%", suficiente: ">3% e ≤6%", regular: "≤3%" },
        m1: { otimo: ">3", bom: ">2 e ≤3", suficiente: ">1 e ≤2", regular: "≤1" },
        m2: { otimo: ">5", bom: ">2.5 e ≤5", suficiente: ">1 e ≤2.5", regular: "≤1" }
    };
    
    let chave = indicadorId;
    if (['c2','c3','c4','c5','c6','c7'].includes(indicadorId)) chave = 'c2_c7';
    if (indicadorId === 'm1' || indicadorId === 'm2') chave = indicadorId;
    
    return metadados[chave]?.[nivel] || "-";
}