SELECT profile.id, profile.image, users.id, users.image, users.email, users.username FROM profile
FULL JOIN users on(profile.id = users.id)
WHERE users.id = $1