# Create tag
@desc POST single tag

@route /api/tags

@access Protected -- API key, require user login

Example request: POST /api/tags?key=<API_KEY>

# EXAMPLE REQUEST BODY
```
{
  "tag_name": "Event"
}
```

# SUCCESS RESPONSE BODY
```
"Tag added"
```