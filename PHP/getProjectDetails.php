<?php
header('Content-Type: application/json');

$host = "sql306.infinityfree.com";
$user = "if0_39043228";
$pass = "sF94uEqmEKO8bn";
$dbname = "if0_39043228_developdb";

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

// Hole projekt_id zum Projektname
$stmt = $conn->prepare("SELECT projekt_id FROM projekte WHERE name = ?");
$stmt->bind_param("s", $projektname);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
if (!$row) {
    echo json_encode(["error" => "Projekt nicht gefunden"]);
    exit;
}
$projekt_id = $row['projekt_id'];

// Hauptabfrage: Mitarbeiter und SHKs mit Summen
$sql = "
SELECT 
    m.mitarbeiter_id,
    m.name AS name,
    'fest' AS typ,
    IFNULL(m.gesamtsumme, 0) AS kosten
FROM projekt_mitarbeiter pm
JOIN mitarbeiter m ON pm.mitarbeiter_id = m.mitarbeiter_id
WHERE pm.projekt_id = ? AND pm.typ = 'fest'

UNION ALL

SELECT 
    s.mitarbeiter_id,
    s.name AS name,
    'shk' AS typ,
    IFNULL(s.shkEmployeeSum, 0) AS kosten
FROM projekt_mitarbeiter pm
JOIN shk s ON pm.mitarbeiter_id = s.mitarbeiter_id
WHERE pm.projekt_id = ? AND pm.typ = 'shk'
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $projekt_id, $projekt_id);
$stmt->execute();
$result = $stmt->get_result();

$daten = [];
while ($row = $result->fetch_assoc()) {
    // Falls kosten NULL sind, schreibe Debug-Eintrag
    if ($row["kosten"] == 0) {
        file_put_contents("kosten_debug.log", "⚠️ Mitarbeiter {$row['name']} ({$row['typ']}) hat 0 € Kosten.\n", FILE_APPEND);
    }
    $daten[] = $row;
}

echo json_encode($daten, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
$conn->close();
?>
