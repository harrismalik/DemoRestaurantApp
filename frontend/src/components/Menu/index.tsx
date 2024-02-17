import './styles.css'
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectMenu} from "../../redux/modules/listing/selectors";
import {getMenuRequest} from "../../redux/modules/listing/actions";
const Menu = () => {
    const dispatch = useDispatch()
    const menu = useSelector(selectMenu)
    const [menuMapArray,setMenuMapArray] = useState<Array<Array<string>>>([])
    const getMenuMap = (_menu:any) => {
        const menuArray:Array<Array<any>> = []
        _menu.forEach((item:any,key:number) => {
            menuArray.push([item.category])
            item['items'].forEach((menuItem:any) => {
                menuArray[key].push(menuItem.name)
            })
        })
        return rotateMenuArrayCounterclockwise(menuArray)
    }

    function rotateMenuArrayCounterclockwise(_menu:any,filler:string = "") {
        const filledArray = _menu.map((item:Array<string>) => {
            const diff = Math.max(..._menu.map((_item:Array<string>) => _item.length)) - item.length;
            return [...item, ...Array(diff).fill(filler)];
        });
        const transposed = filledArray[0].map((_:any, index:number) => filledArray.map((row:Array<string>) => row[index]));
        return transposed.map((row:any) => row.reverse());
    }

    useEffect(() => {
        if(menu.length) {
            !menuMapArray.length && setMenuMapArray(getMenuMap(menu))
        } else {
            dispatch(getMenuRequest())
        }
    },[menu])
    return (
        <section className={'menu-section'}>
            <div className="menu-div">
                <h1>MENU</h1>
                <p>We taste the best in town!</p>
                <table>
                    {
                        menuMapArray.map((_items,index) => (
                            <tr>
                                {
                                    _items.map(_item => <td className={index==0 ? "menu-category" : ""}>{_item}</td>)
                                }
                            </tr>
                        ))
                    }
                </table>
            </div>
        </section>
    )
}

export default Menu
