"use strict"

const http = require("http");
const fs = require("fs");

const index_html = fs.readFileSync("./index.html", "utf8")
const index_javascript = fs.readFileSync("./dist/build.js", "utf8")

const server = http.createServer((request, response) => {
    if (request.url === "/dist/build.js") {
        response.writeHead(200, { "Content-Type": "application/javascript" })
        response.write(index_javascript)
    } else {
        response.writeHead(200, { "Content-Type": "text/html" })
        response.write(index_html)
    }

    response.end()
})

server.listen(8082, "0.0.0.0", () => {
    console.log("Server started listening on 8082")
})
