<%@codepage=65001 %>
<% lx1=request.querystring("lx1")
id=request.querystring("id")
zt=request.querystring("zt")
ztid=request.querystring("ztid")
shopid=request.querystring("shopid")
act=request.querystring("act")
po=request.querystring("username")
remark=request.querystring("content")
%>
<!--#include file="../../inc/conn.asp" -->
		<%
	sjnr=request.querystring("sjnr")
	
	If ztid<>"" Then 
	sql2="Select id,zt,tp1,fbsj,fblx,nr,qy_qymc,staff_id,sjnr From web_xxfb_nr where 1=1 "
 sql2=sql2&" and id='"&ztid&"'"
 sql1="update web_xxfb_nr set ckcs=ckcs+1 where id='"&ztid&"'"
			conn.execute sql1
			dd=1
			End If 
If dd=1 Then 
 Set rs2=conn.execute(sql2)
If Not rs2.eof Then 
id=rs2("id")
shopid=rs2("staff_id")
zt=rs2("zt")
tp1=rs2("tp1")
fbsj=rs2("fbsj")
nr=rs2("nr")
sjnr=rs2("sjnr")
comp=rs2("qy_qymc")
End If 
rs2.close
Set rs2=nothing
End If 
	remark=Trim(request("content"))
	If remark="" Then 
	remark="рятд"
	End If 
	act=request.querystring("act")
	If po="" Then
	po=request.querystring("username")
	End If 
	fbr=comlxr(po)
	qymc=company(po)
	If act<>"" Then 
	sql1="select max(id) from a_1_log" 
    Set rs1=conn.execute(sql1)
	If isnull(rs1(0)) Then 
	maxid=1
	Else
	maxid=CInt(rs1(0))+1
	End If 
	rs1.close
	Set rs1=nothing
	sql2="select * from a_1_log where ztid='"&ztid&"' and lookcard='"&po&"'"
		Set rs2=conn.execute(sql2)
		'Response.write sql2
	If rs2.eof Then 
		sql="insert into a_1_log (id,zt,ztid,zt_card,lookman,lookcard,looknum,looktime,gxf1,gxf2,remark) values("&maxid&",'"&zt&"','"&ztid&"','"&shopid&"','"&fbr&"','"&po&"','0',sysdate,'0','0','"&remark&"')"
		conn.execute sql
	callback1=request("callback")
response1= callback1&"({err_code:0})"
Response.Write response1 
Else
sql="update a_1_log set remark='"&remark&"',looktime=sysdate,looknum=looknum+1 where id='"&rs2(0)&"'"
conn.execute sql
callback1=request("callback")
response1= callback1&"({err_code:0})"
Response.Write response1 
End If 
rs2.close
Set rs2=nothing
	End If 
	%>

