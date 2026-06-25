export interface RequestResult {
	latencyMs: number;
	statusCode: number;
	success: boolean;
}

export interface LoadTestReport {
	totalRequests: number;
	successfulRequests: number;
	failedRequests: number;
	uptimePercent: number;
	latencyP99Ms: number;
	latencyAvgMs: number;
	meetsPassCriteria: boolean;
}

/**
 * Simulates high-traffic concurrent requests during blackout scenarios.
 */
export function runHighTrafficSimulation(
	concurrentUsers: number,
	requestsPerUser: number,
	baseServerLatencyMs = 150,
	concurrencyLimitThreshold = 5000,
): LoadTestReport {
	const results: RequestResult[] = [];
	const totalRequests = concurrentUsers * requestsPerUser;

	for (let i = 0; i < totalRequests; i++) {
		let queueDelay = 0;
		let success = true;
		let statusCode = 200;

		// If the volume is above threshold, queue delays spike and service degrades
		if (concurrentUsers > concurrencyLimitThreshold) {
			const factor = concurrentUsers / concurrencyLimitThreshold;
			queueDelay = Math.random() * 800 * factor;
			// Small failure rate under high traffic
			if (Math.random() < 0.005 * factor) {
				success = false;
				statusCode = 503; // Service Unavailable
			}
		}

		const latency = baseServerLatencyMs + queueDelay + Math.random() * 50;

		results.push({
			latencyMs: latency,
			statusCode,
			success,
		});
	}

	const latencies = results.map((r) => r.latencyMs).sort((a, b) => a - b);
	const successfulRequests = results.filter((r) => r.success).length;
	const failedRequests = totalRequests - successfulRequests;
	const uptimePercent = (successfulRequests / totalRequests) * 100;
	const latencyAvgMs = latencies.reduce((a, b) => a + b, 0) / totalRequests;

	// Calculate 99th percentile latency
	const p99Index = Math.floor(totalRequests * 0.99);
	const latencyP99Ms = latencies[p99Index] || latencies[latencies.length - 1];

	// Pass criteria: P99 latency < 2000ms (2.0s) and 100% uptime (no dropped connections)
	const meetsPassCriteria = latencyP99Ms < 2000 && uptimePercent === 100;

	return {
		totalRequests,
		successfulRequests,
		failedRequests,
		uptimePercent,
		latencyP99Ms: Number(latencyP99Ms.toFixed(2)),
		latencyAvgMs: Number(latencyAvgMs.toFixed(2)),
		meetsPassCriteria,
	};
}
