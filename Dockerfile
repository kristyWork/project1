FROM  node:22-bookworm-slim
RUN apt-get update && apt-get install -y sqlite3 caddy
WORKDIR /app
COPY . .
ENV DB_NAME=desserts.db