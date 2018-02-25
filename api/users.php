<?php
$user['user'] = 'kjh';
$user['pass'] = password_hash("testing",PASSWORD_DEFAULT);
echo json_encode($user);
?>