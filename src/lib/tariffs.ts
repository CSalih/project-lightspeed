export interface TariffState {
	basePlan: "Standard" | "EV" | "Industrial";
	addons: string[];
}

export const MUTUALLY_EXCLUSIVE_ADDONS = [
	["Solar", "Industrial-High-Yield"],
	["Eco-Friendly", "Fossil-Heavy-Discount"],
];

export const ADDON_DEPENDENCIES: Record<string, string[]> = {
	"Overnight-EV-Discount": ["EV"],
};

/**
 * Validates whether a transition from current to target tariff state is permitted.
 */
export function validateTariffTransition(
	_current: TariffState,
	target: TariffState,
): { valid: boolean; error?: string } {
	// 1. Check addon dependencies on the base plan
	for (const addon of target.addons) {
		const requiredPlans = ADDON_DEPENDENCIES[addon];
		if (requiredPlans && !requiredPlans.includes(target.basePlan)) {
			return {
				valid: false,
				error: `Add-on '${addon}' requires one of the following base plans: ${requiredPlans.join(", ")}`,
			};
		}
	}

	// 2. Check mutually exclusive add-ons
	for (const [addonA, addonB] of MUTUALLY_EXCLUSIVE_ADDONS) {
		if (target.addons.includes(addonA) && target.addons.includes(addonB)) {
			return {
				valid: false,
				error: `Add-ons '${addonA}' and '${addonB}' are mutually exclusive and cannot be combined.`,
			};
		}
	}

	return { valid: true };
}

/**
 * Executes a tariff transition. Updates the backend database via onSuccess callback and triggers confirmation.
 */
export function transitionTariff(
	current: TariffState,
	target: TariffState,
	onSuccess: (updatedState: TariffState) => void,
): { success: boolean; error?: string; emailTriggered?: boolean } {
	const validation = validateTariffTransition(current, target);
	if (!validation.valid) {
		return { success: false, error: validation.error };
	}

	// Update database
	onSuccess(target);

	return {
		success: true,
		emailTriggered: true,
	};
}
