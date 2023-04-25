import React from "react"
import PropTypes from 'prop-types';
import Css from './LoadMoreBtn.module.css'

export function LoadMore ({onClick}){
    return (
        <button className={Css.loadBtn} type="button" onClick={onClick}>Load more</button>
    )
}

LoadMore.propTypes = {
    onClick: PropTypes.func.isRequired
}