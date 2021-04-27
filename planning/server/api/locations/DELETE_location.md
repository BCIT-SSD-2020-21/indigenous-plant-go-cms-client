# Delete location
@desc DELETE single location

@route /api/locations/:id

@access Protected -- API key, require user login

Example request: DELETE /api/locations/607e399e59c8feg7e2af65r7?key=<API_KEY>

# SUCCESS RESPONSE BODY
```
"Location deleted"
```

