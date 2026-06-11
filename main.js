// Variáveis globais
let qualidadeChart = null;
let sbChart = null;
let currentEquipe = null;
let currentVisao = 'detalhado';
let currentIndicador = null;

// Badge
function badgeClass(status) {
    if (status === "ÓTIMO") return "badge-otimo";
    if (status === "BOM") return "badge-bom";
    if (status === "SUFICIENTE") return "badge-suficiente";
    return "badge-regular";
}

// Obter classe de evolução
function getEvolucaoClass(diff) {
    if (diff > 0) return "evolucao-positiva";
    if (diff < 0) return "evolucao-negativa";
    return "evolucao-estavel";
}

function getEvolucaoSimbolo(diff) {
    if (diff > 0) return "▲ +" + diff.toFixed(1);
    if (diff < 0) return "▼ " + Math.abs(diff).toFixed(1);
    return "● 0";
}

function calcularDesvioPadrao(valores) {
    const n = valores.length;
    const media = valores.reduce((a, b) => a + b, 0) / n;
    const somaQuadrados = valores.reduce((a, b) => a + Math.pow(b - media, 2), 0);
    return Math.sqrt(somaQuadrados / n);
}

// ============================================================================
// MENU POR EQUIPE
// ============================================================================

function renderMenu() {
    const container = document.getElementById("menuDinamico");
    container.innerHTML = "";

    const data = getCurrentData();
    const vinculoData = data.vinculo;

    // APS
    const apsDiv = document.createElement("div");
    apsDiv.innerHTML = `<div class="categoria-menu"><i class="fas fa-house-medical"></i> SAÚDE DA FAMÍLIA (10 equipes)</div><div class="equipe-menu" id="menuAPS"></div>`;
    container.appendChild(apsDiv);
    const menuAPS = apsDiv.querySelector("#menuAPS");
    
    equipesAPS.forEach(nome => {
        const v = vinculoData[nome];
        const classif = classificarVinculo(v.scoreFinal);
        const item = document.createElement("div");
        item.className = "equipe-item";
        item.innerHTML = `
            <div class="equipe-icon"><i class="fas fa-stethoscope"></i></div>
            <div class="equipe-info">
                <div class="equipe-nome">${nome.replace(" - PSF", "").substring(0, 28)}</div>
                <div class="equipe-status">${classif}</div>
            </div>
        `;
        item.onclick = () => { selectEquipe(item); carregarEquipeAPS(nome); };
        menuAPS.appendChild(item);
    });

    // Saúde Bucal
    const sbDiv = document.createElement("div");
    sbDiv.innerHTML = `<div class="categoria-menu"><i class="fas fa-tooth"></i> SAÚDE BUCAL (10 equipes)</div><div class="equipe-menu" id="menuSB"></div>`;
    container.appendChild(sbDiv);
    const menuSB = sbDiv.querySelector("#menuSB");
    
    const sbDataCurrent = data.sb;
    equipesBucal.forEach(e => {
        const dados = sbDataCurrent[e.ref];
        const classif = dados ? classificarB2(dados.b2) : "SEM DADOS";
        const item = document.createElement("div");
        item.className = "equipe-item";
        item.innerHTML = `
            <div class="equipe-icon"><i class="fas fa-tooth"></i></div>
            <div class="equipe-info">
                <div class="equipe-nome">${e.nomeSB}</div>
                <div class="equipe-status">${classif}</div>
            </div>
        `;
        item.onclick = () => { selectEquipe(item); carregarEquipeBucal(e.nomeSB, e.ref); };
        menuSB.appendChild(item);
    });

    // eMulti
    const multiDiv = document.createElement("div");
    multiDiv.innerHTML = `<div class="categoria-menu"><i class="fas fa-hand-holding-heart"></i> eMulti (3 equipes)</div><div class="equipe-menu" id="menuMulti"></div>`;
    container.appendChild(multiDiv);
    const menuMulti = multiDiv.querySelector("#menuMulti");
    
    const eMultiCurrent = data.eMulti;
    eMultiCurrent.forEach(em => {
        const classifM2 = classificarM2(em.m2);
        const item = document.createElement("div");
        item.className = "equipe-item";
        item.innerHTML = `
            <div class="equipe-icon"><i class="fas fa-users"></i></div>
            <div class="equipe-info">
                <div class="equipe-nome">${em.nome}</div>
                <div class="equipe-status">${classifM2}</div>
            </div>
        `;
        item.onclick = () => { selectEquipe(item); carregarEquipeEMulti(em); };
        menuMulti.appendChild(item);
    });

    const first = document.querySelector("#menuAPS .equipe-item");
    if (first) { first.classList.add("active"); carregarEquipeAPS(equipesAPS[0]); }
}

function selectEquipe(el) {
    document.querySelectorAll(".equipe-item").forEach(e => e.classList.remove("active"));
    el.classList.add("active");
}

// ============================================================================
// MENU POR INDICADOR
// ============================================================================

function renderMenuIndicador() {
    const containerAPS = document.getElementById("indicadoresAPS");
    const containerSB = document.getElementById("indicadoresSB");
    const containerMulti = document.getElementById("indicadoresMulti");
    
    if (!containerAPS) return;
    
    containerAPS.innerHTML = "";
    containerSB.innerHTML = "";
    containerMulti.innerHTML = "";
    
    indicadoresAPS.forEach(ind => {
        const item = document.createElement("div");
        item.className = "indicador-item";
        item.setAttribute("data-indicador", ind.id);
        item.innerHTML = `
            <div class="indicador-icon"><i class="fas fa-chart-line"></i></div>
            <div class="indicador-nome">${ind.nome}</div>
            <div class="indicador-meta">${ind.unidade}</div>
        `;
        item.onclick = () => {
            document.querySelectorAll(".indicador-item").forEach(el => el.classList.remove("active"));
            item.classList.add("active");
            carregarVisaoIndicador(ind.id, "aps");
        };
        containerAPS.appendChild(item);
    });
    
    indicadoresSB.forEach(ind => {
        const item = document.createElement("div");
        item.className = "indicador-item";
        item.innerHTML = `
            <div class="indicador-icon"><i class="fas fa-tooth"></i></div>
            <div class="indicador-nome">${ind.nome}</div>
            <div class="indicador-meta">${ind.unidade}</div>
        `;
        item.onclick = () => {
            document.querySelectorAll(".indicador-item").forEach(el => el.classList.remove("active"));
            item.classList.add("active");
            carregarVisaoIndicador(ind.id, "sb");
        };
        containerSB.appendChild(item);
    });
    
    indicadoresMulti.forEach(ind => {
        const item = document.createElement("div");
        item.className = "indicador-item";
        item.innerHTML = `
            <div class="indicador-icon"><i class="fas fa-users"></i></div>
            <div class="indicador-nome">${ind.nome}</div>
            <div class="indicador-meta">${ind.unidade}</div>
        `;
        item.onclick = () => {
            document.querySelectorAll(".indicador-item").forEach(el => el.classList.remove("active"));
            item.classList.add("active");
            carregarVisaoIndicadorMulti(ind.id);
        };
        containerMulti.appendChild(item);
    });
}

