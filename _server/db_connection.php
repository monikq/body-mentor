<?php

	$username = 'root';
    $password = '';
    $databasename = 'react-demo-auth';
    $servername = 'localhost';
    $port = 3308;


	$db_connection = new mysqli($servername, $username, $password, $databasename, $port);

	// Check connection
	if ($db_connection -> connect_errno) {
	  echo "Failed to connect to MySQL: " . $db_connection -> connect_error;
	  exit();
	}

?>
