import { handleResponse, authorizationHeader, alertNotifications } from '../../../helpers';

export const addOrUpdateBlock = (values, { setSubmitting }, sectionMetadata, editMode, refreshBlocks) => {
	setTimeout(async () => {
    	const requestOptions = {
    		method: editMode ? "PUT" : "POST",
    		headers: { ...authorizationHeader(), "Content-Type": "application/json" },
    		body: JSON.stringify(values)
    	}

    	await fetch(`https://localhost:5001/api/curriculum/${sectionMetadata.name}`, requestOptions)
		.then(handleResponse)
		.then(async success => {
			const requestOptions = {
				method: "GET",
				headers: authorizationHeader()
			}

			await fetch(`https://localhost:5001/api/curriculum/section/${sectionMetadata.index + 1}/${success.id}`, requestOptions)
			.then(handleResponse)
			.then(success => {
				alertNotifications.success(!editMode ? `El bloque ${success.title} se ha creado.` : `El bloque ${success.title} se ha modificado.`);
				refreshBlocks(sectionMetadata.index, sectionMetadata.formId, editMode, success);
			})
			.catch(errorMessage => alertNotifications.error(errorMessage));
		})
    	.catch(errorMessage => alertNotifications.error(errorMessage));

        //alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
    }, 400);
}

export const loadSectionFormData = (editMode, sectionIndex, summaryId, thisContext) => {
	if(editMode) {
        const requestOptions = {
            method: "GET",
            headers: authorizationHeader()
        }

        fetch(`https://localhost:5001/api/curriculum/study/${sectionIndex + 1}/${summaryId}`, requestOptions)
		.then(handleResponse)
		.then(success => thisContext.setState({ initialFormValues: success }))
		.catch(errorMessage => alertNotifications.error(errorMessage || errorMessage.message));
	}
}

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


// Funciones

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