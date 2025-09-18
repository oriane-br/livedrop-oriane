# livedrop-oriane

This repository contains my system design assignment for LiveDrop, an application where creators run flash sales (drops) with limited inventory. Users can follow creators, receive notifications, browse products, and place orders.

## System Design Graph
Here’s the link to my diagram: [View Graph](https://excalidraw.com/#json=rPB-27Y5yiL6ba11yTZSF,Jgp5zR3mA6fFkF8XamD1eg)

The system is designed with scalability and consistency in mind:
Microservices keep components independent.
Critical workflows (orders, stock management) use strong consistency.
Less critical workflows (feeds, search, follower counts) accept eventual consistency for performance.
Monitoring, retries, and reconciliation jobs ensure fault tolerance.
