# NSFWJS Avatar Service

A super simple service that checks the avatar for explicit images using the awesome [nsfwjs library](https://github.com/infinitered/nsfwjs)  
It is designed to be used hand-in-hand with [Logto Account Dashboard](https://github.com/t2vee/Logto-Account-Dashboard)

## minimum requirments
Unfortunately due to the sheer size of tensorflow and the model itself,  
This applciation **wont** run on mini systems, so anything LESS than 1vcpu and **2gb** of ram.  
The docker package itself is also rougly ~2.25GB which is quite large, make sure that you also have a decent amount of avaliable space

## install
You can isntall this app via docker and (unfortunately) only by docker as the moment  
1. start grabbing the docker-compose.yml:
```
$ curl -O -L https://github.com/t2vee/nsfwjs-avatar-service/raw/main/docker-compose.yml
```
2. configure variables under `environment` in the docker-compose.yml
3. start the service with docker compose:
```
$ docker compose up -d
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
