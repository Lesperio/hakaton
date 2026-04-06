FROM nginx:1.27-alpine
RUN apk add --no-cache gettext
RUN mkdir -p /etc/crontabs \
  && printf '%s\n' '0 */12 * * * nginx -s reload' > /etc/crontabs/root \
  && chmod 600 /etc/crontabs/root
COPY templates/ /templates/
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
