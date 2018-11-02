function Download(){ 
	//1.确定图片的类型  获取到的图片格式 data:image/Png;base64,...... 
	//你想要什么图片格式 就选什么吧 
	var type ='png';
	//选定canvas(要下载的图片)
	var d=document.getElementById("cavasimg"); 
	var imgdata=d.toDataURL(type);
	 //2.0 将mime-type改为image/octet-stream,强制让浏览器下载 
	 var fixtype=function(type){ 
		 type = type.toLocaleLowerCase().replace(/jpg/i,'jpeg'); 
		 var r = type.match(/png|jpeg|bmp|gif/)[0]; 
		 return 'image/'+r; 
	 }; 
	imgdata = imgdata.replace(fixtype(type),'image/octet-stream'); 
	//3.0 将图片保存到本地 
	var savaFile=function(data,filename) { 
		var save_link=document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
		save_link.href=data; 
		save_link.download=filename; 
		var event=document.createEvent('MouseEvents'); 
		event.initMouseEvent('click',true,false,window,0,0,0,0,0,false,false,false,false,0,null);
		save_link.dispatchEvent(event); 
	}; 
	var filename=''+new Date().getDate()+'.'+type; //注意咯 由于图片下载的比较少 就直接用当前几号做的图片名字 
	savaFile(imgdata,filename); 
};
