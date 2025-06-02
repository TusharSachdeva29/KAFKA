import { Kafka } from 'kafkajs';

export const kafka = new Kafka({
    clientId: 'client',
    brokers: ['localhost:9092'],
});