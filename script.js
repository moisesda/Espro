document.addEventListener("DOMContentLoaded", () => {
    // 1. Data em tempo real
    const dateElement = document.getElementById("current-date");
    if (dateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        dateElement.textContent = today.toLocaleDateString('pt-BR', options).replace(/^./, str => str.toUpperCase());
    }


    // 2. Navegação por categorias (Funcional)
    const navButtons = document.querySelectorAll(".nav-btn");
    const sectionTitle = document.querySelector(".section-title");
    navButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            navButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            const page = button.getAttribute("data-page");
            if(page === "home") {
                sectionTitle.textContent = "Últimas do Rolê";
            } else {
                sectionTitle.textContent = `Notícias sobre: ${button.textContent}`;
            }
        });
    });


    // 3. Barra de Pesquisa Funcional
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");


    function executeSearch() {
        const query = searchInput.value.trim();
        if (query !== "") {
            openModal(`Resultados para "${query}"`, `<p>Foram encontradas 3 matérias recentes relacionadas à sua busca por <strong>${query}</strong> no portal Conexão Jovem.</p>`);
            searchInput.value = "";
        }
    }
    searchBtn.addEventListener("click", executeSearch);
    searchInput.addEventListener("keypress", (e) => { if (e.key === 'Enter') executeSearch(); });


    // 4. Base de dados de notícias
    const newsData = {
        "1": { title: "O Fenômeno do Trap Nacional", category: "MÚSICA", text: "O trap brasileiro vive sua fase mais criativa..." },
        "2": { title: "Stranger Things e o Legado da Cultura Pop", category: "SÉRIES", text: "Com o encerramento da série..." },
        "3": { title: "GTA VI e as Redes Sociais", category: "GAMES", text: "A Rockstar Games prepara um sistema dinâmico..." },
        "4": { title: "Aesthetics de 2014 Estão de Volta", category: "CULTURA POP", text: "Tumblr grunge e a nostalgia da Geração Z..." },
        "5": { title: "Festivais de Verão 2026", category: "MÚSICA", text: "A temporada de shows ao ar livre trará experiências..." },
        "6": { title: "Filmes Independentes no Letterboxd", category: "CINEMA", text: "Longe das grandes bilheterias..." },
        "7": { title: "Streetwear Sustentável", category: "MODA & ARTE", text: "O garimpo e o reaproveitamento de tecidos..." }
    };


    const modal = document.getElementById("news-modal");
    const modalBody = document.getElementById("modal-body-content");
    const closeModal = document.querySelector(".close-modal");


    function openModal(title, content) {
        modalBody.innerHTML = `<div class="modal-body"><h2>${title}</h2>${content}</div>`;
        modal.style.display = "flex";
    }


    document.querySelectorAll(".news-trigger").forEach(trigger => {
        trigger.addEventListener("click", () => {
            const data = newsData[trigger.getAttribute("data-id")];
            if (data) openModal(data.title, `<span class="badge">${data.category}</span><p>${data.text}</p>`);
        });
    });


    closeModal.addEventListener("click", () => modal.style.display = "none");


    // 5. Botões Institucionais Reais (Dando sentido aos botões vazios)
    const institutionalData = {
        "quem-somos": {
            title: "Quem Somos - Conexão Jovem",
            text: "O **Conexão Jovem** nasceu em 2024 com uma missão clara: traduzir o entretenimento, a cultura pop e o estilo de vida da Geração Z sem filtros e com muita autenticidade. Somos um jornal digital multiplataforma feito por redatores jovens que vivem o que escrevem."
        },
        "trabalhe": {
            title: "Trabalhe Conosco",
            text: "Quer fazer parte da redação mais conectada do país? Estamos sempre em busca de talentos para as áreas de Criação de Conteúdo, Social Media, Desenvolvimento Web e Produção de Vídeo. Envie seu portfólio para **carreiras@conexaojovem.com.br**."
        },
        "privacidade": {
            title: "Política de Privacidade",
            text: "O Conexão Jovem preza pela transparência e segurança de dados dos nossos leitores, em total conformidade com a LGPD. Coletamos apenas dados essenciais para melhorar sua experiência de navegação em nosso portal."
        }
    };


    document.querySelectorAll(".footer-link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const info = institutionalData[link.getAttribute("data-info")];
            if(info) openModal(info.title, `<p>${info.text}</p>`);
        });
    });


    // 6. Sistema da Intranet por Setores (TI, RH, Gestão, Marketing, Produção)
    const intranetModal = document.getElementById("intranet-modal");
    const intranetBtn = document.getElementById("intranet-access-btn");
    const closeIntranet = document.querySelector(".close-intranet");
    const sectorDashboard = document.getElementById("sector-dashboard");


    intranetBtn.addEventListener("click", () => intranetModal.style.display = "flex");
    closeIntranet.addEventListener("click", () => intranetModal.style.display = "none");


    const sectorContent = {
        "ti": "<h3>Painel de TI</h3><p>• Status dos Servidores: <strong>100% Online</strong><br>• Chamados abertos: 4 pendentes<br>• Acesso rápido: <a href='#'>Repositório GitHub corporativo</a> | <a href='#'>Painel Cloud</a></p>",
        "rh": "<h3>Painel de Recursos Humanos (RH)</h3><p>• Gestão de Férias e Benefícios<br>• Banco de Horas dos Colaboradores<br>• Enviar Avaliação de Desempenho Trimestral<br>• Vagas Internas Abertas</p>",
        "gestao": "<h3>Painel de Gestão e Diretoria</h3><p>• Metas de Audiência Q3: <strong>Em andamento (82%)</strong><br>• Relatório Financeiro Consolidado<br>• Aprovação de Orçamentos para Campanhas</p>",
        "marketing": "<h3>Painel de Marketing</h3><p>• Cronograma de Publicações no Instagram e TikTok<br>• Métricas de Engajamento em Tempo Real<br>• Biblioteca de Assets Visuais e Branding</p>",
        "producao": "<h3>Painel de Produção de Conteúdo</h3><p>• Pauta do dia aprovada<br>• Agendamento de Estúdios e Equipamentos de Gravação<br>• Status de Edição dos Podcasts e Vídeos Curtos</p>"
    };


    document.querySelectorAll(".sector-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".sector-btn").forEach(b => b.classList.remove("active-sector"));
            btn.classList.add("active-sector");
            const sector = btn.getAttribute("data-sector");
            sectorDashboard.innerHTML = sectorContent[sector];
            sectorDashboard.classList.remove("hidden");
        });
    });


    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
        if (e.target === intranetModal) intranetModal.style.display = "none";
    });
});


