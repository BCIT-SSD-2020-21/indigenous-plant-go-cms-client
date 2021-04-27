# Delete video
@desc DELETE single video

@route /api/videos/:id

@access Protected -- API key, require user login

Example request: DELETE /api/videos/607e399e59c8feg7e2af65r7?key=<API_KEY>

# SUCCESS RESPONSE BODY
```
"Video deleted"
```