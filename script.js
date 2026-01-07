// Efeito parallax com filtro preto e branco na hero section
document.addEventListener('scroll', function() {
    const hero = document.getElementById('hero');
    const scrollPosition = window.scrollY;
    const heroHeight = hero.offsetHeight;
    
    const scrollPercent = Math.min(scrollPosition / heroHeight, 1);
    const grayscaleValue = scrollPercent * 100;
    hero.style.filter = `grayscale(${grayscaleValue}%)`;
});

document.getElementById('registration-form').addEventListener('submit', function(event) {
    // Permite o envio padrão do formulário
    // O Web3Forms vai lidar com o envio do email
});
