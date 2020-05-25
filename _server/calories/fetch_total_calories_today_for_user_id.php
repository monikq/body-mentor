<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db_connection.php';
$post = json_decode(file_get_contents("php://input"), true);
$errors = array();


if($post)
{ 
	$user_id = $post['user_id'];
	if(empty(trim($user_id))) {array_push($errors, "User is not provided, authorization error");};

	$query = "SELECT SUM(`weight`) AS 'total_grams_today', SUM(`kCal_100g`/100 * `weight`) AS 'total_kcal_today' FROM `daily_calories` WHERE `DT` = CURRENT_DATE AND `user_id` = $user_id";

 	$data = mysqli_query($db_conn, $query);

 	if(mysqli_num_rows($data) > 0){
        $data = mysqli_fetch_array($data,MYSQLI_ASSOC);
        echo json_encode(["success"=>1,"msg"=>"It's working", "data"=>$data]);
    } else {
    	echo json_encode(["success"=>0,"msg"=>"Database connection error, pls try again"]);
    }
} 
else 
{
	echo json_encode(["success"=>0,"msg"=>"Something went wrong, please try again"]);
	//echo json_encode(["success"=>0,"msg"=>$errors[0]]);
}

?>