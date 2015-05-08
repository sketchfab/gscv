<?php

$ds          = DIRECTORY_SEPARATOR;  //1

$storeFolder = 'sources' . $ds . 'images';   //2

if (!empty($_FILES)) {

	$infosfichier = pathinfo($_FILES['image']['name']);
	$extension_upload = $infosfichier['extension'];
	$extensions_autorisees = array('jpg', 'jpeg', 'png');

	if (in_array($extension_upload, $extensions_autorisees)){

	    $tempFile = $_FILES['image']['tmp_name'];          //3

	    $targetPath = dirname( __FILE__ ) . $ds. $storeFolder . $ds;  //4

	    $fileNewName = time() . $_FILES['image']['name'];

	    $targetFile =  $targetPath . $fileNewName;  //5

	 	echo $fileNewName;

	    move_uploaded_file($tempFile,$targetFile); //6
	}else{
        echo "no_image";
    }

} else {
  echo "no_file";
}
?>
