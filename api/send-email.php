
<?php

require "../src/php/vendor/autoload.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require "../src/php/vendor/phpmailer/phpmailer/src/Exception.php";
require "../src/php/vendor/phpmailer/phpmailer/src/PHPMailer.php";
require "../src/php/vendor/phpmailer/phpmailer/src/SMTP.php";


$mail = new PHPMailer(true);
try{
    if(isset($_POST["send"])){

    //Coletar os valores do formulario
        $name = $_POST["name"];
        $email = $_POST["email"];
        $assunto = $_POST["assunto"];
        $mensagem = $_POST["mensagem"];
    
    
    
        $mail->isSMTP();
        $mail->SMTPAuth = true;
    
        $mail->Host = "smtp.gmail.com";
        $mail->SMTPSecure = "tls";
        $mail->Port = 587;
    
        $mail->Username = "av3.adm30@gmail.com";
        $mail->Password = "pdpu iizv jufm zvco";
    
        $mail->setFrom("av3.adm30@gmail.com", $name);
        $mail->addAddress("av3.adm30@gmail.com");

        $mail->Subject = $assunto;
        $mail->Body = $mensagem;
    
        if (is_uploaded_file ($_FILES['attachment']['tmp_name'])) {
            $mail->AddAttachment($_FILES['attachment']['tmp_name'],$_FILES['attachment']['name'], 'base64',$_FILES['attachment']['type']);
        }
        if(!$mail->Send()) {
            header('Location: ../src/pages/Contato.html?envio_mensagem=erro');
            exit();
        } else {
            $mail->clearAddresses();
            $mail->clearAttachments();
            $mail->addAddress($email);
            $resposta = 'Obrigado por entrar em contato! Sua mensagem foi recebida com sucesso.';
            $mail->Subject = 'MedCare - Contato, reply';
            $mail->Body = $resposta;
            $mail->Send();

            echo '<script>
            Swal.fire({
                icon: "success",
                title: "Mensagem Enviada!",
                text: "Obrigado por entrar em contato. Sua mensagem foi recebida com sucesso!",
            });
            </script>';
        }

    }
}
catch(Exception $e){
    echo $e;
}

header('Location: ../src/pages/Contato.html?envio_mensagem=sucesso');
exit();

?>