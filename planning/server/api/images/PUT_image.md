# Update image
@desc PUT single image
@route /api/images/:id
@access Protected -- API key, require user login

Example request: PUT /api/images/607e399e59c8feg7e2af65r7?key=<API_KEY>

# EXAMPLE REQUEST BODY
```
{
  "image": "<file>",
  "caption": "lavender in a big field"
}
```

<file> represent file input
The image file must have key name "image"
If you don't provide a field that field will just remain as the old value

# SUCCESS RESPONSE BODY
```
"Image updated"
```

