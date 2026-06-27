/* ==========================================================
   CONFIGURAÇÃO DA API DO WHATSAPP
========================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Configure aqui os dados de integração
    const CONFIG_WHATSAPP = {
        telefone: "5527999999999", // DDD + Número (Apenas números, sem espaços ou traços)
        mensagem: "Olá! Gostaria de agendar um atendimento jurídico estratégico." // Mensagem padrão convertida automaticamente
    };

    const btnWhatsapp = document.getElementById('btn-whatsapp');

    if (btnWhatsapp) {
        // Codifica a mensagem para o padrão de URL (transforma espaços em %20, etc.)
        const mensagemCodificada = encodeURIComponent(CONFIG_WHATSAPP.mensagem);
        
        // Monta a URL oficial da API do WhatsApp
        const urlWhatsapp = `https://api.whatsapp.com/send?phone=${CONFIG_WHATSAPP.telefone}&text=${mensagemCodificada}`;
        
        // Atribui o link dinamicamente ao botão
        btnWhatsapp.href = urlWhatsapp;
    }
});