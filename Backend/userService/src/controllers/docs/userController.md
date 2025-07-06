## Login :
- Visual Example Over Time
Let’s see how the bucket changes for user123 over multiple requests:

- `10:00:00 AM:` User requests OTP. Bucket is new: `count = 5`, `lastRefill = 1625098760.` `Use 1 token → count = 4.`

- `10:00:20 AM:` User requests again. timePassed = 20 seconds. Refill 1 token. `count = 4 + 1 = 5` (capped at 5). Use 1 token → count = 4. `Set lastRefill = 1625098780.`

- `10:00:30 AM:` User requests again. timePassed = 10 seconds. Refill 0 tokens (since 10/12 = 0.833). `count = 4 + 0 = 4. Use 1 token → count = 3.`

- `10:01:00 AM:` User requests again. timePassed = 30 seconds. Refill 2 tokens (30/12 = 2.5 → 2). count = 3 + 2 = 5 (capped at 5). Use 1 token → count = 4.