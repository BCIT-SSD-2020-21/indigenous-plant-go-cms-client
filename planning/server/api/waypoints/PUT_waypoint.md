# Update waypoint
@desc PUT single waypoint

@route /api/waypoints/:id

@access Protected -- require user login

Example request: PUT /api/waypoints/607e399e59c8feg7e2af65r7

# EXAMPLE REQUEST BODY
```
{
  "waypoint_name": "test",
  "description": "test",
  "images": ["607fa01931325a2e700a4307"],
  "audio_files": ["607fa01931325a2e700a4307"],
  "videos": ["607fa01931325a2e700a4307"],
  "tags": ["607fa01931325a2e700a4307", "607fa01931325a2e700a4307"],
  "categories": ["607fa01931325a2e700a4307"],
  "location": "607fa01931325a2e700a4307",
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
"Waypoint updated"
```