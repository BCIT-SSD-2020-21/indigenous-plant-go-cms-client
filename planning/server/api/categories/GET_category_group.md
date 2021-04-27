# Get category group
@desc GET single category

@route /api/categories/group/:group

@access Protected -- API key

Example request: GET /api/categories/group/plant?key=<API_KEY>

# EXAMPLE RESPONSE BODY
```
[
  {
    "_id": "607e399e59c86677e2af6587",
    "category_name": "Event",
    "resource": "plant"
  }
  // ... Repeat
]
```
