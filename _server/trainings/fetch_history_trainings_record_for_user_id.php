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
   
    $query_full_data  = "SELECT `id`, excersise.training_id as 'training_id', `excersise_id`, `user_id`, `weight`, `series`, `repetitions`, `DT`, `created_at`,  training.name as 'training', excersise.name as 'excersise'
        FROM `training_record` 
        INNER JOIN excersise
        ON training_record.excersise_id = excersise.e_id
        INNER JOIN training
        On training.t_id = excersise.training_id
        WHERE user_id='$user_id' ORDER BY created_at desc, training, excersise_id";

  
    $full_data = mysqli_query($db_conn, $query_full_data);
    $rows_full_data = mysqli_num_rows($full_data);


    if($rows_full_data > 0)
    {
       
        $full_data = mysqli_fetch_all($full_data, MYSQLI_ASSOC);
        
        $unique_arr = array_unique(array_column($full_data, 'created_at'));

        #get all uniqe trainings 
        $training_history_record = array_intersect_key($full_data , $unique_arr);

        $trainings = []; 

        $index1=0;
        foreach ($training_history_record as $key1 => $value1) {

            $excersises;

            $trainings[$index1]['id'] = $value1['id'];
            $trainings[$index1]['training_id'] = $value1['training_id'];
            $trainings[$index1]['name'] = $value1['training'];
            $trainings[$index1]['DT'] = $value1['DT'];
            $trainings[$index1]['created_at'] = $value1['created_at'];
            $trainings[$index1]['excersises'] = [];


            foreach ($full_data as $key2 => $value2) {
                if($value2['created_at'] === $value1['created_at']){

                    //array_push($trainings[$index1]['excersises'], $value2);
                    $new_value = [];
                    $new_value['id'] = $value2['id'];
                    $new_value += ['excersise_id' => $value2['excersise_id']];
                    $new_value += ['name' => $value2['excersise']];
                    $new_value += ['series' => $value2['series']];
                    $new_value += ['weight' => $value2['weight']];
                    $new_value += ['repetitions' => $value2['repetitions']];
                    $trainings[$index1]['excersises'][] = $new_value;

                }
                
            }

            $index1++;
        }

       echo json_encode(["success"=>1,"data"=>$trainings]);

    } else { echo json_encode(["success"=>0,"msg"=>"No trainings available, please add new record."]);    }
} else {
    echo json_encode(["success"=>0,"msg"=>"Something went wrong, please try again"]); }


?>