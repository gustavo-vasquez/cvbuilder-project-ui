import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import { Container, Row, Col, ButtonGroup, Button, Card, Image } from 'react-bootstrap';

import TabSection from './TabSection';
import ChangeTemplateDialog from './ChangeTemplateDialog';

import '../../../assets/css/build-cv.css';

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
    }

    componentDidMount() {
        const cvPreviewElement = document.querySelector(".cv-preview");
        cvPreviewElement.addEventListener("mouseenter", this.toggleChooseTemplateDialogButton, false);
        cvPreviewElement.addEventListener("mouseleave", this.toggleChooseTemplateDialogButton, false);
    }

    componentWillUnmount() {
        const cvPreviewElement = document.querySelector(".cv-preview");
        cvPreviewElement.removeEventListener("mouseenter", this.toggleChooseTemplateDialogButton, false);
        cvPreviewElement.removeEventListener("mouseleave", this.toggleChooseTemplateDialogButton, false);
    }

    toggleChooseTemplateDialogButton(e) {
        let button = e.target.querySelector("#choose_template");
        button.classList.contains("invisible") ? button.classList.remove("invisible") : button.classList.add("invisible");
    }

    handleChangeTemplateDialog() {
        this.setState(prevState => ({ showChangeTemplateDialog: !prevState.showChangeTemplateDialog }));
    }

    render() {
        return (
            <section id="building_cv">
                <Container>
                    <Row className="btn-group-row">
                        <ButtonGroup className="col tabs-group mb-3">
                        {/*this.state.tabSections.map(tabSection =>
                            <Button as={NavLink} to={`build?sectionName=${tabSection.id}`} key={tabSection.id} variant="outline-default">{tabSection.text}</Button>
                        )*/}
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
                            {/*<Route path="/curriculum/build">
                                <TabSection tabSections={this.state.tabSections}></TabSection>
                            </Route>*/}
                            <Switch>
                                <Route path={`${this.props.path}/:sectionName`} render={({match}) => <TabSection tabSections={this.state.tabSections} sectionName={match.params.sectionName}></TabSection>}></Route>
                                <Route path={`${this.props.path}`} render={({match}) => <TabSection tabSections={this.state.tabSections} sectionName={match.params.sectionName}></TabSection>}></Route>
                            </Switch>
                        </Col>
                    </Row>
                </Container>
                <ChangeTemplateDialog toggleDisplay={this.handleChangeTemplateDialog} visible={this.state.showChangeTemplateDialog}></ChangeTemplateDialog>
            </section>
        );
    }
}

export { Build };