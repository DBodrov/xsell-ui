FROM nexus.isb/nginx:1.19.1-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY .docker/assets/nginx.conf /etc/nginx/conf.d/default.conf
COPY dist /usr/share/nginx/html
EXPOSE 80 443
CMD [ "nginx", "-g", "daemon off;" ]
