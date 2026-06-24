// ============================================
// SCRIPT PRINCIPAL - DASHBOARD MODERNO
// ============================================

let currentPage = 'inicio';
let charts = {};

function getClassificacaoClass(classif) {
    if (classif === "ÓTIMO") return "otimo";
    if (classif === "BOM") return "bom";
    if (classif === "SUFICIENTE") return "suficiente";
    return "regular";
}

// ============================================
// NAVEGAÇÃO
// ============================================

function navigateTo(page) {
    currentPage = page;

    document.querySelectorAll('.nav-menu a[data-page]').forEach(link => {
        link.classList.toggle('active', link.dataset.page === page);
    });

    document.querySelectorAll('.page').forEach(el => {
        el.classList.remove('active');
    });

    const pageMap = {
        'inicio': 'pageInicio',
        'esf': 'pageESF',
        'esb': 'pageESB',
        'emulti': 'pageEMulti'
    };

    const target = document.getElementById(pageMap[page]);
    if (target) target.classList.add('active');

    if (page === 'inicio') renderInicio();
    else if (page === 'esf') renderESF();
    else if (page === 'esb') renderESB();
    else if (page === 'emulti') renderEMulti();

    renderHeroStats(page);
}

// ============================================
// HERO STATS
// ============================================

function renderHeroStats(page) {
    let stats = [];

    if (page === 'inicio') {
        const otimos = ESF.filter(e => e.classificacao === "ÓTIMO").length;
        const bom = ESF.filter(e => e.classificacao === "BOM").length;
        const total = ESF.length;

        stats = [
            { number: total, label: "Equipes eSF", sub: "Estratégia Saúde da Família", icon: "fa-users", iconClass: "blue" },
            { number: otimos, label: "Classificação ÓTIMO", sub: "Melhor desempenho", icon: "fa-trophy", iconClass: "purple" },
            { number: bom, label: "Classificação BOM", sub: "Bom desempenho", icon: "fa-thumbs-up", iconClass: "green" },
            { number: ESB.length + EMULTI.length, label: "eSB + eMulti", sub: "Saúde Bucal + Multiprofissional", icon: "fa-hospital", iconClass: "blue" }
        ];
    } else if (page === 'esf') {
        const otimos = ESF.filter(e => e.classificacao === "ÓTIMO").length;
        const bom = ESF.filter(e => e.classificacao === "BOM").length;

        stats = [
            { number: ESF.length, label: "Equipes eSF", sub: "Estratégia Saúde da Família", icon: "fa-users", iconClass: "blue" },
            { number: otimos, label: "Classificação ÓTIMO", sub: "Melhor desempenho", icon: "fa-trophy", iconClass: "purple" },
            { number: bom, label: "Classificação BOM", sub: "Bom desempenho", icon: "fa-thumbs-up", iconClass: "green" },
            { number: ESF.filter(e => e.classificacao === "ÓTIMO" || e.classificacao === "BOM").length, label: "ÓTIMO + BOM", sub: "Bom desempenho geral", icon: "fa-check-circle", iconClass: "blue" }
        ];
    } else if (page === 'esb') {
        const otimos = ESB.filter(e => e.classificacao === "ÓTIMO").length;
        const bom = ESB.filter(e => e.classificacao === "BOM").length;
        const suficiente = ESB.filter(e => e.classificacao === "SUFICIENTE").length;

        stats = [
            { number: ESB.length, label: "Equipes eSB", sub: "Saúde Bucal", icon: "fa-tooth", iconClass: "blue" },
            { number: otimos, label: "Classificação ÓTIMO", sub: "Melhor desempenho", icon: "fa-trophy", iconClass: "purple" },
            { number: bom, label: "Classificação BOM", sub: "Bom desempenho", icon: "fa-thumbs-up", iconClass: "green" },
            { number: suficiente, label: "Classificação SUFICIENTE", sub: "Atenção necessária", icon: "fa-exclamation-triangle", iconClass: "yellow" }
        ];
    } else if (page === 'emulti') {
        stats = [
            { number: EMULTI.length, label: "Equipes eMulti", sub: "Multiprofissional", icon: "fa-users", iconClass: "blue" },
            { number: EMULTI.filter(e => e.classificacao === "ÓTIMO").length, label: "Classificação ÓTIMO", sub: "Melhor desempenho", icon: "fa-trophy", iconClass: "purple" },
            { number: EMULTI.length, label: "Total de equipes", sub: "Todas com ÓTIMO", icon: "fa-check-circle", iconClass: "green" }
        ];
    }

    document.getElementById('heroStats').innerHTML = stats.map(s => `
        <div class="stat-card">
            <div class="stat-icon ${s.iconClass}"><i class="fas ${s.icon}"></i></div>
            <div class="stat-number">${s.number}</div>
            <div class="stat-label">${s.label}</div>
        </div>
    `).join('');
}

