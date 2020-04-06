import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import { IMenuItem } from "MyTypes"

interface IProps extends IMenuItem{
    href: string;
}

function Item(props: IProps)  {

    const { text, path, count = 0, href, showCount } = props;
    const isActive = location.href.indexOf(path) !== -1;
    const history = useHistory();

    const handleClick = () => {
        if (location.href !== href) {
            history.push(href);
        }
    };

    return (<div className="list-item">
        <Link className={`item-link ${isActive ? "active" : ""}`} to={path} onClick={handleClick}>
            <span className="item-font">{text}</span>
            <span className="item-count">{showCount && count > 0 ? count : null}</span>
        </Link>
    </div>);
}

export default Item;
