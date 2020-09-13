<?php

$conn = mysqli_connect("localhost:3306","root","","virtualfair");
// $recieve = json_decode(file_get_contents('php://input'), true);
// $state = $recieve["state"];
// $state = $_POST["state"];
$result = mysqli_query($conn, "SELECT * FROM clubs");

$data = array();
while($row = mysqli_fetch_assoc($result))
{
    $event = (object) [
        'name' => $row["cname"],
        'bio' => $row["cbio"],
        'link' => $row["clink"],
        'advisor' => $row["cadvisor"],
        'website' => $row["website"]
        
    ];
    array_push($data ,$event);
}

echo json_encode($data);

?>