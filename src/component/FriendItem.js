import React from 'react'

function FriendItem(props) {
    let {id, name, favorite} = props
    return (
        <div className={'col-sm-12 row border border-dark mb-2'} key={id}>
            <div className={'col-sm-6'}>
                <div className={'font-weight-bold'}>{name}</div>
                <div>is your friend</div>
            </div>
            <div className={'col-sm-6 row'}>
                <div className={'col-sm-2 border-dark'} id={'favorite[' + id + ']'} onClick={() => props.onOperationClick('favorite', id)}>
                    {!favorite && <i className="far fa-star"/>}
                    {favorite && <i className="fas fa-star"/>}
                </div>
                <div className={'col-sm-2 border-dark'} id={'delete[' + id + ']'} onClick={() => props.onOperationClick('delete', id)}>
                    <i className="far fa-trash-alt"/>
                </div>
            </div>
        </div>
    )
}

export default FriendItem