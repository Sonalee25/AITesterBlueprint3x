/* ============================================
   TestForge — RICE-POT Test Plan Generator
   Application Logic
   ============================================ */

// ======================
// API Endpoint Definitions
// ======================
const ENDPOINTS = {
    auth: {
        method: 'POST', path: '/auth', name: 'CreateToken',
        description: 'Creates a new auth token to use for access to the PUT and DELETE /booking endpoints.',
        request: [
            { field: 'username', type: 'String', required: true, desc: 'Username for authentication (default: admin)' },
            { field: 'password', type: 'String', required: true, desc: 'Password for authentication (default: password123)' }
        ],
        response: [
            { field: 'token', type: 'String', desc: 'Token to use in future requests' }
        ],
        headers: [
            { field: 'Content-Type', type: 'string', desc: 'application/json' }
        ]
    },
    getBookingIds: {
        method: 'GET', path: '/booking', name: 'GetBookingIds',
        description: 'Returns the IDs of all bookings. Can take optional query strings to filter by name or dates.',
        request: [
            { field: 'firstname', type: 'String', required: false, desc: 'Filter by guest firstname' },
            { field: 'lastname', type: 'String', required: false, desc: 'Filter by guest lastname' },
            { field: 'checkin', type: 'Date', required: false, desc: 'Filter by checkin date (CCYY-MM-DD)' },
            { field: 'checkout', type: 'Date', required: false, desc: 'Filter by checkout date (CCYY-MM-DD)' }
        ],
        response: [
            { field: 'bookingid', type: 'Number', desc: 'ID of a specific booking' }
        ],
        headers: []
    },
    getBooking: {
        method: 'GET', path: '/booking/:id', name: 'GetBooking',
        description: 'Returns a specific booking based upon the booking ID provided.',
        request: [
            { field: 'id', type: 'Number', required: true, desc: 'The ID of the booking to retrieve (URL param)' }
        ],
        response: [
            { field: 'firstname', type: 'String', desc: 'Firstname of the guest' },
            { field: 'lastname', type: 'String', desc: 'Lastname of the guest' },
            { field: 'totalprice', type: 'Number', desc: 'Total price for the booking' },
            { field: 'depositpaid', type: 'Boolean', desc: 'Whether deposit has been paid' },
            { field: 'bookingdates.checkin', type: 'Date', desc: 'Check-in date' },
            { field: 'bookingdates.checkout', type: 'Date', desc: 'Check-out date' },
            { field: 'additionalneeds', type: 'String', desc: 'Additional guest needs' }
        ],
        headers: [
            { field: 'Accept', type: 'string', desc: 'application/json or application/xml' }
        ]
    },
    createBooking: {
        method: 'POST', path: '/booking', name: 'CreateBooking',
        description: 'Creates a new booking in the API.',
        request: [
            { field: 'firstname', type: 'String', required: true, desc: 'Firstname of the guest' },
            { field: 'lastname', type: 'String', required: true, desc: 'Lastname of the guest' },
            { field: 'totalprice', type: 'Number', required: true, desc: 'Total price for the booking' },
            { field: 'depositpaid', type: 'Boolean', required: true, desc: 'Whether deposit has been paid' },
            { field: 'bookingdates.checkin', type: 'Date', required: true, desc: 'Check-in date' },
            { field: 'bookingdates.checkout', type: 'Date', required: true, desc: 'Check-out date' },
            { field: 'additionalneeds', type: 'String', required: false, desc: 'Additional guest needs' }
        ],
        response: [
            { field: 'bookingid', type: 'Number', desc: 'ID for newly created booking' },
            { field: 'booking', type: 'Object', desc: 'The full booking object' }
        ],
        headers: [
            { field: 'Content-Type', type: 'string', desc: 'application/json or text/xml' },
            { field: 'Accept', type: 'string', desc: 'application/json or application/xml' }
        ]
    },
    updateBooking: {
        method: 'PUT', path: '/booking/:id', name: 'UpdateBooking',
        description: 'Updates a current booking. Requires auth token or Basic Auth.',
        request: [
            { field: 'firstname', type: 'String', required: true, desc: 'Firstname of the guest' },
            { field: 'lastname', type: 'String', required: true, desc: 'Lastname of the guest' },
            { field: 'totalprice', type: 'Number', required: true, desc: 'Total price for the booking' },
            { field: 'depositpaid', type: 'Boolean', required: true, desc: 'Whether deposit has been paid' },
            { field: 'bookingdates.checkin', type: 'Date', required: true, desc: 'Check-in date' },
            { field: 'bookingdates.checkout', type: 'Date', required: true, desc: 'Check-out date' },
            { field: 'additionalneeds', type: 'String', required: false, desc: 'Additional guest needs' }
        ],
        response: [
            { field: 'firstname', type: 'String', desc: 'Updated firstname' },
            { field: 'lastname', type: 'String', desc: 'Updated lastname' },
            { field: 'totalprice', type: 'Number', desc: 'Updated total price' },
            { field: 'depositpaid', type: 'Boolean', desc: 'Updated deposit status' },
            { field: 'bookingdates', type: 'Object', desc: 'Updated dates object' },
            { field: 'additionalneeds', type: 'String', desc: 'Updated additional needs' }
        ],
        headers: [
            { field: 'Content-Type', type: 'string', desc: 'application/json or text/xml' },
            { field: 'Accept', type: 'string', desc: 'application/json or application/xml' },
            { field: 'Cookie', type: 'string', desc: 'token=<token_value>' },
            { field: 'Authorization', type: 'string', desc: 'Basic YWRtaW46cGFzc3dvcmQxMjM=' }
        ]
    },
    partialUpdate: {
        method: 'PATCH', path: '/booking/:id', name: 'PartialUpdateBooking',
        description: 'Updates a current booking with a partial payload. Requires auth token or Basic Auth.',
        request: [
            { field: 'firstname', type: 'String', required: false, desc: 'Firstname of the guest' },
            { field: 'lastname', type: 'String', required: false, desc: 'Lastname of the guest' },
            { field: 'totalprice', type: 'Number', required: false, desc: 'Total price for the booking' },
            { field: 'depositpaid', type: 'Boolean', required: false, desc: 'Whether deposit has been paid' },
            { field: 'bookingdates.checkin', type: 'Date', required: false, desc: 'Check-in date' },
            { field: 'bookingdates.checkout', type: 'Date', required: false, desc: 'Check-out date' },
            { field: 'additionalneeds', type: 'String', required: false, desc: 'Additional guest needs' }
        ],
        response: [
            { field: 'firstname', type: 'String', desc: 'Updated firstname' },
            { field: 'lastname', type: 'String', desc: 'Updated lastname' },
            { field: 'totalprice', type: 'Number', desc: 'Updated total price' },
            { field: 'depositpaid', type: 'Boolean', desc: 'Updated deposit status' },
            { field: 'bookingdates', type: 'Object', desc: 'Updated dates object' },
            { field: 'additionalneeds', type: 'String', desc: 'Updated additional needs' }
        ],
        headers: [
            { field: 'Content-Type', type: 'string', desc: 'application/json or text/xml' },
            { field: 'Accept', type: 'string', desc: 'application/json or application/xml' },
            { field: 'Cookie', type: 'string', desc: 'token=<token_value>' },
            { field: 'Authorization', type: 'string', desc: 'Basic YWRtaW46cGFzc3dvcmQxMjM=' }
        ]
    },
    deleteBooking: {
        method: 'DELETE', path: '/booking/:id', name: 'DeleteBooking',
        description: 'Deletes a booking from the API. Requires auth token or Basic Auth.',
        request: [
            { field: 'id', type: 'Number', required: true, desc: 'ID of the booking to delete (URL param)' }
        ],
        response: [
            { field: 'OK', type: 'String', desc: 'HTTP 201 Created response' }
        ],
        headers: [
            { field: 'Cookie', type: 'string', desc: 'token=<token_value>' },
            { field: 'Authorization', type: 'string', desc: 'Basic YWRtaW46cGFzc3dvcmQxMjM=' }
        ]
    },
    healthCheck: {
        method: 'GET', path: '/ping', name: 'HealthCheck',
        description: 'A simple health check endpoint to confirm whether the API is up and running.',
        request: [],
        response: [
            { field: 'OK', type: 'String', desc: 'HTTP 201 Created response' }
        ],
        headers: []
    }
};

