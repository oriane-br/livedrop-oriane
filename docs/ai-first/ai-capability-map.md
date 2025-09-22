# AI Capability Map

| Capability | Intent (user) | Inputs (this sprint) | Risk 1–5 (tag) | p95 ms | Est. cost/action | Fallback | Selected |
|---|---|---|---|---:|---:|---|:---:|
| Smart Search Typeahead | Find products faster with natural language queries | User query, product catalog (10k SKUs), session context | 2 (medium) | 300 ms | $0.0012 | Keyword-based search | ✅ |
| Support Assistant | Get instant answers to common questions | User question, FAQ/policies markdown, order status API | 3 (medium) | 1200 ms | $0.0085 | Human support ticket | ✅ |
| Product Recommendation Engine | Discover relevant products based on browsing behavior | User session data, product metadata, purchase history | 4 (high) | 500 ms | $0.015 | Popular products carousel | ❌ |
| Automated Order Support | Resolve order status and shipping issues automatically | Order ID, order status API, policy documents | 4 (high) | 1500 ms | $0.012 | Human agent escalation | ❌ |
| Review Summarizer | Quickly understand product reviews and ratings | Product reviews, rating data, customer feedback | 2 (medium) | 800 ms | $0.006 | Show recent reviews only | ❌ |
| Shopping Assistant | Get personalized gift recommendations and advice | User query, budget, occasion, product catalog | 5 (very high) | 2000 ms | $0.025 | Category browsing | ❌ |

## Why these two

Smart Search Typeahead directly impacts conversion rates by reducing search friction and helping users find products faster, addressing a core e-commerce metric. 
Support Assistant reduces support contact rates by handling common queries instantly, improving customer satisfaction while lowering operational costs. 
Both have low integration risk; search builds on existing infrastructure, and support uses available documentation and APIs. They provide immediate value with manageable technical complexity and clear fallback mechanisms.
