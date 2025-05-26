<?php
// Fehleranzeige aktivieren
global $stmt;
error_reporting(E_ALL);
ini_set("display_errors", 1);
// Header setzen, um Caching zu verhindern
header("Cache-Control: no-cache, must-revalidate");
header("Expires: 0");

// Verbindung zur Datenbank
$host = "sql306.infinityfree.com";
$user = "if0_39043228";
$pass = "sF94uEqmEKO8bn";
$dbname = "if0_39043228_developdb";

// POST-Hilfsfunktion
function getVal($key)
{
    return isset($_POST[$key]) && $_POST[$key] != "" ? $_POST[$key] : null;
}

// POST-Werte abholen
$name = getVal('name');
$mitarbeiter_id = getVal('mitarbeiter_id');
$entgeltgruppe = getVal('entgeltgruppe');
echo $entgeltgruppe;
$j2024a = getVal('2024_bis_10_2024');
$j2024b = getVal('2024_ab_11_2024');
$j2025 = getVal('2025');
$j2026 = getVal('2026');
$j2027 = getVal('2027');
$wochenstunden = getVal('wochenstunden');
$brutto10 = getVal('brutto_bis_10_2024');
$brutto11 = getVal('brutto_ab_11_2024');
$brutto25 = getVal('brutto_2025');
$brutto26 = getVal('brutto_2026');
$brutto27 = getVal('brutto_2027');
$jsz10 = getVal('jsz_2024_bis_10_2024');
$jsz11 = getVal('jsz_2024_ab_11_2024');
$jsz25 = getVal('jsz_2025');
$jsz26 = getVal('jsz_2026');
$jsz27 = getVal('jsz_2027');
$js10 = getVal('js_bis_10_2024');
$js11 = getVal('js_ab_11_2024');
$js25 = getVal('js_2025');
$js26 = getVal('js_2026');
$js27 = getVal('js_2027');
$gesamt = getVal('gesamtsumme');

// Verbindung aufbauen
$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die(" Verbindung fehlgeschlagen: " . $conn->connect_error);
}

// SQL vorbereiten
$sql = "INSERT INTO mitarbeiter (
    name, mitarbeiter_id, entgeltgruppe,
    `2024_bis_10_2024`, `2024_ab_11_2024`, `2025`, `2026`, `2027`,
    wochenstunden,
    brutto_bis_10_2024, brutto_ab_11_2024, brutto_2025, brutto_2026, brutto_2027,
    jsz_2024_bis_10_2024, jsz_2024_ab_11_2024, jsz_2025, jsz_2026, jsz_2027,
    js_bis_10_2024, js_ab_11_2024, js_2025, js_2026, js_2027,
    gesamtsumme
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";


$stmt = $conn->prepare($sql);
if (!$stmt) {
    die("❌ Prepare fehlgeschlagen: " . $conn->error);
}

// Parameter binden
$stmt->bind_param(
    "sssdddddddddddddddddddddd",
    $name, $mitarbeiter_id, $entgeltgruppe,
    $j2024a, $j2024b, $j2025, $j2026, $j2027,
    $wochenstunden,
    $brutto10, $brutto11, $brutto25, $brutto26, $brutto27,
    $jsz10, $jsz11, $jsz25, $jsz26, $jsz27,
    $js10, $js11, $js25, $js26, $js27,
    $gesamt
);

// Ausführen & Erfolg prüfen
if ($stmt->execute()) {
    echo " Datensatz erfolgreich gespeichert";
} else {
    echo " Fehler beim Einfügen: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
