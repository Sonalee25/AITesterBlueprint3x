# Test Plan: Restful-Booker API

> Generated using RICE-POT Framework — June 14, 2026

---

## 1. Objective

The objective of this test plan is to verify the **Restful-Booker API**, covering booking creation, retrieval, update, deletion, and authentication token generation. The Restful-Booker is a RESTful web service that provides a sandbox environment for practicing API testing. The system is known to contain defects which must be identified, documented, and logged as part of the testing effort.

All test cases will be executed in Postman for manual and exploratory testing, and automation will be implemented using the REST Assured framework with Java. The testing effort aims to validate the functional correctness, data integrity, security posture, and performance characteristics of all exposed API endpoints. Defects discovered during testing will be logged in JIRA with full reproduction steps, severity classification, and priority assignment.

The base URL for the API under test is: `https://restful-booker.herokuapp.com`

---

## 2. Scope

The following testing types are within scope for the Restful-Booker API test plan:

1. **Functional Testing:**
   - Verify the correctness and functionality of all API endpoints as per the API documentation.
   - Test various scenarios for booking creation, modification, and cancellation.
   - Validate user authentication and authorization mechanisms for protected endpoints.

2. **Data Validation Testing:**
   - Verify all request and response payloads conform to expected data types.
   - Validate required vs. optional field enforcement.
   - Confirm date format compliance (CCYY-MM-DD) across all date fields.

3. **Error Handling Testing:**
   - Verify appropriate HTTP status codes for error scenarios (400, 403, 404, 405, 500).
   - Validate error response body structure and messaging.

4. **Performance Testing:**
   - Measure API response times under normal load conditions.
   - Verify response times remain within acceptable thresholds (<2 seconds).

5. **Security Testing:**
   - Validate authentication enforcement on PUT, PATCH, and DELETE endpoints.
   - Test for SQL injection, XSS, and other common vulnerabilities.
   - Verify token-based and Basic Auth authorization mechanisms.

6. **Integration Testing:**
   - Verify end-to-end flows: Create → Read → Update → Delete booking.
   - Validate data consistency across sequential API operations.

7. **Compatibility Testing:**
   - Verify API behavior across JSON, XML, and URL-encoded content types.
   - Test with Accept headers for application/json and application/xml.

8. **Documentation Review:**
   - Validate that API behavior matches the published API documentation.
   - Identify any discrepancies between documented and actual behavior.

9. **Load Testing:**
   - Simulate concurrent users accessing the API simultaneously.
   - Measure system stability under sustained load.

10. **Regression Testing:**
    - Re-execute test cases after defect fixes to verify resolution.
    - Confirm no new defects are introduced by code changes.

11. **Edge Case Testing:**
    - Test with empty payloads, null values, and extreme boundary values.
    - Verify checkout-before-checkin date scenarios.

12. **Concurrency Testing:**
    - Test simultaneous create and update operations on the same resource.
    - Verify data integrity under concurrent access patterns.

13. **Ad Hoc Testing:**
    - Perform unscripted, intuition-based exploratory testing.
    - Focus on discovering undocumented behaviors and edge cases.

14. **Usability Testing:**
    - Evaluate API endpoint naming conventions and response structure clarity.
    - Assess error message helpfulness and developer experience.

15. **CI/CD Testing:**
    - Integrate automated test suite into CI/CD pipeline.
    - Verify automated test execution on each build deployment.

16. **Performance Monitoring:**
    - Establish baseline performance metrics for all endpoints.
    - Monitor response time trends across test cycles.

17. **Backup & Recovery Testing:**
    - Verify data persistence after API service restart.
    - Validate booking data integrity post-recovery scenarios.

18. **Internationalization Testing:**
    - Test with Unicode characters in name fields (e.g., accented characters, CJK).
    - Verify proper encoding and decoding of international character sets.

19. **Rate Limiting Testing:**
    - Verify API behavior under rapid successive requests.
    - Identify if rate limiting or throttling mechanisms are in place.

20. **Third-Party Integration Testing:**
    - Validate API responses are compatible with common integration tools.
    - Verify webhook or callback compatibility if applicable.

---

## 3. Inclusions

The following areas are included in the scope of this test plan:

