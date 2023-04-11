

<?php
// read json file
$data = file_get_contents('captureInfodata.json');

// decode json
$json_arr = json_decode($data, true);

$data2 = json_decode(file_get_contents("php://input"), true);

// add data
$json_arr[] = $data2;

// encode json and save to file
file_put_contents('captureInfodata2.json', json_encode($json_arr));
?>