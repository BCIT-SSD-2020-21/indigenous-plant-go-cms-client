# Get image
@desc GET single image
@route /api/images/:id
@access Protected -- API key

Example request: GET /api/images/607e399e59c8feg7e2af65r7?key=<API_KEY>

# EXAMPLE RESPONSE BODY
```
{
  "_id": "607e399e59c8feg7e2af65r7",
  "image_url": "s3.aws.indigenousplantgo.com/images/lavender-1",
  "caption": "lavender in a big field"
}
```