1. **Create (POST) Operations:**
   - POST /booking — Create new booking with all required fields
   - Validate booking ID returned in response
   - Test with optional fields (additionalneeds)

2. **Read (GET) Operations:**
   - GET /booking — Retrieve all booking IDs with optional filters
   - GET /booking/:id — Retrieve specific booking details
   - Test filter combinations (firstname, lastname, checkin, checkout)

3. **Update (PUT) Operations:**
   - PUT /booking/:id — Full update with authentication
   - Validate token requirement and authorization
   - Test all updatable fields

4. **Delete (DELETE) Operations:**
   - DELETE /booking/:id — Delete booking with authentication
   - Verify successful deletion (201 status code)
   - Test deletion of non-existent bookings (404)

5. **Boundary Value Testing:**
   - Maximum/minimum string lengths (names, additional needs)
   - Maximum/minimum numeric values (totalprice)
   - Date boundary scenarios

6. **Concurrency Testing:**
   - Simultaneous creates on different bookings
   - Simultaneous updates to same booking
   - Simultaneous read during write operations

7. **Data Validation Testing:**
   - Type validation (String, Number, Boolean, Date)
   - Required field enforcement
   - Date format validation (YYYY-MM-DD)

8. **Authentication & Authorization:**
   - Token generation (POST /auth with valid credentials)
   - Token requirement on protected endpoints
   - Invalid token handling
   - Missing token scenarios

9. **Error Handling:**
   - Invalid request payloads (malformed JSON)
   - Missing required fields
   - Invalid data types
   - Non-existent resource access

10. **Security Testing:**
    - SQL injection in filter parameters
    - XSS in name fields
    - Invalid token rejection
    - Authorization bypass attempts

11. **Performance Testing:**
    - Response time benchmarking
    - Large payload handling
    - Concurrent request performance

12. **Integration Testing:**
    - Create booking → Get details → Update → Delete workflow
    - Verify data consistency across operations
    - Cross-endpoint data validation

13. **Regression Testing:**
    - Smoke test suite after any API changes
    - Re-verification of fixed defects
    - Impact analysis of changes

14. **Documentation Review:**
    - API spec accuracy verification
    - Endpoint behavior documentation completeness
    - Error code documentation validation

15. **Load Testing:**
    - 100+ concurrent booking creation requests
    - Sustained load for 10+ minutes
    - System stability assessment

16. **Compatibility Testing:**
    - JSON content-type handling
    - XML content-type handling
    - URL-encoded parameter handling

17. **Usability Testing:**
    - API response clarity and structure
    - Error message helpfulness
    - Endpoint naming consistency

18. **CI/CD Testing:**
    - Automated test suite integration
    - Build pipeline validation
    - Deployment verification

19. **Rate Limiting Testing:**
    - Rapid successive requests (100+/second)
    - Rate limit response verification
    - Recovery after rate limit threshold

---

## 4. Test Environments

| Name      | Env URL                                    | Purpose |
|-----------|-------------------------------------------|---------|
| Local     | http://localhost:3001                     | Development testing |
| QA        | https://restful-booker.herokuapp.com      | Quality assurance |
| Pre-Prod  | https://qa-api.restful-booker.example.com | Final validation |

---

## 5. Defect Reporting Procedure

### Defect Lifecycle

**Discovery Phase:** During test execution, when a test case fails or unexpected behavior is observed, the defect is identified and documented.

**Reporting Phase:** The defect is logged in JIRA with complete reproduction steps, expected vs. actual behavior, screenshots/logs, and severity classification.

**Triage Phase:** The QA Lead and Backend Developer review the defect, confirm reproducibility, assess severity and priority, and assign to the appropriate development team member.

**Resolution Phase:** The assigned developer implements the fix, creates a pull request, undergoes code review, and commits the change.

**Verification Phase:** QA re-executes the original failing test case to confirm the fix resolves the issue and performs regression testing.

**Closure Phase:** Once verified, the defect is marked as "Resolved" in JIRA and tracked in metrics.

### Defect Severity Levels

- **Critical:** System crash, data loss, security vulnerability, core functionality broken
- **Major:** Feature non-functional, significant workaround required
- **Minor:** Minor functionality issue, cosmetic problem
- **Trivial:** Typo, documentation, low-impact issue

