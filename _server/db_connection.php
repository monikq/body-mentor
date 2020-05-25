<?php

	$username = 'root';
    $password = '';
    $databasename = 'body-mentor';
    $servername = 'localhost';
    $port = 3308;


	$db_conn = new mysqli($servername, $username, $password, $databasename, $port);

	// Check connection
	if ($db_conn -> connect_errno) {
	  //echo "Failed to connect to MySQL: " . $db_conn -> connect_error;
	  echo json_encode(["success"=>0,"msg"=>"Failed to connect to MySQL: " . $db_conn -> connect_error]);
	  exit();
	}

?>