// ======================
// Test Case Database (RICE-POT Comprehensive)
// ======================
const TEST_CASES_DB = {
    auth: [
        {
            id: 'TC-AUTH-001', title: 'Create token with valid credentials',
            type: 'functional', priority: 'critical',
            description: 'Verify that a valid auth token is returned when correct username and password are provided.',
            steps: ['Send POST request to /auth', 'Set Content-Type to application/json', 'Provide body: {"username":"admin","password":"password123"}'],
            expected: 'HTTP 200 OK with response body containing a valid token string',
            data: '{"username":"admin","password":"password123"}'
        },
        {
            id: 'TC-AUTH-002', title: 'Create token with invalid username',
            type: 'negative', priority: 'high',
            description: 'Verify that authentication fails when an invalid username is provided.',
            steps: ['Send POST request to /auth', 'Provide body: {"username":"wronguser","password":"password123"}'],
            expected: 'HTTP 200 with response body: {"reason":"Bad credentials"}',
            data: '{"username":"wronguser","password":"password123"}'
        },
        {
            id: 'TC-AUTH-003', title: 'Create token with invalid password',
            type: 'negative', priority: 'high',
            description: 'Verify that authentication fails when an invalid password is provided.',
            steps: ['Send POST request to /auth', 'Provide body: {"username":"admin","password":"wrongpass"}'],
            expected: 'HTTP 200 with response body: {"reason":"Bad credentials"}',
            data: '{"username":"admin","password":"wrongpass"}'
        },
        {
            id: 'TC-AUTH-004', title: 'Create token with empty body',
            type: 'negative', priority: 'high',
            description: 'Verify error handling when request body is empty.',
            steps: ['Send POST request to /auth', 'Send empty body: {}'],
            expected: 'HTTP 200 with response body: {"reason":"Bad credentials"}',
            data: '{}'
        },
        {
            id: 'TC-AUTH-005', title: 'Create token without Content-Type header',
            type: 'negative', priority: 'medium',
            description: 'Verify behavior when Content-Type header is missing.',
            steps: ['Send POST request to /auth', 'Omit Content-Type header', 'Provide valid credentials in body'],
            expected: 'Server should handle gracefully — return error or process if defaults are in place',
            data: '{"username":"admin","password":"password123"}'
        },
        {
            id: 'TC-AUTH-006', title: 'SQL injection in username field',
            type: 'security', priority: 'critical',
            description: 'Verify the API is protected against SQL injection attacks in the username field.',
            steps: ['Send POST request to /auth', 'Provide body with SQL injection payload in username'],
            expected: 'HTTP 200 with {"reason":"Bad credentials"} — no SQL error exposed',
            data: '{"username":"\' OR 1=1 --","password":"password123"}'
        },
        {
            id: 'TC-AUTH-007', title: 'XSS payload in password field',
            type: 'security', priority: 'high',
            description: 'Verify the API sanitizes XSS payloads in the password field.',
            steps: ['Send POST request to /auth', 'Provide body with XSS script in password field'],
            expected: 'Request should be rejected or sanitized without executing script',
            data: '{"username":"admin","password":"<script>alert(1)</script>"}'
        },
        {
            id: 'TC-AUTH-008', title: 'Create token with extremely long username',
            type: 'boundary', priority: 'medium',
            description: 'Verify handling of oversized username input (boundary value analysis).',
            steps: ['Send POST request to /auth', 'Provide username with 10000+ characters'],
            expected: 'Server handles gracefully — returns Bad credentials or appropriate error',
            data: '{"username":"' + 'a'.repeat(50) + '...","password":"password123"}'
        },
        {
            id: 'TC-AUTH-009', title: 'Create token with special characters in credentials',
            type: 'boundary', priority: 'medium',
            description: 'Verify handling of special characters and unicode in credential fields.',
            steps: ['Send POST request to /auth', 'Provide credentials with special chars: !@#$%^&*()'],
            expected: 'Should return Bad credentials without server error',
            data: '{"username":"admin!@#$","password":"p@$$w0rd!#%"}'
        },
        {
            id: 'TC-AUTH-010', title: 'Auth endpoint response time under load',
            type: 'performance', priority: 'medium',
            description: 'Verify the /auth endpoint responds within acceptable time limits.',
            steps: ['Send POST request to /auth with valid credentials', 'Measure response time', 'Repeat 50 times and calculate average'],
            expected: 'Average response time should be under 2 seconds',
            data: '{"username":"admin","password":"password123"}'
        }
    ],
    getBookingIds: [
        {
            id: 'TC-GBI-001', title: 'Get all booking IDs',
            type: 'functional', priority: 'critical',
            description: 'Verify that all booking IDs are returned when no filters are applied.',
            steps: ['Send GET request to /booking', 'No query parameters'],
            expected: 'HTTP 200 OK with array of booking ID objects: [{bookingid: 1}, ...]',
            data: 'GET /booking'
        },
        {
            id: 'TC-GBI-002', title: 'Filter bookings by firstname',
            type: 'functional', priority: 'high',
            description: 'Verify filtering bookings by guest firstname.',
            steps: ['Send GET request to /booking?firstname=Sally'],
            expected: 'HTTP 200 OK with array of booking IDs matching firstname "Sally"',
            data: 'GET /booking?firstname=Sally'
        },
        {
            id: 'TC-GBI-003', title: 'Filter bookings by firstname and lastname',
            type: 'functional', priority: 'high',
            description: 'Verify filtering bookings by both firstname and lastname.',
            steps: ['Send GET request to /booking?firstname=Sally&lastname=Brown'],
            expected: 'HTTP 200 OK with filtered results',
            data: 'GET /booking?firstname=Sally&lastname=Brown'
        },
        {
            id: 'TC-GBI-004', title: 'Filter bookings by checkin date',
            type: 'functional', priority: 'high',
            description: 'Verify filtering bookings with checkin date greater than or equal to specified date.',
            steps: ['Send GET request to /booking?checkin=2014-03-13'],
            expected: 'HTTP 200 OK with bookings having checkin >= 2014-03-13',
            data: 'GET /booking?checkin=2014-03-13'
        },
        {
            id: 'TC-GBI-005', title: 'Filter bookings by checkout date',
            type: 'functional', priority: 'high',
            description: 'Verify filtering bookings by checkout date.',
            steps: ['Send GET request to /booking?checkout=2014-05-21'],
            expected: 'HTTP 200 OK with bookings having checkout >= 2014-05-21',
            data: 'GET /booking?checkout=2014-05-21'
        },
        {
            id: 'TC-GBI-006', title: 'Filter with non-existent firstname',
            type: 'negative', priority: 'medium',
            description: 'Verify response when filtering by a name that does not exist.',
            steps: ['Send GET request to /booking?firstname=NonExistentName12345'],
            expected: 'HTTP 200 OK with empty array []',
            data: 'GET /booking?firstname=NonExistentName12345'
        },
        {
            id: 'TC-GBI-007', title: 'Filter with invalid date format',
            type: 'boundary', priority: 'medium',
            description: 'Verify handling of invalid date format in checkin filter.',
            steps: ['Send GET request to /booking?checkin=invalid-date'],
            expected: 'Server handles gracefully — returns all bookings or error message',
            data: 'GET /booking?checkin=invalid-date'
        },
        {
            id: 'TC-GBI-008', title: 'Filter with SQL injection in query param',
            type: 'security', priority: 'critical',
            description: 'Verify protection against SQL injection in query parameters.',
            steps: ['Send GET request to /booking?firstname=\' OR 1=1 --'],
            expected: 'Should return empty array or handle safely without SQL error',
            data: "GET /booking?firstname=' OR 1=1 --"
        },
        {
            id: 'TC-GBI-009', title: 'Combined checkin and checkout date filter',
            type: 'functional', priority: 'medium',
            description: 'Verify filtering by both checkin and checkout date ranges.',
            steps: ['Send GET request to /booking?checkin=2014-03-13&checkout=2014-05-21'],
            expected: 'HTTP 200 OK with bookings matching both date criteria',
            data: 'GET /booking?checkin=2014-03-13&checkout=2014-05-21'
        },
        {
            id: 'TC-GBI-010', title: 'Get booking IDs with special characters in name filter',
            type: 'edge', priority: 'low',
            description: 'Verify edge case handling when special characters are in name filter.',
            steps: ['Send GET request with URL-encoded special characters'],
            expected: 'Should return empty array or handle gracefully',
            data: 'GET /booking?firstname=%3Cscript%3E'
        }
    ],
    getBooking: [
        {
            id: 'TC-GB-001', title: 'Get booking by valid ID',
            type: 'functional', priority: 'critical',
            description: 'Verify that a booking can be retrieved by a valid booking ID.',
            steps: ['Create a booking first', 'Send GET request to /booking/:id with the created booking ID', 'Set Accept header to application/json'],
            expected: 'HTTP 200 OK with full booking details including firstname, lastname, totalprice, depositpaid, bookingdates, additionalneeds',
            data: 'GET /booking/1'
        },
        {
            id: 'TC-GB-002', title: 'Get booking with XML Accept header',
            type: 'functional', priority: 'medium',
            description: 'Verify that booking is returned in XML format when Accept is application/xml.',
            steps: ['Send GET request to /booking/:id', 'Set Accept: application/xml'],
            expected: 'HTTP 200 OK with XML formatted booking response',
            data: 'GET /booking/1 (Accept: application/xml)'
        },
        {
            id: 'TC-GB-003', title: 'Get booking with non-existent ID',
            type: 'negative', priority: 'high',
            description: 'Verify error handling when requesting a booking that does not exist.',
            steps: ['Send GET request to /booking/999999'],
            expected: 'HTTP 404 Not Found',
            data: 'GET /booking/999999'
        },
        {
            id: 'TC-GB-004', title: 'Get booking with negative ID',
            type: 'boundary', priority: 'medium',
            description: 'Verify handling of negative booking ID value.',
            steps: ['Send GET request to /booking/-1'],
            expected: 'HTTP 404 Not Found or appropriate error',
            data: 'GET /booking/-1'
        },
        {
            id: 'TC-GB-005', title: 'Get booking with string ID',
            type: 'negative', priority: 'medium',
            description: 'Verify handling when a non-numeric string is passed as booking ID.',
            steps: ['Send GET request to /booking/abc'],
            expected: 'HTTP 404 Not Found or 400 Bad Request',
            data: 'GET /booking/abc'
        },
        {
            id: 'TC-GB-006', title: 'Get booking with zero ID',
            type: 'boundary', priority: 'low',
            description: 'Verify handling of zero as booking ID (boundary value).',
            steps: ['Send GET request to /booking/0'],
            expected: 'HTTP 404 Not Found',
            data: 'GET /booking/0'
        },
        {
            id: 'TC-GB-007', title: 'Verify all response fields are present',
            type: 'data', priority: 'high',
            description: 'Validate that all expected fields are present and correctly typed in the response.',
            steps: ['Send GET request to /booking/:id with valid ID', 'Validate firstname is String', 'Validate lastname is String', 'Validate totalprice is Number', 'Validate depositpaid is Boolean', 'Validate bookingdates is Object with checkin and checkout', 'Validate additionalneeds is String'],
            expected: 'All fields present with correct data types',
            data: 'GET /booking/1'
        }
    ],
    createBooking: [
        {
            id: 'TC-CB-001', title: 'Create booking with all valid fields',
            type: 'functional', priority: 'critical',
            description: 'Verify a new booking is created successfully with all required fields.',
            steps: ['Send POST request to /booking', 'Set Content-Type: application/json', 'Provide all required fields in request body'],
            expected: 'HTTP 200 OK with bookingid and complete booking object in response',
            data: '{"firstname":"Jim","lastname":"Brown","totalprice":111,"depositpaid":true,"bookingdates":{"checkin":"2018-01-01","checkout":"2019-01-01"},"additionalneeds":"Breakfast"}'
        },
        {
            id: 'TC-CB-002', title: 'Create booking without optional additionalneeds',
            type: 'functional', priority: 'high',
            description: 'Verify booking creation succeeds when optional field additionalneeds is omitted.',
            steps: ['Send POST request to /booking', 'Omit additionalneeds field from body'],
            expected: 'HTTP 200 OK — booking created without additionalneeds',
            data: '{"firstname":"Jim","lastname":"Brown","totalprice":111,"depositpaid":true,"bookingdates":{"checkin":"2018-01-01","checkout":"2019-01-01"}}'
        },
        {
            id: 'TC-CB-003', title: 'Create booking with XML content type',
            type: 'functional', priority: 'medium',
            description: 'Verify booking creation works with XML payload.',
            steps: ['Send POST request to /booking', 'Set Content-Type: text/xml', 'Provide XML formatted booking data'],
            expected: 'HTTP 200 OK with booking created and returned in XML format',
            data: '<booking><firstname>Jim</firstname><lastname>Brown</lastname>...</booking>'
        },
        {
            id: 'TC-CB-004', title: 'Create booking with missing firstname',
            type: 'negative', priority: 'high',
            description: 'Verify error handling when required field firstname is missing.',
            steps: ['Send POST request to /booking', 'Omit firstname from body'],
            expected: 'HTTP 500 Internal Server Error or 400 Bad Request',
            data: '{"lastname":"Brown","totalprice":111,"depositpaid":true,"bookingdates":{"checkin":"2018-01-01","checkout":"2019-01-01"}}'
        },
        {
            id: 'TC-CB-005', title: 'Create booking with missing lastname',
            type: 'negative', priority: 'high',
            description: 'Verify error handling when required field lastname is missing.',
            steps: ['Send POST request to /booking', 'Omit lastname from body'],
            expected: 'HTTP 500 Internal Server Error or 400 Bad Request',
            data: '{"firstname":"Jim","totalprice":111,"depositpaid":true,"bookingdates":{"checkin":"2018-01-01","checkout":"2019-01-01"}}'
        },
        {
            id: 'TC-CB-006', title: 'Create booking with negative totalprice',
            type: 'boundary', priority: 'medium',
            description: 'Verify handling of negative total price value (boundary value analysis).',
            steps: ['Send POST request to /booking', 'Set totalprice to -100'],
            expected: 'Should reject with validation error or accept with negative value',
            data: '{"firstname":"Jim","lastname":"Brown","totalprice":-100,"depositpaid":true,"bookingdates":{"checkin":"2018-01-01","checkout":"2019-01-01"}}'
        },
        {
            id: 'TC-CB-007', title: 'Create booking with zero totalprice',
            type: 'boundary', priority: 'low',
            description: 'Verify handling of zero as total price (boundary value).',
            steps: ['Send POST request to /booking', 'Set totalprice to 0'],
            expected: 'Booking should be created with totalprice 0',
            data: '{"firstname":"Jim","lastname":"Brown","totalprice":0,"depositpaid":false,"bookingdates":{"checkin":"2018-01-01","checkout":"2019-01-01"}}'
        },
        {
            id: 'TC-CB-008', title: 'Create booking with checkout before checkin',
            type: 'edge', priority: 'high',
            description: 'Verify handling when checkout date is before checkin date.',
            steps: ['Send POST request to /booking', 'Set checkout date before checkin date'],
            expected: 'Should reject with validation error or handle gracefully',
            data: '{"firstname":"Jim","lastname":"Brown","totalprice":111,"depositpaid":true,"bookingdates":{"checkin":"2019-01-01","checkout":"2018-01-01"}}'
        },
        {
            id: 'TC-CB-009', title: 'Create booking with invalid date format',
            type: 'negative', priority: 'medium',
            description: 'Verify error handling when dates are in invalid format.',
            steps: ['Send POST request to /booking', 'Provide invalid date format in bookingdates'],
            expected: 'Should return error or handle date parsing gracefully',
            data: '{"firstname":"Jim","lastname":"Brown","totalprice":111,"depositpaid":true,"bookingdates":{"checkin":"not-a-date","checkout":"also-not"}}'
        },
        {
            id: 'TC-CB-010', title: 'Create booking with extremely large totalprice',
            type: 'boundary', priority: 'low',
            description: 'Verify handling of extremely large numeric value for totalprice.',
            steps: ['Send POST request to /booking', 'Set totalprice to 999999999999'],
            expected: 'Booking should be created or rejected with appropriate message',
            data: '{"firstname":"Jim","lastname":"Brown","totalprice":999999999999,"depositpaid":true,"bookingdates":{"checkin":"2018-01-01","checkout":"2019-01-01"}}'
        },
        {
            id: 'TC-CB-011', title: 'Verify created booking can be retrieved',
            type: 'integration', priority: 'critical',
            description: 'End-to-end: Create a booking then retrieve it to verify data consistency.',
            steps: ['Send POST request to /booking with valid data', 'Extract bookingid from response', 'Send GET request to /booking/:id', 'Compare response fields'],
            expected: 'GET response fields match the original POST data exactly',
            data: '{"firstname":"Jim","lastname":"Brown","totalprice":111,"depositpaid":true,"bookingdates":{"checkin":"2018-01-01","checkout":"2019-01-01"}}'
        },
        {
            id: 'TC-CB-012', title: 'Create booking with string value for totalprice',
            type: 'data', priority: 'medium',
            description: 'Verify handling when a string is provided for a numeric field.',
            steps: ['Send POST request to /booking', 'Set totalprice to "one hundred"'],
            expected: 'Should return 400 Bad Request or 500 Internal Server Error',
            data: '{"firstname":"Jim","lastname":"Brown","totalprice":"one hundred","depositpaid":true,"bookingdates":{"checkin":"2018-01-01","checkout":"2019-01-01"}}'
        }
    ],
    updateBooking: [
        {
            id: 'TC-UB-001', title: 'Update booking with valid token auth',
            type: 'functional', priority: 'critical',
            description: 'Verify full booking update with valid Cookie token authentication.',
            steps: ['Create auth token via POST /auth', 'Send PUT request to /booking/:id', 'Set Cookie: token=<token>', 'Provide complete updated booking data'],
            expected: 'HTTP 200 OK with complete updated booking object',
            data: '{"firstname":"James","lastname":"Brown","totalprice":222,"depositpaid":false,"bookingdates":{"checkin":"2020-01-01","checkout":"2021-01-01"},"additionalneeds":"Lunch"}'
        },
        {
            id: 'TC-UB-002', title: 'Update booking with Basic Auth',
            type: 'functional', priority: 'high',
            description: 'Verify full booking update with Basic Authorization header.',
            steps: ['Send PUT request to /booking/:id', 'Set Authorization: Basic YWRtaW46cGFzc3dvcmQxMjM='],
            expected: 'HTTP 200 OK with updated booking data',
            data: '{"firstname":"James","lastname":"Brown","totalprice":222,"depositpaid":false,"bookingdates":{"checkin":"2020-01-01","checkout":"2021-01-01"}}'
        },
        {
            id: 'TC-UB-003', title: 'Update booking without authentication',
            type: 'security', priority: 'critical',
            description: 'Verify that update fails without any authentication header.',
            steps: ['Send PUT request to /booking/:id', 'Do NOT include Cookie or Authorization header'],
            expected: 'HTTP 403 Forbidden',
            data: '{"firstname":"James","lastname":"Brown","totalprice":222,"depositpaid":false,"bookingdates":{"checkin":"2020-01-01","checkout":"2021-01-01"}}'
        },
        {
            id: 'TC-UB-004', title: 'Update booking with invalid token',
            type: 'security', priority: 'high',
            description: 'Verify that update fails with an invalid/expired auth token.',
            steps: ['Send PUT request to /booking/:id', 'Set Cookie: token=invalidtoken123'],
            expected: 'HTTP 403 Forbidden',
            data: '{"firstname":"James","lastname":"Brown","totalprice":222,"depositpaid":false,"bookingdates":{"checkin":"2020-01-01","checkout":"2021-01-01"}}'
        },
        {
            id: 'TC-UB-005', title: 'Update non-existent booking',
            type: 'negative', priority: 'high',
            description: 'Verify error handling when attempting to update a booking that does not exist.',
            steps: ['Send PUT request to /booking/999999 with valid auth', 'Provide valid booking body'],
            expected: 'HTTP 405 Method Not Allowed or 404 Not Found',
            data: '{"firstname":"James","lastname":"Brown","totalprice":222,"depositpaid":false,"bookingdates":{"checkin":"2020-01-01","checkout":"2021-01-01"}}'
        },
        {
            id: 'TC-UB-006', title: 'Update booking with partial body (missing fields)',
            type: 'negative', priority: 'medium',
            description: 'Verify behavior when PUT request has incomplete body.',
            steps: ['Send PUT request to /booking/:id', 'Provide only firstname and lastname', 'Omit other required fields'],
            expected: 'HTTP 400 Bad Request or fields set to null/default',
            data: '{"firstname":"James","lastname":"Brown"}'
        },
        {
            id: 'TC-UB-007', title: 'Verify update persists via GET',
            type: 'integration', priority: 'critical',
            description: 'End-to-end: Update a booking then verify changes via GET.',
            steps: ['Update booking via PUT /booking/:id', 'Retrieve updated booking via GET /booking/:id', 'Verify all fields match updated values'],
            expected: 'GET response reflects all updated field values',
            data: '{"firstname":"UpdatedName","lastname":"UpdatedLast","totalprice":999,...}'
        }
    ],
    partialUpdate: [
        {
            id: 'TC-PU-001', title: 'Partial update — firstname only',
            type: 'functional', priority: 'critical',
            description: 'Verify partial update with only firstname field using PATCH.',
            steps: ['Create auth token', 'Send PATCH request to /booking/:id', 'Provide body with only firstname'],
            expected: 'HTTP 200 OK — firstname updated, all other fields unchanged',
            data: '{"firstname":"James"}'
        },
        {
            id: 'TC-PU-002', title: 'Partial update — lastname only',
            type: 'functional', priority: 'high',
            description: 'Verify partial update with only lastname field.',
            steps: ['Send PATCH request to /booking/:id with auth', 'Provide body with only lastname'],
            expected: 'HTTP 200 OK — lastname updated, all other fields unchanged',
            data: '{"lastname":"Smith"}'
        },
        {
            id: 'TC-PU-003', title: 'Partial update — multiple fields',
            type: 'functional', priority: 'high',
            description: 'Verify partial update with firstname and lastname together.',
            steps: ['Send PATCH request to /booking/:id', 'Provide body: {"firstname":"James","lastname":"Brown"}'],
            expected: 'HTTP 200 OK with both fields updated',
            data: '{"firstname":"James","lastname":"Brown"}'
        },
        {
            id: 'TC-PU-004', title: 'Partial update without authentication',
            type: 'security', priority: 'critical',
            description: 'Verify that PATCH endpoint requires authentication.',
            steps: ['Send PATCH request to /booking/:id', 'Do NOT include auth headers'],
            expected: 'HTTP 403 Forbidden',
            data: '{"firstname":"James"}'
        },
        {
            id: 'TC-PU-005', title: 'Partial update with empty body',
            type: 'edge', priority: 'medium',
            description: 'Verify behavior when PATCH request has empty body.',
            steps: ['Send PATCH request to /booking/:id with auth', 'Send empty body: {}'],
            expected: 'Booking should remain unchanged or return appropriate error',
            data: '{}'
        }
    ],
    deleteBooking: [
        {
            id: 'TC-DB-001', title: 'Delete booking with valid token',
            type: 'functional', priority: 'critical',
            description: 'Verify successful deletion of a booking with valid Cookie token.',
            steps: ['Create a booking', 'Create auth token', 'Send DELETE request to /booking/:id with Cookie: token=<token>'],
            expected: 'HTTP 201 Created (confirmation of deletion)',
            data: 'DELETE /booking/:id'
        },
        {
            id: 'TC-DB-002', title: 'Delete booking with Basic Auth',
            type: 'functional', priority: 'high',
            description: 'Verify deletion works with Basic Authorization header.',
            steps: ['Send DELETE request to /booking/:id', 'Set Authorization: Basic YWRtaW46cGFzc3dvcmQxMjM='],
            expected: 'HTTP 201 Created',
            data: 'DELETE /booking/:id'
        },
        {
            id: 'TC-DB-003', title: 'Delete booking without authentication',
            type: 'security', priority: 'critical',
            description: 'Verify that DELETE endpoint requires authentication.',
            steps: ['Send DELETE request to /booking/:id', 'Do NOT include any auth headers'],
            expected: 'HTTP 403 Forbidden',
            data: 'DELETE /booking/:id'
        },
        {
            id: 'TC-DB-004', title: 'Delete non-existent booking',
            type: 'negative', priority: 'high',
            description: 'Verify error handling when deleting a booking that does not exist.',
            steps: ['Send DELETE request to /booking/999999 with valid auth'],
            expected: 'HTTP 405 Method Not Allowed or 404 Not Found',
            data: 'DELETE /booking/999999'
        },
        {
            id: 'TC-DB-005', title: 'Verify deleted booking cannot be retrieved',
            type: 'integration', priority: 'critical',
            description: 'End-to-end: Delete a booking then attempt to retrieve it via GET.',
            steps: ['Create and then delete a booking', 'Send GET request to /booking/:id with the deleted ID'],
            expected: 'HTTP 404 Not Found',
            data: 'GET /booking/:deleted_id'
        },
        {
            id: 'TC-DB-006', title: 'Delete already deleted booking',
            type: 'edge', priority: 'medium',
            description: 'Verify behavior when attempting to delete a booking twice.',
            steps: ['Delete a booking', 'Attempt to delete the same booking again'],
            expected: 'HTTP 405 Method Not Allowed or 404 Not Found',
            data: 'DELETE /booking/:already_deleted_id'
        },
        {
            id: 'TC-DB-007', title: 'Delete booking with invalid token',
            type: 'security', priority: 'high',
            description: 'Verify that deletion fails with an invalid/expired auth token.',
            steps: ['Send DELETE request to /booking/:id', 'Set Cookie: token=invalidtoken'],
            expected: 'HTTP 403 Forbidden',
            data: 'DELETE /booking/:id (invalid token)'
        }
    ],
    healthCheck: [
        {
            id: 'TC-HC-001', title: 'Health check returns 201',
            type: 'functional', priority: 'critical',
            description: 'Verify the /ping endpoint returns HTTP 201 Created confirming API is running.',
            steps: ['Send GET request to /ping'],
            expected: 'HTTP 201 Created',
            data: 'GET /ping'
        },
        {
            id: 'TC-HC-002', title: 'Health check response time',
            type: 'performance', priority: 'medium',
            description: 'Verify the health check endpoint responds within acceptable time.',
            steps: ['Send GET request to /ping', 'Measure response time'],
            expected: 'Response time under 1 second',
            data: 'GET /ping'
        },
        {
            id: 'TC-HC-003', title: 'Health check with POST method',
            type: 'negative', priority: 'low',
            description: 'Verify that /ping rejects non-GET methods.',
            steps: ['Send POST request to /ping'],
            expected: 'HTTP 404 or 405 Method Not Allowed',
            data: 'POST /ping'
        }
    ]
};

