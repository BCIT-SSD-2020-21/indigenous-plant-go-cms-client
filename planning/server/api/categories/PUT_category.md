# Update category
@desc PUT single category
@route /api/categories/:id
@access Protected -- API key, require user login

Example request: PUT /api/categories/607e399e59c8feg7e2af65r7?key=<API_KEY>

# EXAMPLE REQUEST BODY
```
{
  "category_name": "Event"
}
```

# SUCCESS RESPONSE BODY
```
"Category updated"
```