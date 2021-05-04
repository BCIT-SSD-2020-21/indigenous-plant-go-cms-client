# Update user
@desc PUT single user

@route /api/users/:id

@access Protected -- require user login

Example request: PUT /api/users/607e399e59c8feg7e2af65r7

# EXAMPLE REQUEST BODY
```
{
  "email": "test@email.com",
  "user_name": "test",
  "password": "test",
  "role": "Admin"
}
```

Email, user_name, password, role must be a string

Email must be formatted like a email

Role can only be Manager or Admin

Role can only be editted if the user that send this request is an Admin

# SUCCESS RESPONSE BODY
```
"User updated"
```