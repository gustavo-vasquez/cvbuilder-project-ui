function outerHeight(element) {
    var height = element.offsetHeight;
    var style = getComputedStyle(element);
    
    // incluyo los márgenes en el cálculo
    height += parseInt(style.marginTop) + parseInt(style.marginBottom);
    return height;
}

export function analyzePagedCurriculum(templateName) {
    setTimeout(() => {
        let pageElement, pageBaseStyles, sumBase, sum, pageBase, heightBase;
        let container = document.getElementById("curriculum_finished");

        switch (templateName) {
            case "Classic":
                pageElement = document.querySelector('.page');
                pageBaseStyles = getComputedStyle(pageElement);
                sumBase = parseFloat(pageBaseStyles.paddingTop) + parseFloat(pageBaseStyles.paddingBottom);
                sum = sumBase; console.log(pageElement.getBoundingClientRect());
                heightBase = pageElement.getBoundingClientRect().height;

                document.querySelectorAll('.page > div').forEach((divElement, index) => {
                    sum += outerHeight(divElement);

                    if (sum > heightBase) {
                        pageBase = document.createElement("div");
                        pageBase.className = "col-auto page";
                        container.appendChild(pageBase);
                        pageBase.appendChild(divElement);
                        sum = sumBase + outerHeight(divElement);
                    }
                    else if (pageBase !== undefined)
                        pageBase.appendChild(divElement);
                });
                break;
            case "Elegant":
                let leftPanel = document.querySelector(".page .left-panel");
                heightBase = leftPanel.getBoundingClientRect().height;
                pageBaseStyles = getComputedStyle(leftPanel);
                sumBase = parseFloat(pageBaseStyles.paddingTop) + parseFloat(pageBaseStyles.paddingBottom);
                sum = sumBase;

                leftPanel.querySelectorAll("div.row").forEach((divElement, index) => {
                    sum += divElement.clientHeight;

                    if (sum > heightBase) {
                        pageBase = document.createElement("div");
                        pageBase.className = "col-auto page";
                        pageBase.innerHTML = '<div class="row"><div class="col-4 left-panel"></div><div class="col-8 right-panel"></div></div>';
                        container.appendChild(pageBase);
                        pageBase = pageBase.getElementsByClassName("left-panel")[0];
                        pageBase.appendChild(divElement);
                        sum = sumBase + divElement.clientHeight;
                    }
                    else if (pageBase !== undefined)
                        pageBase.appendChild(divElement);
                });

                sum = sumBase;
                let rightPanel = document.querySelector(".page .right-panel");
                heightBase = rightPanel.getBoundingClientRect().height;
                pageBase = undefined;
                let pageNextIndex = 1;

                rightPanel.querySelectorAll("div.row").forEach((divElement, index) => {
                    sum += divElement.clientHeight;

                    if (sum > heightBase) {
                        pageBase = document.getElementsByClassName("page")[pageNextIndex];

                        if (pageBase === undefined) {
                            pageBase = document.createElement("div");
                            pageBase.className = "col-auto page";
                            pageBase.innerHTML = '<div class="row"><div class="col-4 left-panel"></div><div class="col-8 right-panel"></div></div>';
                            container.appendChild(pageBase);
                        }
                        
                        pageBase = pageBase.getElementsByClassName("right-panel")[0];
                        pageBase.appendChild(divElement);
                        sum = sumBase + divElement.clientHeight;
                        pageNextIndex++;
                    }
                    else if (pageBase !== undefined)
                        pageBase.appendChild(divElement);
                });
                break;
            case "Modern":
                let modernLeftPanel = document.querySelector(".page .left-panel");
                heightBase = modernLeftPanel.getBoundingClientRect().height;
                pageBaseStyles = getComputedStyle(modernLeftPanel);
                sumBase = parseFloat(pageBaseStyles.paddingTop) + parseFloat(pageBaseStyles.paddingBottom);
                sum = sumBase;

                modernLeftPanel.childNodes.forEach((divElement, index) => {
                    sum += divElement.clientHeight;

                    if (sum > heightBase) {
                        pageBase = document.createElement("div");
                        pageBase.className = "col-auto page";
                        pageBase.innerHTML = '<div class="row"><div class="col-4 left-panel"></div><div class="col-8 right-panel"></div></div>';
                        container.appendChild(pageBase);
                        pageBase = pageBase.getElementsByClassName("left-panel")[0];
                        pageBase.appendChild(divElement);
                        sum = sumBase + divElement.clientHeight;
                        heightBase = pageBase.getBoundingClientRect().height;
                    }
                    else if (pageBase !== undefined)
                        pageBase.appendChild(divElement);
                });

                sum = sumBase;
                let modernRightPanel = document.querySelector(".page .right-panel");
                heightBase = modernRightPanel.getBoundingClientRect().height;
                pageBase = undefined;
                let modernPageNextIndex = 1;

                document.querySelectorAll(".page .right-panel > div.row").forEach((divElement, index) => {
                    sum += divElement.clientHeight;

                    if (sum > heightBase) {
                        pageBase = document.getElementsByClassName("page")[modernPageNextIndex];

                        if (pageBase === undefined) {
                            pageBase = document.createElement("div");
                            pageBase.className = "col-auto page";
                            pageBase.innerHTML = '<div class="row"><div class="col-4 left-panel"></div><div class="col-8 right-panel"></div></div>';
                            container.appendChild(pageBase);
                        }
                        
                        pageBase = pageBase.getElementsByClassName("right-panel")[0];
                        pageBase.appendChild(divElement);
                        sum = sumBase + divElement.clientHeight;
                        heightBase = pageBase.getBoundingClientRect().height;
                        modernPageNextIndex++;
                    }
                    else if (pageBase !== undefined)
                        pageBase.appendChild(divElement);
                });
                break;
            default:
                alert("Error, no se pudo analizar el paginado del curriculum.");
    }}, 1000);
}