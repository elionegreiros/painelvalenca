let qualidadeChart = null;
let sbChart = null;
let currentEquipe = null;

function badgeClass(status) {
    if (status === "ÓTIMO") return "badge-otimo";
    if (status === "BOM") return "badge-bom";
    if (status === "SUFICIENTE") return "badge-suficiente";
    return "badge-regular";
}

function renderMenu() {
    const container = document.getElementById("menuDinamico");
    container.innerHTML = "";

    // APS
    const apsDiv = document.createElement("div");
    apsDiv.innerHTML = `<div class="categoria-menu"><i class="fas fa-house-medical"></i> SAÚDE DA FAMÍLIA (10 equipes)</div><div class="equipe-menu" id="menuAPS"></div>`;
    container.appendChild(apsDiv);
    const menuAPS = apsDiv.querySelector("#menuAPS");
    equipesAPS.forEach(nome => {
        const v = vinculoData[nome];
        const item = document.createElement("div");
        item.className = "equipe-item";
        item.innerHTML = `<div class="equipe-icon"><i class="fas fa-stethoscope"></i></div><div class="equipe-info"><div class="equipe-nome">${nome.replace(" - PSF", "")}</div><div class="equipe-status">${v.classificacao}</div></div>`;
        item.onclick = () => { selectEquipe(item); carregarEquipeAPS(nome); };
        menuAPS.appendChild(item);
    });

    // Saúde Bucal
    const sbDiv = document.createElement("div");
    sbDiv.innerHTML = `<div class="categoria-menu"><i class="fas fa-tooth"></i> SAÚDE BUCAL (10 equipes)</div><div class="equipe-menu" id="menuSB"></div>`;
    container.appendChild(sbDiv);
    const menuSB = sbDiv.querySelector("#menuSB");
    equipesBucal.forEach(e => {
        const dados = sbData[e.ref];
        const item = document.createElement("div");
        item.className = "equipe-item";
        item.innerHTML = `<div class="equipe-icon"><i class="fas fa-tooth"></i></div><div class="equipe-info"><div class="equipe-nome">${e.nomeSB}</div><div class="equipe-status">${dados.b2 >= 60 ? "Bom" : "Atenção"}</div></div>`;
        item.onclick = () => { selectEquipe(item); carregarEquipeBucal(e.nomeSB, e.ref); };
        menuSB.appendChild(item);
    });

    // eMulti
    const multiDiv = document.createElement("div");
    multiDiv.innerHTML = `<div class="categoria-menu"><i class="fas fa-hand-holding-heart"></i> eMulti (3 equipes)</div><div class="equipe-menu" id="menuMulti"></div>`;
    container.appendChild(multiDiv);
    const menuMulti = multiDiv.querySelector("#menuMulti");
    eMultiData.forEach(em => {
        const item = document.createElement("div");
        item.className = "equipe-item";
        item.innerHTML = `<div class="equipe-icon"><i class="fas fa-users"></i></div><div class="equipe-info"><div class="equipe-nome">${em.nome}</div><div class="equipe-status">eMulti</div></div>`;
        item.onclick = () => { selectEquipe(item); carregarEquipeEMulti(em); };
        menuMulti.appendChild(item);
    });

    // Primeira equipe
    const first = document.querySelector("#menuAPS .equipe-item");
    if (first) { first.classList.add("active"); carregarEquipeAPS(equipesAPS[0]); }
}

function selectEquipe(el) {
    document.querySelectorAll(".equipe-item").forEach(e => e.classList.remove("active"));
    el.classList.add("active");
}

