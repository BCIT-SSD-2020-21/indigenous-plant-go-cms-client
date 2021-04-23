# Update audio
@desc PUT single audio file (Update)
@route /api/audios/:id
@access Protected -- API key, require user login

Example request: PUT /api/audios/607e399e59c8feg7e2af65r7?key=<API_KEY>

# EXAMPLE REQUEST BODY
```
{
  "audio": "<file>",
  "caption": "lavender in a big field"
}
```

<file> represent file input
The audio file must have key name "audio"
If you don't provide a field that field will just remain as the old value

# SUCCESS RESPONSE BODY
```
"Audio file updated"
```

