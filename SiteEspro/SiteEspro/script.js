document.addEventListener("DOMContentLoaded", () => {

    // =========================================================
    // 1. DATA ATUAL
    // =========================================================

    const dateElement = document.getElementById("current-date");

    if (dateElement) {
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        };

        const today = new Date();

        dateElement.textContent = today
            .toLocaleDateString("pt-BR", options)
            .replace(/^./, str => str.toUpperCase());
    }


    // =========================================================
    // 2. NAVEGAÇÃO POR CATEGORIAS
    // =========================================================

    const navButtons = document.querySelectorAll(".nav-btn");
    const sectionTitle = document.querySelector(".section-title");

    navButtons.forEach(button => {
        button.addEventListener("click", event => {
            event.preventDefault();

            navButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const page = button.getAttribute("data-page");

            if (!sectionTitle) return;

            if (page === "home") {
                sectionTitle.textContent = "Últimas do Rolê";
            } else {
                sectionTitle.textContent =
                    `Notícias sobre: ${button.textContent.trim()}`;
            }
        });
    });


    // =========================================================
    // 3. PESQUISA
    // =========================================================

    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");

    function executeSearch() {
        if (!searchInput) return;

        const query = searchInput.value.trim();

        if (query === "") return;

        openModal(
            `Resultados para "${escapeHTML(query)}"`,
            `<p>
                Foram encontradas 3 matérias recentes relacionadas à sua busca
                por <strong>${escapeHTML(query)}</strong> no portal Conexão Jovem.
            </p>`
        );

        searchInput.value = "";
    }

    if (searchBtn) {
        searchBtn.addEventListener("click", executeSearch);
    }

    if (searchInput) {
        searchInput.addEventListener("keypress", event => {
            if (event.key === "Enter") {
                executeSearch();
            }
        });
    }


    // =========================================================
    // 4. BASE DE NOTÍCIAS
    // =========================================================

    const newsData = {
        "1": {
            title: "O Fenômeno do Trap Nacional",
            category: "MÚSICA",
            text: "O trap brasileiro vive sua fase mais criativa..."
        },

        "2": {
            title: "Stranger Things e o Legado da Cultura Pop",
            category: "SÉRIES",
            text: "Com o encerramento da série..."
        },

        "3": {
            title: "GTA VI e as Redes Sociais",
            category: "GAMES",
            text: "A Rockstar Games prepara um sistema dinâmico..."
        },

        "4": {
            title: "Aesthetics de 2014 Estão de Volta",
            category: "CULTURA POP",
            text: "Tumblr grunge e a nostalgia da Geração Z..."
        },

        "5": {
            title: "Festivais de Verão 2026",
            category: "MÚSICA",
            text: "A temporada de shows ao ar livre trará experiências..."
        },

        "6": {
            title: "Filmes Independentes no Letterboxd",
            category: "CINEMA",
            text: "Longe das grandes bilheterias..."
        },

        "7": {
            title: "Streetwear Sustentável",
            category: "MODA & ARTE",
            text: "O garimpo e o reaproveitamento de tecidos..."
        }
    };


    // =========================================================
    // 5. MODAL PRINCIPAL
    // =========================================================

    const modal = document.getElementById("news-modal");
    const modalBody = document.getElementById("modal-body-content");
    const closeModal = document.querySelector(".close-modal");

    function openModal(title, content) {
        if (!modal || !modalBody) return;

        modalBody.innerHTML = `
            <div class="modal-body">
                <h2>${title}</h2>
                ${content}
            </div>
        `;

        modal.style.display = "flex";
    }

    document.querySelectorAll(".news-trigger").forEach(trigger => {
        trigger.addEventListener("click", () => {

            const id = trigger.getAttribute("data-id");
            const data = newsData[id];

            if (!data) return;

            openModal(
                data.title,
                `
                    <span class="badge">${data.category}</span>
                    <p>${data.text}</p>
                `
            );
        });
    });

    if (closeModal) {
        closeModal.addEventListener("click", () => {
            if (modal) {
                modal.style.display = "none";
            }
        });
    }


    // =========================================================
    // 6. PÁGINAS INSTITUCIONAIS
    // =========================================================

    const institutionalData = {

        "quem-somos": {
            title: "Quem Somos - Conexão Jovem",
            text: `
                O <strong>Conexão Jovem</strong> nasceu em 2024 com uma missão clara:
                traduzir o entretenimento, a cultura pop e o estilo de vida da
                Geração Z sem filtros e com muita autenticidade.
                Somos um jornal digital multiplataforma feito por redatores jovens
                que vivem o que escrevem.
            `
        },

        "trabalhe": {
            title: "Trabalhe Conosco",
            text: `
                Quer fazer parte da redação mais conectada do país?
                Estamos sempre em busca de talentos para as áreas de
                Criação de Conteúdo, Social Media, Desenvolvimento Web e
                Produção de Vídeo.

                Envie seu portfólio para
                <strong>carreiras@conexaojovem.com.br</strong>.
            `
        },

        "privacidade": {
            title: "Política de Privacidade",
            text: `
                O Conexão Jovem preza pela transparência e segurança de dados
                dos nossos leitores, em total conformidade com a LGPD.
                Coletamos apenas dados essenciais para melhorar sua experiência
                de navegação em nosso portal.
            `
        }
    };

    document.querySelectorAll(".footer-link").forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            const info =
                institutionalData[link.getAttribute("data-info")];

            if (!info) return;

            openModal(
                info.title,
                `<p>${info.text}</p>`
            );
        });
    });


    // =========================================================
    // 7. INTRANET - ELEMENTOS
    // =========================================================

    const intranetModal =
        document.getElementById("intranet-modal");

    const intranetBtn =
        document.getElementById("intranet-access-btn");

    const closeIntranet =
        document.querySelector(".close-intranet");

    const loginView =
        document.getElementById("intranet-login-view");

    const dashboardView =
        document.getElementById("intranet-dashboard-view");

    const loginForm =
        document.getElementById("intranet-login-form");

    const loginError =
        document.getElementById("login-error");

    const logoutBtn =
        document.getElementById("logout-btn");

    const userEmailDisplay =
        document.getElementById("user-email-display");

    const userSectorTitle =
        document.getElementById("user-sector-title");

    const sectorDashboardContent =
        document.getElementById("sector-dashboard-content");


    // =========================================================
    // 8. USUÁRIOS DA INTRANET
    // =========================================================
    // O setor é identificado automaticamente pelo e-mail.

    const users = {

        "conexaojovemti@gmail.com": {
            password: "Rayane",
            sector: "ti"
        },

        "conexaojovemrh@gmail.com": {
            password: "Michelle",
            sector: "rh"
        },

        "conexaojovemgestao@gmail.com": {
            password: "CArlosLarissa",
            sector: "gestao"
        },

        "conexaojovemmkt@gmail.com": {
            password: "Isis",
            sector: "marketing"
        },

        "conexaojovemprod@gmail.com": {
            password: "Samuel",
            sector: "producao"
        }
    };


    // =========================================================
    // 9. DADOS DA INTRANET POR SETOR
    // =========================================================

    const sectorSensitiveData = {

        ti: {
            title: "Tecnologia & Sistemas (TI)",

            content: `
                <h3>
                    <i class="fas fa-shield-alt"></i>
                    Relatório de Infraestrutura
                </h3>

                <p>
                    • <strong>Status dos Servidores:</strong>
                    100% Online<br>

                    • <strong>Incidentes Críticos:</strong>
                    Zero incidentes registrados.<br>

                    • <strong>Chamados Pendentes:</strong>
                    4 solicitações aguardando aprovação.
                </p>
            `
        },


        rh: {
            title: "Recursos Humanos (RH)",

            content: `
                <h3>
                    <i class="fas fa-users-cog"></i>
                    Gestão Interna
                </h3>

                <p>
                    • <strong>Folha Salarial:</strong>
                    Processada e auditada.<br>

                    • <strong>Banco de Horas:</strong>
                    3 alertas registrados.<br>

                    • <strong>Avaliação de Desempenho:</strong>
                    Ciclo trimestral aberto.
                </p>
            `
        },


        gestao: {
            title: "Gestão & Diretoria Executiva",

            content: `
                <h3>
                    <i class="fas fa-chart-pie"></i>
                    Painel Estratégico
                </h3>

                <p>
                    • <strong>Meta de Audiência:</strong>
                    82% concluída.<br>

                    • <strong>Investimentos:</strong>
                    Expansão dos estúdios aprovada.<br>

                    • <strong>Audiência:</strong>
                    Dados disponíveis para consulta.
                </p>
            `
        },


        marketing: {
            title: "Marketing & Growth",

            content: `
                <h3>
                    <i class="fas fa-bullhorn"></i>
                    Planejamento de Marketing
                </h3>

                <p>
                    • <strong>Campanhas:</strong>
                    Cronograma atualizado.<br>

                    • <strong>CAC:</strong>
                    Redução registrada no período.<br>

                    • <strong>Parcerias:</strong>
                    Dados disponíveis no sistema interno.
                </p>
            `
        },


        producao: {
            title: "Produção de Conteúdo & Redação",

            content: `
                <h3>
                    <i class="fas fa-video"></i>
                    Produção Editorial
                </h3>

                <p>
                    • <strong>Pauta do dia:</strong>
                    Aprovada.<br>

                    • <strong>Equipamentos:</strong>
                    Reservados para cobertura externa.<br>

                    • <strong>Vídeos:</strong>
                    Edição em andamento.
                </p>
            `
        }
    };


    // =========================================================
    // 10. ABRIR / FECHAR INTRANET
    // =========================================================

    if (intranetBtn && intranetModal) {

        intranetBtn.addEventListener("click", () => {
            intranetModal.style.display = "flex";
        });
    }

    if (closeIntranet && intranetModal) {

        closeIntranet.addEventListener("click", () => {
            intranetModal.style.display = "none";
        });
    }


    // =========================================================
    // 11. LOGIN DA INTRANET
    // =========================================================

    if (loginForm) {
        loginForm.addEventListener("submit", event => {
            event.preventDefault();

            // código do login...

        });
    }

    const email = document
        .getElementById("employee-email")
        ?.value
        .trim()
        .toLowerCase();

    const password = document
        .getElementById("employee-pass")
        ?.value
        .trim();


    // Procura o usuário pelo e-mail
    const user = users[email];


    // Verifica se o usuário existe
    if (!user) {

        loginError?.classList.remove("hidden");

        return;
    }


    // Verifica a senha
    if (user.password !== password) {

        loginError?.classList.remove("hidden");

        return;
    }


    // Verifica se o setor existe
    const sector = user.sector;

    if (!sectorSensitiveData[sector]) {

        loginError?.classList.remove("hidden");

        return;
    }


    // Login correto
    loginError?.classList.add("hidden");


    // Mostra o e-mail
    if (userEmailDisplay) {

        userEmailDisplay.textContent = email;
    }


    // Mostra o setor
    if (userSectorTitle) {

        userSectorTitle.textContent =
            sectorSensitiveData[sector].title;
    }


    // Carrega o painel do setor
    if (sectorDashboardContent) {

        sectorDashboardContent.innerHTML =
            sectorSensitiveData[sector].content;
    }


    // Troca login pelo dashboard
    loginView?.classList.add("hidden");

    dashboardView?.classList.remove("hidden");


    // Limpa o formulário
    loginForm.reset();
});


// =========================================================
// 12. LOGOUT
// =========================================================

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        dashboardView?.classList.add("hidden");

        loginView?.classList.remove("hidden");

        // Limpa as informações do usuário
        if (userEmailDisplay) {
            userEmailDisplay.textContent = "";
        }

        if (userSectorTitle) {
            userSectorTitle.textContent = "";
        }

        if (sectorDashboardContent) {
            sectorDashboardContent.innerHTML = "";
        }
    });
}


// =========================================================
// 13. FECHAR MODAIS AO CLICAR FORA
// =========================================================

window.addEventListener("click", event => {

    if (event.target === modal) {

        modal.style.display = "none";
    }

    if (event.target === intranetModal) {

        intranetModal.style.display = "none";
    }
});


// =========================================================
// 14. PROTEÇÃO BÁSICA DA PESQUISA
// =========================================================

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

