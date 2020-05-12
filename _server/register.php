<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';
$post = json_decode(file_get_contents("php://input"), true);

$userEmail = $post[email];
$userPassword = $post[password];

if(!empty(trim($userEmail)) && !empty(trim($userPassword ))){
	
	$query = "SELECT * FROM `users` WHERE user_email = '$userEmail'";
	$data = mysqli_query($db_conn, $query);
	
	if(mysqli_num_rows($data) > 0){
        $data = mysqli_fetch_all($data,MYSQLI_ASSOC);
        $user_db_pass = $data['user_password'];
		
		// VERIFY PASSWORD
		$check_password = password_verify($userPassword, $user_db_pass);
		
		if($check_password === TRUE){
			echo json_encode(["success"=>1,"user"=>$data]);
		}
		echo json_encode(["success"=>1,"msg"=>"Password is incorrect. Try again.","user"=>$data]);
    }
    else{
        echo json_encode(["success"=>0,"msg"=>"test - Something went wrong, please try again!","user"=>$data, "email"=>$userEmail]);
    }
	
} else {
echo json_encode(["success"=>0,"msg"=>"Something went wrong, please try again!"]);
}

?>