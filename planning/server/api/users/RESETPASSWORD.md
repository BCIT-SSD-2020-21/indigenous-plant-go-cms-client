# Reset password
@desc Reset the password of an email

@route /api/users/reset_password

Example request: POST /api/users/reset_password

# EXAMPLE REQUEST BODY
```
{
  "email": "test@test.com"
}
```
  
# SUCCESS RESPONSE BODY
```
"Email sent"
```