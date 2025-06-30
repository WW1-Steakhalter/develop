<?php
header('Content-Type: application/json; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);

$host = "sql306.infinityfree.com";
$user = "if0_39043228";
$pass = "sF94uEqmEKO8bn";
$dbname = "if0_39043228_developdb";

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Datenbankfehler"]);
    exit;
}

$projektname = $conn->real_escape_string($_POST["projektname"] ?? "");

if (!$projektname) {
    echo json_encode(["success" => false, "message" => "Kein Projektname übergeben"]);
    exit;
}

// Hole die projekt_id anhand des Namens
$res = $conn->query("SELECT projekt_id FROM projekte WHERE name = '$projektname'");
if (!$res || $res->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "Projekt nicht gefunden"]);
    exit;
}
$row = $res->fetch_assoc();
$projekt_id = (int)$row["projekt_id"];

// 1. Projekt löschen
$deleteProjekt = $conn->query("DELETE FROM projekte WHERE projekt_id = $projekt_id");
if (!$deleteProjekt) {
    echo json_encode(["success" => false, "message" => "Fehler beim Löschen aus projekte", "sql_error" => $conn->error]);
    $conn->close();
    exit;
}

// 2. Mitarbeiter-Zuweisungen löschen
$deleteMitarbeiter = $conn->query("DELETE FROM projekt_mitarbeiter WHERE projekt_id = $projekt_id");
if (!$deleteMitarbeiter) {
    echo json_encode(["success" => false, "message" => "Fehler beim Löschen aus projekt_mitarbeiter", "sql_error" => $conn->error]);
    $conn->close();
    exit;
}

echo json_encode(["success" => true]);
$conn->close();

