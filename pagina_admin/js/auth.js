(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const loginModalOverlay = document.getElementById('login-modal-overlay');
        const loginButton = document.getElementById('login-button');
        const forgotPasswordLink = document.getElementById('forgot-password-link');
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const loginErrorMessage = document.getElementById('login-error-message');

        if (loginModalOverlay && loginButton && usernameInput && passwordInput) {
            loginButton.addEventListener('click', function() {
                const username = usernameInput.value.trim();
                const password = passwordInput.value;

                if (loginErrorMessage) {
                    loginErrorMessage.textContent = '';
                    loginErrorMessage.style.display = 'none';
                }

                if (username === "admin" && password === "admin") {
                    if (loginModalOverlay) { 
                        loginModalOverlay.classList.add('hidden');
                    }
                    
                    document.dispatchEvent(new CustomEvent('authSuccess'));
                    
                } else {
                    if (loginErrorMessage) {
                        loginErrorMessage.textContent = 'Usuário ou senha inválidos.';
                        loginErrorMessage.style.display = 'block';
                    } else {
                        alert('Usuário ou senha inválidos.');
                    }
                    if (passwordInput) passwordInput.value = '';
                    if (usernameInput) usernameInput.focus();
                }
            });
        }

        if (forgotPasswordLink) {
            forgotPasswordLink.addEventListener('click', function(event) {
                event.preventDefault();
                location.reload();
            });
        }
    });
})();