<!--#include file="../../inc/conn.asp"-->
<%Response.Charset = "gb2312"%>
<%
dim ip,intRsnum,value1,value2
ip=request.servervariables("remote_addr")
lb=request.form("lb")

password = request.querystring("password")
name = request.querystring("username")
value1=name
value2=password
'k1 = request.form("k1")

if value1="" then
callback1=request("callback")
response1= callback1&"({err_code:1, err_msg:""用户名为空"", data:{username:"""&VALUE1&""",password:"""&VALUE2&""", token:"""&z_card&"""}})"
Response.Write response1 
else
Set rs = Server.CreateObject("ADODB.Connection")
sql="select * from a_fh_staff where card_no1='" & name & "' and password='" & password & "'"

Set rs = conn.Execute(sql)

If Not rs.EOF = True Then
if trim(rs("sts"))="A"  then

If trim(rs("staff_sts"))>2 Then
Response.Cookies("xsunion")("rengou")=1
End if
If Trim(rs("lxr"))<>"" then
Response.Cookies("xsunion")("name")=Trim(rs("lxr"))
Else
Response.Cookies("xsunion")("name")=Trim(rs("userid"))
End If
If Trim(rs("staff_tel"))<>"" then
Response.Cookies("xsunion")("telephone")=Trim(rs("staff_tel"))
End If
If Trim(rs("card_no"))<>"" then
Response.Cookies("xsunion")("sfz")=Trim(rs("card_no"))
End If
Response.Cookies("xsunion")("reg_nbr")=trim(rs("reg_nbr"))
Response.Cookies("xsunion")("card_no1")=trim(rs("card_no1"))
If Trim(rs("staff_grade"))<>"" Then 
Response.Cookies("xsunion")("staff_grade")=Trim(rs("staff_grade"))
Else
Response.Cookies("xsunion")("staff_grade")="0"
End If 
If Trim(rs("staff_sts"))<>"" Then 
Response.Cookies("xsunion")("staff_sts")=trim(rs("staff_sts"))
else
Response.Cookies("xsunion")("staff_sts")="2"
End If 
session.TimeOut=60
userip = Request.ServerVariables("HTTP_X_FORWARDED_FOR") 
  If userip = "" Then 
   userip = Request.ServerVariables("REMOTE_ADDR")
  end if 
sql1="update a_fh_staff set log_num=log_num+1,set_date=sysdate,staff_memo='"&userip&"' where staff_id='"&rs("staff_id")&"'"
conn.execute sql1
lt=request("lt")

callback1=request("callback")

response1= callback1&"({err_code:0, err_msg:""success"", data:{username:"""&VALUE1&""",password:"""&VALUE2&""", token:"""&z_card&"""}})"

Response.Write response1 
	else
	

callback1=request("callback")

response1= callback1&"({err_code:1, err_msg:""需要审核"", data:{username:"""&VALUE1&""",password:"""&VALUE2&""",token:"""&z_card&"""}})"

Response.Write response1 

end if

Else
 
callback1=request("callback")

response1= callback1&"({err_code:1, err_msg:""您输入了错误的帐号或口令"", data:{username:"""&VALUE1&""",password:"""&VALUE2&""", token:"""&z_card&"""}})"

Response.Write response1 

End If

rs.close
set rs=Nothing

End if
%>