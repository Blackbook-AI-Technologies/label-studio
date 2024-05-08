from users.models import User

email_list=[ # Add emails here to elevate users to staff
"jennafallon88@gmail.com",
"jenna.rieder@jefferson.edu",
"dmartini428@gmail.com",
"dfraser@blackbookdiary.com",
"awais@blackbookdairy.com",
"amine@allouah.com"
]

def update_users_to_staff():
    for email in email_list:
        print("Updating user to staff: ", email)
        user = User.objects.get(email=email)
        user.is_staff = True
        user.save()
        
update_users_to_staff()