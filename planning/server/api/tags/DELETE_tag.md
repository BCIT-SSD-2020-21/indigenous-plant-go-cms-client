# Delete tag
@desc DELETE single tag

@route /api/tags/:id

@access Protected -- API key, require user login

Example request: DELETE /api/tags/607e399e59c8feg7e2af65r7?key=<API_KEY>

# SUCCESS RESPONSE BODY
```
"Tag deleted"
```
