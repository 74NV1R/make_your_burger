import React from "react"
import Ingredient from "../Ingredient/Ingredient"
import './Burger.css'

const Burger = props => {
    let IngredientArr = props.ingredients.map(item => {
        let amountArr = [...Array(item.amount).keys()]
        //console.log(amountArr)
        return amountArr.map(_ => {
            return <Ingredient type={item.type} key={Math.random()} />
        })
    })

        .reduce((arr, element) => {
            return arr.concat(element)
        }, [])

    if (IngredientArr.length === 0) {
        IngredientArr = <p>Please add ingredients</p>
    }

    return (
        <div className="Burger">
            <Ingredient type='bread-top' />
            {IngredientArr}
            <Ingredient type='bread-bottom' />
        </div>
    )
}

export default Burger