function carregarVisaoIndicador(indicadorId, tipo) {
    currentVisao = 'indicador';
    currentIndicador = indicadorId;
    
    const data = getCurrentData();
    const ranking = obterRankingIndicador(indicadorId, data);
    const mediaMunicipal = obterMediaMunicipal(indicadorId, data);
    const classificacaoMedia = classificarIndicador(indicadorId, mediaMunicipal);
    
    let nomeIndicador = "";
    let descricao = "";
    if (tipo === "aps") {
        const ind = indicadoresAPS.find(i => i.id === indicadorId);
        if (ind) { nomeIndicador = ind.nome; descricao = ind.descricao; }
    } else {
        const ind = indicadoresSB.find(i => i.id === indicadorId);
        if (ind) { nomeIndicador = ind.nome; descricao = ind.descricao; }
    }
    
    document.getElementById("selectedTeamName").innerHTML = `<i class="fas fa-chart-bar"></i> ${nomeIndicador}`;
    document.getElementById("selectedTeamSubtitle").innerHTML = `${descricao} | ${data.label}`;
    document.getElementById("periodoBadge").innerHTML = data.label;
    
    const getClassColor = (classif) => {
        if (classif === 'ÓTIMO') return '#2ecc71';
        if (classif === 'BOM') return '#3498db';
        if (classif === 'SUFICIENTE') return '#f39c12';
        return '#e74c3c';
    };
    
    let html = `
        <div class="kpi-row">
            <div class="kpi-card"><div class="kpi-label">📊 Média Municipal</div><div class="kpi-value">${mediaMunicipal.toFixed(1)}${indicadorId === 'b1' || indicadorId === 'b4' ? '' : '%'}</div><div><span class="badge ${badgeClass(classificacaoMedia)}">${classificacaoMedia}</span></div></div>
            <div class="kpi-card"><div class="kpi-label">🏆 Melhor Equipe</div><div class="kpi-value">${ranking[0]?.valor.toFixed(1)}${indicadorId === 'b1' || indicadorId === 'b4' ? '' : '%'}</div><div>${ranking[0]?.equipe.substring(0, 25)}</div></div>
            <div class="kpi-card"><div class="kpi-label">⚠️ Pior Equipe</div><div class="kpi-value">${ranking[ranking.length-1]?.valor.toFixed(1)}${indicadorId === 'b1' || indicadorId === 'b4' ? '' : '%'}</div><div>${ranking[ranking.length-1]?.equipe.substring(0, 25)}</div></div>
            <div class="kpi-card"><div class="kpi-label">📈 Desvio Padrão</div><div class="kpi-value">${calcularDesvioPadrao(ranking.map(r => r.valor)).toFixed(1)}</div><div>Disparidade entre equipes</div></div>
        </div>
        
        <div class="chart-card"><div class="chart-title">📊 Ranking das Equipes - ${nomeIndicador}</div><canvas id="rankingCanvas"></canvas></div>
        
        <div class="indicators-card">
            <div class="indicators-header">🏆 Ranking Detalhado - ${nomeIndicador}</div>
            <div class="indicador-table-wrapper">
                <table class="indicators-table">
                    <thead><tr><th>Posição</th><th>Equipe</th><th>Valor</th><th>Classificação</th><th>Progresso</th></tr></thead>
                    <tbody>
                        ${ranking.map((item, idx) => {
                            const cor = getClassColor(item.classificacao);
                            const maxValor = Math.max(...ranking.map(r => r.valor));
                            const barWidth = maxValor > 0 ? (item.valor / maxValor) * 100 : 0;
                            return `<tr>
                                <td class="rank-col"><strong>${idx + 1}º</strong></td>
                                <td class="equipe-col">${item.equipe}</td>
                                <td class="valor-col" style="color: ${cor}; font-weight: bold;">${item.valor.toFixed(1)}${indicadorId === 'b1' || indicadorId === 'b4' ? '' : '%'}</td>
                                <td class="classif-col"><span class="badge ${badgeClass(item.classificacao)}">${item.classificacao}</span></td>
                                <td style="width: 120px;"><div style="background: #e0e0e0; border-radius: 10px; height: 8px; width: 100%;"><div style="background: ${cor}; width: ${barWidth}%; height: 8px; border-radius: 10px;"></div></div></td>
                            </tr>`;
                        }).join('')}
                    </tbody>
                    <tfoot><tr class="municipio-media">
                        <td class="rank-col"><strong>📊</strong></td>
                        <td class="equipe-col"><strong>MÉDIA MUNICIPAL</strong></td>
                        <td class="valor-col" style="color: ${getClassColor(classificacaoMedia)}; font-weight: bold;">${mediaMunicipal.toFixed(1)}${indicadorId === 'b1' || indicadorId === 'b4' ? '' : '%'}</td>
                        <td class="classif-col"><span class="badge ${badgeClass(classificacaoMedia)}">${classificacaoMedia}</span></td>
                        <td></td>
                    </tr></tfoot>
                </table>
            </div>
        </div>
        
        <div class="indicators-card">
            <div class="indicators-header">📋 Metodologia de Classificação</div>
            <table class="indicators-table">
                <tr><td><strong>Ótimo</strong></td><td>${obterMetadadoClassificacao(indicadorId, "otimo")}</td></tr>
                <tr><td><strong>Bom</strong></td><td>${obterMetadadoClassificacao(indicadorId, "bom")}</td></tr>
                <tr><td><strong>Suficiente</strong></td><td>${obterMetadadoClassificacao(indicadorId, "suficiente")}</td></tr>
                <tr><td><strong>Regular</strong></td><td>${obterMetadadoClassificacao(indicadorId, "regular")}</td></tr>
            </table>
        </div>
    `;
    
    document.getElementById("dynamicContent").innerHTML = html;
    
    const ctx = document.getElementById('rankingCanvas')?.getContext('2d');
    if (ctx) {
        if (window.rankingChart) window.rankingChart.destroy();
        const coresBarra = ranking.map(r => getClassColor(r.classificacao));
        window.rankingChart = new Chart(ctx, {
            type: 'bar',
            data: { labels: ranking.map(r => r.equipe.substring(0, 20)), datasets: [{ label: `${nomeIndicador}`, data: ranking.map(r => r.valor), backgroundColor: coresBarra, borderRadius: 6 }] },
            options: { responsive: true, maintainAspectRatio: true, indexAxis: 'y', scales: { x: { beginAtZero: true } }, plugins: { legend: { display: false } } }
        });
    }
}

