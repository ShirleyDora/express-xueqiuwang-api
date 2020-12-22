let express = require('express');
let axios = require('axios');

let app = express()
//跨域
app.use((req,res,next)=>{
    res.append('Access-Control-Allow-Origin',"*")
    res.append('Access-Control-Allow-Content-Type',"*")
    next()
})
let options = {
    headers: {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
        "Host": "stock.xueqiu.com",
        "Origin": "https://xueqiu.com",
        "Pragma": "no-cache",
        "Referer": "https://xueqiu.com/",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        "Cookie": "device_id=24700f9f1986800ab4fcc880530dd0ed; s=du14on5xnv; xq_a_token=db48cfe87b71562f38e03269b22f459d974aa8ae; xqat=db48cfe87b71562f38e03269b22f459d974aa8ae; xq_r_token=500b4e3d30d8b8237cdcf62998edbf723842f73a; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOi0xLCJpc3MiOiJ1YyIsImV4cCI6MTYwNjk2MzA1MCwiY3RtIjoxNjA1MDc5NjgwOTc4LCJjaWQiOiJkOWQwbjRBWnVwIn0.WL4WBQ_8vG0BfzlJY3TRfaoSDU1vQK7fVAAcWOJ_sSxkS4VODP3RkKRk2meLBmfoc-Pwmql0suqpSilINHARycBuoHeuVK85UNDfPcgFQkZT6dMm6n8IKNJ8Me7FVLx_3x0M0zlaUAeDzelUQmw-zsHqWwwwJVJropDLpkbZnilW8Bijv_jsll_AkZ88PqeAEXl6NPq-sd8dmYKmYJ4wz84uIWcH6VIZgvLTBVLpFe1uQOkBfTE-dhNI0aPBzUkBcB7EM2KspfJ_kOsKM1X7JoTdj1DqtfjWWbauc6jNEINuBaYNrrKbS7E0HgzgidMW5RKMk_-Ur2U9ZabdLYiJQg; u=381605079699165; Hm_lvt_1db88642e346389874251b5a1eded6e3=1604652922,1604989183,1605079700; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1605079700"
    },
}

let options2 = {
    headers: {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
        "Host": "stock.xueqiu.com",
        "Origin": "https://xueqiu.com",
        "Pragma": "no-cache",
        "Referer": "https://xueqiu.com/",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        "Sec-Fetch-Dest": "empty",
        "Cookie": "device_id=24700f9f1986800ab4fcc880530dd0ed; s=du14on5xnv; xq_a_token=db48cfe87b71562f38e03269b22f459d974aa8ae; xqat=db48cfe87b71562f38e03269b22f459d974aa8ae; xq_r_token=500b4e3d30d8b8237cdcf62998edbf723842f73a; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOi0xLCJpc3MiOiJ1YyIsImV4cCI6MTYwNjk2MzA1MCwiY3RtIjoxNjA1MDc5NjgwOTc4LCJjaWQiOiJkOWQwbjRBWnVwIn0.WL4WBQ_8vG0BfzlJY3TRfaoSDU1vQK7fVAAcWOJ_sSxkS4VODP3RkKRk2meLBmfoc-Pwmql0suqpSilINHARycBuoHeuVK85UNDfPcgFQkZT6dMm6n8IKNJ8Me7FVLx_3x0M0zlaUAeDzelUQmw-zsHqWwwwJVJropDLpkbZnilW8Bijv_jsll_AkZ88PqeAEXl6NPq-sd8dmYKmYJ4wz84uIWcH6VIZgvLTBVLpFe1uQOkBfTE-dhNI0aPBzUkBcB7EM2KspfJ_kOsKM1X7JoTdj1DqtfjWWbauc6jNEINuBaYNrrKbS7E0HgzgidMW5RKMk_-Ur2U9ZabdLYiJQg; u=381605079699165; Hm_lvt_1db88642e346389874251b5a1eded6e3=1604652922,1604989183,1605079700; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1605079700"
    },
}

app.get('/',(req,res)=>{
    res.send('apiServer')
})

//指数数据
app.get('/api/index/quote',async (req,res)=>{
    let httpUrl = 'https://stock.xueqiu.com/v5/stock/batch/quote.json?symbol=SH000001,SZ399001,SZ399006,HKHSI,HKHSCEI,HKHSCCI,.DJI,.IXIC,.INX'
    let result;
    try {
        result = await axios.get(httpUrl,options);
    } catch (error) {
        console.log(error)
    }
    res.json(result.data);
})

//热股榜
app.get('/api/index/hotStock',async (req,res)=>{
    //10全球、12沪深、13港股、11美股
    
    let index = req.query.index?req.query.index:12;
    let httpUrl = `https://stock.xueqiu.com/v5/stock/hot_stock/list.json?size=8&_type=${index}&type=${index}`
    let result = await axios.get(httpUrl,options);
    res.json(result.data);
})

//股票新闻
app.get('/api/index/news',async (req,res)=>{
    //category:-1->推荐、6->7*24、 105->沪深 、115->科创板
    //console.log(req)
    let category = req.query.category?req.query.category:-1;
    let httpUrl = `https://xueqiu.com/v4/statuses/public_timeline_by_category.json?since_id=-1&max_id=-1&count=15&category=${category}`
    let result = await axios.get(httpUrl,options2);
    res.json(result.data);
})

//股票筛选的数据
app.get('/api/choose/tools', async (req,res)=>{
    //获取首页
    let httpUrl = 'https://xueqiu.com/hq/screener';
    let result = await axios.get(httpUrl)
    
    //设置正则
    let reg = /SNB.data.condition =(.*?);/igs

    //匹配内容
    let content = reg.exec(result.data)[1]
    res.send(content)
})



//获取股票
//关注人数：follow7d(本周新增关注人数) fellow(最热门)
//讨论条数：tweet tweet7d
//分享交易: deal7d
app.get('/api/choose/stocks',async (req,res)=>{
    //console.log(req.query)
    let order_by = req.query.order_by?req.query.order_by:'follow7d';
    let page = req.query.page?req.query.page:1;
    let time = new Date().getTime()
    let order = req.query.order?req.query.order:'desc';
    let httpUrl = `https://xueqiu.com/service/screener/screen?category=CN&size=10&order=${order}&order_by=${order_by}&only_count=0&page=${page}&_=${time}`
    let result = await axios.get(httpUrl);
    res.json(result.data)
})

app.get('/api/choose/industries',async (req,res)=>{
    let time = new Date().getTime()
    let httpUrl = `https://xueqiu.com/service/screener/industries?category=CN&_=${time}`;
    let result = await axios.get(httpUrl);
    res.json(result.data)

})
app.get('/api/choose/areas',async (req,res)=>{
    let time = new Date().getTime()
    let httpUrl = `https://xueqiu.com/service/screener/areas?_=${time}`;
    let result = await axios.get(httpUrl);
    res.json(result.data)

})
//字段的最大最小值
app.get('/api/choose/range',async (req,res)=>{
    let time = new Date().getTime()
    let field = req.query.field?req.query.field:"psf.20191231"
    let httpUrl = `https://xueqiu.com/service/screener/values?category=CN&field=${field}&_=${time}`;
    let result = await axios.get(httpUrl);
    res.json(result.data)
})


app.get('/api/choose/sxStock',async (req,res)=>{
    let time = new Date().getTime()
    let httpUrl = `https://xueqiu.com/service/screener/screen`;
    let result = await axios.get(httpUrl,{params:req.query});
    res.json(result.data)

})


app.listen(8080,()=>{
    console.log('server start:','http://localhost:8080')
})