// ======================
// RICE-POT Test Plan Sections
// ======================
function generateTestPlan(config) {
    const { systemName, apiUrl, frontendPoc, backendPoc, devopsPoc, sprintDuration } = config;
    
    return [
        {
            number: 1, title: 'Objective',
            content: `<p>The objective of this test plan is to verify the <strong>${systemName}</strong> API, covering booking creation, retrieval, update, deletion, and authentication token generation. The ${systemName} is a RESTful web service that provides a sandbox environment for practicing API testing. The system is known to contain defects which must be identified, documented, and logged as part of the testing effort.</p>
            <p>All test cases will be executed in Postman for manual and exploratory testing, and automation will be implemented using the REST Assured framework with Java. The testing effort aims to validate the functional correctness, data integrity, security posture, and performance characteristics of all exposed API endpoints. Defects discovered during testing will be logged in JIRA with full reproduction steps, severity classification, and priority assignment.</p>
            <p>The base URL for the API under test is: <code>${apiUrl}</code></p>`
        },
        {
            number: 2, title: 'Scope',
            content: `<p>The following testing types are within scope for the ${systemName} test plan:</p>
            <ol>
                <li><strong>Functional Testing:</strong>
                    <ul><li>Verify the correctness and functionality of all API endpoints as per the API documentation.</li>
                    <li>Test various scenarios for booking creation, modification, and cancellation.</li>
                    <li>Validate user authentication and authorization mechanisms for protected endpoints.</li></ul></li>
                <li><strong>Data Validation Testing:</strong>
                    <ul><li>Verify all request and response payloads conform to expected data types.</li>
                    <li>Validate required vs. optional field enforcement.</li>
                    <li>Confirm date format compliance (CCYY-MM-DD) across all date fields.</li></ul></li>
                <li><strong>Error Handling Testing:</strong>
                    <ul><li>Verify appropriate HTTP status codes for error scenarios (400, 403, 404, 405, 500).</li>
                    <li>Validate error response body structure and messaging.</li></ul></li>
                <li><strong>Performance Testing:</strong>
                    <ul><li>Measure API response times under normal load conditions.</li>
                    <li>Verify response times remain within acceptable thresholds (&lt;2 seconds).</li></ul></li>
                <li><strong>Security Testing:</strong>
                    <ul><li>Validate authentication enforcement on PUT, PATCH, and DELETE endpoints.</li>
                    <li>Test for SQL injection, XSS, and other common vulnerabilities.</li>
                    <li>Verify token-based and Basic Auth authorization mechanisms.</li></ul></li>
                <li><strong>Integration Testing:</strong>
                    <ul><li>Verify end-to-end flows: Create → Read → Update → Delete booking.</li>
                    <li>Validate data consistency across sequential API operations.</li></ul></li>
                <li><strong>Compatibility Testing:</strong>
                    <ul><li>Verify API behavior across JSON, XML, and URL-encoded content types.</li>
                    <li>Test with Accept headers for application/json and application/xml.</li></ul></li>
                <li><strong>Documentation Review:</strong>
                    <ul><li>Validate that API behavior matches the published API documentation.</li>
                    <li>Identify any discrepancies between documented and actual behavior.</li></ul></li>
                <li><strong>Load Testing:</strong>
                    <ul><li>Simulate concurrent users accessing the API simultaneously.</li>
                    <li>Measure system stability under sustained load.</li></ul></li>
                <li><strong>Regression Testing:</strong>
                    <ul><li>Re-execute test cases after defect fixes to verify resolution.</li>
                    <li>Confirm no new defects are introduced by code changes.</li></ul></li>
                <li><strong>Edge Case Testing:</strong>
                    <ul><li>Test with empty payloads, null values, and extreme boundary values.</li>
                    <li>Verify checkout-before-checkin date scenarios.</li></ul></li>
                <li><strong>Concurrency Testing:</strong>
                    <ul><li>Test simultaneous create and update operations on the same resource.</li>
                    <li>Verify data integrity under concurrent access patterns.</li></ul></li>
                <li><strong>Ad Hoc Testing:</strong>
                    <ul><li>Perform unscripted, intuition-based exploratory testing.</li>
                    <li>Focus on discovering undocumented behaviors and edge cases.</li></ul></li>
                <li><strong>Usability Testing:</strong>
                    <ul><li>Evaluate API endpoint naming conventions and response structure clarity.</li>
                    <li>Assess error message helpfulness and developer experience.</li></ul></li>
                <li><strong>CI/CD Testing:</strong>
                    <ul><li>Integrate automated test suite into CI/CD pipeline.</li>
                    <li>Verify automated test execution on each build deployment.</li></ul></li>
                <li><strong>Performance Monitoring:</strong>
                    <ul><li>Establish baseline performance metrics for all endpoints.</li>
                    <li>Monitor response time trends across test cycles.</li></ul></li>
                <li><strong>Backup &amp; Recovery Testing:</strong>
                    <ul><li>Verify data persistence after API service restart.</li>
                    <li>Validate booking data integrity post-recovery scenarios.</li></ul></li>
                <li><strong>Internationalization Testing:</strong>
                    <ul><li>Test with Unicode characters in name fields (e.g., accented characters, CJK).</li>
                    <li>Verify proper encoding and decoding of international character sets.</li></ul></li>
                <li><strong>Rate Limiting Testing:</strong>
                    <ul><li>Verify API behavior under rapid successive requests.</li>
                    <li>Identify if rate limiting or throttling mechanisms are in place.</li></ul></li>
                <li><strong>Third-Party Integration Testing:</strong>
                    <ul><li>Validate API responses are compatible with common integration tools.</li>
                    <li>Verify webhook or callback compatibility if applicable.</li></ul></li>
            </ol>`
        },
        {
            number: 3, title: 'Inclusions',
            content: `<p>The following testing areas are explicitly included in the test execution scope:</p>
            <ol>
                <li><strong>Create (POST)</strong> — Booking creation with JSON, XML, and URL-encoded payloads</li>
                <li><strong>Read (GET)</strong> — Booking retrieval by ID, filtered listing by name and dates</li>
                <li><strong>Update (PUT)</strong> — Full booking update with all required fields</li>
                <li><strong>Partial Update (PATCH)</strong> — Booking update with partial payloads</li>
                <li><strong>Delete (DELETE)</strong> — Booking removal with authentication verification</li>
                <li><strong>Authentication &amp; Authorization</strong> — Token generation, Cookie and Basic Auth validation</li>
                <li><strong>Boundary Value Analysis</strong> — Min/max values for numeric fields, empty strings, extreme dates</li>
                <li><strong>Concurrency</strong> — Simultaneous booking operations</li>
                <li><strong>Data Validation</strong> — Type enforcement, required field validation, date format compliance</li>
                <li><strong>Error Handling</strong> — Invalid IDs, missing fields, malformed payloads, unauthorized access</li>
                <li><strong>Security</strong> — SQL injection, XSS, auth bypass attempts, token manipulation</li>
                <li><strong>Performance</strong> — Response time measurement, throughput analysis</li>
                <li><strong>Integration</strong> — End-to-end CRUD flow validation, cross-endpoint data consistency</li>
                <li><strong>Regression</strong> — Post-fix verification, impact analysis on related endpoints</li>
                <li><strong>Documentation Review</strong> — API doc accuracy verification</li>
                <li><strong>Load</strong> — Multi-user simulation, sustained request patterns</li>
                <li><strong>Compatibility</strong> — Multi-format (JSON/XML) and multi-header testing</li>
                <li><strong>Usability</strong> — API ergonomics and error message clarity assessment</li>
                <li><strong>CI/CD</strong> — Automated pipeline integration with REST Assured</li>
                <li><strong>Rate Limiting</strong> — Throttle detection and burst request handling</li>
                <li><strong>Backup &amp; Recovery</strong> — Post-restart data integrity validation</li>
            </ol>`
        },
        {
            number: 4, title: 'Test Environments',
            content: `<p>The following environments and platform configurations will be used for testing:</p>
            <h3>Environment URLs</h3>
            <table class="plan-table">
                <thead><tr><th>Name</th><th>Environment URL</th></tr></thead>
                <tbody>
                    <tr><td>QA</td><td><code>${apiUrl}</code></td></tr>
                    <tr><td>Pre Prod</td><td><code>${apiUrl}</code></td></tr>
                </tbody>
            </table>
            <h3>Supported Platforms</h3>
            <ul>
                <li>Windows 10 — Chrome, Firefox, and Edge browsers</li>
                <li>macOS — Safari browser</li>
                <li>Android Mobile OS — Chrome browser</li>
                <li>iPhone Mobile OS — Safari browser</li>
            </ul>
            <h3>Network &amp; Hardware</h3>
            <ul>
                <li>Network connectivity: Wi-Fi, cellular, and wired connections for API access</li>
                <li>Minimum hardware: Standard processor, 4GB RAM, 10GB storage</li>
                <li>Security: Token-based (Cookie) and Basic Auth for protected endpoint access</li>
            </ul>`
        },
        {
            number: 5, title: 'Defect Reporting Procedure',
            content: `<p>All defects discovered during testing will be reported using a structured process to ensure timely identification, triage, and resolution. A defect is defined as any deviation from the expected behavior documented in the API specification, user experience degradation, or technical error encountered during test execution.</p>
            <p>Each defect report will include: a descriptive title, detailed reproduction steps, expected vs. actual behavior, environment details, severity and priority classification, relevant screenshots or API response logs, and assignee designation. All defects will be logged in JIRA with the appropriate labels and sprint association.</p>
            <p>Defects will be triaged daily during the testing phase. Severity levels are: <strong>Critical</strong> (system crash or data loss), <strong>High</strong> (major feature broken), <strong>Medium</strong> (feature works with workaround), and <strong>Low</strong> (cosmetic or minor). The test lead will facilitate triage meetings and ensure defect assignments align with team capacity.</p>
            <h3>Defect Process POC</h3>
            <table class="plan-table">
                <thead><tr><th>Defect Process</th><th>POC</th></tr></thead>
                <tbody>
                    <tr><td>Frontend</td><td>${frontendPoc}</td></tr>
                    <tr><td>Backend</td><td>${backendPoc}</td></tr>
                    <tr><td>Dev Ops</td><td>${devopsPoc}</td></tr>
                </tbody>
            </table>
            <h3>Tools</h3>
            <p>JIRA will serve as the primary defect tracking tool. Daily status emails will be sent to dev management summarizing defects found, their severity, and resolution progress.</p>`
        },
        {
            number: 6, title: 'Test Strategy',
            content: `<h3>Step 1: Test Design Techniques</h3>
            <p>Test scenarios and test cases will be developed using the following industry-standard test design techniques:</p>
            <ul>
                <li><strong>Equivalence Class Partitioning (ECP)</strong> — Divide input data into valid and invalid classes to reduce test case count while maintaining coverage.</li>
                <li><strong>Boundary Value Analysis (BVA)</strong> — Test values at the edges of equivalence classes (e.g., 0, -1, max int for totalprice).</li>
                <li><strong>Decision Table Testing</strong> — Map combinations of inputs (auth method, content type, fields) to expected outcomes.</li>
                <li><strong>State Transition Testing</strong> — Verify booking lifecycle state transitions (Created → Updated → Deleted).</li>
                <li><strong>Use Case Testing</strong> — Derive test cases from end-user booking workflow scenarios.</li>
                <li><strong>Error Guessing</strong> — Apply domain expertise to anticipate likely defect areas.</li>
                <li><strong>Exploratory Testing</strong> — Unscripted, session-based testing to discover undocumented issues.</li>
            </ul>
            <h3>Step 2: Testing Procedure</h3>
            <p>Upon receiving a build for testing:</p>
            <ol>
                <li>Conduct <strong>smoke testing</strong> to verify core functionalities (auth, create, read) are operational.</li>
                <li>If smoke testing fails, <strong>reject the build</strong> and wait for a stable version before proceeding.</li>
                <li>Upon passing smoke tests, perform <strong>in-depth functional testing</strong> using the prepared test cases.</li>
                <li>Multiple test resources will test the same application on multiple supported environments simultaneously.</li>
                <li>Report all bugs in JIRA and send a daily end-of-day status email to dev management.</li>
            </ol>
            <p>Testing types performed as part of the strategy:</p>
            <ul>
                <li>Smoke Testing and Sanity Testing</li>
                <li>Regression Testing and Retesting</li>
                <li>Usability Testing, Functionality Testing, and UI Testing</li>
            </ul>
            <p>Test cycles will be repeated until quality standards are met.</p>
            <h3>Step 3: Best Practices</h3>
            <ul>
                <li><strong>Context-Driven Testing</strong> — Testing will be performed according to the context of the ${systemName} application and its intended use cases.</li>
                <li><strong>Shift Left Testing</strong> — Testing activities will commence from the earliest stages of development, including requirement review and API contract validation.</li>
                <li><strong>Exploratory Testing</strong> — Beyond scripted test case execution, expert-driven exploratory testing will be conducted to discover unanticipated defects.</li>
                <li><strong>End-to-End Flow Testing</strong> — Complete user journeys involving multiple API endpoints will be tested to simulate real-world booking workflows.</li>
            </ul>`
        },
        {
            number: 7, title: 'Test Schedule',
            content: `<table class="plan-table">
                <thead><tr><th>Task</th><th>Dates</th></tr></thead>
                <tbody>
                    <tr><td>Creating Test Plan</td><td>[INSERT START DATE] – [INSERT END DATE]</td></tr>
                    <tr><td>Test Case Creation</td><td>[INSERT START DATE] – [INSERT END DATE]</td></tr>
                    <tr><td>Test Case Execution</td><td>[INSERT START DATE] – [INSERT END DATE]</td></tr>
                    <tr><td>Summary Reports Submission</td><td>[INSERT DATE]</td></tr>
                </tbody>
            </table>
            <p><strong>Sprint Duration:</strong> ${sprintDuration} Sprints are allocated for complete test execution of the ${systemName}.</p>`
        },
        {
            number: 8, title: 'Test Deliverables',
            content: `<p>The following deliverables will be produced and submitted during the testing lifecycle:</p>
            <ul>
                <li><strong>Test Plan</strong> — This document, outlining scope, strategy, schedule, and criteria.</li>
                <li><strong>Test Scenarios</strong> — High-level test scenarios covering all API endpoints and user flows.</li>
                <li><strong>Test Cases</strong> — Detailed test cases with steps, test data, expected results, and priority classification.</li>
                <li><strong>Test Execution Reports</strong> — Pass/fail status for each test case per execution cycle.</li>
                <li><strong>Defect Reports</strong> — Comprehensive bug reports logged in JIRA with full reproduction details.</li>
                <li><strong>Test Summary Reports</strong> — Final summary including coverage metrics, defect density, and test cycle outcomes.</li>
                <li><strong>Requirements Traceability Matrix (RTM)</strong> — Mapping between requirements, test cases, and defects.</li>
                <li><strong>Automation Scripts</strong> — REST Assured test automation codebase with execution reports.</li>
            </ul>`
        },
        {
            number: 9, title: 'Entry and Exit Criteria',
            content: `<h3>Requirement Analysis</h3>
            <p><strong>Entry Criteria:</strong></p>
            <ul><li>The testing team has received the Requirements Documents or details about the project.</li>
            <li>API documentation is available and accessible at the provided URL.</li></ul>
            <p><strong>Exit Criteria:</strong></p>
            <ul><li>All requirements are explored and understood by the testing team.</li>
            <li>All doubts and ambiguities have been clarified with stakeholders.</li>
            <li>Test scenarios and test case documents have been prepared.</li></ul>

            <h3>Test Execution</h3>
            <p><strong>Entry Criteria:</strong></p>
            <ul><li>Test Scenarios and Test Cases documents are signed off by the client.</li>
            <li>The application is deployed and ready for testing in the QA environment.</li>
            <li>Test data and test environment access are provisioned.</li></ul>
            <p><strong>Exit Criteria:</strong></p>
            <ul><li>All planned test cases have been executed.</li>
            <li>Test Case Reports and Defect Reports are ready.</li>
            <li>All critical and high severity defects are resolved or have approved deferrals.</li></ul>

            <h3>Test Closure</h3>
            <p><strong>Entry Criteria:</strong></p>
            <ul><li>Test Case Reports and Defect Reports are ready and reviewed.</li>
            <li>All retesting and regression testing cycles are complete.</li></ul>
            <p><strong>Exit Criteria:</strong></p>
            <ul><li>Test Summary Reports are prepared, reviewed, and submitted to stakeholders.</li>
            <li>Lessons learned have been documented.</li>
            <li>All test artifacts are archived.</li></ul>`
        },
        {
            number: 10, title: 'Tools',
            content: `<p>The following tools will be used throughout the testing lifecycle:</p>
            <ul>
                <li><strong>JIRA</strong> — Bug tracking and test management tool</li>
                <li><strong>Postman</strong> — Manual and exploratory API testing</li>
                <li><strong>REST Assured (Java)</strong> — API test automation framework</li>
                <li><strong>Mind Map Tool</strong> — Visual test scenario mapping and brainstorming</li>
                <li><strong>Snipping/Screenshot Tool</strong> — Evidence capture for defect documentation</li>
                <li><strong>Microsoft Word &amp; Excel</strong> — Test documentation and reporting</li>
                <li><strong>Git/GitHub</strong> — Version control for automation scripts</li>
            </ul>`
        },
        {
            number: 11, title: 'Risks and Mitigations',
            content: `<table class="plan-table">
                <thead><tr><th>Risk</th><th>Mitigation</th></tr></thead>
                <tbody>
                    <tr><td>Non-availability of a resource</td><td>Backup resource planning — cross-train team members on all endpoints</td></tr>
                    <tr><td>Build URL is not working / environment downtime</td><td>Resources will work on test case documentation, automation script development, or other productive tasks during downtime</td></tr>
                    <tr><td>Less time for testing due to scope changes</td><td>Ramp up the resources based on client needs dynamically; prioritize critical test cases</td></tr>
                    <tr><td>Incomplete or inaccurate API documentation</td><td>Schedule clarification sessions with development team; maintain a discrepancy log</td></tr>
                    <tr><td>Test data dependencies between endpoints</td><td>Implement test data setup and teardown routines; use independent test data sets</td></tr>
                </tbody>
            </table>`
        },
        {
            number: 12, title: 'Approvals',
            content: `<p>The testing team will submit the following documents for client approval at the designated phases of the testing lifecycle. Testing will only proceed to subsequent phases after receiving explicit sign-off on the required deliverables:</p>
            <ul>
                <li><strong>Test Plan</strong> — Approval required before test case creation begins.</li>
                <li><strong>Test Scenarios</strong> — Approval required before detailed test case development.</li>
                <li><strong>Test Cases</strong> — Approval required before test execution commences.</li>
                <li><strong>Reports</strong> — Test execution reports and summary reports submitted for stakeholder review.</li>
            </ul>
            <p>All approval workflows will be tracked in JIRA with timestamps and approver identification. Testing will only continue to the next steps once these approvals are completed.</p>`
        }
    ];
}


