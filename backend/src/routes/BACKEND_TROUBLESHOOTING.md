# Backend Troubleshooting - Module Not Found

## Error Message
```
Error: Cannot find module '../routes/auth'
```

This means the `src/routes/` folder is empty or the files aren't there.

---

## ✅ Solution - Verify Files Exist

### In PowerShell, check:
```powershell
# Check if routes folder exists
ls C:\Users\sinch\projects\camp-man\backend\src\routes\

# Should show 6 files:
# - auth.js
# - camps.js
# - rooms.js
# - employees.js
# - checkIns.js
# - inspections.js
```

### If files are missing, manually create them:

---

## 🔧 Manual Fix - Create Empty Route Files

If the files weren't copied, create them as empty stubs first:

### In PowerShell, run:
```powershell
$backend = "C:\Users\sinch\projects\camp-man\backend"

# Create empty route files
New-Item -Path "$backend\src\routes\auth.js" -Force
New-Item -Path "$backend\src\routes\camps.js" -Force
New-Item -Path "$backend\src\routes\rooms.js" -Force
New-Item -Path "$backend\src\routes\employees.js" -Force
New-Item -Path "$backend\src\routes\checkIns.js" -Force
New-Item -Path "$backend\src\routes\inspections.js" -Force

echo "Files created!"
```

---

## 📝 Minimal Working Route Files

If manual creation worked, add this to each file to test:

### For each file (auth.js, camps.js, rooms.js, employees.js, checkIns.js, inspections.js):

```javascript
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Route working' });
});

module.exports = router;
```

Then test with:
```powershell
npm run dev
```

You should see:
```
✅ Database connected
🚀 Server running on http://localhost:5000
```

---

## 🎯 Once Backend Starts

If the backend starts with empty routes, then:

1. **Replace each route file** with the full implementation
2. **Restart backend**: `npm run dev`

---

## 📂 Correct Folder Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          ← Should exist
│   ├── routes/
│   │   ├── auth.js              ← Must exist
│   │   ├── camps.js             ← Must exist
│   │   ├── rooms.js             ← Must exist
│   │   ├── employees.js         ← Must exist
│   │   ├── checkIns.js          ← Must exist
│   │   └── inspections.js       ← Must exist
│   └── app.js                   ← Should exist
├── .env
├── .gitignore
├── server.js
└── package.json
```

---

## 🆘 Still Not Working?

1. **Delete node_modules and reinstall:**
   ```powershell
   rm -r node_modules
   npm install
   ```

2. **Check .env file exists with correct DB credentials**

3. **Verify PostgreSQL is running** and database exists

4. **Clear nodemon cache:**
   ```powershell
   npm cache clean --force
   ```

5. **Restart terminal and try again:**
   ```powershell
   npm run dev
   ```

---

## ✅ Quick Verification Checklist

- [ ] Route files exist in `src/routes/`
- [ ] All 6 route files are present
- [ ] `.env` file has correct DB credentials
- [ ] PostgreSQL is running
- [ ] `npm install` completed successfully
- [ ] No PORT 5000 already in use

---

Let me know which files are missing and I'll provide the exact content!
