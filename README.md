# Shopify Order Splitter

## Overview

Shopify Order Splitter is a **React Remix** application designed for **Shopify merchants** that listens to **Shopify webhooks** for incoming orders. The app automatically splits the orders into separate orders based on selected criteria.

The app is built to ensure merchants can efficiently manage and fulfill orders by creating **optimized and structured order processing workflows**.

## How It Works

### 1. Listening to Shopify Webhooks
The app listens to Shopify's `orders/create` webhook to detect new orders as they are placed. Once an order is received, the app parses its details and determines whether it needs to be split.

### 2. Order Splitting Logic
After retrieving the order, the app evaluates the splitting rules based on the criteria.
Each sub-order retains all necessary order details, ensuring seamless fulfillment and tracking.

### 3. Creating New Orders
Once the splitting logic has been applied, the app generates new orders using Shopify’s **GraphQL Admin API**, maintaining necessary relationships with the original order. 

Each newly created order:
- Maintains customer details
- Has its own fulfillment process
- Retains original order reference for tracking

## Database
The application uses **Amazon RDS with PostgreSQL** as its primary database to store order details, splitting configurations, and merchant settings.

## Webhooks Used
The app subscribes to the following Shopify webhooks:

- **`orders/create`** - Triggered when a new order is placed.
- **`orders/updated`** - Captures any updates made to an order.
- **`orders/fulfilled`** - Notifies when an order is marked as fulfilled.
- **`orders/cancelled`** - Handles order cancellations.

## Workflow Summary
1. **Webhook Trigger:** Shopify sends an `orders/create` webhook.
2. **Data Processing:** The app retrieves the order details via GraphQL.
3. **Order Evaluation:** The order is analyzed for splitting conditions.
4. **New Orders Creation:** Separate orders are created using Shopify’s Admin API.
5. **Fulfillment Process:** Each split order follows standard Shopify fulfillment workflows.

## Key Features
- **Automatic Order Splitting**: No manual intervention required.
- **Flexible Rules**: Merchants can configure splitting conditions.
- **Seamless Integration**: Directly interacts with Shopify’s GraphQL API.
- **Optimized for Fulfillment**: Ensures each order is routed efficiently.

This app is designed to enhance order processing efficiency, reduce manual work, and improve fulfillment operations for Shopify merchants.
