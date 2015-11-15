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
			<p class="center">New blog post: </p>
			<textarea id="post" rows="20" cols="100"></textarea>
			<div id="preview" class="preview"><p>Test</p></div>
			<p class="center">Password: </p>
			<textarea id="pw" rows="1" cols="16"></textarea>
			<button onclick="submit()">Submit</button>
		</div>


		<script>
			function update()
			{
				var post = document.getElementById("post").value;
				var date = new Date();
				var preview = document.getElementById("preview");
				var month;
				var rawMonth = date.getMonth();
				if(rawMonth == 0) month = "January";
				if(rawMonth == 1) month = "February";
				if(rawMonth == 2) month = "March";
				if(rawMonth == 3) month = "April";
				if(rawMonth == 4) month = "May";
				if(rawMonth == 5) month = "June";
				if(rawMonth == 6) month = "July";
				if(rawMonth == 7) month = "August";
				if(rawMonth == 8) month = "September";
				if(rawMonth == 9) month = "October";
				if(rawMonth == 10) month = "November";
				if(rawMonth == 11) month = "December";

				var time = "" + date.getMinutes();
				if(time.length < 2)
				{
					time = "0" + time;
				}
				var markdownPost = new Markdown.getSanitizingConverter().makeHtml(post);
				markdownPost += "<div class='signature'><p>- Trentv4</p><p>Posted at " + date.getHours() + 
				":" + time + " on "+ month + " " + date.getDate() + ", " 
				+ date.getFullYear() + "</p></div>";
				preview.innerHTML = markdownPost;
			}
			setInterval(update, 100);
		</script>

		<script>
			function submit()
			{
				var post = document.getElementById("preview").innerHTML;
				var pw = document.getElementById("pw").value;
				console.log(post);

				var data = new FormData();
				data.append("pw" , pw);
				data.append("data" , "<div class='container'>" + post + "</div>");
				var xhr = new XMLHttpRequest();
				xhr.open("POST", "/trentv4/blog/post/create_post.php", true);
				console.log(xhr.send(data));
				console.log("sent");
			}
		</script>

		<?php require($_SERVER["DOCUMENT_ROOT"] . "/trentv4/resources/footer.php");?>
	</body>
</html>
