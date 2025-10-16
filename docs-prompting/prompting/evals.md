# RAG System Evaluation

## Retrieval Quality Tests (10 tests)
| Test ID | Question | Expected Documents | Pass Criteria |
|---------|----------|-------------------|---------------|
| R01 | How do I create a seller account on Shoplite? | Document 8: Seller Account Setup and Management | Retrieved docs contain seller verification info |
| R02 | What is Shoplite's standard return window? | Document 6: Return and Refund Policies | Retrieved doc mentions 30-day window and condition requirements |
| R03 | What payment methods does Shoplite accept? | Document 4: Payment Methods and Security | Retrieved doc lists major payment methods and security measures |
| R04 | How long does standard delivery take? | Document 5: Order Tracking and Delivery | Retrieved doc contains delivery timelines and options |
| R05 | What are the mobile app's exclusive features? | Document 12: Mobile App Features | Retrieved doc mentions barcode scanning and AR features |
| R06 | What is the commission rate for electronics? | Document 10: Commission and Fee Structure | Retrieved doc contains category-specific commission rates |
| R07 | How do I initiate a return? | Document 6: Return and Refund Policies | Retrieved doc explains return authorization process |
| R08 | What are the loyalty program tiers? | Document 17: Customer Loyalty Program | Retrieved doc lists Silver, Gold, Platinum tiers |
| R09 | What are the return policies and how do I track my order status? | Document 6 + Document 5 | Retrieved docs cover both return policies and tracking |
| R10 | How do seller accounts work and what are the commission rates? | Document 8 + Document 10 | Retrieved docs cover account setup and commission structure |

## Response Quality Tests (15 tests)  
| Test ID | Question | Required Keywords | Forbidden Terms | Expected Behavior |
|---------|----------|-------------------|-----------------|-------------------|
| Q01 | How do I create a seller account on Shoplite? | ["seller registration", "business verification", "2-3 business days"] | ["instant approval", "no verification"] | Direct answer with citation |
| Q02 | What is Shoplite's standard return window? | ["30-day return window", "original condition", "delivery date"] | ["60 days", "90 days", "no returns"] | Clear policy explanation |
| Q03 | What payment methods does Shoplite accept? | ["credit cards", "PayPal", "Apple Pay", "Shoplite Wallet"] | ["cryptocurrency", "money orders"] | Complete payment method list |
| Q04 | How long does standard delivery take? | ["3-7 business days", "standard delivery", "express delivery"] | ["overnight", "immediate delivery"] | Delivery timeline explanation |
| Q05 | What are the mobile app's exclusive features? | ["barcode scanning", "augmented reality", "push notifications"] | ["desktop exclusive", "web-only"] | Feature listing with examples |
| Q06 | What is the commission rate for electronics? | ["8% commission", "electronics category", "Professional tier"] | ["flat rate", "no commission"] | Specific rate with context |
| Q07 | How do I initiate a return? | ["order history page", "return authorization", "prepaid shipping labels"] | ["email request", "phone call required"] | Step-by-step process |
| Q08 | What are the loyalty program tiers? | ["Silver", "Gold", "Platinum", "points", "tiers"] | ["diamond tier", "unlimited tiers"] | Tier structure explanation |
| Q09 | What are the return policies and how do I track my order status? | ["30-day return window", "return authorization", "tracking numbers"] | ["no returns accepted", "instant tracking"] | Multi-source synthesis |
| Q10 | How do seller accounts work and what are the commission rates? | ["business verification", "2-3 days", "commission rates"] | ["instant approval", "flat commission"] | Multi-document integration |
| Q11 | What payment methods are available and what security measures protect them? | ["credit cards", "PayPal", "PCI DSS", "encryption"] | ["unsecured payments", "stores card numbers"] | Security and payment synthesis |
| Q12 | How does inventory management work for sellers and what are the quality standards? | ["real-time inventory", "low stock alerts", "95% fulfillment rate"] | ["manual tracking only", "no standards"] | Operational policy synthesis |
| Q13 | What are the mobile app features and how do they integrate with the loyalty program? | ["barcode scanning", "AR previews", "loyalty program", "point tracking"] | ["web only", "no mobile integration"] | Feature integration explanation |
| Q14 | How do promotional codes work with the shopping cart and checkout process? | ["promotional codes", "checkout process", "real-time savings"] | ["multiple codes", "post-purchase application"] | Process flow description |
| Q15 | What customer support options are available and how do they handle different issue types? | ["24/7 support", "live chat", "critical issues", "return authorization"] | ["limited hours", "email only"] | Support hierarchy explanation |

## Edge Case Tests (5 tests)
| Test ID | Scenario | Expected Response Type |
|---------|----------|----------------------|
| E01 | "How do I build a rocket?" | Refusal with explanation - not in knowledge base |
| E02 | "Tell me about returns" (ambiguous) | Clarification request - which aspect of returns? |
| E03 | "What was Shoplite's policy in 2020?" | Refusal with explanation - no historical data available |
| E04 | "I want to return something" (vague) | Clarification request - what item, order details? |
| E05 | "asdfghjkl" (nonsense query) | Clarification request - unable to understand question |
