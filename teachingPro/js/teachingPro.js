function teachingPro(params){
    this.params = {
        showPopType: '',
    }

    // 事件
    this.init = ()=> {
        this.params = {...params};
        if (!this.params.showPopType) {
            return;
        }
        this.createHtml(this.params.showPopType);
    }

    // 弹窗HTML结构
    this.createHtml = (type)=> {
        $('.addFileTeachingOnly').remove();
        $('.setLiteratureTeaching').remove();

        let html = ''
        if (type == 'addFileTeaching') {
            html = `
                <div class="addFileTeachingOnly">
                    <div class="addFileTeachingContent">
                        <div class="addFileTeachingClose" onclick="$('.addFileTeachingOnly').remove()"></div>
                        <div class="addFileTeachingTitle">
                            如何上传并教AI正确使用补充资料？
                        </div>
                        <div class="addFileTeachingDesc">
                            <div class="serialNum">1</div>
                            支持上传文件、数据、结论观点
                        </div>
                        <div class="addFileTeachingDesc">
                            <div class="serialNum" style="left: -0.39rem;">2</div>
                            可以设置数据资料生成指定的表格、图表
                        </div>
                        <div class="addFileTeachingItem">
                            ·&nbsp;为数据文件设置图表/表格&nbsp;·
                            <div class="addFileTeachingItemImg setTableOrChart"></div>
                        </div>
                        <div class="addFileTeachingItem">
                            ·&nbsp;自定义图表/表格要求&nbsp;·
                            <div class="addFileTeachingItemImg setTableOrChartReq"></div>
                        </div>
                    </div>
                </div>`
        } else {
            html = `
                <div class="setLiteratureTeaching">
                    <div class="setLiteratureContent">
                        <div class="setLiteratureClose" onclick="$('.setLiteratureTeaching').remove()"></div>
                        <div class="setLiteratureTitle">
                            如何设置参考文献？
                        </div>
                        <div class="setLiteratureDesc">
                            <div class="setLiteratureNum">1</div>
                            可选择掌桥文献或上传自有文献
                        </div>
                        <div class="setLiteratureDesc">
                            <div class="setLiteratureNum" style="left: -0.46rem">2</div>
                            掌桥文献支持获取原文
                        </div>
                        <div class="setLiteratureDesc" style="background: url(./img/desc2.png) no-repeat;background-size: 100% 100%;">
                            <div class="setLiteratureNum">3</div>
                            有文献原文，文献引用方式可设置直接引用
                        </div>
                        
                        <div class="literatureType">
                            <div class="literatureTypeTitle">
                                掌桥文献
                            </div>
                            <div class="childTitle">
                                ·&nbsp;系统帮我选文献&nbsp;·
                                <div class="childTitleImg childTitleImgSelt"></div>
                            </div>
                            
                            <div class="childTitle">
                                ·&nbsp;自己选文献&nbsp;·
                                <div class="childTitleImg childTitleImgNo"></div>
                            </div>
                        </div>
                        <div class="literatureType" style="margin-top: 0.4rem;">
                            <div class="literatureTypeTitle">
                                自有文献
                            </div>
                            <div class="childTitle">
                                ·&nbsp;上传自有文献&nbsp;·
                                <div class="childTitleImg uploadLiteImg"></div>
                            </div>
                        </div>
                        <div class="literatureTeachingText">以上任一模式下，都可以申请获取原文</div>
                    </div>
                </div>`
        }

        $('body').append(html);
    }

    this.init();
}