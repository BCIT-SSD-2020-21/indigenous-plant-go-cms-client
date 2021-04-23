# Delete category
@desc DELETE single category
@route /api/categories/:id
@access Protected -- API key, require user login

Example request: DELETE /api/categories/607e399e59c8feg7e2af65r7?key=<API_KEY>

# SUCCESS RESPONSE BODY
```
"Category deleted"
```

