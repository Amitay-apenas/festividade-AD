// Efeito parallax com filtro preto e branco na hero section
document.addEventListener('scroll', function() {
    const hero = document.getElementById('hero');
    const scrollPosition = window.scrollY;
    const heroHeight = hero.offsetHeight;
    
    // Calcula o percentual de scroll relativo à altura da hero
    // Quando chega a 100% do scroll da hero, chega a 100% do filtro
    const scrollPercent = Math.min(scrollPosition / heroHeight, 1);
    
    // Aplica o filtro grayscale de 0% a 100%
    const grayscaleValue = scrollPercent * 100;
    hero.style.filter = `grayscale(${grayscaleValue}%)`;
});

document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Inscrição enviada com sucesso!'); // Placeholder; adicione lógica de envio real
});