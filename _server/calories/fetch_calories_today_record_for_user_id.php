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
	//if(empty(trim($user_id))) {array_push($errors, "User is not provided, authorization error");};

	$query = "SELECT `id`, `weight`, `kCal_100g`, CAST(`kCal_100g`/100*`weight` AS INT) as kCal, `DT`, TIME_FORMAT( CAST(`created_at` as TIME), ".'"%H:%i"'.") as `created_at`, `FoodType` 
	FROM `daily_calories` WHERE `DT` = CURRENT_DATE and `user_id` = $user_id ORDER BY `created_at` desc";

	/*"SELECT `id`, `weight`, `kCal_100g`, CAST(`kCal_100g`/100*`weight` AS INT) as kCal, `DT`, TIME_FORMAT( CAST(`created_at` as TIME), ".'"%H:%i"'.") as `created_at`, `FoodType` 
	FROM `daily_calories` WHERE `DT` = CURRENT_DATE and `user_id` = $user_id ORDER BY `created_at` desc";*/

 	$data = mysqli_query($db_conn, $query) or die(mysqli_error());
 	$rows = mysqli_num_rows($data);

 	if($rows > 0)
 	{
        $data = mysqli_fetch_all($data,MYSQLI_ASSOC);
        echo json_encode(["success"=>1, "data"=>$data, "rows"=>$rows]);
    } else {
    	echo json_encode(["success"=>0,"msg"=>"No records from today, add your meal kcal"]);
    }
} 
else 
{
	echo json_encode(["success"=>0,"msg"=>"Something went wrong, please try again"]);
	//echo json_encode(["success"=>0,"msg"=>$errors[0]]);
}

?>