function carregarEquipeAPS(nome) {
    currentEquipe = nome;
    const v = vinculoData[nome];
    const q = qualidadeData[nome];
    const sb = sbData[nome];
    const media = ((q.c1+q.c2+q.c3+q.c4+q.c5+q.c6+q.c7)/7).toFixed(1);

    document.getElementById("selectedTeamName").innerHTML = `<i class="fas fa-hospital-user"></i> ${nome}`;
    document.getElementById("selectedTeamSubtitle").innerHTML = `APS - Vínculo ${v.scoreFinal} | Qualidade Média ${media}%`;

    let html = `
        <div class="kpi-row">
            <div class="kpi-card"><div class="kpi-label">Score Final</div><div class="kpi-value">${v.scoreFinal}</div><div>${v.classificacao}</div></div>
            <div class="kpi-card"><div class="kpi-label">Média Qualidade</div><div class="kpi-value">${media}%</div></div>
            <div class="kpi-card"><div class="kpi-label">Cadastros</div><div class="kpi-value">${v.cadastros}</div></div>
            <div class="kpi-card"><div class="kpi-label">Acompanhamento</div><div class="kpi-value">${v.acompanhamento}</div></div>
        </div>
        <div class="charts-grid">
            <div class="chart-card"><div class="chart-title">Qualidade do Cuidado (C1 a C7)</div><canvas id="qualidadeCanvas"></canvas></div>
            <div class="chart-card"><div class="chart-title">Saúde Bucal - eSB</div><canvas id="sbCanvas"></canvas></div>
        </div>
        <div class="indicators-card"><div class="indicators-header">📋 Qualidade do Cuidado</div><table class="indicators-table"><tr><th>Indicador</th><th>%</th><th>Classificação</th></tr>
            ${['c1','c2','c3','c4','c5','c6','c7'].map((c,i) => `<tr><td>C${i+1} - ${['Acesso','Infantil','Gestante','Diabetes','Hipertensão','Idoso','Mulher'][i]}</td><td>${q[c]}%</td><td><span class="badge ${badgeClass(getClassFromPercent(q[c]))}">${getClassFromPercent(q[c])}</span></td></tr>`).join('')}
        </table></div>
        <div class="indicators-card"><div class="indicators-header">🦷 ${sb.equipeSB}</div><table class="indicators-table">
            <tr><th>B1 1ª Consulta</th><td>${sb.b1}%</td><td>${sb.b1>=1 ? '✅' : '⚠️'}</td></tr>
            <tr><th>B2 Tratamento Concluído</th><td>${sb.b2}%</td><td>${sb.b2>=50 ? '⭐ Bom' : '🔻 Crítico'}</td></tr>
            <tr><th>B3 Exodontia</th><td>${sb.b3}%</td><td>${sb.b3<=5 ? 'Controlada' : 'Alta'}</td></tr>
            <tr><th>B4 Escovação Supervisionada</th><td>${sb.b4}%</td><td>${sb.b4>=15 ? 'Efetiva' : 'Insuficiente'}</td></tr>
            <tr><th>B5 Preventivos</th><td>${sb.b5}%</td><td>${sb.b5>=60 ? 'Ótimo' : 'Melhorar'}</td></tr>
            <tr><th>B6 Trat. Atraumático</th><td>${sb.b6}%</td><td>${sb.b6>=10 ? 'Bom' : 'Suficiente'}</td></tr>
        </table></div>
    `;
    document.getElementById("dynamicContent").innerHTML = html;
    renderGraficos(q, sb);
}

function carregarEquipeBucal(nomeSB, ref) {
    const d = sbData[ref];
    document.getElementById("selectedTeamName").innerHTML = `<i class="fas fa-tooth"></i> ${nomeSB}`;
    document.getElementById("selectedTeamSubtitle").innerHTML = `Equipe de Saúde Bucal vinculada a ${ref}`;
    let html = `
        <div class="kpi-row">
            <div class="kpi-card"><div class="kpi-label">1ª Consulta (B1)</div><div class="kpi-value">${d.b1}%</div></div>
            <div class="kpi-card"><div class="kpi-label">Trat. Concluído (B2)</div><div class="kpi-value">${d.b2}%</div></div>
            <div class="kpi-card"><div class="kpi-label">Escovação (B4)</div><div class="kpi-value">${d.b4}%</div></div>
            <div class="kpi-card"><div class="kpi-label">Preventivos (B5)</div><div class="kpi-value">${d.b5}%</div></div>
        </div>
        <div class="alert-banner"><i class="fas fa-lightbulb"></i> ${d.b2 < 40 ? 'Prioridade: melhorar conclusão de tratamentos odontológicos.' : 'Boa resolutividade, manter ações.'} ${d.b4 < 15 ? ' Ampliar escovação supervisionada.' : ''}</div>
        <div class="chart-card"><div class="chart-title">Indicadores Odontológicos</div><canvas id="sbDetalheCanvas"></canvas></div>
        <div class="indicators-card"><div class="indicators-header">Detalhamento eSB</div><table class="indicators-table">
            <tr><th>B1</th><td>${d.b1}%</td><td>1ª Consulta Odontológica Programada</td></tr>
            <tr><th>B2</th><td>${d.b2}%</td><td>Tratamento Concluído</td></tr>
            <tr><th>B3</th><td>${d.b3}%</td><td>Taxa de Exodontia</td></tr>
            <tr><th>B4</th><td>${d.b4}%</td><td>Escovação Dental Supervisionada</td></tr>
            <tr><th>B5</th><td>${d.b5}%</td><td>Procedimentos Preventivos</td></tr>
            <tr><th>B6</th><td>${d.b6}%</td><td>Tratamento Restaurador Atraumático</td></tr>
        </table></div>
    `;
    document.getElementById("dynamicContent").innerHTML = html;
    if (sbChart) sbChart.destroy();
    const ctx = document.getElementById('sbDetalheCanvas')?.getContext('2d');
    if (ctx) {
        sbChart = new Chart(ctx, { type: 'bar', data: { labels: ['B1','B2','B3','B4','B5','B6'], datasets: [{ label: '%', data: [d.b1,d.b2,d.b3,d.b4,d.b5,d.b6], backgroundColor: '#1abc9c' }] }, options: { responsive: true } });
    }
}

