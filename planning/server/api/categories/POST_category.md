# Create category
@desc POST single category

@route /api/categories

@access Protected -- API key, require user login

Example request: POST /api/categories?key=<API_KEY>

# EXAMPLE REQUEST BODY
```
{
  "category_name": "Event",
  "resource": "plant"
}
```

Resource field is provided by the frontend depending on where the category is created under

# SUCCESS RESPONSE BODY
```
"Category added"
```