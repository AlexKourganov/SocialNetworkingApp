import React, { Component, Fragment } from 'react';
import noImg from '../images/blank-pic.png';
import PropTypes from 'prop-types';

// MUI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import withStyles from '@material-ui/core/styles/withStyles';


const styles =(theme)=> ({
    ...theme.spreadThis,

    card:{
        display:'flex',
        marginBottom:20,

    },
    cardContent:{
        width:'100%',
        flexDirection:'column',
        padding:25
    },
    cover:{
        minWidth:200,
        objectFit:'cover'
    },
    handle:{
        width:60,
        height:18,
        backgroundColor:'#e91e63',
        marginBottom:7
    },
    date:{
        width:100,
        height:14,
        backgroundColor:'#8a8884',
        marginBottom:10
    },
    fullLine:{
        width:'90%',
        height:15,
        backgroundColor:'#8a8884',
        marginBottom:7
    },
    halfLine:{
        width:'50%',
        height:15,
        backgroundColor:'#8a8884',
        marginBottom:7
    }
  });

const ScreamSkeleton = (props) => {
    const  {classes} = props;

    const content = Array.from({length:5}).map((item,index)=>(
        <Card className={classes.card} key={index}>
            <CardMedia className={classes.cover}  image={noImg}/>
            <CardContent className={classes.cardContent}>
                <div className={classes.handle}></div>
                <div className={classes.date}></div>
                <div className={classes.fullLine}></div>
                <div className={classes.fullLine}></div>
                <div className={classes.halfLine}></div>
            </CardContent>
        </Card>
    ))

    return <Fragment>{content}</Fragment>
}

ScreamSkeleton.propTypes = {
    classes: PropTypes.object.isRequired

  };

export default withStyles(styles) (ScreamSkeleton);