function carregarEquipeEMulti(em) {
    document.getElementById("selectedTeamName").innerHTML = `<i class="fas fa-hand-holding-heart"></i> ${em.nome}`;
    document.getElementById("selectedTeamSubtitle").innerHTML = `eMulti - Cuidado Integral`;
    let html = `
        <div class="kpi-row">
            <div class="kpi-card"><div class="kpi-label">M1 - Média Atendimentos/Cidadão</div><div class="kpi-value">${em.m1}</div><div>${em.m1 >= 4 ? '✅ Meta atingida' : '⚠️ Abaixo'}</div></div>
            <div class="kpi-card"><div class="kpi-label">M2 - Ações Interprofissionais</div><div class="kpi-value">${em.m2}%</div><div>${em.m2 >= 10 ? '✅ Meta ≥10%' : '⚠️ Atenção'}</div></div>
        </div>
        <div class="indicators-card"><div class="indicators-header">📊 Indicadores eMulti</div><table class="indicators-table">
            <tr><th>M1</th><td>${em.m1}</th><th>Média de atendimentos por cidadão (meta ≥4)</th></tr>
            <tr><th>M2</th><td>${em.m2}%</th><th>Ações interprofissionais compartilhadas (meta ≥10%)</th></tr>
        <table></div>
        ${em.m2 < 12 ? '<div class="alert-banner"><i class="fas fa-chart-line"></i> Recomenda-se fortalecer matriciamento e ações conjuntas.</div>' : '<div class="alert-banner" style="background:#e0f2f1;">Excelente articulação interprofissional!</div>'}
    `;
    document.getElementById("dynamicContent").innerHTML = html;
    if (qualidadeChart) qualidadeChart.destroy();
    if (sbChart) sbChart.destroy();
}

function renderGraficos(q, sb) {
    const ctx1 = document.getElementById('qualidadeCanvas')?.getContext('2d');
    if (ctx1) {
        if (qualidadeChart) qualidadeChart.destroy();
        qualidadeChart = new Chart(ctx1, { type: 'bar', data: { labels: ['C1','C2','C3','C4','C5','C6','C7'], datasets: [{ label: '%', data: [q.c1,q.c2,q.c3,q.c4,q.c5,q.c6,q.c7], backgroundColor: '#2ecc71' }] }, options: { responsive: true, scales: { y: { max: 100 } } } });
    }
    const ctx2 = document.getElementById('sbCanvas')?.getContext('2d');
    if (ctx2) {
        if (sbChart) sbChart.destroy();
        sbChart = new Chart(ctx2, { type: 'line', data: { labels: ['B1','B2','B3','B4','B5','B6'], datasets: [{ label: 'Indicadores', data: [sb.b1,sb.b2,sb.b3,sb.b4,sb.b5,sb.b6], borderColor: '#e67e22', tension: 0.2 }] }, options: { responsive: true } });
    }
}

