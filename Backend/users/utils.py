import random
from django.core.mail import EmailMessage
from .models import CustomUser, OneTimePassword
from django.conf import settings
from django.contrib.auth import authenticate
from rest_framework.exceptions import status, AuthenticationFailed
from typing import Dict, TypedDict
import re


def generateOTP():
    otp = ""
    for i in range(6):
        otp += str(random.randint(1, 9))
    return otp

def send_otp_email(email):
    subject = "One time password for email verification"
    otp_code = generateOTP()
    print(otp_code)
    user = CustomUser.objects.get(email=email)
    current_site = "myAuth.com"
    email_body = f"Hello {user.username} Thank you for joining us. this is your verification code: {otp_code}"
    from_email = settings.DEFAULT_FROM_EMAIL

    OneTimePassword.objects.create(user=user, code=otp_code)
    send_email = EmailMessage(subject=subject, body=email_body, from_email=from_email, to=[email])
    send_email.send(fail_silently=True)

def send_password_reset_email(data):

    send_email = EmailMessage(
        subject=data['email_subject'],
        body=data['email_body'],
        from_email=settings.EMAIL_HOST_USER,
        to=[data['to_email']]
    )
    send_email.send(fail_silently=True)

class ValidatorResponse(TypedDict):
    valid: bool
    errorMessage: str

def validate_credentials(form_data: Dict[str, str]) -> ValidatorResponse:

    contains_whitespace = re.compile(r'\s')
    contains_number = re.compile(r'\d')
    contains_upper_case = re.compile(r'[A-Z]')
    contains_lower_case = re.compile(r'[a-z]')
    contains_special_character = re.compile(r'[!@#$%^&*()_+\-=\[\]{};\':"\\|,.<>/?]+')

    if not all(key in form_data and form_data[key] 
              for key in ['username', 'password', 'password2', 'email']):
        return {
            "valid": False,
            "errorMessage": "All fields are required."
        }

    if len(form_data['username']) < 6 or contains_whitespace.search(form_data['username']):
        return {
            "valid": False,
            "errorMessage": "Username cannot be less than 6 characters or contain whitespace"
        }

    if form_data['password'] != form_data['password2']:
        return {
            "valid": False,
            "errorMessage": "Passwords do not match."
        }

    password = form_data['password']
    if (len(password) < 8 or
        not contains_number.search(password) or
        not contains_upper_case.search(password) or
        not contains_lower_case.search(password) or
        not contains_special_character.search(password) or
        contains_whitespace.search(password)):
        
        return {
            "valid": False,
            "errorMessage": "Invalid password. Please enter a valid password with at least 8 characters, "
                      "one uppercase letter, one lowercase letter, one number, and one special character."
        }

    return {
        "valid": True,
        "errorMessage": ""
    }

def password_change_validator(passwords: Dict[str, str]) -> ValidatorResponse:

    contains_digit = re.compile(r'[\d]')
    contains_upper = re.compile(r'[A-Z]')
    contains_lower = re.compile(r'[a-z]')
    contains_special_character = re.compile(r'[!@#$%^&*()_+\-=\[\]{};\':"\\|,.<>/?]+')
    contains_whitespace = re.compile(r'\s')


    if passwords['newPassword'] != passwords['confirmPassword']:
        return {
            "valid": False,
            "errorMessage": "Passwords do not match."
        }
    print(passwords['newPassword'], passwords['confirmPassword'], passwords['oldPassword'])
    new_password = passwords['newPassword']
    if (len(new_password) < 8 or
        not contains_digit.search(new_password) or
        not contains_upper.search(new_password) or 
        not contains_lower.search(new_password) or 
        not contains_special_character.search(new_password) or
        contains_whitespace.search(new_password)):

        return {
            "valid": False,
            "errorMessage": "Invalid password. Please enter a valid password with at least 8 characters, "
                          "one uppercase letter, one lowercase letter, one number, and one special character."
        }

    return {
        "valid": True,
        "errorMessage": "Password Updated Successfully"
    }

def validate_password_reset(passwords: Dict[str, str]) -> ValidatorResponse:

    contains_digit = re.compile(r'[\d]')
    contains_upper = re.compile(r'[A-Z]')
    contains_lower = re.compile(r'[a-z]')
    contains_special_character = re.compile(r'[!@#$%^&*()_+\-=\[\]{};\':"\\|,.<>/?]+')
    contains_whitespace = re.compile(r'\s')

    if not all(key in passwords and passwords[key] 
            for key in ['password', 'confirm_password']):
        return {
            "valid": False,
            "errorMessage": "All fields are required."
        }

    if passwords['password'] != passwords['confirm_password']:
        return {
            "valid": False,
            "errorMessage": "Passwords do not match."
        }
    
    password = passwords['password']
    if (len(password) < 8 or
        not contains_digit.search(password) or
        not contains_upper.search(password) or 
        not contains_lower.search(password) or 
        not contains_special_character.search(password) or
        contains_whitespace.search(password)):

        return {
            "valid": False,
            "errorMessage": "Invalid password. Please enter a valid password with at least 8 characters, "
                          "one uppercase letter, one lowercase letter, one number, and one special character."
        }

    return {
        "valid": True,
        "errorMessage": "Password Updated Successfully"
    }