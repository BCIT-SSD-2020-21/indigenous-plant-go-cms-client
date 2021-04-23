# Get tags
@desc GET all tags
@route /api/tags
@access Protected -- API key

Example request: GET /api/tags?key=<API_KEY>

# EXAMPLE RESPONSE BODY
```
[
  {
    "_id": "607e399e59c86677e2af6587",
    "tag_name": "Event"
  },
  {
    "_id": "607e399e59c86677e2asda77",
    "tag_name": "Community Outreach"
  },
  {
    "_id": "607e399e59c86677s72sda77",
    "tag_name": "Students"
  }
  // ... Repeat
]
```