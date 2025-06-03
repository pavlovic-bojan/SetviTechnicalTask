# 🐞 Bug Report

## ✅ Positive

---

### 1. ✅ API returns duplicated items in the result list

- **Title**: API returns duplicate items in search results  
- **Environment**: Both `/search` and `/query` endpoints  
- **Steps to Reproduce**:  
    1. Send a search request that matches multiple items  
- **Actual Result**: Response contains duplicated entries in the results list  
- **Expected Result**: Response contains only unique items without duplicates  
- **Severity**: Low  
- **Priority**: Medium  

---

### 2. ✅ API silently ignores unknown query parameters

- **Title**: API ignores unknown query parameters without any warning or error  
- **Environment**: All endpoints that accept query parameters  
- **Steps to Reproduce**:  
    1. Send request with unsupported or unknown query parameters  
- **Actual Result**: API processes request successfully but ignores unknown parameters silently  
- **Expected Result**: API returns validation error or warning about unsupported parameters  
- **Severity**: Informational  
- **Priority**: Low  

---

### 3. ✅ API returns empty `matchedItems` for non-product URLs

- **Title**: Non-product URL returns success with no matches
- **Environment**: `/api/rfq/upload-url-html`
- **Steps to Reproduce**:
    1. Send URL not linked to products, e.g., `https://example.com`
- **Actual Result**: Response with empty `matchedItems`, no errors
- **Expected Result**: Return clear message about no matches
- **Severity**: Low
- **Priority**: Low

---

### 4. ✅ All ranking parameters are accepted

- **Title**: API supports optional ranking flags
- **Environment**: Both `/upload-free-text` and `/upload-url-html`
- **Steps to Reproduce**:
    1. Send request with `enablePrivateLabelRanking`, `enableStockProductRanking`, and `enableVendorRanking` set true or false
- **Actual Result**: API processes and returns success
- **Expected Result**: Correct handling of ranking options
- **Severity**: Informational
- **Priority**: Low

---

### 5. ✅ API returns search summary including `vectorSearchQuery`

- **Title**: Response contains search query summary
- **Environment**: Both endpoints
- **Steps to Reproduce**:
    1. Send valid search request
- **Actual Result**: Response includes `summary.vectorSearchQuery` field
- **Expected Result**: Query summary present
- **Severity**: Informational
- **Priority**: Low

---

## ❌ Negative

---

### 1. ❌ API returns HTTP 200 even with invalid data text

- **Title**: invalid data input accepted as valid
- **Environment**: `/api/rfq/upload-url-html`
- **Steps to Reproduce**:
    1. Send invalid data in text JSON
- **Actual Result**: HTTP 200 OK, `isSuccess: true` but no useful result
- **Expected Result**: HTTP 400 Bad Request with error details
- **Severity**: High
- **Priority**: High

---

### 2. ❌ API accepts requests without required headers and returns HTTP 200

- **Title**: Missing authentication headers not rejected properly  
- **Environment**: All protected API endpoints  
- **Steps to Reproduce**:  
    1. Send a request to any protected endpoint (e.g. `/api/rfq/upload-free-text`)  
    2. Omit both `Authorization` and `ApiKey` headers  
- **Actual Result**:  
    - The API responds with `HTTP 200 OK`  
    - Response may include a vague "unauthorized" message or even `isSuccess: true`  
- **Expected Result**:  
    - API should return `HTTP 401 Unauthorized`  
    - Response body should contain a clear error message like `Missing or invalid authentication headers`  
- **Severity**: High  
- **Priority**: High

---

### 3. ❌ API treats request with both `ApiKey` and `Authorization` headers as authorized, but rejects request with only `ApiKey`

- **Title**: API requires `Authorization` header format, ignores or rejects `ApiKey` header alone  
- **Environment**: All endpoints requiring authentication  
- **Steps to Reproduce**:  
    1. Send request with header:  
       `ApiKey: a7a91f48-0371-4680-b69d-7928d9c1c9ad`  
       → API returns HTTP 200 with unauthorized message (not authorized)  
    2. Send request with both headers:  
       `ApiKey: a7a91f48-0371-4680-b69d-7928d9c1c9ad`  
       `Authorization: ApiKey a7a91f48-0371-4680-b69d-7928d9c1c9ad`  
       → API returns HTTP 200 and treats user as authorized  
- **Actual Result**: API accepts only requests with `Authorization` header in format `ApiKey <key>`. Requests with only `ApiKey` header are rejected as unauthorized, but when both headers are sent, API treats request as authorized.  
- **Expected Result**: Consistent authentication handling. Either accept `ApiKey` header alone or clearly reject and document that only `Authorization` header with `ApiKey` prefix is accepted. Do not mix behaviors depending on presence of both headers.  
- **Severity**: Medium  
- **Priority**: Medium  

---

### 4. ❌ API returns HTTP 200 OK for oversized request payload

- **Title**: API does not reject overly large `text` input  
- **Environment**: `/api/rfq/upload-free-text`  
- **Steps to Reproduce**:  
    1. Send POST request with `text` field containing very large string (e.g., 2MB of characters)  
- **Actual Result**: HTTP 200 OK returned, request accepted silently without error  
- **Expected Result**: HTTP 413 Payload Too Large or HTTP 400 Bad Request with descriptive error message  
- **Severity**: Medium  
- **Priority**: Medium  

---

### 5. ❌ API accepts `topK` as a string without validation

- **Title**: `topK` parameter accepts string values silently  
- **Environment**: `/api/rfq/upload-url-html`, `/api/rfq/upload-free-text`  
- **Steps to Reproduce**:
    1. Send request with `topK` as a string:
       ```json
       {
         "url": "https://www.webstaurantstore.com/choice-24-x-18-x-1-2-green-polyethylene-cutting-board/40724185GN.html",
         "topK": "3",
         "threshold": 0.8,
         "enablePrivateLabelRanking": false,
         "enableStockProductRanking": false,
         "enableVendorRanking": false
       }
       ```
- **Actual Result**:  
    - API returns `HTTP 200 OK`  
    - `isSuccess: true`  
    - No validation error, even though `topK` is a string instead of a number  
- **Expected Result**:  
    - API should return `HTTP 400 Bad Request`  
    - Error message like: "`topK` must be a number"  
- **Severity**: Medium  
- **Priority**: Medium
