export interface LegacyCustomerRecord {
	cust_id_legacy: string;
	full_name: string;
	tar_cd: string;
	hist_consumption_kwh: string;
	encoding_check: string;
}

export interface ModernPresentationRecord {
	id: string;
	name: string;
	tariffCode: string;
	consumptionHistoryKwh: number;
}

/**
 * Validates data fidelity between legacy database records and new presentation layer records.
 */
export function validateDataIntegrity(
	legacyRecords: LegacyCustomerRecord[],
	modernRecords: ModernPresentationRecord[],
): {
	success: boolean;
	mismatchedCount: number;
	errors: string[];
} {
	const errors: string[] = [];
	let mismatchedCount = 0;

	if (legacyRecords.length !== modernRecords.length) {
		errors.push(
			`Record count mismatch: Legacy has ${legacyRecords.length}, Modern has ${modernRecords.length}`,
		);
		mismatchedCount = Math.abs(legacyRecords.length - modernRecords.length);
	}

	const modernMap = new Map(modernRecords.map((r) => [r.id, r]));

	for (const legacy of legacyRecords) {
		const modern = modernMap.get(legacy.cust_id_legacy);
		if (!modern) {
			errors.push(
				`Mismatched User ID: Legacy customer '${legacy.cust_id_legacy}' is missing in presentation layer.`,
			);
			mismatchedCount++;
			continue;
		}

		// Verify name exact match
		if (legacy.full_name !== modern.name) {
			errors.push(
				`Data mismatch for ${modern.id}: Legacy name '${legacy.full_name}' does not match Modern name '${modern.name}'.`,
			);
			mismatchedCount++;
		}

		// Verify tariff code exact match
		if (legacy.tar_cd !== modern.tariffCode) {
			errors.push(
				`Data mismatch for ${modern.id}: Legacy tariff code '${legacy.tar_cd}' does not match Modern tariff code '${modern.tariffCode}'.`,
			);
			mismatchedCount++;
		}

		// Verify consumption numeric fidelity (precision and parsing check)
		const expectedKwh = Number(legacy.hist_consumption_kwh);
		if (
			Number.isNaN(expectedKwh) ||
			Math.abs(expectedKwh - modern.consumptionHistoryKwh) > 0.0001
		) {
			errors.push(
				`Numeric precision loss or mismatch for ${modern.id}: Legacy '${legacy.hist_consumption_kwh}' vs Modern '${modern.consumptionHistoryKwh}'`,
			);
			mismatchedCount++;
		}

		// Verify encoding integrity (ensure no corruption characters)
		if (legacy.encoding_check.includes("\uFFFD")) {
			errors.push(
				`Character encoding error detected for ${modern.id} in legacy data: '${legacy.encoding_check}'`,
			);
			mismatchedCount++;
		}
	}

	return {
		success: errors.length === 0,
		mismatchedCount,
		errors,
	};
}
