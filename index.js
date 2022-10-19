import exec  from "child_process";
var curl_exe = exec.execFile;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function request_curl(option,mycallback)
{
    var options = ['--include',"--insecure"];
    if(option.timeout){
        options.push('--connect-timeout');
        options.push(option.timeout);
    }
    if(option.method){
        options.push('--request');
        options.push(option.method);
    }
    if(option.headers)
    {
        for(let head in option.headers)
        {
            options.push("--header");
            options.push(head+": "+option.headers[head]);
        }
    }
    if(option.data)
    {
        options.push("--data");
        options.push(option.data);
    }
    if(option.formData)
    {
        for(let params in option.formData)
        {
            options.push("--form");
            options.push(params+"="+option.formData[params]);
        }
    }
    if(option.proxy)
    {
        options.push('--proxy');
        options.push(option.proxy);
    }
    if(option.auth)
    {
        options.push('--proxy-user');
        options.push(option.auth);
    }
    if(option.url)
    {
            options.push(option.url);
    }
    var headers = {};
    var status  = null;
    var body = null;
    var error  = null;
    var isdone = false;
    curl_exe('curl.exe', options, function(err, data) {
        error = err;
        if(!err){
        status  = data.split("\n")[0].split(' ')[1];
        var body_begin = false;
        var i = 1;
        if(option.proxy)
        {
            i = 3;
            status  = data.split("\n")[2].split(' ')[1];
        }
        for(i;i<data.split("\n").length;i++)
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
        isdone = true;
    });
    while(!isdone)
    {
        await new Promise(resolve => setTimeout(resolve, 20));
    }
    return {status,headers,body,error};
}