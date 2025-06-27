<?php
header('Content-Type: application/json; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);

// DB-Zugangsdaten
$host = "sql306.infinityfree.com";
$user = "if0_39043228";
$pass = "sF94uEqmEKO8bn";
$dbname = "if0_39043228_developdb";

// Verbindung herstellen
$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    echo json_encode(["error" => "Verbindung fehlgeschlagen", "details" => $conn->connect_error]);
    exit;
}
$conn->set_charset("utf8mb4");

// ========== Mitarbeiter laden ==========
$mitarbeiter = [];
$mitarbeiterSQL = "
    SELECT 
        id, name, mitarbeiter_id, entgeltgruppe,
        `2024_bis_10_2024`, `2024_ab_11_2024`, `2025`, `2026`, `2027`,
        wochenstunden, brutto_bis_10_2024, brutto_ab_11_2024,
        brutto_2025, brutto_2026, brutto_2027,
        jsz_2024_bis_10_2024, jsz_2024_ab_11_2024, jsz_2025, jsz_2026, jsz_2027,
        js_bis_10_2024, js_ab_11_2024, js_2025, js_2026, js_2027,
        gesamtsumme
    FROM mitarbeiter
";
$resultM = $conn->query($mitarbeiterSQL);
if ($resultM === false) {
    echo json_encode(["error" => "Fehler bei Mitarbeiter-Abfrage", "details" => $conn->error]);
    exit;
}
while ($row = $resultM->fetch_assoc()) {
    $row["typ"] = "Mitarbeiter";
    $mitarbeiter[] = $row;
}

// ========== SHK laden ==========
$shk = [];
$shkSQL = "
    SELECT 
        id, name, mitarbeiter_id, workingType02, salary, 
        month2024, month2025, month2026, month2027,
        hoursPerWeek, yearSum2024, yearSum2025, yearSum2026, yearSum2027,
        shkEmployeeSum
    FROM shk
";
$resultS = $conn->query($shkSQL);
if ($resultS === false) {
    echo json_encode(["error" => "Fehler bei SHK-Abfrage", "details" => $conn->error]);
    exit;
}
while ($row = $resultS->fetch_assoc()) {
    $row["typ"] = "SHK";
    $shk[] = $row;
}

// Verbindung schließen
$conn->close();

// ========== Ausgabe ==========
echo json_encode([
    "status" => "ok",
    "timestamp" => date("Y-m-d H:i:s"),
    "mitarbeiter" => $mitarbeiter,
    "shk" => $shk
]);
exit;
?>
