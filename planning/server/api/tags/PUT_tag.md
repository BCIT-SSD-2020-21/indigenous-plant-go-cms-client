# Update tag
@desc PUT single tag
@route /api/tags/:id
@access Protected -- API key, require user login

Example request: PUT /api/tags/607e399e59c8feg7e2af65r7?key=<API_KEY>

# EXAMPLE REQUEST BODY
```
{
  "tag_name": "Event"
}
```

# SUCCESS RESPONSE BODY
```
"Tag updated"
```