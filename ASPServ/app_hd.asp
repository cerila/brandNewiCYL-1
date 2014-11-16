<!--#include file="../../inc/conn.asp"-->
<%Response.Charset = "gbk"%>
<%
Dim fblx,id1,maxnum,myarry
fblx=request.querystring("tabcode")
'If fblx<>"" Then 
'sql="select * from a_type where id='"&fblx&"'"
'Set rs=conn.execute(sql)
'If Not rs.eof Then 
'fblx=rs(1)
'End If
'Else
'fblx=""
'End If 
If fblx="pbhd001" Then 
st="0,31"
Else
st="0,30"
End If 

id1=request.querystring("lastid")
maxnum=request.querystring("requestno")

If request("shopid")<>"" Then 
shopid=request("shopid")
End If 
set rs=server.CreateObject("ADODB.RecordSet")
'id,title,pic,dprice,price,yprice,seodescription,clicknumber,addtime,kucun,guige,shopid,sortid,sprice
sql2="Select id,title,pic,addtime,sortid,kucun,clicknumber,shopid,dprice,price,yprice,sprice From mall_pro where shopid like '91%' and  1=1  and zhuangtai=2"
If st<>"" Then 
sql2=sql2& " and sortpath like '"&st&"%'"
End If 
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
y=y+1

abc="["
 For row = 0 To UBound(MyArry, 2)
 abc=abc&"["
For col = 0 To UBound(MyArry, 1)
If col=11 Then 
abc=abc&""""&myarry(col,row)&""""
Else
abc=abc&""""&myarry(col,row)&""""&","
End If 
Next
If row=i-1 Then 
abc=abc&"]"
Else
abc=abc&"],"
End If 
Next
 abc=abc&"]"
Else
abc="[]"
End If 
rs.close
Set rs=nothing
callback1=request("callback")
response1= callback1&"({err_code:0, err_msg:""success"", data:{items:"&abc&", token:""whatever""}})"
Response.Write response1 
%>