### Defect Reporting Template

```
Title: [Component] - Brief description of the defect

Description:
- Steps to reproduce (numbered list)
- Expected behavior
- Actual behavior
- Impact on users

Severity: Critical | Major | Minor | Trivial
Priority: P1 | P2 | P3 | P4

Environment: QA | Pre-Prod

Test Case: [TC ID that failed]

Attachments: Screenshots, logs, API responses
```

### Defect POC (Point of Contact)

| Defect Process | POC          |
|----------------|--------------|
| Frontend       | Devesh       |
| Backend        | Sonal        |
| DevOps         | Prajeeth     |

---

## 6. Test Strategy

### Step 1: Test Design Techniques

The test cases will be designed using industry-standard techniques to maximize coverage and defect detection:

- **Equivalence Class Partitioning (ECP):** Divide input domains into classes and test one representative from each class. For example, for booking creation, partition names into: valid names, special characters, unicode, empty, null.

- **Boundary Value Analysis (BVA):** Test at boundaries of input domains. For totalprice, test: 0, 1, -1, 9999.99, 999999.99. For dates, test: minimum date, maximum date, today, past dates, future dates.

- **Decision Table Testing:** Test combinations of conditions. For example, authentication scenarios: (token present/absent) × (token valid/invalid) × (endpoint protected/unprotected).

- **State Transition Testing:** Test transitions between booking states: Created → Updated → Deleted. Verify invalid transitions are rejected.

- **Use Case Testing:** Real-world user scenarios: "User creates booking, retrieves it, updates guest details, then cancels."

- **Error Guessing:** Based on API expertise, predict likely failure points: division by zero, null pointer, empty arrays, missing headers.

- **Exploratory Testing:** Unscripted testing with focus on discovering undocumented behaviors and edge cases.

### Step 2: Testing Procedure

Testing will follow a phased approach to ensure comprehensive coverage:

1. **Smoke Testing (Week 1):** Quick sanity check of all endpoints. Verify basic CRUD operations work. 10-15 test cases covering happy paths.

2. **Functional Testing (Week 1-2):** Detailed testing of all endpoint features. Test all parameters, fields, and options. 50-100 test cases covering normal scenarios.

3. **Negative Testing (Week 2):** Test error scenarios, invalid inputs, boundary values. 30-50 test cases covering error paths.

4. **Integration Testing (Week 2):** Test multi-endpoint workflows and data consistency. 20-30 test cases covering end-to-end scenarios.

5. **Performance Testing (Week 3):** Measure response times, throughput, load capacity. Benchmark all endpoints.

6. **Security Testing (Week 3):** Test authentication, authorization, injection attacks. Verify no sensitive data leaks.

7. **Regression Testing (Week 4):** Re-execute all test cases after defect fixes. Verify no new issues introduced.

### Step 3: Best Practices

- **Context-Driven Testing:** Adapt testing strategy based on project context, risks, stakeholder concerns. Not all tests have equal value.

- **Shift-Left Principles:** Involve testers early in requirements phase. Test design begins before code implementation. Automate at multiple levels (unit, API, UI).

- **Exploratory Testing:** Balance scripted tests with unscripted exploration. Maximum defect discovery through creative scenarios.

- **End-to-End Flow Testing:** Test complete user journeys: Create booking → Retrieve details → Update → Delete. Verify data integrity across operations.

- **Test Independence:** Each test case is independent and can run in any order. No test depends on output of previous test.

- **Assertion Completeness:** Verify not just HTTP status code, but also response body structure, field types, and values.

---

## 7. Test Schedule

| Task                      | Sprint 1 | Sprint 2 | Sprint 3 | Sprint 4 |
|---------------------------|----------|----------|----------|----------|
| Create Test Plan          | Week 1-2 | —        | —        | —        |
| Test Case Creation        | Week 2-3 | Week 1   | —        | —        |
| Test Case Execution       | Week 3-4 | Week 2-3 | Week 1-2 | —        |
| Summary Reports Submission| Week 4   | Week 3   | Week 2-3 | Week 1-2 |

**Sprint Duration:** 4 weeks per sprint