// 6. Sistema Avançado da Intranet (Login + Dados Sensíveis por Setor)
const intranetModal = document.getElementById("intranet-modal");
const intranetBtn = document.getElementById("intranet-access-btn");
const closeIntranet = document.querySelector(".close-intranet");


const loginView = document.getElementById("intranet-login-view");
const dashboardView = document.getElementById("intranet-dashboard-view");
const loginForm = document.getElementById("intranet-login-form");
const loginError = document.getElementById("login-error");
const logoutBtn = document.getElementById("logout-btn");


const userEmailDisplay = document.getElementById("user-email-display");
const userSectorTitle = document.getElementById("user-sector-title");
const sectorDashboardContent = document.getElementById("sector-dashboard-content");


// Base de dados restrita e sensível por setor
const sectorSensitiveData = {
    "ti": {
        title: "Tecnologia & Sistemas (TI)",
        content: `
            <h3><i class="fas fa-shield-alt"></i> Relatório Confidencial de Infraestrutura</h3>
            <p>• <strong>Status dos Servidores Principais:</strong> 100% Online (AWS Cluster SP)<br>
            • <strong>Incidentes Críticos da Semana:</strong> Zero vazamentos de dados detectados.<br>
            • <strong>Credenciais Mestra / Chaves API:</strong> <a href="#" style="color:var(--accent-pink);">[Baixar Chaves Criptografadas do Servidor Staging]</a><br>
            • <strong>Chamados Pendentes:</strong> 4 solicitações de acesso administrativo aguardando aprovação do CTO.</p>
        `
    },
    "rh": {
        title: "Recursos Humanos (RH)",
        content: `
            <h3><i class="fas fa-users-cog"></i> Gestão Interna & Informações Confidenciais</h3>
            <p>• <strong>Folha Salarial e Benefícios Q3:</strong> Processada e auditada pelo setor financeiro.<br>
            • <strong>Banco de Horas Crítico:</strong> 3 colaboradores excederam o limite de horas extras semanais (alerta enviado aos gestores).<br>
            • <strong>Avaliação de Desempenho:</strong> Ciclo trimestral aberto até o dia 20.<br>
            • <strong>Processos Seletivos Confidenciais:</strong> Vaga aberta para Diretor(a) de Redação Sênior.</p>
        `
    },
    "gestao": {
        title: "Gestão & Diretoria Executiva",
        content: `
            <h3><i class="fas fa-chart-pie"></i> Painel Estratégico & Dados Financeiros (Restrito)</h3>
            <p>• <strong>Faturamento Bruto Mensal:</strong> R$ 142.500,00 (Meta batida em 108% no segmento jovem).<br>
            • <strong>Projeção de Investimento Q4:</strong> Expansão de estúdios de podcast aprovada pelo conselho.<br>
            • <strong>Relatório de Audiência:</strong> 2.4 milhões de uniques views mensais no portal.<br>
            • <strong>Contratos com Marcas Patrocinadoras:</strong> Documentos de NDA disponíveis para consulta jurídica.</p>
        `
    },
    "marketing": {
        title: "Marketing & Growth",
        content: `
            <h3><i class="fas fa-bullhorn"></i> Planejamento de Campanhas & Métricas Sigilosas</h3>
            <p>• <strong>Campanha Oculta de Lançamento:</strong> "Projeto Z" agendado para o dia 01/09 (Não divulgar fora da equipe).<br>
            • <strong>Custo de Aquisição por Leitor (CAC):</strong> Reduzido em 14% este mês.<br>
            • <strong>Parcerias com Influenciadores:</strong> Lista com contatos diretos e valores de cachê pré-negociados no servidor interno.</p>
        `
    },
    "producao": {
        title: "Produção de Conteúdo & Redação",
        content: `
            <h3><i class="fas fa-video"></i> Pautas Exclusivas & Cronograma de Furos</h3>
            <p>• <strong>Furos de Reportagem (Embargo):</strong> Matéria sobre o festival secreto de música urbana programada para soltar amanhã às 08h.<br>
            • <strong>Reserva de Equipamentos:</strong> Câmeras 4K e kits de áudio alocados para cobertura externa no fim de semana.<br>
            • <strong>Diretrizes Editoriais da Geração Z:</strong> Evitar termos corporativos ultrapassados; manter linguagem nativa das redes sociais.</p>
        `
    }
};


// Abrir modal da intranet
intranetBtn.addEventListener("click", () => {
    intranetModal.style.display = "flex";
});


// Fechar modal
closeIntranet.addEventListener("click", () => {
    intranetModal.style.display = "none";
});


// Manipular envio do formulário de login
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("employee-email").value.trim();
    const pass = document.getElementById("employee-pass").value.trim();
    const sector = document.getElementById("employee-sector").value;


    // Simulação de validação corporativa simples (exige e-mail contendo @ e setor preenchido)
    if (email && pass.length >= 4 && sector) {
        loginError.classList.add("hidden");
       
        // Configurar dados personalizados do painel
        userEmailDisplay.textContent = email;
        userSectorTitle.textContent = sectorSensitiveData[sector].title;
        sectorDashboardContent.innerHTML = sectorSensitiveData[sector].content;


        // Alternar visualização do modal para o dashboard interno
        loginView.classList.add("hidden");
        dashboardView.classList.remove("hidden");
        loginForm.reset();
    } else {
        loginError.classList.remove("hidden");
    }
});


// Botão de Logout
logoutBtn.addEventListener("click", () => {
    dashboardView.classList.add("hidden");
    loginView.classList.remove("hidden");
});

