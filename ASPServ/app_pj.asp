<!--#include file="../../inc/conn.asp"-->
<%Response.Charset = "gbk"%>
<%
Dim fblx,id1,maxnum,myarry,id2
id2=request.querystring("articleid")
id1=request.querystring("lastid")
maxnum=request.querystring("requestno")

If request("shopid")<>"" Then 
shopid=request("shopid")
End If 
set rs=server.CreateObject("ADODB.RecordSet")

sql2="Select id,zt,ztid,looktime,lookcard,lookman,lookcard,remark,looknum From a_1_log where 1=1"
If id1>19 Then 
sql2=sql2&" and id<"&id1
End If 
If id2<>"" Then 
sql2=sql2&" and ztid='"&id2&"'"
End If 
If shopid2<>"" Then 
sql2=sql2&" and staff_id like '"&shopid2&"'"
End If
If shopid1<>"" Then 
sql2=sql2&" and staff_id like '"&shopid1&"%'"
End if
If mc<>"" Then 
sql2=sql2&" and zt like '%"&mc&"%'"
End If
If st<>"" Then 
sql2=sql2&" and qy_zczj like '%"&st&"%'"
End If
If sjnr<>"" Then 
sql2=sql2&" and sjnr='"&sjnr&"' "
End If 
'If st1<>"" Then 
'sql2=sql2&" and qy_zczj like'%"&st1&"%'"
'End If 
sql2=sql2& " order by id desc" 
rs.Open sql2,conn,1,1
 i=rs.recordcount
 If i>0 Then 
 If maxnum="" Then 
If i>=20 Then 
i=20
  End If 
  Else
   If CInt(i)>=CInt(maxnum) Then 
i=maxnum
  End If
   End If 
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
If col=8 Then 
abc=abc&""""&myarry(col,row)&""""
Else
If col=7 Then 
abc=abc&""""&replace(replace(myarry(col,row),"""","\"""),vbcrlf,"")&""""&","
else
abc=abc&""""&myarry(col,row)&""""&","
End If 
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