import exec  from "child_process";

var curl_exe = exec.execFile;

export async function request_curl(option,mycallback)
{
    var options = ['--fail','--include',"--insecure"];
    
    if(option.timeout){
        options.push('--connect-timeout');
        options.push(option.timeout);
    }
    if(option.method){
        options.push('--request');
        options.push(option.method);
    }
    if(options.proxy)
    {
        options.push('--proxy');
        options.push(options.proxy);
    }
    if(options.auth)
    {
        options.push('--proxy-user');
        options.push(options.auth);
    }
    if(option.headers)
    {
        for(let head in option.headers)
        {
            options.push("--header");
            options.push(head+" : "+option.headers[head]);
        }
    }
    if(option.url)
    {
            options.push(option.url);
        
    }
    if(option.data)
    {
        options.push("--data");
        var datas = "";
        if(option.data_type)
        {
            if(option.data_type == "json")
            {
                datas = JSON.stringify(option.data);
            }  
        }
        if(datas == ""){
            for(let params in option.data)
            {
                if(datas != "")
                datas += "&";
                datas += params+"="+option.data[params];
            }
        }
        options.push(datas);
    }
    if(option.formData)
    {
        for(let params in option.formData)
        {
            options.push("--form");
            options.push(params+"="+option.formData[params]);
        }
    }
    await curl_exe('curl', options, function(err, data) {
        var headers = {};
        var status  = "";
        var body = "";
        if(!err){
        headers = {};
        status  = data.split("\n")[0].split(' ')[1];
        body = "";
        var body_begin = false;
        for(var i = 1;i<data.split("\n").length;i++)
        {
            if(body_begin)
            {
                body = body+data.split("\n")[i]+"\n";
            }else if(data.split("\n")[i].length > 2 && !body_begin)
            {
                headers[data.split("\n")[i].split(':')[0]] = data.split("\n")[i].split(': ')[1].replace("\r","");
            }else if(data.split("\n")[i].length < 2 && !body_begin){
                body_begin = true;
            }
        }
        }
        mycallback(status,headers,body,err);
        return;
    });
}