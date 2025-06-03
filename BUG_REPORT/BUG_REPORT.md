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

### 1. ❌ API returns HTTP 200 even with empty or invalid request body

- **Title**: Empty input accepted as valid
- **Environment**: `/api/rfq/upload-url-html`
- **Steps to Reproduce**:
    1. Send empty JSON `{}` or empty `"url": ""`
- **Actual Result**: HTTP 200 OK, `isSuccess: true` but no useful result
- **Expected Result**: HTTP 400 Bad Request with error details
- **Severity**: High
- **Priority**: High

---

### 2. ❌ Invalid URLs do not return error

- **Title**: Invalid URL strings processed without validation error
- **Environment**: `/api/rfq/upload-url-html`
- **Steps to Reproduce**:
    1. Send `"url": "htp://invalid-url"`
- **Actual Result**: 200 OK, vague response
- **Expected Result**: HTTP 400 with descriptive error
- **Severity**: Medium
- **Priority**: Medium

---

### 3. ❌ Missing required fields do not trigger validation errors

- **Title**: Missing `text` or `url` field accepted silently
- **Environment**: `/upload-free-text` and `/upload-url-html`
- **Steps to Reproduce**:
    1. Send request without `text` or without `url`
- **Actual Result**: `isSuccess: true` but no data processed
- **Expected Result**: Validation error and HTTP 400 response
- **Severity**: High
- **Priority**: High

---

### 4. ❌ Malformed JSON accepted with HTTP 200

- **Title**: Invalid JSON not rejected
- **Environment**: Any endpoint
- **Steps to Reproduce**:
    1. Send request with broken JSON syntax
- **Actual Result**: 200 OK, empty or null response
- **Expected Result**: HTTP 400 with JSON parse error
- **Severity**: Medium
- **Priority**: Medium

---

### 5. ❌ API key header is case-sensitive causing unauthorized errors

- **Title**: Header name must be exactly `ApiKey`
- **Environment**: All API endpoints
- **Steps to Reproduce**:
    1. Send API key header as `apikey` or `Authorization`
- **Actual Result**: Unauthorized error with 200 status
- **Expected Result**: Clear documentation or case-insensitive header handling, plus HTTP 401 status
- **Severity**: Medium
- **Priority**: Medium  