**Key Milestones:**
- End of Sprint 1: Test plan finalized, 50% of test cases created
- End of Sprint 2: All test cases completed, smoke testing passed
- End of Sprint 3: All functional and integration testing completed
- End of Sprint 4: All testing completed, defects resolved, final reports submitted

---

## 8. Test Deliverables

The following deliverables will be produced during the testing effort:

1. **Test Plan Document** (this document)
   - Complete testing strategy and approach
   - 12 sections covering all aspects of testing

2. **Test Cases Document**
   - Detailed test case specifications with test data
   - 100+ test cases organized by endpoint
   - Traceability matrix linking tests to requirements

3. **Test Execution Report**
   - Pass/fail results for all executed test cases
   - Defects found during execution
   - Coverage metrics

4. **Defect Summary Report**
   - List of all defects discovered
   - Severity distribution (Critical, Major, Minor, Trivial)
   - Open vs. closed defect counts
   - Timeline of defect discovery

5. **Coverage Report**
   - Requirements vs. test case mapping
   - Coverage percentage for each endpoint
   - Coverage gaps identified

6. **Performance Report**
   - Response time benchmarks for each endpoint
   - Load testing results
   - Performance improvements/regressions

7. **Lessons Learned Document**
   - What went well during testing
   - What could be improved
   - Recommendations for future testing
   - Process improvements

---

## 9. Entry and Exit Criteria

### Phase 1: Requirement Analysis

**Entry Criteria:**
- API specification document finalized and approved
- Restful-Booker API endpoints accessible and operational
- Test team assigned and available
- Testing tools (Postman, REST Assured, JIRA) configured and accessible

**Exit Criteria:**
- All API requirements documented and understood
- Requirements mapped to test cases (traceability matrix created)
- Test plan reviewed and approved by stakeholders
- No blocking issues or unknowns remain

### Phase 2: Test Execution

**Entry Criteria:**
- All test cases designed and approved
- Test environment (QA) stable and verified
- Test team trained on test cases and procedures
- Defect reporting procedure documented and communicated

**Exit Criteria:**
- All planned test cases executed
- Execution results documented with pass/fail status
- All defects logged in JIRA with reproduction steps
- Regression testing completed for fixed defects
- Test coverage metrics acceptable (>80% requirement coverage)

### Phase 3: Test Closure

**Entry Criteria:**
- All test cases executed
- All defects from planned testing addressed (fixed or deferred)
- Performance and security testing completed
- Final regression testing passed

**Exit Criteria:**
- All test deliverables completed and reviewed
- Defect trends analyzed and documented
- Lessons learned documented
- Test plan approval signed off by stakeholders
- Project team notified of testing completion
- All artifacts archived for future reference

---

## 10. Tools

The following tools will be used during the testing effort:

- **Postman:** Manual and exploratory API testing, request/response validation, collection sharing
- **REST Assured:** Java-based API automation, CI/CD integration, comprehensive assertions
- **JIRA:** Defect tracking, test case management, reporting and analytics
- **GitHub:** Version control for test code, pull requests, code review
- **Jenkins:** CI/CD pipeline automation, automated test execution
- **SonarQube:** Code quality analysis, static code review
- **JMeter:** Load and performance testing, concurrent user simulation

---

## 11. Risks and Mitigations

| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|--------|---------------------|
| Test environment becomes unavailable | Medium | High | Maintain local test environment as fallback. Document setup procedure for rapid recovery. |
| Insufficient test data for comprehensive testing | Low | High | Create comprehensive test data sets upfront. Implement data generation utilities. Maintain data refresh scripts. |
| Key team member unavailability | Low | Medium | Cross-train team members on test procedures. Document test execution steps. Maintain backup resources. |
| API specification changes during testing | Medium | Medium | Implement change control process. Re-plan tests when significant changes occur. Communicate changes to team promptly. |
| Defects found late in testing | Medium | High | Prioritize high-risk areas early. Use exploratory testing alongside scripted tests. Implement continuous defect reporting. |
| Performance degradation in production | Low | Critical | Establish performance baselines early. Run regular performance tests. Monitor production metrics. Have rollback plan ready. |

---

## 12. Approvals

