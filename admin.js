import { kafka } from './client.js';

async function init() {
    const admin = kafka.admin();
    await admin.connect();
    console.log('Connected to Kafka Admin');

    await admin.createTopics({
        topics: [
            {
                topic: 'rider-updates',
                numPartitions: 1,
                replicationFactor: 1,
            },
        ],
    });
    console.log('Created topic test-topic');

    await admin.disconnect();
    console.log('Disconnected from Kafka Admin');

}

init();