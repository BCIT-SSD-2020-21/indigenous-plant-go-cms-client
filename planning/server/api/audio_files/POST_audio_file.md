# Create audio
@desc POST single audio file

@route /api/audios

@access Protected -- API key, require user login

Example request: POST /api/audios?key=<API_KEY>

# EXAMPLE REQUEST BODY
```
{
  "audio": "<file>",
  "caption": "A speech about roses"
}
```

`<file>` represent file input

The audio file must have key name "audio"

# SUCCESS RESPONSE BODY
```
{
  "_id": "607e399459c86677e83n65r7",
  "audio_file_url": "s3.aws.indigenousplantgo.com/audio/roses-speech.mp3",
  "caption": "A speech about roses"
}
```

