function literatureTeaching(params){
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
                </div>
            </div>
        `
        $(this.params.container).append(html);
    }

    this.init();
}
