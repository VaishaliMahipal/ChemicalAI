<?php
  // Get the data from the POST request
  $data = json_decode(file_get_contents("php://input"), true);

  // Create a new file and write the data to it
  $filename = "data.json";
  $file = fopen($filename, "w");
  fwrite($file, json_encode($data));
  fclose($file);

  // Send a response back to the client
  $response = array("status" => "success");
  echo json_encode($response);
?>
