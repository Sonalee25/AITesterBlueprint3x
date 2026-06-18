# TestForge Quick Start Guide

Get started with the RICE-POT Test Plan Generator in 5 minutes.

## ⚡ 5-Minute Setup

### Step 1: Open the Application (30 seconds)

**Option A: Direct File Open**
```bash
# macOS
open index.html

# Windows
start index.html

# Linux
xdg-open index.html
```

**Option B: Local Server (Recommended)**
```bash
# Navigate to project directory
cd Project1_TestCase_Generator

# Start Python server
python3 -m http.server 8000

# Open browser to http://localhost:8000
```

### Step 2: Review RICE-POT Components (1 minute)

You'll see 7 colored cards on the main screen:

| Card | What It Does |
|------|--------------|
| **R — Role** | Selects your QA expertise level (Senior QA Lead selected by default) |
| **I — Instructions** | Shows 12 mandatory sections (all auto-checked) |
| **C — Context** | Pre-fills with Restful-Booker API details (edit if needed) |
| **E — Example** | Shows format examples for consistency |
| **P — Parameters** | Validation rules (automatic enforcement) |
| **O — Output** | Specifies Markdown format (automatic) |
| **T — Tone** | Sets professional, formal style (automatic) |

**Default values are already set.** No changes needed to generate a test plan!

### Step 3: Generate Test Plan (1 minute)

1. **Click the "Generate" button** at the top
2. **Wait 1-2 seconds** for real-time preview
3. **All 12 sections populate automatically:**
   - Objective
   - Scope (20+ testing types)
   - Inclusions (19+ CRUD areas)
   - Test Environments
   - Defect Reporting Procedure
   - Test Strategy
   - Test Schedule
   - Test Deliverables
   - Entry/Exit Criteria
   - Tools
   - Risks & Mitigations
   - Approvals

### Step 4: Review Output (1 minute)

Navigate through tabs at the top:
- **RICE-POT** — Configuration (current view)
- **Generator** — Form inputs and generation button
- **Test Plan** — All 12 generated sections
- **Test Cases** — Pre-built test scenarios for each API endpoint
- **Metrics** — Coverage statistics

### Step 5: Export (1 minute)

**Click "Export" button** to download test plan as Markdown:
- File format: `TestPlan_Restful-Booker_API_[DATE].md`
- Contains all 12 sections + test cases
- Ready to import to JIRA, GitHub, or share with team

---

## 🎯 Common Tasks

### Task: Change System Name
1. Navigate to **Generator** tab (or scroll to RICE-POT section)
2. Find the **"System Name"** field
3. Replace "Restful-Booker API" with your API name
4. Click **Generate** to update test plan

### Task: Change Team Contacts
1. In **RICE-POT Context section**, update:
   - **Frontend POC** → Your frontend developer name
   - **Backend POC** → Your backend developer name
   - **DevOps POC** → Your DevOps engineer name
2. Click **Generate** to regenerate test plan with new contacts

### Task: View Test Cases
1. Click **Test Cases** tab
2. Select endpoint from list (e.g., "POST /booking")
3. View pre-built test scenarios:
   - Test case ID
   - Title
   - Priority level
   - Test type (Functional, Security, etc.)
   - Steps to execute
   - Expected results

### Task: Use in Postman
1. Export test plan (Markdown format)
2. Create new Postman collection
3. Use test case details to:
   - Set up requests with proper headers
   - Add request body from test data
   - Configure assertions for expected results
4. Save as Postman collection for team reuse

### Task: Use in REST Assured
1. Export test plan (Markdown format)
2. Create Java test class for each endpoint
3. Use test case structure as template:
   ```java
   @Test
   public void testCreateBookingWithValidData() {
       // Setup from test case preconditions
       String token = generateAuthToken();
       
       // Request from test case data
       Response response = given()
           .contentType(ContentType.JSON)
           .header("Authorization", token)
           .body(testData)
           .post("/booking");
       
       // Assertions from expected results
       response.then()
           .statusCode(200)
           .body("bookingid", notNullValue());
   }
   ```

---

## 📋 Understanding the 12 Sections

### 1. Objective (Purpose)
**What it says:** Why you're testing, what tools you'll use, what API you're testing
**Example:** "...verify the Restful-Booker API covering booking creation, retrieval, update, deletion, and authentication using Postman and REST Assured..."

### 2. Scope (What's In/Out)
**What it says:** All 20+ types of testing you'll perform
**Includes:** Functional, Security, Performance, Load, Integration, Regression, etc.
**Use for:** Understanding full testing breadth, setting client expectations