// ======================
// DOM Interactions
// ======================
document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            const target = document.getElementById(link.dataset.section);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Endpoint selector
    const endpointSelect = document.getElementById('endpoint-select');
    endpointSelect.addEventListener('change', () => updateEndpointInfo(endpointSelect.value));

    // Generate Test Plan button
    document.getElementById('generate-plan-btn').addEventListener('click', () => {
        showLoading('Generating test plan using RICE-POT framework...', () => {
            const config = getConfig();
            const sections = generateTestPlan(config);
            renderTestPlan(sections);
            showToast('Test plan generated with all 12 RICE-POT sections!');
        });
    });

    // Generate Test Cases button
    document.getElementById('generate-cases-btn').addEventListener('click', () => {
        showLoading('Generating test cases...', () => {
            generateTestCases();
            showToast('Test cases generated successfully!');
        });
    });

    // Search
    document.getElementById('search-input').addEventListener('input', filterTestCases);

    // Filter pills
    document.querySelectorAll('.pill').forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            filterTestCases();
        });
    });

    // Export
    document.getElementById('export-btn').addEventListener('click', exportAll);

    // Role selector updates preview
    const roleSelect = document.getElementById('rp-role');
    roleSelect.addEventListener('change', () => {
        const roles = {
            'senior-qa': 'Senior QA Lead with 15+ years of experience in API testing, test planning, and software quality assurance.',
            'qa-architect': 'QA Architect with expertise in test strategy design, automation frameworks, and quality governance.',
            'sdet': 'SDET Lead with deep expertise in test automation, CI/CD integration, and performance testing.',
            'test-manager': 'Test Manager overseeing test planning, resource allocation, and quality metrics reporting.'
        };
        document.getElementById('preview-role').textContent = roles[roleSelect.value] || roles['senior-qa'];
    });

    // Initialize metrics
    initMetrics();
});

