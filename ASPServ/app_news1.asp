<!--#include file="../../inc/conn.asp"-->
<%Response.Charset = "gbk"%>
<%
Dim fblx,id1,myarry
fblx=request.querystring("tabcode")
If fblx<>"" Then 
sql="select * from a_type where id='"&fblx&"'"
Set rs=conn.execute(sql)
If Not rs.eof Then 
fblx=rs(1)
End If
Else
fblx=""
End If 
id1=request.querystring("articleid")
id1="132402"
set rs=server.CreateObject("ADODB.RecordSet")
If id1<>"" Then 
sql2="Select id,zt,tp1,fbsj,fblx,js_sts,ckcs,staff_id,nr,qy_qymc From web_xxfb_nr where 1=1"

If id1<>"" Then 
sql2=sql2&" and id='"&id1&"' "
End If 
'If st1<>"" Then 
'sql2=sql2&" and qy_zczj like'%"&st1&"%'"
'End If 
sql2=sql2& " order by id desc" 
rs.Open sql2,conn,1,1
 i=rs.recordcount
    'Response.write maxnum&i&"sdfsf"
  y=0
    myarry=rs.getrows(i)
' Response.write myarry
  'do while not rs.eof
'id=rs(0)
'fblx=rs(4)
'zt=rs(1)
'tp1=rs("tp1")
'ckcs=rs("ckcs")
'fbsj=rs("fbsj")
'staff_id=rs("staff_id")
y=y+1

abc="["
'Response.write "<table>"
 For row = 0 To UBound(MyArry, 2)
 abc=abc&"["
For col = 0 To UBound(MyArry, 1)
'If Trim(myarry(col,row))="" Then 
'myarry(col,row)="0"
'End If 
If col=9 Then 
abc=abc&""""&myarry(col,row)&""""
Else
abc=abc&""""&myarry(col,row)&""""&","
End If 
'Response.write "<td>"&myarry(col,row)&"<td>"

Next
If row=i-1 Then 
abc=abc&"]"
Else
abc=abc&"],"
End If 
'Response.write "</tr><tr>"
Next
 abc=abc&"]"
'if y>=MaxPer or rs.eof  then exit do         
'rs.MoveNext
'Loop
'Response.write "</table>"
'Response.write myarry(2,3)
Else
abc="[]"
End If 
rs.close
Set rs=nothing
callback1=request("callback")
response1= callback1&"({err_code:0, err_msg:""success"", data:{items:"&abc&", token:""whatever""}})"
Response.Write response1 
%>