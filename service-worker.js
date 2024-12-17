self.addEventListener("install", (event) => {
  console.log("Service worker installed");
});

self.addEventListener("fetch", (event) => {
  console.log("Fetch request for:", event.request.url);
});
