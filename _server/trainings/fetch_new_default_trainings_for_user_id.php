<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db_connection.php';
$post = json_decode(file_get_contents("php://input"), true);
$errors = array();


if($post){
	$user_id = $post['user_id'];
	//if(empty(trim($user_id))) {array_push($errors, "User is not provided, authorization error");};


	$query  = "SELECT `training_id`, training.name as `training`, `e_id`, excersise.name as `excersise`, `repeat`
	FROM `excersise` 
	INNER JOIN `training`
	ON training_id = training.t_id";
	

	$data = mysqli_query($db_conn, $query);
	$rows = mysqli_num_rows($data);


	if($rows > 0)
 	{
        $data = mysqli_fetch_all($data,MYSQLI_ASSOC);
		$training = [];
		$excersise = [];
		$index = -1;$index2 = 0;$index3 = 0;
		$trainingId_previouse;

		foreach($data as $element){
		    $trainingId = $element['training_id'];
			//echo nl2br("element id: $trainingId \r\n");
			$excersise[$index2]["id"] = $element['e_id'];
			$excersise[$index2]["name"] = $element['excersise'];
			$excersise[$index2]["repeat"] = $element['repeat'];
			
			$previouse_record_sql = "SELECT * FROM `training_record` where excersise_id IN (".$element['e_id'].") and user_id = ".$user_id." ORDER BY dt DESC, id ASC limit 3";
			$previouse_record_data = mysqli_query($db_conn, $previouse_record_sql);
			$previouse_record = "";
			
			if(mysqli_num_rows($previouse_record_data)){
				foreach ($previouse_record_data as $value) { //foreach ($previouse_record_data as $key => $value) {
					$previouse_record .= ($value["repetitions"]);
					$previouse_record .=  (" x ");
					$previouse_record .=  ($value["weight"]);

					if($value === end($previouse_record_data)){
						$previouse_record .=  ("kg");
					} else {
						$previouse_record .=  ("kg, ");
					}
					
				}
			}
			
			$excersise[$index2]["previousExcersiseRecord"] = $previouse_record;
			
			if($trainingId != $trainingId_previouse) {
			    $index++;
			    $index3 = 0; //every training.excersise.id will start from 0 for each training[] excersise
				//echo nl2br(" new training id: $trainingId != $trainingId_previouse \r\n");
				//$training[$index] = array('training_id' => $element['training_id'],'training_id' => $element['training_id']); //{ "training_id" = $element['training_id'];
				$training[$index]["id"] = $element['training_id'];
				$training[$index]["name"] = $element['training'];
				
				//$training[$index]["excesises"][$index3] = $excersise[$index2];
			} else {
				
			}
			$training[$index]["excesises"][$index3] = $excersise[$index2];
			$index2++;
			$index3++;
			$trainingId_previouse = $trainingId;
		}

	    echo json_encode(["success"=>1,"data"=>$training]);


    } else { echo json_encode(["success"=>0,"msg"=>"No trainings available, please reload page."]);    }
} else {
	echo json_encode(["success"=>0,"msg"=>"Something went wrong, please try again"]); }


?>