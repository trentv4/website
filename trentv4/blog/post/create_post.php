<?php
	$pw = $_POST["pw"];
	$data = $_POST["data"];
	if ($pw == "13452fuckPHP")
	{
		$time = time();
		$latest = fopen($_SERVER["DOCUMENT_ROOT"] . "/trentv4/blog/archive/latest.txt", "w");
		$posts = fopen($_SERVER["DOCUMENT_ROOT"] . "/trentv4/blog/archive/posts.txt", "a+");
		$date = fopen($_SERVER["DOCUMENT_ROOT"] . "/trentv4/blog/archive/" . $time . ".txt", "w");
		fwrite($latest, $data);
		
		fwrite($date, $data);

		fwrite($posts, $time);
		fwrite($posts, ",");

		fclose($latest);
		fclose($posts);
		fclose($date);
	}
?>s