<?php
$user['user'] = 'name_here';
$user['pass'] = password_hash("password_here",PASSWORD_DEFAULT);
echo json_encode($user);
?>