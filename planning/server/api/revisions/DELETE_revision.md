# Delete revision
@desc DELETE single revision

@route /api/revisions/:id

@access Protected -- API key, require user login

Example request: DELETE /api/revisions/607e399e59c8feg7e2af65r7?key=<API_KEY>

# SUCCESS RESPONSE BODY
```
"Revision deleted"
```