The following stakeholders must review and approve this test plan:

- **QA Lead Sign-off:** Verifies test plan completeness, methodology soundness, and team readiness.
- **Product Owner Sign-off:** Confirms requirements coverage, scope alignment, and business priorities.
- **Backend Development Lead Sign-off:** Approves technical approach, environment setup, and integration points.
- **DevOps Lead Sign-off:** Confirms environment availability, monitoring setup, and CI/CD integration.

---

## Test Cases

---

### POST /auth — CreateToken

#### TC_AUTH_001: Create Auth Token with Valid Credentials
- **Type:** Functional | **Priority:** P1-Critical
- **Description:** Verify token generation with correct username and password
- **Preconditions:** Credentials known (default: admin/password123)
- **Steps:**
  1. Send POST request to /auth with valid credentials
  2. Validate response status code is 200
  3. Verify token is returned in response body
- **Expected Result:** Token successfully generated and can be used for subsequent requests
- **Test Data:** `{"username": "admin", "password": "password123"}`

#### TC_AUTH_002: Create Auth Token with Invalid Password
- **Type:** Error Handling | **Priority:** P1-Critical
- **Description:** Verify rejection of incorrect password
- **Steps:**
  1. Send POST request to /auth with correct username, wrong password
  2. Validate response status code is 401
- **Expected Result:** Unauthorized response (401), no token generated
- **Test Data:** `{"username": "admin", "password": "wrongpassword"}`

#### TC_AUTH_003: Create Auth Token with Missing Username
- **Type:** Error Handling | **Priority:** P2-Major
- **Description:** Verify handling of missing required field
- **Steps:**
  1. Send POST request to /auth without username field
  2. Validate response status code is 400
- **Expected Result:** Bad Request response (400)
- **Test Data:** `{"password": "password123"}`

#### TC_AUTH_004: Create Auth Token with Empty Username
- **Type:** Boundary Testing | **Priority:** P2-Major
- **Description:** Verify handling of empty username value
- **Steps:**
  1. Send POST request to /auth with empty username
  2. Validate response status code is 401 or 400
- **Expected Result:** Error response
- **Test Data:** `{"username": "", "password": "password123"}`

---

### GET /booking — GetBookingIds

#### TC_GET_BOOKINGS_001: Retrieve All Booking IDs
- **Type:** Functional | **Priority:** P1-Critical
- **Description:** Verify retrieval of all booking IDs
- **Steps:**
  1. Send GET request to /booking without filters
  2. Validate response status code is 200
  3. Verify response is array of booking IDs
- **Expected Result:** Array of booking IDs returned successfully

#### TC_GET_BOOKINGS_002: Filter Bookings by Firstname
- **Type:** Functional | **Priority:** P2-Major
- **Description:** Verify filtering bookings by guest firstname
- **Steps:**
  1. Send GET request to /booking?firstname=John
  2. Validate response contains only bookings with matching firstname
- **Expected Result:** Filtered booking list returned

#### TC_GET_BOOKINGS_003: Filter Bookings by Date Range
- **Type:** Functional | **Priority:** P2-Major
- **Description:** Verify filtering bookings by check-in and check-out dates
- **Steps:**
  1. Send GET request with checkin and checkout parameters
  2. Validate returned bookings fall within date range
- **Expected Result:** Bookings within specified date range returned

#### TC_GET_BOOKINGS_004: Get Bookings with Invalid Filter
- **Type:** Error Handling | **Priority:** P2-Major
- **Description:** Verify handling of invalid filter parameters
- **Steps:**
  1. Send GET request with malformed date parameter
  2. Validate response behavior
- **Expected Result:** Either 400 error or empty results

---

### GET /booking/:id — GetBooking

#### TC_GET_BOOKING_001: Retrieve Booking with Valid ID
- **Type:** Functional | **Priority:** P1-Critical
- **Description:** Verify retrieval of booking details by ID
- **Steps:**
  1. Create a booking and capture its ID
  2. Send GET request to /booking/:id with valid ID
  3. Validate response status code is 200
  4. Verify all booking fields present in response
- **Expected Result:** Complete booking object returned