// ======================
// Helper Functions
// ======================
function getConfig() {
    return {
        systemName: document.getElementById('ctx-system').value || 'Restful-Booker API',
        apiUrl: document.getElementById('ctx-url').value || 'https://restful-booker.herokuapp.com/apidoc/index.html',
        frontendPoc: document.getElementById('ctx-frontend').value || '[Frontend Dev Name]',
        backendPoc: document.getElementById('ctx-backend').value || '[Backend Dev Name]',
        devopsPoc: document.getElementById('ctx-devops').value || '[DevOps Name]',
        sprintDuration: document.getElementById('ctx-sprints').value || '2'
    };
}

function getSelectedTypes() {
    const types = [];
    if (document.getElementById('type-functional').checked) types.push('functional');
    if (document.getElementById('type-negative').checked) types.push('negative');
    if (document.getElementById('type-boundary').checked) types.push('boundary');
    if (document.getElementById('type-security').checked) types.push('security');
    if (document.getElementById('type-performance').checked) types.push('performance');
    if (document.getElementById('type-integration').checked) types.push('integration');
    if (document.getElementById('type-edge').checked) types.push('edge');
    if (document.getElementById('type-data').checked) types.push('data');
    return types;
}

function updateEndpointInfo(key) {
    const infoEl = document.getElementById('endpoint-info');
    
    if (key === 'all') {
        infoEl.innerHTML = `
            <div class="endpoint-header-info">
                <span class="method-badge method-all">ALL</span>
                <span class="endpoint-path">All Endpoints</span>
            </div>
            <p class="endpoint-desc">Generate test cases for all 7 API endpoints. Includes Auth, GetBookingIds, GetBooking, CreateBooking, UpdateBooking, PartialUpdateBooking, DeleteBooking, and HealthCheck.</p>
            <div class="endpoint-meta">
                <div class="meta-item"><span class="meta-label">Base URL</span><code class="meta-value">https://restful-booker.herokuapp.com</code></div>
                <div class="meta-item"><span class="meta-label">Auth</span><code class="meta-value">Token / Basic Auth</code></div>
                <div class="meta-item"><span class="meta-label">Formats</span><code class="meta-value">JSON, XML, URL-encoded</code></div>
            </div>`;
        return;
    }
    
    const ep = ENDPOINTS[key];
    if (!ep) return;
    
    const methodClass = `method-${ep.method.toLowerCase()}`;
    
    let schemaHTML = '';
    if (ep.request.length > 0) {
        schemaHTML += `<div class="schema-title">Request Parameters</div>
            <table class="schema-table"><thead><tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody>`;
        ep.request.forEach(f => {
            schemaHTML += `<tr>
                <td class="schema-field">${f.field}</td>
                <td class="schema-type">${f.type}</td>
                <td>${f.required ? '<span style="color:var(--accent-red)">Required</span>' : '<span style="color:var(--text-muted)">Optional</span>'}</td>
                <td>${f.desc}</td></tr>`;
        });
        schemaHTML += '</tbody></table>';
    }
    
    if (ep.response.length > 0) {
        schemaHTML += `<div class="schema-title" style="margin-top:16px">Response Fields</div>
            <table class="schema-table"><thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead><tbody>`;
        ep.response.forEach(f => {
            schemaHTML += `<tr>
                <td class="schema-field">${f.field}</td>
                <td class="schema-type">${f.type}</td>
                <td>${f.desc}</td></tr>`;
        });
        schemaHTML += '</tbody></table>';
    }
    
    infoEl.innerHTML = `
        <div class="endpoint-header-info">
            <span class="method-badge ${methodClass}">${ep.method}</span>
            <span class="endpoint-path">${ep.path}</span>
        </div>
        <p class="endpoint-desc">${ep.description}</p>
        <div class="endpoint-meta">
            <div class="meta-item"><span class="meta-label">Name</span><code class="meta-value">${ep.name}</code></div>
            <div class="meta-item"><span class="meta-label">Method</span><code class="meta-value">${ep.method}</code></div>
            <div class="meta-item"><span class="meta-label">Path</span><code class="meta-value">${ep.path}</code></div>
        </div>
        <div class="endpoint-schema">${schemaHTML}</div>`;
}

