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

Category_name and resource must be a string
- Returns "Category_name field must take a string" or "Resource field must take a string" otherwise

Resource must be either plant, waypoint, tour, or learn_more
- Returns "Invalid resource, resource must be plant, waypoint, tour, or learn_more" otherwise

# SUCCESS RESPONSE BODY
```
"Category updated"
```