#### TC_GET_BOOKING_002: Retrieve Booking with Invalid ID
- **Type:** Error Handling | **Priority:** P2-Major
- **Description:** Verify handling of non-existent booking ID
- **Steps:**
  1. Send GET request to /booking/99999 (non-existent ID)
  2. Validate response status code is 404
- **Expected Result:** 404 Not Found response

#### TC_GET_BOOKING_003: Retrieve Booking with Malformed ID
- **Type:** Boundary Testing | **Priority:** P2-Major
- **Description:** Verify handling of non-numeric ID
- **Steps:**
  1. Send GET request to /booking/abc123
  2. Validate response handling
- **Expected Result:** 400 Bad Request or 404 Not Found

---

### POST /booking — CreateBooking

#### TC_CREATE_BOOKING_001: Create Booking with Valid Data
- **Type:** Functional | **Priority:** P1-Critical
- **Description:** Verify booking creation with all required fields
- **Steps:**
  1. Send POST request to /booking with valid payload
  2. Validate response status code is 200
  3. Verify booking ID returned in response
  4. Verify booking can be retrieved with returned ID
- **Expected Result:** Booking created successfully with unique ID
- **Test Data:** `{"firstname": "John", "lastname": "Smith", "totalprice": 150, "depositpaid": true, "bookingdates": {"checkin": "2026-07-01", "checkout": "2026-07-05"}, "additionalneeds": "Early checkin"}`

#### TC_CREATE_BOOKING_002: Create Booking without Optional Field
- **Type:** Functional | **Priority:** P2-Major
- **Description:** Verify booking creation without additionalneeds
- **Steps:**
  1. Send POST request without additionalneeds field
  2. Validate successful creation
- **Expected Result:** Booking created successfully

#### TC_CREATE_BOOKING_003: Create Booking with Invalid Date Format
- **Type:** Data Validation | **Priority:** P2-Major
- **Description:** Verify rejection of invalid date format
- **Steps:**
  1. Send POST request with malformed date
  2. Validate error response
- **Expected Result:** 400 Bad Request response

#### TC_CREATE_BOOKING_004: Create Booking with Checkout Before Checkin
- **Type:** Business Logic | **Priority:** P2-Major
- **Description:** Verify rejection of invalid date range
- **Steps:**
  1. Send POST request with checkout date before checkin date
  2. Validate API response
- **Expected Result:** Either rejection or acceptance depending on API design

#### TC_CREATE_BOOKING_005: Create Booking with Missing Required Field
- **Type:** Error Handling | **Priority:** P1-Critical
- **Description:** Verify validation of required fields
- **Steps:**
  1. Send POST request without firstname
  2. Validate 400 Bad Request response
- **Expected Result:** Error response indicating missing field

#### TC_CREATE_BOOKING_006: Create Booking with Special Characters
- **Type:** Data Validation | **Priority:** P2-Major
- **Description:** Verify handling of special characters in names
- **Steps:**
  1. Send POST request with special characters (é, ñ, ü)
  2. Verify successful creation and retrieval
- **Expected Result:** Special characters preserved and stored correctly

---

### PUT /booking/:id — UpdateBooking

#### TC_UPDATE_BOOKING_001: Update Booking with Valid Data
- **Type:** Functional | **Priority:** P1-Critical
- **Description:** Verify booking update with authentication
- **Preconditions:** Auth token obtained, booking exists
- **Steps:**
  1. Generate auth token
  2. Send PUT request to /booking/:id with token and updated data
  3. Validate response status code is 200
  4. Verify booking details updated
- **Expected Result:** Booking updated successfully

#### TC_UPDATE_BOOKING_002: Update Booking without Auth Token
- **Type:** Security | **Priority:** P1-Critical
- **Description:** Verify authentication requirement
- **Steps:**
  1. Send PUT request without auth token
  2. Validate 403 Forbidden response
- **Expected Result:** 403 Forbidden (or 401 Unauthorized)

#### TC_UPDATE_BOOKING_003: Update Booking with Invalid Token
- **Type:** Security | **Priority:** P1-Critical
- **Description:** Verify rejection of invalid token
- **Steps:**
  1. Send PUT request with malformed token
  2. Validate rejection
- **Expected Result:** 403 Forbidden response

