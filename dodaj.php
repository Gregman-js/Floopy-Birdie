<?php
session_start();
$return = Array();
$return["done"] = true;
if(isset($_POST["imie"]) && isset($_POST["rek"])){
	$return["dane"] = true;
	if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
    $ip = $_SERVER['HTTP_CLIENT_IP'];
} else if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
} else {
    $ip = $_SERVER['REMOTE_ADDR'];
}

$record = $_POST["rek"];
$imie = $_POST["imie"];

if(strlen($imie) > 17){
	$imie = substr($imie, 0, 17)."...";
}
if($record>99)$record = 99;


$imie = htmlentities($imie, ENT_QUOTES, "UTF-8");
$record = htmlentities($record, ENT_QUOTES, "UTF-8");
	require_once "connect.php"; //dodanie pliku
	
	$polaczenie = @new mysqli($host, $db_user, $db_password, $db_name); //ustanowienie polaczenia @ dajemy jesl nie chcemy komunikatu
	
	if ($polaczenie->connect_errno!=0) // jesli przyslany error nie jest zerowy
	{
		$return["done"] = false;
	}
	else
	{
		
	if($rezultat = @$polaczenie->query("SELECT * FROM run WHERE id='1'")){
		$ilu_userow = $rezultat->num_rows;
		if($ilu_userow>0)
		{
			$wiersz = $rezultat->fetch_assoc(); /*wklada do wiersza tablice[] z danymi z rekordu, zamiast numerow tablicy sa nazwy kolumn*/
			if($wiersz['active'] == 0){
				$return["done"] = false;
				$return["opis"] = "Bazy danych zostały wyłączone";
				header('Location: index.php');
		exit();
			}
			$rezultat->close(); // zerujemy tablice sa niepotrzebne
			
		}
	}
		
		
		for($i = 3; $i >=1; $i--){
	if($rezultat = @$polaczenie->query("SELECT * FROM record WHERE id='$i'")){
			$wiersz = $rezultat->fetch_assoc(); /*wklada do wiersza tablice[] z danymi z rekordu, zamiast numerow tablicy sa nazwy kolumn*/
			$rek = $wiersz['rekord'];
			$stare = $wiersz['nazwa'];
			$ipstare = $wiersz['ip'];
			$rezultat->close(); // zerujemy tablice sa niepotrzebne
	}//DELETE FROM `record` WHERE `record`.`id` = 3
if($rek < $record){
	if($i==3){
	if ($polaczenie->query(sprintf("UPDATE `record` SET `rekord` = '%s', `nazwa` = '%s', `ip` = '%s' WHERE `record`.`id` = $i", mysqli_real_escape_string($polaczenie,$record), mysqli_real_escape_string($polaczenie,$imie), $ip)) === false) {
    $return["done"] = false;
}
} else {
	$m = $i + 1;
if ($polaczenie->query(sprintf("UPDATE `record` SET `rekord` = '%s', `nazwa` = '%s', `ip` = '%s' WHERE `record`.`id` = $m", mysqli_real_escape_string($polaczenie,$rek),
	mysqli_real_escape_string($polaczenie,$stare), mysqli_real_escape_string($polaczenie,$ipstare))) === false) {
    $return["done"] = false;
}
if ($polaczenie->query(sprintf("UPDATE `record` SET `rekord` = '%s', `nazwa` = '%s', `ip` = '%s' WHERE `record`.`id` = $i", mysqli_real_escape_string($polaczenie,$record),
	mysqli_real_escape_string($polaczenie,$imie), $ip)) === false) {
   $return["done"] = false;
}
}

}
}
	$polaczenie->close(); // zamykamy polaczenie
	header('Location: index.php');
	}
}else {
	header('Location: index.php');
}
?>