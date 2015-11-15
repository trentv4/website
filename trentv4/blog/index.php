<!DOCTYPE html>
<html>
	<head>
		<script src="/trentv4/resources/mc.js"></script>
		<script src="/trentv4/resources/ms.js"></script>
		<?php require($_SERVER["DOCUMENT_ROOT"] . "/trentv4/resources/head.php");?>
	</head>

	<body>
		<?php require($_SERVER["DOCUMENT_ROOT"] . "/trentv4/resources/header.php");?>

		<div class="container">
			<p>Here is the complete archive of all my previous blog posts.</p>
		</div>
		<?php 
			$path = $_SERVER["DOCUMENT_ROOT"] . "/trentv4/blog/archive/posts.txt";
			$filelist = fopen($path, "r");
			$filetext = fread($filelist, filesize($path));

			$files = explode(",", $filetext);
			$s = count($files)-2;
			for($i = $s; $i >= 0; $i--)
			{
				require($_SERVER["DOCUMENT_ROOT"] . "/trentv4/blog/archive/" . $files[$i]) . ".txt";
			}
		?>

		<?php require($_SERVER["DOCUMENT_ROOT"] . "/trentv4/resources/footer.php");?>
	</body>
</html>
