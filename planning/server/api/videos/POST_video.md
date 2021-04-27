# Create video
@desc POST single video

@route /api/videos

@access Protected -- API key, require user login

Example request: POST /api/videos?key=<API_KEY>

# EXAMPLE REQUEST BODY
```
{
  "video": "<file>",
  "caption": "lavender in a big field"
}
```

`<file>` represent file input

The video file must have key name "video"

# SUCCESS RESPONSE BODY
```
{
  "_id": "607e384559c86677e2af65r7",
  "video_url": "s3.aws.indigenousplantgo.com/video/lavender-bloom.mp4",
  "caption": "A lavender flower blooming timelapse"
}
```