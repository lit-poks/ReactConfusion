import React from 'react';
import {Card, CardImg, CardText,CardBody,CardTitle, BreadcrumbItem,Breadcrumb} from 'reactstrap';
import {Link} from 'react-router-dom';



    function RenderDish({dish}){
            
            const commentlist= dish.map((comm)=>{
                return(
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
            return(
                <div className="col-sm col-md-5 ml-1">
                <h4>Comments</h4>
                        {commentlist}
                </div>
                
            );
        
        
    }

    function RenderMenu({dish}){
       
            return(
                <div className="col-sm col-md-5 m-1">
                <Card >
                    <CardImg top src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                </div>  
            );  
    }

    function ReturnDate({date}){
        console.log(date)
        const month=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const mon=parseInt(date.substring(5,7));
        var final=month[mon-1]+' ' +date.substring(8,10)+', '+date.substring(0,4);
        return final;
    }

    const DishDetail = (props) =>{
     if(props.dish!=null){
        
        return(
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
                <RenderDish dish={props.comments} />
            </div>
            </div>
        );
     }
     else{
         return(
            <div></div>
         );
     }
    }



export default DishDetail;