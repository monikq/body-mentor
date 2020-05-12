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
	//escape characters? how does it work? $user_email = mysqli_real_escape_string($db_connection, htmlspecialchars(trim($_POST['email'])));
	
	$query = "SELECT * FROM `users` WHERE user_email = '$userEmail' Limit 1";
	$result = mysqli_query($db_conn, $query);


	// ---------- legacy
	$data = mysqli_query($db_conn, $query);
	
	if(mysqli_num_rows($data) > 0){
        $data = mysqli_fetch_array($data,MYSQLI_ASSOC);
        $user_db_pass = $data['user_password'];
		
		// VERIFY PASSWORD
		$check_password = password_verify($userPassword, $user_db_pass);
		
		if($check_password === TRUE){
			echo json_encode(["success"=>1,"user"=>$data]);
		}
		echo json_encode(["success"=>0,"msg"=>"Password is incorrect. Try again.","user"=>$data]);
    }
    else{
        echo json_encode(["success"=>0,"msg"=>"Register user, this user does not exist!","user"=>$data, "email"=>$userEmail]);
    }
	
} else {
echo json_encode(["success"=>0,"msg"=>"Something went wrong, please try again!"]);
}

/* close connection */
//$mysqli->close();
/*

$query = mysqli_query($db_connection, "SELECT * FROM `users` WHERE user_email = '$user_email'");

if(mysqli_num_rows($query) > 0){

$row = mysqli_fetch_assoc($query);
$user_db_pass = $row['user_password'];

// VERIFY PASSWORD
$check_password = password_verify($_POST['user_password'], $user_db_pass);

if($check_password === TRUE){

session_regenerate_id(true);

$_SESSION['user_email'] = $user_email;  
header('Location: home.php');
exit;

}
else{
// INCORRECT PASSWORD
$error_message = "Incorrect Email Address or Password.";

}

}
else{
// EMAIL NOT REGISTERED
$error_message = "Incorrect Email Address or Password.";
}


}
else{

// IF FIELDS ARE EMPTY
$error_message = "Please fill in all the required fields.";
}

}
*/
?>