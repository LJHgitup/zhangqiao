function ckwxUploadPop() {
    // 弹窗变量
    this.param = {
        // 当前选中资料类型
        currentFileType: 1,
        // 当前上传的文件临时列表
        tempFileList: [],
        // 已保存的文件列表
        savedFileList: [],
        // 上传组件实例
        uploadInstance: null,
        isHide: true,
        //确认之后函数
        callback: null,
        popClass: "ckwxuppop",
        isInited: 0,
        isRemove: true,
        // 文件格式配置
        fileTypeConfig: {
            1: {
                maxCount: 60,        // 最大上传数量
                maxSize: 5 * 1024 * 1024,  // 单个文件最大大小（2M）
                allowExts: 'doc|docx|pdf',  // 允许的文件格式
                typeName: '自有文献',    // 类型名称
                errorMsg: '自有文献最多支持上传60篇！',  // 超出数量提示
                maxtip: 5,  // 超出数量提示

            }
        }
    },
        // 初始化上传补充资料弹窗
        this.init = function (param) {
            if (typeof param != "undefined" && param) {
                if (typeof param.popClass != "undefined" && param.popClass) {
                    this.param.popClass = param.popClass;
                }
                if (typeof param.callback != "undefined" && param.callback) {
                    this.param.callback = param.callback;
                }
                if (typeof param.savedFileList != "undefined" && param.savedFileList) {
                    this.param.savedFileList = param.savedFileList;
                }
            }
            this.param.tempFileList = this.cloneFileList(this.param.savedFileList);
            $(`.${this.param.popClass}`).remove();
            // 渲染弹窗结构
            this.renderPopup();
            // 初始化上传组件
            this.initUploadModel(this);
            // 渲染文件列表
            this.renderFileList();
            // 更新数量统计和按钮状态
            this.updateCountsAndState();
            // 绑定事件
            this.bindEvent();
        }
    // 显示弹窗
    this.showPop = function () {
        this.param.tempFileList = this.cloneFileList(this.param.savedFileList);
        // 渲染文件列表
        this.renderFileList();
        // 更新数量统计和按钮状态
        this.updateCountsAndState();
        $('.' + this.param.popClass).show();
    }
    // 隐藏弹窗
    this.closePop = function () {
        if (this.param.isRemove) {
            $('.' + this.param.popClass).parent().remove();
        } else {
            $('.' + this.param.popClass).hide();
        }
    }
    // 渲染弹窗
    this.renderPopup = function () {
        var str = `
            <div class="supplementpopup">
                <div class="supplementpopupcon">
               <p class="addFilesTips" >请上传已公开发表的文献原文，上传文献将参与论文写作，并列入文末参考文献列表</p>
                  
                    <div class="supplementpopup_filecon" style="display: flex;align-items: center;margin-bottom: .2rem;">
                        <div class="supplementpopup_fileup" >
                            <button type="button" class="layui-btn layui-btn-normal" id="ID-upload-demo-filesup-ckwx" style="width: auto;height: .6rem !important;background: linear-gradient(90deg, #DE50FF 0%, #8948F5 53%, #3476FE 100%) !important;line-height: .6rem !important;">上传文件</button>
                           <div class="supplementpopup_filedisabled" style="display: none;border: .01rem solid #e6e6e6;background-color: #f2f2f2;color: #C9C9C9;cursor: not-allowed;height: .8rem;width: 102%;position: absolute;top: -.01rem;left: -.01rem;line-height: .4rem;">点击上传</div>
                        </div>
                  
                    </div>
                          <div class="supplementpopup_self file_1_about"  style="font-size: .24rem;color: #333;margin-top: .1rem;text-align: center;">
                            最多<em >${this.param.fileTypeConfig[1].maxCount}</em>篇，可<em >批量上传</em>，单文件<em >${Number(this.param.fileTypeConfig[1].maxSize / (1024 * 1024))}M内</em>，支持<em >word、pdf</em>格式</em></div>
                    <div class="supplementpopup_table-ckwx" style="display:none;">
                          <div class="layui-upload uploadscroll uploadscrollckwx " style="max-height: 4.7rem;overflow: auto;margin-top: .4rem;">
                            <div class="layui-upload-list-ckwx">
                            <table class="layui-table" style="text-align: center;">
                                <colgroup>
                                <col width="60">
                                <col width="120">
                                <col width="150">
                                <col width="150">
                                <col width="150">
                                <col width="80">
                                </colgroup>
                                <thead>
                                <th style="text-align: center; ">文件名</th>
                                <th style="text-align: center; ">进度</th> 
                             
                                <th style="text-align: center; ">操作</th>
                                </thead>
                                <tbody id="ID-upload-demo-files-listup-ckwx"></tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                    <div class="purposefileTipNextstep"><em>!</em>不参与生成正文的文献将不会再正文中被引用</div>
                  
                </div>
            </div>
            <div class="supplementpopupsumself1 file_1_about" style="font-size: .24rem;text-align: center;margin-top: .6rem;display:block;">
                    已上传<em class="selfnumt" >0</em>篇
             </div>
           `;
        // 调用通用弹窗函数创建弹窗
        commonPopUpNew(this.param.popClass, '补充自有文献', str, false, false, '', '', true, this.param.isHide);
    }

    // 保存上传的文件列表(将临时列表数据同步到已保存列表，并关闭弹窗)
    this.commitFunction = function () {
        var selfnumt = $('.selfnumt').text();
        this.param.tempFileList = this.param.tempFileList.filter(item => item.uploadStatus != 'fail')
        //将临时列表操作结果保存到最终列表
        this.param.savedFileList = this.cloneFileList(this.param.tempFileList);
        console.log(this.param.savedFileList)
        // 构建保存对象---end
        layui.layer.msg('保存成功！');
        this.closePop();
        // 执行保存后回调
        if (typeof this.param.callback != "undefined" && this.param.callback) {
            this.param.callback(this.param.savedFileList);
        }
    }

    // 校验文件格式（解决重新上传格式校验问题）
    this.checkFileFormat = function (file) {
        var allowExts = this.param.fileTypeConfig[this.param.currentFileType].allowExts.split('|');
        var ext = file.name.split('.').pop().toLowerCase();
        return allowExts.includes(ext);
    }

    //初始化上传组件
    this.initUploadModel = function (that) {
        layui.use(['upload', 'layer', 'jquery'], function () {
            var upload = layui.upload;
            var layer = layui.layer;
            var $ = layui.jquery;

            // 创建上传实例
            that.param.uploadInstance = upload.render({
                elem: '#ID-upload-demo-filesup-ckwx',  // 绑定上传按钮
                multiple: true,  // 支持多文件上传
                url: url + '/ai/uploadpro.html', // 上传接口地址
                method: 'post',  // 请求方法
                auto: false,  // 不自动上传（选择后直接添加到列表）
                size: that.param.fileTypeConfig[that.param.currentFileType].maxSize,  // 单个文件大小限制
                accept: 'file',
                exts: that.param.fileTypeConfig[that.param.currentFileType].allowExts,  // 允许的文件格式

                /**
                 * 选择文件后的回调
                 * @param {Object} obj - layui上传组件的文件对象
                 */
                choose: function (obj) {
                    var isReUpload = typeof that.param.reUploadIndex != "undefined" && that.param.reUploadIndex !== null;
                    if (isReUpload) {
                        // 如果是重新上传，先删除原失败的文件
                        that.param.tempFileList.splice(that.param.reUploadIndex, 1);
                        // 清空重新上传
                        that.param.reUploadIndex = null;
                        // 重新计算剩余数量（因为删除了原失败文件）
                        var currentType = that.param.currentFileType;
                        var currentTypeFiles = that.getFilesByType(currentType);
                        that.param.remainingCount = that.param.fileTypeConfig[currentType].maxCount - currentTypeFiles.length;
                    }
                    // 获取选择的文件列表（推送到上传队列）
                    var files = this.files = obj.pushFile();
                    // 当前选中的文件类型
                    var currentType = that.param.currentFileType;
                    // 获取当前类型已上传的文件列表
                    var currentTypeFiles = that.getFilesByType(currentType);
                    // 计算当前类型还能上传的剩余数量
                    // var remainingCount = that.param.fileTypeConfig[currentType].maxCount - currentTypeFiles.length;
                    var remainingCountfail = that.param.tempFileList.filter(item => item.uploadStatus != 'fail')
                    var remainingCount = that.param.fileTypeConfig[currentType].maxCount - remainingCountfail.length;


                    // 检查是否已达最大数量
                    if (remainingCount <= 0) {
                        layer.msg(that.param.fileTypeConfig[currentType].errorMsg);
                        // 清空已选择的文件（避免多余文件残留）
                        Object.keys(files).forEach(key => delete files[key]);
                        return;
                    }

                    // 预览并处理选择的文件
                    obj.preview(function (index, file) {
                        //清空 input file 值，以免同名文件选择后不可再选
                        that.param.uploadInstance.config.elem.next()[0].value = '';
                        if (file.size > that.param.fileTypeConfig[currentType].maxSize) {
                            tip(`文件【${file.name}】大小超过${that.param.fileTypeConfig[currentType].maxtip}MB，无法上传！`);
                            delete files[index];
                            return;
                        }

                        // 检查文件是否已上传（去重：通过文件名、大小、最后修改时间判断）
                        if (that.isFileDuplicate(file, currentType)) {
                            layer.msg('该文件已上传！');
                            delete files[index];  // 移除重复文件
                            return;
                        }

                        // 检查是否还有剩余上传名额
                        if (remainingCount <= 0) {
                            layer.msg(`${that.param.fileTypeConfig[currentType].typeName}已达上限，最多上传${that.param.fileTypeConfig[currentType].maxCount}篇！`);
                            delete files[index];  // 移除超出数量的文件
                            return;
                        }

                        that.param.tempFileList.push({
                            name: file.name,  // 文件名
                            size: file.size,  // 文件大小（字节）
                            lastModified: file.lastModified,  // 最后修改时间（用于去重）
                            filetype: currentType,// 文件类型（1或2）
                            file_url: null,  // 文件地址
                            is_use_outline: 1,  // 大纲
                            is_use_content: 1, // 正文
                            uploadIndex: index, // 上传索引
                            uploadStatus: 'uploading', // 上传状态：uploading/成功/失败
                            uploadProgress: 0, // 上传进度（0-100）
                            fileObj: file  // 保存原始文件对象，用于重新上传
                        });
                        console.log(that.param.tempFileList)
                        // that.param.tempFileList.splice(that.param.reUploadIndex, 1);


                        // 重新渲染列表，显示初始进度
                        that.renderFileList();
                        // 剩余数量减1
                        remainingCount--;
                        // 执行上传
                        obj.upload(index, file);
                    });
                },
                // 上传进度回调
                progress: function (n, elem, e) {
                    var percent = n + '%'; // 进度百分比
                    // 找到当前文件对应的行
                    var fileItem = that.param.tempFileList.find(item => item.uploadIndex == elem.index);
                    if (fileItem) {
                        fileItem.uploadProgress = n; // 更新进度值
                        // 更新页面进度显示
                        $(`#upload-${that.param.tempFileList.indexOf(fileItem)} .progress-bar`).css('width', percent);
                        $(`#upload-${that.param.tempFileList.indexOf(fileItem)} .progress-num`).text(percent);
                    }
                },
                done: function (res, index, upload) {
                    $('.success_tips').remove()
                    var status = res.status;
                    var data = res.data;

                    // 找到当前文件
                    var fileIndex = that.param.tempFileList.findIndex(item => item.uploadIndex == index);
                    if (fileIndex > -1) {
                        if (status == 1) {
                            // 上传成功：进度设为100%
                            if (null != data.fileurl && typeof data.fileurl != "undefined" && data.fileurl != '' && null != data.filename && typeof data.filename != "undefined" && data.filename != '') {
                                that.param.tempFileList[fileIndex].file_url = data.fileurl;
                                that.param.tempFileList[fileIndex].uploadStatus = 'success'; // 成功状态
                                that.param.tempFileList[fileIndex].uploadProgress = 100; // 强制设为100%
                            }
                            // 更新列表显示
                            that.renderFileList();
                            // 更新数量统计和按钮状态
                            that.updateCountsAndState();
                            var $modaluploadscroll = $('.uploadscrollckwx');
                            $modaluploadscroll.scrollTop(2000);
                            $('#confirmcommonpopup').show();
                        } else {
                            // 接口返回失败：进度设为0%
                            that.param.tempFileList[fileIndex].uploadStatus = 'fail'; // 失败状态
                            that.param.tempFileList[fileIndex].uploadProgress = 0; // 强制设为0%
                            that.renderFileList();
                            layer.msg("上传失败：" + (res.msg || '未知错误'));
                        }
                    }
                },
                error: function (index, upload) {
                    // 进度设为0%
                    var fileIndex = that.param.tempFileList.findIndex(item => item.uploadIndex == index);
                    if (fileIndex > -1) {
                        that.param.tempFileList[fileIndex].uploadStatus = 'fail'; // 失败状态
                        that.param.tempFileList[fileIndex].uploadProgress = 0; // 强制设为0%
                        that.renderFileList();
                        layer.msg("上传失败：网络错误或服务器异常");
                    }
                }
            });
        });
    }

    // 校验去重
    this.isFileDuplicate = function (file, type) {
        return this.getFilesByType(type).some(item =>
            item.name === file.name &&
            item.size === file.size &&
            item.lastModified === file.lastModified
        );
    }


    //  渲染文件列表表格（根据临时列表数据生成表格内容）
    this.renderFileList = function () {
        // 如果没有文件，隐藏表格
        if (this.param.tempFileList.length === 0) {
            $('.supplementpopup_table-ckwx').hide();
            $('.articleedit2').hide();
            $('.articleedit1').show();
            $('#ID-upload-demo-files-listup-ckwx').empty();
            $('#confirmcommonpopup').hide();
            return;
        }
        // 显示表格
        $('.supplementpopup_table-ckwx').show();
        var $list = $('#ID-upload-demo-files-listup-ckwx');
        $list.empty();  // 清空现有内容
        // 遍历临时列表，生成表格行
        this.param.tempFileList.forEach((file, index) => {
            // 获取文件类型名称（自有资料/参考文献原文）
            var typeName = this.param.fileTypeConfig[file.filetype].typeName;
            if (!file.is_use_content) {
                $('.purposefileTipNextstep').show();
            }
            let progressHtml = '';
            progressHtml = `
                <div style="width: 80%;margin: 0 auto;">
                    <span class="progress-num" style="font-size: .24rem;color: #666;">${file.uploadProgress}%</span>
                    <div style=" overflow: hidden;height: .1rem;background: #ccc;border-radius:  .2rem  ;position: relative">
                        <div class="progress-bar" style="width: ${file.uploadProgress}%;height: 100%;background: linear-gradient(90deg,#3476fe 0,#34cefe 100%);transition: width 0.3s ease;"></div>
                    </div>
                </div>
                <!-- 失败时显示重新上传按钮 -->
                <!--  ${file.uploadStatus === 'fail' ? `<button class="layui-btn layui-btn-xs reupload-btn" data-index="${index}" style="height: .4rem;line-height: 1; margin-left: .1rem;">重新上传</button>` : ''}-->
                ${file.uploadStatus === 'fail' ? `<div data-index="${index}" style="    color: #ff0000;">上传失败</div>` : ''}
            `;
            file.uploadStatus === 'fail' ? file.is_use_outline = 0 : ''
            file.uploadStatus === 'fail' ? file.is_use_content = 0 : ''

            if (typeof file.file_url != "undefined" || file.uploadStatus) { // 只要有上传状态就显示行
                $list.append(`
                <tr id="upload-${index}" file_type="${file.filetype}" file_name="${file.name}" file_path="${file.file_url || ''}">
                     <td class="filename" style="width: 30%;">
                         <div style="margin-top: .1rem;float: left;background: #DFE5EF;border-radius: .2rem;width: .35rem;height: .35rem;font-size: .22rem;line-height: .35rem;color: #333333;margin-left: .05rem;">${index + 1}</div>
                        <span title="${file.name}" style="max-width: 1.6rem;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">
                            ${file.name}
                        </span>
                    </td>
                    <td style="width: 30%;">${progressHtml}</td>
                    <td style="width: 40%;">
                      <div class="cnoutlinetd" style="display: flex;align-items: center;justify-content: center;">
                        <label class="switch">
                            <input type="checkbox"  ${file.is_use_outline == 1 ? "checked" : ''} >
                            <span class="switch_slider"> </span>
                        </label>
                        </div>
                     <div class="cnomaintd"  style="display: flex;align-items: center;justify-content: center;">
                       <label class="switch">
                            <input type="checkbox" ${file.is_use_content == 1 ? "checked" : ''} >
                            <span class="switch_slider"></span>
                        </label>
                        </div>
                        <button class="layui-btn layui-btn-xs layui-btn-danger doc-demo-delete-ckwx"  style="height: .5rem;line-height: .4rem;width: 1rem;  margin: 0.1rem 0;"
                                data-index="${index}">删除</button>
                    </td>
                </tr>
            `);
            }
        });
        $('#confirmcommonpopup').show();
        $(`.${this.param.popClass}confirm`).show();
        console.log(this.param.tempFileList);

    }

    // 更新数量统计和上传按钮状态
    this.updateCountsAndState = function (forceRefresh = false) {
        var selfCount = 0;
        // 统计各类型文件数量
        $("#ID-upload-demo-files-listup-ckwx tr").each(function () {
            var file_url = $(this).attr("file_path")
            if (1 == Number($(this).attr("file_type")) && typeof file_url != "undefined" && file_url && file_url != "undefined") {
                selfCount++;
            }
        });
        // 按钮上方文件赋值
        $('.selfnumt').text(selfCount);
        $('.supplementpopupsumself1').toggle(selfCount > 0);
        $('.ckwxUpload1confirm').toggle(selfCount > 0);
        $('.addFilesTips').toggle(selfCount > 0);
        const hasFalseItem = this.param.tempFileList.some(item => item.is_use_content === 0);
        $('.purposefileTipNextstep').toggle(hasFalseItem);

        // 计算当前类型已上传数量和是否达上限 达上线禁用上传按钮
        var currentCount = this.getFilesByType(this.param.currentFileType).length;
        var isLimitReached = selfCount >= this.param.fileTypeConfig[this.param.currentFileType].maxCount;


        // 强制刷新禁用层状态
        if (forceRefresh) {
            $('.supplementpopup_filedisabled').hide();
        }
        // 根据是否达上限显示/隐藏禁用层
        $('.supplementpopup_filedisabled').toggle(isLimitReached);

    }

    // 筛选指定类型的文件列表
    this.getFilesByType = function (type) {
        return this.param.tempFileList.filter(file => file.filetype === type);
    }
    this.getFilesByTypeInSavedFile = function (type) {
        return this.param.savedFileList.filter(file => file.filetype === type);
    }
    //克隆文件列表（深拷贝）
    this.cloneFileList = function (list) {
        if (typeof list != "undefined" && list && list.length > 0) {
            return list.map(file => ({
                name: file.name,
                size: file.size,
                lastModified: file.lastModified,
                filetype: file.filetype,
                file_url: file.file_url,
                is_use_outline: file.is_use_outline,  // 大纲
                is_use_content: file.is_use_content, // 正文
                uploadIndex: file.uploadIndex, // 上传索引
                uploadStatus: file.uploadStatus, // 上传状态
                uploadProgress: file.uploadProgress, // 上传进度
                fileObj: file.fileObj //保留原始文件对象
            }));
        }
        return [];
    }

    // 绑定事件
    this.bindEvent = function () {
        var that = this;
        var $ = layui.jquery || $;
        // 绑定文件删除事件(点击删除按钮时从临时列表中移除文件)
        $('.' + this.param.popClass).on('click', '.doc-demo-delete-ckwx', (e) => {
            e.stopPropagation(); // 防止事件冒泡
            // 获取要删除的文件索引
            var index = parseInt($(e.currentTarget).data('index'));
            // 验证索引有效性
            if (isNaN(index) || index < 0 || index >= this.param.tempFileList.length) return;

            // 从临时列表中删除对应文件
            this.param.tempFileList.splice(index, 1);
            // 重新渲染文件列表
            this.renderFileList();
            // 更新数量统计和按钮状态
            this.updateCountsAndState();
        });

        //重新上传事件
        $('.' + this.param.popClass).on('click', '.reupload-btn', function (e) {
            e.stopPropagation();
            var index = parseInt($(this).data('index'));
            if (isNaN(index) || index < 0 || index >= that.param.tempFileList.length) return;

            // 获取当前失败的文件对象
            var fileItem = that.param.tempFileList[index];
            if (!fileItem || !fileItem.fileObj) {
                layui.layer.msg("重新上传失败：文件对象不存在");
                return;
            }

            // 校验文件格式
            if (!that.checkFileFormat(fileItem.fileObj)) {
                layui.layer.msg(`重新上传失败：文件【${fileItem.name}】格式不支持，仅支持${that.param.fileTypeConfig[1].allowExts.replace(/\|/g, '、')}格式`);
                return;
            }

            // 检查文件大小
            if (fileItem.fileObj.size > that.param.fileTypeConfig[1].maxSize) {
                layui.layer.msg(`文件【${fileItem.name}】大小超过${Number(that.param.fileTypeConfig[1].maxSize / (1024 * 1024))}MB，无法上传！`);
                return;
            }

            // 重置当前文件的状态
            fileItem.uploadStatus = 'uploading';
            fileItem.uploadProgress = 0;
            fileItem.file_url = null;
            that.renderFileList();

            //使用FormData直接发起上传请求
            var formData = new FormData();
            formData.append('file', fileItem.fileObj);

            // 显示进度条
            $(`#upload-${index} .progress-bar`).css('width', '0%');
            $(`#upload-${index} .progress-num`).text('0%');

            // 发起AJAX上传
            $.ajax({
                url: url + '/ai/uploadFile.html',
                type: 'post',
                data: formData,
                processData: false,
                contentType: false,
                xhr: function () {
                    var xhr = new XMLHttpRequest();
                    // 监听上传进度
                    xhr.upload.addEventListener('progress', function (e) {
                        if (e.lengthComputable) {
                            var percent = Math.round((e.loaded / e.total) * 100);
                            fileItem.uploadProgress = percent;
                            $(`#upload-${index} .progress-bar`).css('width', percent + '%');
                            $(`#upload-${index} .progress-num`).text(percent + '%');
                        }
                    }, false);
                    return xhr;
                },
                success: function (res) {
                    var res = JSON.parse(res);
                    if (res.status == 1 && res.data && res.data.file_path) {
                        fileItem.file_url = res.data.file_path;
                        fileItem.uploadStatus = 'success';
                        fileItem.uploadProgress = 100;
                        $(`#upload-${index} .progress-bar`).css('width', '100%');
                        $(`#upload-${index} .progress-num`).text('100%');
                        // 移除重新上传按钮
                        $(`#upload-${index} .reupload-btn`).remove();
                        layui.layer.msg("重新上传成功！");
                    } else {
                        fileItem.uploadStatus = 'fail';
                        fileItem.uploadProgress = 0;
                        $(`#upload-${index} .progress-bar`).css('width', '0%');
                        $(`#upload-${index} .progress-num`).text('0%');
                        layui.layer.msg("重新上传失败：" + (res.msg || '接口返回错误'));
                    }
                    that.renderFileList();
                    that.updateCountsAndState();
                },
                error: function (xhr, status, error) {
                    fileItem.uploadStatus = 'fail';
                    fileItem.uploadProgress = 0;
                    $(`#upload-${index} .progress-bar`).css('width', '0%');
                    $(`#upload-${index} .progress-num`).text('0%');
                    that.renderFileList();
                    layui.layer.msg("重新上传失败：网络错误或服务器异常 " + error);
                }
            });
        });

        $('.' + this.param.popClass).on('click', '.' + this.param.popClass + 'confirm', () => {
            this.commitFunction();
        });
        $('.' + this.param.popClass).on('click', '.' + this.param.popClass + 'close', () => {
            this.closePop();
        });
        // 是否参与生成大纲
        $('.' + this.param.popClass).on('click', '.cnoutlinetd input', (e) => {
            var ische = $(e.currentTarget).prop('checked');
            const $tr = $(e.currentTarget).closest('tr');
            const trindex = $tr.index();
            this.param.tempFileList[trindex].is_use_outline = ische ? 1 : 0;

            if (ische) {
                $(e.currentTarget).parent().siblings('.switch_label').text('参与');
            } else {
                $(e.currentTarget).parent().siblings('.switch_label').text('不参与');
            }

        })

        // 是否参与生成正文
        $('.' + this.param.popClass).on('click', '.cnomaintd input', (e) => {
            var ische = $(e.target).prop('checked');
            var allchelem = $('.cnomaintd input');
            const $tr = $(e.currentTarget).closest('tr');
            const trindex = $tr.index();
            this.param.tempFileList[trindex].is_use_content = ($(e.target).prop('checked')) ? 1 : 0;

            var ischelen = allchelem.filter(':checked').length == allchelem.length;
            if (ische) {
                $(e.target).parent().siblings('.switch_label').text('参与');
            } else {
                $(e.target).parent().siblings('.switch_label').text('不参与');
            }
            if (ischelen) {
                $('.purposefileTipNextstep').hide();
            } else {
                $('.purposefileTipNextstep').show();
            }
        })
    }

    this.getResult = function () {
        return this.param.savedFileList;
    }

    this.getFormatResult = function () {
        var savedFileList = this.param.savedFileList;
        if (typeof savedFileList != "undefined" && savedFileList && savedFileList.length > 0) {
            return savedFileList.map(file => ({
                file_url: file.file_url,
                size: file.size,
                file_name: file.name,
                is_use_outline: file.is_use_outline,  // 大纲
                is_use_content: file.is_use_content, // 正文
                content: ""
            }));
        }
        return [];
    }
}