### 3. Inclusions (Specific Areas)
**What it says:** All 19+ CRUD-related testing scenarios
**Includes:** Create POST, Read GET, Update PUT, Delete DELETE, Boundary testing, Security, etc.
**Use for:** Detailed traceability to requirements

### 4. Test Environments
**What it says:** Where testing happens (Local, QA, Pre-Prod, Prod URLs)
**Table includes:** Environment name and corresponding API base URL
**Use for:** Team reference on which environment to test against

### 5. Defect Reporting Procedure
**What it says:** How bugs get reported, triaged, and fixed
**Includes:** Process steps, severity levels, POC contacts table
**Use for:** Bug report standards, responsibility assignment

### 6. Test Strategy
**What it says:** HOW you'll test (3-step approach)
- **Step 1:** Design techniques (ECP, BVA, Decision Tables, etc.)
- **Step 2:** Testing procedure (Smoke → Functional → Regression → Performance)
- **Step 3:** Best practices (Context-Driven, Shift-Left, Exploratory, E2E)
**Use for:** Test case design approach, team training

### 7. Test Schedule
**What it says:** When testing happens (sprint-based timeline)
**Table includes:** Tasks (Create Plan, Create Cases, Execute, Report) with sprint weeks
**Use for:** Project planning, sprint backlog, milestone tracking

### 8. Test Deliverables
**What it says:** What artifacts you'll produce
**Includes:** Test Plan, Test Cases Doc, Execution Report, Defect Summary, etc.
**Use for:** Stakeholder communication, handoff planning

### 9. Entry and Exit Criteria
**What it says:** When phases start/stop (3 phases)
- **Requirement Analysis:** Entry: Reqs finalized | Exit: Reqs mapped to tests
- **Test Execution:** Entry: Tests approved | Exit: All tests run
- **Test Closure:** Entry: Regression done | Exit: Sign-off approved
**Use for:** Phase gates, quality checkpoints

### 10. Tools
**What it says:** Software you'll use
**Includes:** Postman, REST Assured, JIRA, GitHub, Jenkins, etc.
**Use for:** Team setup, environment preparation

### 11. Risks and Mitigations
**What it says:** What could go wrong + how to prevent it
**Includes:** 3+ risk scenarios with probability, impact, and mitigation strategy
**Use for:** Risk management, contingency planning

### 12. Approvals
**What it says:** Who needs to sign off
**Includes:** QA Lead, Product Owner, Dev Lead, DevOps
**Use for:** Stakeholder management, formal sign-off process

---

## 🔍 Deep Dive: Test Cases by Endpoint

### Authentication: POST /auth
**What it does:** Generate security token for protected endpoints
**Test cases include:**
- ✅ Valid credentials → Token generated
- ❌ Invalid password → 401 Unauthorized
- ❌ Missing username → 400 Bad Request

### Booking List: GET /booking
**What it does:** Retrieve all booking IDs (with optional filters)
**Test cases include:**
- ✅ Get all bookings → Array of IDs
- ✅ Filter by firstname → Filtered results
- ✅ Filter by dates → Date range results

### Get Booking: GET /booking/:id
**What it does:** Fetch full details of specific booking
**Test cases include:**
- ✅ Valid ID → Booking details returned
- ❌ Invalid ID → 404 Not Found
- ✅ Verify all fields present

### Create Booking: POST /booking
**What it does:** Create new booking with guest info
**Test cases include:**
- ✅ Valid payload → Booking created, ID returned
- ✅ Boundary values (max price, special chars in name)
- ❌ Invalid dates (checkout before checkin)

### Update Booking: PUT /booking/:id
**What it does:** Modify existing booking (requires auth)
**Test cases include:**
- ✅ Valid update with token → Changes applied
- ❌ Missing auth token → 401 Unauthorized
- ✅ Concurrent updates → Last-write-wins behavior

### Delete Booking: DELETE /booking/:id
**What it does:** Remove booking (requires auth)
**Test cases include:**
- ✅ Valid delete with token → 201 Deleted
- ❌ Missing auth token → 401 Unauthorized
- ❌ Delete already-deleted → 404 Not Found

---

## 🚀 Workflow: From Test Plan to Test Execution

