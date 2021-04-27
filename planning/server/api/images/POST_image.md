# Create image
@desc POST single image

@route /api/images

@access Protected -- API key, require user login

Example request: POST /api/images?key=<API_KEY>

# EXAMPLE REQUEST BODY
```
{
  "image": "<file>",
  "caption": "lavender in a big field"
}
```

`<file>` represent file input

The image file must have key name "image"

# SUCCESS RESPONSE BODY
```
{
  "_id": "607e399e59c8feg7e2af65r7",
  "image_url": "s3.aws.indigenousplantgo.com/images/lavender-1",
  "caption": "lavender in a big field"
}
```

