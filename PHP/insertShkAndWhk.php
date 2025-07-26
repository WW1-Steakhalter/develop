<?php

global $stmt;
error_reporting(E_ALL);
ini_set("display_errors", 1);
// Header setzen, um Caching zu verhindern
header("Cache-Control: no-cache, must-revalidate");
header("Expires: 0");

$host = "sql306.infinityfree.com";
$user = "if0_39043228";
$pass = "sF94uEqmEKO8bn";
$dbname = "if0_39043228_developdb";

function getVal($key)
{
    return isset($_POST[$key]) && $_POST[$key] != "" ? $_POST[$key] : null;
}

$name = getVal('name');
$mitarbeiter_id = getVal('mitarbeiter_id');
$type = getVal('workingType02');
$salary = getVal('salary');
$month2024 = getVal('month2024');
$month2025 = getVal('month2025');
$month2026 = getVal('month2026');
$month2027 = getVal('month2027');
$hoursPerWeek = getVal('hoursPerWeek');
$yearSum2024 = getVal('yearSum2024');
$yearSum2025 = getVal("yearSum2025");
$yearSum2026 = getVal("yearSum2026");
$yearSum2027 = getVal("yearSum2027");
$shkEmployeeSum = getVal("shkEmployeeSum");

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die(" Verbindung fehlgeschlagen: " . $conn->connect_error);
}

$conn->set_charset("utf8mb4");

$sql = "INSERT INTO shk (
    name, mitarbeiter_id, workingType02,
    salary, month2024, month2025, month2026, month2027,
    hoursPerWeek,
    yearSum2024, yearSum2025, yearSum2026, yearSum2027,
    shkEmployeeSum
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    die("❌ Prepare fehlgeschlagen: " . $conn->error);
}


$stmt->bind_param(
    "sssddddddddddd",
    $name, $mitarbeiter_id, $type,
    $salary, $month2024, $month2025, $month2026, $month2027,
    $hoursPerWeek,
    $yearSum2024, $yearSum2025, $yearSum2026, $yearSum2027,
    $shkEmployeeSum
);

if ($stmt->execute()) {
    echo " Datensatz erfolgreich gespeichert";
} else {
    echo " Fehler beim Einfügen: " . $stmt->error;
}

$stmt->close();
$conn->close();