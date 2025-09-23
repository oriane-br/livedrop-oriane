# AI Touchpoint Cost Model

## Smart Search Typeahead

### Assumptions
- Model: Llama 3.1 8B Instruct via OpenRouter at $0.05/1K prompt tokens, $0.20/1K completion tokens
- Avg tokens in: 1,800   Avg tokens out: 50
- Requests/day: 50,000
- Cache hit rate: 70% (apply miss cost only)

### Calculation
Cost/action = (tokens_in/1000 * prompt_price) + (tokens_out/1000 * completion_price)
Cost/action = (1800/1000 * $0.05) + (50/1000 * $0.20) = $0.09 + $0.01 = $0.10

Daily cost = Cost/action * Requests/day * (1 - cache_hit_rate)
Daily cost = $0.10 * 50,000 * (1 - 0.70) = $1,500

### Results
- Cost per action: $0.10
- Daily cost: $1,500
- Monthly cost: $45,000

### Cost lever if over budget
- Shorten context from 1,800 to 1,200 tokens (33% cost reduction)
- Increase cache hit rate from 70% to 80% (14% immediate savings)
- Implement query classification to use cheaper models for simple searches
- Add usage caps per user session during peak traffic

## Support Assistant

### Assumptions
- Model: GPT-4o-mini at $0.15/1K prompt tokens, $0.60/1K completion tokens
- Avg tokens in: 3,500   Avg tokens out: 200
- Requests/day: 1,000
- Cache hit rate: 30% (apply miss cost only)

### Calculation
Cost/action = (tokens_in/1000 * prompt_price) + (tokens_out/1000 * completion_price)
Cost/action = (3500/1000 * $0.15) + (200/1000 * $0.60) = $0.525 + $0.12 = $0.645

Daily cost = Cost/action * Requests/day * (1 - cache_hit_rate)
Daily cost = $0.645 * 1,000 * (1 - 0.30) = $451.50

### Results
- Cost per action: $0.645
- Daily cost: $451.50
- Monthly cost: $13,545

### Cost lever if over budget
- Downgrade to Llama 3.1 8B for 60% cost reduction on non-critical queries
- Shorten responses from 200 to 100 tokens average (50% output cost reduction)
- Implement confidence thresholding to skip AI for easily answerable questions
- Add response caching for common policy questions

## Total Costs
- Combined daily cost: $1,951.50
- Combined monthly cost: $58,545
