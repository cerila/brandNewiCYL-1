<!--#include file="top.asp" -->
<body>
	<div class="content">
		<table border=0 width="100%"><tr ><td align="center">
			<img src="../27/d1.png"></td><td><font size="5pt" ><%=comp%></font>
			</td></tr>
			<tr ><td align="center" colspan=2>
			<font size="3pt" color="#8692AC">�ǻ��������</font>
			</td></tr>
			</table>
						
	
		<!--<section class="cc-search" style="padding-top: 10px">
			<div class="c-form-search">
				<form name="searchForm" method="get" action="search.php">
					<input autocomplete="off" class="inp-search" id="keywords"
						name="keywords" type="search" value="" placeholder="������ʳ������"> <input
						class="bton-search" name="search-bton" type="submit" value="">
				</form>
			</div>
		</section>-->
		<div class="content">&nbsp;
		<% sql="select count(*) from mall_dingdan where bz is not null and sysdate-ly_date<5 and  buyerid='"&shopid&"'"
		Set rs=conn.execute(sql)
		If CInt(rs(0))>0 then%>
		<p><a href="../mall/index/dingdan_list.asp?no=<%=shopid%>"><font color="white">--</font><img  src="../mall/index/lb.png" border=0><font color="#330902">:��Ļ��<font color="red"><%=rs(0)%></font>���ظ���.�鿴�ҵĻ</font></a>
		<% rs.close
		Set rs=nothing
		End If
		'Response.write shopid%>
		��<%=comp2(shopid)%>��
