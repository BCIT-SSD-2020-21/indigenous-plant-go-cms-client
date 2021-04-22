# Create category
@desc POST single category
@route /api/categories
@access Protected -- API key, require user login

Example request: POST /api/categories?key=<API_KEY>

# EXAMPLE REQUEST BODY
```
{
  "category_name": "Event"
}
```

# SUCCESS RESPONSE BODY
```
"Category added"
```