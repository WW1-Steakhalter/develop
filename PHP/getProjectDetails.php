<?php
header('Content-Type: application/json');
$host = "sql306.infinityfree.com";
$user = "if0_39043228";
$pass = "sF94uEqmEKO8bn";
$dbname = "if0_39043228_developdb";

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    echo json_encode(["error" => "DB-Verbindung fehlgeschlagen"]);
    exit;
}
$conn->set_charset("utf8mb4");

$projektname = $_GET['projektname'] ?? '';
if (empty($projektname)) {
    echo json_encode(["error" => "Kein Projektname übergeben"]);
    exit;
}

// Query nur mit INNER JOIN auf tatsächliche Daten in mitarbeiter/shk
$sql = "
SELECT 
    m.name AS name,
    'fest' AS typ,
    IFNULL(m.gesamtsumme, 0) AS kosten
FROM projekte p
JOIN projekt_mitarbeiter pm ON p.projekt_id = pm.projekt_id
JOIN mitarbeiter m ON pm.mitarbeiter_id = m.mitarbeiter_id
WHERE p.name = ? AND pm.typ = 'fest'

UNION ALL

SELECT 
    s.name AS name,
    'shk' AS typ,
    IFNULL(s.shkEmployeeSum, 0) AS kosten
FROM projekte p
JOIN projekt_mitarbeiter pm ON p.projekt_id = pm.projekt_id
JOIN shk s ON pm.mitarbeiter_id = s.mitarbeiter_id
WHERE p.name = ? AND pm.typ = 'shk'
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $projektname, $projektname);
$stmt->execute();
$result = $stmt->get_result();

$daten = [];
while ($row = $result->fetch_assoc()) {
    $daten[] = $row;
}
echo json_encode($daten);
$conn->close();
