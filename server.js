import http from "http";
import fs from "fs";
import path from "path";
import { URL } from "url";

const PORT = 8080;

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  // Proxy endpoint
  if (url.pathname === "/image") {
    const target = url.searchParams.get("url");

    if (!target) {
      res.writeHead(400);
      res.end("Missing url parameter");
      return;
    }

    try {
      const response = await fetch(target);

      if (!response.ok) {
        res.writeHead(response.status);
        res.end("Failed to fetch image");
        return;
      }

      const buffer = Buffer.from(await response.arrayBuffer());

      res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": response.headers.get("content-type") || "image/png"
      });

      res.end(buffer);
    } catch (err) {
      console.error(err);
      res.writeHead(500);
      res.end("Proxy error");
    }

    return;
  }

  // Serve static files (index.html, etc.)
  let filePath = "." + (url.pathname === "/" ? "/index.html" : url.pathname);
  const ext = path.extname(filePath);

  const contentTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css"
  };

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end("File not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": contentTypes[ext] || "text/plain"
    });

    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});