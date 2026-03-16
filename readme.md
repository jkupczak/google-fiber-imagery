# Image Detective

A simple browser-based tool that analyzes images and determines the most frequent color in each image. The page uses a small local Node.js server to bypass browser CORS restrictions so that pixel data can be read from external images.

## How It Works

Browsers normally prevent JavaScript from reading pixel data from images hosted on other domains unless the image server allows it with CORS headers.

This project solves that by using a **small local Node.js proxy server**. The process works like this:

1. The web page requests an image through the local server.
2. The local server downloads the image.
3. The server sends the image back to the browser with CORS enabled.
4. The browser can safely read the pixel data from a canvas.

## Project Files

This project only requires two files:

```
image-detective.html
server.js
```

* **image-detective.html** – The browser tool used to analyze images.
* **server.js** – A lightweight Node.js server that proxies image requests.

No external dependencies are required.

## Requirements

You must have **Node.js 18 or newer** installed.

You can check your version by running:

```
node -v
```

If the version is **18 or higher**, the tool will work.

## Running the Tool

1. Open a terminal.
2. Navigate to the folder containing the files.
3. Start the local server:

```
node server.js
```

You should see:

```
Server running at http://localhost:8080
```

4. Open your browser and go to:

```
http://localhost:8080/image-detective.html
```

## Using the Tool

1. Paste one or more image URLs into the textbox (one URL per line).
2. Click **Analyze Images**.
3. The tool will:

   * Download the images through the proxy
   * Analyze their pixel colors
   * Display the most frequent color and related metadata.

Results are also output as JSON and automatically copied to the clipboard.

## Important Notes

### Always open through the server

The page **must be opened through the local server**, like this:

```
http://localhost:8080/image-detective.html
```

Do **not** open the file directly from your computer, such as:

```
file:///Users/yourname/image-detective.html
```

Opening the file directly will break the image analysis due to browser security restrictions.

### Why a local server is required

The browser blocks pixel access when:

* The image is hosted on another domain
* The server does not allow CORS

The local proxy server solves this by fetching the image and returning it with the necessary permissions.

## Stopping the Server

To stop the server, press:

```
CTRL + C
```

in the terminal window running `node server.js`.
