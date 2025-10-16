# Ground Truth Q&A for Shoplite RAG System

## Simple Factual Questions (40% - 8 questions)

### Q01: How do I create a seller account on Shoplite?
**Expected retrieval context:** Document 8: Seller Account Setup and Management
**Authoritative answer:** To create a seller account, visit the Shoplite seller registration page, provide business information including tax identification number and registration documents, and complete the verification process which takes 2-3 business days.
**Required keywords in LLM response:** ["seller registration", "business verification", "2-3 business days", "tax identification"]
**Forbidden content:** ["instant approval", "no verification required", "personal accounts"]

### Q02: What is Shoplite's standard return window?
**Expected retrieval context:** Document 6: Return and Refund Policies
**Authoritative answer:** Shoplite offers a 30-day return window for most items starting from the delivery date. Items must be in original condition with all tags and packaging intact.
**Required keywords in LLM response:** ["30-day return window", "original condition", "delivery date"]
**Forbidden content:** ["60 days", "90 days", "no returns accepted"]

### Q03: What payment methods does Shoplite accept?
**Expected retrieval context:** Document 4: Payment Methods and Security
**Authoritative answer:** Shoplite accepts major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and Shoplite Wallet credits. Regional payment methods include bank transfers and installment plans.
**Required keywords in LLM response:** ["credit cards", "PayPal", "Apple Pay", "Shoplite Wallet"]
**Forbidden content:** ["cryptocurrency", "money orders", "wire transfers"]

### Q04: How long does standard delivery take?
**Expected retrieval context:** Document 5: Order Tracking and Delivery
**Authoritative answer:** Standard delivery typically takes 3-7 business days. Express delivery options are available for 1-2 business days, and same-day delivery is offered in eligible metropolitan areas.
**Required keywords in LLM response:** ["3-7 business days", "standard delivery", "express delivery"]
**Forbidden content:** ["overnight", "immediate delivery", "same day everywhere"]

### Q05: What are the mobile app's exclusive features?
**Expected retrieval context:** Document 12: Mobile App Features
**Authoritative answer:** The Shoplite mobile app offers push notifications, barcode scanning, augmented reality product previews, early access to sales, location-based deals, and simplified reordering.
**Required keywords in LLM response:** ["barcode scanning", "augmented reality", "push notifications", "location-based deals"]
**Forbidden content:** ["desktop exclusive", "web-only features"]

### Q06: What is the commission rate for electronics?
**Expected retrieval context:** Document 10: Commission and Fee Structure
**Authoritative answer:** Electronics category has an 8% commission rate. Fashion is 12%, Home Goods 10%, and Luxury Items 15%. Professional and Enterprise tier sellers receive 1-2% commission reductions.
**Required keywords in LLM response:** ["8% commission", "electronics category", "Professional tier"]
**Forbidden content:** ["flat rate", "no commission", "variable by seller"]

### Q07: How do I initiate a return?
**Expected retrieval context:** Document 6: Return and Refund Policies
**Authoritative answer:** To initiate a return, go to your order history page, select the items for return, specify the reason, and request return authorization. Approved returns generate prepaid shipping labels.
**Required keywords in LLM response:** ["order history page", "return authorization", "prepaid shipping labels"]
**Forbidden content:** ["email request", "phone call required", "no authorization needed"]

### Q08: What are the loyalty program tiers?
**Expected retrieval context:** Document 17: Customer Loyalty Program
**Authoritative answer:** The Shoplite Rewards program has Silver (0-999 points), Gold (1,000-4,999 points), and Platinum (5,000+ points) tiers. Each tier offers increasing benefits including earning multipliers and exclusive services.
**Required keywords in LLM response:** ["Silver", "Gold", "Platinum", "points", "tiers"]
**Forbidden content:** ["diamond tier", "unlimited tiers", "no tiers"]

## Complex Multi-Document Questions (60% - 12 questions)

### Q09: What are the return policies and how do I track my order status?
**Expected retrieval context:** Document 6: Return and Refund Policies + Document 5: Order Tracking and Delivery
**Authoritative answer:** Shoplite offers a 30-day return window requiring items in original condition. Returns need authorization through order history. For tracking, you receive email confirmation with tracking numbers available within 24 hours of shipment, accessible through the order tracking system with real-time updates.
**Required keywords in LLM response:** ["30-day return window", "return authorization", "tracking numbers", "order tracking system"]
**Forbidden content:** ["no returns accepted", "instant tracking", "phone tracking only"]

### Q10: How do seller accounts work and what are the commission rates?
**Expected retrieval context:** Document 8: Seller Account Setup and Management + Document 10: Commission and Fee Structure
**Authoritative answer:** Seller accounts require business verification taking 2-3 days. Commission rates vary by category: Electronics 8%, Fashion 12%, Home Goods 10%, Luxury Items 15%. Professional and Enterprise tiers receive 1-2% commission reductions based on sales volume.
**Required keywords in LLM response:** ["business verification", "2-3 days", "commission rates", "Professional tier"]
**Forbidden content:** ["instant approval", "flat commission", "no verification"]

### Q11: What payment methods are available and what security measures protect them?
**Expected retrieval context:** Document 4: Payment Methods and Security + Document 14: Security and Privacy Policies
**Authoritative answer:** Shoplite accepts credit cards, PayPal, digital wallets, and Shoplite Wallet. Security includes PCI DSS compliance, tokenization, TLS 1.3 encryption, and fraud detection systems. Data encryption protects both in transit and at rest.
**Required keywords in LLM response:** ["credit cards", "PayPal", "PCI DSS", "encryption", "tokenization"]
**Forbidden content:** ["unsecured payments", "no encryption", "stores card numbers"]

