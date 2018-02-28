<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    //If required
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

$rawBody = json_decode(file_get_contents("php://input"), true); // Read body

$conn = new mysqli('invmariadb1.cjj16juccmpl.ap-northeast-2.rds.amazonaws.com','aptwant','dhdltkdhdltk','mainDB');
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$request_method = $_SERVER["REQUEST_METHOD"];
$data = json_decode(file_get_contents("php://input"));

$result = $_POST;
while($row = mysqli_fetch_assoc($result))
{
  $response[]=$row;
}

echo json_encode("{'data':'".$request_method."'}");
?>