function carregarVisaoIndicadorMulti(indicadorId) {
    currentVisao = 'indicador';
    currentIndicador = indicadorId;
    
    const data = getCurrentData();
    const eMulti = data.eMulti;
    
    let nomeIndicador = "", descricao = "", unidade = "";
    let metodoClassif = null;
    
    if (indicadorId === 'm1') {
        nomeIndicador = "M1 - Média de Atendimentos por Pessoa";
        descricao = "Acesso da população aos atendimentos individuais e coletivos da eMulti";
        unidade = "atendimentos";
        metodoClassif = classificarM1;
    } else {
        nomeIndicador = "M2 - Ações Interprofissionais Compartilhadas";
        descricao = "Ações de cuidado compartilhado entre eMulti e outras equipes";
        unidade = "%";
        metodoClassif = classificarM2;
    }
    
    const valores = eMulti.map(em => ({
        nome: em.nome,
        valor: indicadorId === 'm1' ? em.m1 : em.m2,
        classificacao: metodoClassif(indicadorId === 'm1' ? em.m1 : em.m2)
    })).sort((a, b) => b.valor - a.valor);
    
    const media = valores.reduce((s, v) => s + v.valor, 0) / valores.length;
    const classificacaoMedia = metodoClassif(media);
    
    document.getElementById("selectedTeamName").innerHTML = `<i class="fas fa-hand-holding-heart"></i> ${nomeIndicador}`;
    document.getElementById("selectedTeamSubtitle").innerHTML = `${descricao} | ${data.label}`;
    document.getElementById("periodoBadge").innerHTML = data.label;
    
    let html = `
        <div class="kpi-row">
            <div class="kpi-card"><div class="kpi-label">📊 Média Municipal</div><div class="kpi-value">${media.toFixed(2)}${unidade === '%' ? '%' : ''}</div><div><span class="badge ${badgeClass(classificacaoMedia)}">${classificacaoMedia}</span></div></div>
            <div class="kpi-card"><div class="kpi-label">🏆 Melhor Equipe</div><div class="kpi-value">${valores[0]?.valor.toFixed(2)}${unidade === '%' ? '%' : ''}</div><div>${valores[0]?.nome}</div></div>
            <div class="kpi-card"><div class="kpi-label">⚠️ Pior Equipe</div><div class="kpi-value">${valores[valores.length-1]?.valor.toFixed(2)}${unidade === '%' ? '%' : ''}</div><div>${valores[valores.length-1]?.nome}</div></div>
        </div>
        
        <div class="chart-card"><div class="chart-title">📊 Desempenho eMulti - ${nomeIndicador}</div><canvas id="multiRankingCanvas"></canvas></div>
        
        <div class="indicators-card">
            <div class="indicators-header">🏆 Ranking eMulti</div>
            <table class="indicators-table">
                <tr><th>Posição</th><th>Equipe</th><th>Valor</th><th>Classificação</th></tr>
                ${valores.map((item, idx) => `<tr>
                    <td class="rank-col"><strong>${idx + 1}º</strong></td>
                    <td class="equipe-col">${item.nome}</td>
                    <td class="valor-col" style="font-weight: bold;">${item.valor.toFixed(2)}${unidade === '%' ? '%' : ''}</td>
                    <td class="classif-col"><span class="badge ${badgeClass(item.classificacao)}">${item.classificacao}</span></td>
                </tr>`).join('')}
            </table>
        </div>
    `;
    
    document.getElementById("dynamicContent").innerHTML = html;
    
    const ctx = document.getElementById('multiRankingCanvas')?.getContext('2d');
    if (ctx) {
        if (window.multiChart) window.multiChart.destroy();
        window.multiChart = new Chart(ctx, {
            type: 'bar',
            data: { labels: valores.map(v => v.nome), datasets: [{ label: `${nomeIndicador} (${unidade})`, data: valores.map(v => v.valor), backgroundColor: '#2ecc71', borderRadius: 6 }] },
            options: { responsive: true, maintainAspectRatio: true, scales: { y: { beginAtZero: true } } }
        });
    }
}

function toggleMenuIndicador(visao) {
    const menuIndicador = document.getElementById('menuIndicador');
    const menuEquipe = document.getElementById('menuDinamico');
    
    if (visao === 'indicador') {
        menuIndicador.style.display = 'block';
        menuEquipe.style.display = 'none';
        renderMenuIndicador();
    } else {
        menuIndicador.style.display = 'none';
        menuEquipe.style.display = 'block';
    }
}

// ============================================================================
// CARREGAMENTO DE EQUIPES
// ============================================================================

