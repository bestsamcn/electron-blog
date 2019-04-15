const express = require('express');
const http = require('http');
const app = express();
const path = require('path');
const dir = path.join(process.cwd(), 'app', 'dist', 'renderer');

app.use('/', express.static(dir));
app.use((req, res)=>{
	res.sendFile(dir+'/index.html');
});

const server = http.createServer(app);

server.listen(4000);
server.on('listening', ()=>{
	console.log('端口：'+4000);
});

server.on('error', e=>{
	console.log(e, 'dddddd')
})