// ============================================
// RENDER INÍCIO - TOP 3 POR NOTA
// ============================================

function renderInicio() {
    const container = document.getElementById('pageInicio');

    // Ordenar por nota (decrescente) e pegar top 3
    const ranking = [...ESF].sort((a, b) => b.nota - a.nota);
    const top3 = ranking.slice(0, 3);

    const medalhas = ['🥇', '🥈', '🥉'];
    const classes = ['ouro', 'prata', 'bronze'];

    let destaqueHtml = `
        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:16px; margin-bottom:28px;">
            ${top3.map((eq, idx) => {
                const cls = getClassificacaoClass(eq.classificacao);
                const medal = medalhas[idx];
                const cor = idx === 0 ? '#F7B731' : (idx === 1 ? '#A0A0A0' : '#CD7F32');
                return `
                    <div style="background:white; border-radius:16px; padding:20px; text-align:center; border-top:4px solid ${cor}; box-shadow: var(--shadow-sm);">
                        <div style="font-size:2.5rem;">${medal}</div>
                        <div style="font-weight:700; font-size:1rem; margin:8px 0;">${eq.nome.replace('PS ', '').replace(' - PSF', '')}</div>
                        <div style="font-size:1.8rem; font-weight:800; color:${cor};">${eq.nota}</div>
                        <div style="margin-top:6px;"><span class="equipe-classificacao ${cls}">${eq.classificacao}</span></div>
                    </div>
                `;
            }).join('')}
        </div>
    `;

    // Lista completa
    const listaEquipes = ranking;

    let listaHtml = `
        <div class="card-moderno">
            <div class="card-header">
                <h3><i class="fas fa-list"></i> Todas as Equipes eSF</h3>
                <span class="badge-count">${listaEquipes.length} equipes</span>
            </div>
            <div class="card-body">
                ${listaEquipes.map(eq => {
                    const cls = getClassificacaoClass(eq.classificacao);
                    return `
                        <div class="equipe-item-moderno">
                            <span class="equipe-nome">${eq.nome}</span>
                            <div style="display:flex; align-items:center; gap:12px;">
                                <span style="font-weight:600; color:var(--text-secondary); font-size:0.8rem;">${eq.nota}</span>
                                <span class="equipe-classificacao ${cls}">${eq.classificacao}</span>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;

    let chartHtml = `
        <div class="chart-container">
            <div class="chart-title"><i class="fas fa-chart-bar"></i> Nota Final por Equipe</div>
            <canvas id="chartNotas" style="height: 260px; width: 100%;"></canvas>
        </div>
    `;

    container.innerHTML = destaqueHtml + listaHtml + chartHtml;

    renderGraficoNotas();
}

// ============================================
// GRÁFICO DE NOTAS
// ============================================

function renderGraficoNotas() {
    const ctx = document.getElementById('chartNotas');
    if (ctx) {
        const ranking = [...ESF].sort((a, b) => b.nota - a.nota);
        const cores = ranking.map(e => e.classificacao === "ÓTIMO" ? "#2D7FF9" : "#1DB954");

        if (charts.notas) charts.notas.destroy();
        charts.notas = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ranking.map(e => e.nome.replace('PS ', '').replace(' - PSF', '').replace(' SAUDE D FAMILIA', '')),
                datasets: [{
                    label: 'Nota Final',
                    data: ranking.map(e => e.nota),
                    backgroundColor: cores,
                    borderRadius: 8,
                    barPercentage: 0.6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: { max: 10, beginAtZero: true, title: { display: true, text: 'Nota', font: { size: 11 } } },
                    x: { ticks: { font: { size: 9 } } }
                },
                plugins: { legend: { display: false } }
            }
        });
    }
}

// ============================================
// RENDER ESF, ESB, EMULTI (mantidos iguais)
// ============================================

