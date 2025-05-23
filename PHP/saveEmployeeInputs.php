<?php

$host = "sql306.infinityfree.com";
$user = "if0_39043228";
$pass = "DEIN_PASSWORT";
$dbname = "if0_39043228_developdb";

$name = getVal('name');
$mitarbeiter_id = getVal('mitarbeiter_id');
$entgeltgruppe = getVal('entgeltgruppe');
$j2024a = getVal('jahr_2024_bis10');
$j2024b = getVal('2024_ab_11/2024');
$j2025 = getVal('2025');
$j2026 = getVal('2026');
$j2027 = getVal('2027');
$wochenstunden = getVal('wochenstunden');
$brutto10 = getVal('brutto_bis_10/2024');
$brutto11 = getVal('brutto_ab_11/2024');
$brutto25 = getVal('brutto_2025');
$brutto26 = getVal('brutto_2026');
$brutto27 = getVal('brutto_2027');
$js10 = getVal('js_bis_10/2024');
$js11 = getVal('js_ab_11/2024');
$js25 = getVal('js_2025');
$js26 = getVal('js_2026');
$js27 = getVal('js_2027');
$gesamt = getVal('gesamtsumme');


$connectionToDb = new mysqli($host, $user, $pass, $dbname);
if ($connectionToDb->connect_error) {
    die("Connection failed: " . $connectionToDb->connect_error);
}

function getVal($key)
{
    return isset($_POST[$key]) && $_POST[$key] != "" ? $_POST[$key] : null;
}

$sql = "INSERT INTO mitarbeiter (
    name, mitarbeiter_id, entgeltgruppe,
    jahr_2024_bis_10, `2024_ab_11_2024`, `2025`, `2026`, `2027`,
    wochenstunden,
    `brutto_bis_10_2024`, `brutto_ab_11_2024`, brutto_2025, brutto_2026, brutto_2027,
    `js_bis_10_2024`, `js_ab_11_2024`, js_2025, js_2026, js_2027,
    gesamtsumme
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";


$stmt = $connectionToDb->prepare($sql);
$stmt->bind_param(
    "sssdddddddddddddddd",
    $name, $mitarbeiter_id, $entgeltgruppe,
    $j2024a, $j2024b, $j2025, $j2026, $j2027,
    $wochenstunden,
    $brutto10, $brutto11, $brutto25, $brutto26, $brutto27,
    $js10, $js11, $js25, $js26, $js27,
    $gesamt
);

$stmt->close();
$connectionToDb->close();

?>