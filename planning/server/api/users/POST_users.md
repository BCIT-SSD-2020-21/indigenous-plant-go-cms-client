# Register user
@desc POST single user (Register)

@route /api/users

Example request: POST /api/users

# EXAMPLE REQUEST BODY
```
{
  "email": "test@email.com",
  "username": "test",
  "password": "test",
  "role": "Admin"
}
```

Role is default to Manager if no role is inputed

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