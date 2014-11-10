<!--#include file="../../inc/conn.asp"-->
<%Response.Charset = "gbk"%>
<script language="jscript" runat="server">
Array.prototype.get = function(i)
{
 return this[i]; 
};
function getjson(str){
 try{
  eval("var jsonStr = (" + str + ")");
 }catch(ex){
  var jsonStr = null;
 }
 return jsonStr;
}
</script>
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
'id1="132402"
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
If col=8 Then 
abc=abc&""""&Replace(replace(myarry(col,row),"""","\"""),vbcrlf,"")&""""&","
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
'abc="[[""00"",""1\""aa\""1"",""22"",""33"",""44"",""55"",""66"",""77"",""88"",""99""]]"
'abc="[[""<H2 style=\""TEXT-TRANSFORM: none; BACKGROUND-COLOR: rgb(248,247,245); TEXT-INDENT: 0px; MARGIN: 0px; FONT: 700 20px/24px 'Helvetica Neue', Helvetica, Arial, sans-serif; WORD-WRAP: break-word; WHITE-SPACE: normal; LETTER-SPACING: normal; COLOR: rgb(0,0,0); WORD-SPACING: 0px; -webkit-text-stroke-width: 0px\"" id=activity-name class=rich_media_title><SPAN style=\""BOX-SIZING: border-box !important; FONT-FAMILY: 宋体; MAX-WIDTH: 100%; WORD-WRAP: break-word !important\""><P style=\""BOX-SIZING: border-box !important; TEXT-TRANSFORM: none; BACKGROUND-COLOR: rgb(248,247,245); TEXT-INDENT: 0px; MARGIN: 0px; MIN-HEIGHT: 1em; FONT: 16px/25px 'Helvetica Neue', Helvetica, Arial, sans-serif; MAX-WIDTH: 100%; WORD-WRAP: normal; WHITE-SPACE: pre-wrap; LETTER-SPACING: normal; COLOR: rgb(62,62,62); WORD-SPACING: 0px; -webkit-text-stroke-width: 0px\""><SPAN style=\""BOX-SIZING: border-box !important; FONT-FAMILY: 宋体; MAX-WIDTH: 100%; WORD-WRAP: break-word !important\"">&nbsp;<IMG src=\""http://17f.go5le.net/admin_manage/UploadFiles/201411712492232.jpg\""><IMG src=\""http://17f.go5le.net/admin_manage/UploadFiles/2014117124911440.jpg\""></SPAN></P><P style=\""BOX-SIZING: border-box !important; TEXT-TRANSFORM: none; BACKGROUND-COLOR: rgb(248,247,245); TEXT-INDENT: 0px; MARGIN: 0px; MIN-HEIGHT: 1em; FONT: 16px/25px 'Helvetica Neue', Helvetica, Arial, sans-serif; MAX-WIDTH: 100%; WORD-WRAP: normal; WHITE-SPACE: pre-wrap; LETTER-SPACING: normal; COLOR: rgb(62,62,62); WORD-SPACING: 0px; -webkit-text-stroke-width: 0px\""><SPAN style=\""BOX-SIZING: border-box !important; FONT-FAMILY: 宋体; MAX-WIDTH: 100%; WORD-WRAP: break-word !important\"">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </SPAN><SPAN style=\""BOX-SIZING: border-box !important; FONT-FAMILY: 宋体; MAX-WIDTH: 100%; WORD-WRAP: break-word !important\"">随着</SPAN>2014<SPAN style=\""BOX-SIZING: border-box !important; FONT-FAMILY: 宋体; MAX-WIDTH: 100%; WORD-WRAP: break-word !important\"">年年底的到来，准备明年装修的业主开始把装修事宜放到议事日程。年前把设计、拆墙、砌墙、水电、泥工做好，明年开春刚刚可以入住。为此，由汇宇家居、房世界、龙发装饰、</SPAN>FA<SPAN style=\""BOX-SIZING: border-box !important; FONT-FAMILY: 宋体; MAX-WIDTH: 100%; WORD-WRAP: break-word !important\"">别墅设计机构、各大品牌建材商联合主办的首届汇宇家居装修节，将于</SPAN>11<SPAN style=\""BOX-SIZING: border-box !important; FONT-FAMILY: 宋体; MAX-WIDTH: 100%; WORD-WRAP: break-word !important\"">月</SPAN>14<SPAN style=\""BOX-SIZING: border-box !important; FONT-FAMILY: 宋体; MAX-WIDTH: 100%; WORD-WRAP: break-word !important\"">日、</SPAN>15<SPAN style=\""BOX-SIZING: border-box !important; FONT-FAMILY: 宋体; MAX-WIDTH: 100%; WORD-WRAP: break-word !important\"">日在汇宇家居广场隆重举行，为期</SPAN>2<SPAN style=\""BOX-SIZING: border-box !important; FONT-FAMILY: 宋体; MAX-WIDTH: 100%; WORD-WRAP: break-word !important\"">天的活动，将为萧山业主“一站式”定制新居。届时，著名主持人马振宇也将亲临现场，为业主们争取更多优惠和让利。</SPAN></P><P style=\""BOX-SIZING: border-box !important; TEXT-TRANSFORM: none; BACKGROUND-COLOR: rgb(248,247,245); TEXT-INDENT: 0px; MARGIN: 0px; MIN-HEIGHT: 1em; FONT: 16px/25px 'Helvetica Neue', Helvetica, Arial, sans-serif; MAX-WIDTH: 100%; WORD-WRAP: normal; WHITE-SPACE: pre-wrap; LETTER-SPACING: normal; COLOR: rgb(62,62,62); WORD-SPACING: 0px; -webkit-text-stroke-width: 0px\""><SPAN style=\""BOX-SIZING: border-box !important; FONT-FAMILY: 宋体; MAX-WIDTH: 100%; WORD-WRAP: break-word !important\""><IMG src=\""http://17f.go5le.net/admin_manage/UploadFiles/2014117125014936.jpg\""></SPAN></P><P style=\""BOX-SIZING: border-box !important; TEXT-TRANSFORM: none; BACKGROUND-COLOR: rgb(248,247,245); TEXT-INDENT: 0px; MARGIN: 0px; MIN-HEIGHT: 1em; FONT: 16px/25px 'Helvetica Neue', Helvetica, Arial, sans-serif; MAX-WIDTH: 100%; WORD-WRAP: normal; WHITE-SPACE: pre-wrap; LETTER-SPACING: normal; COLOR: rgb(62,62,62); WORD-SPACING: 0px; -webkit-text-stroke-width: 0px\""><SPAN style=\""BOX-SIZING: border-box !important; FONT-FAMILY: Arial; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; FONT-SIZE: 14px\""></SPAN></P><P style=\""BOX-SIZING: border-box !important; TEXT-TRANSFORM: none; BACKGROUND-COLOR: rgb(248,247,245); TEXT-INDENT: 0px; MARGIN: 0px; MIN-HEIGHT: 1em; FONT: 16px/25px 'Helvetica Neue', Helvetica, Arial, sans-serif; MAX-WIDTH: 100%; WORD-WRAP: normal; WHITE-SPACE: pre-wrap; LETTER-SPACING: normal; COLOR: rgb(62,62,62); WORD-SPACING: 0px; -webkit-text-stroke-width: 0px\""><SPAN style=\""BOX-SIZING: border-box !important; FONT-FAMILY: 宋体; MAX-WIDTH: 100%; WORD-WRAP: break-word !important\"">上千套设计案例让你选</SPAN></P><P style=\""BOX-SIZING: border-box !important; TEXT-TRANSFORM: none; BACKGROUND-COLOR: rgb(248,247,245); TEXT-INDENT: 28px; MARGIN: 0px; MIN-HEIGHT: 1em; FONT: 16px/25px 'Helvetica Neue', Helvetica, Arial, sans-serif; MAX-WIDTH: 100%; WORD-WRAP: normal; WHITE-SPACE: pre-wrap; LETTER-SPACING: normal; COLOR: rgb(62,62,62); WORD-SPACING: 0px; -webkit-text-stroke-width: 0px\""><SPAN style=\""BOX-SIZING: border-box !important; FONT-FAMILY: 宋体; MAX-WIDTH: 100%; WORD-WRAP: break-word !important\"">活动现场将展示萧山各大楼盘设计成果，有金地天逸、名门世家、开元广场、四季华庭、尚美名府、学林尚苑、江南丽景、御景湾、博奥城、堤香、湘域湾、霞飞郡、旺角城、蓝爵国际、湖滨花园、东方一品等楼盘的上千套设计案例，可供业主参考。届时，现场还有萧山资深设计师坐镇现场一对一为业主讲解，最新低碳材料、施工工艺展示，以及</SPAN>10<SPAN style=\""BOX-SIZING: border-box !important; FONT-FAMILY: 宋体; MAX-WIDTH: 100%; WORD-WRAP: break-word !important\"">套样板房参观。与此同时，</SPAN>FA<SPAN style=\""BOX-SIZING: border-box !important; FONT-FAMILY: 宋体; MAX-WIDTH: 100%; WORD-WRAP: break-word !important\"">别墅设计机构还将举办“别墅&#8226;设计家”主题讲座，解析别墅家居生活的意义，还有风水设计师为业主讲解家居环境。</SPAN></P><P style=\""BOX-SIZING: border-box !important; TEXT-TRANSFORM: none; BACKGROUND-COLOR: rgb(248,247,245); TEXT-INDENT: 0px; MARGIN: 0px; MIN-HEIGHT: 1em; FONT: 16px/25px 'Helvetica Neue', Helvetica, Arial, sans-serif; MAX-WIDTH: 100%; WORD-WRAP: normal; WHITE-SPACE: pre-wrap; LETTER-SPACING: normal; COLOR: rgb(62,62,62); WORD-SPACING: 0px; -webkit-text-stroke-width: 0px\""><SPAN style=\""BOX-SIZING: border-box !important; FONT-FAMILY: Arial; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; FONT-SIZE: 14px\""></SPAN></P><P style=\""BOX-SIZING: border-box !important; TEXT-TRANSFORM: none; BACKGROUND-COLOR: rgb(248,247,245); TEXT-INDENT: 0px; MARGIN: 0px; MIN-HEIGHT: 1em; FONT: 16px/25px 'Helvetica Neue', Helvetica, Arial, sans-serif; MAX-WIDTH: 100%; WORD-WRAP: normal; WHITE-SPACE: pre-wrap; LETTER-SPACING: normal; COLOR: rgb(62,62,62); WORD-SPACING: 0px; -webkit-text-stroke-width: 0px\""><IMG src=\""http://17f.go5le.net/admin_manage/UploadFiles/2014117125039974.jpg\""></P><P style=\""BOX-SIZING: border-box !important; TEXT-TRANSFORM: none; BACKGROUND-COLOR: rgb(248,247,245); TEXT-INDENT: 0px; MARGIN: 0px; MIN-HEIGHT: 1em; FONT: 16px/25px 'Helvetica Neue', Helvetica, Arial, sans-serif; MAX-WIDTH: 100%; WORD-WRAP: normal; WHITE-SPACE: pre-wrap; LETTER-SPACING: normal; COLOR: rgb(62,62,62); WORD-SPACING: 0px; -webkit-text-stroke-width: 0px\""><IMG src=\""http://17f.go5le.net/admin_manage/UploadFiles/2014117125056375.jpg\""></P><P style=\""BOX-SIZING: border-box !important; TEXT-TRANSFORM: none; BACKGROUND-COLOR: rgb(248,247,245); TEXT-INDENT: 0px; MARGIN: 0px; MIN-HEIGHT: 1em; FONT: 16px/25px 'Helvetica Neue', Helvetica, Arial, sans-serif; MAX-WIDTH: 100%; WORD-WRAP: normal; WHITE-SPACE: pre-wrap; LETTER-SPACING: normal; COLOR: rgb(62,62,62); WORD-SPACING: 0px; -webkit-text-stroke-width: 0px\""><IMG src=\""http://17f.go5le.net/admin_manage/UploadFiles/2014117125130508.jpg\""></P><P style=\""BOX-SIZING: border-box !important; TEXT-TRANSFORM: none; BACKGROUND-COLOR: rgb(248,247,245); TEXT-INDENT: 0px; MARGIN: 0px; MIN-HEIGHT: 1em; FONT: 16px/25px 'Helvetica Neue', Helvetica, Arial, sans-serif; MAX-WIDTH: 100%; WORD-WRAP: normal; WHITE-SPACE: pre-wrap; LETTER-SPACING: normal; COLOR: rgb(62,62,62); WORD-SPACING: 0px; -webkit-text-stroke-width: 0px\""><IMG src=\""http://17f.go5le.net/admin_manage/UploadFiles/2014117125722360.jpg\""></P><P style=\""BOX-SIZING: border-box !important; TEXT-TRANSFORM: none; BACKGROUND-COLOR: rgb(248,247,245); TEXT-INDENT: 0px; MARGIN: 0px; MIN-HEIGHT: 1em; FONT: 16px/25px 'Helvetica Neue', Helvetica, Arial, sans-serif; MAX-WIDTH: 100%; WORD-WRAP: normal; WHITE-SPACE: pre-wrap; LETTER-SPACING: normal; COLOR: rgb(62,62,62); WORD-SPACING: 0px; -webkit-text-stroke-width: 0px\""><IMG src=\""http://17f.go5le.net/admin_manage/UploadFiles/2014117125246988.jpg\""></P><P style=\""BOX-SIZING: border-box !important; TEXT-TRANSFORM: none; BACKGROUND-COLOR: rgb(248,247,245); TEXT-INDENT: 0px; MARGIN: 0px; MIN-HEIGHT: 1em; FONT: 16px/25px 'Helvetica Neue', Helvetica, Arial, sans-serif; MAX-WIDTH: 100%; WORD-WRAP: normal; WHITE-SPACE: pre-wrap; LETTER-SPACING: normal; COLOR: rgb(62,62,62); WORD-SPACING: 0px; -webkit-text-stroke-width: 0px\""><IMG src=\""http://17f.go5le.net/admin_manage/UploadFiles/2014117125738697.jpg\""></P><P style=\""BOX-SIZING: border-box !important; TEXT-TRANSFORM: none; BACKGROUND-COLOR: rgb(248,247,245); TEXT-INDENT: 0px; MARGIN: 0px; MIN-HEIGHT: 1em; FONT: 16px/25px 'Helvetica Neue', Helvetica, Arial, sans-serif; MAX-WIDTH: 100%; WORD-WRAP: normal; WHITE-SPACE: pre-wrap; LETTER-SPACING: normal; COLOR: rgb(62,62,62); WORD-SPACING: 0px; -webkit-text-stroke-width: 0px\""><IMG src=\""http://17f.go5le.net/admin_manage/UploadFiles/2014117125748583.jpg\""></P><P style=\""BOX-SIZING: border-box !important; TEXT-TRANSFORM: none; BACKGROUND-COLOR: rgb(248,247,245); TEXT-INDENT: 0px; MARGIN: 0px; MIN-HEIGHT: 1em; FONT: 16px/25px 'Helvetica Neue', Helvetica, Arial, sans-serif; MAX-WIDTH: 100%; WORD-WRAP: normal; WHITE-SPACE: pre-wrap; LETTER-SPACING: normal; COLOR: rgb(62,62,62); WORD-SPACING: 0px; -webkit-text-stroke-width: 0px\""><IMG src=\""http://17f.go5le.net/admin_manage/UploadFiles/2014117125757282.jpg\""></P><P style=\""BOX-SIZING: border-box !important; TEXT-TRANSFORM: none; BACKGROUND-COLOR: rgb(248,247,245); TEXT-INDENT: 0px; MARGIN: 0px; MIN-HEIGHT: 1em; FONT: 16px/25px 'Helvetica Neue', Helvetica, Arial, sans-serif; MAX-WIDTH: 100%; WORD-WRAP: normal; WHITE-SPACE: pre-wrap; LETTER-SPACING: normal; COLOR: rgb(62,62,62); WORD-SPACING: 0px; -webkit-text-stroke-width: 0px\""><SPAN style=\""BOX-SIZING: border-box !important; FONT-FAMILY: Arial; MAX-WIDTH: 100%; WORD-WRAP: break-word !important; FONT-SIZE: 14px\""></SPAN></P><P style=\""BOX-SIZING: border-box !important; TEXT-TRANSFORM: none; BACKGROUND-COLOR: rgb(248,247,245); TEXT-INDENT: 21px; MARGIN: 0px; MIN-HEIGHT: 1em; FONT: 16px/25px 'Helvetica Neue', Helvetica, Arial, sans-serif; MAX-WIDTH: 100%; WORD-WRAP: normal; WHITE-SPACE: pre-wrap; LETTER-SPACING: normal; COLOR: rgb(62,62,62); WORD-SPACING: 0px; -webkit-text-stroke-width: 0px\""><SPAN style=\""BOX-SIZING: border-box !important; FONT-FAMILY: 宋体; MAX-WIDTH: 100%; WORD-WRAP: break-word !important\"">到场业主现场下单即可享受九重大礼，签到就送万元主材大礼包、包括定金双倍升级、管理费对折、设计费对折、现场还有抽奖活动，现在报名还可提前获得设计方案</SPAN><SPAN style=\""BOX-SIZING: border-box !important; FONT-FAMILY: 宋体; MAX-WIDTH: 100%; WORD-WRAP: break-word !important\"">。</SPAN></P><P style=\""BOX-SIZING: border-box !important; TEXT-TRANSFORM: none; BACKGROUND-COLOR: rgb(248,247,245); TEXT-INDENT: 21px; MARGIN: 0px; MIN-HEIGHT: 1em; FONT: 16px/25px 'Helvetica Neue', Helvetica, Arial, sans-serif; MAX-WIDTH: 100%; WORD-WRAP: normal; WHITE-SPACE: pre-wrap; LETTER-SPACING: normal; COLOR: rgb(62,62,62); WORD-SPACING: 0px; -webkit-text-stroke-width: 0px\""><SPAN style=\""BOX-SIZING: border-box !important; FONT-FAMILY: 宋体; MAX-WIDTH: 100%; WORD-WRAP: break-word !important\""></SPAN></P><P style=\""BOX-SIZING: border-box !important; TEXT-TRANSFORM: none; BACKGROUND-COLOR: rgb(248,247,245); TEXT-INDENT: 0px; MARGIN: 0px; MIN-HEIGHT: 1em; FONT: 16px/25px 'Helvetica Neue', Helvetica, Arial, sans-serif; MAX-WIDTH: 100%; WORD-WRAP: normal; WHITE-SPACE: pre-wrap; LETTER-SPACING: normal; COLOR: rgb(62,62,62); WORD-SPACING: 0px; -webkit-text-stroke-width: 0px\""><SPAN style=\""BOX-SIZING: border-box !important; FONT-FAMILY: 宋体; MAX-WIDTH: 100%; WORD-WRAP: break-word !important\""><IMG src=\""http://17f.go5le.net/admin_manage/UploadFiles/201411713315558.jpg\""></SPAN></P><P style=\""BOX-SIZING: border-box !important; TEXT-TRANSFORM: none; BACKGROUND-COLOR: rgb(248,247,245); TEXT-INDENT: 0px; MARGIN: 0px; MIN-HEIGHT: 1em; FONT: 16px/25px 'Helvetica Neue', Helvetica, Arial, sans-serif; MAX-WIDTH: 100%; WORD-WRAP: normal; WHITE-SPACE: pre-wrap; LETTER-SPACING: normal; COLOR: rgb(62,62,62); WORD-SPACING: 0px; -webkit-text-stroke-width: 0px\""><SPAN style=\""BOX-SIZING: border-box !important; FONT-FAMILY: 宋体; MAX-WIDTH: 100%; WORD-WRAP: break-word !important\""><IMG src=\""http://17f.go5le.net/admin_manage/UploadFiles/201411713329195.jpg\""></SPAN></P><P style=\""BOX-SIZING: border-box !important; TEXT-TRANSFORM: none; BACKGROUND-COLOR: rgb(248,247,245); TEXT-INDENT: 0px; MARGIN: 0px; MIN-HEIGHT: 1em; FONT: 16px/25px 'Helvetica Neue', Helvetica, Arial, sans-serif; MAX-WIDTH: 100%; WORD-WRAP: normal; WHITE-SPACE: pre-wrap; LETTER-SPACING: normal; COLOR: rgb(62,62,62); WORD-SPACING: 0px; -webkit-text-stroke-width: 0px\""><SPAN style=\""BOX-SIZING: border-box !important; FONT-FAMILY: 宋体; MAX-WIDTH: 100%; WORD-WRAP: break-word !important\"">报名热线：</SPAN>82658837 </P><P style=\""BOX-SIZING: border-box !important; TEXT-TRANSFORM: none; BACKGROUND-COLOR: rgb(248,247,245); TEXT-INDENT: 0px; MARGIN: 0px; MIN-HEIGHT: 1em; FONT: 16px/25px 'Helvetica Neue', Helvetica, Arial, sans-serif; MAX-WIDTH: 100%; WORD-WRAP: normal; WHITE-SPACE: pre-wrap; LETTER-SPACING: normal; COLOR: rgb(62,62,62); WORD-SPACING: 0px; -webkit-text-stroke-width: 0px\""><SPAN style=\""BOX-SIZING: border-box !important; FONT-FAMILY: 宋体; MAX-WIDTH: 100%; WORD-WRAP: break-word !important\"">活动时间：</SPAN>11<SPAN style=\""BOX-SIZING: border-box !important; FONT-FAMILY: 宋体; MAX-WIDTH: 100%; WORD-WRAP: break-word !important\"">月</SPAN>14<SPAN style=\""BOX-SIZING: border-box !important; FONT-FAMILY: 宋体; MAX-WIDTH: 100%; WORD-WRAP: break-word !important\"">日—</SPAN>15<SPAN style=\""BOX-SIZING: border-box !important; FONT-FAMILY: 宋体; MAX-WIDTH: 100%; WORD-WRAP: break-word !important\"">日</SPAN></P><P style=\""BOX-SIZING: border-box !important; TEXT-TRANSFORM: none; BACKGROUND-COLOR: rgb(248,247,245); TEXT-INDENT: 0px; MARGIN: 0px; MIN-HEIGHT: 1em; FONT: 16px/25px 'Helvetica Neue', Helvetica, Arial, sans-serif; MAX-WIDTH: 100%; WORD-WRAP: normal; WHITE-SPACE: pre-wrap; LETTER-SPACING: normal; COLOR: rgb(62,62,62); WORD-SPACING: 0px; -webkit-text-stroke-width: 0px\""><SPAN style=\""BOX-SIZING: border-box !important; FONT-FAMILY: 宋体; MAX-WIDTH: 100%; WORD-WRAP: break-word !important\"">活动地点：萧山汇宇家居广场</SPAN></P><P style=\""BOX-SIZING: border-box !important; TEXT-TRANSFORM: none; BACKGROUND-COLOR: rgb(248,247,245); TEXT-INDENT: 0px; MARGIN: 0px; MIN-HEIGHT: 1em; FONT: 16px/25px 'Helvetica Neue', Helvetica, Arial, sans-serif; MAX-WIDTH: 100%; WORD-WRAP: normal; WHITE-SPACE: pre-wrap; LETTER-SPACING: normal; COLOR: rgb(62,62,62); WORD-SPACING: 0px; -webkit-text-stroke-width: 0px\""><SPAN style=\""BOX-SIZING: border-box !important; FONT-FAMILY: 宋体; MAX-WIDTH: 100%; WORD-WRAP: break-word !important\""><IMG src=\""http://17f.go5le.net/admin_manage/UploadFiles/201411713143486.jpg\""></SPAN></P></SPAN></H2>""]]"
'abc="[[""H2 st<yle=>""]]"
response1= callback1&"({err_code:0, err_msg:""success"", data:{items:"&abc&", token:""whatever""}})"
'response1= callback1&abc
Response.Write response1 
'Response.write Replace("asd""fs""fsdfsdf",Chr(34),"\"&Chr(34)&Chr(34))
%>