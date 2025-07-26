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
$typ = $_POST["typ"] ?? "fest"; // fallback falls nicht übergeben

// Debug-Log
file_put_contents("debug.log", "mitarbeiter_id: $mitarbeiter_id, projekt_id: $projekt_id, typ: $typ\n", FILE_APPEND);

// Validierung
if (!$mitarbeiter_id || !$projekt_id) {
    echo json_encode(["success" => false, "message" => "Ungültige Parameter"]);
    exit;
}

// Optional: vorher prüfen, ob bereits zugewiesen
$checkSql = "SELECT * FROM projekt_mitarbeiter WHERE mitarbeiter_id = ? AND projekt_id = ?";
$checkStmt = $conn->prepare($checkSql);
$checkStmt->bind_param("ii", $mitarbeiter_id, $projekt_id);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();

if ($checkResult->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Mitarbeiter ist bereits diesem Projekt zugeordnet."]);
    exit;
}

// Einfügen mit typ
$sql = "INSERT INTO projekt_mitarbeiter (projekt_id, mitarbeiter_id, typ) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iis", $projekt_id, $mitarbeiter_id, $typ);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => $stmt->error]);
}

$conn->close();
?>
