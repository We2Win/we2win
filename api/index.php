<?php
session_start();

$rawBody = file_get_contents("php://input"); // Read body


if($rawBody != "") { //if post data
require("users.php");
if(sizeof($users) > 0) {
	$user_list = json_decode($users);
}

	$data = json_decode($rawBody);
	//post data from login form
	$user = $data->user;
	$pass = $data->pass;
	$auth = false;
	foreach($user_list as $u) {
		//check username and hashed password
		if($u->user == $user && password_verify($pass,$u->pass)) {
			echo '{"user":"'.$user.'", "auth":"1"}';
			$_SESSION['auth'] = 1;
			$_SESSION['user'] = $user;
			$auth = true;
			break;
		}
	}
	if(!$auth) {
		//if wrong authentication details, output not authenticated
		echo '{"user":"'.$user.'", "auth":"0"}';
		$_SESSION['auth'] = 0;
		$_SESSION['user'] = 'none';
	}
} else {
	//if no post data
	//if not authenticated, output that fact
	if($_SESSION['auth'] == 0) {
		echo '{"user":"none", "auth":"0"}'; 
	} else {
		//if authenticated, output json
		echo '{"user":"'.$_SESSION['user'].'", "auth":"'.$_SESSION['auth'].'"}';
	}
}
?>