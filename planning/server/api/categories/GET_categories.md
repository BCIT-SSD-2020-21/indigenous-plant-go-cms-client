# Get categories
@desc GET all categories
@route /api/categories
@access Protected -- API key

Example request: GET /api/categories?key=<API_KEY>

# EXAMPLE RESPONSE BODY
```
[
  {
    "_id": "607e399e59c86677e2af6587",
    "category_name": "Event"
  },
  {
    "_id": "607e399e59c86677e2asda77",
    "category_name": "Community Outreach"
  },
  {
    "_id": "607e399e59c86677s72sda77",
    "category_name": "Students"
  }
  // ... Repeat
]
```