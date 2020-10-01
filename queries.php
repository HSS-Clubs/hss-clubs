<?php
$conn = mysqli_connect("localhost:3306", "root", "", "virtualfair");
// $recieve = json_decode(file_get_contents('php://input'), true);
// $state = $recieve["state"];
// $state = $_POST["state"];
$type = $_POST['type'];

$parameters = $_POST['parameters'];
if (isset($parameters["idverify"])){
    $idtoken = $parameters["idverify"];
    $verifyUrl = "https://oauth2.googleapis.com/tokeninfo?id_token=" . substr($idtoken, 1, strlen($idtoken) - 1);  
        $json = file_get_contents($verifyUrl);
    if ($json !== false) {
        $obj = json_decode($json);
        $verifiedEmail = $obj->email_verified;
}  
}



if($type=="clubLogIn"){
    $email = $parameters["email"];
    $password = $parameters["password"];
    $stmt = $conn->prepare("SELECT clubID, cpassword FROM clubs WHERE cemail = ?");
    $stmt->bind_param("s",$parameters["email"]);    
    $stmt->execute();
    $result = $stmt->get_result();
    // $result = mysqli_query($conn, "SELECT clubID, cpassword FROM clubs WHERE cemail = '" . $parameters["email"] . "'");
    while($row = $result->fetch_assoc()) {
        $passwordValid = $row['cpassword'];
        $clubId = $row["clubID"];
      }
    if($passwordValid==$password){
        echo "valid".$clubId;   
    }
    else{
        echo "INVALID BUDDY";
    }
}
else if($type=="getMemberList"){
    $clubID = $parameters["clubId"];
    $stmt = $conn->prepare("SELECT students.name,students.email FROM students INNER JOIN registrations ON students.studentID=registrations.studentID WHERE registrations.clubID=?");
    $stmt->bind_param("i",$clubID);    
    $stmt->execute();
    $result = $stmt->get_result();
    // $result = mysqli_query($conn, "SELECT students.name,students.email FROM students INNER JOIN registrations ON students.studentID=registrations.studentID WHERE registrations.clubID='".$clubID."'");
    $data = array();
    while($row = $result->fetch_assoc()) {
        $event = (object) [
        'name' => $row["name"],
        'email' => $row["email"]
        ];
        array_push($data, $event);
    }
    echo json_encode($data);
}
else if($type=="getClubDetails"){
    $clubID = $parameters["clubId"];
    $stmt = $conn->prepare("SELECT * FROM clubs WHERE clubID = ?");
    $stmt->bind_param("i",$clubID);    
    $stmt->execute();
    $result = $stmt->get_result();
    // $result = mysqli_query($conn, "SELECT * FROM clubs WHERE clubID = '" . $clubID . "'");
    $data = array();
    while($row = $result->fetch_assoc()) {
        $event = (object) [
        'name' => $row["cname"],
        'genre' => $row["cgenre"],
        'vhours' => $row["volunteering"],
        'advisor' => $row["cadvisor"],
        'bio' => $row["cbio"],
        'officers' => $row["cofficers"],
        'website' => $row["website"],
        'classroom' => $row["ccode"],
        ];
        array_push($data, $event);
    }
    echo json_encode($data);
}
else if($type=="updateClub"){
    $clubID = $parameters["clubId"];
    $name = $parameters["formData"]["name"];
    $genre = $parameters["formData"]["genre"];
    $advisor = $parameters["formData"]["advisor"];
    $volunteer = $parameters["formData"]["volunteer"];
    $bio = $parameters["formData"]["bio"];
    $officers = $parameters["formData"]["officers"];
    $website = $parameters["formData"]["website"];
    $club = $parameters["formData"]["code"];
    $stmt = $conn->prepare("UPDATE clubs SET cname = ?, cbio= ?, ccode= ?, cofficers= ?, cadvisor= ?,
     cgenre= ?, volunteering= ?, website= ? WHERE clubID = ?");
    $stmt->bind_param("ssssssssi",$name,$bio,$club,$officers,$advisor,$genre,$volunteer,$website,$clubID);    
    $stmt->execute();
    $result = $stmt->get_result();    
    // mysqli_query($conn, "UPDATE clubs SET cname = '". $name . "', cbio= '". $bio . "', ccode= '". $club . "', cofficers= '". $officers . "', cadvisor= '". $advisor . "', cgenre= '". $genre . "', volunteering= '". $volunteer . "', website= '". $website . "' WHERE clubID = '".$clubID."';");
    

}
//Student Page
else if ($verifiedEmail == true) {
    if ($type == "allClubs") {
        // "SELECT * from clubs WHERE clubID not in ( SELECT clubID from registrations WHERE studentID='" . $parameters["userID"] . "')"
        $stmt = $conn->prepare("SELECT *,'y' isMember from clubs WHERE clubID in ( SELECT clubID from registrations WHERE studentID=?)
        UNION ALL SELECT *,'n' isMember from clubs WHERE clubID not in ( SELECT clubID from registrations WHERE studentID=?)");
        $stmt->bind_param("ii",$parameters["userID"],$parameters["userID"]);    
        $stmt->execute();
        $result = $stmt->get_result();
        // $result = mysqli_query($conn, "SELECT *,'y' isMember from clubs WHERE clubID in ( SELECT clubID from registrations WHERE studentID='" . $parameters["userID"] . "')
        // UNION ALL SELECT *,'n' isMember from clubs WHERE clubID not in ( SELECT clubID from registrations WHERE studentID='" . $parameters["userID"] . "')" );
        $data = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $event = (object) [
                'id' => $row["clubID"],
                'name' => $row["cname"],
                'bio' => $row["cbio"],
                'volunteer' => $row["volunteering"],
                'link' => $row["ccode"],
                'advisor' => $row["cadvisor"],
                'email' => $row["cemail"],
                'genre' => $row["cgenre"],
                'website' => $row["website"],
                'isMember' => $row["isMember"]
            ];
            array_push($data, $event);
        }

        echo json_encode($data);
    }
    else if($type=="getUserClubs"){
        $stmt = $conn->prepare("SELECT * from clubs WHERE clubID in ( SELECT clubID from registrations WHERE studentID=?)");
        $stmt->bind_param("i",$parameters["userID"]);    
        $stmt->execute();
        $result = $stmt->get_result();
        // $result = mysqli_query($conn, "SELECT * from clubs WHERE clubID in ( SELECT clubID from registrations WHERE studentID='" . $parameters["userID"] . "')");
        $data = array();
        if ($result->num_rows == 0) {
            echo ("empty");
        }   
        else{
        while ($row = mysqli_fetch_assoc($result)) {
            $event = (object) [
                'id' => $row["clubID"],
                'name' => $row["cname"],
                'bio' => $row["cbio"],
                'volunteer' => $row["volunteering"],
                'link' => $row["ccode"],
                'advisor' => $row["cadvisor"],
                'email' => $row["cemail"],
                'genre' => $row["cgenre"],
                'website' => $row["website"]
            ];
            array_push($data, $event);
        }

        echo json_encode($data);
        }
    } 
    else if ($type == "userLogIn") {
        $data = array();
        $stmt = $conn->prepare("SELECT * FROM students WHERE email = ?");
        $stmt->bind_param("s",$parameters["email"]);    
        $stmt->execute();
        $result = $stmt->get_result();
        // $result = mysqli_query($conn, "SELECT * FROM students WHERE email = '" . $parameters["email"] . "'");

        if ($result->num_rows == 1) {
            while ($row = mysqli_fetch_assoc($result)) {
                $event = (object) [
                    'id' => $row["studentID"],
                ];
                array_push($data, $event);
                echo json_encode($data);
            }
        } else {
            $stmt = $conn->prepare("INSERT INTO students (name, email) VALUES (?,?)");
            $stmt->bind_param("ss",$parameters["name"],$parameters["email"]);    
            $stmt->execute();
            $result2 = $stmt->get_result();
            // $result2 = mysqli_query($conn, "INSERT INTO students (name, email) VALUES ('" . $parameters["name"] . "','" . $parameters["email"] . "')");
            $stmt = $conn->prepare("SELECT * FROM students WHERE email =?");
            $stmt->bind_param("s",$parameters["email"]);    
            $stmt->execute();
            $result3 = $stmt->get_result();
            // $result3 = mysqli_query($conn, "SELECT * FROM students WHERE email = '" . $parameters["email"] . "'");
                while ($row = mysqli_fetch_assoc($result3)) {
                    $event = (object) [
                        'id' => $row["studentID"],
                    ];
                    array_push($data, $event);                        
                }
                echo json_encode($data);
        }
    }
    else if($type == "userJoinClub"){
        $stmt = $conn->prepare("INSERT INTO registrations (studentID, clubID) VALUES (?,?)");
        $stmt->bind_param("ii",$parameters["userID"],$parameters["clubID"]);    
        $stmt->execute();
        $result = $stmt->get_result();
        // $result = mysqli_query($conn, "INSERT INTO registrations (studentID, clubID) VALUES ('" . $parameters["userID"] . "','" . $parameters["clubID"] . "')");
    }
    else if($type == "userLeaveClub"){
        $stmt = $conn->prepare("DELETE FROM registrations WHERE studentID = ? AND clubID=?");
        $stmt->bind_param("ii",$parameters["userID"],$parameters["clubID"]);    
        $stmt->execute();
        $result = $stmt->get_result();
        // $result = mysqli_query($conn, "DELETE FROM registrations WHERE studentID = '" . $parameters["userID"] . "' AND clubID='" . $parameters["clubID"] . "'");
    }
    
     else if ($type == "addClub") {
        echo "addCLub called";
        // echo ($parameters);
    }
    
} else {
    echo ("invalid login");
}