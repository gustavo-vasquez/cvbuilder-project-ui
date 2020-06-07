import React from 'react';
import { Switch, Route, NavLink, Link } from 'react-router-dom';
import { Container, Row, Col, ButtonGroup, Button, Card, Image } from 'react-bootstrap';

import TabSection from './TabSection';
import ChangeTemplateDialog from './ChangeTemplateDialog';

import '../../../assets/css/build-cv.css';

var timer = null;

class Build extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tabSections: [
                { id: "personal_details", text: "Detalles personales" },
                { id: "studies_experiencies", text: "Estudios y experiencias" },
                { id: "other_information", text: "Información adicional" },
                { id: "own_sections", text: "Secciones personalizadas" }
            ],
            showChangeTemplateDialog: false
        }

        this.handleChangeTemplateDialog = this.handleChangeTemplateDialog.bind(this);
        this.toggleChooseTemplateDialogButton = this.toggleChooseTemplateDialogButton.bind(this);
        this.navigationButtonsDisplay = this.navigationButtonsDisplay.bind(this);
        this.isElementInView = this.isElementInView.bind(this);
    }

    componentDidMount() {
        const cvPreviewElement = document.querySelector(".cv-preview");
        cvPreviewElement.addEventListener("mouseenter", this.toggleChooseTemplateDialogButton, false);
        cvPreviewElement.addEventListener("mouseleave", this.toggleChooseTemplateDialogButton, false);
        window.addEventListener("scroll", this.navigationButtonsDisplay, false);
        document.querySelector("#navigation_buttons_wrapper").addEventListener("click", event => this.switchingTabs(event), false);
        this.navigationButtonsDisplay();
    }

    componentWillUnmount() {
        const cvPreviewElement = document.querySelector(".cv-preview");
        cvPreviewElement.removeEventListener("mouseenter", this.toggleChooseTemplateDialogButton, false);
        cvPreviewElement.removeEventListener("mouseleave", this.toggleChooseTemplateDialogButton, false);
        window.removeEventListener("scroll", this.navigationButtonsDisplay, false);
    }

    toggleChooseTemplateDialogButton(e) {
        let button = e.target.querySelector("#choose_template");
        button.classList.contains("invisible") ? button.classList.remove("invisible") : button.classList.add("invisible");
    }

    handleChangeTemplateDialog() {
        this.setState(prevState => ({ showChangeTemplateDialog: !prevState.showChangeTemplateDialog }));
    }

    isElementInView(element) {
        let pageTop = document.documentElement.offsetTop;
        let pageBottom = pageTop + document.documentElement.clientHeight;
        let elementTop = element.getBoundingClientRect().y;
        let elementBottom = elementTop + element.getBoundingClientRect().height;

        return elementTop <= pageBottom && elementBottom >= pageTop;
    }

    navigationButtonsDisplay() {
        if(timer !== null) {
            clearTimeout(timer);
        }
        
        timer = setTimeout(() => {
            let element = document.getElementById("navigation_buttons");
            let navigationButtonsFixed = document.getElementById("navigation_buttons_fixed");

            if(this.isElementInView(document.getElementById("navigation_buttons_wrapper"))) {
                //element.classList.remove("navigation-buttons-fixed");
                if(navigationButtonsFixed)
                    navigationButtonsFixed.remove();
            }
            else {
                //element.classList.add("navigation-buttons-fixed");
                if(!navigationButtonsFixed) {
                    let clone = element.cloneNode(true); // true means clone all childNodes and all event handlers
                    clone.id = "navigation_buttons_fixed";
                    clone.classList.add("navigation-buttons-fixed");
                    document.getElementById("navigation_buttons_wrapper").appendChild(clone);
                }
            }
        }, 150);
    }

    getCurrentLocation = () => {
        let { pathname } = this.props.history.location;
        let lastSlashIndex = pathname.lastIndexOf("/");
        let parameter = pathname.substring(lastSlashIndex + 1);

        return parameter === "build" ? this.state.tabSections[0].id : parameter;
    }

    switchingTabs = (event) => {
        let parameter = this.getCurrentLocation();
        let { tabSections } = this.state;
        let pathUrl = "";

        
        if(event.target.classList.contains("next-page")) {
            switch(parameter) {
                case tabSections[1].id:
                    pathUrl = tabSections[2].id;
                    break;
                case tabSections[2].id:
                    pathUrl = tabSections[3].id;
                    break;
                case tabSections[3].id:
                    break;
                case tabSections[0].id:
                default:
                    pathUrl = tabSections[1].id;
                    break;
            }
        }
        else if(event.target.classList.contains("previous-page")) {
            switch(parameter) {
                case tabSections[1].id:
                    pathUrl = tabSections[0].id;
                    break;
                case tabSections[2].id:
                    pathUrl = tabSections[1].id;
                    break;
                case tabSections[3].id:
                    pathUrl = tabSections[2].id;
                    break;
                case tabSections[0].id:
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
                        {this.state.tabSections.map(tabSection =>
                            <Button as={NavLink} to={`${this.props.url}/${tabSection.id}`} key={tabSection.id} variant="outline-default">{tabSection.text}</Button>
                        )}
                        </ButtonGroup>
                    </Row>
                    <Row className="flex-column-reverse flex-lg-row">
                        <Col md={3}>
                            <Card border="success" className="cv-preview mb-3">
                                <Image src={require('../../../assets/img/templates/classic.png')} alt="active_template" fluid />
                                <Button variant="outline-success" size="sm" id="choose_template" className="invisible" onClick={this.handleChangeTemplateDialog} data-target="#template_wizard">Cambiar plantilla</Button>
                            </Card>
                            <Card border="success" className="mb-3">
                                <Card.Body>
                                    <p><i className="far fa-lightbulb"></i> Los campos y/o secciones sin completar no aparecerán en tu CV al finalizar.</p>
                                    <p><i className="far fa-lightbulb"></i> Las secciones marcadas como "ocultas" no se verán pero conservarán los datos ingresados en ellas.</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={9} className="cv-sections">
                            <Switch>
                                <Route path={`${this.props.path}/:sectionName`} render={({match}) => <TabSection tabSections={this.state.tabSections} sectionName={match.params.sectionName} navigationButtonsDisplay={this.navigationButtonsDisplay}></TabSection>}></Route>
                                <Route path={`${this.props.path}`} render={({match}) => <TabSection tabSections={this.state.tabSections} sectionName={match.params.sectionName} navigationButtonsDisplay={this.navigationButtonsDisplay}></TabSection>}></Route>
                            </Switch>
                            <div id="navigation_buttons_wrapper">
                                <div id="navigation_buttons" className="text-center">
                                    <ButtonGroup>
                                        <Button variant="default" className="previous-page" type="button" disabled={this.getCurrentLocation() === this.state.tabSections[0].id}><i className="fas fa-arrow-alt-circle-left"></i> Anterior</Button>
                                        <Link to="/curriculum/finished" className="btn btn-default"><i className="fas fa-save"></i> Visualizar CV</Link>
                                        <Button variant="default" className="next-page" type="button" disabled={this.getCurrentLocation() === this.state.tabSections[3].id}>Siguiente <i className="fas fa-arrow-alt-circle-right"></i></Button>
                                    </ButtonGroup>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <ChangeTemplateDialog toggleDisplay={this.handleChangeTemplateDialog} visible={this.state.showChangeTemplateDialog}></ChangeTemplateDialog>
            </section>
        );
    }
}

export { Build };