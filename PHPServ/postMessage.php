<!DOCTYPE html>
<html>
<head>
    <script>
        window.onload=function(){
            function handMessage(event){
                event = event || window.event;
                //��֤�Ƿ�����Ԥ���ڵ���������ǲ�����������Ҳ��Ϊ�˰�ȫ���濼��
                //if(event.origin === 'http://www.postmessage1.com'){
                    document.getElementById('divMessage').innerHTML = event.data;
		    alert(event.data);
                //}
            }
            //��window�����message�¼�����
            if(window.addEventListener){
                window.addEventListener("message", handMessage, false);
            }
            else{
                window.attachEvent("onmessage", handMessage);
            }      
        }        
    </script>
</head>
<body>
���ǲ�ͬ���iframeҳ�棬�����ǽ��ܵ�����Ϣ����
<div id="divMessage"></div>
</body>
</html>