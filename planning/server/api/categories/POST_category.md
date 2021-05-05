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

Category_name and resource is required
- Returns "Require a category name" or "Require a resource" otherwise

Category_name and resource must be a string
- Returns "Category_name field must take a string" or "Resource field must take a string" otherwise

Resource must be either plant, waypoint, tour, or learn_more
- Returns "Invalid resource, resource must be plant, waypoint, tour, or learn_more" otherwise

# SUCCESS RESPONSE BODY
```
{
  "_id": "607e399e59c86677e2af6587",
  "category_name": "Event",
  "resource": "plant"
}
```