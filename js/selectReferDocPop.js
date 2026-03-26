$(function () {

    
})


function selectReferDocPop(){
    this.param={
        // 弹窗外层class
        tipCloseflag:false,
        title:null,
        // 当前选中的语言类型 0：中文 1:英文
        language:0,
        selected_language:0,
        search_language:0,
        search_cn_current_page:1,
        search_en_current_page:1,
        //换一批
        cnChangeBatchTimes:1,
        enChangeBatchTimes:1,
        popClass:null,
        isInit:0,
        //当前选中的语言类型 0：中文 1:英文
        cn_list_current_page:1,
        cn_list_doc_type:0,
        en_list_current_page:1,
        en_list_doc_type:0,
        //是否显示检索
        isCnSearch:false,
        isEnSearch:false,
        // 是否是回显列表
        isCnCallBackList:false,
        isEnCallBackList:false,
        //中文文献列表
        cnDocList:[],
        //英文文献列表
        enDocList:[],
        //中文文献当前查询文献列表
        cnSearchDocList:[],
        //英文文献当前查询文献列表
        enSearchDocList:[],
        // 中文文献历史查询记录
        cnSearchDocHistoryList:[],
        // 英文文献历史查询记录
        enSearchDocHistoryList:[],
        //中文临时列表
        tempCnDocList: [],
        //英文临时列表
        tempEnDocList: [],
        callback:null,
        aiGent:null,
        keyword:null,
        cnGeneratedKeywords:'',
        enGeneratedKeywords:'',
        temp_keyword:'',
        currentCnSearch:{
            duration:0,
            language:0,
            journal_level:0,
            search_keywords:"",
            journal_base:[1,2,3,4,5],
            num:20,
            doc_type:"1;2;3"
        },
        currentEnSearch:{
            duration:0,
            language:1,
            journal_level:0,
            search_keywords:"",
            journal_base:[6,7,8,9],
            num:20,
            doc_type:"4;5;6"
        },
        docType: {
        	0:"全部",
            1: "中文期刊",
            2: "中文会议",
            3: "中文学位",
            4: "英文期刊",
            5: "英文会议",
            6: "英文学位"
        },
        docTypeNameType: {
        	 "全部":0,
             "中文期刊":1,
             "中文会议":2,
             "中文学位":3,
             "英文期刊":4,
             "英文会议":5,
             "英文学位":6
        },
        journalBase: {
            1: '北大核心',
            2: 'CSCD',
            3: 'CSTPCD',
            4: 'CHSSCD',
            5: 'CSSCI',
            6: 'SCI',
            7: 'EI',
            8: 'MEDLINE',
            9: 'CA'
        },
        commitCallback:null,
        concelCallback:null,
        // 下一步点击后的类型 0：中文 1:英文
        nextStepCnTypeFlag: '',
        nextStepEnTypeFlag: '',
        nextCnCurrent: 1,
        nextEnCurrent: 1,
    }
    //初始化检索条件弹窗
    this.init=function(params){
       // this.renderReferDocList();
        this.eventBind();
    }
    // 回显文献列表 根据已选文献 显示不同内容 每次都行显示中文
    this.renderReferDocList=function(){
        // 构建弹窗结构
            // 页面添加弹窗
        var content=`
                        <div id="sclectDocPopOnly">
                            <div class="selectLiteraturePopUp">
                                <div class="selectLiteratureContent">
                                    <div class="closeSelectLiteraturePopUp"></div>
                                    <h3 class="selectLiteratureTitle">选择掌桥文献</h3>
                                    <div class="tabSwitch">
                                        <div class="tabItem  active" data-language="0">中文文献</div>
                                        <div class="tabItem" data-language="1">英文文献</div>
                                    </div>
                                    <h4 class="selectLiteratureTips">tips: 系统会仔细阅读分析您的文献，并结合大纲和概述引用文献，可能会存在部分文献不被引用的情况</h4>
                                    
                                    <div id="selectDocPop">
                                    </div>
                                    
                                    <!-- 分页 -->
                                    <div class="selectLiteraturePag" style="display:none">
                                        <div id="pre_current_page">上一页</div>
                                        <div id="list_current_page">本页</div>
                                        <div id="next_current_page">下一页</div>
                                    </div>
                                    <div class="selectLiteratureFooter">
                                        <!-- 上传篇数与总篇数 -->
                                        <div class="upLoadAndTotalSum" style="display:none">
                                                            已选中文文献<span class="cndocNum">0</span> 篇；英文文献 <span class="enDocNum">0</span> 篇；共计
                                            <span class="selectLiteratureTotal">0</span> 篇文献
                                        </div>
                                        
                                        <!-- 保存 -->
                                        <!--<div class="SelectLiteratureSave" style="display:none">
                                            <div>保存</div>
                                        </div>-->
                                        
                                        <!-- 下一步 -->
                                        <div class="nextStep">
                                            <div>下一步</div>
                                        </div>
                                        
                                        <!-- 回显显示保存 -->
                                        <div class="saveSubmit" style="display:none;width: 6.7rem;margin: 0 auto 0.2rem auto;">保存</div>
                                    </div>
                                </div>
                                <div class="literatureDetails selectLiteratureDetail" style="display:none;">
                                    <div class="detailsImg"></div>
                                   <div class="detailsText">
                                          已选明细
                                   </div>
                                </div>
                                <!-- 下一步弹窗 -->
                                <div class="nextStepContent" style="display:none;">
                                    <div class="closeNextStepContent"></div>
                                    <h3 class="selectLiteratureTitle">选择掌桥文献</h3>
                                    <div class="tabSwitch">
                                        <div class="tabItem  active" data-language="0">中文文献</div>
                                        <div class="tabItem" data-language="1">英文文献</div>
                                    </div>
                                    <h4 class="selectLiteratureTips">tips: 系统会仔细阅读分析您的文献，并结合大纲和概述引用文献，可能会存在部分文献不被引用的情况</h4>
                                    
                                    <div id="nextStepSelectPopCn" style="display:none;">
                                    </div>
                                    <div id="nextStepSelectPopEn" style="display:none;">
                                    </div>
                                    
                                    <div class="nextSelectLiteratureFooter">
                                        <!-- 分页 -->
                                        <div class="selectLiteraturePag" style="display:none">
                                            <div id="pre_current_page">上一页</div>
                                            <div id="list_current_page">本页</div>
                                            <div id="next_current_page">下一页</div>
                                        </div>
                                        <!-- 上传篇数与总篇数 -->
                                        <div class="upLoadAndTotalSum" style="display:none">
                                                            已选中文文献<span class="cndocNum">0</span> 篇；英文文献 <span class="enDocNum">0</span> 篇；共计
                                            <span class="selectLiteratureTotal">0</span> 篇文献
                                        </div>
                                        
                                        <!-- 保存 -->
                                        <div class="SelectLiteratureSave">
                                            <div class="returnBtn">返回上一步</div>
                                            <div class="saveSubmit">保存</div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>`

        $('body').append(content)
        // 进行信息回显与弹窗模块show、hide
          this.initHide();
        if(this.param.language==0){
            this.cnInit()
        }else{
        	this.enInit()
        }
     
    }
    this.initHide=function(){
        $(".selectLiteraturePag").hide();
        $(".upLoadAndTotalSum").hide();
        // $(".SelectLiteratureSave").hide();
        $(".selectLiteratureFooter").hide();
        $(".selectLiteratureContent .selectLiteraturePag").css('padding-bottom', '1.8rem');
        $(".selectLiteratureDetail").hide();
    }
    this.cnInit=function(){
    	 this.initHide();
    	$("#selectDocPop").html(`<div class="closeSearch cncloseSearch" style="display:${this.param.isCnSearch?'block':'none'} "> 取消查找 </div><div class="cnSelectLiterature" ></div>`);
    	this.cnSearchInit();
    	this.backDisplaySearch();
    	let  resultlist=this.param.cnSearchDocList;
    	if(this.param.isCnCallBackList){
    		resultlist=this.param.tempCnDocList;
    	}else{
    		
    	}
    	if(resultlist!=null&&resultlist.length>0){
        	this.resultRener(resultlist,this.param.cn_list_current_page,this.param.cn_list_doc_type);
            $(".selectLiteratureFooter").show();
    	}

    }
    // 根据中文文献列表展示或隐藏中文模块
    this.cnSearchInit=function(isshow){
    	isshow= typeof isshow=='undefined'?true:isshow;
        // 检索HTML结构
        var cnSearchParam=` <div class="cnSection">
			                <div class="selectCnAndEnItem">
			                    <h5>年份：</h5>
			                    <label>
			                        <input type="radio" name="year" value="0">
			                        <span>不限</span>
			                      
			                    </label>
			                    <label>
			                        <input type="radio" name="year" value="3">
			                        <span>近三年</span>
			                          <div class="yearView">2025-2023</div>
			                        
			                    </label>
			                    <label>
			                        <input type="radio" name="year" value="5">
			                        <span>近五年</span>
			                        <div class="yearView">2025-2021</div>
			                    </label>
			                    <label>
			                        <input type="radio" name="year" value="10">
			                        <span>近十年</span>
			                        <div class="yearView">2025-2016</div>
			                    </label>
			                </div>
			                <div class="selectCnAndEnItem">
			                    <h5>文献类型：</h5>
			                    <label>
			                        <input type="checkbox" name="selectLiteratureType" value="1">
			                        <span>中文期刊</span>
			                    </label>
			                    <label>
			                        <input type="checkbox" name="selectLiteratureType" value="3">
			                        <span>中文学位</span>
			                    </label>
			                    <label>
			                        <input type="checkbox" name="selectLiteratureType" value="2">
			                        <span>中文会议</span>
			                    </label>
			                </div>
			                <div class="selectCnAndEnItem" id="cnJournalLevelContainer">
			                    <h5>期刊等级：</h5>
			                    <label>
			                        <input type="radio" name="selectJournalLevel" value="0" >
			                        <span>不限</span>
			                    </label>
			                    <label>
			                        <input type="radio" name="selectJournalLevel" value="1">
			                        <span>核心</span>
			                    </label>
			                    <label>
			                        <input type="radio" name="selectJournalLevel" value="-1">
			                        <span>非核心</span>
			                    </label>
			                </div>
			                <ul class="selectLiteratureJournalLevel" style="display:none">
								  <li>
								    <label>
								      <input type="checkbox" name="selectLiteratureJournalLevel" value="1">
								      <span>北大核心</span>
								    </label>
								  </li>
								  <li>
								    <label>
								      <input type="checkbox" name="selectLiteratureJournalLevel" value="3">
								      <span>CSTPCD</span>
								    </label>
								  </li>
								  <li>
								    <label>
								      <input type="checkbox" name="selectLiteratureJournalLevel" value="2">
								      <span>CSCD</span>
								    </label>
								  </li>
								  <li>
								    <label>
								      <input type="checkbox" name="selectLiteratureJournalLevel" value="5">
								      <span>CSSCI</span>
								    </label>
								  </li>
								  <li>
								    <label>
								      <input type="checkbox" name="selectLiteratureJournalLevel" value="4">
								      <span>CHSSCD</span>
								    </label>
								  </li>
								  <div class="coreDetail">
								  	<img class="coreDetailBtn" src="${zqcdn}/js/aimodels/ckwxModule/img/question.png" ></img>
								  	<div class="coreDetailContainer">
								  		<div>北京大学中文核心期刊目录(北大核心)</div>
								  		<div>中国科技论文与引文数据库(CSTPCD)</div>
								  		<div>中国科学引文数据库(CSCD)</div>
								  		<div>中文社会科学引文索引(CSSCI)</div>
								  		<div>中国人文社会科学引文数据库(CHSSCD)</div>
								  	</div>
								  </div>
								</ul>
			                <div class="selectCnAndEnItem">
			                    <h6>检索关键词：</h6>
			                </div>
			                <div class="selectCnAndEnItem">
			                    <div class="retrieveKeywords popkeyword" >
								  <div class="retrieveKeywordsTip popkeywordTip" unselectable="on" >
								    请输入论文关键词，关键词间用空格或；隔开
								  </div>
								  <ul id="selectKw" class="selectKw popkeywordul">
								    <li>
								      <input type="text" id="selectKwinput" class="popkeywordinput" maxlength="50" autocomplete="off" data-track-id="论文信息-关键词" data-coll-even="blur" data-target-dom="#selectKw">
								    </li>
								  </ul>
								</div>
								<div class="aiResKeyWord">
								  <div><p>AI生成</p></div>
								</div>
			                </div>
			                <div class="searchTips">
			                    以上内容为系统根据您的主题分析的检索关键词，您可修改调整
			                </div>
			                <div class="selectCnAndEnItem">
			                    <h5>文献数量：</h5>
			                    <label class="selectLiteratureNum">
			                        <input type="number" name="selectLiteratureNum" data-cnSelectLiteratureNum="0" value="30" max="100">
			                        <span class="selectLiteratureNumTip" style="display:none">文献数量不得超过100</span>
			                    </label>
			                </div>
			                <div class="cnFindLiterature"> 查找文献 </div></div>`;
        // 上部分
        const showSearchCondition = isshow && (
            (this.param.tempCnDocList == null || this.param.tempCnDocList.length === 0) || this.param.isCnSearch);

        const showSearchResult = isshow &&
            this.param.tempCnDocList != null &&
            this.param.tempCnDocList.length > 0 &&
            this.param.cnDocList != null &&
            this.param.cnDocList.length === 0;

        if (showSearchCondition || showSearchResult) {
            $('.cnSelectLiterature').html(cnSearchParam);
        } else {
            $(".cnSelectLiterature").html(`<div class="contineFindLiterature">继续查找文献 </div>`);
        }
    }
    this.backDisplaySearch=function(){
    	  let search_params=this.param.currentCnSearch;
		  if(this.param.language!=0){
			 search_params=this.param.currentEnSearch;
		  }
	      $('input[name="year"][value='+search_params.duration+']').prop('checked', true);
	      $('input[name="year"][value='+search_params.duration+']').siblings('.yearView').show();
	   	  $('input[name="selectJournalLevel"][value="'+search_params.journal_level+'"]').prop('checked', true);
	   	  let doctypes=search_params.doc_type.split(";");
	   	  if(doctypes&&doctypes.length>0){
	   		   doctypes.forEach(item=>{
	               $('input[name="selectLiteratureType"][value=' + item + ']').prop('checked', true);
	           })
	       }
	   	  if(search_params.journal_level==1){
	   		  $(".selectLiteratureJournalLevel").show();
	   	  }
	   	  let journal_base=search_params.journal_base;
	   	  if(journal_base&&journal_base.length>0){
	   		 journal_base.forEach(item=>{
	               $('input[name="selectLiteratureJournalLevel"][value=' + item + ']').prop('checked', true);
	           })
	       }	
	   	  $('input[name="selectLiteratureNum"]').val(search_params.num);
	   	  let search_keyword=search_params.search_keywords;
	   	  if(search_keyword!=null&& search_keyword!=""){
	   		  this.param.keyword.createTag(search_keyword); 
	   	  }else{
         	  this.param.keyword.generateKeywords(this.param.title,this.param.language);
	   	  }
	   	  
    }
    //中文查询结果回显
    this.resultRener=function(resultList,list_current_page,doc_type){
    	let findtitle='选择文献';
    	let actiongrop="";
    	let languagedoc=this.param.language==0?"中":"英";
    	let finddesc="已为您选出<span>"+resultList.length+"</span>篇"+languagedoc+"文文献，请选择";
    	if(this.param.language==0){
    		if(resultList.length<this.param.currentCnSearch.num){
    			finddesc="已为您选出<span>"+resultList.length+"</span>篇中文文献。暂无更多相关文献，建议您修改筛选条件或关键词重新找查文献";
    		}
    		if(this.param.isCnCallBackList&&this.param.language==0){
        		findtitle="中文已选文献列表";
        		actiongrop="display:none"
        		finddesc="已选中文文献<span>"+this.param.tempCnDocList.length+"</span>篇，英文文献<span> "+this.param.tempEnDocList.length+"</span>篇，共计"+(this.param.tempCnDocList.length+this.param.tempEnDocList.length)+"篇";
        	}
    	}
    	if(this.param.language==1){
	    	if(resultList.length<this.param.currentEnSearch.num){
				finddesc="已为您选出<span>"+resultList.length+"</span>篇英文文献。暂无更多相关文献，建议您修改筛选条件或关键词重新找查文献";
			}
	    	if(this.param.isEnCallBackList&&this.param.language==1){
	    		findtitle="英文已选文献列表";
	    		actiongrop="display:none"
	    		//finddesc="已为您选出<span>"+resultList.length+"</span>篇英文文献，请选择"
	    		finddesc="已选中文文献<span>"+this.param.tempCnDocList.length+"</span>篇，英文文献<span> "+this.param.tempEnDocList.length+"</span>篇，共计"+(this.param.tempCnDocList.length+this.param.tempEnDocList.length)+"篇";
	    	}
    	}
    	if(this.param.language==0){
    	
    		$(".cnIslitertureResultall").remove();
    		$("#selectDocPop").append(`<div class="cnIslitertureResultall">
						           <div class="findResTitle">
					                  <p>${findtitle}</p>
					                  <p class="findResTotal" data-resTotal="cnTotal">${finddesc}</p>
					               </div>
					                <div class="actionGroup" data-action="cnAction" style="${actiongrop}">
					                    <div class="actionGroupLeft">
					                        <label>
					                            <input type="checkbox" name="cnAllSelect" class="cnAllSelect">
					                            <span>本页全选</span>
					                        </label>
					                        <label>
					                            <div class="selectContainer">
					                                <span name="cnSelectValue">全部</span>
					                                <div class="selectItem">
					                                    <div class="selectItemActive">全部</div>
					                                    <div>中文期刊</div>
					                                    <div>中文学位</div>
					                                    <div>中文会议</div>
					                                </div>
					                            </div>
					                        </label>
					                    </div>
					                    <div class="actionGroupRight">
					                        <div class="cnSearchRecords">查找记录</div>
					                        <div class="cnBatchAdd">换一批</div>
					                    </div>
					                </div>
					                <div class="literatureList" data-LiteratureList="cnLiteratureList">  ${this.generateDocFtlByDocList(resultList,list_current_page,doc_type)}</div>
						        </div>`)
						        
    	}else{
    		$(".enIslitertureResultall").remove();
    		$("#selectDocPop").append(`<div class="enIslitertureResultall">
			             <div class="findResTitle">
			                 <p>${findtitle}</p>
			                 <p class="findResTotal" data-resTotal="cnTotal">${finddesc}</p>
			             </div>
			             <div class="actionGroup" data-action="cnAction" style="${actiongrop}">
			                 <div class="actionGroupLeft">
			                     <label>
			                         <input type="checkbox" name="cnAllSelect" class="cnAllSelect">
			                         <span>本页全选</span>
			                     </label>
			                     <label>
			                         <div class="selectContainer">
			                             <span name="cnSelectValue">全部</span>
			                             <div class="selectItem">
			                                 <div class="selectItemActive">全部</div>
			                                 <div>英文期刊</div>
			                                 <div>英文学位</div>
			                                 <div>英文会议</div>
			                             </div>
			                         </div>
			                     </label>
			                 </div>
			                 <div class="actionGroupRight">
			                     <div class="cnSearchRecords">查找记录</div>
			                     <div class="cnBatchAdd">换一批</div>
			                 </div>
			             </div>
			               <div class="literatureList" data-LiteratureList="enLiteratureList">${this.generateDocFtlByDocList(resultList,list_current_page,doc_type)}</div>
			             </div>`)
    	}
    	 this.allSelectCanClick();
    	$(".selectLiteratureDetail").show();
    	if((this.param.isCnCallBackList&&this.param.language==0)||(this.param.isEnCallBackList&&this.param.language==1)){
    		this.deleteLiteratureHtml();
    		$(".selectLiteratureDetail").hide();

    	}
   	   $("span[name='cnSelectValue']").text(this.param.docType[doc_type]);
    	if(resultList.length>0||(list_current_page>1)){
       		// $(".SelectLiteratureSave").show();
    	}
         //分页
 	     this.pageIsShow();
        $(".upLoadAndTotalSum").show();
     // 展开文献详情
        $("body").on("click", ".literatureListItem .abstractsTogg,.searchListItem .abstractsTogg", (e)=>{
        	  e.stopPropagation();
            this.expandDetailsFn(e.target);
        })

        // 收起文献详情
         $("body").on("click", ".literatureListItem .abstractsClose,.searchListItem .abstractsClose", (e)=>{
        	  e.stopPropagation();
            this.collapseDetailsFn(e.target);
        })
	    this.selectItemInit();


    }
    this.pageIsShow=function(){
    	//分页
    	let searchList=$(".literatureListItem")
    	if(searchList.length==0){
    		   $(".selectLiteraturePag").hide();
    	}else{
    		   $(".selectLiteraturePag").show();
    	}
    }
    this.deleteLiteratureHtml = (domContainer) => {
        $(".saveSubmit").show();
        $(".nextStep").hide();
    }
    
    // 根据文献列表生成检索结果列表Html
    this.generateDocFtlByDocList = function (resultList,list_current_page,doc_type) {
    	if(doc_type!=0 &&doc_type!=""){
    		resultList=resultList.filter(item => item.type === doc_type);
    	}
	     $("#list_current_page").html(list_current_page);
        var resultFtl = []
        if (resultList.length > 0) {
            for (var index = 0; index < resultList.length; index++) {
            	if(index>9){//每页10条
            		 this.totalSelectDocNum();
        	         //分页
        	 	     this.pageIsShow();
            		return resultFtl.join("");
            	}
            	list_current_page=list_current_page==0?1:list_current_page;
                let list_index=(list_current_page-1)*10+index;
                if(list_index>resultList.length-1){
                	if(resultFtl.length==0){
                    	resultFtl.push(this.noDataHtml())
                    }else{
      
                    }
                	//分页
              	    this.pageIsShow();
              	  this.totalSelectDocNum();
                	return resultFtl.join("");
                }
            	let item=resultList[list_index];
            	var doctypename=this.param.docType[item.type];
            	let journalBasetext="";
            	if(typeof item.journalBase !="undefined"){
            		for (let j = 0; j <item.journalBase.length; j++) {
                		journalBasetext=journalBasetext+'<li>'+this.param.journalBase[item.journalBase[j]]+'</li>'
                	}
            		if(journalBasetext!=""){
            			journalBasetext=' <ul class="isCoreList">'+journalBasetext+'</ul>'
            		}
            	}
            	
                if (this.param.language == 0) {
                	let added="";
                	let exists = this.param.tempCnDocList.some(function(it) {
                	    return item.id === it.id;
                	});
                	if(exists){
                		added="literatureAdded";
                		
                	}
                    // 遍历并构建文献列表
                    resultFtl.push(`
                    <div class="literatureListItem ${added}"  data-id="${item.id}">
                		<div class="abstractsTogg">展开</div>
                        <div class="literatureInfo">
                            <p class="listItemTitleAndAction">
                                <span class="listItemTitle">${list_index+1}.${item.title}</span>
                                <span class="listItemAction" data-id="${item.id}" >选择</span>
                            </p>
                            <p class="listItemTypeAndYear">
                                <span class="listItemType">${doctypename}</span>
                                <span class="listItemYear">${(item.year) ? item.year : "-"}年</span>
                            </p>
                            <div class="coreAndLevelTwoTitle">
                                <span class="listItemCore"  style="${(item.journalBase)&&(item.journalBase).length!=0 ? '' : 'display:none'}">核心</span>
                                <p class="listItemLevelTwo" style="${(item.journalName)&&(item.journalName).length!=0 ? '' : 'display:none'}"><span>《${item.journalName}》</span></p>
                            </div>
                               ${journalBasetext}
                            <p class="listItemAuthor" style="${(item.author)&&(item.author).length!=0 ? '' : 'display:none'}">
                               ${(item.author) ? item.author.join(";") : ""}
                            </p>
                            <div class="listItemAbstracts">
                                <p class="listItemAbstractsCollapse">
                                  ${item.abstract.replace(/<[^>]*>/g, '')}
                                </p>
                            </div>
                        </div>
                        ${exists && this.param.nextStepCnTypeFlag != ''?`<div class="literatureListItemDelete optionClass">删除</div><div class="literatureListItemIsBuildText optionClass ${item.is_use_content==0 ? 'literatureListItemIsBuildFalse' : ''}">
                            生成正文
                            <div class="isBuildText"></div>
                        </div>
                        <div class="literatureListItemBuildOutline optionClass ${item.is_use_outline==0 ? 'literatureListItemIsBuildFalse' : ''}">
                            生成大纲
                            <div class="isBuildOutline"></div>
                        </div>`:``}
                    </div>`);
                } else {
                	let added="";
                	let exists = this.param.tempEnDocList.some(function(it) {
                	    return item.id === it.id;
                	});
                	if(exists){
                		added="literatureAdded";
                	}
                
                	 // 遍历并构建文献列表
                    resultFtl.push(`<div class="literatureListItem ${added}" data-id="${item.id}">
                		<div class="abstractsTogg">展开</div>
                        <div class="literatureInfo">
                            <p class="listItemTitleAndAction">
                                <span class="listItemTitle">${list_index+1}.${item.title}</span>
                                <span class="listItemAction" data-id="${item.id}" >选择</span>
                            </p>
                            <p class="listItemTypeAndYear">
                                <span class="listItemType">${doctypename}</span>
                                <span class="listItemYear">${(item.year) ? item.year : "-"}年</span>
                            </p>
                            <div class="coreAndLevelTwoTitle">
                                <span class="listItemCore" style="${(item.journalBase)&&(item.journalBase).length!=0 ? '' : 'display:none'}">核心</span>
                                <p class="listItemLevelTwo" style="${(item.journalName)&&(item.journalName).length!=0 ? '' : 'display:none'}"><span>《${item.journalName}》</span></p>
                            </div>
                             ${journalBasetext}
                            <p class="listItemAuthor" style="${(item.author)&&(item.author).length!=0 ? '' : 'display:none'}">
                               ${(item.author) ? item.author.join(";") : ""}
                            </p>
                            <div class="listItemAbstracts">
                                <p class="listItemAbstractsCollapse">
                                  ${item.abstract.replace(/<[^>]*>/g, '')}
                                </p>
                            </div>
                        </div>
                        ${exists && this.param.nextStepEnTypeFlag != '' ?`<div class="literatureListItemDelete optionClass">删除</div><div class="literatureListItemIsBuildText optionClass ${item.is_use_content==0 ? 'literatureListItemIsBuildFalse' : ''}">
                            生成正文
                            <div class="isBuildText"></div>
                        </div>
                        <div class="literatureListItemBuildOutline optionClass ${item.is_use_outline==0 ? 'literatureListItemIsBuildFalse' : ''}">
                            生成大纲
                            <div class="isBuildOutline"></div>
                        </div>`:``}
                    </div>`);
                }
                // 遍历已选文献列表 添加选中状态
            }
        } 
        if(resultFtl.length==0){
        	resultFtl.push(this.noDataHtml())
        }else{
        	$(".cnAllSelect").prop("checked",false);
        }
        this.totalSelectDocNum();
         //分页
 	     this.pageIsShow();
        return resultFtl.join("")
    }
    // 根据英文文献列表展示或隐藏英文模块
    this.enInit=function(){
    	 this.initHide();
    	$("#selectDocPop").html(`<div class="closeSearch encloseSearch" style="display:${this.param.isEnSearch?'block':'none'} "> 取消查找 </div><div class="enSelectLiterature" ></div>`);
    	this.enSearchInit();
    	this.backDisplaySearch();
    	let  resultlist=this.param.enSearchDocList;
    	if(this.param.isEnCallBackList){
    		resultlist=this.param.tempEnDocList;
    	}
    	if(resultlist!=null&&resultlist.length>0){
        	this.resultRener(resultlist,this.param.en_list_current_page,this.param.en_list_doc_type);
            $(".selectLiteratureFooter").show();
    	}
    }
   
    this.enSearchInit=function(isshow){
    	isshow= typeof isshow=='undefined'?true:isshow;
        // 检索文献的HTML结构
        var enSearchParam=`<div class="selectCnAndEn enSection">
			                   <div class="selectCnAndEnItem">
			                    <h5>年份：</h5>
			                    <label>
			                        <input type="radio" name="year" value="0" checked>
			                        <span>不限</span>
			                    </label>
			                    <label>
			                        <input type="radio" name="year" value="3">
			                        <span>近三年</span>
			                        <div class="yearView">2025-2023</div>
			                    </label>
			                    <label>
			                        <input type="radio" name="year" value="5">
			                        <span>近五年</span>
			                        <div class="yearView">2025-2021</div>
			                    </label>
			                    <label>
			                        <input type="radio" name="year" value="10">
			                        <span>近十年</span>
			                        <div class="yearView">2025-2016</div>
			                    </label>
			                </div>
			                <div class="selectCnAndEnItem">
			                    <h5>文献类型：</h5>
			                    <label>
			                        <input type="checkbox" name="selectLiteratureType" value="4">
			                        <span>英文期刊</span>
			                    </label>
			                    <label>
			                        <input type="checkbox" name="selectLiteratureType" value="6">
			                        <span>英文学位</span>
			                    </label>
			                    <label>
			                        <input type="checkbox" name="selectLiteratureType" value="5">
			                        <span>英文会议</span>
			                    </label>
			                </div>
			                <div class="selectCnAndEnItem" id="enJournalLevelContainer">
			                    <h5>期刊等级：</h5>
			                    <label>
			                        <input type="radio" name="selectJournalLevel" value="0" checked>
			                        <span>不限</span>
			                    </label>
			                    <label>
			                        <input type="radio" name="selectJournalLevel" value="1">
			                        <span>核心</span>
			                    </label>
			                    <label>
			                        <input type="radio" name="selectJournalLevel" value="-1">
			                        <span>非核心</span>
			                    </label>
			                </div>
			                <ul class="selectLiteratureJournalLevel" style="display:none">
								  <li>
								    <label>
								      <input type="checkbox" name="selectLiteratureJournalLevel" value="6">
								      <span>SCI</span>
								    </label>
								  </li>
								  <li>
								    <label>
								      <input type="checkbox" name="selectLiteratureJournalLevel"  value="7">
								      <span>EI</span>
								    </label>
								  </li>
								  <li>
								    <label>
								      <input type="checkbox"  name="selectLiteratureJournalLevel" value="8">
								      <span>MEDLINE</span>
								    </label>
								  </li>
								  <li>
								    <label>
								      <input type="checkbox" name="selectLiteratureJournalLevel"  value="9">
								      <span>CA</span>
								    </label>
								  </li>
								  <div class="coreDetail">
								  	<img class="coreDetailBtn" src="${zqcdn}/js/aimodels/ckwxModule/img/question.png" ></img>
								  	<div class="coreDetailContainer" style="left: -3.7rem;">
								  		<div>美国《科学引文索引》(SCI)</div>
								  		<div>美国《工程索引》(EI)</div>
								  		<div>美国《生物学医学文摘》(MEDLINE)</div>
								  		<div>美国《化学文摘》(CA)</div>
								  	</div>
								  </div>
								</ul>
			                <div class="selectCnAndEnItem">
			                    <h6>检索关键词：</h6>
			                </div>
			                <div class="selectCnAndEnItem">
			                    <div class="retrieveKeywords popkeyword" >
								  <div class="retrieveKeywordsTip popkeywordTip" unselectable="on" >
								    请输入论文关键词，关键词间用空格或；隔开
								  </div>
								  <ul id="selectKw" class="selectKw popkeywordul" >
								    <li>
								      <input type="text" id="selectKwinput"  class="popkeywordinput" maxlength="50" autocomplete="off" data-track-id="论文信息-关键词" data-coll-even="blur" data-target-dom="#selectKw">
								    </li>
								  </ul>
								</div>
								<div class="aiResKeyWord">
								  <div><p>AI生成</p></div>
								</div>
			                </div>
			                <div class="searchTips">
			                                                         以上内容为系统根据您的主题分析的检索关键词，您可修改调整
			                </div>
			                <div class="selectCnAndEnItem">
			                    <h5>文献数量：</h5>
			                    <label class="selectLiteratureNum">
			                        <input type="number" name="selectLiteratureNum" data-enSelectLiteratureNum="0" value="30" max="100">
			                        <span class="selectLiteratureNumTip" style="display:none">文献数量不得超过100</span>
			                    </label>
			                </div>
			                <div class="enFindLiterature">查找文献 </div></div>`;
        // 上部分
        const showSearchCondition = isshow && (
            (this.param.tempEnDocList == null || this.param.tempEnDocList.length === 0) ||
            this.param.isEnSearch
        );

        const showSearchResult = isshow &&
            this.param.tempEnDocList != null &&
            this.param.tempEnDocList.length > 0 &&
            this.param.enDocList != null &&
            this.param.enDocList.length === 0;

        if (showSearchCondition || showSearchResult) {
            $('.enSelectLiterature').html(enSearchParam);
        } else {
            $(".enSelectLiterature").html(`<div class="contineFindLiterature">继续查找文献 </div>`);
        }
    }
    
    // 保存
    this.commit=function(){
       if(this.param.tempCnDocList.length+ this.param.tempEnDocList.length>100){
    		tip("中文+英文参考文献最多选择100篇！");
    		return;
       }
       if(this.param.tempCnDocList.length+ this.param.tempEnDocList.length==0){
   		tip("未选择参考文献！");
   		return;
      }
       this.param.cnDocList=JSON.parse(JSON.stringify(this.param.tempCnDocList));
       this.param.enDocList=JSON.parse(JSON.stringify(this.param.tempEnDocList));
       this.param.isCnSearch=false;
       this.param.isEnSearch=false;
       this.param.isCnCallBackList=true;
       this.param.isEnCallBackList=true;
       this.param.cnSearchDocList=[];
       this.param.enSearchDocList=[];
       this.param.cnSearchDocHistoryList=[];
       this.param.enSearchDocHistoryList=[];
       this.param.tipCloseflag=false;
       if(typeof this.param.callback!="undefined"&&this.param.callback){
           this.param.callback();
       }

        $('#selectKw').empty();
       this.param.currentCnSearch.search_keywords = "";
       this.param.currentEnSearch.search_keywords = "";

       $("body,html").css('overflow','scroll');
       $('.'+this.param.popClass).remove();

    }

    // 显示弹窗
    this.showPop=function(title){
        if(typeof title=="undefined"|| title==null|| title=="") {
           tip("title is null!")
            return;
        }
        $("body,html").css('overflow','hidden');
        this.param.title=title
        this.param.language=0;
        this.param.tempCnDocList=JSON.parse(JSON.stringify(this.param.cnDocList));
        this.param.tempEnDocList=JSON.parse(JSON.stringify(this.param.enDocList));
        this.param.cn_list_current_page=1;
        this.param.cn_list_doc_type=0,
        this.param.en_list_current_page=1;
        this.param.en_list_doc_type=0,
        this.param.currentCnSearch.duration=0;
        this.param.currentCnSearch.journal_level=0;
        this.param.currentCnSearch.journal_base=[1,2,3,4,5];
        this.param.currentCnSearch.num=20;
        this.param.currentCnSearch.doc_type="1;2;3";
        this.param.currentEnSearch.duration=0;
        this.param.currentEnSearch.journal_level=0;
        this.param.currentEnSearch.journal_base=[6,7,8,9];
        this.param.currentEnSearch.num=20;
        this.param.currentEnSearch.doc_type="4;5;6";
        this.param.isCnCallBackList=true;
        this.param.isEnCallBackList=true;
        this.param.nextStepCnTypeFlag = this.param.cnDocList && this.param.cnDocList.length > 0 ? 'Cntrue':''
        this.param.nextStepEnTypeFlag = this.param.enDocList && this.param.enDocList.length > 0 ? 'Entrue':''

        this.renderReferDocList();
     
        // 生成中关键词
       // this.param.keyword.generateKeywords(title,this.param.language);
        $('.'+this.param.popClass).show();
    }
    this.delItem=(id)=>{
    	$("div[data-id='"+id+"']").removeClass("literatureAdded");
    	 if (this.param.language == 0) {
    		 this.param.tempCnDocList = this.param.tempCnDocList.filter(item => item.id !== id);
    		 this.resultRener(this.param.tempCnDocList,1,this.param.cn_list_doc_type)
         } else {
        	 this.param.tempEnDocList = this.param.tempEnDocList.filter(item => item.id !== id);
        	 this.resultRener(this.param.tempEnDocList,1,this.param.en_list_doc_type)
         }
    	 this.allSelectCanClick();
    }
 // 下拉框事件
    this.selectItemInit = function () {
        $(".selectContainer").click(()=>{
            $(".selectItem").toggle();
        })

        $(".selectItem div").click((e)=>{
            $(e.target).addClass("selectItemActive").siblings().removeClass("selectItemActive");
            let docTypeName=$(e.target).text();
            let typeid=this.param.docTypeNameType[docTypeName];
            $("span[name='cnSelectValue']").text($(e.target).text());
            if(this.param.language==0){
            	this.param.cn_list_doc_type=typeid;
            	let result=this.generateDocFtlByDocList(this.param.cnSearchDocList,1,this.param.cn_list_doc_type);
                $(".literatureList").html(result);
                this.pageIsShow();
            }else{
            	this.param.en_list_doc_type=typeid;
            	let result=this.generateDocFtlByDocList(this.param.enSearchDocList,1,this.param.en_list_doc_type);
                $(".literatureList").html(result);
                this.pageIsShow();
            }
            this.allSelectCanClick();
        })
    }
    this.allSelectCanClick=function(){
    	var dataids=$('.literatureListItem[data-id]');
    	var isallSelect=false;
    	for (var i = 0; i < dataids.length; i++) {
    		let itemId = dataids.eq(i).attr('data-id');
    		 if(this.param.language==0){
    			 let exists =  this.param.tempCnDocList.some(function(it) {
    	         	    return it.id === itemId;
    	         	});
    			 isallSelect=exists
    			 if(!isallSelect){
    				 break;
    			 }
    		 }else{
    			 let exists =  this.param.tempEnDocList.some(function(it) {
 	         	    return it.id === itemId;
 	         	});
	 			 isallSelect=exists
	 			 if(!isallSelect){
	 				 break;
	 			 } 
    		 }
		}
    	if(isallSelect){
    		$(".cnAllSelect").prop("checked",true);
    		$(".cnAllSelect").prop("disabled",true);
    	}else{
    		$(".cnAllSelect").prop("checked",false);
    		$(".cnAllSelect").prop("disabled",false);
    	}
    }
    // 隐藏弹窗
    this.closePop=function(title){
    	if(this.param.tipCloseflag){
    		this.selectedChangePopUpHtml();
    		return 
    	}
    	   this.param.isCnCallBackList=true;
           this.param.isEnCallBackList=true;
           this.param.isCnSearch=false;
           this.param.isEnSearch=false;

          $('#selectKw').empty();

          this.param.currentCnSearch.search_keywords = "";
          this.param.currentEnSearch.search_keywords = "";

    	  $('.'+this.param.popClass).remove();
         if(typeof this.param.concelCallback!="undefined"&&this.param.concelCallback){
            this.param.concelCallback();
         }
        $("body,html").css('overflow','scroll');
    }
 // 展开摘要
    this.expandDetailsFn = (dom) => {
        $(dom).addClass("abstractsClose");
        $(dom).parent().find(".literatureInfo .listItemTitleAndAction .listItemTitle,.searchInfo .listItemTitleAndAction .listItemTitle").removeClass('listItemTitle').addClass('listItemTitleExpand')
        $(dom).parent().find(".literatureInfo .isCoreList,.searchInfo .isCoreList").css('display','flex');
        $(dom).parent().find(".literatureInfo .listItemAuthor,.literatureInfo .listItemAuthor").css('white-space','normal')
        $(dom).parent().find(".literatureInfo .listItemAbstracts p,.searchInfo .listItemAbstracts p").removeClass('listItemAbstractsCollapse')
        $(dom).parent().find(".literatureInfo .listItemLevelTwo span,.searchInfo .listItemLevelTwo span").addClass('spanCollapse')
        $(dom).text("收起");
    }

    // 收起摘要
    this.collapseDetailsFn = (dom) => {
    	$(dom).removeClass("abstractsClose");
    	$(dom).parent().find(".literatureInfo .listItemTitleAndAction .listItemTitleExpand,.searchInfo .listItemTitleAndAction .listItemTitleExpand").removeClass('listItemTitleExpand').addClass('listItemTitle')
        $(dom).parent().find(".literatureInfo .isCoreList,.searchInfo .isCoreList").hide();
    	$(dom).parent().find(".literatureInfo .listItemAuthor,.searchInfo .listItemAuthor").css('white-space','nowrap')
    	$(dom).parent().find(".literatureInfo .listItemAbstracts p,.searchInfo .listItemAbstracts p").addClass('listItemAbstractsCollapse')
    	$(dom).parent().find(".literatureInfo .listItemLevelTwo span, .searchInfo .listItemLevelTwo span").removeClass('spanCollapse')
        $(dom).text("展开");
    }
    // 获取结果
    this.getResult=function(){
        var result={}
        result.cnDocList=this.param.cnDocList;
        result.enDocList=this.param.enDocList;
        return result;
    }
	 // 生成中文关键词
    this.generateKeywords=function(title,language){
	     var params={};
	     params.title=title
	     params.language=Number(language);
	     this.param.aiGent.commonParamBuild('开题报告','生成检索关键词',params,'qwen-long',this.aiGenerateKeywordNull)
    }
    
    this.aiGenerateKeywordNull = (event, content, params)=>{
       
	    if (event == 'chunk') {
	       this.param.temp_keyword= this.param.temp_keyword+content;
	     
	    }
	    if (event == 'ERROR') {
	        tip("关键词生成失败请稍后重试！")
	        return;
	    }
	    if (event == 'DONE') {
	        // 关键词生成完毕进行关键词格式化
	    	 if (this.param.language == 0) {
	    		 let sparam=JSON.parse(JSON.stringify(this.param.currentCnSearch));
	    		 sparam.search_keywords= this.param.temp_keyword;
	    		 this.searchReferDocList(sparam)
	    	 }else{
	    		 let sparam=JSON.parse(JSON.stringify(this.param.currentEnSearch));
	    		 sparam.search_keywords= this.param.temp_keyword;
	    		 this.searchReferDocList(sparam)
	    	 }
	    }
    }
    // 查找文献方法
    this.searchReferDocList=function(searchparam){
        /*if(searchparam.search_keywords=="undefined"||searchparam.search_keywords==null||searchparam.search_keywords==""){
            this.generateKeywords(this.param.title,this.param.language)
            return;
        }
        let search_p=JSON.parse(JSON.stringify(searchparam));
        search_p.num=Math.ceil(search_p.num*1.2);
        if(!this.checkInput()){
            return;
        }
        search_p.journal_base=searchparam.journal_base.join(";");*/
        $(".literatureList").html("");
        this.loadingHtml(".literatureList");
        /*// 获取检索条件
        var resultList = [];
        var item = {
            async: false,
            url: "/ai/searchReferDoc",
            type: "POST",
            param: {"json": JSON.stringify(search_p)}
        };
        zqRequest(item, function (data) {
            var sta = data.status;
            if (sta == 1 && typeof data.data != "undefined" && data.data) {
                resultList = data.data;
            }
        })*/
        resultList = [
            {
                "journalName": "眼科学报",
                "journalBase": [],
                "year": 2021,
                "author": [
                    "王东妮",
                    "东野枚枚",
                    "张栩琳",
                    "杨子英(综述)",
                    "林浩添(审校)"
                ],
                "id": "0201288793577",
                "abstract": "近年来,使用人工智能(artificial intelligence,AI)技术对临床大数据及图像进行分析,对疾病做出智能诊断、预测并提出诊疗决策,AI正逐步成为辅助临床及科研的先进技术。生物样本库作为收集临床信息和样本供科研使用的平台,是临床与科研的桥梁,也是临床信息与科研数据的集成平台。影响生物样本库使用效率及合理共享的因素有信息化建设水平不均衡、获取的临床及检验信息不完全、各库之间信息不对称等。本文对AI和区块链技术在生物样本库建设中的具体应用场景进行探讨,展望大数据时代智能生物样本库信息化建设的核心方向。",
                "title": "人工智能和区块链技术在生物样本库信息化建设的应用展望",
                "type": 1
            },
            {
                "journalName": "中国周刊：英文版",
                "journalBase": [],
                "year": 2020,
                "author": [
                    "王亮"
                ],
                "id": "0201280575059",
                "abstract": "人工智能已经普遍用于工业自动化控制 , 而且得到相当不错的反应 , 特别是电气自动化技术。将人工智能这一新型技术应用于电气自动化控制中 , 有利于电气自动控制技术的更新 , 增强其控制能力与产品的先进性 , 使其朝着更加科学化的方向发展。本篇文章首先对人工智能技术的基本含义进行概述，从提供控制能力、简化应用方法、保持高度一致三方面入手，对人工智能技术运用的重要性进行解析，并以此为依据，提出人工智能技术在电气自动化控制中的应用思路。",
                "title": "电气自动化控制中人工智能技术的应用探析",
                "type": 1
            },
            {
                "journalName": "中国周刊：英文版",
                "journalBase": [],
                "year": 2020,
                "author": [
                    "王忠全"
                ],
                "id": "0201280575918",
                "abstract": "随着现代科学信息技术的不断进步 , 人工智能技术受到了越来越广泛的关注 , 给现代人们的日常生产以及生活工作带来了极大的方便 , 并被广泛应用到各个领域各个新的行业中。习近平总书记在中央政治局第九集体学习会议上强调,人工智能是新一轮科技革命和产业转型的重要动力。加快新一代人工智能的发展对于我国能否抓住新一轮的科学技术革命以及产业转型的战略性机遇至关重要。国务院和工业和信息化部也发布了人工智能发展计划和发展计划。这表明我国非常重视人工智能的发展。我们称之为第四次工业革命。目前正在研究的两个大型项目是海床观测网络和深部煤炭产品。我们希望通过已经发布海底数据将人员安置在测试地点,因为当前的设备无法完成科学家需要完成的任务,但是我们的智能能源探测机器人可以完成。",
                "title": "人工智能技术在海洋新能源装备中的应用",
                "type": 1
            },
            {
                "journalName": "中国周刊：英文版",
                "journalBase": [],
                "year": 2020,
                "author": [
                    "严静"
                ],
                "id": "0201281471458",
                "abstract": "在我国目前诉讼改革的目标以及庭审的实质化政策的改革背景下,政府大数据的支持以及资本市场的不断投入,使得人工智能技术和司法领域的融合已经成为了未来必然的发展趋势和方向。目前在进行刑事裁判时,裁判的辅助模式已经在司法系统进行了建设,并且得到了推行,法定的统一证据标准也被放入到了公检法的数据化系统中。随着科学技术的不断发展,我们也应该抓住这次发展的机遇,以更加积极的态度迎接人工智能和刑事裁判之间的有效融合,同时要以更加严谨和认真的态度认识到人工智能和法律的有效融合,在逻辑演绎以及价值判断,还有中立面这三个层次应用过程中存在的问题。",
                "title": "人工智能技术在刑事裁判中的应用研究",
                "type": 1
            },
            {
                "journalName": "工程技术与管理(英文)",
                "journalBase": [],
                "year": 2019,
                "author": [
                    "朱江"
                ],
                "id": "0201276587197",
                "abstract": "进入21世纪以来,社会上出现了越来越多的新型技术,比如大数据、智能化、网络化等,而在人工智能技术的发展上,我国也将其应用到电气自动化当中[1]。人工智能技术的应用,毋庸置疑汇集了大数据、网络化以及智能化为一体,其带来的效应自然是值得认可的。本文对人工智能技术在电气自动化中的应用进行分析。",
                "title": "人工智能技术在电气自动化中的应用",
                "type": 1
            },
            {
                "journalName": "中国航空学报：英文版",
                "journalBase": [
                    "3"
                ],
                "year": 2001,
                "author": [
                    "吴振锋",
                    "左洪福",
                    "郭琳"
                ],
                "id": "0201219822026",
                "abstract": "基于颗粒显微形态学分析理论，建立了一套磨损微粒显微特征描述体系。首先应用这套特征参数描述体系，提取磨损微粒形态中蕴涵的特征信息，然后综合使用自动聚类、人工神经网络和其他的人工智能分析方法进行磨损微粒的综合分析与识别。本项技术已经在航空发动机磨损故障诊断中得到了实际应用。",
                "title": "基于人工智能技术的磨粒显微形态学分析(英文)",
                "type": 1
            },
            {
                "journalName": "工程（英文）",
                "journalBase": [],
                "year": 2020,
                "author": [
                    "刘光迪",
                    "李雨辰",
                    "张伟",
                    "章乐"
                ],
                "id": "0201280302578",
                "abstract": "为了研究精神疾病的病因和发病机制,各国开展了大量脑研究计划.尽管精神疾病是脑科学研究的重要部分,但精神疾病的诊断仍然依靠医生的主观经验,而非疾病的病理生理学指标.因此,为了开发有效的治疗方式和干预措施,我们迫切需要对重大精神疾病的病因和发病机制有一个清晰的认识.当前,人工智能(AI)技术在精神疾病的应用研究方面发展迅速,但缺少对其进行系统化的总结和展望.因此,本研究简要回顾了用于研究精神疾病的三种主要观测技术,即磁共振成像(MRI)、脑电图(EEG)和基于体势学的诊断(与模式识别相关的AI算法)技术.最后,我们讨论了AI应用面临的挑战、机遇和未来的发展方向.",
                "title": "人工智能算法在精神疾病中的应用简述",
                "type": 1
            },
            {
                "journalName": "中国周刊：英文版",
                "journalBase": [],
                "year": 2020,
                "author": [
                    "谢明文"
                ],
                "id": "0201280574858",
                "abstract": "本文围绕着广电媒体创新发展展开讨论，以人工智能为背景，分析了媒体创新发展运用这种高端技术的路径，并且提供了广电媒体和人工智能结合的策略，希望对广电媒体领域的改革具有启发性。",
                "title": "谈人工智能热潮下广电媒体创新发展策略及路径",
                "type": 1
            },
            {
                "journalName": "中国国际财经（中英文）",
                "journalBase": [],
                "year": 2017,
                "author": [
                    "陈群芳"
                ],
                "id": "0201264992940",
                "abstract": "在人工智能技术不断发展的形势下,其应用范围在逐渐扩展,其中便包括了会计行业,该技术的应用在提高会计业务办理效率和质量的同时,也对会计行业产生了一定冲击。本文则分析了人工智能对会计行业的挑战,以及会计人员应对挑战的策略,供会计从业人员参考。",
                "title": "人工智能的发展对会计行业的挑战",
                "type": 1
            },
            {
                "journalName": "中国国际财经(英文)",
                "journalBase": [],
                "year": 2018,
                "author": [
                    "张琪"
                ],
                "id": "0201264764051",
                "abstract": "人工智能应用大数据问题为导向，重点研究面向医疗行业的知识库人工智能分析关键技术，激活行业沉淀大数据资产的利用价值。研究大数据汇集、清洗、语义分析与弹性可扩展计算等共性问题，通过人工智能驱动经营、自反馈决策优化以及个性化服务，推动医疗行业融合及升级转型。",
                "title": "人工智能在医疗行业创新应用的商业模式研究",
                "type": 1
            },
            {
                "journalName": "中国国际财经(英文)",
                "journalBase": [],
                "year": 2017,
                "author": [
                    "陈转萍"
                ],
                "id": "0201264993831",
                "abstract": "随着人工智能在会计领域的发展，会计全程自动化处理、审计智能化和会计服务共享化正不断完善，会计信息系统在一定程度上取代了大量比较规范的和基础的会计工作，这就就需要会计从业人员从比较基础性的、重复性的会计核算工作中解放出来，从而转向更有职业价值的判断性的会计管理工作。因此，本文对人工智能在企业财务审计中的应用进行深入分析，最终对人工智能对财务人员的启示进行探讨。",
                "title": "人工智能时代企业财务审计应用分析",
                "type": 1
            },
            {
                "journalName": "计算机应用：英文版",
                "journalBase": [],
                "year": 2005,
                "author": [
                    "无"
                ],
                "id": "0201261903144",
                "abstract": "Intelligent process planning SYstem for optimal CNC programming - a step towards complete automation of CNC programming，Let's see what happen if we integrate AI planning with workflow management system，MAS collaboration and machine learning method for robot soccer，Prediction of internal surface roughness in drilling using three feedforward neural networks- a comparison……",
                "title": "人工智能",
                "type": 1
            },
            {
                "journalName": "计算机应用：英文版",
                "journalBase": [],
                "year": 2005,
                "author": [
                    "无"
                ],
                "id": "0201261905001",
                "abstract": "A Hybrid Approach for Arabic speech recognition；A Robust Real Time Position and Force (Hybrid) Control of a Robot Manipulator in Presence of Uncertainties；A study of bank loans risk early warning based on a hybrid system of ANN and ES；A synthesis of immune system model wit Darwinian hereditary, neural network；AVOIDING THE USE OF SIMILARITY SCORE IN A CASE-BASED REASONING SYSTEM FOR CRIM1NALRECORDS SEARCHING SYSTEM；Design and Implementation of a Soccer Robot with Modularized Control Circuits；Development of Evolutionary Models for Long-Term Load Forecasting of Power Plant Systems。",
                "title": "人工智能",
                "type": 1
            },
            {
                "journalName": "中国有色金属学报（英文版）",
                "journalBase": [],
                "year": 2021,
                "author": [
                    "喻智",
                    "史秀志",
                    "陈新",
                    "周健",
                    "齐冲冲",
                    "陈秋松",
                    "饶帝军"
                ],
                "id": "0201288490348",
                "abstract": "为降低纤维尾砂胶结充填材料单轴压缩强度数据的获取难度,综合分析常规充填材料参数与纤维参数对其单轴压缩性能的影响,结合元启发式算法(樽海鞘算法,SSA)与极限学习机技术(ELM),提出一种新型人工智能模型(SSA-ELM).为检验模型可靠性,开展720组不同灰砂质量比、固体质量浓度、纤维含量、纤维长度和养护时间的纤维尾砂胶结充填材料单轴抗压实验以建立充填材料强度性能数据库.研究结果表明,训练好的SSA-ELM模型能够准确地预测纤维尾砂胶结充填材料的单轴压缩强度,其性能优于ANN、SVR和ELM方法;纤维含量和纤维长度对纤维尾砂胶结充填材料单轴压缩性能具有重要影响.",
                "title": "用于研究纤维尾砂胶结充填材料单轴压缩性能的新型人工智能模型",
                "type": 1
            },
            {
                "journalName": "眼科学报",
                "journalBase": [],
                "year": 2021,
                "author": [
                    "吴乐正"
                ],
                "id": "0201288793564",
                "abstract": "眼科人工智能技术在实践中不断发展,如大数据应用、图像信息分析、机器人时代等,现在又迈上促进生物识别精确化的新台阶,这些实践应用都能更好地保护视器官,使之具备正常视功能,展示出独特的视觉信息特色。眼科人工智能技术不断开辟新领域,取得了诸多新成就。",
                "title": "“眼与人工智能”迎来时代挑战的新台阶",
                "type": 1
            },
            {
                "journalName": "眼科学报",
                "journalBase": [],
                "year": 2021,
                "author": [
                    "吴晓航",
                    "刘力学",
                    "陈睛晶",
                    "赖伟翊",
                    "林铎儒",
                    "晏丕松",
                    "刘奕志",
                    "林浩添"
                ],
                "id": "0201288793565",
                "abstract": "目的:评估白内障人工智能辅助诊断系统在社区筛查中的应用效果。方法:采用前瞻性观察性研究方法对白内障人工辅助诊断系统的应用效果进行分析,结合远程医疗的模式,由社区卫生人员对居民进行病史采集、视力检查和裂隙灯眼前节检查等,将数据上传至云平台,由白内障人工智能辅助诊断系统和人类医生依次进行白内障评估。结果:受检人群中男性所占比例为35.7%,年龄中位数为66岁,裂隙灯眼前节照片有98.7%的图像质量合格。该白内障人工智能辅助诊断系统在外部验证集中检出重度白内障的曲线下面积为0.915。在人类医生建议转诊的病例中,有80.3%也由人工智能系统给出了相同的建议。结论:该白内障人工智能辅助诊断系统在白内障社区筛查的应用中具有较好的可行性和准确性,为开展社区筛查疾病提供了参考依据。",
                "title": "白内障人工智能辅助诊断系统在社区筛查中的应用效果",
                "type": 1
            },
            {
                "journalName": "眼科学报",
                "journalBase": [],
                "year": 2021,
                "author": [
                    "王晓晖",
                    "Bryan Spencer(综述)",
                    "程文(审校)"
                ],
                "id": "0201288793572",
                "abstract": "人工智能(artificial intelligence,AI)为解决中国患者“看病难”问题提供了可行方案。眼科AI已实现为患者提供筛查、远程诊断及治疗建议等方面的服务,能显著减轻医疗资源不足的压力和患者的经济负担。而AI的应用过程中,给医疗管理带来的挑战应引起重视。本文从医疗管理的角度,总结分析AI在眼科医疗过程中,尤其是交接环节中出现的主要问题,提出对策与建议,并讨论AI在眼科医疗的应用展望。",
                "title": "人工智能在眼科医疗管理过程中的应用:挑战与展望",
                "type": 1
            },
            {
                "journalName": "眼科学报",
                "journalBase": [],
                "year": 2021,
                "author": [
                    "赵越越(综述)",
                    "康刚劲(审校)"
                ],
                "id": "0201288793576",
                "abstract": "人工智能(artificial intelligence,AI)在眼科领域的应用不断深入、拓展,目前在糖尿病性视网膜病变、白内障、青光眼以及早产儿视网膜病变在内的多种常见眼病的诊疗中逐渐成为研究热点。AI使医疗资源短缺、诊断标准缺乏、诊疗技术水平低下的现状得到改善,为白内障的诊疗开辟了一条“新赛道”。本文旨在综述AI在白内障诊疗中的应用现状、进展及局限性,为AI在白内障领域的进一步开发、应用及推广提供更多信息。",
                "title": "人工智能在白内障诊疗中的应用进展",
                "type": 1
            },
            {
                "journalName": "中国有色金属学报：英文版",
                "journalBase": [
                    "2",
                    "3"
                ],
                "year": 2021,
                "author": [
                    "喻智",
                    "史秀志",
                    "陈新",
                    "周健",
                    "齐冲冲",
                    "陈秋松",
                    "饶帝军"
                ],
                "id": "0201288960515",
                "abstract": "为降低纤维尾砂胶结充填材料单轴压缩强度数据的获取难度,综合分析常规充填材料参数与纤维参数对其单轴压缩性能的影响,结合元启发式算法(樽海鞘算法, SSA)与极限学习机技术(ELM),提出一种新型人工智能模型(SSA-ELM)。为检验模型可靠性,开展720组不同灰砂质量比、固体质量浓度、纤维含量、纤维长度和养护时间的纤维尾砂胶结充填材料单轴抗压实验以建立充填材料强度性能数据库。研究结果表明,训练好的SSA-ELM模型能够准确地预测纤维尾砂胶结充填材料的单轴压缩强度,其性能优于ANN、SVR和ELM方法;纤维含量和纤维长度对纤维尾砂胶结充填材料单轴压缩性能具有重要影响。",
                "title": "用于研究纤维尾砂胶结充填材料单轴压缩性能的新型人工智能模型",
                "type": 1
            },
            {
                "journalName": "汉语世界：英文版",
                "journalBase": [],
                "year": 2021,
                "author": [],
                "id": "0201288970010",
                "abstract": "In parts of China,the Al-driven future of science fiction is already here・Cameras can recognize individuals in a crowd by analyzing their face;smart speakers interact with household appliances controlled with the swipe of a smart phone;and even love is increasingly digitized,with virtual\"girl&icnds''''able to empathi with their real life partners.Yet so much online living produces vast amounts of data,much of it unsecured.",
                "title": "你爱人工智能吗?",
                "type": 1
            },
            {
                "journalName": "数字中医药(英文)",
                "journalBase": [],
                "year": 2021,
                "author": [
                    "梁若蘭",
                    "关冰河",
                    "陈霜",
                    "陈浩然",
                    "江家伟",
                    "李文荣",
                    "沈剑刚"
                ],
                "id": "0201289032499",
                "abstract": "人工智能(AI)能够模仿人类的认知功能并具有执行类似于人类应对不确定环境下智力活动的能力。人工智能技术的迅速发展产生了能够分析大数据的强大工具,人工智能用于医疗服务可以为医生作出更准确的临床决策,甚至具有取代人类在医疗保健领域认知的潜能。先进的人工智能技术也为探索传统中医药的科学基础以及发展标准化和数字化中医脉象诊断方法创造了新的机遇。我们在本研究回顾并讨论了人工智能技术在中医脉诊中的潜在应用,主要讨论了以下方面内容:(1)简要介绍中医脉诊的基本概念和知识;(2)人工智能技术的标志性发展以及其深度学习程序在医学实践中的应用;(3)人工智能技术在中医脉诊中的最新进展;(4)人工智能技术在中医脉诊中的挑战和前景。总之,传统中医与现代人工智能技术结合将为理解中医脉诊基础的科学原理带来新的思路,并为人工智能深度学习技术的发展创造机会,以实现中医脉诊的标准化和数码化。",
                "title": "当人工智能遇上传统中医:通往识别脉象模式的宝盒",
                "type": 1
            },
            {
                "journalName": "数字中医药（英文）",
                "journalBase": [],
                "year": 2021,
                "author": [
                    "梁若蘭",
                    "关冰河",
                    "陈霜",
                    "陈浩然",
                    "江家伟",
                    "李文荣",
                    "沈剑"
                ],
                "id": "0201289046058",
                "abstract": "人工智能(AI)能够模仿人类的认知功能并具有执行类似于人类应对不确定环境下智力活动的能力.人工智能技术的迅速发展产生了能够分析大数据的强大工具,人工智能用于医疗服务可以为医生作出更准确的临床决策,甚至具有取代人类在医疗保健领域认知的潜能.先进的人工智能技术也为探索传统中医药的科学基础以及发展标准化和数字化中医脉象诊断方法创造了新的机遇.我们在本研究回顾并讨论了人工智能技术在中医脉诊中的潜在应用,主要讨论了以下方面内容:(1)简要介绍中医脉诊的基本概念和知识;(2)人工智能技术的标志性发展以及其深度学习程序在医学实践中的应用;(3)人工智能技术在中医脉诊中的最新进展;(4)人工智能技术在中医脉诊中的挑战和前景.总之,传统中医与现代人工智能技术结合将为理解中医脉诊基础的科学原理带来新的思路,并为人工智能深度学习技术的发展创造机会,以实现中医脉诊的标准化和数码化.",
                "title": "当人工智能遇上传统中医:通往识别脉象模式的宝盒",
                "type": 1
            },
            {
                "journalName": "工程（英文）",
                "journalBase": [],
                "year": 2021,
                "author": [
                    "Khalid Elbaz",
                    "沈水龙",
                    "周安楠",
                    "尹振宇",
                    "吕海敏"
                ],
                "id": "0201290123925",
                "abstract": "滚刀的磨损是一个影响盾构隧道掘进效率和滚刀更换决策的关键问题.本研究提出了一种估算滚刀寿命(Hf)的新模型,模型将分组数据处理(GMDH)型神经网络(NN)与遗传算法(GA)整合在一起.遗传算法优化了GMDH网络结构的效率和有效性,使得每个神经元都能从上一层网络搜索最佳连接集.使用所提出的模型,可以分析盾构机性能数据库、滚刀的消耗、地质条件和操作参数等监测数据.为了验证所提出模型的性状,进行了案例研究,用数据说明了混合模型的优越性.结果表明,使用该混合模型预测的滚刀使用寿命的准确率高.灵敏度分析表明,盾构切入速率(PR)对滚刀的使用寿命有重要影响.研究结果对盾构隧道的设计和施工都很有意义.",
                "title": "遗传算法与分组数据处理神经网络相结合的人工智能预测盾构掘进过程中滚刀的寿命",
                "type": 1
            },
            {
                "journalName": "中国法学：英文版",
                "journalBase": [
                    "5"
                ],
                "year": 2021,
                "author": [
                    "Liu Wanting"
                ],
                "id": "0201291798185",
                "abstract": "Since the beginning of the 21st century, human beings have successively entered three new times which are interrelated and slightly different from each other. The era of the network society, the era of big data and the era of artificial intelligence (AI) jointly mark the three sides of the new era of human beings and jointly form a new social era.",
                "title": "人工智能领域下合同的风险分配",
                "type": 1
            }
        ]
        var totalPage = 0;
        if (this.param.language == 0) {
            this.param.isCnCallBackList=false;
            this.param.cnSearchDocList = resultList;
            this.param.cnSearchDocHistoryList.push(resultList)
        } else {
            this.param.isEnCallBackList=false;
            this.param.enSearchDocList = resultList;
            this.param.enSearchDocHistoryList.push(resultList)
        }
        this.resultRener(resultList,1,0);
        this.searchScrollFn()
    }
    // 删除文献
     this.delSelectedLiteruare=function(id){
    	 if (this.param.language == 0) {
    		 this.param.tempCnDocList = this.param.tempCnDocList.filter(item => item.id !== id);
         } else {
        	 this.param.tempEnDocList = this.param.tempEnDocList.filter(item => item.id !== id);
         }
    	 this.param.tipCloseflag=true;
    	 this.allSelectCanClick();
     }
     
     // 查找文献时滚动页面
     this.searchScrollFn = function (){
         $('.selectLiteratureContent').animate({
             scrollTop: 500
         }, 300);
     }
     // 年份点击时展示年份
     this.yearClickView =  (e)=>{
         // 让当前点击的年份信息展示
         $('.yearView').hide();
         $(e).siblings('.yearView').show();
         
     }
     
  // 弹窗结构
     this.selectedChangePopUpHtml = function(){
         $("#selectedChangePopUpOnly").remove();
    	 this.param.tipCloseflag=false;
         $('body').append(`
                 <div id="selectedChangePopUpOnly">
                     <div class="selectedChangePopUp">
                         <div class="selectedChangePopUpContent">
                             <div class="selectedChangePopUpClose"></div>
                             <p>检测到<span>已选文献数量</span>发生变化，如需保存数据 <br> 请点击底部保存按钮</p>
                             <div class="selectedChangeBtn">
                                 <div class="btnCancel" >不保存，继续关闭弹窗</div>
                                 <div class="btnSave">去保存</div>
                             </div>
                         </div>
                     </div>
	             </div>
	         `);
          $("#selectedChangePopUpOnly").show();
     }
     

     // 结构
     this.changeOneHtml = () => {
       $("#changeOneTipsOnly").remove();
       $('body').append(`
        <div id="changeOneTipsOnly">
             <div class="changeOneTips">
                 <div class="changeOneTipsContent">
                     <div class="changeOneTipsClose"></div>
                     <p>页面显示的文献将被移除，如需查看历史数据可点击【查找记录】按钮，是否继续换一批文献？</p>
                     <div class="changeOneTipsBtn">
                         <div class="changeOneTipsBtnCancel">取消</div>
                         <div class="changeOneTipsBtnSave">确定</div>
                     </div>
                 </div>
             </div>
         </div>`)

         $("#changeOneTipsOnly").show();
     }
     
     // 空数据结构
     this.noDataHtml = (notype) => {
         this.hideLoading();
    	 notype=(typeof notype=="undefined"||notype==null)?1:notype;
    	 let nodata=' <p style="text-align: center;font-size: 0.22rem;color: #666;">暂无更多相关文献，</p> <p style="text-align: center;font-size: 0.22rem;color: #666;">建议您修改筛选条件或关键词重新获取文献</p>';
    	 if(notype==2){
    		 nodata=' <p style="text-align: center;font-size: 0.22rem;color: #666;">文献结果不满意?</p> <p style="text-align: center;font-size: 0.22rem;color: #666;">建议换一批文献或更换筛选条件/检索关键词重新检索</p>';
    	 }
		 return`
		     <div class="noData">
		         <img src="${zqcdn}/newimg/ai/model/nulldataimg.png" alt="" style="width:100%">
		         ${nodata}
		     </div>
		 `
     }

     // 查找时的加载动画结构
     this.loadingHtml = (domContainer) => {
    	 $(".searchLoading").remove();
         $(".selectLiteratureFooter").hide()
         $(".selectLiteraturePag").hide()
	     $(domContainer).append(`
	         <div class="searchLoading">
	             <div class="searchLoadingImg">
	                 <img src="${zqcdn}/newimg/ai/model/search_2.png" alt="">
	             </div>
	             <p>文献查找中，请耐心等待</p>
	         </div>
	     `);
     }

     /* 隐藏查找动画 */
     this.hideLoading = function(){
        $('.searchLoading').parent().remove();
     }

     // 再次检索文献
     this.searchAgain=function(){
       /*  if(!this.checkNumInput()){
             return;
         }*/
         $('.selectLiteratureContent').animate({
             scrollTop: $('.selectLiteratureContent').scrollTop() + 200
         })
         var params ={};
         var times=1;
         if(this.param.language==0) {
        	 this.param.cnGeneratedKeywords=this.param.currentCnSearch.search_keywords;
        	 params=this.param.currentCnSearch;
             times=this.param.cnChangeBatchTimes;
             this.param.cnChangeBatchTimes++;
         }else{
        	 this.param.enGeneratedKeywords=this.param.currentEnSearch.search_keywords;
        	 params=this.param.currentEnSearch;
             times=this.param.enChangeBatchTimes;
             this.param.enChangeBatchTimes++;
         }
         if(times>5){
             tip("已为您更换五批文献，为保证文献相关度，请您修改检索条件和关键词并重新查询文献！")
             return;
         }
         $(".literatureList").html('');
         this.loadingHtml(".literatureList");
         $(".selectLiteraturePag").hide()
         $(".upLoadAndTotalSum").hide()
         // $(".SelectLiteratureSave").hide()
         $(".selectLiteratureFooter").hide()
         $(".selectLiteratureContent .selectLiteraturePag").css('padding-bottom', '1.8rem');
         
         if(times%2!=0){
             this.expandkeywordsAndSearchAgain();
         }else{
        	  params.current_page=2;
             this.searchReferDocList(params);
         }


     }

     //扩展关键词并再次检索
     this.expandkeywordsAndSearchAgain=function (){
         var paramObj={}
         paramObj.title=this.param.title;
         paramObj.language=this.param.language;
         if(this.param.language==0) {
             paramObj.keywords=this.param.cnGeneratedKeywords;
             this.param.cnGeneratedKeywords='';
         }else{
             paramObj.keywords=this.param.enGeneratedKeywords;
             this.param.enGeneratedKeywords='';
         }
         this.param.aiGent.commonParamBuild("开题报告", "扩展检索关键词", paramObj, 'qwen-long', this.expandKeywordsOnData)
     }
     
     this.expandKeywordsOnData=(event, content, params)=>{
         if (event == 'chunk') {
             if(this.param.language==0) {
                 this.param.cnGeneratedKeywords+=content;
             }else{
                 this.param.enGeneratedKeywords+=content;
             }
         }
         if (event == 'ERROR') {

         }
         if (event == 'DONE') {
             // 调用换一批文献检索方法
             var searchParam =this.param.currentCnSearch;
             if(this.param.language==0) {
            	 searchParam=this.param.currentCnSearch;
                 this.param.cnGeneratedKeywords=this.param.cnGeneratedKeywords.replace("；",";")
                 searchParam.search_keywords=this.param.cnGeneratedKeywords;
             }else{
            	 searchParam =this.param.currentEnSearch;
                 this.param.enGeneratedKeywords=this.param.enGeneratedKeywords.replace("；",";")
                 searchParam.search_keywords=this.param.enGeneratedKeywords;
             }
             searchParam.current_page=1;
             this.searchReferDocList(searchParam);
         }
     }
   
     this.checkInput=function(){
    	 let num=$('input[name="selectLiteratureNum"]').val();
    	 if(num==null||num==""||num<1){
    		 tip("文献总数至少1篇！")
    		 return false;
    	 }
    	 if(num>100){
    		 tip("文献总数最多100篇！")
    		 return false;
    	 }
    	 return true;
     }
     //获取检索条件
    this.getSearchParam=function (){
    	let year=$('input[name="year"]:checked').val();
    	let doctype= $('input[name="selectLiteratureType"]:checked').map(function() {
    	    return $(this).val(); 
    	}).get().join(";");
    	let journal_level=$('input[name="selectJournalLevel"]:checked').val();
    	let num=$('input[name="selectLiteratureNum"]').val();
    	let journal_base= $('input[name="selectLiteratureJournalLevel"]:checked').map(function() {
    	    return $(this).val(); 
    	}).get()
    	 let keywords = [];
	    var $li = $('#selectKw li');
	    for (var i = 0; i < $li.length - 1; i++) {
	        keywords.push($('div', $li[i]).html());
	    }
	    let serch_keyword = keywords.join(';');
    	if(this.param.language==0){
    		this.param.currentCnSearch.duration=year;
    		this.param.currentCnSearch.doc_type=doctype;
    		this.param.currentCnSearch.journal_level=journal_level;
    		this.param.currentCnSearch.num=num;
    		this.param.currentCnSearch.journal_base=journal_base;
    		this.param.currentCnSearch.search_keywords=serch_keyword;
    	}else{
    		this.param.currentEnSearch.duration=year;
    		this.param.currentEnSearch.doc_type=doctype;
    		this.param.currentEnSearch.journal_level=journal_level;
    		this.param.currentEnSearch.num=num;
    		this.param.currentEnSearch.search_keywords=serch_keyword;
    	}
    }
    // 页面切换
    this.changeCurrentPage=function(currentPage){
    	let result="";
        if(this.param.language==0 ){
        	result=this.generateDocFtlByDocList(this.param.cnSearchDocList,this.param.cn_list_current_page,this.param.cn_list_doc_type);
        }else{
        	result=this.generateDocFtlByDocList(this.param.enSearchDocList,this.param.en_list_current_page,this.param.en_list_doc_type); 
        }
        $(".literatureList").html(result);
        this.pageIsShow();
        this.allSelectCanClick();
    }

    this.changeLanguage=function(){
    	  // 进行信息回显与弹窗模块show、hide
        if(this.param.language==0){
            this.cnInit()
        }else{
        	this.enInit()
        }
    }
    //本页全选
    this.allSelect=()=>{
    	let listItemActions= $('.listItemAction');
    	for (let i = 0; i < listItemActions.length; i++) {
    		if(this.isCanSelect(this.param.language)){
    			let listItemAction=listItemActions[i];
    			$(listItemAction).click();
    		}
		}
    	this.allSelectCanClick();
    }
    this.isCanSelect=(language)=>{
    	  if(language==0&&this.param.tempCnDocList.length>=100){
    		  tip("中文文献最多可选100篇");
    		  return false;
    	  }
    	  if(language==1&&this.param.tempEnDocList.length>=100){
    		  tip("英文文献最多可选100篇");
    		  return false;
    	  }
    	  return true;
    }
    this.singleSelect=function(docid){
    	$('input[name="literatureListItem"][data-id='+docid+']').prop('checked', true);
    	$('input[name="literatureListItem"][data-id='+docid+']').prop('disabled', true);
    	if(this.param.language==0){
    		if(this.param.tempCnDocList.length>100){
    			return;
    		}
    		let exists =  this.param.tempCnDocList.some(function(it) {
         	    return it.id === docid;
         	});
    		if(!exists){
    			this.param.cnSearchDocList.forEach((item, index) => {
	    		  if(item.id==docid){
                      item.is_use_outline=1;
                      item.is_use_content=1;
	    			 this.param.tempCnDocList.push(item);
	    		  }
	       	    })
    		}
    	}else{
    		if(this.param.tempEnDocList.length>100){
    			return;
    		}
    		let exists =  this.param.tempEnDocList.some(function(it) {
         	    return it.id === docid;
         	});
    		if(!exists){
	    	  this.param.enSearchDocList.forEach((item, index) => {
	    		  if(item.id==docid){
                      item.is_use_outline=1;
                      item.is_use_content=1;
	    			 this.param.tempEnDocList.push(item);
	    		  }
	       	  })
    		}
    	}
    	 this.param.tipCloseflag=true;
         this.totalSelectDocNum();
         this.allSelectCanClick();
    }
    
    this.totalSelectDocNum=function(){
    	 $(".cndocNum").html(this.param.tempCnDocList.length);
    	 $(".enDocNum").html(this.param.tempEnDocList.length);
    	 $(".selectLiteratureTotal").html(this.param.tempCnDocList.length+this.param.tempEnDocList.length)
    }
    // 以下是已选文献弹窗
    // 弹窗结构
    this.selectedPopUpHtml = function () {
    	$("#electedSelectedPopUpOnly").remove();
        $('body').append(
            `<div id="electedSelectedPopUpOnly">    
                <div class="selectedPopUp">
                    <div class="selectedContent">
                        <div class="selectedPopUpClose"></div>
                        <div class="selectedTitle">已选文献列表</div>
                        <div class="selectedTabSwitch">
                            <div class="selectedTabItem ${this.param.selected_language=='0'?'selectedActive':''}" data-selected-language="0">中文文献</div>
                            <div class="selectedTabItem ${this.param.selected_language=='1'?'selectedActive':''}" data-selected-language="1">英文文献</div>
                        </div>
                        <div class="tmpLiteratureNum">
                            <span>数量：</span><span class="selectSum">0</span><span>/100</span>
                        </div>
                        <!-- 已选中文文献 -->
                        <div class="tmpLiterature">
                            <div class="tmpLiteratureTable">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>序号</th>
                                            <th>标题</th>
                                            <th>操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <!-- 列表项 -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div></div>`
        )
    }

    
    // 渲染列表
    this.renderList = () => {
        let listData = this.param.tempCnDocList;
        if(this.param.selected_language==1){
        	listData = this.param.tempEnDocList;
        }
        let tbodyContainer = $('.tmpLiteratureTable table tbody');
        let tableList = '';
        listData.forEach((item, index) => {
            const serialNumber = index + 1;
            tableList += `
                <tr data-id="${item.id}">
                    <td>${serialNumber}</td>
                    <td class="titleCell">
                      <!-- 年份角标 -->
                      <span class="cornerMark">${item.year}</span>
                      <div class="titleText">
                        <!-- 标题 -->
                        <div class="titleTextContent">${item.title}</div>
                        
                        <!-- 摘要 -->
                        <div class="abstractText">
                        	<div class="abstractTextCon">
                        		<p>${item.abstract}</p>
                        	</div>
                        </div>
                        
                        <!-- 展开按钮 -->
                        <div class="expandBtn"></div>
                      </div>
                    </td>
                    <td><div class="deleteBtn"></div></td>
                  </tr>
            `
        });
        if(tableList!=''){
        	tbodyContainer.html(tableList)
        	$('.tmpLiterature').css('border-top','0.01rem solid #e0e0e0')
        }else{
        	$('.tmpLiterature').html(this.noDataHtml(2))
        	$('.tmpLiterature').css('border-top','none')
        	
        }
        
        this.selectSum()
    }
    

    // 结构
    this.deleteSelectedPopUpContentPopUpHtml = (id) => {
    	$("#deleteSelectedPopUpOnly").remove();
        $('body').append(`
            <div id="deleteSelectedPopUpOnly">
                <div class="deleteSelectedPopUp">
                    <div class="deleteSelectedPopUpContent">
                        <p>
                            删除后可能无法再次查询到此文献，是否继续操作？
                        </p>
                        <div class="deleteSelectedPopUpBtn">
                            <div class="deleteSelectedPopUpBtnNo"  data-id="${id}">取消</div>
                            <div class="deleteSelectedPopUpBtnYes" data-id="${id}">确定</div>
                        </div>
                    </div>
                </div>
            </div>
        `)
       this.deleteSelectedPopUpBindEvent()
    }
    // 打开弹窗
    this.openSelectedPopUp = function (){
    	 if(this.param.language==1){
        	 this.param.selected_language=1
    	 }
    	 if(this.param.language==0){
        	 this.param.selected_language=0
    	 }
    	 this.selectedPopUpHtml();
         this.renderList();
        $('.selectedPopUp').css('transform', 'translateY(0)');
       
        setTimeout(()=>{
            this.calcTableHeight();
        },200)
    }

    // 收起弹窗
    this.closeSelectedPopUp = function (){
        $('.selectedPopUp').css('transform', 'translateY(100%)');
        let tempArr = this.param.tempCnDocList;
        if(this.param.language==1){
            tempArr = this.param.tempEnDocList;
        }
        if(tempArr.length==0){
            $('.selectLiteratureFooter').hide()
            $(".selectLiteratureContent .selectLiteraturePag").css('padding-bottom', '1.8rem');
        }
    }

    // 展开摘要和标题
    this.showAbstractText = function (dom){
        $('.titleTextExpand').removeClass('titleTextExpand');
        $('.deleteBtnExpand').removeClass('deleteBtnExpand');
        $('.abstractText').hide()

        $(dom).toggleClass('deleteBtnExpand');
        $(dom).siblings('.titleTextContent').addClass('titleTextExpand');

        $(dom).siblings('.abstractText').show()
    }

    // 收起摘要和标题
    this.hideAbstractText = function (){
        $('.titleTextExpand').removeClass('titleTextExpand');
        $('.deleteBtnExpand').removeClass('deleteBtnExpand');
        $('.abstractText').hide()
    }

    // 删除
    this.deleteSelected = (itemId) =>{
    	$("div[data-id='"+itemId+"']").removeClass("literatureAdded");
        if(this.param.selected_language==0 ){
        	this.param.tempCnDocList = this.param.tempCnDocList.filter(item => item.id !== itemId);
        }else{
        	this.param.tempEnDocList = this.param.tempEnDocList.filter(item => item.id !== itemId);
        }
        this.renderList();
        this.totalSelectDocNum();
        this.allSelectCanClick();

        // 是否在下一步弹窗中删除的点击
        let delTypePop = $('.nextStepContent').is(':visible');
        if (delTypePop){
            this.renderNextStepSelectPop()
        }
    }

    // 总数
    this.selectSum = () => {
    	 if(this.param.selected_language==0 ){
           $('.tmpLiteratureNum .selectSum').text(this.param.tempCnDocList.length);
    	 }else{
    		 $('.tmpLiteratureNum .selectSum').text(this.param.tempEnDocList.length);
    	 }
    }

  
    // 计算表格高度
    this.calcTableHeight = function (){
    	return
        let tmpLiterature = $('.tmpLiterature');
        let height = $('.selectedPopUp').height() - tmpLiterature.offset().top - 20;
        tmpLiterature.css('height', height + 'px');
    }
    
    
    /***************** 以下是文献历史记录***********************************************/
    

    this.searchRecordsListLength=function (language){
    	let serchlength=0;
    	if(this.param.search_language==0){
	    	for (var i = this.param.cnSearchDocHistoryList.length; i >0; i--) {
				let array= this.param.cnSearchDocHistoryList[i-1];
				serchlength=serchlength+array.length;
		    }
    	}else{
        	for (var i = this.param.enSearchDocHistoryList.length; i >0; i--) {
    			let array= this.param.enSearchDocHistoryList[i-1];
    			serchlength=serchlength+array.length;
    	    }
    	}
    	return serchlength;
    }
    // 查找记录列表结构
    this.searchRecordsListHtml = function (currentPage) {
    	$("#search_current_page").html(currentPage);
        let listHtml = ""
        let listData =[];
        for (var i = this.param.cnSearchDocHistoryList.length; i >0; i--) {
			let array= this.param.cnSearchDocHistoryList[i-1];
			for(var j = 0; j < array.length; j++){
				listData.push(array[j])
			}
	    }
        let selectedData=this.param.tempCnDocList;
        if(this.param.search_language!=0){
            listData =[];
        	for (var i = this.param.enSearchDocHistoryList.length; i >0; i--) {
    			let array= this.param.enSearchDocHistoryList[i-1];
    			for(var j = 0; j < array.length; j++){
    				listData.push(array[j])
    			}
    	    }
    	   selectedData=this.param.tempEnDocList;
        }
        let num=0;
        if(listData!=null && listData.length>0){
	        for(let index=0;index<listData.length;index++){
	        	if(num>9){
	        		  break; // 返回true表示终止循环
	        	}
	        	 currentPage=currentPage==0?1:currentPage;
	        	 let list_index=(currentPage-1)*10+num;
	             if(listData.length-1-list_index<0){
	            	  break;
	             }
	             let item=listData[list_index];
	             var doctypename=this.param.docType[item.type];
	             let exists = selectedData.some(function(it) {
	         	    return item.id === it.id;
	         	});
	             let journalBasetext="";
	         	if(typeof item.journalBase !="undefined"){
            		for (let j = 0; j <item.journalBase.length; j++) {
                		journalBasetext=journalBasetext+'<li>'+this.param.journalBase[item.journalBase[j]]+'</li>'
                	}
            		if(journalBasetext!=""){
            			journalBasetext=' <ul class="isCoreList">'+journalBasetext+'</ul>'
            		}
            	}
	            const serialNumber = list_index + 1;
	            num++;
	            listHtml += `
	                <div class="searchListItem ${exists ? 'searchListAdded' : ''}" data-id="${item.id}">
	                	<div class="searchAbsTogg ${item.isAdded ? 'abstractsClose' : 'abstractsTogg'}">
	                                	展开
                        </div>
	                    <div class="searchInfo">
	                        <p class="listItemTitleAndAction">
	                            <span class="listItemTitle">${serialNumber}.${item.title}</span>
	                            <span class="listItemAction"  data-id="${item.id}">选择</span>
	                        </p>
	                        <p class="listItemTypeAndYear">
	                            <span class="listItemType">${doctypename}</span>
	                            <span class="listItemYear">${item.year}年</span>
	                        </p>
	                        <div class="coreAndLevelTwoTitle">
	                            <span class="listItemCore" style="${(item.journalBase)&&(item.journalBase).length!=0 ? '' : 'display:none'}">核心</span>
	                            <p class="listItemLevelTwo" style="${(item.journalName)&&(item.journalName).length!=0 ? '' : 'display:none'}"><span>《${item.journalName}》</span></p>
	                        </div>
	                        ${journalBasetext}
	                        <p class="listItemAuthor" style="${(item.author)&&(item.author).length!=0 ? '' : 'display:none'}">
	                            ${(item.author) ? item.author.join(";") : ""}
	                        </p>
	                        <div class="listItemAbstracts">
	                            <p class="listItemAbstractsCollapse">
	                                ${item.abstract}
	                            </p>
	                        </div>
	                    </div>
	                </div>`
	        }
        }
        if(listHtml!=''){
        	$('.searchRecordsPopUpList').html(listHtml)
        	$(".searchRecordsFooter").show();
        }else{
            //暂无数据
        	$('.searchRecordsPopUpList').html(this.noDataHtml());
        	$(".searchRecordsFooter").hide();
        }
      
    }

    // 弹窗主体结构
    this.searchRecordsHtml = function () {
    	$("#searchRecordsPopUpOnly").remove();
        $('body').append(`
        <div id="searchRecordsPopUpOnly">
            <div class="searchRecordsPopUp">
                <div class="searchRecordsPopUpContent">
                    <div class="searchRecordsPopUpClose"></div>
                    <div class="searchRecordsPopUpTitle">
                        查找记录
                    </div>
                    <div class="searchRecordsDesc">
                        （只包含本次查找期间的数据记录）
                    </div>
                    <div class="searchRecordsTab">
                        <div class="searchRecordsTabItem ${this.param.search_language==0?'searchRecordsTabActive':''}" data-search-language="0">
                            中文文献
                        </div>
                        <div class="searchRecordsTabItem ${this.param.search_language==1?'searchRecordsTabActive':''}"  data-search-language="1">
                            英文文献
                        </div>
                    </div>
                    <div class="searchRecordsPopUpList">
                        
                    </div>
                    <div class="searchRecordsFooter">
                        <div class="searchRecordsPag">
                            <div id="search_pre_page">上页</div>
                            <div id="search_current_page">本页</div>
                            <div id="search_next_page">下页</div>
                        </div>
                        <div class="searchRecordsTotalContainer">
                                            本次操作已选择中文文献* <span class="uploadSum">${this.param.tempCnDocList.length}</span> 篇，
                                            英文文献* <span class="selectSum">${this.param.tempEnDocList.length}</span> 篇；
                        </div>
                    </div>
                </div>
            </div>
        </div>`)
    }
    
 // 打开弹窗
    this.searchRecordsPopUpOpen = function () {
    	this.param.search_language=this.param.language;
    	 this.searchRecordsHtml(1);
         this.searchRecordsListHtml(1);
         $("#searchRecordsPopUpOnly").css('transform', 'translateY(0)')
        setTimeout(()=>{
            this.popUpListHeightSearchRecords();
        },280)

    }

    // 关闭弹窗
    this.searchRecordsPopUpClose = function () {
        $("#searchRecordsPopUpOnly").css('transform', 'translateY(100%)');
    }


    // 计算列表高度
    this.popUpListHeightSearchRecords = function () {
    	return;
        let listDom = $(".searchRecordsPopUpList")
        let listHeight = $(window).height() - $('.searchRecordsPopUpList').offset().top - $('.searchRecordsFooter').height() ;
        listDom.css("height", listHeight + "px");
    }
    // 绑定事件
    this.deleteSelectedPopUpBindEvent = () => {
        $('.deleteSelectedPopUpBtnNo').on('click', () => {
            $("#deleteSelectedPopUpOnly").remove();
        })
        $('.deleteSelectedPopUpBtnYes').on('click', (e) => {
        	let itemid=$(e.target).attr("data-id");
        	this.deleteSelected(itemid);
        	$("#deleteSelectedPopUpOnly").remove();
        })
    }

    // 绑定检索事件
    this.eventBind=function(){
    	// 核心全称展示
    	$('body').on('click','.coreDetailBtn', ()=> {
    		$('.coreDetailContainer').toggle();
    	})
    	
    	// 点击其他区域消失核心全称弹窗
    	
    	$(document).on('click', function(event) {
	        if (!$('.coreDetailBtn').is(event.target) && $('.coreDetailBtn').has(event.target).length === 0) {
	        	$('.coreDetailContainer').hide()
	        }
	    });
    	
        // 关闭按钮事件
        $('body').on('click', `.closeSelectLiteraturePopUp`, () => {
            this.closePop()
        })
        // 中英文切换
        $('body').on('click', `.selectLiteratureContent .tabItem`, (e) => {
            this.hideLoading();
            $(e.currentTarget).addClass("active").siblings().removeClass('active');
            if($('#selectDocPop .contineFindLiterature').length<= 0){
                this.getSearchParam();

            }
            this.param.language=$(e.currentTarget).attr("data-language");
            this.changeLanguage()

            // 期刊等级状态显示隐藏
            this.journalLevelShow();

            if (this.param.nextStepCnTypeFlag == 'Cntrue' && this.param.language==0&&this.param.cnDocList.length== 0 && this.param.tempCnDocList.length!=0) {
                $('.nextStepContent').show();
                $('.nextStepContent .tabItem').eq(0).click();
                $('.selectLiteratureContent').hide();
                return false;
            }
            if (this.param.nextStepEnTypeFlag == 'Entrue' && this.param.language==1&&this.param.enDocList.length== 0 && this.param.tempEnDocList.length!=0) {
                $('.nextStepContent').show();
                $('.nextStepContent .tabItem').eq(1).click();
                $('.selectLiteratureContent').hide();
                return false;
            }
        })
        // 下一步 中英文切换
        $('body').off('click', `.nextStepContent .tabItem`).on('click', `.nextStepContent .tabItem`, (e) => {
            $(e.currentTarget).addClass("active").siblings().removeClass('active');
            this.param.language=$(e.currentTarget).attr("data-language");


            if (this.param.nextStepCnTypeFlag == '' && this.param.language==0) {
                $('.nextStepContent').hide();
                $('.selectLiteratureContent .tabItem').eq(0).click();
                $('.selectLiteratureContent').show();
                return false;
            } else if (this.param.nextStepEnTypeFlag == '' && this.param.language==1) {
                $('.nextStepContent').hide();
                $('.selectLiteratureContent .tabItem').eq(1).click();
                $('.selectLiteratureContent').show();
                return false;
            }

            this.nextStepPopUp()
        })

        // 中文期刊等级切换事件
        $('body').on('click', `.enFindLiterature`, (e) => {
        	this.getSearchParam();
        	this.param.currentEnSearch.current_page=1;
        	this.searchReferDocList(this.param.currentEnSearch);

            $(".selectLiteratureContent .saveSubmit").hide();

            this.param.nextStepEnTypeFlag = ''
            $('.optionClass').hide();

            $(".nextStep").show();
        })
         $('body').on('click', `.cnFindLiterature`, (e) => {
        	
        	this.getSearchParam();
        	this.param.currentCnSearch.current_page=1;
        	this.searchReferDocList(this.param.currentCnSearch);

             this.param.nextStepCnTypeFlag = ''
             $('.optionClass').hide();

             $(".selectLiteratureContent .saveSubmit").hide();
             $(".nextStep").show();
        })
            // 文献类型
        $('body').on('click', 'input[name="selectLiteratureType"]', (e) => {
        	let doctype= $('input[name="selectLiteratureType"]:checked').map(function() {
        	    return $(this).val(); 
        	}).get();
        	if(doctype.length==0){
        		 $(e.currentTarget).prop('checked', true);
        		  tip('文献类型至少选择1个！')
                  return
        	}
        	if(doctype.includes("1")||doctype.includes("4")){
        		$('input[name="selectJournalLevel"][value="1"]').closest(".selectCnAndEnItem").show();
        	  let is_porrt=$('input[name="selectJournalLevel"]:checked').val();
        	  if(is_porrt==1){
        		  $(".selectLiteratureJournalLevel").show();
        	  }else{
        		  $(".selectLiteratureJournalLevel").hide();
        	  }
        	  
        	}else{
        		$('input[name="selectJournalLevel"][value="1"]').closest(".selectCnAndEnItem").hide();
        	   $(".selectLiteratureJournalLevel").hide();
        	}
        })
         $('body').on('click', 'input[name="selectLiteratureJournalLevel"]', function (e) {
            var chelen = $('input[name="selectLiteratureJournalLevel"]:checked');
            if (chelen.length == 0) {
                $(this).prop('checked', true);
                tip('数据库至少选择1个！')
                return
            }
        })
        $('body').on('click', 'input[name="year"]', (e) => {
            this.yearClickView(e.target)
        })
        
        $('body').on('click', `.literatureListItem`, (e) => {
        	if(this.isCanSelect(this.param.language)){
        		$(e.currentTarget).addClass("literatureAdded");
                $(".selectLiteratureContent .selectLiteraturePag").css('padding-bottom', '4.5rem');
                $(".selectLiteratureFooter").show();
        		this.singleSelect($(e.currentTarget).attr("data-id"));
        	}
        })
        
        $('body').on('click', `.searchListItem`, (e) => {
        	if(this.isCanSelect(this.param.search_language)){
        		$(e.currentTarget).addClass("searchListAdded");
            	$("div[data-id='"+$(e.currentTarget).attr("data-id")+"']").addClass("literatureAdded");
                $(".selectLiteratureContent .selectLiteraturePag").css('padding-bottom', '4.5rem');
                $(".selectLiteratureFooter").show();
	        	this.singleSelect($(e.currentTarget).attr("data-id"));
	        	if(this.param.search_language==0){
	        		$(".uploadSum").text(Number($(".uploadSum").text())+1);
	        	}else{
	        		$(".selectSum").text(Number($(".selectSum").text())+1);
	        	}
        	}
        })
        
        $('body').on('click', '.selectedPopUp .literatureListItemDelete, .selectLiteraturePopUp .literatureListItemDelete', (e) => {
        	var docid=$(e.currentTarget).parent().attr("data-id");
        	this.delItem(docid);
        })
         $('body').on('click', '.closeSearch', (e) => {
        	 if(this.param.language==0 ){
            	 this.param.isCnSearch=false;
            	 this.cnSearchInit(false);  
            	 $(".cncloseSearch").hide();
            	 
               }else{
              	 this.param.isEnSearch=false;
              	 this.enSearchInit(false);
              	$(".encloseSearch").hide();
               }  
         })
       
          // 文献数量-实时过滤非数字字符 
        $('body').on('input', 'input[name="selectLiteratureNum"]', (e) =>{
            // 允许输入数字和删除操作
            var val = $(e.currentTarget).val();
            val=val.replace(/[^0-9]/g, '')
            // 禁止以0开头
            if (val.startsWith('0')) {
               val = val.substring(1);
            }
            $(e.currentTarget).val(val);
        });
        $('body').on('click', `#sclectDocPopOnly .saveSubmit`, (e) => {
        	 this.commit()
        })
        /* 返回上一步 */
        $('body').on('click', `.SelectLiteratureSave .returnBtn`, (e) => {
        	 this.backStepPopUp();
        })
        $('body').on('click', `.nextStep`, (e) => {
            this.nextStepPopUp();
        })
         $('body').on('click', 'input[name="selectJournalLevel"]', (e) => {
         // 期刊等级切换事件
        	 let  journal_level=$(e.currentTarget).val();
             if(journal_level==1){
             	$(".selectLiteratureJournalLevel").show();
             }else{
             	$(".selectLiteratureJournalLevel").hide();
             } 
        })
        $('body').on('click', `.cnAllSelect`, (e) => {
        	 this.allSelect()
        }) 
         $('body').on('click', `.contineFindLiterature`, (e) => {
        	 if(this.param.language==0 ){
          	   this.param.isCnSearch=true;
          	   this.cnSearchInit();
          	    $(".cncloseSearch").show();
             }else{
            	 this.param.isEnSearch=true;
            	 this.enSearchInit();
            	 $(".encloseSearch").show();
             }  
        	 
        	 this.backDisplaySearch()
        }) 
        $('body').on('click', '.aiResKeyWord', (e) => {
        	 this.param.keyword.generateKeywords(this.param.title,this.param.language);
        });
   
        
        
        //下一页
        $('body').on('click', `.selectLiteratureContent #next_current_page`, (e) => {
        	let searchList=$(".literatureListItem");
        	if(searchList.length<10){
        		return;
        	}
         	if(this.param.language==0 ){
         		if(this.param.cn_list_current_page*10>=this.param.cnSearchDocList.length){
         			return;
         		}
         		this.param.cn_list_current_page+=1;
        	}else{
         		if(this.param.en_list_current_page*10>=this.param.enSearchDocList.length){
         			return;
         		}
        		this.param.en_list_current_page+=1;
        	}
            this.changeCurrentPage();  
        }) 
        
        //上一页
        $('body').on('click', '.selectLiteratureContent #pre_current_page', (e) => {
        	if(this.param.language==0 ){
	            if(this.param.cn_list_current_page==1){
	          	  return;
	           }
               this.param.cn_list_current_page=this.param.cn_list_current_page-1;
        	}else{
        		 if(this.param.en_list_current_page==1){
   	          	      return;
   	             }
                 this.param.en_list_current_page=this.param.en_list_current_page-1;
        	}
            this.changeCurrentPage();   
        })

        //下一步弹窗 下一页事件
        $('body').on('click', `.nextStepContent #next_current_page`, (e) => {
            this.nextCurrentPage()
        })

        //下一步弹窗 上一页事件
        $('body').on('click', `.nextStepContent #pre_current_page`, (e) => {
            this.preCurrentPage()
        })


        /*********换一批***************/
        $("body").on('click', '.cnBatchAdd', (e) => {
        	this.changeOneHtml();
        });
        $("body").on('click', '.changeOneTipsBtnCancel', (e) => {
        	$("#changeOneTipsOnly").remove();
        });
        $("body").on('click', '.changeOneTipsClose', (e) => {
        	$("#changeOneTipsOnly").remove();
        });
        $("body").on('click', '.changeOneTipsBtnSave', (e) => {
        	$("#changeOneTipsOnly").remove();
        	 this.searchAgain();
        });
        
        /************* 已选文献事件*******************/
           $('body').on('click', '.selectLiteratureDetail', (e) => {
            this.openSelectedPopUp();
          }) 
        
        
         $('body').on('click', '.selectedPopUpClose', (e) => {
            this.closeSelectedPopUp();
          })
          
         $('body').on('click', '.expandBtn', (e) => {
            // 收起摘要和标题
            if ($(e.target).hasClass('deleteBtnExpand')){
                this.hideAbstractText()
                return
            }
            // 展开摘要和标题
            this.showAbstractText(e.target)
          });

         // 绑定删除事件
         $('body').on('click', '.deleteBtn', (e) => {
        	 let itemid=$(e.target).closest('tr').data('id');
        	 this.deleteSelectedPopUpContentPopUpHtml(itemid);
         })

        $('body').on('click', '.nextStepContent .literatureListItemDelete', (e) => {
            let itemid=$(e.target).closest('.searchListItem').data('id');
            this.deleteSelectedPopUpContentPopUpHtml(itemid);
        })

         // 中英文切换
        $('body').on('click', '.selectedTabItem', (e) => {
        	$(e.currentTarget).addClass("selectedActive").siblings().removeClass('selectedActive');
        	this.param.selected_language=$(e.currentTarget).attr("data-selected-language");
        	this.selectedPopUpHtml();
            this.renderList();
        })
       
         /************* 文献历史记录事件*******************/
         
         // 打开弹窗
          $('body').on('click', '.cnSearchRecords', (e) => {
      
            this.searchRecordsPopUpOpen()
         })
          $('body').on('click', '.enSearchRecords', (e) => {
            this.searchRecordsPopUpOpen()
          })
         // 关闭弹窗
          $('body').on('click', '.searchRecordsPopUpClose', (e) => {
            this.searchRecordsPopUpClose()
         })
         //下一页
         $('body').on('click', '.selectLiteratureContent #search_next_page', (e) => {
        	 let searchRecord=$(".searchListItem");
        	 if(searchRecord.length<10){
        		 return;
        	 }
          	if(this.param.search_language==0 ){
          		if(this.param.search_cn_current_page*10>=this.searchRecordsListLength()){
          			return;
          		}
          		this.param.search_cn_current_page+=1;
          	    this.searchRecordsListHtml(this.param.search_cn_current_page);  
         	}else{
         		if(this.param.search_en_current_page*10>=this.param.enSearchDocHistoryList.length){
          			return;
          		}
         		this.param.search_en_current_page+=1;
         	 this.searchRecordsListHtml(this.param.search_en_current_page);  
         	}
            
         }) 
         
         //上一页
         $('body').on('click', '#search_pre_page', (e) => {
         	if(this.param.search_language==0 ){
 	            if(this.param.search_cn_current_page==1){
 	          	  return;
 	            }
                this.param.search_cn_current_page=this.param.search_cn_current_page-1;
                this.searchRecordsListHtml(this.param.search_cn_current_page);  
         	}else{
         		 if(this.param.search_en_current_page==1){
    	          	      return;
    	          }
                  this.param.search_en_current_page=this.param.search_en_current_page-1;
                  this.searchRecordsListHtml(this.param.search_en_current_page);  
         	}
         }) 
         
          // 中英文切换
          $('body').on('click', '.searchRecordsTabItem', (e) => {
        	$(e.currentTarget).addClass("searchRecordsTabActive").siblings().removeClass('searchRecordsTabActive');
        	this.param.search_language=$(e.currentTarget).attr("data-search-language");
        	this.searchRecordsListHtml(1);  
         })
         
         /************* 文献提示弹窗事件*******************/
         $('body').on('click', '.selectedChangePopUpClose', (e) => {
        	  $("#selectedChangePopUpOnly").remove();
         })
         
         $('body').on('click', '.selectedChangePopUp .btnSave', (e) => {
        	  $("#selectedChangePopUpOnly").remove();
         })
           $('body').on('click', '.selectedChangePopUp .btnCancel', (e) => {
        	   $("#selectedChangePopUpOnly").remove();
        	   this.param.tipCloseflag=false;
        	   this.closePop();
         })

        /* 下一步弹窗关闭 */
        $('body').on('click', '.closeNextStepContent', (e) => {
            this.closeNextStepPopUp();
        })

        /* 是否生成正文&& 是否生成大纲 事件 */
        $('body').on('click', '#sclectDocPopOnly .literatureListItemIsBuildText, #sclectDocPopOnly .literatureListItemBuildOutline', (e) => {

            if($(e.target).is('.literatureListItemIsBuildText') || $(e.target).is('.literatureListItemBuildOutline')) {
                this.isBuildTextAndOutline($(e.target));
            } else {
                this.isBuildTextAndOutline($(e.target).parent());
            }
        })
    }

    /*
    * 下一步弹窗关闭
    * */
    this.closeNextStepPopUp = () => {
        $('.nextStepContent').hide();
        $(".selectLiteratureContent").show();
    }

    /* 添加下一步弹窗 */
    this.nextStepPopUp = () => {
        $('.nextStepContent').show();
        $(".selectLiteratureContent").hide();
        if(this.param.tempCnDocList==null||this.param.tempCnDocList.length==0 && this.param.language==0){
            $('.nextStepContent').hide();
            $('.selectLiteratureContent').show();
            $(".selectLiteratureContent .tabItem").eq(0).click();
        }else if(this.param.tempEnDocList==null||this.param.tempEnDocList.length==0 && this.param.language==1) {
            $('.nextStepContent').hide();
            $('.selectLiteratureContent').show();
            $(".selectLiteratureContent .tabItem").eq(1).click();
        } else {
            this.renderNextStepSelectPop()
        }
    }

    /* 渲染 下一步弹窗的列表 */
    this.renderNextStepSelectPop = () => {
        let content = '';
        var doctypename=''
        let journalBasetext="";
        $('.nextStepContent').show();
        if (this.param.language==0) {
            $("#nextStepSelectPopCn").html('');
            $("#nextStepSelectPopCn").show();
            $(".nextStepContent .tabItem").eq(0).addClass('active').siblings().removeClass('active');
            let currentData = []
            if (this.param.tempCnDocList.length > 10) {
                currentData = this.param.tempCnDocList.slice((this.param.nextCnCurrent-1)*10,this.param.nextCnCurrent*10);
            }
            else{
                currentData = this.param.tempCnDocList;
            }


            currentData.forEach((item, index) => {
                if(typeof item.journalBase !="undefined"){
                    for (let j = 0; j <item.journalBase.length; j++) {
                        journalBasetext=journalBasetext+'<li>'+this.param.journalBase[item.journalBase[j]]+'</li>'
                    }
                    if(journalBasetext!=""){
                        journalBasetext=' <ul class="isCoreList">'+journalBasetext+'</ul>'
                    }
                }
                doctypename = this.param.docType[item.type];
                content += `
                    <div class="searchListItem searchListAdded" data-id="${item.id}">
                        <div class="literatureListItemDelete optionClass">删除</div>
                        <div class="literatureListItemIsBuildText optionClass ${item.is_use_content==0 ? 'literatureListItemIsBuildFalse' : ''}">
                            生成正文
                            <div class="isBuildText"></div>
                        </div>
                        <div class="literatureListItemBuildOutline optionClass ${item.is_use_outline==0 ? 'literatureListItemIsBuildFalse' : ''}">
                            生成大纲
                            <div class="isBuildOutline"></div>
                        </div>
	                	<div class="searchAbsTogg ${item.isAdded ? 'abstractsClose' : 'abstractsTogg'}">
	                                	展开
                        </div>
	                    <div class="searchInfo">
	                        <p class="listItemTitleAndAction">
	                            <span class="listItemTitle">${index+1}.${item.title}</span>
	                        </p>
	                        <p class="listItemTypeAndYear">
	                            <span class="listItemType">${doctypename}</span>
	                            <span class="listItemYear">${item.year}年</span>
	                        </p>
	                        <div class="coreAndLevelTwoTitle">
	                            <span class="listItemCore" style="${(item.journalBase)&&(item.journalBase).length!=0 ? '' : 'display:none'}">核心</span>
	                            <p class="listItemLevelTwo" style="${(item.journalName)&&(item.journalName).length!=0 ? '' : 'display:none'}"><span>《${item.journalName}》</span></p>
	                        </div>
	                        ${journalBasetext}
	                        <p class="listItemAuthor" style="${(item.author)&&(item.author).length!=0 ? '' : 'display:none'}">
	                            ${(item.author) ? item.author.join(";") : ""}
	                        </p>
	                        <div class="listItemAbstracts">
	                            <p class="listItemAbstractsCollapse">
	                                ${item.abstract}
	                            </p>
	                        </div>
	                    </div>
	                </div>
                `
            })
            $("#nextStepSelectPopCn").append(content);
            $("#nextStepSelectPopEn").hide();
            this.param.nextStepCnTypeFlag = 'Cntrue';

            $(".nextSelectLiteratureFooter").show();
            $('.nextStepContent #list_current_page').text(this.param.nextCnCurrent)
        } else if (this.param.language==1) {
            $("#nextStepSelectPopEn").html('');
            $("#nextStepSelectPopEn").show();
            $(".nextStepContent .tabItem").eq(1).addClass('active').siblings().removeClass('active');
            let currentData = []
            if (this.param.tempEnDocList.length > 10) {
                currentData = this.param.tempEnDocList.slice((this.param.nextEnCurrent-1)*10,this.param.nextEnCurrent*10);
            }
            else{
                currentData = this.param.tempEnDocList;
            }

            currentData.forEach((item, index) => {
                if(typeof item.journalBase !="undefined"){
                    for (let j = 0; j <item.journalBase.length; j++) {
                        journalBasetext=journalBasetext+'<li>'+this.param.journalBase[item.journalBase[j]]+'</li>'
                    }
                    if(journalBasetext!=""){
                        journalBasetext=' <ul class="isCoreList">'+journalBasetext+'</ul>'
                    }
                }
                doctypename = this.param.docType[item.type];
                content += `
                    <div class="searchListItem searchListAdded" data-id="${item.id}">
                        <div class="literatureListItemDelete optionClass">删除</div>
                        <div class="literatureListItemIsBuildText optionClass">
                            生成正文
                            <div class="isBuildText"></div>
                        </div>
                        <div class="literatureListItemBuildOutline optionClass">
                            生成大纲
                            <div class="isBuildOutline"></div>
                        </div>
	                	<div class="searchAbsTogg ${item.isAdded ? 'abstractsClose' : 'abstractsTogg'}">
	                                	展开
                        </div>
	                    <div class="searchInfo">
	                        <p class="listItemTitleAndAction">
	                            <span class="listItemTitle">${index+1}.${item.title}</span>
	                        </p>
	                        <p class="listItemTypeAndYear">
	                            <span class="listItemType">${doctypename}</span>
	                            <span class="listItemYear">${item.year}年</span>
	                        </p>
	                        <div class="coreAndLevelTwoTitle">
	                            <span class="listItemCore" style="${(item.journalBase)&&(item.journalBase).length!=0 ? '' : 'display:none'}">核心</span>
	                            <p class="listItemLevelTwo" style="${(item.journalName)&&(item.journalName).length!=0 ? '' : 'display:none'}"><span>《${item.journalName}》</span></p>
	                        </div>
	                        ${journalBasetext}
	                        <p class="listItemAuthor" style="${(item.author)&&(item.author).length!=0 ? '' : 'display:none'}">
	                            ${(item.author) ? item.author.join(";") : ""}
	                        </p>
	                        <div class="listItemAbstracts">
	                            <p class="listItemAbstractsCollapse">
	                                ${item.abstract}
	                            </p>
	                        </div>
	                    </div>
	                </div>
                `
            })
            $("#nextStepSelectPopEn").append(content);
            $("#nextStepSelectPopCn").hide();
            $(".nextSelectLiteratureFooter").show();
            $('.nextStepContent #list_current_page').text(this.param.nextEnCurrent)
            this.param.nextStepEnTypeFlag = 'Entrue';
        }
    }

    /* 返回上一步 */
    this.backStepPopUp = () => {

        if(this.param.language==0){
            this.param.nextStepCnTypeFlag = ''
            $(".nextStepContent").hide();
            $(".selectLiteratureContent .tabItem").eq(0).addClass('active').siblings().removeClass('active');
            $(".cnIslitertureResultall").show();
            $(".enIslitertureResultall").hide();
        }else{
            this.param.nextStepEnTypeFlag = ''
            $(".nextStepContent").hide();
            $(".selectLiteratureContent .tabItem").eq(1).addClass('active').siblings().removeClass('active');
            $(".cnIslitertureResultall").hide();
            $(".enIslitertureResultall").show();
        }
        $(".nextSelectLiteratureFooter").hide();
        $('.selectLiteratureContent').show()
        $(".selectLiteratureFooter").show();
        $(".nextStepContent").hide();
    }

    /* 是否生成正文&& 是否生成大纲 */
    this.isBuildTextAndOutline = (e) => {
        const $item = e.closest('[data-id]');
        const id = $item.attr('data-id');
        const isCn = this.param.language === 0;
        const list = isCn ? this.param.tempCnDocList : this.param.tempEnDocList;
        const hasBuildText = e.find('.isBuildText').length > 0;

        // 切换样式
        e.toggleClass('literatureListItemIsBuildFalse');
        const isDisabled = e.hasClass('literatureListItemIsBuildFalse');

        // 统一遍历更新字段
        list.forEach(item => {
            if (item.id === id) {
                if (hasBuildText) {
                    item.is_use_content = isDisabled ? 0 : 1;
                } else {
                    item.is_use_outline = isDisabled ? 0 : 1;
                }
            }
        });
    };

    // 下一步弹窗 上一页方法
    this.preCurrentPage = () => {
        if(this.param.selected_language==0 && this.param.nextCnCurrent>1){
            this.param.nextCnCurrent -= 1;
            $('.nextStepContent #list_current_page').text(this.param.nextCnCurrent)
        }else if(this.param.selected_language==1 && this.param.nextEnCurrent>1){
            this.param.nextEnCurrent -= 1;
            $('.nextStepContent #list_current_page').text(this.param.nextEnCurrent)
        }
        this.renderNextStepSelectPop()
    }

    // 下一步弹窗 下一页方法
    this.nextCurrentPage = () => {
        let maxPage=0;

        if(this.param.selected_language==0 ){
            maxPage=Math.ceil(this.param.tempCnDocList.length/10);
        }else if(this.param.selected_language==1){
            maxPage=Math.ceil(this.param.tempEnDocList.length/10);
        }

        if(this.param.selected_language==0 && this.param.nextCnCurrent<maxPage){
            this.param.nextCnCurrent += 1;
            $('.nextStepContent #list_current_page').text(this.param.nextCnCurrent)
        }else if(this.param.selected_language==1 && this.param.nextEnCurrent<maxPage){
            this.param.nextEnCurrent += 1;
            $('.nextStepContent #list_current_page').text(this.param.nextEnCurrent)
        }
        this.renderNextStepSelectPop()
    }

    // 期刊等级状态显示隐藏
    this.journalLevelShow = () => {
        if (this.param.language == 0) {
            if (!$('input[name="selectLiteratureType"][value="1"]').prop('checked')) {
                $('#cnJournalLevelContainer').hide();
            } else {
                $('#cnJournalLevelContainer').show();
            }
        } else {
            if (!$('input[name="selectLiteratureType"][value="4"]').prop('checked')) {
                $('#enJournalLevelContainer').hide();
            } else {
                $('#enJournalLevelContainer').show();
            }
        }
    }

}