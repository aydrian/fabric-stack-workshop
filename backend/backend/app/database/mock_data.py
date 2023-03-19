from app.database.models import UserInDB

"""
Mock User Data
Password is "password1234" for each user.
"""
users: list[UserInDB] = [
    UserInDB(
        id="6586ea3c-fb97-4d7f-a3d5-1f5874a70f90",
        username="craig",
        full_name="Craig Cockroach",
        password_hash="$2b$12$kREeBl1JQVjqqeM9U898YOozGI2mtdPC9dBu.fnHyYfIDRvEl.XAG",
        is_admin=True,
    ),
    UserInDB(
        id="93028a33-8944-4b64-a169-82c1c2a743ca",
        username="spiderman",
        full_name="Peter Parker",
        password_hash="$2b$12$kREeBl1JQVjqqeM9U898YOozGI2mtdPC9dBu.fnHyYfIDRvEl.XAG",
        is_admin=False,
    ),
    UserInDB(
        id="b2e64909-6152-4de8-b8b5-661e76e37f15",
        username="antman",
        full_name="Scott Lang",
        password_hash="$2b$12$kREeBl1JQVjqqeM9U898YOozGI2mtdPC9dBu.fnHyYfIDRvEl.XAG",
        is_admin=False,
    ),
    UserInDB(
        id="5c1523f3-408f-4449-9abd-290a62192b5d",
        username="wiccan",
        full_name="Billy Kaplan",
        password_hash="$2b$12$kREeBl1JQVjqqeM9U898YOozGI2mtdPC9dBu.fnHyYfIDRvEl.XAG",
        is_admin=False,
    ),
    UserInDB(
        id="6486a77c-c8b0-4c1f-a808-0b53bf28181a",
        username="hulkling",
        full_name="Teddy Altman",
        password_hash="$2b$12$kREeBl1JQVjqqeM9U898YOozGI2mtdPC9dBu.fnHyYfIDRvEl.XAG",
        is_admin=False,
    ),
]
