
function aiAgent () {

	/*
	* 添加加载动画
	* element 要添加动画的父容器
	* type 是否有动画 input：无动画  其他：有动画
	* isCenter 动画是否居中显示 传入justify-content属性
	* customText 自定义提示文字  默认：内容生成中，请耐心等待
	* */
    this.commonLoadding=function(element,type,isCenter,customText){
    	 $(element).css('position','relative')

    	    if (!customText) {
    	        customText = '内容生成中，请耐心等待'
    	    }

    	    let animationStatus = 'bounce 1s ease-in-out infinite'
    	    // 设置动画
    	    if (type != 'input') {
    	        animationStatus = 'bounce 1s ease-in-out infinite'
    	    } else {
    	        animationStatus = 'none'
    	    }

    	    let imgDom = `
    	            <span class="commonloadingname" style="justify-content:${isCenter}">
    	            <img style="animation: ${animationStatus}" src="${zqcdn}/newimg/ai/journal/aijournalimg03.png" alt="">${customText}</span>
    	        `

    	    $(element).append(imgDom)
    } 

    
    
    this.closeCommonLoading=function (element) {
        $(element +' '+'.commonloadingname').hide()
    }

    

    // 公共函数
    this.commonParamBuild=function (product,functionStr,paramsJson,modelName,onDate){
     if(typeof product!="undefined"&&product&& typeof functionStr!="undefined"&&functionStr&& typeof paramsJson!="undefined"&&paramsJson&& typeof modelName!="undefined"&&modelName){
         var paramJson={};
         paramJson.type=100;
         paramJson.product=product;
         paramJson.function=functionStr;
         paramJson.paramJson=paramsJson;
         paramJson.model=modelName;
         if(typeof paramsJson=="object"){
             paramJson.paramJson=JSON.stringify(paramsJson);
         }
         this.streamRequest(paramJson,onDate);

     }
     return null;
   }
    
    
    
    
// 
//    this.streamRequest= async function(paramJson, onData) {
//        // 设置默认登录类型
//        if (!paramJson.loginType) {
//            paramJson.loginType = 1;
//        }
//
//        // 获取 token 的优先级：传入的 token > LocalStorage
//        let token =localStorage.getItem('Authorization');
//
//        // 准备请求头
//        const headers = {
//            'Content-Type': 'application/json',
//            ...(token && { 'Authorization': `Bearer ${token}` })
//        };
//
//        try {
//            // 发起POST请求
//            const response = await fetch(url+"/aiEditor/commonGeneration", {
//                method: 'POST',
//                headers: headers,
//                body: JSON.stringify(paramJson),
//            });
//
//            if (!response.ok||!response.body) {
//            	$("#pasteCopySubmit").removeClass("disabled");
//                tip("Ai生成失败！请稍后重试！")
//                onData('ERROR');
//                return;
//            }
//
//            // 获取响应流的读取器和解码器
//            const reader = response.body.getReader();
//            const decoder = new TextDecoder();
//            // 缓冲区用于存储不完整的数据
//            try {
//                // 循环读取数据直到完成
//            	   let buffer = '';
//                while (true) {
//                 
//                    // 读取下一个数据块
//                    const { done, value } = await reader.read();
//
//                    // 如果读取完成，跳出循环
//                    if (done) {
//                        // 处理缓冲区中剩余的数据
//                        if (buffer.trim()) {
//                            buffer=this.processBuffer(buffer, onData);
//                        }
//                        break;
//                    }
//
//                    // 解码当前数据块并添加到缓冲区
//                    const chunk = decoder.decode(value, { stream: true });
//                    buffer += chunk;
//
//                    // 处理缓冲区中的数据
//                    buffer=this.processBuffer(buffer, onData);
//
//                }
//            } finally {
//                reader.releaseLock();
//            }
//        } catch (error) {
//            tip("Ai生成失败！请稍后重试！");
//            onData('ERROR');
//        }
//    }
//
//    
//    /**
//     * 处理缓冲区中的数据，返回剩余未处理的数据
//     * @param {string} buffer - 缓冲区数据
//     * @param {Function} onData - 数据处理回调
//     * @param {number} timestamp - 时间戳
//     * @param {Object} paramJson - 请求参数
//     * @returns {string} 剩余未处理的数据
//     */
//    this.processBuffer=function(buffer, onData) {
//        // 按换行分割数据块（SSE格式通常是每行一个data:）
//        const lines = buffer.split('\n');
//        let remainingBuffer = '';
//        let hasCompleteData = false;
//
//        for (let i = 0; i < lines.length; i++) {
//            const line = lines[i].trim();
//
//            if (!line) continue;
//
//            // 处理 SSE 格式的数据（data: {...}）
//            if (line.startsWith('data:')) {
//                var jsonStr = line.substring(5).trim(); // 去掉 "data: " 前缀
//                if (jsonStr) {
//                    try {
//                        const chunkJson = eval('(' + jsonStr + ')');
//                        const shouldStop = this.handleParsedData(chunkJson, onData);
//
//                        if (shouldStop) {
//                            // 如果收到终止信号，停止处理后续数据
//                            return '';
//                        }
//                        this.hasCompleteData = true;
//                    } catch (e) {
//                        // 解析失败，可能是不完整的JSON，保留到下一次处理
//                        if (i == lines.length - 1) {
//                            remainingBuffer = line;
//                        }
//                    }
//                }
//            }
//            // 处理直接JSON格式的数据
//            else if (line.startsWith('{') && line.endsWith('}')) {
//                try {
//                    const chunkJson = JSON.parse(line);
//                    const shouldStop = this.handleParsedData(chunkJson, onData);
//                    if (shouldStop) {
//                        // 如果收到终止信号，停止处理后续数据
//                        return '';
//                    }
//                    this.hasCompleteData = true;
//                } catch (e) {
//                    // 解析失败，可能是不完整的JSON，保留到下一次处理
//                    if (i == lines.length - 1) {
//                        remainingBuffer = line;
//                    }
//                }
//            }
//
//        }
//
//        // 如果没有找到完整的数据且缓冲区有内容，保留整个缓冲区
//        if (!hasCompleteData && buffer.trim() && !remainingBuffer) {
//            remainingBuffer = buffer;
//        }
//
//        return remainingBuffer;
//    }
//
//    
//    
//    
//    /**
//     * 处理解析成功的数据
//     * @param {Object} chunkJson - 解析后的JSON数据
//     * @param {Function} onData - 数据处理回调
//     * @returns {boolean} 是否应该终止流
//     */
//    this.handleParsedData=function(chunkJson, onData) {
//        const text = chunkJson.content || chunkJson.data;
//        const event = chunkJson.event;
//        const params = chunkJson.params;
//
//        if (event == 'ERROR') {
//            // 使用原生方式显示错误消息
//            return true; // 返回true表示应该终止流
//        }
//
//        // 调用回调函数处理数据
//        if (onData && typeof onData == 'function') {
//            onData(event, text,params);
//        }
//
//        // 如果收到完成事件，返回true表示应该终止流
//        return event == "DONE" || event == "done";
//    }

    /**
     * 调用Agent
     * @param paramJson
     * @param onData
     * @returns {Promise<void>}
     */
    this.streamRequest= async function(paramJson, onData) {
        // 设置默认登录类型
        if (!paramJson.loginType) {
            paramJson.loginType = 1;
        }

        // 获取 token 的优先级：传入的 token > LocalStorage
        let token =localStorage.getItem('Authorization');


        // 准备请求头
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        };

        try {
            // 发起POST请求
            const response = await fetch(url+"/aiEditor/commonGeneration", {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(paramJson),
            });

            if (!response.ok||!response.body) {
                tip("Ai生成失败！请稍后重试！")
                return;
            }

            // 获取响应流的读取器和解码器
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            // 缓冲区用于存储不完整的数据
            try {
                // 循环读取数据直到完成
                let buffer = '';
                while (true) {
                    // 读取下一个数据块
                    const { done, value } = await reader.read();

                    // 如果读取完成，跳出循环
                    if (done) {
                        // 处理缓冲区中剩余的数据
                        if (buffer.trim()) {
                            buffer=this.processBuffer(buffer, onData);
                        }
                        break;
                    }

                    // 解码当前数据块并添加到缓冲区
                    const chunk = decoder.decode(value, { stream: true });
                    buffer += chunk;

                    // 处理缓冲区中的数据
                    buffer=this.processBuffer(buffer, onData);

                }
            } finally {
                reader.releaseLock();
            }
        } catch (error) {
            tip("Ai生成失败！请稍后重试！");
        }
    }


    /**
     * 处理缓冲区中的数据，返回剩余未处理的数据
     * @param {string} buffer - 缓冲区数据
     * @param {Function} onData - 数据处理回调
     * @param {number} timestamp - 时间戳
     * @param {Object} paramJson - 请求参数
     * @returns {string} 剩余未处理的数据
     */
    this.processBuffer=function(buffer, onData) {
        // 按换行分割数据块（SSE格式通常是每行一个data:）
        const lines = buffer.split('\n');
        let remainingBuffer = '';
        let hasCompleteData = false;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            if (!line) continue;

            // 处理 SSE 格式的数据（data: {...}）
            if (line.startsWith('data:')) {
                var jsonStr = line.substring(5).trim(); // 去掉 "data: " 前缀
                if (jsonStr) {
                    try {
                        const chunkJson = eval('(' + jsonStr + ')');
                        const shouldStop =  this.handleParsedData(chunkJson, onData);

                        if (shouldStop) {
                            // 如果收到终止信号，停止处理后续数据
                            return '';
                        }
                        hasCompleteData = true;
                    } catch (e) {
                        // 解析失败，可能是不完整的JSON，保留到下一次处理
                        if (i == lines.length - 1) {
                            remainingBuffer = line;
                        }
                    }
                }
            }
            // 处理直接JSON格式的数据
            else if (line.startsWith('{') && line.endsWith('}')) {
                try {
                    const chunkJson = JSON.parse(line);
                    const shouldStop = this.handleParsedData(chunkJson, onData);
                    if (shouldStop) {
                        // 如果收到终止信号，停止处理后续数据
                        return '';
                    }
                    hasCompleteData = true;
                } catch (e) {
                    // 解析失败，可能是不完整的JSON，保留到下一次处理
                    if (i == lines.length - 1) {
                        remainingBuffer = line;
                    }
                }
            }

        }

        // 如果没有找到完整的数据且缓冲区有内容，保留整个缓冲区
        if (!hasCompleteData && buffer.trim() && !remainingBuffer) {
            remainingBuffer = buffer;
        }

        return remainingBuffer;
    }

    /**
     * 处理解析成功的数据
     * @param {Object} chunkJson - 解析后的JSON数据
     * @param {Function} onData - 数据处理回调
     * @returns {boolean} 是否应该终止流
     */
    this.handleParsedData=function(chunkJson, onData) {
        const text = chunkJson.content || chunkJson.data;
        const event = chunkJson.event;
        const params = chunkJson.params;

        if (event == 'ERROR') {
            // 使用原生方式显示错误消息
            return true; // 返回true表示应该终止流
        }

        // 调用回调函数处理数据
        if (onData && typeof onData == 'function') {
            onData(event, text,params);
        }

        // 如果收到完成事件，返回true表示应该终止流
        return event == "DONE" || event == "done";
    }


}














