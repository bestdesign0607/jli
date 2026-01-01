# # network/utils.py
# import random
# import string
# import uuid
# from collections import deque
# from .models import AmbassadorProfile
# from django.db import transaction

# def generate_referral_code(length=8):
#     chars = string.ascii_uppercase + string.digits
#     return ''.join(random.choice(chars) for _ in range(length))

# def make_unique_referral_code():
#     for _ in range(20):
#         code = generate_referral_code()
#         if not AmbassadorProfile.objects.filter(referral_code=code).exists():
#             return code
#     return uuid.uuid4().hex[:12].upper()

# def find_parent_for_new_ambassador(referrer_profile):
#     """
#     Return an AmbassadorProfile that has < 3 children and level < 10.
#     Preference: referrer -> BFS on referrer subtree -> None (company).
#     This function is safe to call inside a transaction (the caller should handle locking).
#     """
#     if not referrer_profile:
#         return None
#     if referrer_profile.children.count() < 3 and referrer_profile.level < 10:
#         return referrer_profile

#     q = deque([referrer_profile])
#     while q:
#         node = q.popleft()
#         # iterate children (oldest first)
#         for child in node.children.all().order_by('created_at'):
#             if child.children.count() < 3 and child.level < 10:
#                 return child
#             q.append(child)
#     return None

# def is_same_device(referrer_profile, buyer_device_fingerprint):
#     """
#     Return True if referrer has same device fingerprint as buyer OR if buyer fingerprint equals any ancestor fingerprint.
#     Helps detect same-device referrals to reduce fraud.
#     """
#     if not buyer_device_fingerprint:
#         return False
#     node = referrer_profile
#     while node:
#         if node.device_fingerprint and node.device_fingerprint == buyer_device_fingerprint:
#             return True
#         node = node.parent
#     return False











import random
import string
import uuid
from collections import deque
from .models import AmbassadorProfile


MAX_LEVEL = 10
MATRIX_WIDTH = 3

def generate_referral_code(length=8):
    chars = string.ascii_uppercase + string.digits
    return ''.join(random.choice(chars) for _ in range(length))

def make_unique_referral_code():
    for _ in range(20):
        code = generate_referral_code()
        if not AmbassadorProfile.objects.filter(referral_code=code).exists():
            return code
    return uuid.uuid4().hex[:12].upper()


def find_strict_matrix_parent(referrer_profile=None):
    """
    Find a parent for the new ambassador according to strict matrix rules:
    - Max 3 children per upline
    - Use BFS starting from referrer if provided
    - Fallback to level 0 roots if no referrer or referrer subtree full
    """
    # 1️⃣ Prefer referrer
    if referrer_profile:
        if referrer_profile.children.count() < MATRIX_WIDTH:
            return referrer_profile

        # BFS through referrer's subtree
        queue = deque(referrer_profile.children.all().order_by('created_at'))
        while queue:
            node = queue.popleft()
            if node.children.count() < MATRIX_WIDTH:
                return node
            queue.extend(node.children.all().order_by('created_at'))

    # 2️⃣ Fallback: BFS from level 0 roots
    roots = AmbassadorProfile.objects.filter(parent__isnull=True).order_by('created_at')
    if not roots.exists():
        return None  # first ambassador ever

    queue = deque(roots)
    while queue:
        node = queue.popleft()
        if node.children.count() < MATRIX_WIDTH:
            return node
        queue.extend(node.children.all().order_by('created_at'))

    # 3️⃣ If all full, just return first root as last resort
    return roots.first()




def is_same_device(referrer_profile, buyer_device_fingerprint):
    """
    Return True if referrer or any ancestor has same device fingerprint as buyer.
    """
    if not buyer_device_fingerprint:
        return False
    node = referrer_profile
    while node:
        if node.device_fingerprint and node.device_fingerprint == buyer_device_fingerprint:
            return True
        node = node.parent
    return False
