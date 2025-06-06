﻿# Kafka Project

A simple Kafka implementation demonstrating producer-consumer patterns with Node.js and KafkaJS.

## Project Structure

- `client.js` - Kafka client configuration
- `admin.js` - Creates Kafka topics
- `producer.js` - Sends messages to Kafka topics
- `consumer.js` - Consumes messages from Kafka topics

## Prerequisites

- Docker
- Node.js (v14+)
- npm or yarn

## Setup

### 1. Start Kafka Infrastructure with Docker

First, start Zookeeper Container:

```bash
docker run -p 2181:2181 zookeeper
```

Then, start the Kafka Container:

```bash
docker run -p 9092:9092 `
>> -e KAFKA_ZOOKEEPER_CONNECT=192.168.140.63:2181 `
>> -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://192.168.29.35:9092 `
>> -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 `
>> confluentinc/cp-kafka
```

**Note**: Make sure to adjust the IP addresses to match your network configuration.

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Kafka Topic

Run the admin script to create the required Kafka topic:

```bash
node admin.js
```

This will create a topic named `rider-updates` with 1 partition and replication factor of 1.

## Usage

### Run the Producer

```bash
node producer.js
```

The producer accepts input in the format: `[rider_name] [location]`

Example:

```
> John North
> Alice South
```

Messages for North location go to partition 0, messages for South location go to partition 1.

### Run the Consumer

```bash
node consumer.js [group-id]
```

Replace `[group-id]` with a consumer group identifier of your choice.

You can run multiple consumers with different group IDs to demonstrate how consumer groups work in Kafka.

Example:

```bash
# In terminal 1
node consumer.js group-1

# In terminal 2
node consumer.js group-2
```

## How It Works

1. The admin script creates the necessary Kafka topic
2. The producer sends rider location updates to the appropriate partition based on location
3. Consumers subscribe to the topic and process messages
4. Messages are partitioned: "North" locations go to partition 0, others to partition 1

## Key Features

- Producer with custom partitioning logic
- Consumer group functionality
- Real-time message processing
- Simple command-line interface for testing
