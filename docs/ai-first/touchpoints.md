# Touchpoint Specs

## Smart Search Typeahead

### Problem statement
Users struggle to find products using traditional keyword search, which requires exact matches and doesn't understand user intent or natural language queries. This leads to abandoned searches, lower conversion rates, and frustration when customers can't find what they're looking for despite it being in our catalog.

### Happy path
1. User starts typing in search bar ("comfortable running shoes for flat feet")
2. System captures query after 200ms debounce to avoid excessive requests
3. Query sent to AI inference service with relevant product catalog context (titles, descriptions, categories)
4. Model generates 3-5 relevant search suggestions understanding the natural language intent
5. Results filtered through safety and relevance guardrails
6. Suggestions displayed in dropdown within 300ms p95 latency target
7. User sees relevant suggestions and selects one ("Running Shoes for Flat Feet - Support & Comfort")
8. Search results page loads with pre-filtered relevant products
9. User clicks on a product that matches their needs
10. Product added to cart and purchase completed

### Grounding & guardrails
- **Source of truth**: Product catalog database (10k SKUs with titles, descriptions, categories, attributes)
- **Retrieval scope**: Product metadata only - no user data or external content
- **Max context**: 4K tokens (optimized subset of product catalog)
- **Refuse outside scope**: Only returns product-related suggestions; refuses personal, sensitive, or off-topic queries by showing "Try searching for products" message

### Human-in-the-loop
- **Escalation triggers**: User clicks "Not finding what you need?" after 3 unsuccessful search attempts
- **UI surface**: Subtle help text below search results with escalation option
- **Reviewer**: Product team conducts weekly review of search analytics and escalation patterns
- **SLA**: 24-hour review of escalated queries with manual assistance

### Latency budget
- Network overhead: 50ms (API calls between services)
- Query processing & context retrieval: 50ms (product data lookup)
- AI inference: 150ms (model processing time)
- Result filtering & safety checks: 30ms (content moderation)
- UI rendering: 20ms (browser display)
- **Total**: 300ms p95 target
- **Cache strategy**: 70% cache hit rate for common queries using Redis with 5-minute TTL

### Error & fallback behavior
- AI service timeout (after 250ms) → fallback to keyword-based search
- Model error or unavailable → show cached popular searches from last 24 hours
- Rate limit exceeded → degraded to keyword search mode with notification
- Empty results → show "Try different keywords" with category suggestions

### PII handling
- No PII leaves the application; search queries treated as anonymous
- User identifiers stripped before query processing
- Search queries logged without user association for analytics only
- All data processed in-memory during request lifecycle

### Success metrics
- **Product**: Search-to-click rate (>35% target, currently ~25%)
- **Product**: Zero-result search rate reduction (<15% from current 22%)
- **Business**: Conversion rate increase from search (+2% overall)

### Feasibility note
Product catalog available via existing API, search infrastructure can be extended with AI layer. Using Llama 3.1 8B via OpenRouter for cost-effectiveness. Next prototype: Implement query embedding with sample product data and test relevance scoring.

---

## Support Assistant

### Problem statement
Customers frequently contact support for common questions about returns, shipping, policies, and order status that could be answered instantly through automation. This creates unnecessary support ticket volume, increases response times for genuine issues, and leads to customer frustration during wait times.

### Happy path
1. User clicks support assistant widget from help section or product page
2. Types question ("What is your return policy for electronics?")
3. System retrieves relevant FAQ/policy documents using semantic search
4. Question analyzed with context from knowledge base and order data (if authenticated)
5. AI generates concise, helpful response with specific policy details
6. Response checked for accuracy against source documents
7. Answer displayed with confidence score indicator
8. User reads answer and has follow-up option or can mark as helpful
9. If satisfied, user continues shopping; if not, escalates to human
10. Conversation logged for continuous improvement

### Grounding & guardrails
- **Source of truth**: FAQ markdown files, policy documents, order status API
- **Retrieval scope**: Company policies, shipping information, returns, account questions, product details
- **Max context**: 8K tokens (comprehensive policy documentation)
- **Refuse outside scope**: Directs technical issues, account-specific problems, and complex complaints to human support with clear messaging

### Human-in-the-loop
- **Escalation triggers**: Confidence score <70%, user explicitly requests human help, complex account issues
- **UI surface**: Persistent "Talk to human" button with estimated wait time
- **Reviewer**: Support team reviews escalated conversations daily for quality and training
- **SLA**: 1-hour response time for escalated queries during business hours

### Latency budget
- Network overhead: 100ms (document retrieval API calls)
- Document retrieval & context building: 200ms (semantic search through knowledge base)
- AI inference: 800ms (model processing with RAG context)
- Safety checks & confidence scoring: 80ms (accuracy validation)
- UI rendering: 20ms (response display)
- **Total**: 1200ms p95 target
- **Cache strategy**: 30% cache hit rate for common questions using Redis with 1-hour TTL

### Error & fallback behavior
- AI service unavailable → show FAQ search interface with document links
- No confident answer found → offer contact options with category-based routing
- Rate limiting → show queue position with callback option
- Authentication required → prompt sign-in for order-specific queries

### PII handling
- Order numbers and personal details redacted before AI processing
- No personal data sent to external AI models; only anonymized content
- Conversations anonymized after 30 days for model training
- Audit logs maintained for compliance with 30-day retention

### Success metrics
- **Product**: First-contact resolution rate (>60% target)
- **Product**: User satisfaction score (>4/5 post-interaction survey)
- **Business**: Support ticket reduction (-25% from current volume)

### Feasibility note
Policy documents available in structured markdown format, order status API exists and tested. Using GPT-4o-mini for better accuracy on policy questions. Next prototype: Test RAG implementation with sample documents and common customer questions to validate response quality.
