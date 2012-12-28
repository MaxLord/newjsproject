<?php 

  ini_set(error_reporting, ~E_NOTICE);	//Убрать нотайсы
	ini_set(display_errors, true);		//Включить вывод ошибок
		
	$mysqli = new mysqli('', selectuser, selectuser, rollbase);//База данных
	$mysqli->set_charset("utf8"); //Кодировка (обязательно)

	if(stristr($_GET[query],'select')&&!stristr($_GET[query],'limit'))//Если есть "SELECT" и нет "LIMIT"
		$_GET[query].=' LIMIT 0,10'; //Добавляем "LIMIT"

	if($result = $mysqli->query($_GET[query])){	

		while ($array = $result->fetch_assoc()) 
			$rows[] = $array;	//Создаем массив
		
		echo json_encode($rows); //Выводим
	}

	echo $mysqli->error;

	$mysqli->close();


?>
