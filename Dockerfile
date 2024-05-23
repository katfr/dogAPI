# puxa uma imagem base do node
FROM node

# indicando o diretorio que vai ser executado para executar a aplicação do nosso container
WORKDIR /app

# vamos copiar o arquivo package.json e package-lock.json (o * é para copiar os dois)
# podemos colocar /app ou .
COPY package*.json /app

# após copiar os arquivos json vai fazer o npm install, que vai instalar as dependencias do projeto
RUN npm install

# Faz a copia dos demais arquivos da aplicação
COPY . .

# expor a porta
EXPOSE 3000

# Rodar o comando que inicaliza a aplicação (que foi o que eu digitei no terminal para rodar essa aplicação)
CMD ["node", "app.js"]