// ======================
// Render Test Plan
// ======================
function renderTestPlan(sections) {
    const container = document.getElementById('test-plan-container');
    
    // Navigation bar
    let navHTML = '<div class="plan-section-nav">';
    sections.forEach(s => {
        navHTML += `<button class="plan-nav-item" data-section-num="${s.number}">${s.number}. ${s.title}</button>`;
    });
    navHTML += '</div>';
    
    // Sections
    let sectionsHTML = '';
    sections.forEach(s => {
        sectionsHTML += `
            <div class="plan-section" id="plan-section-${s.number}" style="animation-delay:${s.number * 0.05}s">
                <div class="plan-section-header" onclick="togglePlanSection(${s.number})">
                    <div class="plan-section-number">${s.number}</div>
                    <div class="plan-section-title">${s.title}</div>
                    <svg class="plan-section-toggle" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6 9 12 15 18 9"/>
                    </svg>
                </div>
                <div class="plan-section-body">${s.content}</div>
            </div>`;
    });
    
    container.innerHTML = navHTML + sectionsHTML;
    
    // Nav item click
    container.querySelectorAll('.plan-nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const num = item.dataset.sectionNum;
            const section = document.getElementById(`plan-section-${num}`);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Highlight
                container.querySelectorAll('.plan-nav-item').forEach(n => n.classList.remove('active'));
                item.classList.add('active');
            }
        });
    });
    
    // Update stat
    document.getElementById('stat-sections').textContent = '12';
}

