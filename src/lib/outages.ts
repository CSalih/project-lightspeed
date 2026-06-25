export interface GridFailurePayload {
	nodeId: string;
	area: string;
	timestamp: string;
	estimatedFixTime: string;
	reason?: string;
}

export interface UserSession {
	id: string;
	name: string;
	nodeId: string;
	phoneNumber: string;
}

export interface AlertNotification {
	userId: string;
	phoneNumber: string;
	message: string;
	sentAt: Date;
	latencySeconds: number;
}

/**
 * Validates the grid failure payload structure. Throws error if corrupted/invalid.
 */
export function validateGridFailurePayload<T extends GridFailurePayload>(
	payload: Partial<T> | null,
): GridFailurePayload {
	if (!payload || typeof payload !== "object") {
		throw new Error("Invalid payload: must be an object");
	}
	if (!payload.nodeId || typeof payload.nodeId !== "string") {
		throw new Error("Invalid payload: missing or invalid nodeId");
	}
	if (!payload.area || typeof payload.area !== "string") {
		throw new Error("Invalid payload: missing or invalid area");
	}
	if (!payload.timestamp || Number.isNaN(Date.parse(payload.timestamp))) {
		throw new Error("Invalid payload: missing or invalid timestamp");
	}
	if (
		!payload.estimatedFixTime ||
		Number.isNaN(Date.parse(payload.estimatedFixTime))
	) {
		throw new Error("Invalid payload: missing or invalid estimatedFixTime");
	}
	return payload as GridFailurePayload;
}

/**
 * Simulates dispatch of outage alerts via SMS to users mapped to the affected grid node.
 */
export function dispatchOutageAlerts(
	payload: GridFailurePayload,
	users: UserSession[],
	sentTime = new Date(),
): AlertNotification[] {
	const failureTime = new Date(payload.timestamp);
	const latencySeconds = (sentTime.getTime() - failureTime.getTime()) / 1000;

	// Filter users mapped to the affected grid node
	const affectedUsers = users.filter((u) => u.nodeId === payload.nodeId);

	return affectedUsers.map((user) => ({
		userId: user.id,
		phoneNumber: user.phoneNumber,
		message: `Alert: Outage detected in ${payload.area} (Node ${payload.nodeId}). Estimated restoration: ${new Date(payload.estimatedFixTime).toLocaleTimeString()}. Reason: ${payload.reason || "Unknown"}.`,
		sentAt: sentTime,
		latencySeconds,
	}));
}
