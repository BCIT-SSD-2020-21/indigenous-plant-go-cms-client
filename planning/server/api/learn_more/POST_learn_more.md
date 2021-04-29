# Create learn more
@desc POST single learn more

@route /api/learn mores

@access Protected -- API key, require user login

Example request: POST /api/learn_more?key=<API_KEY>

# EXAMPLE REQUEST BODY
```
{
  "learn_more_title": "Learn More",
  "description": "Lavender is a perennial shrub with purple flowers that bloom during the summer.",
  "images": ["607e399e59c8feg7e2af65r7"],
  "audio_files": ["607e399459c86677e2af65r7"],
  "videos": ["607e384559c86677e2af65r7"],
  "tags": ["607e4qwee59c86677e2af65r7", "607e384559c86677e2af65r7"],
  "categories": ["607e4qwee59c86677e2ewe3447"],
  "custom_fields": [
    {
      "_id": "607e399e59c86677e2af65r7",
      "field_title": "Medical",
      "content": "Use in medical"
    }
  ]
}
```

Learn_more_title, and description are required fields

If an array field is not provided it will default to empty array

On create, a new revision will be set base on the user creating the learn more

Custom field's _id must be an valid objectId string, meaning it is hexidecimal string of certain length

# SUCCESS RESPONSE BODY
```
"Learn more added"
```