# Create plant
@desc POST single plant

@route /api/plants

@access Protected -- API key, require user login

Example request: POST /api/plants?key=<API_KEY>

# EXAMPLE REQUEST BODY
```
{
  "plant_name": "Lavender",
  "scientific_name": "Lavandula",
  "description:": "Lavender is a perennial shrub with purple flowers that bloom during the summer.",
  "images": ["607e399e59c8feg7e2af65r7"],
  "audio_files": ["607e399459c86677e2af65r7"],
  "videos": ["607e384559c86677e2af65r7"],
  "tags": ["607e4qwee59c86677e2af65r7", "607e384559c86677e2af65r7],
  "categories": ["607e4qwee59c86677e2ewe3447"],
  "location": ["607e3ab0a0d3df815abfcfb1"],
  "custom_fields": ["607e399e59c86677e2af65r7", "607e399e59c86677e465r7"]
}
```

If an array field is not provided it will default to empty array

On create, a new revision will be set base on the user creating the plant

# SUCCESS RESPONSE BODY
```
"Plant added"
```