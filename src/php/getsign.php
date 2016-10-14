<?php
	header("Access-Control-Allow-Origin:http://csq121605366.applinzi.com");//用于解决跨域问题
	require_once "jssdk.php";	//调用jssdk.php
	$jssdk = new JSSDK("yourAppID", "yourAppSecret");	//填写yourAppID和yourAppSecret
	$signPackage = $jssdk->GetSignPackage($_POST['url']||$_GET['url']);	//把url地址传入到jssdk.php文件中(谁调用微信接口就传入谁的URL)
	echo json_decode($signPackage);		//把获取的内容返回
?>