function togglePlanSection(num) {
    const section = document.getElementById(`plan-section-${num}`);
    if (section) section.classList.toggle('collapsed');
}
// Make it globally accessible
window.togglePlanSection = togglePlanSection;

// ======================
// Generate & Render Test Cases
// ======================
function generateTestCases() {
    const endpointKey = document.getElementById('endpoint-select').value;
    const selectedTypes = getSelectedTypes();
    const priorityFilter = document.getElementById('priority-select').value;
    
    let endpoints = endpointKey === 'all' ? Object.keys(TEST_CASES_DB) : [endpointKey];
    let allCases = [];
    
    endpoints.forEach(epKey => {
        const cases = TEST_CASES_DB[epKey] || [];
        cases.forEach(tc => {
            // Type filter
            if (selectedTypes.length > 0 && !selectedTypes.includes(tc.type)) return;
            // Priority filter
            if (priorityFilter !== 'all' && tc.priority !== priorityFilter) return;
            allCases.push({ ...tc, endpoint: epKey });
        });
    });
    
    renderTestCases(allCases, endpoints);
    updateMetrics(allCases);
    
    // Update stats
    document.getElementById('stat-cases').textContent = allCases.length;
    const totalPossible = Object.values(TEST_CASES_DB).reduce((sum, arr) => sum + arr.length, 0);
    const coverage = totalPossible > 0 ? Math.round((allCases.length / totalPossible) * 100) : 0;
    document.getElementById('stat-coverage').textContent = coverage + '%';
}

