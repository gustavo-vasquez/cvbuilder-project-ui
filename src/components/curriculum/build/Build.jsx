import React from 'react';
import { Switch, Route, NavLink, Link } from 'react-router-dom';
import { Container, Row, Col, ButtonGroup, Button, Card, Image } from 'react-bootstrap';

// componentes
import { handleResponse, authorizationHeader, loadCssFile, alertNotifications, abortSignal } from '../../helpers';
import TabPages from './TabPages';
import ChangeTemplateDialog from './ChangeTemplateDialog';
import { NormalSpinner } from '../../Spinners';

var timer = null;
const navigationButtonsText = {
    desktop: {
        previous: "Anterior",
        visualize: "Visualizar CV",
        next: "Siguiente"
    },
    mobile: {
        previous: "Ant",
        visualize: "Ver CV",
        next: "Sig"
    }
}

class Build extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tabnames: [
                { id: "personal_details", text: "Detalles personales" },
                { id: "studies_experiencies", text: "Estudios y experiencias" },
                { id: "other_information", text: "Información adicional" },
                { id: "own_sections", text: "Secciones personalizadas" }
            ],
            showChangeTemplateDialog: false,
            curriculumData: {},
            currentNavigationButtonsText: navigationButtonsText.desktop
        }
    }

    componentDidMount() {
        this.getCurriculumData();
        document.title = "Crea tu curriculum - CVBuilder";
        loadCssFile("build_cv_styles", "/assets/css/build-cv.css");
        const cvPreviewElement = document.querySelector(".cv-preview");
        cvPreviewElement.addEventListener("mouseenter", this.toggleChooseTemplateDialogButton, false);
        cvPreviewElement.addEventListener("mouseleave", this.toggleChooseTemplateDialogButton, false);
        window.addEventListener("scroll", this.navigationButtonsDisplay, false);
        window.addEventListener("resize", this.tabsGroupResponsiveness, false);
        document.querySelector(".previous-page").addEventListener("click", () => this.switchingTabs(true), false);
        document.querySelector(".next-page").addEventListener("click", () => this.switchingTabs(), false);
        this.tabsGroupResponsiveness();
        this.navigationButtonsDisplay();
    }

    componentWillUnmount() {
        document.getElementById("build_cv_styles").remove();
        const cvPreviewElement = document.querySelector(".cv-preview");
        cvPreviewElement.removeEventListener("mouseenter", this.toggleChooseTemplateDialogButton, false);
        cvPreviewElement.removeEventListener("mouseleave", this.toggleChooseTemplateDialogButton, false);
        window.removeEventListener("scroll", this.navigationButtonsDisplay, false);
        window.removeEventListener("resize", this.tabsGroupResponsiveness, false);
        document.querySelector(".previous-page").removeEventListener("click", () => this.switchingTabs(true), false);
        document.querySelector(".next-page").removeEventListener("click", () => this.switchingTabs(), false);
    }

    getCurriculumData = async () => {
        const requestOptions = {
            method: "GET",
            headers: authorizationHeader(),
            signal: abortSignal.controller.signal
        }

        return fetch("https://localhost:5001/api/curriculum", requestOptions)
        .then(handleResponse)
        .then(async data => {
            if(data) {
                if(!data.retry)
                    this.setState({ curriculumData: data });
                else {
                    await abortSignal.updateAbortSignal();
                    this.getCurriculumData();
                }
            }
        })
        .catch(error => alertNotifications.error(error));
    }

    tabsGroupResponsiveness = () => {
        // 576 -> pantalla móvil | 768 -> pantalla tablet
        const width = window.innerWidth;
        let buttonModeTab = document.querySelector(".btn-group-row .btn-group");
        let listModeTab = document.querySelector(".btn-group-row .list-group");

        if (width <= 768 && buttonModeTab) {
            // pantalla tablet o menor
            buttonModeTab.classList.replace("btn-group", "list-group");
            this.setState({ currentNavigationButtonsText: navigationButtonsText.mobile });
        }
        else if (width > 768 && listModeTab) {
            // pantalla escritorio
            listModeTab.classList.replace("list-group", "btn-group");
            this.setState({ currentNavigationButtonsText: navigationButtonsText.desktop });
        }
    };

    toggleChooseTemplateDialogButton = event => {
        let button = event.target.querySelector("#choose_template");
        if(button)
            button.classList.contains("invisible") ? button.classList.remove("invisible") : button.classList.add("invisible");
    }

    handleChangeTemplateDialog = newTemplatePathUrl => {
        if(newTemplatePathUrl)
            this.setState(prevState => ({ showChangeTemplateDialog: !prevState.showChangeTemplateDialog, curriculumData: { ...prevState.curriculumData, templatePath: newTemplatePathUrl } }));
        else
            this.setState(prevState => ({ showChangeTemplateDialog: !prevState.showChangeTemplateDialog }));
    }

    isElementInView = element => {
        let pageTop = document.documentElement.offsetTop;
        let pageBottom = pageTop + document.documentElement.clientHeight;
        let elementTop = element.getBoundingClientRect().y;
        let elementBottom = elementTop + element.getBoundingClientRect().height;

        return elementTop <= pageBottom && elementBottom >= pageTop;
    }

    navigationButtonsDisplay = () => {
        if(timer !== null) {
            clearTimeout(timer);
        }
        
        timer = setTimeout(() => {
            let element = document.getElementById("navigation_buttons");

            if(this.isElementInView(document.getElementById("navigation_buttons_wrapper")))
                element.classList.remove("navigation-buttons-fixed");
            else
                element.classList.add("navigation-buttons-fixed");
        }, 150);
    }

    getCurrentLocation = () => {
        let { pathname } = this.props.history.location;
        let lastSlashIndex = pathname.lastIndexOf("/");
        let parameter = pathname.substring(lastSlashIndex + 1);

        return parameter === "build" ? this.state.tabnames[0].id : parameter;
    }

    switchingTabs = toBack => {
        let parameter = this.getCurrentLocation();
        let { tabnames } = this.state;
        let pathUrl = "";
        
        if(!toBack) {
            switch(parameter) {
                case tabnames[1].id:
                    pathUrl = tabnames[2].id;
                    break;
                case tabnames[2].id:
                    pathUrl = tabnames[3].id;
                    break;
                case tabnames[3].id:
                    break;
                case tabnames[0].id:
                default:
                    pathUrl = tabnames[1].id;
                    break;
            }
        }
        else {
            switch(parameter) {
                case tabnames[1].id:
                    pathUrl = tabnames[0].id;
                    break;
                case tabnames[2].id:
                    pathUrl = tabnames[1].id;
                    break;
                case tabnames[3].id:
                    pathUrl = tabnames[2].id;
                    break;
                case tabnames[0].id:
                default:
                    break;
            }
        }

        return this.props.history.push(`${this.props.path}/${pathUrl}`);
    }

    render() {
        return (
            <section id="building_cv">
                <Container>
                    <Row className="btn-group-row">
                        <ButtonGroup className="col tabs-group mb-3">
                        {this.state.tabnames.map(name =>
                            <Button as={NavLink} to={`${this.props.url}/${name.id}`} key={name.id} variant="outline-default">{name.text}</Button>
                        )}
                        </ButtonGroup>
                    </Row>
                    <Row className="flex-column-reverse flex-md-row">
                        <Col md="3">
                            <Card border="success" className="cv-preview mb-3">
                            {this.state.curriculumData.templatePath ?
                                <React.Fragment>
                                    <Image src={this.state.curriculumData.templatePath} alt="active_template" fluid />
                                    <Button variant="outline-success" size="sm" id="choose_template" className="invisible" onClick={() => this.handleChangeTemplateDialog()} data-target="#template_wizard">Cambiar plantilla</Button>
                                    <ChangeTemplateDialog templatePath={this.state.curriculumData.templatePath} toggleDisplay={this.handleChangeTemplateDialog} visible={this.state.showChangeTemplateDialog}></ChangeTemplateDialog>
                                </React.Fragment>
                                : <Card.Body>
                                    <NormalSpinner></NormalSpinner>
                                  </Card.Body>
                            }
                            </Card>
                            <Card border="success" className="mb-3">
                                <Card.Body>
                                    <p><i className="far fa-lightbulb"></i> Los campos y/o secciones sin completar no aparecerán en tu CV al finalizar.</p>
                                    <p><i className="far fa-lightbulb"></i> Las secciones marcadas como "ocultas" no se verán pero conservarán los datos ingresados en ellas.</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md="9" className="cv-sections">
                            <Switch>
                                <Route path={`${this.props.path}/:tabname`} render={({match}) => <TabPages tabnames={this.state.tabnames} tabname={match.params.tabname} curriculumData={this.state.curriculumData} navigationButtonsDisplay={this.navigationButtonsDisplay}></TabPages>}></Route>
                                <Route path={`${this.props.path}`} render={({match}) => <TabPages tabnames={this.state.tabnames} tabname={match.params.tabname} curriculumData={this.state.curriculumData} navigationButtonsDisplay={this.navigationButtonsDisplay}></TabPages>}></Route>
                            </Switch>
                            <div id="navigation_buttons_wrapper" className="mb-3 mb-md-0">
                                <div id="navigation_buttons" className="text-center">
                                    <ButtonGroup>
                                        <Button variant="default" className="previous-page" type="button" disabled={this.getCurrentLocation() === this.state.tabnames[0].id}><i className="fas fa-arrow-alt-circle-left"></i> { this.state.currentNavigationButtonsText.previous }</Button>
                                        <Link to="/curriculum/finished" className="btn btn-default"><i className="fas fa-save"></i> { this.state.currentNavigationButtonsText.visualize }</Link>
                                        <Button variant="default" className="next-page" type="button" disabled={this.getCurrentLocation() === this.state.tabnames[3].id}>{ this.state.currentNavigationButtonsText.next } <i className="fas fa-arrow-alt-circle-right"></i></Button>
                                    </ButtonGroup>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
}

export { Build };