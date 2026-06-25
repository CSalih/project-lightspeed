export interface SessionToken {
	token: string;
	expiresAt: number; // timestamp
	userModules: string[];
}

/**
 * Manages SSO authentication sessions and navigation permissions across different modules.
 */
export class SSOSessionManager {
	private currentSession: SessionToken | null = null;
	private loginRedirectCount = 0;

	public startSession(token: SessionToken) {
		this.currentSession = token;
	}

	public endSession() {
		this.currentSession = null;
	}

	public getRedirectCount() {
		return this.loginRedirectCount;
	}

	public checkAccess(
		moduleName: string,
		now = Date.now(),
	): {
		allowed: boolean;
		redirectToLogin: boolean;
		error?: string;
	} {
		if (!this.currentSession) {
			this.loginRedirectCount++;
			return {
				allowed: false,
				redirectToLogin: true,
				error: "No active session",
			};
		}

		// Check expiry
		if (now > this.currentSession.expiresAt) {
			this.currentSession = null; // session expired, clear it
			this.loginRedirectCount++;
			return {
				allowed: false,
				redirectToLogin: true,
				error: "Session expired",
			};
		}

		// Check module permission
		if (!this.currentSession.userModules.includes(moduleName)) {
			return {
				allowed: false,
				redirectToLogin: false,
				error: "Unauthorized access to this module",
			};
		}

		return { allowed: true, redirectToLogin: false };
	}
}