function renderTestCases(cases, endpoints) {
    const container = document.getElementById('test-cases-container');
    
    if (cases.length === 0) {
        container.innerHTML = `<div class="empty-state">
            <div class="empty-icon"><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>
            <h3>No Test Cases Match</h3>
            <p>Try adjusting the test type or priority filters to see more results.</p></div>`;
        return;
    }
    
    // Group by endpoint
    const grouped = {};
    cases.forEach(tc => {
        if (!grouped[tc.endpoint]) grouped[tc.endpoint] = [];
        grouped[tc.endpoint].push(tc);
    });
    
    let html = '';
    Object.keys(grouped).forEach(epKey => {
        const ep = ENDPOINTS[epKey];
        const epCases = grouped[epKey];
        const methodClass = ep ? `method-${ep.method.toLowerCase()}` : 'method-all';
        
        html += `<div class="test-case-group" data-endpoint="${epKey}">
            <div class="group-header">
                <span class="method-badge ${methodClass} group-method-badge">${ep ? ep.method : ''}</span>
                <span class="group-title">${ep ? ep.name : epKey}</span>
                <span class="group-count">${epCases.length} cases</span>
            </div>`;
        
        epCases.forEach((tc, idx) => {
            html += `
                <div class="test-case-card" data-type="${tc.type}" data-priority="${tc.priority}" data-id="${tc.id}" onclick="toggleTestCase(this)" style="animation-delay:${idx * 0.03}s">
                    <div class="tc-top">
                        <span class="tc-id">${tc.id}</span>
                        <div class="tc-tags">
                            <span class="tc-tag tc-tag-${tc.type}">${tc.type}</span>
                            <span class="tc-tag tc-tag-${tc.priority}">${tc.priority}</span>
                        </div>
                    </div>
                    <div class="tc-title">${tc.title}</div>
                    <div class="tc-description">${tc.description}</div>
                    <div class="tc-details">
                        <div class="tc-section">
                            <div class="tc-section-title">Test Steps</div>
                            <ol class="tc-steps">${tc.steps.map(s => `<li>${s}</li>`).join('')}</ol>
                        </div>
                        <div class="tc-section">
                            <div class="tc-section-title">Expected Result</div>
                            <div class="tc-expected">${tc.expected}</div>
                        </div>
                        <div class="tc-section">
                            <div class="tc-section-title">Test Data</div>
                            <pre class="tc-data">${tc.data}</pre>
                        </div>
                    </div>
                </div>`;
        });
        
        html += '</div>';
    });
    
    container.innerHTML = html;
}

function toggleTestCase(card) {
    const details = card.querySelector('.tc-details');
    if (details) details.classList.toggle('open');
}
window.toggleTestCase = toggleTestCase;

function filterTestCases() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const activeFilter = document.querySelector('.pill.active')?.dataset.filter || 'all';
    
    document.querySelectorAll('.test-case-card').forEach(card => {
        const type = card.dataset.type;
        const title = card.querySelector('.tc-title')?.textContent.toLowerCase() || '';
        const desc = card.querySelector('.tc-description')?.textContent.toLowerCase() || '';
        const id = card.dataset.id?.toLowerCase() || '';
        
        const matchesFilter = activeFilter === 'all' || type === activeFilter;
        const matchesSearch = !searchTerm || title.includes(searchTerm) || desc.includes(searchTerm) || id.includes(searchTerm);
        
        card.style.display = (matchesFilter && matchesSearch) ? '' : 'none';
    });
    
    // Hide empty groups
    document.querySelectorAll('.test-case-group').forEach(group => {
        const visibleCards = group.querySelectorAll('.test-case-card:not([style*="display: none"])');
        group.style.display = visibleCards.length > 0 ? '' : 'none';
    });
}

// ======================
// Metrics
// ======================
const METRIC_ENDPOINTS = [
    { key: 'auth', name: 'Auth', path: 'POST /auth', grad: ['#6366f1','#a78bfa'] },
    { key: 'getBookingIds', name: 'GetBookingIds', path: 'GET /booking', grad: ['#22d3ee','#6366f1'] },
    { key: 'getBooking', name: 'GetBooking', path: 'GET /booking/:id', grad: ['#f472b6','#6366f1'] },
    { key: 'createBooking', name: 'CreateBooking', path: 'POST /booking', grad: ['#34d399','#22d3ee'] },
    { key: 'updateBooking', name: 'UpdateBooking', path: 'PUT /booking/:id', grad: ['#fbbf24','#f472b6'] },
    { key: 'partialUpdate', name: 'PartialUpdate', path: 'PATCH /booking/:id', grad: ['#a78bfa','#f472b6'] },
    { key: 'deleteBooking', name: 'DeleteBooking', path: 'DELETE /booking/:id', grad: ['#ef4444','#fbbf24'] },
    { key: 'healthCheck', name: 'HealthCheck', path: 'GET /ping', grad: ['#34d399','#6366f1'] }
];

function initMetrics() {
    const grid = document.getElementById('metrics-grid');
    let html = '';
    
    METRIC_ENDPOINTS.forEach((ep, i) => {
        html += `
            <div class="metric-card glass-card">
                <div class="metric-ring" id="ring-${ep.key}">
                    <svg viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="8"/>
                        <circle cx="60" cy="60" r="52" fill="none" stroke="url(#mgrad${i})" stroke-width="8" stroke-linecap="round" stroke-dasharray="326.73" stroke-dashoffset="326.73" class="ring-progress"/>
                        <defs><linearGradient id="mgrad${i}" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="${ep.grad[0]}"/>
                            <stop offset="100%" stop-color="${ep.grad[1]}"/>
                        </linearGradient></defs>
                    </svg>
                    <span class="ring-text">0%</span>
                </div>
                <h4>${ep.name}</h4>
                <p class="metric-sub">${ep.path}</p>
                <p class="metric-count" id="count-${ep.key}">0 cases</p>
            </div>`;
    });
    
    grid.innerHTML = html;
}

function updateMetrics(generatedCases) {
    METRIC_ENDPOINTS.forEach(ep => {
        const total = TEST_CASES_DB[ep.key] ? TEST_CASES_DB[ep.key].length : 0;
        const generated = generatedCases.filter(tc => tc.endpoint === ep.key).length;
        const pct = total > 0 ? Math.round((generated / total) * 100) : 0;
        
        const ring = document.getElementById(`ring-${ep.key}`);
        if (ring) {
            const progress = ring.querySelector('.ring-progress');
            const text = ring.querySelector('.ring-text');
            const circumference = 326.73;
            const offset = circumference - (pct / 100) * circumference;
            
            setTimeout(() => {
                progress.style.strokeDashoffset = offset;
                text.textContent = pct + '%';
            }, 100);
        }
        
        const countEl = document.getElementById(`count-${ep.key}`);
        if (countEl) countEl.textContent = `${generated} / ${total} cases`;
    });
}

// ======================
// Loading & Toast
// ======================
function showLoading(text, callback) {
    const overlay = document.getElementById('loading-overlay');
    const bar = document.getElementById('loading-bar');
    const loadingText = document.getElementById('loading-text');
    
    overlay.style.display = 'flex';
    loadingText.textContent = text;
    bar.style.width = '0%';
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress > 90) progress = 90;
        bar.style.width = progress + '%';
    }, 200);
    
    setTimeout(() => {
        clearInterval(interval);
        bar.style.width = '100%';
        setTimeout(() => {
            overlay.style.display = 'none';
            callback();
        }, 300);
    }, 1500);
}

function showToast(text) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-text').textContent = text;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ======================
// Export
// ======================
function exportAll() {
    const config = getConfig();
    const sections = generateTestPlan(config);
    
    let markdown = `# Test Plan: ${config.systemName}\n`;
    markdown += `> Generated using RICE-POT Framework — ${new Date().toLocaleDateString()}\n\n`;
    
    sections.forEach(s => {
        markdown += `## ${s.number}. ${s.title}\n\n`;
        // Strip HTML tags for markdown export
        const text = s.content.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
        markdown += text + '\n\n';
    });
    
    // Add test cases
    markdown += '\n---\n\n# Test Cases\n\n';
    Object.keys(TEST_CASES_DB).forEach(epKey => {
        const ep = ENDPOINTS[epKey];
        markdown += `## ${ep.method} ${ep.path} — ${ep.name}\n\n`;
        TEST_CASES_DB[epKey].forEach(tc => {
            markdown += `### ${tc.id}: ${tc.title}\n`;
            markdown += `- **Type:** ${tc.type} | **Priority:** ${tc.priority}\n`;
            markdown += `- **Description:** ${tc.description}\n`;
            markdown += `- **Steps:**\n`;
            tc.steps.forEach((s, i) => { markdown += `  ${i+1}. ${s}\n`; });
            markdown += `- **Expected:** ${tc.expected}\n`;
            markdown += `- **Test Data:** \`${tc.data}\`\n\n`;
        });
    });
    
    // Download
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TestPlan_${config.systemName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
    
    showToast('Test plan exported as Markdown!');
}
