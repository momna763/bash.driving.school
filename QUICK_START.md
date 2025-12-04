# 🚀 Quick Start Guide - Bash Driving School Website

## ⚡ Start Both Servers in 30 Seconds

### Terminal 1 - Frontend Server:
```bash
cd /Users/uklaptop/Downloads/Bash-Driving/frontend
npm run dev
```
✅ Frontend running at: **http://localhost:5173**

### Terminal 2 - Backend Server:
```bash
cd /Users/uklaptop/Downloads/Bash-Driving/server
npm start
```
✅ Backend running at: **http://localhost:4000**

---

## 🌐 Access Your Website

**Open in browser**: http://localhost:5173

---

## 🎨 Quick Feature Tests

### 1. Dark Mode Toggle (5 seconds)
1. Look at navbar top-right
2. Click 🌙 (moon icon)
3. Watch entire site switch to dark theme
4. Click ☀️ (sun icon) to switch back

### 2. Mobile View (10 seconds)
1. Press F12 (open DevTools)
2. Press Ctrl+Shift+M (toggle device toolbar)
3. Select "iPhone 12 Pro" or "iPad"
4. See responsive design in action

### 3. Form Validation (30 seconds)
1. Click "Book Your Lesson" button
2. Click "Next Step →" without filling fields
3. See error message appear
4. Fill in all fields correctly
5. Submit form successfully

### 4. Smooth Scrolling (5 seconds)
1. Click any navbar link (e.g., "Services")
2. Watch page smoothly scroll to that section

### 5. Card Click-to-Book (5 seconds)
1. Scroll to Pricing section
2. Click any pricing card
3. Automatically jumps to booking form

---

## 🎯 Main Features at a Glance

| Feature | Status | How to Use |
|---------|--------|-----------|
| **Dark/Light Mode** | ✅ Active | Click 🌙/☀️ in navbar |
| **Responsive Design** | ✅ Active | Resize browser or use mobile |
| **Form Validation** | ✅ Active | Try submitting empty form |
| **Smooth Scroll** | ✅ Active | Click any nav link |
| **Click-to-Book** | ✅ Active | Click pricing/course cards |
| **Success Gallery** | ✅ Active | Scroll to "Success Stories" |
| **Email Integration** | ✅ Active | Submit booking form |

---

## 📱 Responsive Breakpoints

| Device | Width | What Changes |
|--------|-------|--------------|
| 📱 iPhone SE | 375px | Single column, hamburger menu |
| 📱 iPhone 12 | 390px | Compact layout, larger touch targets |
| 📱 iPad Mini | 768px | 2-column stats, single pricing |
| 💻 iPad Pro | 1024px | 2-3 columns, full features |
| 🖥️ Desktop | 1200px+ | Full 4-column layouts |

---

## 🎨 Theme Colors

### Light Mode:
- Background: White (#ffffff)
- Text: Dark Gray (#1f2937)
- Cards: White (#ffffff)
- Primary: Coral Red (#ff6b6b)

### Dark Mode:
- Background: Dark Navy (#0f172a)
- Text: Light Gray (#f1f5f9)
- Cards: Slate (#1e293b)
- Primary: Coral Red (#ff6b6b)

---

## 📝 Test Form Validation

### Valid Test Data:
```
Name: John Smith
Email: john@example.com
Phone: 07855595078 (or +447855595078)
Lesson Type: Manual
Address: 123 High Street, Manchester, M1 1AA
```

### Will Cause Errors:
```
Email: invalid-email (missing @)
Phone: 123456 (too short)
Empty Name: (required field)
```

---

## 🔧 Quick Fixes

### Port Already in Use?
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill

# Kill process on port 4000
lsof -ti:4000 | xargs kill
```

### Form Not Sending?
1. Check backend is running: http://localhost:4000/api/health
2. Should see: `{"status":"ok"}`
3. If not, restart backend server

### Dark Mode Not Working?
1. Open browser console (F12)
2. Clear localStorage: `localStorage.clear()`
3. Refresh page (Ctrl+R)

---

## 💡 Pro Tips

1. **Save Time**: Keep both terminals open
2. **Theme Testing**: Switch themes while on different sections
3. **Mobile Testing**: Use DevTools device toolbar (F12 → Ctrl+Shift+M)
4. **Form Testing**: Keep valid test data handy (see above)
5. **Performance**: Clear browser cache if styles not updating

---

## 📧 Email Setup (If Not Working)

### Gmail App Password:
1. Go to: https://myaccount.google.com/apppasswords
2. Create new app password for "Mail"
3. Copy 16-character password
4. Update in `/server/.env`:
   ```
   SMTP_PASS=your-16-char-password
   ```
5. Restart backend server

---

## 🎯 Common Tasks

### Change Logo:
```
Replace: /frontend/src/assets/logo.jpeg
Keep same filename: logo.jpeg
Recommended size: 200x200px or similar ratio
```

### Change Colors:
```
Edit: /frontend/src/App.css
Find: :root section (line 9)
Change: --primary, --secondary colors
Save and see instant changes
```

### Add New Section:
```
Edit: /frontend/src/App.jsx
Copy existing section structure
Update content
Add new nav link
```

---

## 🌐 Deploy to Production

### Frontend (Vercel/Netlify):
```bash
cd frontend
npm run build
# Upload 'dist' folder
```

### Backend (Heroku/Railway):
```bash
cd server
# Set environment variables
# Deploy via Git or CLI
```

---

## 📊 Quick Stats

- **Total Features**: 10+ major features
- **Responsive Breakpoints**: 6 breakpoints
- **Color Themes**: 2 (Light + Dark)
- **Form Steps**: 3 steps with validation
- **Sections**: 10 main sections
- **Files Modified**: 3 main files (App.jsx, App.css, index.js)

---

## ✅ Checklist After Starting

- [ ] Frontend loads at localhost:5173
- [ ] Backend responds at localhost:4000/api/health
- [ ] Dark mode toggle works
- [ ] Responsive design works (resize browser)
- [ ] Form validation shows errors
- [ ] Navigation smooth scrolls
- [ ] Success gallery displays properly
- [ ] Email sending configured

---

## 🆘 Need Help?

### Check Servers:
```bash
# Frontend
curl http://localhost:5173

# Backend
curl http://localhost:4000/api/health
```

### Check Logs:
- Frontend: Terminal 1 (shows Vite errors)
- Backend: Terminal 2 (shows Express errors)
- Browser: F12 Console (shows JS errors)

---

## 🎉 You're Ready!

Your website is now:
- ✅ Fully responsive
- ✅ Dark/Light mode enabled
- ✅ Form validation working
- ✅ Professional UI/UX
- ✅ Production ready

**Open http://localhost:5173 and enjoy!** 🚗✨

---

**Questions? Check FEATURES.md for detailed documentation**
