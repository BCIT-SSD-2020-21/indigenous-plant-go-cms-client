# Create video
@desc POST single video

@route /api/videos

@access Protected -- API key, require user login

Example request: POST /api/videos?key=<API_KEY>

# EXAMPLE REQUEST BODY
```
{
  "video_url": "https://www.youtube.com/watch?v=-vJ0NMOH2vA&ab_channel=vivivivivi",
  "caption": "lavender in a big field"
}
```

Video_url and caption are both required
- Returns "Missing video" or "Missing caption" if missing the field

Video_url and caption must be a string
- Returns "Video_url field must take a string" or "Caption field must take a string" otherwise

Video_url takes a youtube video
- Returns "Video url not formatted correctly" if not a valid youtube link

# SUCCESS RESPONSE BODY
```
{
  "_id": "607e384559c86677e2af65r7",
  "video_url": "https://www.youtube.com/watch?v=-vJ0NMOH2vA&ab_channel=vivivivivi",,
  "caption": "A lavender flower blooming timelapse"
}
```