#### TC_UPDATE_BOOKING_004: Update Non-Existent Booking
- **Type:** Error Handling | **Priority:** P2-Major
- **Description:** Verify handling of non-existent booking
- **Steps:**
  1. Send PUT request to /booking/99999 with valid token
  2. Validate 404 Not Found response
- **Expected Result:** 404 Not Found

---

### DELETE /booking/:id — DeleteBooking

#### TC_DELETE_BOOKING_001: Delete Booking with Valid Auth
- **Type:** Functional | **Priority:** P1-Critical
- **Description:** Verify booking deletion with authentication
- **Preconditions:** Auth token obtained, booking exists
- **Steps:**
  1. Generate auth token
  2. Send DELETE request to /booking/:id with token
  3. Validate response status code is 201
  4. Attempt to retrieve deleted booking (should fail)
- **Expected Result:** Booking deleted successfully (201 Created)

#### TC_DELETE_BOOKING_002: Delete Booking without Auth Token
- **Type:** Security | **Priority:** P1-Critical
- **Description:** Verify authentication requirement for deletion
- **Steps:**
  1. Send DELETE request without auth token
  2. Validate 403 Forbidden response
- **Expected Result:** 403 Forbidden (or 401 Unauthorized)

#### TC_DELETE_BOOKING_003: Delete Already-Deleted Booking
- **Type:** Error Handling | **Priority:** P2-Major
- **Description:** Verify handling of deletion of non-existent booking
- **Steps:**
  1. Delete a booking
  2. Attempt to delete same booking again
  3. Validate 404 Not Found response
- **Expected Result:** 404 Not Found

#### TC_DELETE_BOOKING_004: Delete Non-Existent Booking
- **Type:** Error Handling | **Priority:** P2-Major
- **Description:** Verify handling of non-existent booking
- **Steps:**
  1. Send DELETE request to /booking/99999 with valid token
  2. Validate 404 Not Found response
- **Expected Result:** 404 Not Found

---

### PATCH /booking/:id — PartialUpdateBooking

#### TC_PATCH_BOOKING_001: Partial Update Booking with Single Field
- **Type:** Functional | **Priority:** P2-Major
- **Description:** Verify partial update of booking
- **Preconditions:** Auth token obtained, booking exists
- **Steps:**
  1. Send PATCH request with single field update (e.g., firstname only)
  2. Validate response status code is 200
  3. Verify only specified field updated
- **Expected Result:** Booking partially updated successfully

#### TC_PATCH_BOOKING_002: Partial Update without Auth Token
- **Type:** Security | **Priority:** P2-Major
- **Description:** Verify authentication requirement for partial update
- **Steps:**
  1. Send PATCH request without auth token
  2. Validate 403 Forbidden response
- **Expected Result:** 403 Forbidden

---

## Integration Test Cases

#### TC_INTEGRATION_001: Complete CRUD Workflow
- **Type:** Integration | **Priority:** P1-Critical
- **Description:** Verify complete Create → Read → Update → Delete workflow
- **Steps:**
  1. Create new booking with POST
  2. Retrieve booking details with GET
  3. Update booking with PUT
  4. Retrieve updated booking to verify changes
  5. Delete booking with DELETE
  6. Attempt to retrieve deleted booking (should fail)
- **Expected Result:** All operations successful, data consistency maintained

#### TC_INTEGRATION_002: Multiple Concurrent Creates
- **Type:** Concurrency | **Priority:** P2-Major
- **Description:** Verify system handles concurrent booking creations
- **Steps:**
  1. Send 10 simultaneous POST requests to create bookings
  2. Verify all bookings created successfully
  3. Verify each booking has unique ID
- **Expected Result:** All bookings created with no ID collisions

#### TC_INTEGRATION_003: Create and Filter
- **Type:** Integration | **Priority:** P2-Major
- **Description:** Verify created bookings appear in filtered results
- **Steps:**
  1. Create booking with specific firstname
  2. Query /booking?firstname=X
  3. Verify created booking appears in results
- **Expected Result:** Created booking found in filtered results

---

**End of Test Plan**

Generated: June 14, 2026  
Framework: RICE-POT  
Status: Production Ready ✅

