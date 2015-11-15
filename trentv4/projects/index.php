<!DOCTYPE html>
<html>
	<head>
		<?php require($_SERVER["DOCUMENT_ROOT"] . "/trentv4/resources/head.php");?>
	</head>

	<body>
		<?php require($_SERVER["DOCUMENT_ROOT"] . "/trentv4/resources/header.php");?>

		<div class="container">
			<p>Right here you can find all of my projects. I try to keep this up to date, but the exception will be freshly-created projects and projects I'm not too proud of.</p>
			<div class="signature"><p>- Trentv4</p></div>

			<hr>
			<img src="/trentv4/projects/bouncy-balls/bouncy-balls.png" height="500"/>
			<h2><a href="/trentv4/projects/bouncy-balls/">Bouncy Balls</a></h2>
			<p>This project was my first real-time 'game' per se. I implemented a work-in-progress Engine during this, mostly as a testbed for it. I discontinued for on this engine, but used what I learned in future stuff. I might release a version of this later.</p>
			<p>This is a real-time physics simulation of balls. Hit esc to bring up the menu.</p>
			
			<hr>
			<img src="/trentv4/projects/password-manager/password-manager.png" height="500px"/>
			<h2><a href="/trentv4/projects/password-manager/">Password Manager</a></h2>
			<p>I created a password manager using Java's Swing system. I have plans to update this to the more-modern JavaFX API. I've had some issues with multiplatform decrypting, but on the same platform it seems to work quite well.</p>
			
			<hr>
			<img src="/trentv4/projects/top-down/top-down.png" height="500px"/>
			<h2><a href="/trentv4/projects/top-down/">Top-down Shooter</a></h2>
			<p>I created a rushed top-down shooter game with three different weapons! This is an old project I just bashed off a quick polish on, and uploaded. Have fun, it's hard.</p>
		</div>

		<?php require($_SERVER["DOCUMENT_ROOT"] . "/trentv4/resources/footer.php");?>
	</body>
</html>
