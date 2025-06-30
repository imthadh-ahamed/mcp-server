import smtplib
from email.message import EmailMessage
from app.core.config import settings
import requests

def send_via_smtp(to: str, subject: str, body: str):
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = settings.smtp_user
    msg["To"] = to
    msg.set_content(body)

    with smtplib.SMTP(settings.smtp_host, settings.smtp_port) as s:
        s.starttls()
        s.login(settings.smtp_user, settings.smtp_pass)
        s.send_message(msg)

def send_via_sendgrid(to: str, subject: str, body: str):
    url = "https://api.sendgrid.com/v3/mail/send"
    payload = {
        "personalizations": [{"to":[{"email": to}]}],
        "from": {"email": settings.smtp_user},
        "subject": subject,
        "content": [{"type":"text/plain", "value": body}]
    }
    headers = {"Authorization": f"Bearer {settings.sendgrid_api_key}"}
    r = requests.post(url, json=payload, headers=headers)
    r.raise_for_status()

def send_email(to: str, subject: str, body: str):
    if settings.sendgrid_api_key:
        return send_via_sendgrid(to, subject, body)
    return send_via_smtp(to, subject, body)