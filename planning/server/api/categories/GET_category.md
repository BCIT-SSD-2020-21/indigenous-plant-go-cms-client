# Get category
@desc GET single category

@route /api/categories/:id

@access Protected -- API key

Example request: GET /api/categories/607e399e59c86677e2af6587?key=<API_KEY>

# EXAMPLE RESPONSE BODY
```
{
  "_id": "607e399e59c86677e2af6587",
  "category_name": "Event",
  "resource": "plant"
}
```
