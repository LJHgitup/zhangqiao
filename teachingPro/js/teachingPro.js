function teachingPro(params){
    this.params = {
        container: null,
    }

    // 事件
    this.init = ()=> {
        this.params = {...params};
        if (!this.params.container) {
            return;
        }
        this.createHtml();
    }

    // 弹窗HTML结构
    this.createHtml = ()=> {
        $(this.params.container).empty();

        let html = `
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
            </div>
        `
        $(this.params.container).append(html);
    }

    this.init();
}