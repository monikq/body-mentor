<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$response = file_get_contents("php://input");
$post = json_decode($response, true);

$userEmail = $post['email'];
$userPassword = $post['password']; 


if(!empty(trim($userEmail)) && !empty(trim($userPassword ))){
	//escape characters? how does it work? $user_email = mysqli_real_escape_string($db_connection, htmlspecialchars(trim($_POST['email'])));
	
	$query = "SELECT * FROM `users` WHERE user_email = '$userEmail' Limit 1";
	$data = mysqli_query($db_conn, $query);
	
	if(mysqli_num_rows($data) > 0){
        $data = mysqli_fetch_array($data,MYSQLI_ASSOC);
        $user_db_pass = $data['user_password'];
		
		// VERIFY PASSWORD
		$check_password = password_verify($userPassword, $user_db_pass);
		
		if($check_password === TRUE){
			echo json_encode(["success"=>1,"msg"=>"User has been logged in.","user"=>$data]);
		} 
		else {
			echo json_encode(["success"=>0,"msg"=>"Password is incorrect. Try again."]);
		}
    }
    else{
        echo json_encode(["success"=>0,"msg"=>"Register new user. This user does not exist!"]);
    }
	
} else {
	echo json_encode(["success"=>0,"msg"=>"Something went wrong, please try again!"]);
}

?>