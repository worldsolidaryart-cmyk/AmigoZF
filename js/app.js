document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal-escritorio');
    const btnAbrir = document.getElementById('btn-conhecer');
    const btnFechar = document.getElementById('btn-fechar-modal');

    // Abrir o modal com animação
    btnAbrir.addEventListener('click', (e) => {
        e.preventDefault(); // Evita que a página role para o topo pelo '#'
        modal.showModal();
    });

    // Fechar o modal
    btnFechar.addEventListener('click', () => {
        modal.close();
    });

    // Fechar se o usuário clicar na parte escura (fora do modal)
    modal.addEventListener('click', (e) => {
        const dialogDimensions = modal.getBoundingClientRect();
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            modal.close();
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const modalAgenda = document.getElementById("modal-agendamento");
    const botoesAbrir = document.querySelectorAll(".classe-abrir-agenda");
    const botaoFechar = document.getElementById("btn-fechar-agendamento");

    // Abre o modal ao clicar em qualquer um dos dois botões de agendamento
    botoesAbrir.forEach(botao => {
        botao.addEventListener("click", () => {
            modalAgenda.showModal();
        });
    });

    // Fecha o modal ao clicar no 'X'
    botaoFechar.addEventListener("click", () => {
        modalAgenda.close();
    });

    // Fecha o modal se o usuário clicar na área escura de fundo
    modalAgenda.addEventListener("click", (e) => {
        if (e.target === modalAgenda) {
            modalAgenda.close();
        }
    });
});