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

Audio and caption are both required
- Returns "Missing audio file" or "Missing caption" if missing the field

If audio is not a file type it will just return "Missing audio file"

Caption must be a string
- Returns "Invalid input for caption" otherwise

# SUCCESS RESPONSE BODY
```
{
  "_id": "607e399459c86677e83n65r7",
  "audio_file_url": "s3.aws.indigenousplantgo.com/audio/roses-speech.mp3",
  "caption": "A speech about roses"
}
```

