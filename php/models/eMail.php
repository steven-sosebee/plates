<?php

// error_reporting (E_ALL ^ E_NOTICE ^ E_DEPRECATED ^ E_STRICT);
ini_set("include_path", '/home3/steveqv1/php:' . ini_get("include_path") );
// require_once "/home3/steveqv1/php/Mail.php";
require_once "Mail.php";
require_once "../config/email_config.php";
$host = EMAIL_HOST;
$email_from = EMAIL_FROM;
$password = EMAIL_PASSWORD;
$port = EMAIL_PORT;
$to = "swsosebee@gmail.com";
// $email_from = "steven@stevenwsosebee.com";
$email_subject = $_GET['subject'] ;
$email_body = $_GET['message'] ;
// $email_address = "steven@stevenwsosebee.com" ;

$headers = array ('From' => $email_from, 'To' => $to, 'Subject' => $email_subject, 'Reply-To' => $email_from);
$smtp = Mail::factory ('smtp', array ('host' => $host, 'port' => $port, 'auth' => true, 'username' => $email_from, 'password' => $password));
$mail = $smtp->send($to, $headers, $email_body);

if (PEAR::isError($mail) )  {
echo json_encode($mail->getMessage()) ; 
} else {
echo json_encode("message sent successfully...") ;
}
?>