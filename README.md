# NSFWJS Avatar Service

A super simple service that checks the avatar for explicit images using the awesome [nsfwjs library](https://github.com/infinitered/nsfwjs)  
It is designed to be used hand-in-hand with [Logto Account Dashboard](https://github.com/t2vee/Logto-Account-Dashboard)

## minimum requirments
Unfortunately due to the sheer size of tensorflow and the model itself.  
This applciation **wont** run on mini systems, so anything LESS than 1vcpu and **2gb** of ram

## install
You can isntall this app via docker and (unfortunately) only by docker as the moment  
1. start by cloning this repository:
```
$ git clone https://github.com/t2vee/nsfwjs-avatar-service
```
2. configure variables in the .env.sample
3. start the service with docker compose:
```
$ docker compose up -d --build
```
4. expose container with a reverse proxy

here is a nginx example:
```
server {
    listen 80;
    server_name check.yourdoma.in;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name check.yourdoma.in;

    ssl_certificate     /path/to/your/ssl.pem;
    ssl_certificate_key /path/to/your/ssl.key;

    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_pass http://127.0.0.1:3005;
        proxy_redirect off;
    }
}
```
