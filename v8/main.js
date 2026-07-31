document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const nav = document.getElementById('main-nav');
    
    // Scroll shrink header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shrink');
        } else {
            header.classList.remove('shrink');
        }
    });

    // Simple Hash Router para alternar views
    const pageHome = document.getElementById('page-home');
    const pageDiag = document.getElementById('page-diagnostico');

    function handleRoute() {
        const hash = window.location.hash;
        
        if (hash === '#diagnostico') {
            // View Diagnóstico
            pageHome.classList.remove('active');
            pageDiag.classList.add('active');
            pageDiag.classList.remove('hidden');
            nav.style.display = 'none'; // Esconde navegação conforme spec da página 2
            window.scrollTo(0,0);
        } else {
            // View Home
            pageDiag.classList.remove('active');
            pageDiag.classList.add('hidden');
            pageHome.classList.add('active');
            nav.style.display = 'flex'; // Restaura navegação
            
            // Se for link âncora dentro da home (ex: #metodo), realiza scroll suave
            if (hash && hash !== '#') {
                const target = document.querySelector(hash);
                if (target) {
                    setTimeout(() => {
                        window.scrollTo({
                            top: target.offsetTop - 80, // Compensa a altura do header
                            behavior: 'smooth'
                        });
                    }, 100);
                }
            } else {
                window.scrollTo(0,0);
            }
        }
    }

    // Escuta mudanças de hash (navegação)
    window.addEventListener('hashchange', handleRoute);
    
    // Check inicial ao carregar a página
    if(window.location.hash) {
        handleRoute();
    }
});