function commonPopUpNew(popClass, popTitle, popContent, cancelShow, commitShow, confirmFunction, cancelFunction, isNesting, isHide) {
    if (typeof isNesting == "undefined" || null == isNesting || !isNesting) {
        $('.existingLiterature').remove();
    }
    if (typeof popClass == "undefined" || null == popClass || !popClass) {
        popClass = "";
    }
    if (typeof confirmFunction == "undefined" || !confirmFunction) {
        confirmFunction = "noneFunction";
    }
    if (typeof cancelFunction == "undefined" || !cancelFunction) {
        cancelFunction = "noneFunction";
    }
    var showOrHideStyle = "display:block"
    if (typeof isHide != "undefined" && isHide) {
        showOrHideStyle = "display:none";
    }
    var popupcontent =
        '<div id="kkwxuploadpopOnly">' +
        '<div class="existingLiterature existingLiteraturesty ' + popClass + '" style="' + showOrHideStyle + '">' +
        '<div class="existingLiteratureall">' +
        '<div class="title">' +
        '<p class="titcon">' + popTitle + '</p>' +
        '<b class="closepopup ' + popClass + 'close"  onclick="' + cancelFunction + '()"></b> </div>' +
        '<div class="existingLiteraturecon" >' + popContent + ' </div>' +
        '<div class="bottom">' +
        '<button class="closepopupbtn ' + popClass + 'cancel">取消</button>' +
        '<button class="confirmpopupbtn ' + popClass + 'confirm">保存</button></div></div></div>' +
        '</div>';
    $('body').append(popupcontent);

    if (typeof cancelShow != "undefined" && cancelShow) {
        $('.closepopupbtn').show();
    }
    if (typeof commitShow != "undefined" && commitShow) {
        $('.confirmpopupbtn').show();
    }
}




