// Resumo Estratégico
function carregarResumo() {
    document.getElementById("selectedTeamName").innerHTML = '<i class="fas fa-chart-pie"></i> Resumo Estratégico';
    document.getElementById("selectedTeamSubtitle").innerHTML = 'Visão geral do município';
    let medias = { c1:0, c2:0, c3:0, c4:0, c5:0, c6:0, c7:0 };
    equipesAPS.forEach(n => { Object.keys(medias).forEach(k => medias[k] += qualidadeData[n][k]); });
    Object.keys(medias).forEach(k => medias[k] = (medias[k]/equipesAPS.length).toFixed(1));
    let otimos = equipesAPS.filter(n => vinculoData[n].classificacao === "ÓTIMO").length;
    let criticos = equipesAPS.filter(n => qualidadeData[n].c2 < 35 || qualidadeData[n].c1 < 45).length;
    let html = `
        <div class="kpi-row">
            <div class="kpi-card"><div class="kpi-label">Equipes ÓTIMAS</div><div class="kpi-value">${otimos}/10</div></div>
            <div class="kpi-card"><div class="kpi-label">Com Alerta Crítico</div><div class="kpi-value">${criticos}</div></div>
            <div class="kpi-card"><div class="kpi-label">Média C2 (Infantil)</div><div class="kpi-value">${medias.c2}%</div></div>
            <div class="kpi-card"><div class="kpi-label">Melhor C4 (Diabetes)</div><div class="kpi-value">${Math.max(...equipesAPS.map(n=>qualidadeData[n].c4))}%</div></div>
        </div>
        <div class="chart-card"><div class="chart-title">Médias Municipais por Indicador</div><canvas id="resumoCanvas"></canvas></div>
        <div class="indicators-card"><div class="indicators-header">⚠️ Equipes com Indicadores Críticos</div><table class="indicators-table"><tr><th>Equipe</th><th>Indicador</th><th>Valor</th></tr>
            ${equipesAPS.filter(n => qualidadeData[n].c2 < 35).map(n => `<tr><td>${n}</td><td>C2 - Desenvolvimento Infantil</td><td>${qualidadeData[n].c2}%</td></tr>`).join('')}
            ${equipesAPS.filter(n => qualidadeData[n].c1 < 45).map(n => `<tr><td>${n}</td><td>C1 - Mais Acesso</td><td>${qualidadeData[n].c1}%</td></tr>`).join('')}
        </table></div>
    `;
    document.getElementById("dynamicContent").innerHTML = html;
    const ctx = document.getElementById('resumoCanvas')?.getContext('2d');
    if (ctx) new Chart(ctx, { type: 'radar', data: { labels: ['Acesso','Infantil','Gestante','Diabetes','Hipertensão','Idoso','Mulher'], datasets: [{ label: 'Média %', data: Object.values(medias), backgroundColor: 'rgba(46,204,113,0.2)', borderColor: '#2ecc71' }] }, options: { responsive: true } });
}

// Comparativo
function carregarComparativo() {
    document.getElementById("selectedTeamName").innerHTML = '<i class="fas fa-chart-line"></i> Comparativo Geral';
    document.getElementById("selectedTeamSubtitle").innerHTML = 'Comparação entre equipes - C2 (Desenvolvimento Infantil)';
    let dados = equipesAPS.map(n => ({ nome: n.replace(' - PSF',''), valor: qualidadeData[n].c2 }));
    let html = `<div class="chart-card"><canvas id="comparativoCanvas"></canvas></div>`;
    document.getElementById("dynamicContent").innerHTML = html;
    const ctx = document.getElementById('comparativoCanvas')?.getContext('2d');
    if (ctx) new Chart(ctx, { type: 'bar', data: { labels: dados.map(d=>d.nome), datasets: [{ label: 'C2 - Desenvolvimento Infantil (%)', data: dados.map(d=>d.valor), backgroundColor: '#3498db' }] }, options: { responsive: true, scales: { y: { max: 100 } } } });
}

// Eventos e inicialização
document.getElementById('themeToggle')?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const span = document.querySelector('#themeToggle span');
    span.textContent = document.body.classList.contains('dark-mode') ? 'Modo Claro' : 'Modo Escuro';
});
document.getElementById('visaoSelect')?.addEventListener('change', (e) => {
    if (e.target.value === 'resumo') carregarResumo();
    else if (e.target.value === 'comparativo') carregarComparativo();
    else if (currentEquipe) carregarEquipeAPS(currentEquipe);
});
document.getElementById('btnExportPDF')?.addEventListener('click', () => {
    html2pdf().set({ margin: 0.5, filename: `relatorio_${new Date().toISOString().slice(0,19)}.pdf` }).from(document.getElementById('dynamicContent')).save();
});
document.getElementById('btnExportExcel')?.addEventListener('click', () => {
    const dados = equipesAPS.map(n => ({ Equipe: n, ...qualidadeData[n], ...vinculoData[n] }));
    XLSX.writeFile(XLSX.utils.book_new(), `saude_valenca.xlsx`);
    const ws = XLSX.utils.json_to_sheet(dados);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Desempenho');
    XLSX.writeFile(wb, `saude_valenca_${new Date().toISOString().slice(0,10)}.xlsx`);
});

renderMenu();