### Q12: How does inventory management work for sellers and what are the quality standards?
**Expected retrieval context:** Document 9: Inventory Management for Sellers + Document 18: Marketplace Quality Standards
**Authoritative answer:** Sellers use real-time inventory tracking with low stock alerts and multi-location management. Quality standards require 95% fulfillment rate, under 2% cancellation rate, and accurate product listings. Automated and manual audits enforce these standards.
**Required keywords in LLM response:** ["real-time inventory", "low stock alerts", "95% fulfillment rate", "quality standards"]
**Forbidden content:** ["manual tracking only", "no standards", "unlimited cancellations"]

### Q13: What are the mobile app features and how do they integrate with the loyalty program?
**Expected retrieval context:** Document 12: Mobile App Features + Document 17: Customer Loyalty Program
**Authoritative answer:** The mobile app offers barcode scanning, AR previews, push notifications, and location-based deals. It integrates with the loyalty program for point tracking, tier status, and mobile-exclusive redemption opportunities across Silver, Gold, and Platinum tiers.
**Required keywords in LLM response:** ["barcode scanning", "AR previews", "loyalty program", "point tracking", "tiers"]
**Forbidden content:** ["web only", "no mobile integration", "separate systems"]

### Q14: How do promotional codes work with the shopping cart and checkout process?
**Expected retrieval context:** Document 15: Promotional Codes and Discounts + Document 3: Shopping Cart and Checkout Process
**Authoritative answer:** Promotional codes can be applied during checkout for discounts, free shipping, or bundle deals. The cart shows real-time savings calculations. Stacking rules typically allow one code per order, automatically applying the best available discount during the three-step checkout process.
**Required keywords in LLM response:** ["promotional codes", "checkout process", "real-time savings", "stacking rules"]
**Forbidden content:** ["multiple codes", "post-purchase application", "no calculation"]

### Q15: What customer support options are available and how do they handle different issue types?
**Expected retrieval context:** Document 11: Customer Support Procedures + Document 6: Return and Refund Policies
**Authoritative answer:** Support is available 24/7 via live chat, email, and phone. Critical issues like payment failures get immediate attention, while standard inquiries have 4-hour response targets. Return-related issues are handled through dedicated channels with specific authorization procedures.
**Required keywords in LLM response:** ["24/7 support", "live chat", "critical issues", "return authorization"]
**Forbidden content:** ["limited hours", "email only", "no prioritization"]

### Q16: How does shipping work internationally and what are the costs involved?
**Expected retrieval context:** Document 16: Shipping and Logistics Management + Document 5: Order Tracking and Delivery
**Authoritative answer:** International shipping takes 7-14 days including customs processing. Costs are calculated based on package dimensions, weight, and destination. Real-time rates show during checkout, and tracking provides end-to-end visibility with customs documentation assistance.
**Required keywords in LLM response:** ["international shipping", "7-14 days", "customs processing", "real-time rates"]
**Forbidden content:** ["flat rate", "no customs", "unlimited free shipping"]

### Q17: What are the API capabilities for developers and how do they handle security?
**Expected retrieval context:** Document 13: API Documentation for Developers + Document 14: Security and Privacy Policies
**Authoritative answer:** The RESTful API provides product, order, and customer data access with OAuth 2.0 authentication. Rate limits start at 1,000 requests/hour. Security includes TLS encryption, tokenization, and regular security audits with comprehensive documentation and sandbox testing.
**Required keywords in LLM response:** ["RESTful API", "OAuth 2.0", "rate limits", "TLS encryption", "sandbox testing"]
**Forbidden content:** ["unlimited access", "basic auth", "no security"]

### Q18: How do product reviews work and what are the moderation guidelines?
**Expected retrieval context:** Document 7: Product Reviews and Ratings System + Document 18: Marketplace Quality Standards
**Authoritative answer:** The 1-5 star rating system requires purchase verification. Reviews must be authentic with image/video support. Moderation prohibits hate speech, personal information, and promotional content. Community voting surfaces helpful reviews while maintaining marketplace integrity.
**Required keywords in LLM response:** ["1-5 star rating", "purchase verification", "moderation", "community voting"]
**Forbidden content:** ["unverified reviews", "no moderation", "paid reviews"]

### Q19: What are the seller performance requirements and how do they affect commission rates?
**Expected retrieval context:** Document 18: Marketplace Quality Standards + Document 10: Commission and Fee Structure
**Authoritative answer:** Sellers must maintain 95% fulfillment rate, under 2% cancellation rate, and 4.0+ customer rating. Performance affects seller tier status, which determines commission reductions (1-2% for Professional/Enterprise tiers) and marketplace visibility.
**Required keywords in LLM response:** ["95% fulfillment", "2% cancellation", "seller tiers", "commission reductions"]
**Forbidden content:** ["no requirements", "fixed commissions", "no benefits"]

### Q20: How do the loyalty program and promotional systems work together?
**Expected retrieval context:** Document 17: Customer Loyalty Program + Document 15: Promotional Codes and Discounts
**Authoritative answer:** Loyalty members earn points (1 per dollar spent) redeemable for discount codes. Tier status provides exclusive promotional access and bonus earning opportunities. The systems integrate to offer personalized promotions based on member activity and preferences.
**Required keywords in LLM response:** ["loyalty points", "discount codes", "tier status", "personalized promotions"]
**Forbidden content:** ["separate systems", "no integration", "fixed discounts"]
