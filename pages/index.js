import React, { useCallback, useState } from 'react';
import AppLayout from '../components/AppLayout';

import { 
	Row, 
	Col,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle,Jumbotron, Button,
    ButtonGroup, ButtonToolbar} from 'reactstrap';

const Home = () => {
    return (
        <AppLayout>
            <Col xs ="1">
            </Col>
            <Col xs = "11"/*child */> 
                <div>
                    <Jumbotron style={{ height:'120%',marginTop: '2%' }}>
                        <h1 className="display-3">프로그램 가제</h1>
                        <p className="lead">간단한 설명</p>
                        <hr className="my-2" />
                        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                        <p className="lead">
                        <Button color="primary">Learn More</Button>
                        </p>
                    </Jumbotron>
                </div>
                <Row style={{ marginTop: '3%' }}>
                    <Col xs = "3">
                        <div>
                            <Card >
                                <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                                <CardBody>
                                <CardTitle tag="h5">Card title</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                <Button>Button</Button>
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                    <Col xs = "3">
                        <div>
                            <Card >
                                <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                                <CardBody>
                                <CardTitle tag="h5">Card title</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                <Button>Button</Button>
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                    <Col xs = "3">
                        <div>
                            <Card>
                                <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                                <CardBody>
                                <CardTitle tag="h5">Card title</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                <Button>Button</Button>
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                    <Col xs = "3">
                        <div>
                            <Card>
                                <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                                <CardBody>
                                <CardTitle tag="h5">Card title</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                <Button>Button</Button>
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <p></p>
                <Row style={{ marginTop: '3%' }}>
                    <Col xs = "3">
                        <div>
                            <Card>
                                <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                                <CardBody>
                                <CardTitle tag="h5">Card title</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                <Button>Button</Button>
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                    <Col xs = "3">
                        <div>
                            <Card>
                                <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                                <CardBody>
                                <CardTitle tag="h5">Card title</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                <Button>Button</Button>
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                    <Col xs = "3">
                        <div>
                            <Card>
                                <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                                <CardBody>
                                <CardTitle tag="h5">Card title</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                <Button>Button</Button>
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                    <Col xs = "3">
                        <div>
                            <Card>
                                <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                                <CardBody>
                                <CardTitle tag="h5">Card title</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                <Button>Button</Button>
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs = "5">
                    </Col>
                    <Col xs = "2">
                    <p></p>
                        <ButtonToolbar >
                            <ButtonGroup style={{ marginTop: '15%', marginBottom:'10%'}}>
                                <Button outline color="secondary">1</Button>
                                <Button outline color="secondary">2</Button>
                                <Button outline color="secondary">3</Button>
                                <Button outline color="secondary">4</Button>
                                <Button outline color="secondary">5</Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </Col>
                    <Col xs = "5">
                    </Col>
                </Row>
            </Col>
        </AppLayout>
    )
}

export default Home;