<?php
require 'vendor/autoload.php';
use Mailgun\Mailgun;

# Instantiate the client.
$mgClient = new Mailgun('YOUR_API_KEY');
$domain = "YOUR_DOMAIN_NAME";

# make call to client

if(empty($_POST) || !isset($_POST)) {

  ajaxResponse('error', 'Post cannot be empty.');

} else {
  $result = $mgClient->sendMessage($domain, array(
  ), array(
      'attachment' => array('/upload/')
  )
  ))
  $postData = $_POST;
  $dataString = implode($postData,",");

  $mailgun = sendMailgun($postData);

  if($mailgun) {

    ajaxResponse('success', 'Great success.', $postData, $mailgun);

  } else {

    ajaxResponse('error', 'Mailgun did not connect properly.', $postData, $mailgun);

  }

}

function ajaxResponse($status, $message, $data = NULL, $mg = NULL) {
  $response = array (
    'status' => $status,
    'message' => $message,
    'data' => $data,
    'mailgun' => $mg
  ), array (
    'attachment' => array('/')
  );
  $output = json_encode($response);
  exit($output);
}

function sendMailgun($data) {

  $api_key = 'key-bd01a75d1b6f1921fef2363eba21ab46';
  $api_domain = 'mg.clearscienceinc.com';
  $send_to = 'adam@clearscienceinc.com';
  $sent_from = 'postmaster@mg.clearscienceinc.com';
  $name = $data['name'];
  $email = $data['email'];
  $content = $data['message'];

  $messageBody = "Contact: $name ($email)\n\nMessage: $content";

  $config = array();
  $config['api_key'] = $api_key;
  $config['api_url'] = 'https://api.mailgun.net/v3/'.$api_domain.'/messages';

  $message = array();
  $message['from'] = $sent_from;
  $message['to'] = $send_to;
  $message['h:Reply-To'] = $email;
  $message['subject'] = $data['subject'];
  $message['text'] = $messageBody;

  $files['attachment'] = array();
  $files['attachment'][] = '/var/www/somefile.php';

  $curl = curl_init();

  curl_setopt($curl, CURLOPT_URL, $config['api_url']);
  curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
  curl_setopt($curl, CURLOPT_USERPWD, "api:{$config['api_key']}");
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 10);
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
  curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
  curl_setopt($curl, CURLOPT_POST, true);
  curl_setopt($curl, CURLOPT_POSTFIELDS,$message,$files);

  $result = curl_exec($curl);

  curl_close($curl);
  return $result;

}
?>
