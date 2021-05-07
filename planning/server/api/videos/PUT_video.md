# Update video
@desc PUT single video

@route /api/videos/:id

@access Protected -- API key, require user login

Example request: PUT /api/videos/607e399e59c8feg7e2af65r7?key=<API_KEY>

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

If you don't provide a field that field will just remain as the old value

# SUCCESS RESPONSE BODY
```
"Video updated"
```