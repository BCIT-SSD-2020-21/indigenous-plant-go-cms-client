# Login user
@desc POST single user login information (Login)
@route /api/users/login

Example request: POST /api/users/login

# EXAMPLE REQUEST BODY
```
{
  "username": "test",
  "password": "<encrypted>"
}
```

For the username input you can also put the email like such:
```
{
  "username": "test@email.com",
  "password": "<encrypted>"
}
```
  
# EXAMPLE RESPONSE BODY
```
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgxYzJkZDFkMDgzNzM4ZjQ0NTg4NjIiLCJlbWFpbCI6InRlc3QyQGVtYWlsLmNvbSIsInVzZXJuYW1lIjoidGVzdDIiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2MTkxMjc1NjQsImV4cCI6MTAwMTYxOTEyNzU2NH0.ACW4x2FQie1e_gj76PVkuYryMTCKpRwxWjbD-Ri1f8E",
  "user": {
      "_id": "6081c2dd1d083738f4458862",
      "email": "test@email.com",
      "username": "test",
      "role": "Admin"
  }
}
```