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

$sql = "
SELECT 
    CASE 
        WHEN pm.typ = 'fest' THEN mitarbeiter.name
        WHEN pm.typ = 'shk' THEN shk.name
        ELSE NULL
    END AS name,
    
    pm.typ,
    
    CASE 
        WHEN pm.typ = 'fest' THEN IFNULL(mitarbeiter.gesamtsumme, 0)
        WHEN pm.typ = 'shk' THEN IFNULL(shk.shkEmployeeSum, 0)
        ELSE 0
    END AS kosten
FROM projekte p
JOIN projekt_mitarbeiter pm ON p.projekt_id = pm.projekt_id
LEFT JOIN mitarbeiter ON pm.mitarbeiter_id = mitarbeiter.mitarbeiter_id
LEFT JOIN shk ON pm.mitarbeiter_id = shk.mitarbeiter_id
WHERE p.name = ?
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $projektname);
$stmt->execute();
$result = $stmt->get_result();

$daten = [];
while ($row = $result->fetch_assoc()) {
    $daten[] = $row;
}
echo json_encode($daten);
$conn->close();
?>
