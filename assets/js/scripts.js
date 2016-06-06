var mailgunURL;

mailgunURL = window.location.protocol + "//" + window.location.hostname + '/ajax/mailgun.php';

$('#mailgun').on('submit',function(e) {
  e.preventDefault();

  $('#mailgun *').fadeOut(200);
  $('#mailgun').prepend('Your submission is being processed...');

  $.ajax({
    type     : 'POST',
    cache    : false,
    url      : mailgunURL,
    data     : $(this).serialize(),
    success  : function(data) {
      responseSuccess(data);
      console.log(data);
    },
    error  : function(data) {
      console.log('Silent failure.');
    }
  });

  return false;

});

function responseSuccess(data) {

  data = JSON.parse(data);

  if(data.status === 'success') {
    $('#mailgun').html('Submission sent succesfully.');
  } else {
    $('#mailgun').html('Submission failed, please contact directly.');
  }

}

if(empty($_POST) || !isset($_POST)) {

  ajaxResponse('error', 'Post cannot be empty.');

} else {

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
    'mailgun' => $mgkey-bd01a75d1b6f1921fef2363eba21ab46($response);
  exit($output);
}

function sendMailgun($data) {

  $api_key = 'key-bd01a75d1b6f1921fef2363eba21ab46';
  $api_domain = 'https://api.mailgun.net/v3/mg.clearscienceinc.com';
  $send_to = 'YOUR_EMAIL';

  $name = $data['name'];
  $email = $data['email'];
  $content = $data['message'];

  $messageBody = "Contact: $name ($email)\n\nMessage: $content";

  $config = array();
  $config['api_key'] = $api_key;
  $config['api_url'] = $api_domain.'/messages';

  $message = array();
  $message['from'] = $email;
  $message['to'] = $send_to;
  $message['h:Reply-To'] = $email;
  $message['subject'] = $data['subject'];
  $message['text'] = $messageBody;

  $curl = curl_init();

  curl_setopt($curl, CURLOPT_URL, $config['api_url']);
  curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
  curl_setopt($curl, CURLOPT_USERPWD, "api:{$config['api_key']}");
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 10);
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
  curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
  curl_setopt($curl, CURLOPT_POST, true);
  curl_setopt($curl, CURLOPT_POSTFIELDS,$message);

  $result = curl_exec($curl);

  curl_close($curl);
  return $result;

}
