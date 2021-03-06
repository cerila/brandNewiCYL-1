<?php
if( !defined('IN') ) die('bad request');
include_once( AROOT . 'controller'.DS.'app.class.php' );


define( 'OP_API_TOKEN_ERROR' , 10001 );
define( 'OP_API_USER_ERROR' , 10002 );
define( 'OP_API_LEVEL_ERROR' , 10003 );
define( 'OP_API_DB_ERROR' , 10004 );
define( 'OP_API_NOT_IMPLEMENT_YET' , 10005 );
define( 'OP_API_ARGS_ERROR' , 10006 );
define( 'OP_API_DB_EMPTY_RESULT' , 10007 );
define( 'OP_API_UPLOAD_ERROR' , 10008 );
define( 'OP_API_STORAGE_ERROR' , 10009 );




class userController extends appController
{
	function __construct()
	{
		// 载入默认的
		parent::__construct();
		
		if( g('a') != 'get_token' && g('a') != 'register' )	//搞清楚check_token()的机制？？？？？
		{
			$this->check_token();
		}
	}
	
	
	public function index()
	{
		$data = array( 'text' => 'welcome to opath api interface' );
		return  $this->send_result( $data );
	}
	
	public function get_token()
	{
		$request_body = file_get_contents('php://input');	//json_flag
		$data = json_decode($request_body);					//json_flag
		// $username = z(t($_GET['username']));				//jsonp_flag
		// $password = z(t($_GET['password']));				//jsonp_flag
		$username = $data->{'username'};					//json_flag
		$password = $data->{'password'};					//json_flag
		//$callback = z(t(v('callback')));
		//$remember = v('remember');
		
		//$sql = "SELECT * FROM `user` WHERE `email` = '" . s( $email ) . "' AND `password` = '" . md5( $password ) . "' AND `status` = 'OK' LIMIT 1";
		
		$user = get_user_info_by_id( $username );
		

		
		if( $user )
		{
			$this->verifying( $user, $username, $password );
			
			//$_SESSION['level'] = $user['level'];
			
		}
		else
		{
			return $this->send_error( OP_API_TOKEN_ERROR , '用户名不正确' );
		}
		
	}

