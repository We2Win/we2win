<?php
session_name('GETUSERS');
session_start();

$rawBody = file_get_contents("php://input"); // Read body

$conn = new mysqli('invmariadb1.cjj16juccmpl.ap-northeast-2.rds.amazonaws.com','aptwant','dhdltkdhdltk','mainDB');
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// $result = $conn->query("SELECT * from  `01011803`");

// if($result->num_rows > 0) {
//   while($row = $result->fetch_assoc()) {
//     echo "ID: " . $row["ID"] . " - Password: " . $row["Password"];
//   }
// } else {
//     echo "0 results";
// }

// $conn->close();

include_once('users.php');
$request_method = $_SERVER["REQUEST_METHOD"];
$data = json_decode(file_get_contents("php://input"));
$user = new Users;

    echo json_encode("{'data':'".$request_method."'}");

// $user->getUsers();
switch($request_method)
{
  case 'GET':
    // Retrive Users
    if(!empty($_GET["ID"]))
    {
      $ID=intval($_GET["ID"]);
      $user->getUsers($ID);
    }
    else
    {
      $user->getUsers();
    }
    break;
  case 'POST':
    // Insert User
    $user->saveUser($data);
    break;
  case 'PUT':
    $user->updateUser($data);
    break;
  case 'DELETE':
    // Delete User
    $user->deleteUser($data);
    break;
  default:
    // Invalid Request Method
    header("HTTP/1.0 405 Method Not Allowed");
    break;
}

$conn->close();







// if($rawBody != "") { //if post data
// require("users.php");
// if(sizeof($users) > 0) {
// 	$user_list = json_decode($users);
// }

// 	$data = json_decode($rawBody);
// 	//post data from login form
// 	$user = $data->user;
// 	$pass = $data->pass;
// 	$auth = false;
// 	foreach($user_list as $u) {
// 		//check username and hashed password
// 		if($u->user == $user && password_verify($pass,$u->pass)) {
// 			echo '{"user":"'.$user.'", "auth":"1"}';
// 			$_SESSION['auth'] = 1;
// 			$_SESSION['user'] = $user;
// 			$auth = true;
// 			break;
// 		}
// 	}
// 	if(!$auth) {
// 		//if wrong authentication details, output not authenticated
// 		echo '{"user":"'.$user.'", "auth":"0"}';
// 		$_SESSION['auth'] = 0;
// 		$_SESSION['user'] = 'none';
// 	}
// } else {
// 	//if no post data
// 	//if not authenticated, output that fact
// 	if($_SESSION['auth'] == 0) {
// 		echo '{"user":"none", "auth":"0"}'; 
// 	} else {
// 		//if authenticated, output json
// 		echo '{"user":"'.$_SESSION['user'].'", "auth":"'.$_SESSION['auth'].'"}';
// 	}
// }
// ?>