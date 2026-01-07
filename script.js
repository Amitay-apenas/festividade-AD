// Efeito parallax original
document.addEventListener('scroll', function() {
    const hero = document.getElementById('hero');
    const scrollPosition = window.scrollY;
    const heroHeight = hero.offsetHeight;
    if(hero) {
        const scrollPercent = Math.min(scrollPosition / heroHeight, 1);
        hero.style.filter = `grayscale(${scrollPercent * 100}%)`;
    }
});

document.getElementById('registration-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const btn = document.getElementById('submit-btn');
    const name = document.getElementById('name').value;
    
    btn.innerText = "Processando Inscrição...";
    btn.disabled = true;

    // 1. Atualiza os dados no certificado invisível (baseado no seu design do certificate.html)
    document.getElementById('cert-name-display').innerText = name;
    document.getElementById('cert-date').innerText = `Cachoeirinha-PB, ${new Date().toLocaleDateString('pt-BR')}`;

    try {
        // 2. Gera a imagem do certificado internamente
        const certElement = document.getElementById('hidden-cert');
        const canvas = await html2canvas(certElement, { 
            scale: 2,
            useCORS: true,
            logging: false 
        });
        
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        const file = new File([blob], `Certificado_${name}.png`, { type: 'image/png' });

        // 3. Monta o formulário exatamente como o Web3Forms espera (SEM CPF)
        const formData = new FormData(this);
        formData.append('access_key', '83a31b9d-e40e-4193-9394-7d82fb068514');
        formData.append('attachment', file); // Envia o certificado para seu e-mail
        formData.append('subject', `Nova Inscrição: ${name}`);
        formData.append('from_name', 'AD Cachoeirinha');

        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            // Sucesso: Vai para a página de agradecimento
            window.location.href = `success.html?name=${encodeURIComponent(name)}`;
        } else {
            const errorData = await response.json();
            console.error("Erro Web3Forms:", errorData);
            throw new Error();
        }
    } catch (error) {
        alert('Ocorreu um erro ao enviar. Verifique sua conexão.');
        btn.innerText = "Inscrever-se";
        btn.disabled = false;
    }
});