	public function verifying( $user, $username, $password )
	{
		//查询用户是否已经激活
		//if ($user["actNum"]=="0") {
		if (true) {
			//判断登录失败次数是否小于等于 5 次
			//if ($user["NumLoginFail"]<=5) {
			if (true) {
				//判断密码是否正确
				//return $this->send_result( array( 'username' => $user['UserName'], 'password' => $user['Password'], 'passed' => $password, 'passedsha1' => sha1($password) ) );
				if ($user["Password"]==sha1($password) || $user["Password"]==$password) {
					//判断是否是别人的手机
					// if ($celluuid != $user['celluuid']) 
					// {
					// 	return $this->send_error( OP_API_TOKEN_ERROR , '请用你自己的手机登录！' );
					// }
					//如果密码正确，修改最近登录时间，将登录失败信息清除
					//$datetime=date("y-m-d H:i:s");
					//$loginupdate = update_login( 'LastLogin', $datetime, $username );
					//$loginupdate = update_login( 'NumLoginFail', '0', $username );

					/*return $this->send_error( OP_API_TOKEN_ERROR , 
											update_login( 'LastLogin', $datetime, $username )
											.'\r\n'.
											update_login( "NumLoginFail", '0', $username ) );*/

					//if ($loginupdate) {
					if (true) {
						//创建会话，保存登录信息
						session_start();
						$token = session_id();
						$_SESSION['token'] = $token;
						//$_SESSION['uid'] = $user['id'];
						$_SESSION['username'] = $user['UserName'];
						$_SESSION['password'] = $user['Password'];
						//发送 cookie 到客户端，密码被加密
						return $this->send_result( array( 'token' => $token , 'user' => $user['Name'], 'username' => $user['UserName'], 'password' => $user['Password'] ) );
					}
					else {
						return $this->send_error( OP_API_TOKEN_ERROR , db_error().', 数据库更新错误' );
					}
				}
				else {
					//密码错误，登录失败
					//检查上次登录失败时间是否在 10min 之内，如果是，则登录失败次数增加 1
					//$datetime=date("y-m-d H:i:s",strtotime("-10 minutes"));//获取 10 分钟以前的时间
					//$timenow=date("y-m-d H:i:s");//获取现在的时间
					//if($user["LastLoginFail"]>$datetime) {//在 10min 之内
						//登录失败次数加 1
						//$loginupdate = update_login( 'NumLoginFail', ($user["NumLoginFail"]+1), $username );
						///*return $this->send_error( OP_API_TOKEN_ERROR , 
						//					update_login( 'NumLoginFail', ($user["NumLoginFail"]+1), $username ) . '-----' . 
						//					update_login( 'LastLogin', $datetime, $username ) );*/
						//$query="update $dbloginTable set NumLoginFail=NumLoginFail+1 where UserName='$username'";
						//$result=mysql_query($query);
						//修改登录失败时间
						//$loginupdate = update_login( 'LastLoginFail', $timenow, $username );
						//$query="update $dbloginTable set LastLoginFail='$timenow' where UserName='$username'";
						//$result=mysql_query($query);
						//返回到登录页面
						//header("refresh:5;url=http://localhost/members/login.php");
						//return $this->send_error( OP_API_TOKEN_ERROR , '密码错误'.($user["NumLoginFail"]+1).'次（允许6次）' );
					//}
					//else {//不在 10min 之内，只修改登录失败时间
						//$loginupdate = update_login( 'LastLoginFail', $timenow, $username );
						//返回到登录页面
						//header("refresh:5;url=http://localhost/members/login.php");
						//return $this->send_result( array( 'token' => $token , 'username' => $user['UserName'], 'password' => $user['Password'] ) );
						return $this->send_error( OP_API_TOKEN_ERROR , '密码错误，请重新输入');
					//}
				}
			}
			//else {
				//失败次数超过 5 次
				//检查时间， 如果上次登录失败在半个小时前， 则解锁， 给用户一次重新登录机会。 只有一次机会
				//$datetime=date("y-m-d H:i:s",strtotime("-30 minutes"));
				//if($user["LastLoginFail"]<$datetime) {//半个小时以前
				//	$loginupdate = update_login( 'NumLoginFail', '5', $username );
				//}
				//else {
					//半个小时内，则锁定帐户，返回到登录页面，半个小时后解锁
				//	$timenow=date("y-m-d H:i:s");
				//	$loginupdate = update_login( 'LastLoginFail', $timenow, $username );
					//header("refresh:5;url=http://localhost/members/login.php");
				//	return $this->send_error( OP_API_TOKEN_ERROR , '您的账号目前被锁定，半个小时后自动解锁。请解锁后登录' );
			//	}
			//}
		}
		else {//激活码不为 0.用户需要激活
			//header("refresh:5;url=http://localhost/members/activate.php");
			return $this->send_error( OP_API_TOKEN_ERROR , '您的账号没有激活，请激活后登陆。<br>5 秒后自动跳转到激活页面。' );
		}
	}

