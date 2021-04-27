# Create revision
@desc POST single revision

@route /api/revisions

@access Protected -- API key, require user login

Example request: POST /api/revisions?key=<API_KEY>

You don't need a request body for this

User will be the currently log in one (get from token) and date is current date

# SUCCESS RESPONSE BODY
```
"Revision added"
```