// 关键词
// 判断关键词是否重复


function keyWord(){
	this.param={
	    language:0,
	    popClass:"popkeyword", 
	    aiGent:null,
	}
	this.judgeSameKeyword=function(keyword){
		  var $li = $('.'+this.param.popClass+'ul li');
		    for (var i = 0; i < $li.length - 1; i++) {
		        if ($('div', $li[i]).html() == keyword) {
		            return true;
		        }
		    }
		    return false
	}
	this.keydown=function(inputContent){
		var  keyCodeflag=false;
		if(event.keyCode == 32&&!isEnkeyword()){
			if (/[\u4e00-\u9fa5]/.test($(this).val())) {
				keyCodeflag=true;
			} else {
				keyCodeflag=false;
			}
		}
	    if (event.keyCode == 13 || keyCodeflag) {
	        this.addKeywordLi(inputContent);
	        $(this).val('');
	    } else if (event.keyCode == 8 && inputContent== '') {
	        if ($('.'+this.param.popClass+'ul li').length > 1) {
	            $('.'+this.param.popClass+'ul li:last-child').prev().remove();
	            $('.'+this.param.popClass+'ul li:last-child').show();
	        }
	        if ($('.'+this.param.popClass+'ul li').length == 1) {
	            $('.'+this.param.popClass+'Tip').show();
	        }
	    } 
	}
	 this.init=function() {
		 this.eventBind();
	 }
	// 添加关键词li
	this.addKeywordLi=function(keyword) {
	    if (typeof keyword != "undefined" && keyword != null && keyword.trim() != '') {
	        if ($('.'+this.param.popClass+'ul li').length <= 10) {
	            if (!this.judgeSameKeyword(keyword)) {
	                var $li = $("<li><div>" + keyword + "</div><img src='" + zqcdn + "/img/aithesis/close.png'></li>");
	                $('.'+this.param.popClass+'ul li:last-child').before($li);
	                $('.'+this.param.popClass+'Tip').hide();
	                if ( $('.'+this.param.popClass+'ul  li').length > 10) {
	                	 $('.'+this.param.popClass+'ul  li:last-child').hide();
	                } 
	            }
	        }
	    }
	}
	// 输入
	this.enventInput=function(inputContent){
		    if (inputContent != null && inputContent.trim() != "") {
		        var newChar = inputContent.charAt(inputContent.length - 1);
		        var  inputKeywordFlag=false;
		    	if( newChar == ' '&&!isEnkeyword()){
		    		if (/[\u4e00-\u9fa5]/.test($(this).val())) {
		    			keyCodeflag=true;
		    		} else {
		    			keyCodeflag=false;
		    		}
		    	}
		        if (newChar == ',' || newChar == '，' || newChar == ';' || newChar == '；' ||inputKeywordFlag) {
		            var keywordContent = inputContent.substring(0, inputContent.length - 1);
		            if (keywordContent != null && keywordContent.trim() != "") {
		                this.addKeywordLi(keywordContent);
		                $(this).val('');
		            } else {
		                $(this).val(keywordContent);
		            }
		        }
		        $('.'+this.param.popClass+'Tip').hide();
		    } else if (inputContent.trim() == '') {
		        $(this).val('');
		    }
	 }
	//创建标签元素
	this.createTag=function (text) {
		var pastedContext =text;
	    var keyCodeflag=false;
		if (/[\u4e00-\u9fa5]/.test(pastedContext)) {
			keyCodeflag=false;
		}else{
			keyCodeflag=true;
		}
	    var delimiters = /[，,；; ]+/;
	    if(this.isEnkeyword()||keyCodeflag){
	    	delimiters = /[，,；;]+/;
	    }
	    var arrList = pastedContext.trim().split(delimiters);
	    for (var i = 0; i < arrList.length; i++) {
	        var inputContent = arrList[i].trim();
	        this.addKeywordLi(inputContent);
	    }
	}
	this.isEnkeyword=function(){
		var islanguageitem=$('input[name=languageitem]:checked').val();
	    if(islanguageitem!=null&&islanguageitem==1 ){
	    	return true;
	    }
	    return false;
	}
	this.eventBind=function(){
		// 监听input失去焦点事件
	       $('body').delegate(`.${this.param.popClass}input`, 'keydown',(e) =>  {
	           var inputContent = $(e.currentTarget).val();
	           this.keydown(inputContent);
	       })
		

     	// 监听输入框input事件 kewinput
       $('body').delegate(`.${this.param.popClass}input`, 'input', (e) => {
    	   var inputContent = $(e.currentTarget).val();
    	   this.enventInput(inputContent);
	    })
		 
		// 删除关键词
       $('body').delegate(`.${this.param.popClass}ul li img`, 'click',(e) =>  {
    		   $(e.currentTarget).parent().remove();
    		   $('.'+this.param.popClass+'ul li:last-child').show();
		       if ($('.'+this.param.popClass+'ul li').length == 1) {
		    	   $('.'+this.param.popClass+'Tip').show();
		       }
	    })
    // 监听input失去焦点事件
       $('body').delegate(`.${this.param.popClass}input`, 'blur',(e) =>  {
           var inputContent = $(e.currentTarget).val();
           this.addKeywordLi(inputContent);
           $(`.${this.param.popClass}input`).val('');
           if ($('.'+this.param.popClass+'ul li').length == 1) {
        	   $('.'+this.param.popClass+'Tip').show();
           }
       })
       // 监听inputBox点击事件
		$('body').delegate(`.${this.param.popClass}`, 'click',(e) => {
		    if ($('.'+this.param.popClass+'ul li').length < 10) {
		    	 $('.'+this.param.popClass+'Tip').hide();
		        $(`.${this.param.popClass}input`).focus();
		    }
		})
       
	}
	
	 // 生成中文关键词
    this.generateKeywords=function(title,language){
	     var params={};
	     params.title=title
	     params.language=Number(language);
	     $('.'+this.param.popClass+'ul li:last-child').siblings().remove();
	     $('.popkeywordinput').val('');
	     $('.'+this.param.popClass+'Tip').hide();
	     this.param.aiGent.commonLoadding('.retrieveKeywords','','left');
	     this.param.aiGent.commonParamBuild('开题报告','生成检索关键词',params,'qwen-long',this.aiGenerateKeyword)
    }
    
    this.aiGenerateKeyword = (event, content, params)=>{
        this.param.aiGent.closeCommonLoading('.retrieveKeywords');
	    if (event == 'chunk') {
	        $('.keywordTip').html('');
	        var currentKeywords=$(`.${this.param.popClass}input`).val();
	        $(`.${this.param.popClass}input`).val(currentKeywords+content);
	    }
	    if (event == 'ERROR') {
	        tip("关键词生成失败请稍后重试！")
	        return;
	    }
	    if (event == 'DONE') {
	        // 关键词生成完毕进行关键词格式化
	        var value= $(`.${this.param.popClass}input`).val()
	        if (value) {
	            try {
	            	this.createTag(value);
	            } catch (e) {
	            }
	            $(`.${this.param.popClass}input`).val('');
	        }
	    }
    }
}







//
//
//
//// 监听input粘贴事件
//$('body').delegate('#kwinput', 'paste', function (event) {
//    // 阻止默认的粘贴行为
//    event.preventDefault();
//    var pastedData = event.originalEvent.clipboardData || window.clipboardData;
//    // 获取剪贴板内容
//    var pastedContext = pastedData.getData('Text');
//    var keyCodeflag=false;
//	if (/[\u4e00-\u9fa5]/.test(pastedContext)) {
//		keyCodeflag=false;
//	}else{
//		keyCodeflag=true;
//	}
//    var delimiters = /[，,；; ]+/;
//    if(isEnkeyword()||keyCodeflag){
//    	delimiters = /[，,；;]+/;
//    }
//    var arrList = pastedContext.trim().split(delimiters);
//    for (var i = 0; i < arrList.length; i++) {
//        var inputContent = arrList[i].trim();
//        addKeywordLi(inputContent);
//    }
//});
//
//
//
//// 监听inputBox点击事件
//$('body').delegate('.keyword', 'click', function () {
//    if ($('.kw li').length < 10) {
//        $('#kwinput').focus();
//    }
//})
//
