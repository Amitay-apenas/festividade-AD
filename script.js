// Efeito parallax com filtro preto e branco na hero section
document.addEventListener('scroll', function() {
    const hero = document.getElementById('hero');
    const scrollPosition = window.scrollY;
    const heroHeight = hero.offsetHeight;
    
    const scrollPercent = Math.min(scrollPosition / heroHeight, 1);
    const grayscaleValue = scrollPercent * 100;
    hero.style.filter = `grayscale(${grayscaleValue}%)`;
});

document.getElementById('registration-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const igreja = document.getElementById('igreja').value;
    const cargo = document.getElementById('cargo').value;
    const cidade = document.getElementById('cidade').value;

    // Enviar para Web3Forms
    const formData = new FormData();
    formData.append('access_key', '83a31b9d-e40e-4193-9394-7d82fb068514');
    formData.append('subject', 'Nova Inscrição para a Festividade');
    formData.append('from_name', 'Formulário Festividade');
    formData.append('name', name);
    formData.append('email', email);
    formData.append('whatsapp', whatsapp);
    formData.append('igreja', igreja);
    formData.append('cargo', cargo);
    formData.append('cidade', cidade);

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            // Redirecionar para success.html com o nome como parâmetro
            window.location.href = `success.html?name=${encodeURIComponent(name)}`;
        } else {
            alert('Erro ao enviar inscrição. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao processar sua inscrição. Verifique sua conexão e tente novamente.');
    }
});
