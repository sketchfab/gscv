<?php
$tmp_file_name = $_FILES['picture']['tmp_name'];
$name = $_FILES["picture"]["name"];
move_uploaded_file($tmp_file_name, "sources/images/$name");
echo 'sources/images/'.$name;
?>