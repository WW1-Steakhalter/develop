<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set("display_errors", 1);
header("Cache-Control: no-cache, must-revalidate");
header("Expires: 0");

$host = "sql306.infinityfree.com";
$user = "if0_39043228";
$pass = "sF94uEqmEKO8bn";
$dbname = "if0_39043228_developdb";

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    echo json_encode(["error" => "Verbindung fehlgeschlagen"]);
    exit;
}

$conn->set_charset("utf8mb4");

$sql = "
SELECT 
    p.name AS projektname,
    SUM(
        CASE 
            WHEN pm.typ = 'shk' THEN IFNULL(s.shkEmployeeSum, 0)
            WHEN pm.typ = 'fest' THEN IFNULL(m.gesamtsumme, 0)
            ELSE 0
        END
    ) AS gesamtkosten
FROM projekte p
LEFT JOIN projekt_mitarbeiter pm ON p.projekt_id = pm.projekt_id
LEFT JOIN shk s ON pm.mitarbeiter_id = s.mitarbeiter_id
LEFT JOIN mitarbeiter m ON pm.mitarbeiter_id = m.mitarbeiter_id
GROUP BY p.projekt_id
ORDER BY p.name ASC
";


$result = $conn->query($sql);

$daten = [];
while ($row = $result->fetch_assoc()) {
    $daten[] = $row;
}

echo json_encode($daten);
$conn->close();
?>
