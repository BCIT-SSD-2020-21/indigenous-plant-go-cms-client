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

Tag_name is required
- Returns "Require a tag name" otherwise

Tag_name must be a string
- Returns "Tag_name field must take a string" otherwise

# SUCCESS RESPONSE BODY
```
{
  "_id": "607e399e59c86677e2af6587",
  "tag_name": "Event"
}
```