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
$trainingRecord = $post['values'];

$date = date('Y-m-d');
$date = date("Y-m-d",strtotime($date));

if($post)
{ 
	$user_id = $post['user_id'];
	if(empty(trim($user_id))) {array_push($errors, "User is not provided, authorization error");};


	$sql = "INSERT INTO `training_record` (`excersise_id`, `user_id`, `weight`, `repetitions`, `DT`, `series`) VALUES";
	
	if( is_array($trainingRecord))
	{
		foreach ($trainingRecord as $key=>$record){
			if(is_array($record)){
				//echo json_encode(["success"=>0,"msg"=>"FOREACH.","key"=>$key, "record"=>$record]);
				//echo PHP_EOL;
				$excersise_id = $record["excersise_id"];
				$weight = $record["weight"];
				$repetitions = $record["repetitions"];
				$series = $record["series"];
				
				if($weight === "" && $repetitions ==="") //trzeba sprawdzić jak to zrobić z nullem
				{
					$weight = 0;
					$repetitions = 0;
				} 
				else if ($weight === "")
				{
					$weight = 0;
				} 
				else if ($repetitions === "")
				{
					$repetitions = 0;
				} 

				
				
				if($record === end($trainingRecord)) {
					$sql .= "(".$excersise_id.", ".$user_id.", ".$weight.", ".$repetitions.", '".$date."', ".$series."); ";
				} else {
					$sql .= "(".$excersise_id.", ".$user_id.", ".$weight.", ".$repetitions.", '".$date."', ".$series."), ";
				}
			}
		}
	}

 	$data = mysqli_query($db_conn, $sql);

 	//echo json_encode(["success"=>0, "data"=>$data,"kCal"=>$kCal_100g,"grams"=>$weight_grams,"user"=>$user_id,"grams"=>$weight_grams, "guery"=>$query]);

 	if($data) 
 	{
		echo json_encode(["success"=>1,"msg"=>"Your record has been saved."]);
	} else {
		echo json_encode(["success"=>0,"msg"=>"Training not updated, pls try again.", "sql"=>$sql, "trainingRecord"=>$trainingRecord]);
	}
} 
else 
{
	echo json_encode(["success"=>0,"msg"=>"Something went wrong, please try again"]);
	//echo json_encode(["success"=>0,"msg"=>$errors[0]]);
}

?>