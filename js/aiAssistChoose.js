function aiAssistChoose () {
    this.params = {
        // 弹窗容器
        popupContainer: ".aiSelectMask",
        // 中文检索条件
        cn_search_param: {
            duration:0,
            is_import:0,
            journal_base:[1,2,3,4,5],
            cn_doc_num:10
        },

        // 英文检索条件
        en_search_param:{
            duration:0,
            is_import:0,
            journal_base:[6,7,8,9],
            en_doc_num:5
        },

        // 是否已经初始化过一次
        isInit:0,

        // 回调函数
        callback:null,
        commitCallback:null,
        concelCallback:null,
    }

    // 核心列表
    this.cnCoreList=[
        {
            dataName:"cnJournalType",
            journalType: 1,
            name:"北大核心",
            isChecked:false
        },
        {
            dataName:"cnJournalType",
            journalType: 2,
            name:"CSTPCD",
            isChecked:false
        },
        {
            dataName:"cnJournalType",
            journalType: 3,
            name:"CSCD",
            isChecked:false
        },
        {
            dataName:"cnJournalType",
            journalType: 4,
            name:"CSSCI",
            isChecked:false
        },
        {
            dataName:"cnJournalType",
            journalType: 5,
            name:"CHSSCD",
            isChecked:false
        },
    ]
    this.enCoreList=[
        {
            dataName:"enJournalType",
            journalType: 6,
            name:"SCI",
            isChecked:false
        },
        {
            dataName:"enJournalType",
            journalType: 7,
            name:"EI",
            isChecked:false
        },
        {
            dataName:"enJournalType",
            journalType: 8,
            name:"MEDLINE",
            isChecked:false
        },
        {
            dataName:"enJournalType",
            journalType: 9,
            name:"CA",
            isChecked:false
        },
    ]

    // 初始化加载弹窗内容
    this.choosePopupInit=function(param){
        if(typeof param!="undefined"&&param){
            if(typeof param.cn_search_param!="undefined"&&param.cn_search_param) {
                this.params.cn_search_param = param.cn_search_param;
            }
            if(typeof param.callback!="undefined"&&param.callback) {
                this.params.callback = param.callback;
            }
            if(typeof param.en_search_param!="undefined"&&param.en_search_param) {
                this.params.en_search_param = param.en_search_param;
            }
        }
        this.choosePopupHtml();
        this.initCoreList();
        this.eventBind();
        this.choosePopupRender();
    }

    // 初始化核心列表
    this.initCoreList=function(){
        this.coreListRender(".selectCnJournalLevel",this.cnCoreList,"CN")
        this.coreListRender(".selectEnJournalLevel",this.enCoreList,"EN")
    }


    // 回显弹窗内容
    this.choosePopupRender=function(){
        $('input[name="cnYearKey"][ data-cnYearKey='+this.params.cn_search_param.duration+']').prop('checked', true);
        $('input[name="cnNumKey"][ class="literatureCount"]').val(this.params.cn_search_param.cn_doc_num)
        let cnjournal_base=this.params.cn_search_param.journal_base;
        if(cnjournal_base&&cnjournal_base.length>0){
            cnjournal_base.forEach(item=>{
                $('input[name="cnJournalType"][data-cnjournaltype=' + item + ']').prop('checked', true);
            })
        }
        $('input[name="cnJournalLevelKey"][ data-cnjournallevelkey='+this.params.cn_search_param.is_import+']').click();
        $('input[name="enYearKey"][ data-enYearKey='+this.params.en_search_param.duration+']').prop('checked', true);
        $('input[name="enNumKey"][ class="literatureCount"]').val(this.params.en_search_param.en_doc_num)
        let enjournal_base=this.params.en_search_param.journal_base;
        if(enjournal_base&&enjournal_base.length>0){
            enjournal_base.forEach(item=>{
                $('input[name="enJournalType"][data-enjournaltype=' + item + ']').prop('checked', true);
            })
        }
        $('input[name="enJournalLevelKey"][data-enjournallevelkey='+this.params.en_search_param.is_import+']').click();
    }

    // 关闭弹窗
    this.closeAiAssPopup=function(){
        $(this.params.popupContainer + " " + "").hide()
        if(typeof this.params.concelCallback!="undefined"&&this.params.concelCallback){
            this.params.concelCallback();
        }
    }

    // 打开弹窗
    this.openAiAssPopup=function(){
        $(this.params.popupContainer).show()
        this.choosePopupRender();

    }
    // 提交确认
    this.commit=function() {
        this.params.cn_search_param.duration=$('input[name="cnYearKey"]:checked').attr("data-cnYearKey");
        this.params.cn_search_param.cn_doc_num=Number($('input[name="cnNumKey"]').val());
        this.params.en_search_param.duration=$('input[name="enYearKey"]:checked').attr("data-enYearKey");
        this.params.en_search_param.en_doc_num=Number($('input[name="enNumKey"]').val());

        if(this.params.cn_search_param.cn_doc_num+this.params.en_search_param.en_doc_num<1){
            tip("文献总数至少1篇！");
            return;
        }

        if(this.params.cn_search_param.cn_doc_num==null||this.params.cn_search_param.cn_doc_num==""){
            tip("请填写中文参考文献数");
            return;
        }
        if(this.params.en_search_param.en_doc_num==null||this.params.en_search_param.en_doc_num==""){
            tip("请填写英文参考文献数");
            return;
        }

        if((this.params.cn_search_param.cn_doc_num + this.params.en_search_param.en_doc_num)>100){
            tip("文献总数不得超过100！");
            return;
        }

        this.params.cn_search_param.is_import=$('input[name="cnJournalLevelKey"]:checked').attr("data-cnjournallevelkey");
        this.params.cn_search_param.journal_base = $('input[name="cnJournalType"]:checked').map(function() {
            return $(this).attr("data-cnjournaltype"); // 返回当前选中多选框的值
        }).get();

        this.params.en_search_param.is_import=$('input[name="enJournalLevelKey"]:checked').attr("data-enjournallevelkey");
        this.params.en_search_param.journal_base = $('input[name="enJournalType"]:checked').map(function() {
            return $(this).attr("data-enjournaltype"); // 返回当前选中多选框的值
        }).get();

        // 调用回调函数
        if (typeof this.params.callback == "undefined" || !this.params.callback) {
            throw new Error("回调函数");
            return;
        }

        this.params.callback(this.params.cn_search_param, this.params.en_search_param);
        $(this.params.popupContainer).hide();
    }

    // 绑定事件
    this.eventBind=function(){
        // 核心全称展示
        $('body').on('click','.aiSelectCoreDetailBtn', (e)=> {
            $(e.target).siblings('.aiSelectMaskCoreDetailContainer').toggle();
        })

        // 点击其他区域消失核心全称弹窗
        $(document).on('click', function(event) {
            if (!$('.aiSelectCoreDetailBtn').is(event.target) && $('.aiSelectCoreDetailBtn').has(event.target).length === 0) {
                $('.aiSelectMaskCoreDetailContainer').hide()
            }
        });

        // 关闭按钮事件
        $('body').on('click', `.aiSelectCloseBtn`, () => {
            this.closeAiAssPopup()
        })

        // 确认按钮事件
        $('body').on('click', `.saveBtn`, () => {
            this.commit()
        })

        // 中文期刊等级切换事件
        $("input[name='cnJournalLevelKey']").on("input click", function (e) {
            let  is_import=$(e.currentTarget).attr("data-cnjournallevelkey");
            if(is_import==1){
                $(".selectCnJournalLevel").show();
            }else{
                $(".selectCnJournalLevel").hide();
            }
        })

        // 英文期刊等级切换事件
        $("input[name='enJournalLevelKey']").on("input click", function (e) {
            let  is_import=$(e.currentTarget).attr("data-enjournallevelkey");
            if(is_import==1){
                $(".selectEnJournalLevel").show();
            }else{
                $(".selectEnJournalLevel").hide();
            }
        })

        // 英文数据库点击事件
        $('body').on('click', 'input[name="enJournalType"]', function (e) {
            var chelen = $('input[name="enJournalType"]:checked');
            if (chelen.length == 0) {
                $(this).prop('checked', true);
                tip('数据库至少选择1个！')
                return
            }
        })

        // 中文数据库点击事件
        $('body').on('click', 'input[name="cnJournalType"]', function (e) {
            var chelen = $('input[name="cnJournalType"]:checked');
            if (chelen.length == 0) {
                $(this).prop('checked', true);
                tip('数据库至少选择1个！')
                return
            }
        })

        // 处理文献数量只能输入数字
        $('body').on('input', '.literatureCount', (e) =>{
            this.changeLiteratureCount(e);
        })
    }

    // 处理文献数量输入
    this.changeLiteratureCount = (e) => {
        let originalVal = $(e.target).val().trim();

        let val = originalVal.replace(/\D/g, '');
        val = val.replace(/^0+/, '') || '1';

        if (val.length >= 3) {
            val = val.slice(0, 3);
            $(e.target).parent().siblings(".literatureMaxTip").show();
        } else {
            $(e.target).parent().siblings(".literatureMaxTip").hide();
        }

        $(e.target).val(val);
    }

    // 获取结果
    this.getResult=function(){
        let airesult={};
        airesult.cn_search_param=this.params.cn_search_param;
        airesult.en_search_param=this.params.en_search_param;
        return airesult;
    }

    // 弹窗结构
    this.choosePopupHtml=function(){
        $('body').append(`
            <div id="aiSelectMaskOnly">
                <div class="aiSelectMask">
                    <div class="aiSelectPopup">
                        <div class="aiSelectCloseBtn"></div>
                        <h3 class="aiSelectTitle">设置文献检索要求</h3>
                        
                        <!-- 中文文献检索要求 -->
                        <div class="aiSelectItem cnSearchKey">
                            <h4 class="aiSelectItemTitle">中文文献检索要求</h4>
                            <div class="aiSelectItemForm">
                                <div class="aiSelectItemLabel" style="align-items: flex-start">
                                    <span class="LabelTitle">年份：</span>
                                    <label>
                                        <input type="radio" name="cnYearKey" data-cnYearKey="0">
                                        <span>不限</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="cnYearKey" data-cnYearKey="3">
                                        <span>近三年</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="cnYearKey" data-cnYearKey="5">
                                        <span>近五年</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="cnYearKey" data-cnYearKey="10">
                                        <span>近十年</span>
                                    </label>
                                </div>
                                <div class="aiSelectItemLabel">
                                    <span class="LabelTitle">期刊等级：</span>
                                    <label>
                                        <input type="radio" name="cnJournalLevelKey" data-cnJournalLevelKey="0" checked>
                                        <span>不限</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="cnJournalLevelKey" data-cnJournalLevelKey="1">
                                        <span>核心</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="cnJournalLevelKey" data-cnJournalLevelKey="-1">
                                        <span>非核心</span>
                                    </label>
                                </div>
                                <!-- 中文期刊类型容器 -->
                                <ul class="selectCnJournalLevel"  style="display:none">
                                
                                </ul>
                                <div class="aiSelectItemLabel" style="margin-top: 0.5rem;">
                                    <span class="LabelTitle">文献数量：</span>
                                    <input type="text" name="cnNumKey" autocomplete="off" class="literatureCount" value="10">
                                </div>
                                <div class="literatureMaxTip">
                                    文献总数不得超过100！
                                </div>
                            </div>
                        </div>
                        
                        <!-- 英文文献检索要求 -->
                        <div class="aiSelectItem enSearchKey">
                            <h4 class="aiSelectItemTitle">英文文献检索要求</h4>
                            <div class="aiSelectItemForm">
                                <div class="aiSelectItemLabel" style="align-items: flex-start">
                                    <span class="LabelTitle">年份：</span>
                                    <label>
                                        <input type="radio" name="enYearKey" data-enYearKey="0">
                                        <span>不限</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="enYearKey" data-enYearKey="3">
                                        <span>近三年</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="enYearKey" data-enYearKey="5">
                                        <span>近五年</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="enYearKey" data-enYearKey="10">
                                        <span>近十年</span>
                                    </label>
                                </div>
                                <div class="aiSelectItemLabel">
                                    <span class="LabelTitle">期刊等级：</span>
                                    <label>
                                        <input type="radio" name="enJournalLevelKey" data-enJournalLevelKey="0" checked>
                                        <span>不限</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="enJournalLevelKey" data-enJournalLevelKey="1">
                                        <span>核心</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="enJournalLevelKey" data-enJournalLevelKey="-1">
                                        <span>非核心</span>
                                    </label>
                                </div>
                                <!-- 英文期刊类型容器 -->
                                <ul class="selectEnJournalLevel" style="display:none">
                                
                                </ul>
                                <div class="aiSelectItemLabel" style="margin-top: 0.5rem;">
                                    <span class="LabelTitle">文献数量：</span>
                                    <input type="text" name="enNumKey" autocomplete="off" class="literatureCount" value="5">
                                </div>
                                <div class="literatureMaxTip">
                                    文献总数不得超过100！
                                </div>
                            </div>
                        </div>
                        
                        <!-- 保存按钮 -->
                        <div class="btnStyle saveBtn">保存</div>
                    </div>
            </div></div>`)
    }

    // 核心列表渲染
    this.coreListRender=function(container,data,langType){
        data.forEach(item=>{
            $(container).append(`
            <li>
                <label>
                    <input type="checkbox" 
                        name="${item.dataName}" 
                        data-${item.dataName}="${item.journalType}" 
                        ${item.isChecked?"checked":""}>
                    <span>${item.name}</span>
                </label>
            </li>`)
        })
        if (langType == "CN") {
            $(container).append(`
			  <div class="aiSelectMaskCoreDetail">
			  	<img class="aiSelectCoreDetailBtn" src="${zqcdn}/js/aimodels/ckwxModule/img/question.png" ></img>
			  	<div class="aiSelectMaskCoreDetailContainer">
			  		<div>北京大学中文核心期刊目录(北大核心)</div>
			  		<div>中国科技论文与引文数据库(CSTPCD)</div>
			  		<div>中国科学引文数据库(CSCD)</div>
			  		<div>中文社会科学引文索引(CSSCI)</div>
			  		<div>中国人文社会科学引文数据库(CHSSCD)</div>
			  	</div>
			  </div>
	        `)
        } else {
            $(container).append(`
  			  <div class="aiSelectMaskCoreDetail">
			  	<img class="aiSelectCoreDetailBtn" src="${zqcdn}/js/aimodels/ckwxModule/img/question.png" ></img>
			  	<div class="aiSelectMaskCoreDetailContainer" style="left: -3.6rem;">
			  		<div>美国《科学引文索引》(SCI)</div>
			  		<div>美国《工程索引》(EI)</div>
			  		<div>美国《生物学医学文摘》(MEDLINE)</div>
			  		<div>美国《化学文摘》(CA)</div>
			  	</div>
			  </div>
  	        `)
        }
    }
}