	public function register()
	{
		$request_body = file_get_contents('php://input');	//json_flag
		$data = json_decode($request_body);				//json_flag
		// $username = z(t($_GET['username']));				//jsonp_flag
		// $password = z(t($_GET['password']));				//jsonp_flag
		// $confirmpassword = z(t($_GET['repeatpassword']));	//jsonp_flag
		// $name = z(t($_GET['name']));						//jsonp_flag
		// $gender = z(t($_GET['gender']));					//jsonp_flag
		// $mobi = z(t($_GET['mobile']));						//jsonp_flag
		// //$email = z(t(v('email')));
		// //$celluuid = z(t(v('celluuid')));
		$username = $data->{'username'};					//json_flag
		$password = $data->{'password'};					//json_flag
		$confirmpassword = $data->{'repeatpassword'};	//json_flag
		$name = $data->{'name'};							//json_flag
		$gender = $data->{'gender'};						//json_flag
		$mobi = $data->{'mobile'};						//json_flag

    	//$actnum="";

    	//$data = var_dump($data);

		//return $this->send_result( array( 'user' => $data->{'username'} ) );

		//调用函数，检测用户输入的数据
		$UserNameGood=$this->Check_username($username);
		$PasswordGood=$this->Check_Password($password);
		//$EmailGood=$this->Check_Email($email);
		$ConfirmPasswordGood=$this->Check_ConfirmPassword($password,$confirmpassword);
		//$error=false;//定义变量判断注册数据是否出现错误
		if($UserNameGood !="用户名检测正确") {
			//$error=true;//改变 error 的值表示出现了错误
			return $this->send_error( 9999 , $UserNameGood );
			//echo $UserNameGood;//输出错误信息
			//echo "<br>";
		}
		if($PasswordGood !="密码检测正确") {
			//$error=true;
			return $this->send_error( OP_API_TOKEN_ERROR , $PasswordGood );
			//echo $PasswordGood;
			//echo "<br>";
		}
		/*if($EmailGood !="邮箱检测正确") {
			//$error=true;
			return $this->send_error( OP_API_TOKEN_ERROR , $EmailGood );
			//echo $EmailGood;
			//echo "<br>";
		}*/
		if ($ConfirmPasswordGood !="两次密码输入一致") {
			//$error=true;
			return $this->send_error( OP_API_TOKEN_ERROR , $ConfirmPasswordGood );
			//echo $ConfirmPasswordGood;
			//echo "<br>";
		}

		//判断数据库中 UserName、Mobile、Email、celluuid 是否已经存在
		//$query="select * from $dbloginTable where UserName='$username' or Email='$email'";
		//$result=mysql_query($query);
		//
		
		//$row = unique_verifying( $username, $mobi, $email, $celluuid );
		$row = unique_verifying( $username, $mobi );

		if ($row) {
			$arrlength=count($row); //必须对$row进行判断，因为如果$row无返回，则为false，而count(false) == 1；

			//return $this->send_error( OP_API_TOKEN_ERROR , $arrlength.'==='.$username.", 注册失败！".$row[0]['UserName'] );
			//return $this->send_result( $row );

			for($i=0;$i<$arrlength;$i++) {
				if ($row[$i]["UserName"]==$username) {
					//$error=true;
					//echo "用户名已存在<br>";
					return $this->send_error( OP_API_TOKEN_ERROR , "用户名已存在" );
				}
				/*if ($mobi!='' && $row[$i]["Mobile"]===$mobi) {
					//$error=true;
					//echo "用户邮箱已经注册<br>";
					return $this->send_error( OP_API_TOKEN_ERROR , "用户手机号码已经注册" );
				}
				if ($row[$i]["Email"]==$email) {
					//$error=true;
					//echo "用户邮箱已经注册<br>";
					return $this->send_error( OP_API_TOKEN_ERROR , "用户邮箱已经注册" );
				}*/
				if ($row[$i]["mobile"]==$mobi) {
					//$error=true;
					//echo "用户邮箱已经注册<br>";
					return $this->send_error( OP_API_TOKEN_ERROR , "该手机号码已经注册" );
				}
			}
		}

		//如果数据检测都合法，则将用户资料写进数据库表
		//$actnum=$this->Check_actnum();//调用激活码函数
		//$Datetime=date("y-m-d H:i:s");//获取注册时间，也就是数据写入到用户表的时间
		$result = insert_user_info ( $username, sha1($password), $name, $mobi, $gender );

		if($result){
			return $this->send_result( array( 'user' => $name , 'username' => $username ) );
		}
		else {
			return $this->send_error( OP_API_TOKEN_ERROR , db_error().", 注册失败！" );
		}

		//echo $actnum;

		/*$to=$email;//用户注册的邮箱
		$subject="激活码";
		$message="您的激活码为$actnum";
		$header="From:alexgzhou@163.com"."\r\n";//邮件头信息

		if(mail($to,$subject,$message,$header)) {//php 中 mail()函数用来发送邮件，需要更改 php.ini 文件，最好安装 SMTP 服务器
			//产生链接，链接到激活页面
			echo "请登陆邮箱获取激活码。然后点击<a href="activate.php">这里</a>激活。"
		}*/
		
	}

