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
{
  "_id": "607e399e59c86677e2af6587",
  "tag_name": "Event"
}
```