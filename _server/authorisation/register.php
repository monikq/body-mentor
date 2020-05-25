<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

require '../db_connection.php';
$post = json_decode(file_get_contents("php://input"), true);

$username = $post['username'];
$email = strtolower($post['email']);
$email = mysqli_real_escape_string($db_conn, $email);
$password = $post['password'];
$errors = array();

// IF FIELDS ARE EMPTY
if(empty(trim($email))) {array_push($errors, "E-mail is required");};
if(empty(trim($password))) {array_push($errors, "Password is required");};

// PASSWORD VALIDATION
//if((trim($password)) != (trim($password2))) {array_push($errors, "Passwords do not match");};
if(strlen($password) < 6) {{array_push($errors, "Password is too short");};};

// IF EMAIL IS ALREADY REGISTERED
$user_check_query = "SELECT * FROM `users` WHERE user_email = '$email' LIMIT 1";
$result = mysqli_query($db_conn, $user_check_query);
$user = mysqli_fetch_assoc($result);

if($user){
	if(strtolower($user['user_email']) === strtolower($email)){
		array_push($errors, "User already exist, please log in.");
	}
}

// REGISTER NEW USER
if(count($errors) === 0) 
{
	if(empty(trim($username))) {
		$username = "Nameless php";
	} else {
		$username = mysqli_real_escape_string($db_conn, $username);
	}
	
	$password = password_hash($password, PASSWORD_DEFAULT);
	$password = mysqli_real_escape_string($db_conn, $password);
	
	$insert_user_query = "INSERT INTO `users`(`username`,`user_email`, `user_password`) VALUES('$username','$email', '$password')";
	$result = mysqli_query($db_conn, $insert_user_query);

	if($result === true){
		echo json_encode(["success"=>1,"msg"=>"User has been created successfuly"]);
	} else {
		echo json_encode(["success"=>0,"msg"=>"Something went wrong, please try again."]);
	};
} else {
	echo json_encode(["success"=>0,"msg"=>$errors[0]]);
};


?>