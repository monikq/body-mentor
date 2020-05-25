<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db_connection.php';
$post = json_decode(file_get_contents("php://input"), true);
$errors = array();

$user_id = $post['user_id'];
$weight_grams = $post['weight_grams'];
$kCal_100g = $post['kCal_100g'];
$foodCategory = $post['foodCategory'];
$date = date('Y-m-d');
$date = date("Y-m-d",strtotime($date));

if($post)
{ 
	$user_id = $post['user_id'];
	if(empty(trim($user_id))) {array_push($errors, "User is not provided, authorization error");};


	$query = "INSERT INTO `daily_calories`(`user_id`, `weight`, `kCal_100g`, `DT`,`FoodType`) 
		VALUES ($user_id, $weight_grams, $kCal_100g, '".$date."', '$foodCategory')";

 	$data = mysqli_query($db_conn, $query);

 	//echo json_encode(["success"=>0, "data"=>$data,"kCal"=>$kCal_100g,"grams"=>$weight_grams,"user"=>$user_id,"grams"=>$weight_grams, "guery"=>$query]);

 	if($data) 
 	{
		echo json_encode(["success"=>1,"msg"=>"Your record has been saved."]);
	} else {
		echo json_encode(["success"=>0,"msg"=>"Problem with database update, pls try again."]);
	}
} 
else 
{
	echo json_encode(["success"=>0,"msg"=>"Something went wrong, please try again"]);
	//echo json_encode(["success"=>0,"msg"=>$errors[0]]);
}

?>