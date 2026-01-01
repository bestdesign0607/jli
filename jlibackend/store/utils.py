DIGITAL_PRODUCT_REQUIREMENTS = {
    "business_name": {
        "text_fields": [
            "surname", "firstname", "othername", "dob", "gender", "phone", "email",
            # Residential address
            "home_state", "home_lga", "home_city", "home_house", "home_street", "home_address_description",
            # Business address
            "business_state", "business_lga", "business_city", "business_house", "business_street", "business_address_description",
            "nature_of_business", "business_name1", "business_name2", "functional_email"
        ],
        "file_fields": ["id_card", "passport", "signature"]
    },
    "ngo": {
        "text_fields": [
            "chairman_name", "chairman_nin", "chairman_phone", "chairman_email", "chairman_address", "chairman_dob",
            "secretary_name", "secretary_nin", "secretary_phone", "secretary_email", "secretary_address", "secretary_dob",
            "trustee1_name", "trustee1_nin", "trustee1_phone", "trustee1_email", "trustee1_address", "trustee1_dob",
            "trustee2_name", "trustee2_nin", "trustee2_phone", "trustee2_email", "trustee2_address", "trustee2_dob",
            "trustees_tenure", "ngo_address", "ngo_phone", "ngo_email",
            "proposed_ngo_name1", "proposed_ngo_name2", "proposed_ngo_name3"
        ],
        "file_fields": [
            "chairman_signature", "chairman_photo", "chairman_nin_slip",
            "secretary_signature", "secretary_photo", "secretary_nin_slip",
            "trustee1_signature", "trustee1_photo", "trustee1_nin_slip",
            "trustee2_signature", "trustee2_photo", "trustee2_nin_slip"
        ]
    },
    "moniepoint_pos": {
        "text_fields": [
            "bvn", "dob", "phone", "email",
            "first_name", "last_name", "title", "gender", "marital_status", "religion", "nationality", "state_of_origin", "lga_of_origin",
            "employment_status", "address",
            "home_address", "country", "city", "state", "lga",
            # Next of kin
            "next_of_kin_name", "next_of_kin_phone", "next_of_kin_relationship", "next_of_kin_dob",
            "next_of_kin_email", "next_of_kin_address", "next_of_kin_country", "next_of_kin_city", "next_of_kin_lga",
            "business_name", "nature_of_business"
        ],
        "file_fields": [
            "passport_photo", "utility_bill", "identification_file", "signature_file"
        ]
    },
    "cac_ltd": {
        "text_fields": [
            "surname","firstname","othername","dob","gender","phone","email",
            # Home address
            "home_state","home_lga","home_city","home_house","home_street",
            # Company address
            "company_state","company_lga","company_city","company_house","company_street","company_email",
            # Objects of memorandum
            "object1","object2","object3","object4",
            # Witness
            "witness_surname","witness_firstname","witness_othername","witness_dob","witness_gender","witness_phone",
            "witness_state","witness_lga","witness_city","witness_house","witness_street"
        ],
        "file_fields": ["id_card", "signature_director", "signature_witness", "nin"]
    }
}
