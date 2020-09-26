import React from 'react';
import {Card, CardImg, CardText,CardBody,CardTitle} from 'reactstrap';



    function RenderDish({dish}){
        if(dish!=null){
            
            const commentlist= dish.comments.map((comm)=>{
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
        else{
            console.log('in else');
            return(
                <div></div>
            );
        }
    }

    function RenderMenu({dish}){
        if(dish !=null){
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
        else{
            return(
                <div></div>
            );
        }
    }

    function ReturnDate({date}){
        console.log(date)
        const month=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const mon=parseInt(date.substring(5,7));
        var final=month[mon-1]+' ' +date.substring(8,10)+', '+date.substring(0,4);
        return final;
    }

    const DishDetail = (props) =>{
     
        
        return(
            <div className="container">
            <div className="row">
                <RenderMenu dish={props.dish} />
                <RenderDish dish={props.dish} />
            </div>
            </div>
        );
    }



export default DishDetail;