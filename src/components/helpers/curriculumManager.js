import domtoimage from 'dom-to-image';
import { jsPDF } from 'jspdf';

// para imprimir

export const printCV = (thisContext, originalTitle) => {
    const pageNodes = document.getElementsByClassName("page");
    thisContext.setState({ shouldPrint: true, message: "Preparando para imprimir..." });

    let iframepreview = document.getElementById("iframepreview");

    if (iframepreview == null) {
        iframepreview = document.createElement("iframe");
        document.body.appendChild(iframepreview);
        iframepreview.id = "iframepreview"; // optional id
        iframepreview.name = "iframepreview";
        iframepreview.style = "display: none;";
        iframepreview.marginHeight = 0;
        iframepreview.marginWidth = 0;
        iframepreview.scrolling = "no";
        iframepreview.width = 794;
        iframepreview.height = 1123;

        generatePrintPreview(pageNodes, iframepreview);
    }
    
    setTimeout(() => {
        iframepreview.contentDocument.close(); // necessary for IE >= 10
        iframepreview.focus(); // necessary for IE >= 10
        document.title = `${thisContext.state.curriculumReadyData.personalDetail.name}_${thisContext.state.curriculumReadyData.personalDetail.lastName}_CV`;
        iframepreview.contentWindow.print();
        thisContext.setState({ shouldPrint: false });
        document.title = originalTitle;
        iframepreview.remove();
    }, 3000 * pageNodes.length);
}

async function generatePrintPreview(pageNodes, iframepreview) {
    for (var i = 0; i < pageNodes.length; i++) {
        const dataUrl = await convertToImage(pageNodes[i], "svg");
        let img = new Image();
        img.src = dataUrl;
        iframepreview.contentDocument.body.appendChild(img);
    }
};


// para descargar PDF

export const downloadAsPdf = thisContext => {
    const pageNodes = document.getElementsByClassName('page');
    thisContext.setState({ generatePdf: true, message: "Generando el documento PDF" });
    generatePdfDocument(pageNodes, thisContext);
}

async function generatePdfDocument(pageNodes, thisContext) {
    let pdf = new jsPDF('p', 'mm', 'a4');

    for (var i = 0; i < pageNodes.length; i++) {
        if (i !== 0)
            pdf.addPage();

        const dataUrl = await convertToImage(pageNodes[i], "jpeg");
        pdf.addImage(dataUrl, 'JPEG', 0, 0);
    }

    pdf.save(`${thisContext.state.curriculumReadyData.personalDetail.name}_${thisContext.state.curriculumReadyData.personalDetail.lastName}_CV.pdf`);
    thisContext.setState({ generatePdf: false });
};


// convertir a imágen

async function convertToImage(pageNode, imageType) {
    switch (imageType) {
        case "svg":
            return await domtoimage.toSvg(pageNode, {
            	style: {
            		'margin': 0,
            		'margin-block-end': 0,
            		'margin-block-start': 0,
            		'margin-inline-end': 0,
            		'margin-inline-start': 0
            	}
            });
        case "jpeg":
            return await domtoimage.toJpeg(pageNode, {
            	quality: 1,
            	style: {
            		'margin': 0,
            		'margin-block-end': 0,
            		'margin-block-start': 0,
            		'margin-inline-end': 0,
            		'margin-inline-start': 0
            	}
            });
        default:
            break;
    }
};