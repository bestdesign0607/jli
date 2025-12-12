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

def generate_referral_code(length=8):
    chars = string.ascii_uppercase + string.digits
    return ''.join(random.choice(chars) for _ in range(length))

def make_unique_referral_code():
    for _ in range(20):
        code = generate_referral_code()
        if not AmbassadorProfile.objects.filter(referral_code=code).exists():
            return code
    return uuid.uuid4().hex[:12].upper()


def find_strict_matrix_parent(referrer_profile):
    """
    STRICT MATRIX PLACEMENT ALGORITHM:
    - If referrer has <3 children → place under referrer
    - If referrer has 3 children → do not place under referrer or subtree
    - Only allow placement when current level is fully complete
    - Descend to next level only if current level fully filled
    """
    if not referrer_profile:
        return None  # fallback: company level (root)

    # 1️⃣ If referrer has < 3 children → place directly under referrer
    if referrer_profile.children.count() < 3:
        return referrer_profile

    # 2️⃣ Check if current level is full
    current_level = referrer_profile.level
    same_level_nodes = AmbassadorProfile.objects.filter(level=current_level).order_by('created_at')
    
    # If any node has <3 children → block placement
    for node in same_level_nodes:
        if node.children.count() < 3:
            return None  # Placement blocked until level is complete

    # 3️⃣ Level complete → move to next level
    next_level_nodes = AmbassadorProfile.objects.filter(level=current_level + 1).order_by('created_at')
    for node in next_level_nodes:
        if node.children.count() < 3:
            return node

    # If next level empty or all full → fallback to None (company root)
    return None


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