function renderESF() {
    const container = document.getElementById('pageESF');

    container.innerHTML = `
        <div class="card-moderno">
            <div class="card-header">
                <h3><i class="fas fa-users"></i> Equipes eSF</h3>
                <span class="badge-count">${ESF.length} equipes</span>
            </div>
            <div class="card-body">
                ${ESF.map(eq => {
                    const indicadores = ESF_INDICADORES[eq.nome];
                    const cls = getClassificacaoClass(eq.classificacao);
                    return `
                        <div style="margin-bottom: 24px; border-bottom: 1px solid var(--border-color); padding-bottom: 16px;">
                            <div class="equipe-item-moderno" style="cursor:default; border-bottom: none; padding: 8px 0;">
                                <span class="equipe-nome" style="font-size:0.9rem;">${eq.nome}</span>
                                <div style="display:flex; align-items:center; gap:12px;">
                                    <span style="font-weight:600; color:var(--text-secondary); font-size:0.8rem;">${eq.nota}</span>
                                    <span class="equipe-classificacao ${cls}">${eq.classificacao}</span>
                                </div>
                            </div>
                            <div class="indicadores-grid">
                                ${indicadores ? Object.entries(indicadores).map(([key, data]) => {
                                    const clsInd = getClassificacaoClass(data.classificacao);
                                    return `
                                        <div class="indicador-item">
                                            <span class="indicador-nome">${key.toUpperCase()}</span>
                                            <span class="indicador-classificacao ${clsInd}">${data.classificacao}</span>
                                        </div>
                                    `;
                                }).join('') : ''}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

function renderESB() {
    const container = document.getElementById('pageESB');

    container.innerHTML = `
        <div class="card-moderno">
            <div class="card-header">
                <h3><i class="fas fa-tooth"></i> Equipes eSB</h3>
                <span class="badge-count">${ESB.length} equipes</span>
            </div>
            <div class="card-body">
                ${ESB.map(eq => {
                    const indicadores = ESB_INDICADORES[eq.nome];
                    const cls = getClassificacaoClass(eq.classificacao);
                    return `
                        <div style="margin-bottom: 24px; border-bottom: 1px solid var(--border-color); padding-bottom: 16px;">
                            <div class="equipe-item-moderno" style="cursor:default; border-bottom: none; padding: 8px 0;">
                                <span class="equipe-nome" style="font-size:0.9rem;">${eq.nome}</span>
                                <div style="display:flex; align-items:center; gap:12px;">
                                    <span style="font-weight:600; color:var(--text-secondary); font-size:0.8rem;">${eq.nota}</span>
                                    <span class="equipe-classificacao ${cls}">${eq.classificacao}</span>
                                </div>
                            </div>
                            <div class="indicadores-grid">
                                ${indicadores ? Object.entries(indicadores).map(([key, data]) => {
                                    const clsInd = getClassificacaoClass(data.classificacao);
                                    return `
                                        <div class="indicador-item">
                                            <span class="indicador-nome">${key.toUpperCase()}</span>
                                            <span class="indicador-classificacao ${clsInd}">${data.classificacao}</span>
                                        </div>
                                    `;
                                }).join('') : ''}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

function renderEMulti() {
    const container = document.getElementById('pageEMulti');

    container.innerHTML = `
        <div class="card-moderno">
            <div class="card-header">
                <h3><i class="fas fa-hand-holding-heart"></i> Equipes eMulti</h3>
                <span class="badge-count">${EMULTI.length} equipes</span>
            </div>
            <div class="card-body">
                ${EMULTI.map(eq => {
                    const indicadores = EMULTI_INDICADORES[eq.nome];
                    const cls = getClassificacaoClass(eq.classificacao);
                    return `
                        <div style="margin-bottom: 24px; border-bottom: 1px solid var(--border-color); padding-bottom: 16px;">
                            <div class="equipe-item-moderno" style="cursor:default; border-bottom: none; padding: 8px 0;">
                                <span class="equipe-nome" style="font-size:0.9rem;">${eq.nome}</span>
                                <div style="display:flex; align-items:center; gap:12px;">
                                    <span style="font-weight:600; color:var(--text-secondary); font-size:0.8rem;">${eq.nota}</span>
                                    <span class="equipe-classificacao ${cls}">${eq.classificacao}</span>
                                </div>
                            </div>
                            <div class="indicadores-grid">
                                ${indicadores ? Object.entries(indicadores).map(([key, data]) => {
                                    const clsInd = getClassificacaoClass(data.classificacao);
                                    return `
                                        <div class="indicador-item">
                                            <span class="indicador-nome">${key.toUpperCase()}</span>
                                            <span class="indicador-classificacao ${clsInd}">${data.classificacao}</span>
                                        </div>
                                    `;
                                }).join('') : ''}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

// ============================================
// EVENTOS DE NAVEGAÇÃO
// ============================================

document.querySelectorAll('.nav-menu a[data-page]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo(link.dataset.page);
    });
});

// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    navigateTo('inicio');
});