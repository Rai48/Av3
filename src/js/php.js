document.addEventListener("DOMContentLoaded", function () {
    var params = new URLSearchParams(window.location.search);
    var sucesso = params.get('envio_mensagem') === 'sucesso';

    console.log('Parâmetro envio_mensagem:', sucesso);

    if (sucesso) {
        Swal.fire({
            icon: 'success',
            title: 'Mensagem Enviada!',
            text: 'Obrigado por entrar em contato. Sua mensagem foi recebida com sucesso!',
        });
    }else {
        var erro = params.get('envio_mensagem') === 'erro';
        if (erro) {
            Swal.fire({
                icon: 'error',
                title: 'Erro ao Enviar Mensagem',
                text: 'Houve um problema ao enviar sua mensagem. Tente novamente mais tarde.',
            });
        }
    }
});