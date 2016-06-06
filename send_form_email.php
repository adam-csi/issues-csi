<?php

if(isset($_POST['send'])) {

  $to = "adam@clearscienceinc.com";

  $subject = "Issue sumitted from issues.clearscienceinc.com";
  $message = 'Name: ' . $_POST['name'] . "\r\n\r\n";
  $message .= 'Email: ' . $_POST['email'] . "\r\n\r\n";
  $message .= 'Comments: ' . $_POST['comments'];

  echo $message;
  $headers = "From: adam@clearscienceinc.com\r\n";
  $headers .= 'Content-Type: text/plain; charset=utf-8';
  $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
  if ($email) {
     $headers .= "\r\nReply-To: $email";
  }
  $success = mail($to, $subject, $message, $headers, '‑fadam@clearscienceinc.com');

}
?>