	public function update_userinfo()
	{
		//$sql = "SELECT `id` as `uid` , `name` , `timeline` , `level`, `cover` , `picture` FROM `user` WHERE `id` = '" . intval( $_SESSION['uid'] ) . "' LIMIT 1";
		
		$request_body = file_get_contents('php://input');	//json_flag
		$data = json_decode($request_body);				//json_flag
		// $name = z(t($_GET['name']));						//jsonp_flag
		// $gender = z(t($_GET['gender']));					//jsonp_flag
		// $mobi = z(t($_GET['mobile']));						//jsonp_flag
		// $birthday = z(t($_GET['birthday']));						//json_flag
		// $email = z(t($_GET['email']));						//json_flag
		// //$email = z(t(v('email')));
		// //$celluuid = z(t(v('celluuid')));
		$name = $data->{'name'};							//json_flag
		$gender = $data->{'gender'};						//json_flag
		$mobi = $data->{'mobile'};						//json_flag
		$birthday = $data->{'birthday'};						//json_flag
		$email = $data->{'email'};						//json_flag

		$user = update_login( $_SESSION['username'], $name, $gender, $mobi, $birthday, $email );


		if( $user )
		{
			//$user['refresh_time'] = date("m月d日 H:i");
			
			$this->send_result( $user );
		}
		else
		{
			return $this->send_error( OP_API_USER_ERROR , 'NO SUCH UID' );
		}
	}

	public function user_verify()
	{
		//$sql = "SELECT `id` as `uid` , `name` , `timeline` , `level`, `cover` , `picture` FROM `user` WHERE `id` = '" . intval( $_SESSION['uid'] ) . "' LIMIT 1";
		
		$user = get_user_info_by_id( $_SESSION['username'] );

		if( $user )
		{
			//$user['refresh_time'] = date("m月d日 H:i");
			
			$this->send_result( $user );
		}
		else
		{
			return $this->send_error( OP_API_USER_ERROR , 'NO SUCH UID' );
		}
	}
	
	public function user_remove()
	{
		$uid = intval(v('uid'));
		if( $uid < 1 || !$user = get_line( "SELECT `id` as `uid` , `name` FROM `user` WHERE `id` = '" . intval( $uid ) . "' AND `id` != '" . intval( ss('uid') ) . "' LIMIT 1" ) )
		{
			return $this->send_error( OP_API_USER_ERROR , 'NO SUCH UID OR UID IS SELF' );
		}
		else
		{
			if( ss('level') != 'SUPERADMIN' ) return $this->send_error( OP_API_LEVEL_ERROR , 'ONLY SUPER ADMIN CAN DELETE MEMBER' );
			
			$sql = "UPDATE `user` SET `status` = 'FORBIDDEN' WHERE `id` = '" . intval( $uid ) . "' LIMIT 1";
			
			run_sql( $sql );
			
			if( mysql_errno() != 0 )
			{
				return $this->send_error( OP_API_DB_ERROR , 'DATABASE ERROR ' . mysql_error() );
			}
			else return $this->send_result( array( 'msg' => 'OK' ) );
		}
	}
        

	
	
	
	private function check_token()
	{
		$request_body = file_get_contents('php://input');	//json_flag
		$data = json_decode($request_body);					//json_flag
		$token = $data->{'token'};
		//$token = z(t($_GET['token']));					//jsonp_flag
		//return $this->send_error( OP_API_TOKEN_ERROR , $token . "=====" . strlen($token) );	//test
		if( strlen( $token ) < 2 ) return $this->send_error( OP_API_TOKEN_ERROR , 'no token' );
		
		session_id( $token );
		session_start();
		//return $this->send_error( OP_API_TOKEN_ERROR , $_SESSION['token']."---".session_id($token)."---".session_id() );
		if( $_SESSION['token'] != $token ) {
			$_SESSION = array();
			if (ini_get("session.use_cookies")) {
			    $params = session_get_cookie_params();
			    setcookie(session_name(), '', time() - 42000,
			        $params["path"], $params["domain"],
			        $params["secure"], $params["httponly"]
			    );
			}
			session_destroy();

			return $this->send_error( OP_API_TOKEN_ERROR , 'bad token: '.$_SESSION['token'].session_id() );
		}
	}

