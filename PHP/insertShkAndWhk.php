<?php
header("Content-Type: application/json; charset=utf-8");
error_reporting(E_ALL);
ini_set("display_errors", 1);

$host = "sql306.infinityfree.com";
$user = "if0_39043228";
$pass = "sF94uEqmEKO8bn";
$dbname = "if0_39043228_developdb";

function getVal($key)
{
    return isset($_POST[$key]) && $_POST[$key] !== "" ? $_POST[$key] : null;
}

$name = getVal('name');
$mitarbeiter_id = getVal('mitarbeiter_id');
$workingType = getVal('workingType02');
$salary = getVal('salary');
$month2024 = getVal('month2024');
$month2025 = getVal('month2025');
$month2026 = getVal('month2026');
$month2027 = getVal('month2027');
$hoursPerWeek = getVal('hoursPerWeek');
$yearSum2024 = getVal('yearSum2024');
$yearSum2025 = getVal('yearSum2025');
$yearSum2026 = getVal('yearSum2026');
$yearSum2027 = getVal('yearSum2027');
$shkEmployeeSum = getVal('shkEmployeeSum');
$projekt_id = getVal('projekt_id'); // 🔥 WICHTIG: Kommt vom JS beim Speichern im Modal!

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Verbindung fehlgeschlagen: " . $conn->connect_error]);
    exit;
}
$conn->set_charset("utf8mb4");

// Schritt 1: SHK in Tabelle einfügen
$sql = "INSERT INTO shk (
    name, mitarbeiter_id, workingType02,
    salary, month2024, month2025, month2026, month2027,
    hoursPerWeek, yearSum2024, yearSum2025, yearSum2026, yearSum2027,
    shkEmployeeSum
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["success" => false, "message" => "Prepare fehlgeschlagen: " . $conn->error]);
    exit;
}

$stmt->bind_param(
    "sssddddddddddd",
    $name, $mitarbeiter_id, $workingType,
    $salary, $month2024, $month2025, $month2026, $month2027,
    $hoursPerWeek,
    $yearSum2024, $yearSum2025, $yearSum2026, $yearSum2027,
    $shkEmployeeSum
);

if (!$stmt->execute()) {
    echo json_encode(["success" => false, "message" => "Insert fehlgeschlagen: " . $stmt->error]);
    $stmt->close();
    $conn->close();
    exit;
}
$stmt->close();

// Schritt 2: Projektzuordnung vornehmen, wenn projekt_id vorhanden
if ($projekt_id) {
    $typ = "shk";
    $linkStmt = $conn->prepare("INSERT INTO projekt_mitarbeiter (projekt_id, mitarbeiter_id, typ) VALUES (?, ?, ?)");
    if (!$linkStmt) {
        echo json_encode(["success" => false, "message" => "Verknüpfung prepare fehlgeschlagen: " . $conn->error]);
        $conn->close();
        exit;
    }
    $linkStmt->bind_param("iis", $projekt_id, $mitarbeiter_id, $typ);
    if (!$linkStmt->execute()) {
        echo json_encode(["success" => false, "message" => "Verknüpfung fehlgeschlagen: " . $linkStmt->error]);
        $linkStmt->close();
        $conn->close();
        exit;
    }
    $linkStmt->close();
}

echo json_encode(["success" => true, "message" => "SHK gespeichert und mit Projekt verknüpft."]);
$conn->close();
