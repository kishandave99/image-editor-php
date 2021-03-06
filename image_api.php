<?php
if(isset($_FILES["file"]["name"])) {
$target_dir = "images/";
$target_file = $target_dir . basename($_FILES["file"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

// Check if image file is a actual image or fake image

$check = getimagesize($_FILES["file"]["tmp_name"]);
if($check !== false) {
	//echo "File is an image - " . $check["mime"] . ".";
	$uploadOk = 1;
} else {
	//echo "File is not an image.";
	$uploadOk = 0;
}


// Check if file already exists
if (file_exists($target_file)) {
  //echo "Sorry, file already exists.";
  $uploadOk = 0;
  $response = ['success' => 0, "message" => "Sorry, file already exists."];
  echo json_encode($response);
  exit();
}

// Check file size
if ($_FILES["file"]["size"] > 500000) {
  //echo "Sorry, your file is too large.";
  $uploadOk = 0;
  $response = ['success' => 0, "message" => "Sorry, your file is too large."];
  echo json_encode($response);
  exit();
}

// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
  //echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
  $uploadOk = 0;
  $response = ['success' => 0, "message" => "Sorry, only JPG, JPEG, PNG & GIF files are allowed."];
  echo json_encode($response);
  exit();
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
  echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
  if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
    //echo "The file ". htmlspecialchars( basename( $_FILES["fileToUpload"]["name"])). " has been uploaded.";
	$uploadedImageName = htmlspecialchars( basename( $_FILES["file"]["name"]));
	$response = ['success' => 1, "message" => "File uploaded sucessfully.", "data" => [ "uploaded_image_path" => "images/".$uploadedImageName  ]];
	echo json_encode($response);
	exit();
  } else {
	//echo "Sorry, there was an error uploading your file.";
	$response = ['success' => 0, "message" => "Sorry, there was an error uploading your file."];
	echo json_encode($response);
	exit();
  }
}

}
?>