document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MODAL - NOSSO ESCRITÓRIO
    ===================================================== */

    const modal = document.getElementById("modal-escritorio");
    const btnAbrir = document.getElementById("btn-conhecer");
    const btnFechar = document.getElementById("btn-fechar-modal");

    if (modal && btnAbrir && btnFechar) {

        btnAbrir.addEventListener("click", (e) => {
            e.preventDefault();
            modal.showModal();
        });

        btnFechar.addEventListener("click", () => {
            modal.close();
        });

        modal.addEventListener("click", (e) => {

            const dialog = modal.getBoundingClientRect();

            if (
                e.clientX < dialog.left ||
                e.clientX > dialog.right ||
                e.clientY < dialog.top ||
                e.clientY > dialog.bottom
            ) {
                modal.close();
            }

        });

    }


    /* =====================================================
       MODAL - AGENDAMENTO
    ===================================================== */

    const modalAgenda = document.getElementById("modal-agendamento");
    const botoesAbrirAgenda = document.querySelectorAll(".classe-abrir-agenda");
    const btnFecharAgenda = document.getElementById("btn-fechar-agendamento");

    if (modalAgenda && btnFecharAgenda) {

        botoesAbrirAgenda.forEach(botao => {

            botao.addEventListener("click", (e) => {

                e.preventDefault();

                modalAgenda.showModal();

            });

        });

        btnFecharAgenda.addEventListener("click", () => {

            modalAgenda.close();

        });

        modalAgenda.addEventListener("click", (e) => {

            if (e.target === modalAgenda) {

                modalAgenda.close();

            }

        });

    }

});
