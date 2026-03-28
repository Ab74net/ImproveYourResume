# Setup Checklist ✓

## 🚀 Quick Start (5 minutes)

### 1. Get OpenAI API Key
- [ ] Go to https://platform.openai.com/api-keys
- [ ] Create account or sign in
- [ ] Click "Create new secret key"
- [ ] Copy the key (starts with `sk-`)
- [ ] Add billing information

### 2. Add Key to Config
- [ ] Open `scripts/config.js`
- [ ] Find: `const API_KEY = 'YOUR_API_KEY_HERE';`
- [ ] Replace with: `const API_KEY = 'sk-proj-your-actual-key';`
- [ ] Save the file

### 3. Start Local Server
- [ ] Run: `python -m http.server 8000`
- [ ] Or: `npx http-server -p 8000`
- [ ] Or: Use VS Code Live Server

### 4. Test the App
- [ ] Open: http://localhost:8000/app.html
- [ ] Check console (F12) for "✓ API Key Configured"
- [ ] Try the demo: http://localhost:8000/demo.html
- [ ] Upload a resume and run analysis

### 5. Set Up Billing Alerts
- [ ] Go to OpenAI billing dashboard
- [ ] Set alert at $5
- [ ] Set alert at $10
- [ ] Set hard limit if available

## 🔒 Security Checklist

### Before Committing to Git
- [ ] Verify `.env` is in `.gitignore`
- [ ] Consider adding `scripts/config.js` to `.gitignore`
- [ ] Never commit files with actual API keys
- [ ] Use `git status` to check what's being committed

### Before Deploying
- [ ] ⚠️ DO NOT deploy with hardcoded API key
- [ ] Read [ENV_SETUP_README.md](./ENV_SETUP_README.md)
- [ ] Implement backend service (AWS Lambda, etc.)
- [ ] Move API key to server-side environment variables

### Ongoing
- [ ] Monitor OpenAI usage dashboard weekly
- [ ] Check billing alerts
- [ ] Rotate API keys monthly
- [ ] Review access logs

## 📁 File Structure Check

```
✓ .env                    (git-ignored, contains your key)
✓ .env.example            (template, safe to commit)
✓ .gitignore              (protects .env)
✓ scripts/config.js       (contains API_KEY constant)
✓ app.html                (no API key input field)
✓ API_KEY_SETUP.md        (setup instructions)
✓ SETUP_CHECKLIST.md      (this file)
```

## 🧪 Testing Checklist

### Demo Page
- [ ] Navigate to http://localhost:8000/demo.html
- [ ] Score animation plays
- [ ] Click issue items to scroll to resume
- [ ] Before/after resumes display correctly
- [ ] Legend shows all colors

### App Page
- [ ] Navigate to http://localhost:8000/app.html
- [ ] No API key input field visible
- [ ] Can type custom role and company
- [ ] Datalist suggestions appear
- [ ] "Use Generic Sample" button works
- [ ] PDF upload works
- [ ] Analysis runs successfully
- [ ] Results display correctly

### Console Checks
- [ ] No errors in browser console
- [ ] "✓ API Key Configured" message appears
- [ ] No 401/403 API errors
- [ ] Network requests succeed

## ⚠️ Common Issues

### Issue: "API key not configured"
**Fix:** Open `scripts/config.js` and add your key

### Issue: "Invalid API key"
**Fix:** 
- Check you copied the entire key
- Verify billing is set up on OpenAI
- Ensure key is still active

### Issue: Key visible in browser
**This is expected!** Frontend apps can't hide keys. For production, use a backend.

### Issue: Rate limit exceeded
**Fix:**
- Wait a few minutes
- Check OpenAI usage limits
- Upgrade plan if needed

## 📊 Usage Monitoring

### Daily
- [ ] Check if app is working
- [ ] Review any error messages

### Weekly
- [ ] Check OpenAI usage dashboard
- [ ] Review costs
- [ ] Verify billing alerts are working

### Monthly
- [ ] Review total costs
- [ ] Rotate API key
- [ ] Update documentation if needed

## 🎯 Next Steps

### For Personal Use
- [x] Set up API key
- [ ] Test with your own resume
- [ ] Iterate on improvements
- [ ] Share with friends (locally)

### For Team Use
- [ ] Each team member gets own key
- [ ] Share `.env.example` template
- [ ] Document setup process
- [ ] Consider shared dev backend

### For Production
- [ ] Read [ENV_SETUP_README.md](./ENV_SETUP_README.md)
- [ ] Design backend architecture
- [ ] Implement AWS Lambda or similar
- [ ] Move API key to server
- [ ] Add authentication
- [ ] Implement rate limiting
- [ ] Set up monitoring
- [ ] Deploy securely

## 📚 Documentation

- [API_KEY_SETUP.md](./API_KEY_SETUP.md) - Detailed setup guide
- [ENV_SETUP_README.md](./ENV_SETUP_README.md) - Security & production guide
- [QUICK_START.md](./QUICK_START.md) - General getting started
- [PROJECT_PLAN.md](./PROJECT_PLAN.md) - Project overview

## ✅ You're Done When...

- [x] API key is added to `scripts/config.js`
- [x] Console shows "✓ API Key Configured"
- [x] Demo page works
- [x] App page runs analysis successfully
- [x] Billing alerts are set up
- [x] You understand the security limitations

## 🎉 Success!

Your Resume Reviewer is now ready to use locally. Remember:
- ✅ Safe for personal/local use
- ⚠️ Not safe for public deployment (yet)
- 📚 Read security docs before deploying

Happy reviewing! 🚀