```
┌─────────────────────────────────────────────────────────┐
│ 1. Generate Test Plan (TestForge)                       │
│    ↓ Output: Markdown document                          │
├─────────────────────────────────────────────────────────┤
│ 2. Create Test Cases from Plan                          │
│    ↓ Manual: Use test case templates                    │
│    ↓ Automated: Code REST Assured tests                 │
├─────────────────────────────────────────────────────────┤
│ 3. Set Up Testing Environment                           │
│    ↓ Configure Postman collection                       │
│    ↓ Set up REST Assured project structure              │
│    ↓ Configure JIRA for defect tracking                 │
├─────────────────────────────────────────────────────────┤
│ 4. Execute Tests                                         │
│    ↓ Manual: Run in Postman, log results                │
│    ↓ Automated: Run REST Assured suite via Maven        │
├─────────────────────────────────────────────────────────┤
│ 5. Log Defects                                           │
│    ↓ Use Defect Reporting Procedure from test plan      │
│    ↓ Create JIRA ticket with steps to reproduce         │
├─────────────────────────────────────────────────────────┤
│ 6. Generate Reports                                      │
│    ↓ Pass/Fail summary                                  │
│    ↓ Defect trends                                      │
│    ↓ Coverage metrics                                   │
└─────────────────────────────────────────────────────────┘
```

---

## 💡 Tips & Tricks

### Tip 1: Use Pre-Filled Defaults
Don't need to change anything! The form comes with working values. Just click Generate and export.

### Tip 2: Copy Test Case Data
Click "Test Cases" tab to see pre-built scenarios. Copy test data directly into Postman requests or REST Assured tests.

### Tip 3: Keep RICE-POT Sections in Sync
When you change a RICE-POT component (e.g., new API URL), click Generate again to update all 12 sections with the new information.

### Tip 4: Export Multiple Formats
- Markdown (.md) → For documentation and version control
- Print/PDF → Use browser Print dialog (Ctrl+P / Cmd+P) for formal sign-off
- Copy → Select all text (Cmd+A) and copy to Confluence/Jira

### Tip 5: Customize for Your Team
Edit Context fields to match your team:
- Change POC names to your actual team members
- Update API URL to your endpoint
- Adjust sprint duration for your release cycle

### Tip 6: Share with Stakeholders
Export Markdown test plan and share via:
- GitHub repository (commit and push)
- Confluence wiki (paste content)
- Email (attach generated file)
- JIRA (link as documentation)

---

## ❓ FAQ

**Q: Do I need a backend server to run TestForge?**
A: No! The app runs entirely in your browser. Open `index.html` directly or use any local server.

**Q: Can I modify the test plan sections?**
A: Yes! Edit the RICE-POT components and click Generate to regenerate with your changes.

**Q: How do I add my own test cases?**
A: Edit the `TEST_CASES_DB` object in `app.js` to add endpoint-specific test scenarios.

**Q: What if I need a different output format?**
A: Export as Markdown, then convert using Pandoc or copy-paste into your preferred tool.

**Q: Can I use TestForge for other APIs?**
A: Absolutely! Just update the API endpoints, request/response structures in `app.js` and the Context section in the UI.

**Q: Is my data saved?**
A: No, data is session-only (browser memory). Export/download to save your test plan.

---

## 🎓 Next Steps After Quick Start

1. **Customize for Your API**
   - Read `README.md` for detailed customization guide
   - Update ENDPOINTS in `app.js`
   - Modify TEST_CASES_DB with your test scenarios

2. **Deep Dive into RICE-POT**
   - Read `prompt.md` for full framework specification
   - Understand each component's purpose
   - Learn how to structure better prompts

3. **Explore Skills & Capabilities**
   - Read `SKILLS.md` for comprehensive guide
   - Understand all testing methodologies covered
   - Review defect management procedures

4. **Integrate with Your Tools**
   - Import test cases into Postman
   - Create REST Assured automation
   - Set up JIRA defect tracking
   - Configure CI/CD pipeline

---

## 📞 Troubleshooting

**Issue: Button clicks don't work**
- Refresh the browser (Cmd+R / Ctrl+R)
- Check browser console for errors (F12)
- Ensure JavaScript is enabled

**Issue: Test plan not generating**
- Verify all RICE-POT fields are filled
- Check browser console for errors
- Try refreshing and starting over

**Issue: Export not downloading**
- Disable popup blockers for this site
- Try right-click → "Save As" on export link
- Check Downloads folder

**Issue: Styling looks broken**
- Clear browser cache (Shift+Cmd+Delete / Shift+Ctrl+Delete)
- Try different browser
- Check internet connection (fonts load from CDN)

---

## 🏁 You're Ready!

You now have everything needed to generate professional test plans for any API using the RICE-POT framework. 

**Next action:** Open `index.html` and click **Generate** to create your first test plan! 🚀

---

**Questions?** Check:
- 📘 README.md — Detailed technical documentation
- 📘 SKILLS.md — Comprehensive capabilities guide
- 📘 prompt.md — RICE-POT framework specification

