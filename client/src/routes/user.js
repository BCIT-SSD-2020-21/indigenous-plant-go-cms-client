router.post(
    '/', 
    userController.validate('createUser'), 
    userController.createUser,
  )