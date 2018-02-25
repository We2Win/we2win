<?php
class Users{
  //Get users
  function getUsers($data)
  {
    global $conn;
    $query="SELECT * FROM `01011803`";
    $response=array();
    $hello=array();
    $hello[]="Hello World!";
    $result=mysqli_query($conn, $query);
    while($row = mysqli_fetch_assoc($result))
    {
      $response[]=$row;
    }
    header('Content-Type: application/json');
    echo json_encode($hello);
  }
  //Save user
  function saveUser($data){
    global $conn;
    $query="INSERT INTO `01011803` (ID, CP) VALUES ('".$data->ID."', '".$data->CP."')";
    echo $result=mysqli_query($conn, $query);
    header('Content-Type: application/json');
    //Respond success / error messages
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
}