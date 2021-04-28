# Update tour
@desc PUT single tour

@route /api/tours/:id

@access Protected -- require user login

Example request: PUT /api/tours/607e399e59c8feg7e2af65r7

# EXAMPLE REQUEST BODY
```
{
  "tour_name": "test",
  "description": "test",
  "images": ["607fa01931325a2e700a4307"],
  "audio_files": ["607fa01931325a2e700a4307"],
  "videos": ["607fa01931325a2e700a4307"],
  "tags": ["607fa01931325a2e700a4307", "607fa01931325a2e700a4307"],
  "categories": ["607fa01931325a2e700a4307"],
  "plants": ["607fa01931325a2e700a4307"],
  "waypoints": ["607fa01931325a2e700a4307"],
  "custom_fields": "custom_fields": [
    {
      custom_field_id: "607e399e59c86677e2af65r7",
      field_title: "Medical",
      content: "Use in medical"
    }
  ]
}
```

We set it to overwrite existing data

New revision is added on whenever update is made

# SUCCESS RESPONSE BODY
```
"Tour updated"
```