export const dateDropdownLists = {
	startPeriod: {
		months: getMonthList("START_PERIOD"),
		years: getYearsList()
	},
	endPeriod: {
		months: getMonthList("END_PERIOD"),
		years: getYearsList()
	}
}

function getMonthList(period) {
	// Generación del combo con los meses
	let months = [];
	months.push({ value: "", text: "Elegir mes" });

	if (period === "END_PERIOD")
		months.push({ value: "present", text: "Presente" });

	if (period === "START_PERIOD" || period === "END_PERIOD")
	{
	    months.push({ value: "not_show", text: "No mostrar" });
	    months.push({ value: "only_year", text: "Solo mostrar año" });
	}

	months.push({ value: "january", text: "Enero" });
	months.push({ value: "february", text: "Febrero" });
	months.push({ value: "march", text: "Marzo" });
	months.push({ value: "april", text: "Abril" });
	months.push({ value: "may", text: "Mayo" });
	months.push({ value: "june", text: "Junio" });
	months.push({ value: "july", text: "Julio" });
	months.push({ value: "august", text: "Agosto" });
	months.push({ value: "september", text: "Septiembre" });
	months.push({ value: "october", text: "Octubre" });
	months.push({ value: "november", text: "Noviembre" });
	months.push({ value: "december", text: "Diciembre" });

	return months;
}


function getYearsList() {
	// Rango del combo para los años
	const currentYear = new Date().getFullYear();
	const yearRangeStart = currentYear - 70;

	// Generación del combo con los años
	let years = [];
	years.push({ value: "", text: "Año" });

	for (var i = currentYear; i >= yearRangeStart; i--)
		years.push({ value: i, text: i });

	return years;
}