</div>
		<section class="in-commt">
			<p class="in-comm-tag">		
						
						 <a href='../main_dj.asp?no=<%=shopid%>&po=<%=shopid%>' style="display: block; font-size: 18px; color: #fff; text-indent: 1em; font-weight: bold; height: 50px; line-height: 50px; background: -webkit-gradient(linear, 0 0, 0 100%, from(#ff9737), to(#cc6202) );">�ҵķ���<font size=2 color="#F0EBE4">--ȫ�淽���������</font></a><span class="space10">|</span>
						 <a href='../88/index.asp?no=<%=shopid%>' style="display: block; font-size: 18px; color: #fff; text-indent: 1em; font-weight: bold; height: 50px; line-height: 50px; background: -webkit-gradient(linear, 0 0, 0 100%, from(#ff9737), to(#cc6202) );">ǩ������<font size=2 color="#F0EBE4">--�ǩ������</font></a><span class="space10">|</span>
						  <a href='../27/index.asp?no=<%=shopid%>' style="display: block; font-size: 18px; color: #fff; text-indent: 1em; font-weight: bold; height: 50px; line-height: 50px; background: -webkit-gradient(linear, 0 0, 0 100%, from(#ff9737), to(#cc6202) );">ͨѶ¼<font size=2 color="#F0EBE4">--�ǩ������</font></a><span class="space10">|</span>
						 <a href='../../mall/user/dj_pro_total.asp?no=<%=shopid%>' style="display: block; font-size: 18px; color: #fff; text-indent: 1em; font-weight: bold; height: 50px; line-height: 50px; background: -webkit-gradient(linear, 0 0, 0 100%, from(#ff9737), to(#cc6202) );">�ͳ��<font size=2 color="#F0EBE4">--��һʱ��õ���Ա�ı�����Ϣ</font></a><span class="space10">|</span>
						  <a href='../../mall/index/dingdan_list_dj.asp?no=<%=shopid%>' style="display: block; font-size: 18px; color: #fff; text-indent: 1em; font-weight: bold; height: 50px; line-height: 50px; background: -webkit-gradient(linear, 0 0, 0 100%, from(#ff9737), to(#cc6202) );">��Ҫǩ��<font size=2 color="#F0EBE4">--��ʾ�����֤���ǩ��</font></a><span class="space10">|</span>
						  <a href='../../mall/index/dingdan_list_djbm.asp?no=<%=shopid%>' style="display: block; font-size: 18px; color: #fff; text-indent: 1em; font-weight: bold; height: 50px; line-height: 50px; background: -webkit-gradient(linear, 0 0, 0 100%, from(#ff9737), to(#cc6202) );">���֯<font size=2 color="#F0EBE4">--��֯�����Ա�������</font></a><span class="space10">|</span>
						 <a href='../../94/index.asp?no=<%=shopid%>' style="display: block; font-size: 18px; color: #fff; text-indent: 1em; font-weight: bold; height: 50px; line-height: 50px; background: -webkit-gradient(linear, 0 0, 0 100%, from(#ff9737), to(#cc6202) );">�����ײ�<font size=2 color="#F0EBE4">--���Լ�����</font></a><span class="space10">|</span>
						  <a href='category.asp?no=<%=shopid%>' style="display: block; font-size: 18px; color: #fff; text-indent: 1em; font-weight: bold; height: 50px; line-height: 50px; background: -webkit-gradient(linear, 0 0, 0 100%, from(#ff9737), to(#cc6202) );">�����<font size=2 color="#F0EBE4">--��ʱ�ĸ�������ĳ�Ա����</font></a><span class="space10">|</span>
						  <a href='../70/index.asp?no=<%=shopid%>' style="display: block; font-size: 18px; color: #fff; text-indent: 1em; font-weight: bold; height: 50px; line-height: 50px; background: -webkit-gradient(linear, 0 0, 0 100%, from(#ff9737), to(#cc6202) );">�ҵ�Ե��<font size=2 color="#F0EBE4">--�����꽻�ѻ���</font></a><span class="space10">|</span>
						  <a href='#' style="display: block; font-size: 18px; color: #fff; text-indent: 1em; font-weight: bold; height: 50px; line-height: 50px; background: -webkit-gradient(linear, 0 0, 0 100%, from(#ff9737), to(#cc6202) );">�����ѯ<font size=2 color="#F0EBE4">--�����飬ȡ������</font></a><span class="space10">|</span>
						<!-- <a href='#' style="display: block; font-size: 18px; color: #fff; text-indent: 1em; font-weight: bold; height: 50px; line-height: 50px; background: -webkit-gradient(linear, 0 0, 0 100%, from(#ff9737), to(#cc6202) );">���ʽ���<font size=2 color="#F0EBE4">--���ɵ������ҵ����Ա�Ľ���</font></a><span class="space10">|</span>-->
						 <a href='../../mall/user/dj_pro_totalxh.asp?no=<%=shopid%>' style="display: block; font-size: 18px; color: #fff; text-indent: 1em; font-weight: bold; height: 50px; line-height: 50px; background: -webkit-gradient(linear, 0 0, 0 100%, from(#ff9737), to(#cc6202) );">���ͳ��<font size=2 color="#F0EBE4">--�˽��������</font></a><span class="space10">|</span>
										 <!--<a href='#../hs_1/lxr_login.asp' style="display: block; font-size: 18px; color: #fff; text-indent: 1em; font-weight: bold; height: 50px; line-height: 50px; background: -webkit-gradient(linear, 0 0, 0 100%, from(#ff9737), to(#cc6202) );">��Ա����<font size=2 color="#F0EBE4">--��Ա����/���ʽ���/�����</font></a><span class="space10">|</span>
						 <a href='../5/news_mb.asp?no=900006822' style="display: block; font-size: 18px; color: #fff; text-indent: 1em; font-weight: bold; height: 50px; line-height: 50px; background: -webkit-gradient(linear, 0 0, 0 100%, from(#ff9737), to(#cc6202) );">΢վģ��<font size=2 color="#F0EBE4">--�ϰ��־���ģ��</font></a><span class="space10">|</span>
						 <a href='../mall/index/dingdan_list_gwc.asp?no=<%=shopid%>' style="display: block; font-size: 18px; color: #fff; text-indent: 1em; font-weight: bold; height: 50px; line-height: 50px; background: -webkit-gradient(linear, 0 0, 0 100%, from(#ff9737), to(#cc6202) );">���˹��ﳵ<font size=2 color="#F0EBE4">--δ�»����</font></a><span class="space10">|</span>
						  <a href='../5/news_help.asp' style="display: block; font-size: 18px; color: #fff; text-indent: 1em; font-weight: bold; height: 50px; line-height: 50px; background: -webkit-gradient(linear, 0 0, 0 100%, from(#ff9737), to(#cc6202) );">��������<font size=2 color="#F0EBE4">--���ɵĲ������й���</font></a><span class="space10">|</span>
						   <a href='../mall/index/dingdan_list.asp?no=<%=shopid%>' style="display: block; font-size: 18px; color: #fff; text-indent: 1em; font-weight: bold; height: 50px; line-height: 50px; background: -webkit-gradient(linear, 0 0, 0 100%, from(#ff9737), to(#cc6202) );">���˻<font size=2 color="#F0EBE4">--���˼��Ƽ��</font></a><span class="space10">|</span>-->
						<!-- <a href="user.php@act=user_center"
					style="display: block; font-size: 18px; color: #fff; text-indent: 1em; font-weight: bold; height: 50px; line-height: 50px; background: -webkit-gradient(linear, 0 0, 0 100%, from(#ff9737), to(#cc6202) );">
					��ֵ����<font size=2 color="#F0EBE4">--��ֵ����ͬʱ���������</font></a>-->
			</p>
		</section>

		<!--#include file="foot.asp" -->
	</div>
	<script src="../dist/js/1.10.2/jquery.min.js"></script>
	<script type="text/javascript">
      $(document).ready(function() {
        var cookie = document.cookie.match(new RegExp('(^| )xsunion=([^;]*)(;|$)'));
        if(!!cookie[0]) {
          localStorage.setItem('xsunion', cookie[0]);
        }
        //alert(cookie);
      });
    </script>
</body>
</html>