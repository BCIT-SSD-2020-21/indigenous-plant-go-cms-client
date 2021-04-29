# Get users
@desc GET all users

@route /api/users

@access Protected -- API key

Example request: GET /api/users?key=<API_KEY>

# EXAMPLE RESPONSE BODY
```
[
  {
    "_id": "608a2493ec961b39ec741b0a",
    "email": "bob@test.ca",
    "user_name": "bob",
    "role": "Admin"
  }, 
  {
    "_id": "608a2493ec961b39ec741b0b",
    "email": "charli@test.ca",
    "user_name": "charli",
    "role": "Manager"
  }
]
```