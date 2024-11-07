import random
from django.core.mail import EmailMessage
from .models import CustomUser, OneTimePassword
from django.conf import settings
from django.contrib.auth import authenticate
from rest_framework.exceptions import status, AuthenticationFailed


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