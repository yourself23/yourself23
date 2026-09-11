const TARGET_ENDPOINT = "https://vercel.app";

const POLL_INTERVAL_MS = 5 * 60 * 1000;

async function executeTelemetryPoll() {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] 🛰️ Triggering automated balance tracking cycle...`);

    try {
        const response = await fetch(TARGET_ENDPOINT, {
            method: "GET",
            headers: {
                "User-Agent": "WillstoneNexus-CronWorker/1.0",
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Server returned HTTP structural status fault: \${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
            console.log(`✅ Telemetry Received successfully.`);
            console.log(`   Operator Target Address: \${data.operator}`);
            console.log(`   Arbitrum Balance:        \${data.balances.arbitrum} ETH`);
            console.log(`   Base Balance:            \${data.balances.base} ETH\n`);
        } else {
            console.error(`❌ Telemetry Engine Reported Internal Error: \${data.error}\n`);
        }
    } catch (error) {
        console.error(`❌ Cron Network Communication Exception: \${error.message}\n`);
    }
}

function initializeCronWorker() {
    console.log("=========================================================================");
    console.log("⚙️ Willstone Nexus Suite: Automated Balance Cron Worker Activated");
    console.log(`📡 Targeting Endpoint Core Sequence: \${TARGET_ENDPOINT}`);
    console.log(`⏱️ Scanning Frequency Metric Lock: Every 5 Minutes`);
    console.log("=========================================================================\n");

    executeTelemetryPoll();
    setInterval(executeTelemetryPoll, POLL_INTERVAL_MS);
}

initializeCronWorker();
