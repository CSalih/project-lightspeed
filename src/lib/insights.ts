export interface MarketDataPoint {
	month: string;
	price: number | null;
	volume: number | null;
}

export interface ProcessedReport {
	data: MarketDataPoint[];
	hasMissingData: boolean;
	totalPoints: number;
	validPoints: number;
	averages: { price: number; volume: number };
}

/**
 * Processes quarterly market datasets. Handles missing values gracefully and applies adjustments.
 */
export function processQuarterlyReport(
	rawPoints: MarketDataPoint[],
	isLeapYear = false,
): ProcessedReport {
	if (!Array.isArray(rawPoints) || rawPoints.length === 0) {
		throw new Error("Quarterly data must be a non-empty array");
	}

	let hasMissingData = false;
	let priceSum = 0;
	let priceCount = 0;
	let volumeSum = 0;
	let volumeCount = 0;

	const processed: MarketDataPoint[] = rawPoints.map((pt) => {
		const month = String(pt.month || "Unknown");
		let price: number | null = null;
		let volume: number | null = null;

		if (pt.price !== undefined && pt.price !== null) {
			const parsedPrice = Number(pt.price);
			if (!Number.isNaN(parsedPrice)) {
				price = parsedPrice;
				priceSum += parsedPrice;
				priceCount++;
			} else {
				hasMissingData = true;
			}
		} else {
			hasMissingData = true;
		}

		if (pt.volume !== undefined && pt.volume !== null) {
			const parsedVolume = Number(pt.volume);
			if (!Number.isNaN(parsedVolume)) {
				volume = parsedVolume;
				volumeSum += parsedVolume;
				volumeCount++;
			} else {
				hasMissingData = true;
			}
		} else {
			hasMissingData = true;
		}

		// Leap year adjustments if applicable (e.g. Month is February)
		if (
			isLeapYear &&
			month.toLowerCase().startsWith("feb") &&
			volume !== null
		) {
			volume = Number((volume * (29 / 28)).toFixed(2)); // adjust Feb volume for extra leap day
		}

		return { month, price, volume };
	});

	return {
		data: processed,
		hasMissingData,
		totalPoints: rawPoints.length,
		validPoints: priceCount,
		averages: {
			price: priceCount > 0 ? Number((priceSum / priceCount).toFixed(2)) : 0,
			volume:
				volumeCount > 0 ? Number((volumeSum / volumeCount).toFixed(2)) : 0,
		},
	};
}
