import React, { useState, Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb, Button, Modal, ModalHeader, ModalBody, Row, Col, Label, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';


    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props);

        this.state={
            isModalOpen: false,
        }

        this.handleSubmit=this.handleSubmit.bind(this);
        this.toggle=this.toggle.bind(this);
    }

    toggle(){
        this.setState({
            isModalOpen:!this.state.isModalOpen
        })
    }

    handleSubmit(values){
        this.toggle()
        this.props.addComment(this.props.dishId,values.rating, values.author,values.comment)
    };


    render(){
        return (
            <>
            <Button outline color="secondary" onClick={this.toggle}><span className="fa fa-pencil"></span> Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Submit Comment</ModalHeader>

                <ModalBody>
                    <Container>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating">
                                    Rating
                                        </Label>
                                <Control.select model=".rating" name="rating" id="rating"
                                    className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author"> Your Name</Label>
                                <Control.text model=".author" name="author"
                                    className="form-control"
                                    placeholder="Your Name"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".fullName"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Label>Comment</Label>
                                <Control.textarea model=".comment" name="comment"
                                    className="form-control"
                                    rows="6"
                                />
                            </Row>
                            <Row className="form-group">
                                <Button type="submit" color="primary" className="mt-2">
                                    Submit
                                        </Button>
                            </Row>
                        </LocalForm>
                    </Container>
                </ModalBody>
            </Modal>
            </>
        );
    }


};


function RenderDish({ dish, addComment,dishId}) {

    const commentlist = dish.map((comm) => {
        return (
            <ul className="list-unstyled" key={comm.id}>
                <li className="justify-content-between">
                    {comm.comment}
                </li>
                <li className="justify-content-between">
                    --{comm.author}, <ReturnDate date={comm.date} />
                </li>
            </ul>

        );
    });
    return (
        <div className="col-sm col-md-5 ml-1">
            <h4>Comments</h4>
            {commentlist}
            <CommentForm dishId={dishId} addComment={addComment}/>
        </div>

    );


}

function RenderMenu({ dish }) {

    return (
        <div className="col-sm col-md-5 m-1">
            <Card >
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function ReturnDate({ date }) {
    console.log(date)
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const mon = parseInt(date.substring(5, 7));
    var final = month[mon - 1] + ' ' + date.substring(8, 10) + ', ' + date.substring(0, 4);
    return final;
}

const DishDetail = (props) => {
    if(props.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if(props.errMess){
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {

        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                    </div>
                </div>
                <div className="row">
                    <RenderMenu dish={props.dish} />
                    <RenderDish dish={props.comments}
                    addComment={props.addComment}
                    dishId={props.dish.id}
                    />
                </div>
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}



export default DishDetail;