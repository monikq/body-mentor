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

	$query = "SELECT `id`, `weight`, `kCal_100g`, CAST(`kCal_100g`/100*`weight` AS INT) as kCal, `DT`, TIME_FORMAT( CAST(`created_at` as TIME), ".'"%H:%i"'.") as `created_at`, `FoodType` 
	FROM `daily_calories` WHERE `DT` = CURRENT_DATE and `user_id` = $userID ORDER BY `created_at` desc";
	/* this is working on localhost
	"SELECT `weight`, `kCal_100g`, `kCal_100g`/100*`weight` AS kCal, `DT`, `created_at`, `FoodType` 
    FROM `daily_calories` WHERE `DT` = CURRENT_DATE AND `user_id` = $user_id ORDER BY `created_at` DESC";*/

 	$data = mysqli_query($db_conn, $query) or die(mysqli_error());

 	if(mysqli_num_rows($data) > 0)
 	{
        $data = mysqli_fetch_array($data,MYSQLI_ASSOC);
        echo json_encode(["success1"=>1, "data"=>$data, "rows"=>mysqli_num_rows($data)]);
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