# Get audios
@desc GET all audio files

@route /api/audios

@access Protected -- API key

Example request: GET /api/audios?key=<API_KEY>

# EXAMPLE RESPONSE BODY
```
[
  {
    "_id": "607e399459c86677e2af65r7",
    "audio_file_url": "s3.aws.indigenousplantgo.com/audio/lavender-speech.mp3",
    "caption": "A speech about lavender"
  },
  {
    "_id": "607e399459c86677e83n65r7",
    "audio_file_url": "s3.aws.indigenousplantgo.com/audio/roses-speech.mp3",
    "caption": "A speech about roses"
  }
  // ... Repeat
]
```