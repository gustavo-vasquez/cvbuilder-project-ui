import { handleResponse, authorizationHeader, alertNotifications, abortSignal } from '../../../helpers';
import sectionMetadata from '../../../helpers/sectionMetadata';

export const addOrUpdateBlock = (values, { setSubmitting }, metadata, editMode, refreshBlocks) => {
	setTimeout(async () => {
    	const requestOptions = {
    		method: editMode ? "PUT" : "POST",
    		headers: { ...authorizationHeader(), "Content-Type": "application/json" },
    		signal: abortSignal.controller.signal,
    		body: JSON.stringify(values)
    	}

    	await fetch(`https://localhost:5001/api/curriculum/${metadata.name}`, requestOptions)
		.then(handleResponse)
		.then(async result => {
			if(result) {
				if(!result.retry) {
					switch(metadata.index) {
						case sectionMetadata.personalReferences.index:
							if(values.areaCode === null) values.areaCode = '';
							if(values.telephone === null) values.telephone = '';
							break;
						default:
							break;
					}

					const requestOptions = {
						method: "GET",
						headers: authorizationHeader()
					}

					await fetch(`https://localhost:5001/api/curriculum/block/${metadata.index + 1}/${result.id}`, requestOptions)
					.then(handleResponse)
					.then(result => {
						alertNotifications.success(!editMode ? `El bloque "${result.title}" se ha creado.` : `Bloque "${result.title}" actualizado.`);
						refreshBlocks(metadata.index, metadata.formId, editMode, result);
					})
					.catch(errorMessage => alertNotifications.error(errorMessage));
				}
				else {
					await abortSignal.updateAbortSignal();
                    addOrUpdateBlock(values, { setSubmitting }, metadata, editMode, refreshBlocks);
				}
			}
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
            headers: authorizationHeader(),
            signal: abortSignal.controller.signal
        }

        fetch(`https://localhost:5001/api/curriculum/section/${sectionIndex + 1}/${summaryId}`, requestOptions)
		.then(handleResponse)
		.then(async result => {
			if(result) {
				if(!result.retry) {
					switch(sectionIndex) {
						case sectionMetadata.personalReferences.index:
							if(result.areaCode === null) result.areaCode = '';
							if(result.telephone === null) result.telephone = '';
							break;
						default:
							break;
					}

					thisContext.setState({ initialFormValues: result });
				}
				else {
					await abortSignal.updateAbortSignal();
                    loadSectionFormData(editMode, sectionIndex, summaryId, thisContext);
				}
			}
		})
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

export const levelOptions = [
	{ value: "none", text: "Elegir nivel" },
	{ value: "beginner", text: "Principiante" },
	{ value: "intermediate", text: "Intermedio" },
	{ value: "advanced", text: "Avanzado" }
]


// Funciones

function getMonthList(period) {
	// Generación del combo con los meses
	let months = [];
	months.push({ value: "none", text: "Elegir mes" });

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
	years.push({ value: 0, text: "Año" });

	for (var i = currentYear; i >= yearRangeStart; i--)
		years.push({ value: i, text: i });

	return years;
}