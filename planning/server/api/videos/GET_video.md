# Get video
@desc GET single video

@route /api/videos/:id

@access Protected -- API key

Example request: GET /api/videos/607e384559c86677e2af65r7?key=<API_KEY>

# EXAMPLE RESPONSE BODY
```
{
  "_id": "607e384559c86677e2af65r7",
  "video_url": "s3.aws.indigenousplantgo.com/video/lavender-bloom.mp4",
  "caption": "A lavender flower blooming timelapse"
}
```