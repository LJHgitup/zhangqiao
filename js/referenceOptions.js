function referenceOptions() {
    this.params = {
        // 容器
        refContainer: null,

        // 上次选择的类型
        upSelectType: 'ai',
        // 默认选择
        defaultRefer: 'ai',
        //系统选择
        aiAssistChoose: null,
        //自己选择
        selectReferDoc: null,
        //上传自由资料
        // kkwxDocUplaod: null,
        // 初始化次数
        initCount: 0,
        journalBase: {
            1: "核心",
            0: "不限",
            "-1": "非核心"
        },



        // 上传自有参考文献弹窗参数
        ckwxUploadPop: new ckwxUploadPop(),
        callback: null,
        //是否有上传文件
        hasFile: 0,
        // 是否
        isInited: 0,
        isDisabled: false, // 模块是否可编辑 如不可编辑调用下方函数
        disabledFunction: null,
        titleSelector: null,
    }

    // 初始化
    this.refInit = () => {
        if (this.params.initCount === 0 && this.params.refContainer !== undefined && this.params.refContainer !== null && this.params.refContainer !== '') {
            this.params.initCount++
            this.referenceHtml()
            this.refBindEvent()

            // 上传自有参考文献
            this.params.ckwxUploadPop.param.popClass = "ckwxUpload1";
            this.params.ckwxUploadPop.param.callback = this.ckwxUploadCallback;
        }
    }


    this.getResult = () => {
        let result = {};
        result.refer_doc_type = 1;
        if (this.params.defaultRefer == 'ai') {
            result.refer_doc_type = 1;
            result.search_params = this.params.aiAssistChoose.getResult();
        } else if (this.params.defaultRefer == 'self') {
            result.refer_doc_type = 2;
            result.refer_doc_list = [];
            let docList = this.params.selectReferDoc.getResult();
            result.refer_doc_list = result.refer_doc_list.concat(docList.cnDocList);
            result.refer_doc_list = result.refer_doc_list.concat(docList.enDocList);
        } else if (this.params.defaultRefer == 'none') {
            result.refer_doc_type = 3;
        }
        // let fileList = this.params.kkwxDocUplaod.getResult();
        var referenceFileList = [];
        if (fileList && fileList.length > 0) {
            fileList.forEach(item => {
                var fileitem = {};
                fileitem.file_name = item.file_name;
                fileitem.file_url = item.file_url;
                fileitem.filetype = item.filetype;
                referenceFileList.push(fileitem)
            })
        }
        // result.kkwxDocUplaod = referenceFileList;
        return result;

    }

    // 上传自有参考文献回调
    this.ckwxUploadCallback = (fileList) => {
        this.params.hasFile = 0;
        if (typeof this.params.ckwxUploadPop.param.savedFileList != "undefined" && this.params.ckwxUploadPop.param.savedFileList && this.params.ckwxUploadPop.param.savedFileList.length > 0) {
            this.params.hasFile = 1;
            this.params.isSelectedFile = 1;
        }
        this.modelChanged();
    }

    this.getUploadFileResult = function () {
        if (this.params.isSelectedFile == 1) {
            return this.params.ckwxUploadPop.getResult();
        }
        return [];
    }

    
    this.modelChanged = function () {
        // this.changeCkwxSelectStyleByType();
        if (typeof this.params.callback != "undefined" && this.params.callback) {
            this.params.callback(this.params)
        }
    }


    this.disabledFunction = (targetDom) => {
        // this.changeCkwxSelectStyleByType();
        if (this.params.disabledFunction != undefined && this.params.disabledFunction) {
            this.params.disabledFunction(targetDom);
        }
    }

    // 选择类型点击
    this.refTypeClick = (dom) => {
        this.params.upSelectType = this.params.defaultRefer;
        // AI 帮我选
        if (dom.attr('dataRefer') === 'ai') {
            let ai_select_result = this.params.aiAssistChoose.getResult();
            this.AiSelectCallback(ai_select_result.cn_search_param, ai_select_result.en_search_param);
            this.params.defaultRefer = dom.attr('dataRefer')
            /*this.params.aiAssistChoose.params.callback=this.AiSelectCallback;
            this.params.aiAssistChoose.params.concelCallback=this.aiSelectConcelCallback;*/
        }
        // 自己选
        if (dom.attr('dataRefer') === 'self') {
            let paper_title =  $(this.params.titleSelector).val()
            if (typeof paper_title == 'undefined' || paper_title == null || paper_title.trim() == '') {
                tip('请输入论文标题！');
                $('input[name="referenceOptions"][dataRefer="' + this.params.upSelectType + '"]').prop("checked", true)
                return false;
            } else if (paper_title.length < 5) {
                tip('论文标题不能小于5个字！');
                return false;
            }
            // 修改文案
            this.params.selectReferDoc.showPop(paper_title);
            this.params.selectReferDoc.param.callback = this.selectReferDocCallBack;
            this.params.selectReferDoc.param.concelCallback = this.selectReferDocConcelCallBack;

        }
        // 不选择
        if (dom.attr('dataRefer') === 'none') {
            $('.OptionsDescText').text('不选参考文献，论文质量会降低，建议选择掌桥文献或上传自有参考文献')
            $('.OptionsEdit').hide()
            this.params.defaultRefer = dom.attr('dataRefer')
        }
        this.params.thesisoutlinedivTip = dom.attr('dataRefer')

    }

    this.selectReferDocCallBack = () => {
        let resultList = this.params.selectReferDoc.getResult();
        $('.OptionsDescText').html('已选文献：中文*' + resultList.cnDocList.length + '篇； 英文*' + resultList.enDocList.length + '篇')
        $('input[name="referenceOptions"][dataRefer="self"]').prop("checked", true);
        $('.OptionsEdit').show()
        this.params.defaultRefer = "self";
    }
    this.AiSelectCallback = (cnSearchParam, enSearchParam) => {
        var cnyeartext = "近" + cnSearchParam.duration + "年";
        if (cnSearchParam.duration == 0) {
            cnyeartext = "不限年份";
        }
        var cnjournaltext = this.params.journalBase[cnSearchParam.is_import];
        if (cnSearchParam.is_import == 1 || cnSearchParam.is_import == -1) {
            cnjournaltext = "限" + cnjournaltext + ";";
        } else if (cnSearchParam.is_import == 0) {
            cnjournaltext += "期刊;";
        }
        var enyeartext = "近" + enSearchParam.duration + "年";
        if (enSearchParam.duration == 0) {
            enyeartext = "不限年份";
        }
        var enjournaltext = this.params.journalBase[enSearchParam.is_import];
        if (enSearchParam.is_import == 1 || enSearchParam.is_import == -1) {
            enjournaltext = "限" + enjournaltext + ";";
        } else if (enSearchParam.is_import == 0) {
            enjournaltext += "期刊;";
        }
        $('input[name="referenceOptions"][dataRefer="ai"]').prop("checked", true);
        $(".OptionsDescText").text("中文" + cnyeartext + ";" + cnjournaltext + "" + cnSearchParam.cn_doc_num + "篇 |  外文" + enyeartext + ";" + enjournaltext + "" + enSearchParam.en_doc_num + "篇");
        $('.OptionsEdit').text('修改')
        $('.OptionsEdit').show();
        this.params.defaultRefer = "ai";
    }

    this.bczlUploadCallBack = (uploadnum) => {
        if (uploadnum == 0) {
            $(".uploadReferenceDesc").html("&nbsp;&nbsp;上传和选择的文献一起撰写文章")
        } else {
            $(".uploadReferenceDesc").html("已上传" + uploadnum + "篇")
        }
    }
    // 绑定事件
    this.refBindEvent = () => {
        $('input[name="referenceOptions"]').on('click', (e) => {
            let dr = $(e.target).attr('dataRefer');
            if (dr == 'self') {
                e.stopPropagation();
                e.preventDefault();
            }
            this.refTypeClick($(e.target))
        })

        $('body').on('click', '.uploadReference', (e) => {
            if (this.params.isDisabled) {
                this.disabledFunction($(e.target));
                return;
            }
            this.params.ckwxUploadPop.param.isHide = false;
            this.params.ckwxUploadPop.init(this.params.ckwxUploadPop.param);
        })


        $('body').on('click', '.OptionsEdit', (e) => {
            if (this.params.defaultRefer === 'ai') {
                this.params.aiAssistChoose.openAiAssPopup();
                this.params.aiAssistChoose.params.callback = this.AiSelectCallback;
                this.params.aiAssistChoose.params.concelCallback = this.aiSelectConcelCallback;
            } else if (this.params.defaultRefer === 'self') {
                var paper_title = $('#textarea').val();
                if (typeof paper_title == 'undefined' || paper_title == null || paper_title.trim() == '') {
                    tip('请输入论文标题！');
                    $('input[name="referenceOptions"][dataRefer="' + this.params.upSelectType + '"]').prop("checked", true)
                    return false;
                } else if (paper_title.length < 5) {
                    tip('论文标题不能小于5个字！');
                    return false;
                }
                // 修改文案
                this.params.selectReferDoc.showPop(paper_title);
                this.params.selectReferDoc.param.callback = this.selectReferDocCallBack;
                this.params.selectReferDoc.param.concelCallback = this.selectReferDocConcelCallBack;

            }
        })

        this.params.isInited = 1;

        // 页面上气泡点击事件
        $('body').off('click', '.text_enhancetopsicon').on('click', '.text_enhancetopsicon', (e) => {
            e.stopPropagation();
            e.preventDefault();
            $(e.target).parent().find('.current_introduction').toggle();
        });

        // 点击空白区域隐藏气泡弹窗
        $('body').click((e) => {
            if (!$(e.target).is('.text_enhancetopsicon') && !$(e.target).is('.current_introduction') && !$(e.target).is('.current_introduction p')) {
                $('.current_introduction').hide();
            }
        });
    }

    // 结构
    this.referenceHtml = () => {
        $(this.params.refContainer).append(`
            <div id="referenceOptionsOnly">
                <div class="item_formList">
                     <div class="itemTitle_bg"></div>
                     <div class="item_formList_title">
                         <div></div>
                        <div>
                        <h2>
                            参考文献
                            <em class="text_enhancetopsicon" style="position: absolute;cursor: pointer;right: 4.43rem;top: 0.1rem;" data-coll-even="hover" data-track-id="参考文献-标题-问号"></em>
                            <div class="current_introduction" style="left: 1.2rem;display:none;top: unset;width: 5rem;">
                                <p>指公开发表和出版的论文、图书、专利、标准等，可列入正文末尾的参考文献列表，也包含作者自己已发表论文或图书。</p>
                            </div>
                        </h2>
                        </div>
                    </div>
                    <div class="referenceOptions">
                        <div class="referenceOptionsTop">
                            <div class="referenceOptionsTitle mandatory">
                            选择掌桥文献：
                            <em class="text_enhancetopsicon" style="position: absolute;cursor: pointer;right: 0.07rem;" data-coll-even="hover" data-track-id="参考文献-选择掌桥文献-问号"></em>
                            <div class="current_introduction" style="left: 0;display:none;top: unset;width: 6rem;">
                                <p>（1）AI根据论文信息，在掌桥３亿＋中/外文献中查找并推送相关文献 <br>（2）所选文献与论文质量直接相关，请慎重选择</p>
                            </div>
                            </div>
                            <ul class="referenceOptionsUl">
                                <li>
                                    <label>
                                        <input type="radio" dataRefer="ai" name="referenceOptions" checked>
                                        <span>AI帮我选</span>
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <input type="radio" dataRefer="self" name="referenceOptions">
                                        <span>自己选</span>
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <input type="radio" dataRefer="none" name="referenceOptions">
                                        <span>不选择</span>
                                    </label>
                                </li>
                            </ul>
                        </div>
                        <div class="referenceOptionsDesc">
                            <div class="OptionsDescText">
                                中文不限年份;不限期刊;15篇 |  外文不限年份;不限期刊;5篇
                            </div>
                            <div class="OptionsEdit">
                                修改
                            </div>
                        </div>
                        <div class="ownedLiterature">
                            <div class="ownedLiteratureCon">
                                <div class="ownedLiteraturetit">补充自有文献:
                                    <em class="text_enhancetopsicon" style="position: absolute;cursor: pointer;" data-coll-even="hover" data-track-id="参考文献-补充自有文献-问号"></em>
                                    <div class="current_introduction" style="display:none;top: unset;width: 4rem;">
                                        <p>可上传已公开发表的论文、专利及标准，会作为引用来源并生成文末文献列表</p>
                                    </div>
                                </div>
                                <div class="ownedLiteraturebtn uploadReference" data-coll-even="click" data-track-id="参考文献-补充自有文献-上传文献">传文献</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`)
    }

}
