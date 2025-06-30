<?php
header('Content-Type: application/json; charset=utf-8');
$host = "sql306.infinityfree.com";
$user = "if0_39043228";
$pass = "sF94uEqmEKO8bn";
$dbname = "if0_39043228_developdb";

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "DB-Verbindung fehlgeschlagen"]);
    exit;
}

$mitarbeiter_id = intval($_POST["mitarbeiter_id"] ?? 0);
$projekt_id = intval($_POST["projekt_id"] ?? 0);

file_put_contents("debug.log", "mitarbeiter_id: $mitarbeiter_id, projekt_id: $projekt_id\n", FILE_APPEND);


if (!$mitarbeiter_id || !$projekt_id) {
    echo json_encode(["success" => false, "message" => "Ungültige Parameter"]);
    exit;
}

$sql = "INSERT INTO projekt_mitarbeiter (projekt_id, mitarbeiter_id) VALUES ($projekt_id, $mitarbeiter_id)";
if ($conn->query($sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => $conn->error]);
}

$conn->close();
