
# request_curl - Simple request using CURL

request_curl permis de d'envoire des requests avec curl, utile pour les response 403 de cloudfront aussi.


## Installation

Install my-project with npm

```bash
  npm install request_curl
```
    
## Authors

- [@Fares ghegad](https://www.github.com/ghegad)


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Usage/Examples

# import request_curl

```js
import {request_curl} from "request_curl";
```

# affiche la reponse


```js
await request_curl(options,function(status,headers,body,err){console.log(body);});
```

# request GET

sans headers

```js
const options = {
    url: "https://example.com/",
    method: "GET"
};
```

avec headers

```js
const options = {
    url: "https://example.com/",
    method: "GET",
    headers:{
        "Host":"example.com"
    }
};
```

# request POST avec data

```js
const options = {
    url: "https://example.com/",
    method: "POST",
    data:{
        "key1":"1",
        "key2":"2"
    }
};
```

# request POST avec data

envoie des data normal

```js
const options = {
    url: "https://example.com/",
    method: "POST",
    data:{
        "key1":"1",
        "key2":"2"
    }
};
```
la request json data
```js
const options = {
    url: "https://example.com/",
    method: "POST",
    data_type:"json",
    data:{
        "key1":"1",
        "key2":"2"
    }
};
```

la request formData
```js
const options = {
    url: "https://example.com/",
    method: "POST",
    formData:{
        "key1":"1",
        "key2":"2"
    }
};
```

# proxy

```js
const options = {
    url: "https://example.com/",
    method: "GET",
    proxy : "http://127.0.0.1:8080",
    auth : "user:password"
};
```

