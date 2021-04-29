# Update learn more
@desc PUT single learn more

@route /api/learn_mores/:id

@access Protected -- require user login

Example request: PUT /api/learn_mores/607e399e59c8feg7e2af65r7

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

We set it to overwrite existing data

New revision is added on whenever update is made

Custom field's _id must be an valid objectId string, meaning it is hexidecimal string of certain length

# SUCCESS RESPONSE BODY
```
"Learn more updated"
```