function carregarEquipeAPS(nome) {
    currentEquipe = nome;
    currentVisao = 'detalhado';
    
    const data = getCurrentData();
    const v = data.vinculo[nome];
    const q = data.qualidade[nome];
    const sb = data.sb[nome];
    
    const classifVinculo = classificarVinculo(v.scoreFinal);
    const classifAcompanhamento = classificarAcompanhamento(v.acompanhamento * 10);
    const mediaQualidade = ((q.c1 + q.c2 + q.c3 + q.c4 + q.c5 + q.c6 + q.c7) / 7).toFixed(1);

    document.getElementById("selectedTeamName").innerHTML = `<i class="fas fa-hospital-user"></i> ${nome}`;
    document.getElementById("selectedTeamSubtitle").innerHTML = `APS - Score Final ${v.scoreFinal} (${classifVinculo}) | Média Qualidade ${mediaQualidade}%`;
    document.getElementById("periodoBadge").innerHTML = data.label;

    const alertas = [];
    if (classificarC1(q.c1) === "REGULAR") alertas.push(`C1 (Acesso): ${q.c1}% - Fora da faixa ideal (50-70%)`);
    if (classificarQualidadeGeral(q.c2) === "REGULAR") alertas.push(`C2 (Desenvolvimento Infantil): ${q.c2}% - Crítico, abaixo de 25%`);
    if (sb && classificarB2(sb.b2) === "REGULAR") alertas.push(`Saúde Bucal - Tratamento Concluído: ${sb.b2}% - Abaixo de 25%`);

    let html = `
        <div class="kpi-row">
            <div class="kpi-card"><div class="kpi-label">🏆 Score Final (Vínculo)</div><div class="kpi-value">${v.scoreFinal.toFixed(2)}</div><div><span class="badge ${badgeClass(classifVinculo)}">${classifVinculo}</span></div></div>
            <div class="kpi-card"><div class="kpi-label">📈 Média C1-C7</div><div class="kpi-value">${mediaQualidade}%</div></div>
            <div class="kpi-card"><div class="kpi-label">📋 Cadastros</div><div class="kpi-value">${v.cadastros.toFixed(2)}</div><div>Score 0-3</div></div>
            <div class="kpi-card"><div class="kpi-label">👥 Acompanhamento</div><div class="kpi-value">${v.acompanhamento.toFixed(2)}</div><div><span class="badge ${badgeClass(classifAcompanhamento)}">${classifAcompanhamento}</span></div></div>
        </div>
        ${alertas.length ? `<div class="alert-banner"><i class="fas fa-exclamation-triangle"></i><div><strong>Recomendações:</strong><br>${alertas.slice(0, 4).join(' • ')}</div></div>` : '<div class="alert-banner" style="background:#e8f8f5;"><i class="fas fa-check-circle"></i><span>Equipe com bom desempenho! Manter boas práticas.</span></div>'}
        <div class="charts-grid">
            <div class="chart-card"><div class="chart-title">🎯 Qualidade do Cuidado (C1 a C7)</div><canvas id="qualidadeCanvas"></canvas></div>
            <div class="chart-card"><div class="chart-title">🦷 Saúde Bucal - eSB</div><canvas id="sbCanvas"></canvas></div>
        </div>
        <div class="indicators-card">
            <div class="indicators-header">📌 Vínculo e Acompanhamento Territorial</div>
            <table class="indicators-table"><tr><th>Indicador</th><th>Pontuação</th><th>Classificação</th><th>Metodologia</th></tr>
            <tr><td>Cadastros</td><td>${v.cadastros.toFixed(2)}</td><td><span class="badge badge-otimo">ÓTIMO</span></td><td>Score 3 = Ótimo</td></tr>
            <tr><td>Acompanhamento</td><td>${v.acompanhamento.toFixed(2)}</td><td><span class="badge ${badgeClass(classifAcompanhamento)}">${classifAcompanhamento}</span></td><td>Regular: <45, Suf: 45-64.9, Bom: 65-84.9, Ótimo: >85</td></tr>
            <tr><td><strong>Score Final</strong></td><td><strong>${v.scoreFinal.toFixed(2)}</strong></td><td><span class="badge ${badgeClass(classifVinculo)}">${classifVinculo}</span></td><td>Regular: <5, Suf: 5-6.9, Bom: 7-8.5, Ótimo: >8.5</td></tr>
            </table>
        </div>
        <div class="indicators-card">
            <div class="indicators-header">📋 Componente III - Qualidade do Cuidado</div>
            <table class="indicators-table"><tr><th>Indicador</th><th>Valor</th><th>Classificação</th><th>ℹ️</th></tr>
            ${['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'].map((c, i) => {
                const valor = q[c];
                const classif = c === 'c1' ? classificarC1(valor) : classificarQualidadeGeral(valor);
                const nomes = ['Mais Acesso', 'Desenvolvimento Infantil', 'Gestante/Puérpera', 'Diabetes', 'Hipertensão', 'Pessoa Idosa', 'Mulheres'];
                return `<tr><td><strong>C${i+1}</strong> - ${nomes[i]}</td><td>${valor}%</td><td><span class="badge ${badgeClass(classif)}">${classif}</span></td><td title="${descricoes[c]}"><i class="fas fa-info-circle"></i></td></tr>`;
            }).join('')}
            </table>
        </div>
    `;
    
    if (sb) {
        html += `
            <div class="indicators-card">
                <div class="indicators-header">🦷 Equipe de Saúde Bucal: ${sb.equipeSB}</div>
                <table class="indicators-table"><tr><th>Indicador</th><th>Valor</th><th>Classificação</th><th>ℹ️</th></tr>
                <tr><td>B1 - 1ª Consulta Programada</td><td>${sb.b1}%</td><td><span class="badge ${badgeClass(classificarB1(sb.b1))}">${classificarB1(sb.b1)}</span></td><td title="Regular: ≤0.25 | Suf: 0.25-0.75 | Bom: 0.75-1.25 | Ót: >1.25"><i class="fas fa-info-circle"></i></td></tr>
                <tr><td>B2 - Tratamento Concluído</td><td>${sb.b2}%</td><td><span class="badge ${badgeClass(classificarB2(sb.b2))}">${classificarB2(sb.b2)}</span></td><td title="Regular: ≤25 | Suf: 25-50 | Bom: 50-75 | Ót: >75"><i class="fas fa-info-circle"></i></td></tr>
                <tr><td>B3 - Taxa de Exodontia</td><td>${sb.b3}%</td><td><span class="badge ${badgeClass(classificarB3(sb.b3))}">${classificarB3(sb.b3)}</span></td><td title="Regular: <3 ou ≥14 | Suf: 12-14 | Bom: 10-12 | Ót: 3-10"><i class="fas fa-info-circle"></i></td></tr>
                <tr><td>B4 - Escovação Supervisionada</td><td>${sb.b4}%</td><td><span class="badge ${badgeClass(classificarB4(sb.b4 / 100))}">${classificarB4(sb.b4 / 100)}</span></td><td title="Regular: ≤0.25 | Suf: 0.25-0.5 | Bom: 0.5-1 | Ót: >1"><i class="fas fa-info-circle"></i></td></tr>
                <tr><td>B5 - Procedimentos Preventivos</td><td>${sb.b5}%</td><td><span class="badge ${badgeClass(classificarB5(sb.b5))}">${classificarB5(sb.b5)}</span></td><td title="Regular: <40 ou >85 | Suf: 40-55 | Bom: 55-65 | Ót: 65-85"><i class="fas fa-info-circle"></i></td></tr>
                <tr><td>B6 - Trat. Restaurador Atraumático</td><td>${sb.b6}%</td><td><span class="badge ${badgeClass(classificarB6(sb.b6))}">${classificarB6(sb.b6)}</span></td><td title="Regular: ≤3 | Suf: 3-6 | Bom: 6-8 | Ót: >8"><i class="fas fa-info-circle"></i></td></tr>
                </table>
            </div>
        `;
    }
    
    document.getElementById("dynamicContent").innerHTML = html;
    
    const ctx = document.getElementById('qualidadeCanvas')?.getContext('2d');
    if (ctx) {
        if (qualidadeChart) qualidadeChart.destroy();
        const valores = [q.c1, q.c2, q.c3, q.c4, q.c5, q.c6, q.c7];
        const cores = valores.map((v, i) => {
            const classif = i === 0 ? classificarC1(v) : classificarQualidadeGeral(v);
            if (classif === 'ÓTIMO') return '#2ecc71';
            if (classif === 'BOM') return '#3498db';
            if (classif === 'SUFICIENTE') return '#f39c12';
            return '#e74c3c';
        });
        qualidadeChart = new Chart(ctx, { type: 'bar', data: { labels: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'], datasets: [{ label: '%', data: valores, backgroundColor: cores, borderRadius: 8 }] }, options: { responsive: true, scales: { y: { max: 100 } }, plugins: { legend: { display: false } } } });
    }
    
    if (sb) {
        const ctxSB = document.getElementById('sbCanvas')?.getContext('2d');
        if (ctxSB) {
            if (sbChart) sbChart.destroy();
            sbChart = new Chart(ctxSB, { type: 'line', data: { labels: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6'], datasets: [{ label: 'Indicadores eSB', data: [sb.b1, sb.b2, sb.b3, sb.b4, sb.b5, sb.b6], borderColor: '#e67e22', tension: 0.2, fill: true }] }, options: { responsive: true } });
        }
    }
}

function carregarEquipeBucal(nomeSB, ref) {
    const data = getCurrentData();
    const d = data.sb[ref];
    document.getElementById("selectedTeamName").innerHTML = `<i class="fas fa-tooth"></i> ${nomeSB}`;
    document.getElementById("selectedTeamSubtitle").innerHTML = `Equipe de Saúde Bucal vinculada a ${ref} | ${data.label}`;
    document.getElementById("periodoBadge").innerHTML = data.label;
    
    let html = `
        <div class="kpi-row">
            <div class="kpi-card"><div class="kpi-label">🦷 1ª Consulta (B1)</div><div class="kpi-value">${d.b1}%</div><div><span class="badge ${badgeClass(classificarB1(d.b1))}">${classificarB1(d.b1)}</span></div></div>
            <div class="kpi-card"><div class="kpi-label">✅ Trat. Concluído (B2)</div><div class="kpi-value">${d.b2}%</div><div><span class="badge ${badgeClass(classificarB2(d.b2))}">${classificarB2(d.b2)}</span></div></div>
            <div class="kpi-card"><div class="kpi-label">🪥 Escovação (B4)</div><div class="kpi-value">${d.b4}%</div><div><span class="badge ${badgeClass(classificarB4(d.b4 / 100))}">${classificarB4(d.b4 / 100)}</span></div></div>
            <div class="kpi-card"><div class="kpi-label">⚕️ Preventivos (B5)</div><div class="kpi-value">${d.b5}%</div><div><span class="badge ${badgeClass(classificarB5(d.b5))}">${classificarB5(d.b5)}</span></div></div>
        </div>
        <div class="alert-banner"><i class="fas fa-lightbulb"></i> <strong>Análise Rápida:</strong> ${classificarB2(d.b2) === "REGULAR" ? '⚠️ B2 - Tratamento Concluído está crítico.' : classificarB2(d.b2) === "SUFICIENTE" ? '🟡 B2 - Pode melhorar.' : '✅ B2 - Bom desempenho!'}</div>
        <div class="chart-card"><div class="chart-title">📊 Indicadores Odontológicos eSB</div><canvas id="sbDetalheCanvas"></canvas></div>
        <div class="indicators-card">
            <div class="indicators-header">Detalhamento dos Indicadores eSB</div>
            <table class="indicators-table"><tr><th>Indicador</th><th>Valor</th><th>Classificação</th><th>Metodologia</th></tr>
            <tr><td>B1 - 1ª Consulta Programada</td><td>${d.b1}%</td><td><span class="badge ${badgeClass(classificarB1(d.b1))}">${classificarB1(d.b1)}</span></td><td>Regular: ≤0.25 | Suf: 0.25-0.75 | Bom: 0.75-1.25 | Ót: >1.25</td></tr>
            <tr><td>B2 - Tratamento Concluído</td><td>${d.b2}%</td><td><span class="badge ${badgeClass(classificarB2(d.b2))}">${classificarB2(d.b2)}</span></td><td>Regular: ≤25 | Suf: 25-50 | Bom: 50-75 | Ót: >75</td></tr>
            <tr><td>B3 - Taxa de Exodontia</td><td>${d.b3}%</td><td><span class="badge ${badgeClass(classificarB3(d.b3))}">${classificarB3(d.b3)}</span></td><td>Regular: <3 ou ≥14 | Suf: 12-14 | Bom: 10-12 | Ót: 3-10</td></tr>
            <tr><td>B4 - Escovação Supervisionada</td><td>${d.b4}%</td><td><span class="badge ${badgeClass(classificarB4(d.b4 / 100))}">${classificarB4(d.b4 / 100)}</span></td><td>Regular: ≤0.25 | Suf: 0.25-0.5 | Bom: 0.5-1 | Ót: >1</td></tr>
            <tr><td>B5 - Procedimentos Preventivos</td><td>${d.b5}%</td><td><span class="badge ${badgeClass(classificarB5(d.b5))}">${classificarB5(d.b5)}</span></td><td>Regular: <40 ou >85 | Suf: 40-55 | Bom: 55-65 | Ót: 65-85</td></tr>
            <tr><td>B6 - Trat. Restaurador Atraumático</td><td>${d.b6}%</td><td><span class="badge ${badgeClass(classificarB6(d.b6))}">${classificarB6(d.b6)}</span></td><td>Regular: ≤3 | Suf: 3-6 | Bom: 6-8 | Ót: >8</td></tr>
            </table>
        </div>
    `;
    document.getElementById("dynamicContent").innerHTML = html;
    
    const ctx = document.getElementById('sbDetalheCanvas')?.getContext('2d');
    if (ctx) {
        if (sbChart) sbChart.destroy();
        sbChart = new Chart(ctx, { type: 'bar', data: { labels: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6'], datasets: [{ label: 'Percentual (%)', data: [d.b1, d.b2, d.b3, d.b4, d.b5, d.b6], backgroundColor: '#1abc9c', borderRadius: 6 }] }, options: { responsive: true, scales: { y: { beginAtZero: true, max: 100 } } } });
    }
}

function carregarEquipeEMulti(em) {
    const data = getCurrentData();
    document.getElementById("selectedTeamName").innerHTML = `<i class="fas fa-hand-holding-heart"></i> ${em.nome}`;
    document.getElementById("selectedTeamSubtitle").innerHTML = `eMulti - Cuidado Integral | ${data.label}`;
    document.getElementById("periodoBadge").innerHTML = data.label;
    
    let html = `
        <div class="kpi-row">
            <div class="kpi-card"><div class="kpi-label">M1 - Média Atendimentos/Pessoa</div><div class="kpi-value">${em.m1}</div><div><span class="badge ${badgeClass(classificarM1(em.m1))}">${classificarM1(em.m1)}</span></div></div>
            <div class="kpi-card"><div class="kpi-label">M2 - Ações Interprofissionais</div><div class="kpi-value">${em.m2}%</div><div><span class="badge ${badgeClass(classificarM2(em.m2))}">${classificarM2(em.m2)}</span></div></div>
        </div>
        <div class="indicators-card">
            <div class="indicators-header">🤝 eMulti - Indicadores de Cuidado Integral</div>
            <table class="indicators-table"><tr><th>Indicador</th><th>Valor</th><th>Classificação</th><th>Metodologia</th></tr>
            <tr><td>M1 - Média de Atendimentos por Pessoa</td><td>${em.m1}</td><td><span class="badge ${badgeClass(classificarM1(em.m1))}">${classificarM1(em.m1)}</span></td><td>Regular: ≤1 | Suf: 1-2 | Bom: 2-3 | Ót: >3</td></tr>
            <tr><td>M2 - Ações Interprofissionais Compartilhadas</td><td>${em.m2}</td><td><span class="badge ${badgeClass(classificarM2(em.m2))}">${classificarM2(em.m2)}</span></td><td>Regular: ≤1 | Suf: 1-2.5 | Bom: 2.5-5 | Ót: >5</td></tr>
            </table>
        </div>
        ${classificarM2(em.m2) === "REGULAR" ? '<div class="alert-banner"><i class="fas fa-chart-line"></i> Recomenda-se fortalecer o matriciamento e as ações conjuntas para elevar o M2.</div>' : '<div class="alert-banner" style="background:#e0f2f1;"><i class="fas fa-check-circle"></i> Excelente articulação interprofissional!</div>'}
    `;
    document.getElementById("dynamicContent").innerHTML = html;
    if (qualidadeChart) qualidadeChart.destroy();
    if (sbChart) sbChart.destroy();
}

// ============================================================================
// RESUMO E COMPARATIVOS
// ============================================================================

function carregarResumo() {
    currentVisao = 'resumo';
    const data = getCurrentData();
    const qualidadeDataCurrent = data.qualidade;
    const vinculoDataCurrent = data.vinculo;
    
    document.getElementById("selectedTeamName").innerHTML = '<i class="fas fa-chart-pie"></i> Resumo Estratégico Municipal';
    document.getElementById("selectedTeamSubtitle").innerHTML = `Visão geral do desempenho da APS - ${data.label}`;
    document.getElementById("periodoBadge").innerHTML = data.label;
    
    let medias = { c1: 0, c2: 0, c3: 0, c4: 0, c5: 0, c6: 0, c7: 0 };
    equipesAPS.forEach(nome => {
        const q = qualidadeDataCurrent[nome];
        medias.c1 += q.c1; medias.c2 += q.c2; medias.c3 += q.c3;
        medias.c4 += q.c4; medias.c5 += q.c5; medias.c6 += q.c6; medias.c7 += q.c7;
    });
    Object.keys(medias).forEach(k => medias[k] = (medias[k] / equipesAPS.length).toFixed(1));
    
    let vinculos = { OTIMO: 0, BOM: 0, SUFICIENTE: 0, REGULAR: 0 };
    equipesAPS.forEach(nome => {
        const classif = classificarVinculo(vinculoDataCurrent[nome].scoreFinal);
        vinculos[classif]++;
    });
    
    const equipesCriticas = equipesAPS.filter(nome => {
        const q = qualidadeDataCurrent[nome];
        return classificarQualidadeGeral(q.c2) === "REGULAR" || classificarC1(q.c1) === "REGULAR";
    });
    
    let html = `
        <div class="kpi-row">
            <div class="kpi-card"><div class="kpi-label">📊 Equipes Avaliadas</div><div class="kpi-value">${equipesAPS.length}</div><div>eSF/eAP</div></div>
            <div class="kpi-card"><div class="kpi-label">🏆 Vínculo ÓTIMO</div><div class="kpi-value">${vinculos.OTIMO || 0}</div><div>Score >8.5</div></div>
            <div class="kpi-card"><div class="kpi-label">⚠️ Atenção Prioritária</div><div class="kpi-value">${equipesCriticas.length}</div><div>C1 ou C2 crítico</div></div>
            <div class="kpi-card"><div class="kpi-label">📈 Média Geral</div><div class="kpi-value">${((parseFloat(medias.c1) + parseFloat(medias.c2) + parseFloat(medias.c3) + parseFloat(medias.c4) + parseFloat(medias.c5) + parseFloat(medias.c6) + parseFloat(medias.c7)) / 7).toFixed(1)}%</div><div>Qualidade</div></div>
        </div>
        <div class="charts-grid">
            <div class="chart-card"><div class="chart-title">📈 Médias Municipais por Indicador</div><canvas id="resumoCanvas"></canvas></div>
            <div class="chart-card"><div class="chart-title">🏆 Distribuição - Vínculo</div><canvas id="classifCanvas"></canvas></div>
        </div>
        <div class="indicators-card">
            <div class="indicators-header">🎯 Ranking - Melhores C2 (Desenvolvimento Infantil)</div>
            <table class="indicators-table"><tr><th>Posição</th><th>Equipe</th><th>Percentual</th><th>Classificação</th></tr>
            ${equipesAPS.map(nome => ({ nome: nome.replace(' - PSF', ''), valor: qualidadeDataCurrent[nome].c2 })).sort((a, b) => b.valor - a.valor).slice(0, 5).map((item, idx) => `<tr><td>${idx + 1}º</td><td><strong>${item.nome}</strong></td><td>${item.valor}%</td><td><span class="badge ${badgeClass(classificarQualidadeGeral(item.valor))}">${classificarQualidadeGeral(item.valor)}</span></td></tr>`).join('')}
            </table>
        </div>
        <div class="indicators-card">
            <div class="indicators-header">⚠️ Equipes com Indicadores Críticos (C1 ou C2)</div>
            <table class="indicators-table"><tr><th>Equipe</th><th>Indicador Crítico</th><th>Valor</th><th>Recomendação</th></tr>
            ${equipesCriticas.map(nome => {
                const q = qualidadeDataCurrent[nome];
                let critico = '';
                if (classificarQualidadeGeral(q.c2) === "REGULAR") critico = `C2 (Desenv. Infantil): ${q.c2}%`;
                else if (classificarC1(q.c1) === "REGULAR") critico = `C1 (Acesso): ${q.c1}%`;
                return `<tr><td>${nome.replace(' - PSF', '')}</td><td>${critico}</td><td>⚠️ Crítico</td><td>Priorizar intervenção imediata</td></tr>`;
            }).join('')}
            ${equipesCriticas.length === 0 ? '<tr><td colspan="4">Nenhuma equipe com indicador crítico no momento</td></tr>' : ''}
            </table>
        </div>
    `;
    document.getElementById("dynamicContent").innerHTML = html;
    
    const ctxResumo = document.getElementById('resumoCanvas')?.getContext('2d');
    if (ctxResumo) {
        new Chart(ctxResumo, { type: 'radar', data: { labels: ['C1 Acesso', 'C2 Infantil', 'C3 Gestante', 'C4 Diabetes', 'C5 Hipertensão', 'C6 Idoso', 'C7 Mulher'], datasets: [{ label: 'Média Municipal (%)', data: [medias.c1, medias.c2, medias.c3, medias.c4, medias.c5, medias.c6, medias.c7], backgroundColor: 'rgba(46,204,113,0.2)', borderColor: '#2ecc71' }] }, options: { responsive: true, scales: { r: { beginAtZero: true, max: 100 } } } });
    }
    
    const ctxClassif = document.getElementById('classifCanvas')?.getContext('2d');
    if (ctxClassif) {
        new Chart(ctxClassif, { type: 'doughnut', data: { labels: ['ÓTIMO', 'BOM', 'SUFICIENTE', 'REGULAR'], datasets: [{ data: [vinculos.OTIMO || 0, vinculos.BOM || 0, vinculos.SUFICIENTE || 0, vinculos.REGULAR || 0], backgroundColor: ['#2ecc71', '#3498db', '#f39c12', '#e74c3c'] }] }, options: { responsive: true, plugins: { legend: { position: 'bottom' } } } });
    }
}

function carregarComparativoEquipes() {
    currentVisao = 'comparativo_equipes';
    const data = getCurrentData();
    const qualidadeDataCurrent = data.qualidade;
    
    document.getElementById("selectedTeamName").innerHTML = '<i class="fas fa-chart-line"></i> Comparativo entre Equipes';
    document.getElementById("selectedTeamSubtitle").innerHTML = `Análise comparativa de desempenho - ${data.label}`;
    document.getElementById("periodoBadge").innerHTML = data.label;
    
    let html = `
        <div style="margin-bottom: 20px; display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
            <select id="indicadorComparativo" style="padding: 10px 15px; border-radius: 8px; border: 1px solid #ddd; background: white; font-size: 0.85rem;">
                <option value="c1">C1 - Mais Acesso</option>
                <option value="c2" selected>C2 - Desenvolvimento Infantil</option>
                <option value="c3">C3 - Gestante/Puérpera</option>
                <option value="c4">C4 - Diabetes</option>
                <option value="c5">C5 - Hipertensão</option>
                <option value="c6">C6 - Pessoa Idosa</option>
                <option value="c7">C7 - Mulheres</option>
            </select>
            <button id="btnAtualizarComparativo" style="padding: 10px 20px; background: #2ecc71; border: none; border-radius: 8px; color: white; cursor: pointer;"><i class="fas fa-chart-bar"></i> Atualizar Gráfico</button>
        </div>
        <div class="chart-card"><canvas id="comparativoCanvas"></canvas></div>
    `;
    document.getElementById("dynamicContent").innerHTML = html;
    
    function atualizarGrafico() {
        const indicador = document.getElementById('indicadorComparativo').value;
        const valores = equipesAPS.map(nome => ({ nome: nome.replace(' - PSF', '').substring(0, 22), valor: qualidadeDataCurrent[nome][indicador] }));
        const cores = valores.map(v => {
            const classif = indicador === 'c1' ? classificarC1(v.valor) : classificarQualidadeGeral(v.valor);
            if (classif === 'ÓTIMO') return '#2ecc71';
            if (classif === 'BOM') return '#3498db';
            if (classif === 'SUFICIENTE') return '#f39c12';
            return '#e74c3c';
        });
        const ctx = document.getElementById('comparativoCanvas')?.getContext('2d');
        if (ctx) {
            if (window.comparativoChart) window.comparativoChart.destroy();
            window.comparativoChart = new Chart(ctx, { type: 'bar', data: { labels: valores.map(v => v.nome), datasets: [{ label: `Percentual (%) - ${indicador.toUpperCase()}`, data: valores.map(v => v.valor), backgroundColor: cores, borderRadius: 6 }] }, options: { responsive: true, scales: { y: { max: 100, beginAtZero: true } } } });
        }
    }
    document.getElementById('btnAtualizarComparativo')?.addEventListener('click', atualizarGrafico);
    atualizarGrafico();
}

function carregarComparativoPeriodos() {
    currentVisao = 'comparativo_periodos';
    document.getElementById("selectedTeamName").innerHTML = '<i class="fas fa-chart-line"></i> Comparativo 1º x 2º Quadrimestre 2026';
    document.getElementById("selectedTeamSubtitle").innerHTML = 'Evolução dos indicadores da APS em Valença do Piauí';
    document.getElementById("periodoBadge").innerHTML = '1ºQ → 2ºQ 2026';
    
    let medias1Q = { c1: 0, c2: 0, c3: 0, c4: 0, c5: 0, c6: 0, c7: 0 };
    let medias2Q = { c1: 0, c2: 0, c3: 0, c4: 0, c5: 0, c6: 0, c7: 0 };
    
    equipesAPS.forEach(nome => {
        const q1 = qualidadeData1Q[nome];
        const q2 = qualidadeData2Q[nome];
        medias1Q.c1 += q1.c1; medias1Q.c2 += q1.c2; medias1Q.c3 += q1.c3;
        medias1Q.c4 += q1.c4; medias1Q.c5 += q1.c5; medias1Q.c6 += q1.c6; medias1Q.c7 += q1.c7;
        medias2Q.c1 += q2.c1; medias2Q.c2 += q2.c2; medias2Q.c3 += q2.c3;
        medias2Q.c4 += q2.c4; medias2Q.c5 += q2.c5; medias2Q.c6 += q2.c6; medias2Q.c7 += q2.c7;
    });
    Object.keys(medias1Q).forEach(k => { medias1Q[k] /= equipesAPS.length; medias2Q[k] /= equipesAPS.length; });
    
    const diff = { c1: medias2Q.c1 - medias1Q.c1, c2: medias2Q.c2 - medias1Q.c2, c3: medias2Q.c3 - medias1Q.c3, c4: medias2Q.c4 - medias1Q.c4, c5: medias2Q.c5 - medias1Q.c5, c6: medias2Q.c6 - medias1Q.c6, c7: medias2Q.c7 - medias1Q.c7 };
    
    let vinculo1Q = 0, vinculo2Q = 0;
    equipesAPS.forEach(nome => { vinculo1Q += vinculoData1Q[nome].scoreFinal; vinculo2Q += vinculoData2Q[nome].scoreFinal; });
    vinculo1Q /= equipesAPS.length; vinculo2Q /= equipesAPS.length;
    
    let html = `
        <div class="comparativo-header"><h3><i class="fas fa-chart-line"></i> Evolução Municipal (1ºQ → 2ºQ 2026)</h3></div>
        <div class="kpi-row">
            <div class="kpi-card"><div class="kpi-label">Vínculo (Score Final)</div><div class="kpi-value">${vinculo1Q.toFixed(2)} → ${vinculo2Q.toFixed(2)}</div><div class="${getEvolucaoClass(vinculo2Q - vinculo1Q)}">${getEvolucaoSimbolo(vinculo2Q - vinculo1Q)}</div></div>
            <div class="kpi-card"><div class="kpi-label">Média C1-C7</div><div class="kpi-value">${((medias1Q.c1+medias1Q.c2+medias1Q.c3+medias1Q.c4+medias1Q.c5+medias1Q.c6+medias1Q.c7)/7).toFixed(1)}% → ${((medias2Q.c1+medias2Q.c2+medias2Q.c3+medias2Q.c4+medias2Q.c5+medias2Q.c6+medias2Q.c7)/7).toFixed(1)}%</div><div class="${getEvolucaoClass(((medias2Q.c1+medias2Q.c2+medias2Q.c3+medias2Q.c4+medias2Q.c5+medias2Q.c6+medias2Q.c7)/7) - ((medias1Q.c1+medias1Q.c2+medias1Q.c3+medias1Q.c4+medias1Q.c5+medias1Q.c6+medias1Q.c7)/7))}">${getEvolucaoSimbolo(((medias2Q.c1+medias2Q.c2+medias2Q.c3+medias2Q.c4+medias2Q.c5+medias2Q.c6+medias2Q.c7)/7) - ((medias1Q.c1+medias1Q.c2+medias1Q.c3+medias1Q.c4+medias1Q.c5+medias1Q.c6+medias1Q.c7)/7))}</div></div>
        </div>
        <div class="chart-card"><div class="chart-title">📊 Evolução por Indicador</div><canvas id="evolucaoCanvas"></canvas></div>
        <div class="comparativo-card"><div class="indicators-header">📈 Evolução Detalhada por Indicador</div>
            <div class="indicador-comparativo"><strong>C1 - Mais Acesso</strong><span>${medias1Q.c1.toFixed(1)}% → ${medias2Q.c1.toFixed(1)}%</span><span class="${getEvolucaoClass(diff.c1)}">${getEvolucaoSimbolo(diff.c1)}</span></div>
            <div class="indicador-comparativo"><strong>C2 - Desenvolvimento Infantil</strong><span>${medias1Q.c2.toFixed(1)}% → ${medias2Q.c2.toFixed(1)}%</span><span class="${getEvolucaoClass(diff.c2)}">${getEvolucaoSimbolo(diff.c2)}</span></div>
            <div class="indicador-comparativo"><strong>C3 - Gestante/Puérpera</strong><span>${medias1Q.c3.toFixed(1)}% → ${medias2Q.c3.toFixed(1)}%</span><span class="${getEvolucaoClass(diff.c3)}">${getEvolucaoSimbolo(diff.c3)}</span></div>
            <div class="indicador-comparativo"><strong>C4 - Diabetes</strong><span>${medias1Q.c4.toFixed(1)}% → ${medias2Q.c4.toFixed(1)}%</span><span class="${getEvolucaoClass(diff.c4)}">${getEvolucaoSimbolo(diff.c4)}</span></div>
            <div class="indicador-comparativo"><strong>C5 - Hipertensão</strong><span>${medias1Q.c5.toFixed(1)}% → ${medias2Q.c5.toFixed(1)}%</span><span class="${getEvolucaoClass(diff.c5)}">${getEvolucaoSimbolo(diff.c5)}</span></div>
            <div class="indicador-comparativo"><strong>C6 - Pessoa Idosa</strong><span>${medias1Q.c6.toFixed(1)}% → ${medias2Q.c6.toFixed(1)}%</span><span class="${getEvolucaoClass(diff.c6)}">${getEvolucaoSimbolo(diff.c6)}</span></div>
            <div class="indicador-comparativo"><strong>C7 - Mulheres</strong><span>${medias1Q.c7.toFixed(1)}% → ${medias2Q.c7.toFixed(1)}%</span><span class="${getEvolucaoClass(diff.c7)}">${getEvolucaoSimbolo(diff.c7)}</span></div>
        </div>
        <div class="indicators-card"><div class="indicators-header">🏆 Equipe que mais evoluiu (C2)</div><table class="indicators-table"><tr><th>Equipe</th><th>1ºQ (%)</th><th>2ºQ (%)</th><th>Evolução</th></tr>
            ${equipesAPS.map(nome => ({ nome: nome.replace(' - PSF', ''), v1: qualidadeData1Q[nome].c2, v2: qualidadeData2Q[nome].c2 })).map(item => ({ ...item, diff: item.v2 - item.v1 })).sort((a, b) => b.diff - a.diff).slice(0, 5).map(item => `<tr><td><strong>${item.nome}</strong></td><td>${item.v1}%</td><td>${item.v2}%</td><td class="${getEvolucaoClass(item.diff)}">${getEvolucaoSimbolo(item.diff)}</td></tr>`).join('')}
        </table></div>
    `;
    document.getElementById("dynamicContent").innerHTML = html;
    
    const ctx = document.getElementById('evolucaoCanvas')?.getContext('2d');
    if (ctx) {
        new Chart(ctx, { type: 'line', data: { labels: ['C1 Acesso', 'C2 Infantil', 'C3 Gestante', 'C4 Diabetes', 'C5 Hipertensão', 'C6 Idoso', 'C7 Mulher'], datasets: [{ label: '1º Quadrimestre', data: [medias1Q.c1, medias1Q.c2, medias1Q.c3, medias1Q.c4, medias1Q.c5, medias1Q.c6, medias1Q.c7], borderColor: '#3498db', tension: 0.3 }, { label: '2º Quadrimestre', data: [medias2Q.c1, medias2Q.c2, medias2Q.c3, medias2Q.c4, medias2Q.c5, medias2Q.c6, medias2Q.c7], borderColor: '#2ecc71', tension: 0.3 }] }, options: { responsive: true, scales: { y: { beginAtZero: true, max: 100 } } } });
    }
}

// ============================================================================
// EXPORTAÇÕES E EVENTOS
// ============================================================================

function exportToPDF() {
    html2pdf().set({ margin: 0.5, filename: `relatorio_saude_valenca_${currentPeriodo}_${new Date().toISOString().slice(0, 19)}.pdf`, image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' } }).from(document.getElementById('dynamicContent')).save();
}

function exportToExcel() {
    const data = getCurrentData();
    const dados = equipesAPS.map(nome => {
        const v = data.vinculo[nome];
        const q = data.qualidade[nome];
        const sb = data.sb[nome];
        return {
            Equipe: nome, Periodo: data.label, 'Score Final': v.scoreFinal,
            'C1 Acesso (%)': q.c1, 'C1 Classificação': classificarC1(q.c1),
            'C2 Infantil (%)': q.c2, 'C2 Classificação': classificarQualidadeGeral(q.c2),
            'C3 Gestante (%)': q.c3, 'C3 Classificação': classificarQualidadeGeral(q.c3),
            'C4 Diabetes (%)': q.c4, 'C4 Classificação': classificarQualidadeGeral(q.c4),
            'C5 Hipertensão (%)': q.c5, 'C5 Classificação': classificarQualidadeGeral(q.c5),
            'C6 Idoso (%)': q.c6, 'C6 Classificação': classificarQualidadeGeral(q.c6),
            'C7 Mulher (%)': q.c7, 'C7 Classificação': classificarQualidadeGeral(q.c7),
            'SB B2 - Trat Concluído (%)': sb ? sb.b2 : 'N/A'
        };
    });
    const ws = XLSX.utils.json_to_sheet(dados);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `Desempenho_${currentPeriodo}`);
    XLSX.writeFile(wb, `saude_valenca_${currentPeriodo}_${new Date().toISOString().slice(0, 10)}.xlsx`);
}

// Eventos
document.getElementById('themeToggle')?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const span = document.querySelector('#themeToggle span');
    span.textContent = document.body.classList.contains('dark-mode') ? 'Modo Claro' : 'Modo Escuro';
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    const span = document.querySelector('#themeToggle span');
    if (span) span.textContent = 'Modo Claro';
}

document.getElementById('periodoSelect')?.addEventListener('change', (e) => {
    const valor = e.target.value;
    if (valor === 'comparativo') {
        currentPeriodo = '2Q_2026';
        carregarComparativoPeriodos();
        toggleMenuIndicador('comparativo_periodos');
    } else {
        currentPeriodo = valor;
        renderMenu();
        const visaoSelect = document.getElementById('visaoSelect');
        if (visaoSelect.value === 'resumo') carregarResumo();
        else if (visaoSelect.value === 'comparativo') carregarComparativoEquipes();
        else if (visaoSelect.value === 'indicador') {
            toggleMenuIndicador('indicador');
            if (currentIndicador) carregarVisaoIndicador(currentIndicador, currentIndicador.startsWith('b') ? 'sb' : 'aps');
            else carregarVisaoIndicador('c2', 'aps');
        } else if (currentEquipe) carregarEquipeAPS(currentEquipe);
    }
});

document.getElementById('visaoSelect')?.addEventListener('change', (e) => {
    const valor = e.target.value;
    if (currentPeriodo === 'comparativo') {
        carregarComparativoPeriodos();
        toggleMenuIndicador('comparativo_periodos');
    } else if (valor === 'resumo') {
        carregarResumo();
        toggleMenuIndicador('resumo');
    } else if (valor === 'comparativo') {
        carregarComparativoEquipes();
        toggleMenuIndicador('comparativo_equipes');
    } else if (valor === 'indicador') {
        toggleMenuIndicador('indicador');
        if (currentIndicador) carregarVisaoIndicador(currentIndicador, currentIndicador.startsWith('b') ? 'sb' : 'aps');
        else carregarVisaoIndicador('c2', 'aps');
    } else if (currentEquipe) {
        carregarEquipeAPS(currentEquipe);
        toggleMenuIndicador('detalhado');
    }
});

document.getElementById('btnExportPDF')?.addEventListener('click', exportToPDF);
document.getElementById('btnExportExcel')?.addEventListener('click', exportToExcel);

// Inicializar
currentPeriodo = "2Q_2026";
renderMenu();
toggleMenuIndicador('detalhado');