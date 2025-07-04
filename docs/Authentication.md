
## 🔐 Authentication Workflows

### 📝 Signup Workflow

1. User submits the signup form with email and other required details.
2. System validates input (e.g., required fields, email format).
3. A unique 6-digit OTP is generated with a 5-minute expiration.
4. OTP and email are stored in a temporary storage (e.g., Redis, memory, DB) with expiry.
5. OTP is sent to the user's email via an email service (e.g., SMTP, Gmail API, SendGrid).
6. User is redirected to the **OTP Verification Page**.
7. User enters the OTP on the verification page.
8. System validates the OTP:
   - ✅ **If valid and not expired:**  
     - Finalize user signup  
     - Save user data to the database  
     - Create login session/token  
   - ❌ **If invalid or expired:**  
     - Display error  
     - Allow OTP resend option
9. On success, user is either:
   - Logged in automatically, or  
   - Redirected to the login page

---

### 🔐 Login Workflow

1. User submits the login form with email and password.
2. System validates credentials (email and password match).
3. If valid:
   - A 6-digit OTP is generated with a 5-minute expiry.
   - OTP and email are stored temporarily (e.g., Redis).
   - OTP is sent to the user’s email.
4. User is redirected to the **OTP Verification Page**.
5. User enters the OTP.
6. System validates the OTP:
   - ✅ **If valid and not expired:**  
     - Authenticate user  
     - Create session or generate token  
   - ❌ **If invalid or expired:**  
     - Show error  
     - Allow OTP resend
7. On success, user is redirected to a protected resource (e.g., dashboard).

---

## 📲 OTP Verification Page Workflow

- Display input field for the 6-digit OTP.
- Optionally show a countdown timer indicating OTP expiry (e.g., "Expires in 4:58").
- Include a button to **resend OTP**.

### 🔁 On OTP Submission:

- System compares submitted OTP with stored value.
- ✅ **If OTP is valid:**  
  - Proceed with signup or login finalization.
- ❌ **If OTP is invalid or expired:**  
  - Show error  
  - Prompt to retry or resend

### 🔁 On OTP Resend:

1. Generate a new OTP.
2. Update temporary storage with the new OTP and reset expiry.
3. Send new OTP to the user's email.
4. Reset countdown timer (if displayed).

---
