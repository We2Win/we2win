<?php
// $user['user'] = 'name_here';
// $user['pass'] = password_hash("password_here",PASSWORD_DEFAULT);
// echo json_encode($user);

$conn = mysqli_connect('invmariadb1.cjj16juccmpl.ap-northeast-2.rds.amazonaws.com','aptwant','dhdltkdhdltk','mainDB');

class Users{
  //Get users
  function getUsers()
  {
    global $conn;
    $query="SELECT * FROM `01011803` WHERE ID='100kimc'";
    // $query="SHOW TABLES;";
    $response=array();
    // $hello=array();
    // $hello[]="Hello World!";
    $result=$conn->query($query);
    while($row = mysqli_fetch_assoc($result))
    {
      $response[]=$row;
    }
    header('Content-Type: application/json');
    // echo json_encode($hello);
    echo json_encode($response);
  }
  //Save user
  function saveUser($data){
    global $conn;
    $query="INSERT INTO `01011803` (ID, Password) VALUES ('".$data->ID."', '".$data->Password."')";
    $result=$conn->query($query);
    while($row = mysqli_fetch_assoc($result))
    {
      $response[]=$row;
    }
    header('Content-Type: application/json');
    //Respond success / error messages
    echo json_encode($response);
  }
  //Update user
  function updateUser($data){
    global $conn;
    $query = "UPDATE users SET ID='".$data->ID."', last_name='".$data->last_name."' WHERE id=$data->id.";
    echo $result=mysqli_query($conn, $query);
    header('Content-Type: application/json');
    //Respond success / error messages
  }
  //Delete user
  function deleteUser($data){
    global $conn;
    $query = "DELETE FROM users WHERE id=".$data->id;
    echo $result=mysqli_query($conn, $query);
    header('Content-Type: application/json');
    //Respond success / error messages
  }

  function login($data){
    $ID = mysqli_real_escape_string($conn,$data->ID);
    $Password = mysqli_real_escape_string($conn,$data->Password);
    // $Password = mysqli_real_escape_string($conn,$_POST['Password']);

    $query = "SELECT * FROM `01011803` WHERE ID = '$ID'";
    $result = mysqli_query($conn, $query);
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
    $active = $row['active'];

    $count = mysqli_num_rows($result);

    if ($count == 1) {
        echo $result;
    } else {
        echo "Failed";
    }
  }
}
?>