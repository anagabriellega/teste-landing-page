// Menu mobile toggle
const toggleBtn = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

toggleBtn?.addEventListener('click', () => {
  const isVisible = navLinks.classList.contains('opacity-100');
  
  if (isVisible) {
    navLinks.classList.remove('opacity-100', 'visible');
    navLinks.classList.add('opacity-0', 'invisible');
  } else {
    navLinks.classList.remove('opacity-0', 'invisible');
    navLinks.classList.add('opacity-100', 'visible');
  }
});

// Newsletter + envio simulado com fetch
const form = document.getElementById('newsletter-form');
const modal = document.getElementById('modal-success');
const closeModal = document.getElementById('close-modal');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = form.nome.value.trim();
  const email = form.email.value.trim();

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailValido) {
    alert('Por favor, insira um e-mail válido.');
    return;
  }

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email })
    });

    if (response.ok) {
      modal.classList.remove('hidden');
      form.reset();
    } else {
      alert('Algo deu errado ao enviar o formulário. Tente novamente.');
    }
  } catch (error) {
    alert('Erro ao conectar com o servidor.');
    console.error(error);
  }
});

closeModal?.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Scroll reveal
const faders = document.querySelectorAll('.scroll-fade');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Só anima uma vez
    }
  });
}, {
  threshold: 0.1
});

faders.forEach(el => {
  observer.observe(el);
});

// Pagamento - seleção + instruções dinâmicas
const paymentButtons = document.querySelectorAll('.btn-pagamento');
const confirmButton = document.querySelector('.btn-confirmar');
const resumoBox = document.getElementById('resumo-pagamento');
const pagamentoMsg = document.getElementById('pagamento-msg');

let selectedPaymentMethod = '';

paymentButtons.forEach((button) => {
    button.addEventListener('click', () => {
      paymentButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      selectedPaymentMethod = button.innerText.trim();
      resumoBox.classList.remove('hidden');
  
      if (selectedPaymentMethod === 'Pix') {
        pagamentoMsg.innerHTML = `
          <p>Use o QR Code abaixo para realizar o pagamento via Pix:</p>
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=chave-pix-fake%40email.com" alt="QR Code Pix" class="mx-auto rounded shadow-md" />
          <p class="text-sm text-gray-600 text-center mt-2">*Simulação de QR Code com chave fictícia.</p>
        `;
      } else if (selectedPaymentMethod === 'Cartão de Crédito') {
        pagamentoMsg.innerHTML = `
          <p>Insira os dados do seu cartão:</p>
          <form class="space-y-3">
            <input type="text" placeholder="Número do cartão" class="w-full px-4 py-2 border rounded" />
            <input type="text" placeholder="Nome impresso no cartão" class="w-full px-4 py-2 border rounded" />
            <div class="flex gap-2">
              <input type="text" placeholder="MM/AA" class="w-1/2 px-4 py-2 border rounded" />
              <input type="text" placeholder="CVV" class="w-1/2 px-4 py-2 border rounded" />
            </div>
          </form>
          <p class="text-sm text-gray-600 mt-2">*Simulação, os dados não são enviados.</p>
        `;
      } else if (selectedPaymentMethod === 'Boleto Bancário') {
        pagamentoMsg.innerHTML = `
          <p>Seu boleto foi gerado! Clique no botão abaixo para simular o download:</p>
          <div class="bg-white border rounded p-4 shadow">
            <code class="block text-center font-mono mb-2 text-sm">34191.79001 01043.510047 91020.150008 4 87120000005000</code>
            <a href="#" class="block text-center bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded transition mt-2">Baixar Boleto</a>
          </div>
          <p class="text-sm text-gray-600 mt-2 text-center">*Simulação de boleto bancário.</p>
        `;
      }
    });
  });
  

confirmButton?.addEventListener('click', () => {
  if (selectedPaymentMethod) {
    alert(`Compra confirmada com pagamento via ${selectedPaymentMethod}!`);
  } else {
    alert('Por favor, selecione um método de pagamento antes de confirmar.');
  }
});
