<!DOCTYPE html>
<html>
	<head>
		<?php require($_SERVER["DOCUMENT_ROOT"] . "/trentv4/resources/head.php");?>
	</head>

	<body>
		<?php require($_SERVER["DOCUMENT_ROOT"] . "/trentv4/resources/header.php");?>

		<div class="container">
			<p>Welcome to my website! Here you can find all of my recent projects, write ups, and blog posts. I try to keep everything centralized around here, so chances are if I've done it and I like it, it'll be here. The exception is very recent stuff, where I try and get it presentable before showcasing it.</p>
			<p>The important links are up at the top, the <a href="/trentv4/">home</a>, <a href="/projects/">projects</a>, and the <a href="blog">blog</a>.
			<p>Also: you can contact me at trentvanslyke@gmail.com, fork me at <a href="https://bitbucket.org/trentv4">bitbucket.org/trentv4</a>, or follow me at <a href="https://twitter.com/trentv4">twitter.com/trentv4</a>.
			<div class="signature"><p>- Trentv4</p></div>
		</div>

		<?php require($_SERVER["DOCUMENT_ROOT"] . "/trentv4/blog/archive/latest.txt");?>

		<?php require($_SERVER["DOCUMENT_ROOT"] . "/trentv4/resources/footer.php");?>
	</body>
</html>
