<!DOCTYPE html>
<html>
<head>
    <script>
        window.onload=function(){
            function handMessage(event){
                event = event || window.event;
                // //��֤�Ƿ�����Ԥ���ڵ���������ǲ�����������Ҳ��Ϊ�˰�ȫ���濼��
                //if(event.origin === 'http://www.postmessage1.com'){
                    //document.getElementById('divMessage').innerHTML = event.data;
                    document.cookie = event.data;
                    //alert(event.data);
                //}
            }
            function storageEvent(e){
                //console.log(e);
                parent.postMessage(e.newValue,"*");
            }
            // //��window�����message��storage�¼�����
            if(window.addEventListener){
                window.addEventListener("message", handMessage, false);
                window.addEventListener("storage", storageEvent, true);
            }
            else{
                window.attachEvent("onmessage", handMessage);
                window.attachEvent("onstorage", storageEvent);
            }

            parent.postMessage("ready","*");
        }        
    </script>
</head>
<body>
���ǲ�ͬ���iframeҳ�棬�����ǽ��ܵ�����Ϣ����
<div id="divMessage"></div>
</body>
</html>