// js/navigation.js
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const menuLinks = document.querySelectorAll('#main-menu a:not(.special-action-link)');
        const contentSections = document.querySelectorAll('.content-section');
        const bodyElement = document.body;
        let activeMenuLink = null;
        const logoutButton = document.getElementById('logout-button');

        function setInitialViewState() {
            bodyElement.classList.add('initial-view');
            if (activeMenuLink) {
                activeMenuLink.classList.remove('active'); 
                activeMenuLink = null;
            }
            contentSections.forEach(section => section.classList.remove('active'));
        }

        document.addEventListener('authSuccess', function() {
            setInitialViewState();
        });
        
        const loginModalOverlay = document.getElementById('login-modal-overlay');
        if (loginModalOverlay && loginModalOverlay.classList.contains('hidden')) {
            setInitialViewState();
        }

        if (logoutButton) {
            logoutButton.addEventListener('click', function(event) {
                event.preventDefault();
                bodyElement.classList.remove('initial-view');
                location.reload(); 
            });
        }

        menuLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const sectionIdToShow = this.dataset.section;

                // Verifica se o link clicado é o mesmo que já está ativo
                if (this === activeMenuLink) {
                    // Se for o mesmo, oculta a seção e reseta o estado do menu
                    setInitialViewState();
                } else {
                    // Se for um link diferente, ou nenhum estava ativo, abre a nova seção
                    bodyElement.classList.remove('initial-view'); 
                    contentSections.forEach(section => section.classList.remove('active'));
                    
                    if (activeMenuLink) {
                        activeMenuLink.classList.remove('active');
                    }

                    const sectionToShow = document.getElementById(sectionIdToShow);
                    if (sectionToShow) {
                        sectionToShow.classList.add('active');
                        this.classList.add('active'); 
                        activeMenuLink = this;
                    } else {
                        // Se a seção correspondente ao link não for encontrada,
                        // também volta para o estado inicial para evitar um estado inconsistente.
                        setInitialViewState(); 
                    }
                }
            });
        });
    });
})();