	//定义产生激活码函数
	public function Check_actnum() {
		$chars_for_actnum=array("A","B","C","D","E","F","G","H","I","J","K","L",
		"M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d",
		"e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v",
		"w","x","y","z","1","2","3","4","5","6","7","8","9","0"
		);
		$actnum="";
		for ($i=1;$i<=20;$i++){	//生成一个 20 个字符的激活码
			$actnum.=$chars_for_actnum[mt_rand(0,count($chars_for_actnum)-1)];
		}
		return $actnum;
	}

	//判断用户名函数
	public function Check_username($username) {//参数为用户注册的用户名
		//用户名三个方面检查
		//是否为空 字符串检测 长度检测
		$Max_Strlen_UserName=16;//用户名最大长度
		$Min_Strlen_UserName=2;//用户名最短长度
		$UserNameChars="/[^A-Za-z0-9_-]/";//字符串检测的正则表达式
		$UserNameGood="用户名检测正确";//定义返回的字符串变量
		if($username=="") {
			$UserNameGood="用户名不能为空";
			return $UserNameGood;
		}
		if(preg_match("$UserNameChars",$username)) {//正则表达式匹配检查
			$UserNameGood="用户名字符串检测不正确";
			return $UserNameGood;
		}
		if (strlen($username)<$Min_Strlen_UserName || strlen($username)>$Max_Strlen_UserName) {
			$UserNameGood="用户名字长度检测不正确";
			return $UserNameGood;
		}
		return $UserNameGood;
	}

	//判断密码是否合法函数
	public function Check_Password($password) {
		//是否为空 字符串检测 长度检测
		$Max_Strlen_Password=16;//密码最大长度
		$Min_Strlen_Password=3;//密码最短长度
		//$PasswordChars="/^[A-Za-z0-9_-]/";//密码字符串检测正则表达式
		$PasswordGood="密码检测正确";//定义返回的字符串变量
		if($password=="") {
			$PasswordGood="密码不能为空";
			return $PasswordGood;
		}
		/*if(preg_match("$PasswordChars",$password)) {
			$PasswordGood="密码字符串检测不正确";
			return $PasswordGood;
		}*/
		if(strlen($password)<$Min_Strlen_Password || strlen($password)>$Max_Strlen_Password) {
			$PasswordGood="密码长度检测不正确";
			return $PasswordGood;
		}
		return $PasswordGood;
	}

	//判断邮箱是否合法函数
	public function Check_Email($email) {
		$EmailChars="/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*$/";//正则表达式判断是否是合法邮箱地址
		$EmailGood="邮箱检测正确";
		if($email=="") {
			$EmailGood="邮箱不能为空";
			return $EmailGood;
		}
		if(!preg_match("$EmailChars",$email)) {//正则表达式匹配检查
			$EmailGood="邮箱格式不正确";
			return $EmailGood;
		}
		return $EmailGood;
	}

	//判断两次密码输入是否一致
	public function Check_ConfirmPassword($password,$confirmpassword) {
		$ConfirmPasswordGood="两次密码输入一致";
		if($password<>$confirmpassword) {
			$ConfirmPasswordGood="两次密码输入不一致";
			return $ConfirmPasswordGood;
		}
		else {
			return $ConfirmPasswordGood;
		}
	}

	public function send_error( $number, $msg )
	{	
		$obj = array();
		$obj['err_code'] = intval( $number );
		$obj['err_msg'] = $msg;
		
		// $callback = $_GET['callback'];							//jsonp_flag
		// die( z(t(v('callback'))).'('.json_encode( $obj ).')' );	//jsonp_flag
		header('Content-type:application/x-javascript');		//json_flag
		die( json_encode( $obj ) );							//json_flag
	}
	
	public function send_result( $data )
	{
		$obj = array();
		$obj['err_code'] = '0';
		$obj['err_msg'] = 'success';
		$obj['data'] = $data;

		// $callback = $_GET['callback'];							//jsonp_flag
		// die( z(t(v('callback'))).'('.json_encode( $obj ).')' );	//jsonp_flag
		header('Content-type:application/x-javascript');		//json_flag
		die( json_encode( $obj ) );							//json_flag
	}
	
}