# Get revision
@desc GET single revision

@route /api/revisions/:id

@access Protected -- API key

Example request: GET /api/revisions/607e399e59c86677e2af6587?key=<API_KEY>

# EXAMPLE RESPONSE BODY
```
{
  "_id": "607e399e59c86677e2af6587",
  "user_id": "6081c2dd1d083738f4458862",
  "date": "1619121961798"
}
```